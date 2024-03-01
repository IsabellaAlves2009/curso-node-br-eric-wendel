const ICrud = require('./interfaces/interfaceCrud')
const Sequelize = require('sequelize')



class Postgres extends ICrud{
    constructor(){
        super()
        this.driver = null
        this._herois = null
        this._connect();
    }
    async isConnected(){
        try{
            await this._driver.authenticate();
            return true;
        }
        catch(error){
            console.error('fail!', error)
            return false;
        }
    }
    defineModel(){
        this.herois = driver.define('herois', {
            id: {
                type: Sequelize.INTEGER,
                required: true,
                primaryKey: true,
                autoIncrement: true
            },
            nome: {
                type: Sequelize.STRING,
                required: true
            },
            poder: {
                type: Sequelize.STRING,
                required: true
            }
        },{
            tableName: 'Herois',
            freezeTableName: false,
            timesTamps: false
        })
        await Herois.sync()
    }
    create(item){
        console.log('O item foi salvo em postgres')
    }
    _connect(){
        this._driver = new Sequelize(
            'herois',
            'Isabella',
            'minhasenhasecreta',
            {
                host:'localhost',
                dialect: 'postgres',
                quoteIdentifiers: false,
                operatorAliases: false
            }
        )
    }
}

module.exports = Postgres;