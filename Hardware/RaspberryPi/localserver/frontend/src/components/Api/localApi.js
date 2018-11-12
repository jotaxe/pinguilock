import { createLock, deleteLock } from './externalApi';

const feathers = require('@feathersjs/feathers');
const rest = require('@feathersjs/rest-client');
const app = feathers();
const restClient = rest('http://localhost:3031')


app.configure(restClient.fetch(window.fetch));



export function getMQTTInfo(){
    return app.service("mqtt-info").get(1);
}

export function getAdmin(){
    return app.service("admin-user").get(1);
}

export function setAdmin(adminMail){
    return app.service("admin-user").create({_id: "1", mail: adminMail})
}

export function addDevice(device){
    return app.service("devices").create({topic: device.topic, name: device.name, type: device.type})
    .then(() => {
        if(device.type === 'lock'){
            getMQTTInfo().then((devData) => {
                createLock(devData.device_name, device.topic, device.name )
            })
        }
    });
    
}

export function getDevices(){
    return app.service("devices").find();
}

export function pairDevices(cam, lock){
    app.service("cam-lock-pair").create({cam_topic: cam, lock_topic: lock});
}

export function getPairs(){
    return app.service("cam-lock-pair").find();
}

export function getCams(){
    return app.service("devices").find({query: {type: "cam"}});
}

export function getLocks(){
    return app.service("devices").find({query:{ type: "lock"}});
}

export function deletePair(id){
    app.service("cam-lock-pair").remove(id);
}

export function deleteDevice(id){
    return app.service("devices").remove(id).then( (device) => {
        if(device.type === 'lock'){
            getMQTTInfo().then((devData) => {
                deleteLock(devData.device_name, device.topic )
            })
        }
    });
}

//export default app;