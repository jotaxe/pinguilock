module.exports = function(app) {
  if(typeof app.channel !== 'function') {
    // If no real-time functionality has been configured just return
    return;
  }

  app.on('connection', connection => {
    // On a new real-time connection, add it to the anonymous channel
    app.channel('anonymous').join(connection);
    console.log("alguien ingreso anonimamente");
  });

  app.on('login', (authResult, { connection }) => {
    // connection can be undefined if there is no
    // real-time connection, e.g. when logging in via REST
    if(connection) {
      // Obtain the logged in user from the connection
      // const user = connection.user;
      
      // The connection is no longer anonymous, remove it
      app.channel('anonymous').leave(connection);

      // Add it to the authenticated user channel
      app.channel('authenticated').join(connection);
      console.log("el usuario: " + connection.user.email + " se autentico via websocket");
      app.channel(`userIds/${connection.user.id}`).join(connection);
      console.log(`se conecto al usuario a userIds/${connection.user.id}`);
      // Channels can be named anything and joined on any condition 
      
      // E.g. to send real-time events only to admins use
      // if(user.isAdmin) { app.channel('admins').join(connection); }

      // If the user has joined e.g. chat rooms
      // if(Array.isArray(user.rooms)) user.rooms.forEach(room => app.channel(`rooms/${room.id}`).join(channel));
      
      // Easily organize users by email and userid for things like messaging
      // app.channel(`emails/${user.email}`).join(channel);
      // app.channel(`userIds/$(user.id}`).join(channel);
    }
  });

  // eslint-disable-next-line no-unused-vars
  // app.publish((data, hook) => {
  //   // Here you can add event publishers to channels set up in `channels.js`
  //   // To publish only for a specific event use `app.publish(eventname, () => {})`

  //   // e.g. to publish all service events to all authenticated users use

  //   console.log(JSON.stringify(data, null, 4) ); 
  //   console.log(`publicando a userIds/${hook.params.user.id || data.user.id}
  //   userIds/${data.user_id}`);
  //   return [
  //     hook.path === 'key' ? app.channel(`userIds/${data.userid}`) : app.channel(`userIds/${hook.params.user.id}`), 
  //     hook.path === 'key' ? app.channel(`userIds/${data.user_id}`) : null
  //   ]
  // });


  app.service('key').publish((data, hook) => {
    console.log(`publicando a userIds/${data.user_id} como dueño`);
    console.log(`publicando a userIds/${data.adminId} como admin`);
    return [app.channel(`userIds/${data.user_id}`), app.channel(`userIds/${data.adminId}`)];
  })

  app.service('otp').publish((data, hook) => {
    console.log(`publicando a userIds/${data.granted_by_user}`);
    data.user_id ? console.log(`publicando a userIds/${data.user_id}`) : null
    return [app.channel(`userIds/${data.granted_by_user}`), data.user_id ? app.channel(`userIds/${data.user_id}`) : null]
  });

  // Here you can also add service specific event publishers
  // e.g. the publish the `users` service `created` event to the `admins` channel
  // app.service('users').publish('created', () => app.channel('admins'));
  
  // With the userid and email organization from above you can easily select involved users
  // app.service('messages').publish(() => {
  //   return [
  //     app.channel(`userIds/${data.createdBy}`),
  //     app.channel(`emails/${data.recipientEmail}`)
  //   ];
  // });
};
