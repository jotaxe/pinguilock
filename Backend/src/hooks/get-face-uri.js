// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async context => {
    if(context.method === 'get'){
      const face = await context.app.service('face').find({query: {key_id: context.result.id}});
      context.result.image_path = face.data[0].image_path;
    }else if(context.method === 'find'){
      const keysId = context.result.data ? context.result.data.map((key) => {return key.id}) : [];
      const faces = await context.app.service('face').find({
        query: {
          key_id: {
            $in: keysId
          }
        }
      });
      context.result.data ? context.result.data.map((key, index) => {
        const face = faces.data.find((face) => face.key_id === key.id);
        context.result.data[index].image_path = face.image_path;
      }) : null;
      
    }
    return context;
  };
};
