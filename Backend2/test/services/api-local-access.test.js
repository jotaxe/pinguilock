const assert = require('assert');
const app = require('../../src/app');

describe('\'apiLocalAccess\' service', () => {
  it('registered the service', () => {
    const service = app.service('api-local-access');

    assert.ok(service, 'Registered the service');
  });
});
