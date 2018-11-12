const assert = require('assert');
const app = require('../../src/app');

describe('\'lock\' service', () => {
  it('registered the service', () => {
    const service = app.service('lock');

    assert.ok(service, 'Registered the service');
  });
});
