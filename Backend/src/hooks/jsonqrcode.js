// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async context => {
      context.result = {
        "id" : context.result.id, 
        "metadata": { 
          "status": context.result.status, 
          "timeout": context.result.timeout 
        } 
      };
    return context;
  };
};
