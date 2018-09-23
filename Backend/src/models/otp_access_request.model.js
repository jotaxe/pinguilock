const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const otpAccessRequest = sequelizeClient.define('otp_access_request', {
    acceess_device: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    otp_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    auth: {
      type: DataTypes.STRING,
      allowNull: false
    },
    capture_path: {
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

  otpAccessRequest.associate = function (models) {

  
  };

  return otpAccessRequest;
};
