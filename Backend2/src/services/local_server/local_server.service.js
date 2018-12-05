// Initializes the `local_server` service on path `/local-server`
const createService = require('feathers-sequelize');
const createModel = require('../../models/local_server.model');
const hooks = require('./local_server.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/local-server', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('local-server');

  service.hooks(hooks);
};
