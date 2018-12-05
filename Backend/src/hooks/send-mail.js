// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

// eslint-disable-next-line no-unused-vars
module.exports = function (options = {}) {
  return async context => {
    console.log(context.result);
    const email = {
      to: `${context.result.reciever_email}`,
      subject: "Your new OTP code is ready!",
      html: `<p>Your OTP Code is ready to link <a href="https://www.pinguilock.tk/assingOTP/${context.result.id}"> here!</a></p>`
    }
    await context.app.service('mailer').create(email);
    return context;
  };
};
