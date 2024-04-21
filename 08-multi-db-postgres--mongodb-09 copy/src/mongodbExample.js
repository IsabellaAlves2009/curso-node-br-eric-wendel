const Mongoose = require('mongoose');
Mongoose.connect('mongodb://isabella:minhasenhasecreta@localhost:27017/herois', 
{userNewUrtParser: true}, function (error) {
    if(!error) return;
    console.error('Falha na conexão!', error)
})

const connection = Mongoose.connection;

connection.open('open', () => console.log('database rodando!!'))

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

const model = Mongoose.model('herois', heroiSchema)

async function main(){
    const resultCadastrar = model.create({
        nome: 'Batman',
        poder: 'dinheiro'
    })

    console.log(resultCadastrar)

    const listItems = await model.find();

    console.log('list items', listItems)
}

main();
