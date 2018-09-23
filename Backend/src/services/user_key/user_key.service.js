// Initializes the `user_key` service on path `/user-key`
const createService = require('feathers-sequelize');
const createModel = require('../../models/user_key.model');
const hooks = require('./user_key.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/user-key', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('user-key');

  service.hooks(hooks);
};
