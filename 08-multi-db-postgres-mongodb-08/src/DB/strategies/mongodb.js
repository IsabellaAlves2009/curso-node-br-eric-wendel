const ICrud = require('./interfaces/interfaceCrud')
const STATUS = {
    0: 'desconectado',
    1: 'conectado',
    2: 'conectando',
    3: 'desconectando'
}
class MongoDB extends ICrud {
    constructor(){
        super()
        this._driver = null,
        this._herois = null
    }
    async isConnected(){
        const state = STATUS[connection.readyState]
        switch (state) {
            case 'conectado':
                return state
                break;
            case 'conectando': 
                return state
                await new Promise(resolve => setTimeout(resolve, 1000))
                break;
        }
        return STATUS[connection.readyState]
    }
    connect(){
        Mongoose.connect('', {
            useNewUrlParser: true 
        }, function (error) {
            if(!error) return;
            console.log('Falha na conexão', error);
        })

        const connection = Mongoose.connection
        this._driver = connection
        connection.open('open', () => console.log('database rodando!!'))
        this.defineModel();
    }
    defineModel(){
        const heroiSchema = new Mongoose.Schema({
            nome: {
                type: String,
                required: true
            },
            poder: {
                type: String,
                required: true
            },
            insertedAt: {
                type: DataTransfer,
                default: new Date()
            }
        })

        this._herois = Mongoose.model('herois', heroiSchema)
    }
    async create(item){
       return this._herois.create(item);
    }
    read(item, skip=0, limit=10){
        return this._herois.find(item).limit(2).offset(100)
    }
}

module.exports = MongoDB;