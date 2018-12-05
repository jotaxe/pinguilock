// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async context => {
    const faceUri = context.data.faceUri;
    const face = await context.app.service('face').create({imgUri: faceUri});
    context.dispatch = {
      faceId: face.id,
      user: context.params.user.id
    };
    return context;
  };
};
