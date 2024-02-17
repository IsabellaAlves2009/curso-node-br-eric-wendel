const { obterPessoas } = require('./service');

Array.prototype.meuFilter = function (callback) {
    const lista = [];
    for (index in this){
        const item = this[index];
        const result = callback(item, index, this)
        // 0, "", null, underfined == false
        if (!result) continue;

        lista.push(item)

    }
    return lista;
}

async function main() {
    try{
        const {results} = await obterPessoas(`a`);
        const familiaLars = results.meuFilter((item, index, lista) => {
            console.log(`index: ${index} `, lista.length)
            return item.name.toLowerCase().indexOf('lars') !== -1
        })
            // por padrão precisar retornar um booleano
            // para informar se deve manter ou remover da lista
            // false > remove da lista
            // true > mantém da lista
            // não encontrou = -1;
            // encontrou = posição no array
        
        const names = familiaLars.map((pessoa) => pessoa.name)
        console.log(names)
    }
    catch(error){
        console.error('DEU RUIM', error)
    }
}

main();