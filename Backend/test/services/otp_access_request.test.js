const assert = require('assert');
const app = require('../../src/app');

describe('\'otp_access_request\' service', () => {
  it('registered the service', () => {
    const service = app.service('otp-access-request');

    assert.ok(service, 'Registered the service');
  });
});
