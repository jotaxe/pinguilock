// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async context => {
    const OTPTimeout = context.result.timeout;
    const actualDate = new Date();
    if(actualDate > OTPTimeout){
      await context.app.service('otp').patch(context.result.id, {status: 'invalid'});
      context.result = {
        'id': context.result.id,
        'status': 'invalid',
        'reason': 'timedout'
      };
    } else if(context.result.status === 'aproval pending'){
      context.result = {
        'id': context.result.id,
        'status': context.result.status,
        'email': context.result.reciever_email,
        'reason': 'OTP waiting for aproval',
        'user': context.result.user_id
      };
    } else if( context.result.status === 'active'){
      context.result = {
        'id': context.result.id,
        'status': context.result.status,
        'secret_code': context.result.secret_code,
        'email': context.result.reciever_email,
        'user': context.result.user_id
      };
    }
    return context;
  };
};
