// Initializes the `admin-user` service on path `/admin-user`
const createService = require('feathers-nedb');
const createModel = require('../../models/admin-user.model');
const hooks = require('./admin-user.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/admin-user', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('admin-user');

  service.hooks(hooks);
};
