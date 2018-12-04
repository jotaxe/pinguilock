// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html
const extApp = require('../externalApi/extApp');
// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async context => {
    if(context.method !== 'find'){
      const extLockInfo = await extApp.service('lock').get(context.result.ext_lock_id);
      context.result.name = extLockInfo.name;
      context.result.lock_topic = extLockInfo.topic;
    }else {
      const extLockIds = context.result.data.map(device => device.ext_lock_id);
      const extLocks = await extApp.service('lock').find({
        query: {
          id: {
            $in: extLockIds
          }
        }
      });
      console.log(extLocks);
      context.result.data.map( async (device, index) => {
        const extLock = await extLocks.find(lock => lock.id === parseInt(device.ext_lock_id));
        context.result.data[index].name = extLock ? extLock.name : 0;
        context.result.data[index].lock_topic = extLock ? extLock.topic : 0;
      });
    }
    return context;
  };
};
