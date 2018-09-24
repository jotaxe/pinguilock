
const face = require('./face/face.service.js');
const otp = require('./otp/otp.service.js');
const key = require('./key/key.service.js');
const accessRequest = require('./access_request/access_request.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(face);
  app.configure(otp);
  app.configure(key);
  app.configure(accessRequest);
};
