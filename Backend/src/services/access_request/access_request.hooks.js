const { authenticate } = require('@feathersjs/authentication').hooks;
const mqtt = require('mqtt');
const mqttHost = "mqtt://localhost";
const client = mqtt.connect(mqttHost);
client.on('connect', function() {
  console.log("MQTT Client running on " + mqttHost);
})

const mqttCall = require('../../hooks/mqtt-call');


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
    get: [],
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
