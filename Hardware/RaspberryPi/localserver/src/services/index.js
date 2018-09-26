const mqttInfo = require('./mqtt-info/mqtt-info.service.js');
const devices = require('./devices/devices.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(mqttInfo);
  app.configure(devices);
};
