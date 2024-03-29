// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async context => {
    if(context.method === 'find'){
      context.result.map(async (face, index) => {
        const imageUri = await context.app.service('uploads').get(face.image_path);
        context.result[index].imageUri = imageUri.uri;
        
      });
    }else if (context.method === 'get'){
      const imageUri = await context.app.service('uploads').get(context.result.image_path);  
      context.result.imageUri = imageUri.uri;
    }
    return context;
  };
};
