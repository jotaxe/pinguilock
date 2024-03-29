// Initializes the `lock` service on path `/lock`
const createService = require('feathers-sequelize');
const createModel = require('../../models/lock.model');
const hooks = require('./lock.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/lock', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('lock');

  service.hooks(hooks);
};
