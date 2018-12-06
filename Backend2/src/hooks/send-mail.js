// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async context => {
    const email = {
      to: `${context.result.reciever_email}`,
      subject: "Your new OTP code is ready!",
      html: `<p>Your OTP Code is ready to link <a href="https://www.pinguilock.tk/assingOTP/${context.result.id}"> here!</a> (If you can't see the link go to https://www.pinguilock.tk/assingOTP/${context.result.id}</p>`
    }
    await context.app.service('mailer').create(email);
    return context;
  };
};
