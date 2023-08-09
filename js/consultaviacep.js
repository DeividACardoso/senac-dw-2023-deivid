// let prompt = require('prompt-sync')();

// let cep = prompt('Informe o CEP: ');

// buscarCep(cep);

async function buscarCep(){
    limpar();
    //Parametros opcionais para a requisição
    let options = {
        method: "GET",
        headers: {"Content-type": "application/json"}
    };

    var txtCep = document.getElementById('txtCep');
    var cepInformado = txtCep.value;
    
    //Esta variável é uma Promise(um objeto que será preenchido quando a requisição HTTP retornar)
    fetch('https://viacep.com.br/ws/' + cepInformado + '/json')
    .then(resultado => resultado.json())
    .then(json => {
            preencherCamposComJson(json);
    })
    .catch(erro => {
        mostrarTelaDeErro();
    })
}

function preencherCamposComJson(json){
    if(json.bairro){
        txtBairro.value = json.bairro;
    }else{
        txtBairro.disabled = false;
    }
    txtLocalidade.value = json.localidade;
    txtLogradouro.value = json.logradouro;
    txtUf.value = json.uf;
}

function mostrarTelaDeErro(){
    limpar();
    document.getElementById('divDeTudo').style.backgroundColor = "red";
    alert('CEP informado não existe')
}

function limpar(){
    document.getElementById('divDeTudo').style.backgroundColor = "white";
    txtBairro.value = '';
    txtLocalidade.value = '';
    txtLogradouro.value = '';
    txtUf.value = '';

    txtBairro.disabled = true;
    txtLocalidade.disabled = true;
    txtLogradouro.disabled = true;
    txtUf.disabled = true;
}