const NeDB = require('nedb');
const path = require('path');

module.exports = function (app) {
  const dbPath = app.get('nedb');
  const Model = new NeDB({
    filename: path.join(dbPath, 'devices.db'),
    autoload: true
  });
/**
 * {
 * 
 * cam_topic: string,
 * ext_lock_id: int,
 * 
 * }
 */
  return Model;
};
