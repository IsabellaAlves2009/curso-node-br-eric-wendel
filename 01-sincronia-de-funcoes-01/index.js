/*
    0 - Obter um usuario
    1 - Obter o numero de telefone de um usuario a partir de seu ID
    2 - Obter o endereço do usuario pelo ID
*/

// importamos um módulo interno no node.js

const util = require('util');
const obterEnderecoAsync = util.promisify(obterEndereco)

function obterUsuario(callback) {
    // quando der algum problema -> REJECT(erro)
    // quando for concluída -> Resolve

    return new Promise(function resolverPromise(resolve,reject) {
        setTimeout(function () {
            return resolve({  
                id: 1,
                nome: "Isabella",
                dataNascimento: new Date()
            })
    
        }, 1000)  
    })
}

function obterTelefone(IdUsuario, callback) {
    return new Promise(function resolverPromise(resolve, reject) {     
        setTimeout(() => {
            return resolve({
                telefone: '12229880',
                ddd: 11
            })
        }, 2000)
    })
}

function obterEndereco(IdUsuario, callback) {
    setTimeout(() => {
        return callback(null, {
            rua: 'dos bobos',
            numero: 0
        })
    }, 2000)
}

// primeiro passo adicionar a palavra async -> automaticamente ela retornará uma promise
main();
async function main() {
    try{
        console.time('medida-promise');
        const usuario = await obterUsuario();
        //const telefone = await obterTelefone();
        //const endereco = await obterEndereco();
        const resultado = await Promise.all([
            obterTelefone(usuario.id),
            obterEnderecoAsync(usuario.id)
        ])
        const endereco = resultado[1];
        const telefone = resultado[0];
        
        console.log(`
            Nome: ${usuario.nome},
            Telefone: (${telefone.ddd}) ${telefone.telefone},
            Endereço: ${endereco.rua}, ${endereco.numero}
        `)
        console.timeEnd('medida-promise');
    }
    catch(error){
        console.error('DEU RUIM', error)
    }
}

const usuarioPromise = obterUsuario();
// para manipular o sucesso usamos a função .then();
// para manipular os erros, usamos o .catch();
// usuario -> telefone -> telefone

usuarioPromise
    .then(function (usuario) {
        return obterTelefone(usuario.id)
            .then(function resolverTelefone(result) {
                 return {
                     usuario: {
                         nome: usuario.nome,
                         id: usuario.id
                     },
                     telefone: result
                 }
             })
     })
     .then(function (resultado) {
         const endereco = obterEnderecoAsync(resultado.usuario.id)
         return endereco.then(function resolverEndereco(result) {
             return {
                 usuario: resultado.usuario,
                 telefone: resultado.telefone,
                 endereco: result
             }
         })
     })
     .then(function (resultado) {
         console.log(`
            Nome: ${resultado.usuario.nome}
            Endereco: ${resultado.endereco.rua}, ${resultado.endereco.numero}
            Telefone: (${resultado.telefone.ddd}) ${resultado.telefone.telefone}
         `)
     })
     .catch(function (error) {
        console.error('DEU RUIM', error)
    })

/*function resolverUsuario(error, usuario) {
    // null | "" | 0 == false
    if (error) {
        console.error('deu ruim em usuario', error);
        return;
    }
    obterTelefone(usuario.id, function resolverTelefone(error1,telefone) {
        if (error1) {
            console.error("deu ruim em telefone", error);
            return;
        }
        obterEndereco(usuario.id, function resolverEndereco(error2, endereco) {
            if (error2) {
                console.error("deu ruim em endereco", error);
                return;
            }

            console.log(`
                Nome: ${usuario.nome},
                Telefone: (${telefone.ddd}) ${telefone.telefone},
                Endereço: ${endereco.rua}, ${endereco.numero}
            `)
        })
    })
} */

//obterUsuario(resolverUsuario)
