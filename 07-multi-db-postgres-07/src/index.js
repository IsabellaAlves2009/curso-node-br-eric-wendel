const ContextStrategy = require('./DB/strategies/base/contextStrategy');
const Postgres = require('./DB/strategies/postgries');
const MongoDB = require('./DB/strategies/mongodb');

const contextMongo = new ContextStrategy(new MongoDB())
contextMongo.create()

const contextPostgres = new ContextStrategy(new Postgres())
contextPostgres.create();
