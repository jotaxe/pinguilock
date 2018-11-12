const { authenticate } = require('@feathersjs/authentication').hooks;
function customizeGoogleProfile(){
 return function(hook){
  if (hook.data.google) {
   hook.data.email = hook.data.google.profile.emails.find(email => email.type==='account').value
   hook.data.name = hook.data.google.profile.displayName
  }
  return Promise.resolve(hook);
 }
}
const retrieveAdmin = require('../../hooks/retrieve-admin');
module.exports = {
  before: {
    all: [],
    find: [ authenticate('jwt') ],
    get: [ authenticate('jwt') ],
    create: [customizeGoogleProfile()],
    update: [customizeGoogleProfile(), authenticate('jwt')],
    patch: [  authenticate('jwt') ],
    remove: [ authenticate('jwt') ]
  },


  after: {
    all: [],
    find: [],
    get: [retrieveAdmin()],
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
