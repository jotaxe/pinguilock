const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const otpUser = sequelizeClient.define('otp_user', {
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    auth_token: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    hooks: {
      beforeCount(options) {
        options.raw = true;
      }
    }
  });

  otpUser.associate = function (models) {

  };

  return otpUser;
};
