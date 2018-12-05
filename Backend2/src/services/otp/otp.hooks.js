const { authenticate } = require('@feathersjs/authentication').hooks;


const qrcode = require('../../hooks/qrcode');


const jsonqrcode = require('../../hooks/jsonqrcode');





const checkOtp = require('../../hooks/check-otp');



const sendMail = require('../../hooks/send-mail');



module.exports = {
  before: {
    all: [authenticate('jwt')],
    find: [],
    get: [],
    create: [qrcode()],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [checkOtp()],
    get: [checkOtp()],
    create: [jsonqrcode(), sendMail()],
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
