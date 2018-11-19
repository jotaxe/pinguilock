const user = require('./user/user.service.js');
const face = require('./face/face.service.js');
const otp = require('./otp/otp.service.js');
const key = require('./key/key.service.js');
const accessRequest = require('./access_request/access_request.service.js');
const localServer = require('./local_server/local_server.service.js');
const lock = require('./lock/lock.service.js');
const uploads = require('./uploads/uploads.service.js');
const apiLocalAccess = require('./api-local-access/api-local-access.service.js');
// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.configure(face);
  app.configure(user);
  app.configure(otp);
  app.configure(key);
  app.configure(accessRequest);
  app.configure(localServer);
  app.configure(lock);
  app.configure(uploads);
  app.configure(apiLocalAccess);
};
