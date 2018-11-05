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
      var otptimeout = result.data[0].timeout;

      // console.log("timeout :", otptimeout.getTime());
      // console.log("acttime :", current_date.getTime());
      // console.log("timeout :", otptimeout);
      // console.log("acttime :", current_date);
      if (otptimeout.getTime()<=current_date.getTime()){
        const data = {
          valid: false
        };
        otpservice.patch(context.id,data);
      }
    });


    //  if (current_date.getHours() >= expired_date.getHours()){
    //   console.log("es invalido");
    //   console.log("hora actual", current_date.getHours());
    //   console.log("hora de espiracion", expired_date.getHours());
    //   context.data.valid = FALSE;
    // }
    // console.log("es valido" );
    // console.log("hora actual", current_date.getHours());
    // console.log("hora de espiracion", expired_date.getHours());
    return Promise.resolve(context);
  };
};
