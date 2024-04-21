// npm i hapi

const Hapi = require('hapi')
const Context = require('./DB/strategies/base/contextStrategy')
const MongoDB = require('./DB/strategies/mongoDB/mongodb')
const HeroiSchema = require('./DB/strategies/mongoDB/schemas/heroiSchema')
const HeroRoute = require('./routes/heroRoutes')

const app = new Hapi.Server({
    port: 5000
})
function mapRoutes(instance, methods){
    ['list', 'create', 'update']

    return methods.map(method => instance[method]())
}
async function main() {
    const connection = MongoDB.connect()
    const context = new Context(new MongoDB(connection, HeroiSchema))
    [list(), create(), update()]
    app.route([
       ...mapRoutes(new HeroRoute(context), HeroRoute.methods())
    ])
    await app.start()
    console.log('Servidor rodando na porta: ', app.info.port)
}

module.exports = main()