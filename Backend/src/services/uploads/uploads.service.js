// Initializes the `uploads` service on path `/uploads`
const createService = require('./uploads.class.js');
const hooks = require('./uploads.hooks');



const blobService = require('feathers-blob');
const fs = require('fs-blob-store');
const blobStorage = fs('./uploads');

module.exports = function (app) {
  
  const paginate = app.get('paginate');

  const options = {
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/uploads', blobService({ Model: blobStorage}));

  // Get our initialized service so that we can register hooks
  const service = app.service('uploads');

  service.hooks(hooks);
};
