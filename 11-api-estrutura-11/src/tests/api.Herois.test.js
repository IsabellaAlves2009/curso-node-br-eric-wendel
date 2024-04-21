const assert = require('assert')
const api = require('./../api')
let app = {}

describe('Suite de testes da API heroes', function () {
    this.beforeAll(async () => {
        app = await api
    })
    it('listar herois', () => {
        const result = app.inject({
            method: 'GET',
            url: './herois'
        })

        const dados = JSON.parse(result)
        const statusCode = result.statusCode
        console.log('result', result)
        assert.deepEqual(statusCode, 200)
        assert.ok(Array.isArray(dados))
    })
})

