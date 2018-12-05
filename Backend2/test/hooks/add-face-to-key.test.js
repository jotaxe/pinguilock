const assert = require('assert');
const feathers = require('@feathersjs/feathers');
const addFaceToKey = require('../../src/hooks/add-face-to-key');

describe('\'addFaceToKey\' hook', () => {
  let app;

  beforeEach(() => {
    app = feathers();

    app.use('/dummy', {
      async get(id) {
        return { id };
      }
    });

    app.service('dummy').hooks({
      before: addFaceToKey()
    });
  });

  it('runs the hook', async () => {
    const result = await app.service('dummy').get('test');
    
    assert.deepEqual(result, { id: 'test' });
  });
});
