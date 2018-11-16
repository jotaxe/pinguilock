// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async context => {
    if (context.method === 'get'){
      if(context.result.method === 'Face'){
        const keyQuery = {
          query: {
            user_id: context.result.user_id,
            lock_id: context.result.lock_id
          }
        }
        const accessKey = await context.app.service('key').find({keyQuery});
        
        const faceQuery = {
          query: {
            key_id: accessKey.data[0].id 
          }
        }
        const face = await context.app.service('face').find({faceQuery});
        context.result.face = face.data[0].image_path;

      }else if (context.result.method === 'OTP'){
        const otp = context.app.service('otp').get(context.result.otp_id)
        if(otp.status !== 'active'){
          context.result.otp = 'inactive';
        }else{
          context.result.otp = otp.secret_code;
        }
      }
    }
    return context;
  };
};
