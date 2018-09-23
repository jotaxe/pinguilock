const user = require('./user/user.service.js');
const userKey = require('./user_key/user_key.service.js');
const accessDevice = require('./access_device/access_device.service.js');
const userFace = require('./user_face/user_face.service.js');
const otp = require('./otp/otp.service.js');
const otpUser = require('./otp_user/otp_user.service.js');
const userAccessRequest = require('./user_access_request/user_access_request.service.js');
const otpAccessRequest = require('./otp_access_request/otp_access_request.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(user);
  app.configure(userKey);
  app.configure(accessDevice);
  app.configure(userFace);
  app.configure(otp);
  app.configure(otpUser);
  app.configure(userAccessRequest);
  app.configure(otpAccessRequest);
};
