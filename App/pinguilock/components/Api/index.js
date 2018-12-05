import io from 'socket.io-client';
import feathers from '@feathersjs/feathers';
import socketio from '@feathersjs/socketio-client';
import { AsyncStorage } from "react-native";
import auth from '@feathersjs/authentication-client';

const socket = io('18.191.188.122', {
  transports: ['websocket'],
  rekectUnauthorized: false,
  forceNew: true
});
const client = feathers();

client.configure(socketio(socket));
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

