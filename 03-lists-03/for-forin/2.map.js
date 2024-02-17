const service = require('./service');
Array.prototype.meuMap = function (callback) {
    const novoArrayMapeado = []
    for(let i = 0; i <= this.length -1; i++){
        const resultado = callback(this[i], i)
        novoArrayMapeado.push(resultado)
    }
}

async function main() {
    try{
        const results = await service.obterPessoas(`a`)
        //const names = [];
        //results.forEach(function (item) {
        //    names.push(item.name)
        //});
        const names = results.results.meuMap(function(pessoa, i){
            return `${i} ${pessoa.name}`
        })
        console.log('names', names);
    }
    catch(error){
        console.error('DEU RUIM', error)
    }
}

main();