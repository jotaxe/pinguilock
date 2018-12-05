

const path = require('path');
const favicon = require('serve-favicon');
const compress = require('compression');
const helmet = require('helmet');
const cors = require('cors');
const logger = require('./logger');

const feathers = require('@feathersjs/feathers');
const configuration = require('@feathersjs/configuration');
const express = require('@feathersjs/express');
const socketio = require('@feathersjs/socketio');


const middleware = require('./middleware');
const services = require('./services');
const appHooks = require('./app.hooks');
const channels = require('./channels');

const sequelize = require('./sequelize');

const authentication = require('./authentication');

const httpApp = express(feathers());



// Load httpApp configuration
httpApp.configure(configuration());
// Enable security, CORS, compression, favicon and body parsing
httpApp.use(helmet());
httpApp.use(cors());
httpApp.use(compress());
httpApp.use(express.json({limit: '10mb'}));
httpApp.use(express.urlencoded({limit: '10mb', extended: true }));
httpApp.use(favicon(path.join(httpApp.get('public'), 'favicon.ico')));
// Host the public folder
httpApp.use('/', express.static(httpApp.get('public')));
httpApp.use('/redirect', express.static(httpApp.get('public')));
httpApp.use('/assingOTP/*', express.static(httpApp.get('public')));

// Set up Plugins and providers
httpApp.configure(express.rest());
httpApp.configure(socketio());

httpApp.configure(sequelize);

// Configure other middleware (see `middleware/index.js`)
httpApp.configure(middleware);
httpApp.configure(authentication);
// Set up our services (see `services/index.js`)
httpApp.configure(services);
// Set up event channels (see channels.js)
httpApp.configure(channels);

// Configure a middleware for 404s and the error handler
httpApp.use(express.notFound());
httpApp.use(express.errorHandler({ logger }));

httpApp.hooks(httpAppHooks);

module.exports = httpApp;
