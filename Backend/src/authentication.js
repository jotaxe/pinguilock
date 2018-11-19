const authentication = require('@feathersjs/authentication');
const jwt = require('@feathersjs/authentication-jwt');

const oauth2 = require('@feathersjs/authentication-oauth2');

const local = require('@feathersjs/authentication-local');

const GoogleStrategy = require('passport-google-oauth20');
const GoogleTokenStrategy = require('passport-google-token').Strategy;

const makeHandler = require('./oauth-handler');

module.exports = function (app) {
  const config = app.get('authentication');


  const handler = makeHandler(app);
  // Set up authentication with the secret
  app.configure(authentication(config));
  app.configure(jwt());

  

  app.configure(oauth2(Object.assign({
    name: 'google',
    Strategy: GoogleStrategy,
    handler: handler(config.google.successRedirect)
  }, config.google)));

  app.configure(oauth2(Object.assign({
    name: 'google-token',
    Strategy: GoogleTokenStrategy,
    idField: 'googleId',
  }, config.googleToken)));


  app.configure(oauth2(Object.assign({
    name: 'googleSignin',
    Strategy: GoogleStrategy,
    idField: 'googleId',
  }, config.googleSignin)));

  app.configure(local(Object.assign({
    name: 'local',
    entity: 'api_local_access',
    service: 'api-local-access',
    usernameField: 'username',
    passwordField: 'password',
    entityUsernameField: 'username',
    entityPasswordField: 'password',
  })))

  // The `authentication` service is used to create a JWT.
  // The before `create` hook registers strategies that can be used
  // to create a new valid JWT (e.g. local or oauth2)
  app.service('authentication').hooks({
    before: {
      create: [
        authentication.hooks.authenticate(config.strategies)
      ],
      remove: [
        authentication.hooks.authenticate('jwt')
      ]
    },
    after: {
      create: [
        async (context) => {

          context.result.user = context.params.user ? await context.app.service('user').get(context.params.user.id) : null;
        }
      ]
    }
  });
};
