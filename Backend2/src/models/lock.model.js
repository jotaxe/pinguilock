// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const lock = sequelizeClient.define('lock', {
    topic: {
      type: DataTypes.STRING,
      allowNull: false
    },
    name: {
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

  // eslint-disable-next-line no-unused-vars
  lock.associate = function (models) {
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
    lock.belongsTo(models.local_server,{foreignKey:'local_server_id'})
    lock.hasMany(models.key,{foreignKey:'lock_id'})
    lock.hasMany(models.otp,{foreignKey:'lock_id'})
    lock.hasMany(models.access_request,{foreignKey:'lock_id'})
  };

  return lock;
};
