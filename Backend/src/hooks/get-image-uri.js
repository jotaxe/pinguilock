// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async context => {
      if(context.method === 'find'){
        console.log("getImageUri en find!");
        context.result.data.map(async (face, index) => {
          console.log("empezo const imageUri");
          const imageUri = await context.app.service('uploads').get(face.image_path);
          console.log("termino const imageUri");  
          context.result.data[index].imageUri = imageUri.uri;
          context.result.data[index].test = "este si aparece";
        });
    }else if (context.method === 'get'){
      const imageUri = await context.app.service('uploads').get(context.result.image_path);  
      context.result.imageUri = imageUri.uri;
    }
    console.log(context.result.data[0].imageUri);
    console.log(context.result.data[0].test); 
    return context;
  };
};
