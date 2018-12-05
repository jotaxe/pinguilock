
const feathers = require('@feathersjs/feathers');


const configuration = require('@feathersjs/configuration');
const conf = configuration();
let app = feathers().configure(conf);

const socketio = require('@feathersjs/socketio-client');
const io = require('socket.io-client');
const extApp = feathers();
const socket = io(app.get('externalApi').url, {secure: true}); //direccion de la api
const auth = require('@feathersjs/authentication-client');
const {username, password} = app.get('externalApi').credentials;
//app.configure(restClient.fetch(window.fetch));
extApp.configure(socketio(socket));
extApp.configure(auth()); 
extApp.authenticate({strategy: "local", username, password});

module.exports =  extApp;