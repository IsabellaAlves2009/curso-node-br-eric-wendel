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