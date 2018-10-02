// Initializes the `mqtt-info` service on path `/mqtt-info`
const createService = require('feathers-nedb');
const createModel = require('../../models/mqtt-info.model');
const hooks = require('./mqtt-info.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/mqtt-info', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('mqtt-info');

  service.hooks(hooks);
};
