async function cadastrarFornecedor(){
    validarCampos();
    let options = {
        method: "POST",
        headers: {"Content-type": "application/json"},
        body: JSON.stringify({
            nome: document.getElementById('nome_input').value,
            cnpj: document.getElementById('cnpj_input').value,
            cep: document.getElementById('cep_input').value,
            cidade: document.getElementById('cidade_input').value,
            uf: document.getElementById('uf_input').value
        })
    };
    const fornecedorCadastrar = await fetch('http://localhost:8080/api/fornecedor', options);
    const fornecedorJson = await fornecedorCadastrar.json();
}

async function buscarTodosProdutos(){
    fetch('http://localhost:8080/api/fornecedor/todos')
    .then(resultado => resultado.json())
    .then(json => { 
        preencherTabela(json);
    });
}

async function consultaViaCep(){
    var cepInformado = document.getElementById('cep_input').value;
    cepInformado = cepInformado.replace('-', '');
    //Esta variável é uma Promise(um objeto que será preenchido quando a requisição HTTP retornar)
    fetch('https://viacep.com.br/ws/' + cepInformado + '/json')
    .then(resultado => resultado.json())
    .then(json => {
            preencherCamposComJson(json);
    })
}

function validarCampos(){
    let mensagemValidacao = '';
    if(document.getElementById('nome_input').value == null || document.getElementById('nome_input').value == ''){
        mensagemValidacao += "Preencha os seguintes Campos: \nNome"
    }
    if(document.getElementById('cnpj_input').value == null || document.getElementById('cnpj_input').value == ''){
        mensagemValidacao += "Preencha os seguintes Campos: \nCNPJ"
    }
    if(document.getElementById('cep_input').value == null || document.getElementById('cep_input').value == ''){
        mensagemValidacao += "Preencha os seguintes Campos: \nCEP"
    }
    if(document.getElementById('cidade_input').value == null || document.getElementById('cidade_input').value == ''){
        mensagemValidacao += "Preencha os seguintes Campos: \nCidade"
    }
    if(document.getElementById('uf_input').value == null || document.getElementById('uf_input').value == ''){
        mensagemValidacao += "Preencha os seguintes Campos: \nUF"
    }
    if(mensagemValidacao != null && mensagemValidacao != ''){
        alert(mensagemValidacao);
    }
}

function preencherTabela(jsonFornecedor){
    var dadosTabelaProdutos = document.getElementById('corpoTabela');

    for(let i = 0; i < jsonFornecedor.length; i++){
        let novaLinha = dadosTabelaProdutos.insertRow();

        let celulaId = novaLinha.insertCell();
        celulaId.innerText = jsonFornecedor[i].id;

        let celulaNome = novaLinha.insertCell();
        celulaNome.innerText = jsonFornecedor[i].nome;

        let celulaCnpj = novaLinha.insertCell();
        celulaCnpj.innerText = jsonFornecedor[i].cnpj;

        let celulaCep = novaLinha.insertCell();
        celulaCep.innerText = jsonFornecedor[i].cep;

        let celulaCidade = novaLinha.insertCell();
        celulaCidade.innerText = jsonFornecedor[i].cidade;

        let celulaUf = novaLinha.insertCell();
        celulaUf.innerText = jsonFornecedor[i].uf;
    }
}

function preencherCamposComJson(json){
    document.getElementById('cidade_input').value = json.localidade;
    document.getElementById('uf_input').value = json.uf;
}

function limparCampos(){
    document.getElementById('nome_input').value = '';
    document.getElementById('cnpj_input').value = '';
    document.getElementById('cep_input').value = '';
    document.getElementById('cidade_input').value = '';
    document.getElementById('uf_input').value = '';
}

buscarTodosProdutos();
