class HeroRoutes{
    constructor(db){
        super()
        this.db = db
    }

    list() {
        return{
            path: '/herois',
            method: 'GET',
            handler: (request, headers) => {
                return this.db.read()
            }
        }
    }
    
    create(){
        return{
            path: '/herois',
            method: 'POST',
            handler: (request, headers) => {
                return this.db.create()
            }
        }
    }
}

module.exports = HeroRoutes