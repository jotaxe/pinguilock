// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const key = sequelizeClient.define('key', {
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
  key.associate = function (models) {
    key.hasOne(models.face,{foreignKey:'key_id'})
    key.belongsTo(models.user,{foreignKey:'user_id'})
    key.belongsTo(models.lock,{foreignKey:'lock_id'})
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
  };

  return key;
};
