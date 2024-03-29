const { Sequelize } = require("sequelize")

const heroiSchema = new Mongoose.Schema({
    name: 'herois',
    schema: {
        id: {
            type: Sequelize.INTEGER,
            required: true,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING,
            required: true
        },
        poder: {
            type: Sequelize.STRING,
            required: true
        }
    },
    options: {
        tableName: 'TB_HEROIS',
        freezeTableName: false,
        timestamps:false
    }
})

this._herois = Mongoose.model('herois', {
    id: {
        type: Sequelize.INTEGER,
        required: true,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING,
        required: true
    },
    poder: {
        type: Sequelize.STRING,
        required: true
    }
},{
    tableName: 'TB_HEROIS',
    freezeTableName: false,
    timestamps:false
}) 
await this._herois.sync()