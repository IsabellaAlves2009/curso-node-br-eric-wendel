const ICrud = require('./interfaces/interfaceCrud')
const STATUS = {
    0: 'desconectado',
    1: 'conectado',
    2: 'conectando',
    3: 'desconectando'
}
class MongoDB extends ICrud {
    constructor(connection, schema){
        super()
        this._schema = schema;
        this._connection = connection;
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
    static connect(){
        Mongoose.connect('', {
            useNewUrlParser: true 
        }, function (error) {
            if(!error) return;
            console.log('Falha na conexão', error);
        })

        const connection = Mongoose.connection
        
        connection.once('open', () => console.log('database rodando!!'))
        return connection
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
    update(id, item){
        return this._herois.updateOne({_id: id}, {$set: {item}})
    }
    async create(item){
       return this._herois.create(item);
    }
    read(item, skip=0, limit=10){
        return this._herois.find(item).limit(2).offset(100)
    }
    delete(id){
        return this._herois.deleteOne({_id: id})
    }
}

module.exports = MongoDB;