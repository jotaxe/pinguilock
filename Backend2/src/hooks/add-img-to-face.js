// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async context => {
    const imgUri = context.data.imgUri;
    const imgPath = await context.app.service('uploads').create({uri: imgUri});
    context.data.image_path = imgPath.id;
    return context;
  };
};
