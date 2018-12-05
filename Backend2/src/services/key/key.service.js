// Initializes the `key` service on path `/key`
const createService = require('feathers-sequelize');
const createModel = require('../../models/key.model');
const hooks = require('./key.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/key', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('key');

  service.hooks(hooks);
};
