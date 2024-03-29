const ICrud = require('./interfaces/interfaceCrud')
const Sequelize = require('sequelize')



class Postgres extends ICrud{
    constructor(connection, schema){
        super()
        this.connection = connection
        this.schema = schema
    }
    async isConnected(){
        try{
            await this.connection.authenticate();
            return true;
        }
        catch(error){
            console.error('fail!', error)
            return false;
        }
    }
    static async defineModel(connection, schema){
      const model = connection.define(
        schema.name, schema.schema, schema.options
      )
      await this._driver.sync()
        return model
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
        const connection = new Sequelize(
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