const assert = require('assert');
const app = require('../../src/app');

describe('\'user_key\' service', () => {
  it('registered the service', () => {
    const service = app.service('user-key');

    assert.ok(service, 'Registered the service');
  });
});
