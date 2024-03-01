const assert = require('assert');
const Postgres = require('../DB/strategies/postgries');
const Context = require('../DB/strategies/base/contextStrategy');

const context = new Context(new Postgres())

DESCRIBE('Postgres Strategy', function () {
    this.timeout(Infinity)
    it('PostgresSQL Connection', async function () {
        const result = await context.isConnected()
        assert.equal(result, true);
    })
})
