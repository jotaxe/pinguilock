// Initializes the `user_face` service on path `/user-face`
const createService = require('feathers-sequelize');
const createModel = require('../../models/user_face.model');
const hooks = require('./user_face.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/user-face', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('user-face');

  service.hooks(hooks);
};
