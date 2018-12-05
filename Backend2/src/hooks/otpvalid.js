// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async context => {


    const otpservice = context.app.service('otp');
      otpservice.find({
      query:{
        id:context.id
      }
    }).then(result => {
      var current_date = new Date();
      var otptimeout = result[0].timeout;

      if (otptimeout.getTime()<=current_date.getTime()){
        const data = {
          status: 'inactive'
        };
        otpservice.patch(context.id,data);
      }
    });

    return Promise.resolve(context);
  };
};
