const assert = require('assert');
const app = require('../../src/app');

describe('\'access_request\' service', () => {
  it('registered the service', () => {
    const service = app.service('access-request');

    assert.ok(service, 'Registered the service');
  });
});
