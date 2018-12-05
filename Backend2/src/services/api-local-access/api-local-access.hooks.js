const { authenticate } = require('@feathersjs/authentication').hooks;
const local = require('@feathersjs/authentication-local');

module.exports = {
  before: {
    all: [],
    find: [authenticate('jwt')],
    get: [authenticate('jwt')],
    create: [local.hooks.hashPassword()],
    update: [local.hooks.hashPassword()],
    patch: [authenticate('jwt')],
    remove: [authenticate('jwt')]
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [local.hooks.protect('password')],
    update: [local.hooks.protect('password'),],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
