// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const otp = sequelizeClient.define('otp', {
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
    otp.belongsTo(models.user,{foreignKey:'user_id'})
    otp.belongsTo(models.user,{foreignKey:'granted_by_user'})

  };

  return otp;
};
