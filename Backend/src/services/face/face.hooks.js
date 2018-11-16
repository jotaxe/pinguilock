const { authenticate } = require('@feathersjs/authentication').hooks;


const getImageUri = require('../../hooks/get-image-uri');


const addImgToFace = require('../../hooks/add-img-to-face');


module.exports = {
  before: {
    all: [ authenticate('jwt')],
    find: [],
    get: [],
    create: [addImgToFace()],
    update: [],
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
