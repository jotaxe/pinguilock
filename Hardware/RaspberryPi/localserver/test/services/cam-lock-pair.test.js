const assert = require('assert');
const app = require('../../src/app');

describe('\'cam-lock-pair\' service', () => {
  it('registered the service', () => {
    const service = app.service('cam-lock-pair');

    assert.ok(service, 'Registered the service');
  });
});
