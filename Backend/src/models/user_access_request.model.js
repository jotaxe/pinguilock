
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const userAccessRequest = sequelizeClient.define('user_access_request', {
    access_device: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    user_id: {
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

  userAccessRequest.associate = function (models) {
  
  };

  return userAccessRequest;
};
