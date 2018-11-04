const { authenticate } = require('@feathersjs/authentication').hooks;


const qrcode = require('../../hooks/qrcode');


const jsonqrcode = require('../../hooks/jsonqrcode');


const otpexpire = require('../../hooks/otpexpire');


const otpvalid = require('../../hooks/otpvalid');



module.exports = {
  before: {
    all: [authenticate('jwt')],
    find: [],
    get: [otpvalid()],
    create: [qrcode()],
    update: [qrcode()],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [otpexpire()],
    create: [jsonqrcode()],
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
