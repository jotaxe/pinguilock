// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async context => {
    if(context.method === 'get'){
      const face = await context.app.service('face').find({query: {key_id: context.result.id}});
      const imageUri = await context.app.service('uploads').get(face[0].image_path); 
      context.result.imageUri = imageUri.uri;
    }else if(context.method === 'find'){
      const keysId = context.result ? context.result.map((key) => {return key.id}) : [];
      const faces = await context.app.service('face').find({
        query: {
          key_id: {
            $in: keysId
          }
        }
      });
      context.result ? context.result.map(async (key, index) => {
        const face = faces.find((face) => face.key_id === key.id);
        const imageUri = await context.app.service('uploads').get(face.image_path); 
        console.log(imageUri); 
        context.result[index].imageUri = imageUri.uri;
      }) : null;
      
    }
    return context;
  };
};
