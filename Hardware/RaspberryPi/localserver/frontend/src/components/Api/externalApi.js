// const feathers = require('@feathersjs/feathers');
// const rest = require('@feathersjs/rest-client');
// const app = feathers();
// const restClient = rest('http://192.168.0.11:3030')
// const auth = require('@feathersjs/authentication-client');

const feathers = require('@feathersjs/feathers');
const socketio = require('@feathersjs/socketio-client');
const io = require('socket.io-client');
const app = feathers();
const socket = io('http://18.191.188.122'); //direccion de la api
const auth = require('@feathersjs/authentication-client')
const rest = require('@feathersjs/rest-client');
const restClient = rest('http://18.191.188.122')

//app.configure(restClient.fetch(window.fetch));
app.configure(socketio(socket));
app.configure(auth({storage: window.localStorage})); 



export function authenticate(googleToken){
    console.log("authenticating");
    return app.authenticate({
        strategy: "google-token",
        access_token: googleToken
    }).then((res) => {console.log(res); return res});
}

export function createLocalServer(admin, topic){
    app.authenticate().then(() => {
        return app.service('local-server').create({
            admin: admin,
            topic: topic
        });
    });
    
}

export function createLock(local_server, topic, name){
    return app.authenticate().then(() => {
        return app.service('local-server').find({query: { topic: local_server}})
        .then( (localServer) => {
        
            return app.service('lock').create({
                local_server_id: localServer.data[0].id,
                topic,
                name
            });
        })

    })
}

export function deleteLock(local_server, topic){
    return app.authenticate().then(() => {
        return app.service('local-server').find({query: {topic: local_server}})
        .then( (localServer) => {
            return app.service('lock').remove(null, {query: {local_server_id: localServer.data[0].id, topic}});
        });
    }) 
}

export function getOTPs(){
    return app.authenticate().then( (res) => {
        const userID =  res.user.id;
        return app.service('otp').find(
            {
                query: {
                    granted_by_user: userID
                }
            }
        );
    });
    
    
}
export function createOTP(email, lock){
    const userID = localStorage.getItem("user");
    return app.service('otp').create({
        reciever_email: email,
        granted_by_user: userID,
        lock_id: lock
    });
}

export function deleteOTP(id){
    app.service('otp').patch(id, {status: 'inactive'});
}

export function aproveOTP(id){
    app.service('otp').patch(id, {status: 'active'});
}

export function getKeys(){
    return app.authenticate().then( (res) => {
        const lockIds = res.user.locks.map(lock => lock.id);
        return app.service('key').find({
            query: {
                lock_id: {
                    $in: lockIds
                }
            }
        });
    });
}

export function createKey(userId, lockId, imageUri, keyName){
    return app.authenticate().then( () => {
        return app.service('key').create({user_id: userId, lock_id: lockId, faceUri: imageUri, name: keyName});
    })
}

export function removeKey(id){
    return app.authenticate().then((res) => {
        return app.service('key').remove(id);
    });
}



export function getUser(){
    const userID = localStorage.getItem("user");
    return app.authenticate().then(() => {return app.service('user').get(userID);})
}

export function getUserName(id){
    return app.service('user').get(id)
}

export default app




//export default app;