const assert = require('assert');
const app = require('../../src/app');

describe('\'mqtt-info\' service', () => {
  it('registered the service', () => {
    const service = app.service('mqtt-info');

    assert.ok(service, 'Registered the service');
  });
});
