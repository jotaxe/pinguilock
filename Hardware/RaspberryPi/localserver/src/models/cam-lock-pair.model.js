const NeDB = require('nedb');
const path = require('path');

module.exports = function (app) {
  const dbPath = app.get('nedb');
  const Model = new NeDB({
    filename: path.join(dbPath, 'cam-lock-pair.db'),
    autoload: true
  });
  /**
   * {
   * cam_name: string,
   * lock_name: string
   * }
   */
  return Model;
};
