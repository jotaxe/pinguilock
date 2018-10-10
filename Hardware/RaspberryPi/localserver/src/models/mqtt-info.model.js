const NeDB = require('nedb');
const path = require('path');

module.exports = function (app) {
  const dbPath = app.get('nedb');
  const Model = new NeDB({
    filename: path.join(dbPath, 'mqtt-info.db'),
    autoload: true
  });
  /**
   * {
   *  _id: "1"
   *  device_name: string
   * }
   */
  return Model;
};
