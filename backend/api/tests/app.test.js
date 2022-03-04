const promos = require('./Hook/Promos');

it("Async test", async done => {
  const r = await promos();
  expect(r).toEqual(true);
  done();
});