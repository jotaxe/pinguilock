const assert = require('assert');
const app = require('../../src/app');

describe('\'admin-user\' service', () => {
  it('registered the service', () => {
    const service = app.service('admin-user');

    assert.ok(service, 'Registered the service');
  });
});
