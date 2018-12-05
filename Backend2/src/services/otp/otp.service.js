// Initializes the `otp` service on path `/otp`
const createService = require('feathers-sequelize');
const createModel = require('../../models/otp.model');
const hooks = require('./otp.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');
  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/otp', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('otp');

  service.hooks(hooks);
};
