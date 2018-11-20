// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async context => {
    if(context.method === 'find'){
      context.result.data.map(async (accessRequest, index) => {
        const imageUri =  await context.app.service('uploads').get(accessRequest.access_image);
        context.result.data[index].imageUri = imageUri.uri;
        context.result.data[index].test = "este si aparece";
      });
    }else{
      const imageUri = await context.app.service('uploads').get(context.result.access_image);  
      context.result.imageUri = imageUri.uri;
    }
    return context;
  };
};
