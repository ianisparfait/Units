const assert = require('assert').strict;
require('jest');
const app = require('./../index');

describe("test API Nodejs", function() {
  it("meubles", function() {
    expect(app.TestMeubles([])).toEqual(true)
  });
});