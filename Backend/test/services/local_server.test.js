const assert = require('assert');
const app = require('../../src/app');

describe('\'local_server\' service', () => {
  it('registered the service', () => {
    const service = app.service('local-server');

    assert.ok(service, 'Registered the service');
  });
});
