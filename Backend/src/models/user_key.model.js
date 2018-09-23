const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const userKey = sequelizeClient.define('user_key', {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    acess_device: {
      type: DataTypes.INTEGER,
      allowNull: false
    },

  }, {
    hooks: {
      beforeCount(options) {
        options.raw = true;
      }
    }
  });

  userKey.associate = function (models) {


  };

  return userKey;
};
