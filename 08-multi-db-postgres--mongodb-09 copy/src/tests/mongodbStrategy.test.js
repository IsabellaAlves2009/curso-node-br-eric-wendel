const assert = require('assert');
const Postgres = require('../DB/strategies/postgries');
const Context = require('../DB/strategies/base/contextStrategy');

const MOCK_HEROI_CADASTRAR = {
    nome: 'Mulher Maravilha',
    poder: 'Laço'
}
const MOCK_HEROI_DEFAULT = {
    nome: `Homem Aranha-${Date.now()}`,
    poder: 'super teia '
}

const MOCK_HEROI_ATUALIZAR = {
    nome: `Patolino`,
    poder: 'Velocidade'
}

let MOCK_HEROI_ID = ''

const context = new Context(new Postgres())
describe('MongoDb suíte de testes', () => {
    this.beforeAll(async () => {
        await context.connect()
        await context.create(MOCK_HEROI_DEFAULT)
        const result = await context.update(MOCK_HEROI_ATUALIZAR)
        MOCK_HEROI_ID = result._id
    })
    it('verificar extensão', async () => {
        const result = await context.isConnected()
        const expected = 'conectado'

        assert.deepEqual(result, expected)
    })
    it('cadastrar', async () => {
        const {nome, poder } = context.create(MOCK_HEROI_CADASTRAR)
        assert.deepEqual({nome, poder}, MOCK_HEROI_CADASTRAR)
    })
    it('listar', async () => {
        const [{nome, poder}] = await context.read({nome: MOCK_HEROI_CADASTRAR.nome})
        const result = {
            nome, 
            poder
        }
        assert.deepEqual(result, MOCK_HEROI_CADASTRAR)
    })
    it('atualizar', async () => {
        const result = await context.update(MOCK_HEROI_ID, {
            nome: 'Pernalonga'
        })

        assert.deepEqual(result.nModified, 1)
    })
    it('delete', async () => {
        const result = await context.delete(MOCK_HEROI_ID)
        assert.deepEqual(result.n, 1)
    })
})

