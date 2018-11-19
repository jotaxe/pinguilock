const assert = require('assert');
const feathers = require('@feathersjs/feathers');
const addInfoToLock = require('../../src/hooks/add-info-to-lock');

describe('\'addInfoToLock\' hook', () => {
  let app;

  beforeEach(() => {
    app = feathers();

    app.use('/dummy', {
      async get(id) {
        return { id };
      }
    });

    app.service('dummy').hooks({
      after: addInfoToLock()
    });
  });

  it('runs the hook', async () => {
    const result = await app.service('dummy').get('test');
    
    assert.deepEqual(result, { id: 'test' });
  });
});
