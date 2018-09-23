const assert = require('assert');
const app = require('../../src/app');

describe('\'access_device\' service', () => {
  it('registered the service', () => {
    const service = app.service('access-device');

    assert.ok(service, 'Registered the service');
  });
});
