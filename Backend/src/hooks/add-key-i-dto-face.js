// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async context => {
    const faceId = context.dispatch.faceId;
    const face = await context.app.service('face').patch(faceId, {key_id: context.result.id});
    context.result.image_path = face.image_path;
    context.result.adminId = context.dispatch.user;
    context.dispatch = context.result;
    return context;
  };
};
