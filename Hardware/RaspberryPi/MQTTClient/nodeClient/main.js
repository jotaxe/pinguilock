const confFile = require('./config.json');
const conf = process.env.NODE_ENV === 'production' ? confFile.production : confFile.development;

if (typeof localStorage === "undefined" || localStorage === null) {
    var LocalStorage = require('node-localstorage').LocalStorage;
    localStorage = new LocalStorage('./scratch');
  }
const feathers = require('@feathersjs/feathers');
const rest = require('@feathersjs/rest-client');
const localApp = feathers();
const localRest = rest(conf.localApi);
const fetch = require('node-fetch');

var mqtt = require('mqtt');

var client  = mqtt.connect(conf.mqtt);

localApp.configure(localRest.fetch(fetch));



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
    client.subscribe(localServer.device_name, () => {
        console.log(`Subscribed to: ${localServer.device_name}`);
    });
    await authenticate()
    console.log(`Authenticated with key:\n ${localStorage.getItem('accessToken')}`);
});

client.on('message', async (topic, message) => {
    console.log(`Message recieved on ${topic}`);
    console.log(`Message: ${message}`);
    const messageObject = JSON.parse(message);
    
    const data = {
        method: 'GET',
        headers: {
            'Authorization': localStorage.getItem('accessToken'),
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    };
    const accessRequestId = messageObject.accessRequest;
    const response = await fetch(`${conf.apiUrl}/access-request/${accessRequestId}`, data);
    const accessRequest = await response.json();
    console.log(accessRequest);
    const {method, lock_id} = accessRequest;
    let otpId, keyId;
    if(method === 'Face'){
        keyId = accessRequest.key_id;
    }else if (method === 'OTP' ){
        otpId = accessRequest.otp_id;
    }
    const localDevice = await localApp.service('devices').find({query: {ext_lock_id: lock_id}});
    const localServerName = await localApp.service('mqtt-info').get(1);
    const camTopic = `${localServerName.device_name}/${localDevice[0].cam_topic}`;
    
    const camMessage = JSON.stringify({
        accessId: accessRequest.id,
        method: method, 
        id: otpId || keyId, 
        lockId: lock_id
    });
    console.log(`Publishing ${camMessage} to ${camTopic}`);
    client.publish(camTopic, camMessage);
});

