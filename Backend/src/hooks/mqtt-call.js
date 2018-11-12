// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = function (client, options = {}) {
  return async context => {
    const {result} = context;
    const lock = await context.app.service('lock').get(result.lock_id);
    const localServer = await context.app.service('local-server').get(lock.local_server_id);
    let message;
    if (result.method === 'OTP'){
      message = {
        id: result.otp_id,
        method: result.method,
        lockTopic: lock.topic
      };
    }else if (result.method === 'Face'){
      message = {
        id: result.user_id,
        method: result.method,
        lockTopic: lock.topic
      };
    }
    console.log(message);
    const jsonMessage = JSON.stringify(message);
    console.log("publishing data to topic: " + localServer.topic);
    
    client.publish(localServer.topic, jsonMessage);
    return context;
  };
};
