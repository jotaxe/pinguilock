// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const otp = sequelizeClient.define('otp', {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    granted_by_user: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    secret_code: {
      type: DataTypes.STRING,
      allowNull: false
    },
    timeout: {
      type: DataTypes.DATE,
      allowNull: false
    },
    valid: {
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

  // eslint-disable-next-line no-unused-vars
  otp.associate = function (models) {
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
  };

  return otp;
};
