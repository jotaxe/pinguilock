// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const accessRequest = sequelizeClient.define('access_request', {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    lock_topic: {
      type: DataTypes.STRING,
      allowNull: false
    },
    method: {
      type: DataTypes.STRING,
      allowNull: false
    },
    successfull: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    access_image: {
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
  accessRequest.associate = function (models) {
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
  };

  return accessRequest;
};
