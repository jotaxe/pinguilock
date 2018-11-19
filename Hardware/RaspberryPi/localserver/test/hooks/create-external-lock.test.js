const assert = require('assert');
const feathers = require('@feathersjs/feathers');
const createExternalLock = require('../../src/hooks/create-external-lock');

describe('\'createExternalLock\' hook', () => {
  let app;

  beforeEach(() => {
    app = feathers();

    app.use('/dummy', {
      async get(id) {
        return { id };
      }
    });

    app.service('dummy').hooks({
      before: createExternalLock()
    });
  });

  it('runs the hook', async () => {
    const result = await app.service('dummy').get('test');
    
    assert.deepEqual(result, { id: 'test' });
  });
});
