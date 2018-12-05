const assert = require('assert');
const feathers = require('@feathersjs/feathers');
const addKeyIDtoFace = require('../../src/hooks/add-key-i-dto-face');

describe('\'addKeyIDtoFace\' hook', () => {
  let app;

  beforeEach(() => {
    app = feathers();

    app.use('/dummy', {
      async get(id) {
        return { id };
      }
    });

    app.service('dummy').hooks({
      after: addKeyIDtoFace()
    });
  });

  it('runs the hook', async () => {
    const result = await app.service('dummy').get('test');
    
    assert.deepEqual(result, { id: 'test' });
  });
});
