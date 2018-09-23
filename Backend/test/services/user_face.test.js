const assert = require('assert');
const app = require('../../src/app');

describe('\'user_face\' service', () => {
  it('registered the service', () => {
    const service = app.service('user-face');

    assert.ok(service, 'Registered the service');
  });
});
