
const feathers = require('@feathersjs/feathers');
const socketio = require('@feathersjs/socketio-client');
const io = require('socket.io-client');
const extApp = feathers();
const socket = io('https://www.pinguilock.tk'); //direccion de la api
const auth = require('@feathersjs/authentication-client')
const rest = require('@feathersjs/rest-client');
const restClient = rest('https://www.pinguilock.tk')

//extApp.configure(restClient.fetch(window.fetch));
extApp.configure(socketio(socket));
const {username, password} = app.get('externalApi').credentials;
extApp.configure(auth()); 
extApp.authenticate({strategy: "local", username, password});

module.exports =  extApp;