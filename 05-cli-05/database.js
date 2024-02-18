const { readFile, writeFile } = require('fs');
const { promisify } = require('util')

const readFileAsync = promisify(readFile);
const writeFileAsync =  promisify(writeFile);

// const dadosJson = require('./herois.json')

class Database {
    constructor(){
        this.nome_arquivo = 'herois.json'
    }
    async obterDadosArquivo(){
        const arquivo = await readFILEAsync(this.nome_arquivo, 'utf8');
        return JSON.parse(arquivo.toString());
    }
    async escreverArquivo(dados){
        await writeFileAsync(this.nome_arquivo, JSON.stringify(dados))
        return true;
    }
    async cadastrar(heroi){
        const dados = await this.obterDadosArquivo()
        const id = heroi.id <=  2 ? heroi.id : Date.now();
        const heroidcomId = {
            id, 
            ...heroi
        }
        const dadosFinal = {
           ...dados,
           heroidcomId
        }
    }
    async listar(id){
        const dados = await this.obterDadosArquivo()
        const dadosFiltrados = dados.filter(item => ( id ? (item.id === id) : true))
        return dadosFiltrados;
    }
}

module.exports = new Database(); 