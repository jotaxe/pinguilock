const { authenticate } = require('@feathersjs/authentication').hooks;


const qrcode = require('../../hooks/qrcode');


module.exports = {
  before: {
    all: [authenticate('jwt')],
    find: [],
    get: [],
    create: [qrcode()],
    update: [qrcode()],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
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
