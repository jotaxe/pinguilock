const { authenticate } = require('@feathersjs/authentication').hooks;
const mqtt = require('mqtt');
const mqttHost = "mqtt://localhost";
const client = mqtt.connect(mqttHost);
client.on('connect', function() {
  console.log("MQTT Client running on " + mqttHost);
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
