// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async context => {
    const user = context.result.id;
    const adminLocalServers = await context.app.service("local-server").find({
      query: {
        $select: ["id", "topic"],
        admin: user
      }
    });
    console.log(adminLocalServers);
    const localServers = adminLocalServers ? adminLocalServers.map((obj) => obj.id) : [];
    const adminLock = localServers.length > 0 ? await context.app.service('lock').find(
      {
        $select: ["topic", "local_server_id", "id"],
        local_server_id: {
          $in: localServers
        }
      }
    ) : [];

    const userKeys = await context.app.service('key').find(
      {
        $select: ['id', 'name', 'lock_id'],
        query: { 
          user_id: context.result.id
        }
      }
    );

    const grantedByUserOTPs = await context.app.service('otp').find(
      {
        $select: ['id', 'status', 'lock_id', 'user_id', 'timeout', 'reciever_email'],
        query: { 
          granted_by_user: context.result.id,
          status: {
            $ne: 'invalid'
          }
        }
      }
    );

    const userOTP = await context.app.service('otp').find(
      {
        $select: ['id', 'status', 'lock_id', 'user_id', 'timeout'],
        query: {
          user_id: context.result.id,
        }
      }
    )


    context.result.grantedOTPs = grantedByUserOTPs || [];
    context.result.userOTP = userOTP || [];
    context.result.keys = userKeys || [];
    context.result.pinguilocks = adminLocalServers || [];
    context.result.locks = adminLock || [];
    context.result.admin = context.result.pinguilocks.length > 0 ? true : false;
    return context;
  };
};
