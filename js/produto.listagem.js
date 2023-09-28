async function buscarTodosProdutos(){
    fetch('http://localhost:8080/api/produtos/todos')
    .then(resultado => resultado.json())
    .then(json => { 
        preencherTabela(json);
    });
}

async function buscarProdutosComFiltros(){
    fetch('http://localhost:8080/api/produtos/filtro', {
        method: "POST",
        body: JSON.stringify({
            nome : document.getElementById('nome').value,
            fabricanteCnpj : document.getElementById('cnpj').value, 
            valorMinimo : document.getElementById('valorMin').value,
            valorMaximo : document.getElementById('valorMax').value,
            pesoMinimo : document.getElementById('pesoMin').value,
            pesoMaximo : document.getElementById('pesoMax').value,
        }),
        headers:{
            "Content-type": "application/json; charset=UTF-8"
        }
    })
    .then((resultado) => resultado.json())
    .then((json) => {
        limparTabela(json);
        preencherTabela(json);
    })
}

function limparTabela(jsonProdutos){
    var dadosTabelaProdutos = document.getElementById('corpoTabela');

    dadosTabelaProdutos.innerHTML = '';
}

function preencherTabela(jsonProdutos){
    var dadosTabelaProdutos = document.getElementById('corpoTabela');

    for(let i = 0; i < jsonProdutos.length; i++){
        let novaLinha = dadosTabelaProdutos.insertRow();

        let celulaId = novaLinha.insertCell();
        celulaId.innerText = jsonProdutos[i].id;

        let celulaNome = novaLinha.insertCell();
        celulaNome.innerText = jsonProdutos[i].nome;

        let celulaFabricante = novaLinha.insertCell();
        celulaFabricante.innerText = jsonProdutos[i].fabricante.nome;

        let celulaCnpjFabricante = novaLinha.insertCell();
        celulaCnpjFabricante.innerText = jsonProdutos[i].fabricante.cnpj;

        let celulaValor = novaLinha.insertCell();
        celulaValor.innerText = 'R$' + jsonProdutos[i].valor;

        let celulaPeso = novaLinha.insertCell();
        celulaPeso.innerText = jsonProdutos[i].peso;
    }
}

buscarTodosProdutos();