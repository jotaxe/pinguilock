const mqttInfo = require('./mqtt-info/mqtt-info.service.js');
const devices = require('./devices/devices.service.js');
const adminUser = require('./admin-user/admin-user.service.js');
const camLockPair = require('./cam-lock-pair/cam-lock-pair.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(mqttInfo);
  app.configure(devices);
  app.configure(adminUser);
  app.configure(camLockPair);
};
