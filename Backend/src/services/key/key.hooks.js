const { authenticate } = require('@feathersjs/authentication').hooks;


const addFaceToKey = require('../../hooks/add-face-to-key');


const addKeyIDtoFace = require('../../hooks/add-key-i-dto-face');


const getFaceUri = require('../../hooks/get-face-uri');


module.exports = {
  before: {
    all: [ authenticate('jwt')],
    find: [],
    get: [],
    create: [addFaceToKey()],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [getFaceUri()],
    get: [getFaceUri()],
    create: [addKeyIDtoFace()],
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
