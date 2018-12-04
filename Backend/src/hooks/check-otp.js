// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async context => {
    const actualDate = new Date();
    if(context.method === 'get'){
      const OTPTimeout = context.result.timeout;
      if((actualDate > OTPTimeout) && (context.result.status !== 'timedout' && context.result.status !== 'inactive') ){
        await context.app.service('otp').patch(context.result.id, {status: 'timedout'});
        delete context.result.status;
        delete context.result.secret_code;
        context.result.status = 'timedout'
      } else if(context.result.status !== 'active'){
        delete context.result.secret_code;
      }
    }else if(context.method === 'find'){
      const timedOutOTP = context.result.data ? context.result.data.map((otp, index) => {
        if( (actualDate > otp.timeout) && (otp.status !== 'timedout' && otp.status !== 'inactive') ){
          delete context.result.data[index].status;
          delete context.result.data[index].secret_code;
          context.result.data[index].status = 'timedout';
          return otp.id;
        } else if(otp.status !== 'active'){
          delete context.result.data[index].secret_code;
          if(otp.status === 'inactive'){
            delete context.result.data[index];
          }
        }
      }): [];
      context.result.data = context.result.data ? context.result.data.filter((otp) => {return otp !== null}) : null; 
      if(timedOutOTP !== []){
        context.app.service('otp').patch(null, {status: 'timedout'}, {
          query: {
            id: {
              $in: timedOutOTP
            }
          }
        })
      }
    }
    return context;
  };
};
