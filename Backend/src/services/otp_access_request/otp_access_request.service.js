// Initializes the `otp_access_request` service on path `/otp-access-request`
const createService = require('feathers-sequelize');
const createModel = require('../../models/otp_access_request.model');
const hooks = require('./otp_access_request.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/otp-access-request', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('otp-access-request');

  service.hooks(hooks);
};
