const assert = require('assert');
const feathers = require('@feathersjs/feathers');
const addImgToFace = require('../../src/hooks/add-img-to-face');

describe('\'addImgToFace\' hook', () => {
  let app;

  beforeEach(() => {
    app = feathers();

    app.use('/dummy', {
      async get(id) {
        return { id };
      }
    });

    app.service('dummy').hooks({
      before: addImgToFace()
    });
  });

  it('runs the hook', async () => {
    const result = await app.service('dummy').get('test');
    
    assert.deepEqual(result, { id: 'test' });
  });
});
