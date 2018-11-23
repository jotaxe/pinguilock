const feathers = require('@feathersjs/feathers');
const socketio = require('@feathersjs/socketio-client');
const io = require('socket.io-client');
const auth = require('@feathersjs/authentication-client');

const socket = io('http://18.191.188.122');
const app = feathers();

// Set up Socket.io client with the socket
app.configure(socketio(socket));
app.configure(auth({storage: localStorage, storageKey: 'accessToken'}));

export default app;