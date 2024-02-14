/*
    0 - Obter um usuario
    1 - Obter o numero de telefone de um usuario a partir de seu ID
    2 - Obter o endereço do usuario pelo ID
*/

function obterUsuario(callback) {
    setTimeout(function () {
        return callback(null, {  
            id: 1,
            nome: "Isabella",
            dataNascimento: new Date()
        })

    }, 1000)
}

function obterTelefone(IdUsuario, callback) {
    setTimeout(() => {
        return callback(null, {
            telefone: '12229880',
            ddd: 11
        })
    }, 2000)
}

function obterEndereco(IdUsuario, callback) {
    setTimeout(() => {
        return callback(null, {
            rua: 'dos bobos',
            numero: 0
        })
    }, 2000)
}

function resolverUsuario(error, usuario) {
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
}

obterUsuario(resolverUsuario)
