const assert = require('assert');
const app = require('../../src/app');

describe('\'face\' service', () => {
  it('registered the service', () => {
    const service = app.service('face');

    assert.ok(service, 'Registered the service');
  });
});
