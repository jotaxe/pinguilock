// Initializes the `face` service on path `/face`
const createService = require('feathers-sequelize');
const createModel = require('../../models/face.model');
const hooks = require('./face.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/face', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('face');

  service.hooks(hooks);
};
