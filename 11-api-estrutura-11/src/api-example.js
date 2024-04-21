// npm i hapi

const Hapi = require('hapi')
const Context = require('./DB/strategies/base/contextStrategy')
const MongoDB = require('./DB/strategies/mongoDB/mongodb')
const HeroiSchema = require('./DB/strategies/mongoDB/schemas/heroiSchema')

const app = new Hapi.Server({
    port: 5000
})

async function main() {
    //const connection = MongoDB.connect()
    //const context = new Context(new MongoDB(connection, HeroiSchema))
    app.route([{
        path: '/herois',
        method:'GET',
        handler: (request, head) => {
            return context.read()
        }
    }])
    await app.start()
    console.log('Servidor rodando na porta: ', app.info.port)
}

main()