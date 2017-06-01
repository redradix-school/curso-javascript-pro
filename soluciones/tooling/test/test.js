var assert = require('assert');

var dispatcher = require('../src/index').getInstance()

dispatcher.register((action) => {
  switch (action.type) {
    case 'LOGOUT':
      return console.log('Good bye.')
  }
})

describe('Array', function() {
  describe('#indexOf()', function() {
    it('should return -1 when the value is not present', function() {
      assert.equal(-1, [1,2,3].indexOf(4));
    });
  });
})
