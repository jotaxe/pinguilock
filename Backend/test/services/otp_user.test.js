const assert = require('assert');
const app = require('../../src/app');

describe('\'otp_user\' service', () => {
  it('registered the service', () => {
    const service = app.service('otp-user');

    assert.ok(service, 'Registered the service');
  });
});
