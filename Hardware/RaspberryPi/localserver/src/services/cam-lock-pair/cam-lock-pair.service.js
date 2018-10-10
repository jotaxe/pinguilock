// Initializes the `cam-lock-pair` service on path `/cam-lock-pair`
const createService = require('feathers-nedb');
const createModel = require('../../models/cam-lock-pair.model');
const hooks = require('./cam-lock-pair.hooks');

module.exports = function (app) {
  const Model = createModel(app);
  const paginate = app.get('paginate');

  const options = {
    Model,
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/cam-lock-pair', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('cam-lock-pair');

  service.hooks(hooks);
};
