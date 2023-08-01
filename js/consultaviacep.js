let prompt = require('prompt-sync')();

let cep = prompt('Informe o CEP: ');

buscarCep(cep);

async function buscarCep(cep){
    const promiseConsultaCep = await fetch('https://viacep.com.br/ws/' + cep + '/json');

    const json = await promiseConsultaCep.json();
    
    console.log(json);
}