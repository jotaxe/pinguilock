const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const otp = sequelizeClient.define('otp', {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    granted_by: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    access_device: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    valid_until: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    secret_value: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    }
  }, {
    hooks: {
      beforeCount(options) {
        options.raw = true;
      }
    }
  });

  otp.associate = function (models) {

  };

  return otp;
};
