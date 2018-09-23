// Initializes the `access_device` service on path `/access-device`
const createService = require('feathers-sequelize');
const createModel = require('../../models/access_device.model');
const hooks = require('./access_device.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/access-device', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('access-device');

  service.hooks(hooks);
};
