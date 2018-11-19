// Initializes the `apiLocalAccess` service on path `/api-local-access`
const createService = require('feathers-sequelize');
const createModel = require('../../models/api-local-access.model');
const hooks = require('./api-local-access.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/api-local-access', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('api-local-access');

  service.hooks(hooks);
};
