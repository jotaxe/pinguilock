import { AsyncStorage } from "react-native";
const feathers = require('@feathersjs/feathers');
const rest = require('@feathersjs/rest-client');
const auth = require('@feathersjs/authentication-client')
const client = feathers();

// Connect to a different URL
const restClient = rest('http://18.191.188.122:80/')

// Configure an AJAX library (see below) with that client 
client.configure(restClient.fetch(fetch));

client.configure(auth({storage: AsyncStorage}));


export function authenticate(googleToken){
    return Promise.resolve(client.authenticate({
        strategy: "google-token",
        access_token: googleToken
    }));
}

export function fetchUserOTP(userGoogleId){
    return client.service("otp").find({
        query: {
            googleId: userGoogleId
        }
    });
}

export function fetchUserKeys(userGoogleId){
    return client.service("keys").find({
        query: {
            googleId: userGoogleId
        }
    });
}

