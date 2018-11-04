// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async context => {
    var current_date = new Date();
    const otpservice = context.app.service('otp');
      otpservice.find({
      query:{
        $select : ['timeout', 'id']
      }
    }).then(timeouts => {
      console.log("timeouts", timeouts);
    });
    console.log("hora actual", current_date);
    

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
