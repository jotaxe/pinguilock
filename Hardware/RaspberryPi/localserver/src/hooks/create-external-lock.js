// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const extApp = require('../externalApi/extApp');

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async context => {
    const {topic, name} = context.data;
    const localServer = await context.app.service('mqtt-info').find({query: {_id: "1"}});
    const {device_name} = localServer.data[0];
    
    const extLocalServer = await extApp.service('local-server').find({query: {topic: device_name}});
    const local_server_id = extLocalServer.data[0].id;
    const extLock = await extApp.service('lock').create({topic, name, local_server_id});
    const extLockId = toString(extLock.id);
    context.data = {
      cam_topic: context.data.cam_topic,
      ext_lock_id: extLockId,
    }
    return context;
  };
};
