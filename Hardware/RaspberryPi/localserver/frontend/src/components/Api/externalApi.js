import { func } from 'prop-types';

const feathers = require('@feathersjs/feathers');
const rest = require('@feathersjs/rest-client');
const app = feathers();
const restClient = rest('http://192.168.0.11:3030')
const auth = require('@feathersjs/authentication-client');


app.configure(restClient.fetch(window.fetch));
app.configure(auth({storage: window.localStorage}));



export function authenticate(googleToken){
    return app.authenticate({
        strategy: "google-token",
        access_token: googleToken
    });
}

export function createLocalServer(admin, topic){
    return app.service('local-server').create({
        admin: admin,
        topic: topic
    });
}

export function createLock(local_server, topic, name){
    return app.service('local-server').find({query: { topic: local_server}})
    .then( (localServer) => {
        
        return app.service('lock').create({
            local_server_id: localServer.data[0].id,
            topic,
            name
        });
    })
}

export function deleteLock(local_server, topic){
    return app.service('local-server').find({query: {topic: local_server}})
    .then( (localServer) => {
        return app.service('lock').remove(null, {query: {local_server_id: localServer.data[0].id, topic}});
    })
}

export function getOTPs(){
    const userID = localStorage.getItem("user");
    return app.service('otp').find(
        {
            query: {
                granted_by_user: userID
            }
        }
    );
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

export function getUser(){
    const userID = localStorage.getItem("user");
    return app.service('user').get(userID);
}

export function getUserName(id){
    return app.service('user').get(id)
}




//export default app;