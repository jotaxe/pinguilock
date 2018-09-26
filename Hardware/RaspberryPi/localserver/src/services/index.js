const devices = require('./devices/devices.service.js');
const mqttInfo = require('./mqtt-info/mqtt-info.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(devices);
  app.configure(mqttInfo);
};
