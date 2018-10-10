
const feathers = require('@feathersjs/feathers');
const rest = require('@feathersjs/rest-client');
const app = feathers();
const restClient = rest('http://localhost:3030')


app.configure(restClient.fetch(window.fetch));

export function getMQTTInfo(){
    return app.service("mqtt-info").get(1);
}

export function getAdmin(){
    return app.service("admin-user").get(1);
}

export function addDevice(device){
    app.service("devices").create({name: device.name, type: device.type});
}

export function getDevices(){
    return app.service("devices").find();
}

export function pairDevices(cam, lock){
    app.service("cam-lock-pair").create({cam_name: cam, lock_name: lock});
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
    app.service("devices").remove(id);
}

//export default app;