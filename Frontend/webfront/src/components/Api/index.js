const feathers = require('@feathersjs/feathers');
const socketio = require('@feathersjs/socketio-client');
const io = require('socket.io-client');
const auth = require('@feathersjs/authentication-client');

const socket = io('http://ec2-18-191-188-122.us-east-2.compute.amazonaws.com:3030');
const app = feathers();

// Set up Socket.io client with the socket
app.configure(socketio(socket));
app.configure(auth({storage: localStorage, storageKey: 'accessToken'}));

export default app;