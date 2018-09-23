const assert = require('assert');
const app = require('../../src/app');

describe('\'user_access_request\' service', () => {
  it('registered the service', () => {
    const service = app.service('user-access-request');

    assert.ok(service, 'Registered the service');
  });
});
