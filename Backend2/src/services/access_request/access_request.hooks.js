const { authenticate } = require('@feathersjs/authentication').hooks;
const mqtt = require('mqtt');


const feathers = require('@feathersjs/feathers');
const configuration = require('@feathersjs/configuration');
const conf = configuration();
let app = feathers().configure(conf);

const client = mqtt.connect(app.get('mqtt'));
client.on('connect', function() {
  console.log("MQTT Client running on " + app.get('mqtt'));
})

const mqttCall = require('../../hooks/mqtt-call');


const getAccessRequest = require('../../hooks/get-access-request');


const uploadAccessImage = require('../../hooks/upload-access-image');


const addImageToResult = require('../../hooks/add-image-to-result');


module.exports = {
  before: {
    all: [ authenticate('jwt')],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [uploadAccessImage()],
    remove: []
  },

  after: {
    all: [],
    find: [addImageToResult()],
    get: [getAccessRequest(), addImageToResult()],
    create: [mqttCall(client)],
    update: [],
    patch: [addImageToResult()],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
