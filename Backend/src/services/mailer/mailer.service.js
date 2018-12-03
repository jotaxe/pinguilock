// Initializes the `mailer` service on path `/mailer`
const mailer = require('feathers-mailer');
const nodemailer = require('nodemailer');

const createService = require('./mailer.class.js');
const hooks = require('./mailer.hooks');


module.exports = function (app) {
  const transporter = app.get('email');
  

  // Initialize our service with any options it requires
  app.use('/mailer', mailer(transporter));

  // Get our initialized service so that we can register hooks
  const service = app.service('mailer');

  service.hooks(hooks);
};
