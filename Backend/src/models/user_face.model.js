const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const userFace = sequelizeClient.define('user_face', {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    img_route: {
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

  userFace.associate = function (models) {
  
  };

  return userFace;
};
