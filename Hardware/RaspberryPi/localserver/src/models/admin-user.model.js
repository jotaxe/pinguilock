const NeDB = require('nedb');
const path = require('path');

module.exports = function (app) {
  const dbPath = app.get('nedb');
  const Model = new NeDB({
    filename: path.join(dbPath, 'admin-user.db'),
    autoload: true
  });
  /* {
    _id: "1"
    mail: string
  }
  */
  return Model;
};
