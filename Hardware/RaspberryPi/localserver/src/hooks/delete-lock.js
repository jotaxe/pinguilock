// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const extApp = require('../externalApi/extApp');
// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async context => {
    extApp.service('lock').remove(context.result.external_lock_id);
    return context;
  };
};
