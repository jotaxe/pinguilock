// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async context => {

    function makeid() {
      var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (var i = 0; i < 100; i++)
          text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
    }
    var secret_code =  makeid();
    var time = new Date();
    var timeout = new Date(time);

    timeout.setHours(time.getHours() + 1);
    context.data.timeout = timeout;
    context.data.secret_code = secret_code;
    context.data.valid = true;
    return context;
  };
};
