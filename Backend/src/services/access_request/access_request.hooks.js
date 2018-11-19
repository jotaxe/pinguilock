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


module.exports = {
  before: {
    all: [ authenticate('jwt')],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [getAccessRequest()],
    create: [mqttCall(client)],
    update: [],
    patch: [],
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
