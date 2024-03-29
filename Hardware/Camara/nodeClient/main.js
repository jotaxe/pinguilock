const confFile = require('./config.json');
const conf = process.env.NODE_ENV === 'production' ? confFile.production : confFile.development;


var Jimp = require("jimp");
var QrCode = require('qrcode-reader');
var qr = new QrCode();

const atob = require('atob');

function getBinary(encodedFile) {
    var binaryImg = atob(encodedFile);
    var length = binaryImg.length;
    var ab = new ArrayBuffer(length);
    var ua = new Uint8Array(ab);
    for (var i = 0; i < length; i++) {
      ua[i] = binaryImg.charCodeAt(i);
    }

    return ab;
}


var AWS = require('aws-sdk');
AWS.config.update({region:'us-east-1'});
var rekognition = new AWS.Rekognition();


if (typeof localStorage === "undefined" || localStorage === null) {
    var LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./scratch');
}

const fetch = require('node-fetch');

const feathers = require('@feathersjs/feathers');
const rest = require('@feathersjs/rest-client');
const localApp = feathers();
const localRest = rest(conf.localApi);
localApp.configure(localRest.fetch(fetch));


var mqtt = require('mqtt');

var client  = mqtt.connect(conf.mqtt);

const cv = require('opencv4nodejs');

var camera = new cv.VideoCapture(0);

const classifier = new cv.CascadeClassifier(cv.HAAR_FRONTALFACE_ALT2);

async function authenticate(){
    const {username, password} = conf.externalAuth;
    const auth = await fetch(`${conf.apiUrl}/authentication`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            strategy: 'local',
            username: username,
            password: password
        })
    });
    const res = await auth.json()
    localStorage.setItem('accessToken', res.accessToken);
    
}

client.on('connect', async () => {
    console.log(`Connected to ${conf.mqtt}`);
    const localServer = await localApp.service('mqtt-info').get(1);
    console.log(`Local Server topic detected: ${localServer.device_name}`);
    client.subscribe(`${localServer.device_name}/${conf.camTopic}`, () => {
        console.log(`Subscribed to: ${localServer.device_name}/${conf.camTopic}`);
    });
    await authenticate();
    console.log(`Authenticated with key:\n ${localStorage.getItem('accessToken')}`);
    console.log("Cam Started Successfuly! Waiting for messages...");

});

client.on('message', async (topic, message) => {
    console.log(`Message recieved on ${topic}`);
    console.log(`Message: ${message}`);
    const jsonMessage = JSON.parse(message);
    switch (jsonMessage.method) {
        case "Face":
            
            var faceInt = setInterval( async () => {
                await camera.readAsync(async (err, frame) => {
                    if (err) throw err;
                    const options = {
                        minSize: new cv.Size(100, 100),
                        scaleFactor: 1.2,
                        minNeighbors: 10
                    };
                    const facesInFrame = await classifier.detectMultiScaleAsync(frame, options);
                    const {objects, numDetections} = facesInFrame;
                    if(objects.length === 0){
                        console.log("No face detected");
                    }else{
                        const getData = {
                            method: 'GET',
                            headers: {
                                'Authorization': localStorage.getItem('accessToken'),
                                'Accept': 'application/json',
                                'Content-Type': 'application/json'
                            }
                        };    
                        var outB64 = await cv.imencodeAsync('.jpg', frame);
                        outB64 = outB64.toString('base64');
                        const srcImg = getBinary(outB64);
                        const res = await fetch(`${conf.apiUrl}/key/${jsonMessage.id}`, getData);
                        const key = await res.json();
                        const targImg = getBinary(key.imageUri.split('base64,')[1]);
                        const lockRes = await fetch(`${conf.apiUrl}/lock/${key.lock_id}`, getData);
                        const lock = await lockRes.json();
                        const localServer = await localApp.service('mqtt-info').get(1);
                        const params = {
                            SimilarityThreshold: 90,
                            SourceImage: {
                                Bytes: srcImg
                            },
                            TargetImage: {
                                Bytes: targImg
                            }
                        }
                        var access = 0;
                        const faces = await new Promise((resolve, reject) => {
                            rekognition.compareFaces(params, (err, data) => {
                                if(err){
                                    reject(err)
                                }else{
                                    resolve(data)
                                }
                            });
                        });
                        if(faces.FaceMatches.length > 0){
                            access = 1;
                        }
                        
                        const accessReqPatch = {
                            method: 'PATCH',
                            headers: {
                                'Authorization': localStorage.getItem('accessToken'),
                                'Accept': 'application/json',
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                successfull: access,
                                imgUri: "data:image/jpeg;base64," + outB64
                            })
                        }
                        await fetch(`${conf.apiUrl}/access-request/${jsonMessage.accessId}`, accessReqPatch);
                        console.log("Log created.");
                        await clearInterval(faceInt)
                        console.log(`Publishing ${access} to ${localServer.device_name}/${lock.topic}`);
                        client.publish(`${localServer.device_name}/${lock.topic}`, access)
                    }
                })
            }, 2000);
            setTimeout(async () => {
                console.log("Waiting 8 sec after terminate.");
                await clearInterval(faceInt)
            }, 8000);

        case "OTP":
        var otpInt = setInterval( async () => {
            await camera.readAsync(async (err, frame) => {
                if (err) throw err;
                var outB64 = await cv.imencodeAsync('.jpg', frame);
                outB64 = outB64.toString('base64');
                const buffer = Buffer.from(outB64,'base64');
                const img = await Jimp.read(buffer);
                let decoded;
                qr.callback = function(error, result) {
                    if(error) {
                        return null;
                    }
                    decoded = result.result;
                    return result.result;
                };
                qr.decode(img.bitmap);
                if(decoded){
                    const getData = {
                        method: 'GET',
                        headers: {
                            'Authorization': localStorage.getItem('accessToken'),
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        }
                    };
                    const patchData = {
                        method: 'PATCH',
                        headers: {
                            'Authorization': localStorage.getItem('accessToken'),
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            status: "inactive"
                        })
                    };
                    const otp = await fetch(`${conf.apiUrl}/otp/${jsonMessage.id}`, getData);
                    const res = await otp.json();
                    const lockRes = await fetch(`${conf.apiUrl}/lock/${res.lock_id}`, getData);
                    const lock = await lockRes.json();
                    const localServer = await localApp.service('mqtt-info').get(1);
                    var access = 0;
                    if(res.secret_code === decoded){
                        access = 1;
                        console.log("OTP Valid");
                        await fetch(`${conf.apiUrl}/otp/${jsonMessage.id}`, patchData);
                        console.log("OTP Updated, no longer avialable");
                    }
                    cv.imwrite(`./images/accessRequest${jsonMessage.accessId}.jpg`, frame)
                    const accessReqPatch = {
                        method: 'PATCH',
                        headers: {
                            'Authorization': localStorage.getItem('accessToken'),
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            successfull: access,
                            imgUri: "data:image/jpeg;base64," + outB64
                        })
                    }
                    await fetch(`${conf.apiUrl}/access-request/${jsonMessage.accessId}`, accessReqPatch);
                    console.log("Log created.");
                    await clearInterval(otpInt)
                    console.log(`Publishing ${access} to ${localServer.device_name}/${lock.topic}`);
                    client.publish(`${localServer.device_name}/${lock.topic}`, access)
                }
                
            });
        }, 600);
        setTimeout(async () => {
            console.log("Waiting 8 sec after terminate.");
            await clearInterval(otpInt)
        }, 8000);
            break;
    
        default:
            break;
    }
});


