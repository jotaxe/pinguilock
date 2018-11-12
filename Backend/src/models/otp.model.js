// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const otp = sequelizeClient.define('otp', {
    secret_code: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    reciever_email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    timeout: {
      type: DataTypes.DATE,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('aproval pending', 'active', 'inactive'),
      defaultValue: 'aproval pending'
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
    otp.belongsTo(models.user,
      {
        foreignKey: {
            name: 'user_id',
            allowNull: true
        }
      }
    )
    otp.belongsTo(models.user,{foreignKey:'granted_by_user'})
    otp.belongsTo(models.lock,{foreignKey:'lock_id'})
    otp.hasOne(models.access_request,{foreignKey:'otp_id'})

  };

  return otp;
};
