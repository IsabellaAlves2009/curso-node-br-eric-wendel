// docker ps 
// docker exec -it 57a740453755 mongo -u  isabella -p minhasenhasecreta --autheticationDatabase herois 

// show dbs 
// show herois 
// show collections 

db.herois.insert({
    nome: 'Flash',
    poder: 'Speed',
    dataNascimento: '1998-01-01'
})

db.herois.find()
db.herois.find.pretty()

for (let i = 0; i < i <= 100000; i++) {
    db.herois.insert({
        nome: `Clone-${i}`,
        poder: 'Speed',
        dataNascimento: '1998-01-01'
    })
}

db.herois.count()
db.herois.findOne()
db.herois.find.limit(1000).sort({nome: -1})
db.herois.find({}, {poder: 1, _id: 0})

db.herois.insert({
    nome: 'Flash',
    poder: 'Speed',
    dataNascimento: '1998-01-01'
})

db.herois.find()

db.herois.update({_id: ObjectId('5bedf37a088070a57a572638')},
                 {nome: 'Mulher Maravilha'}
)

db.herois.update({poder: 'Velocidade'},
                 {$set: {poder: 'super força'}}
)

db.herois.remove({nome: 'Mulher Maravilha'})