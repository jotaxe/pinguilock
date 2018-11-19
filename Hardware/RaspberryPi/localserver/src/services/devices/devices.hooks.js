

const createExternalLock = require('../../hooks/create-external-lock');

const addInfoToLock = require('../../hooks/add-info-to-lock');

const deleteLock = require('../../hooks/delete-lock');

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [createExternalLock()],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [addInfoToLock()],
    get: [addInfoToLock()],
    create: [addInfoToLock()],
    update: [],
    patch: [],
    remove: [deleteLock()]
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
