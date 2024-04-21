const ICrud = require('./interfaces/interfaceCrud')
const Sequelize = require('sequelize')



class Postgres extends ICrud{
    constructor(){
        super()
        this.driver = null
        this._herois = null
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
    async defineModel(){
        this.herois = this._driver.define('herois', {
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
    async create(item){
        const { dataValues } = await this._herois.create(item);
        return dataValues
    }
    async read(item){
        const result = this.herois.read({where: item, raw: true})
    }
    async update(id, item){
        const r = await this.herois.update({where: {id : id}})
        console.log('r', r);
        return r;
    }
    async delete(id){
        const query = id ? {id} : {}
        return this._herois.destroy({where: query})
    }
    async connect(){
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
        await this.defineModel()
    }
}

module.exports = Postgres;