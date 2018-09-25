// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const face = sequelizeClient.define('face', {
    image_path: {
      type: DataTypes.STRING,
      allowNull: false,
      unique:true
    }
  }, {
    hooks: {
      beforeCount(options) {
        options.raw = true;
      }
    }
  });

  // eslint-disable-next-line no-unused-vars
  face.associate = function (models) {
    face.belongsTo(models.user,{foreignKey:'user_id'})
  };

  return face;
};
