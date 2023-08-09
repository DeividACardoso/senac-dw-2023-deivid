async function consultaviaCEP(){
    limpar();
    var cepInformado = document.getElementById('cep').value;
    cepInformado = cepInformado.replace('-', '');

<<<<<<< HEAD
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
=======
    var cepValido = validarCEP(cepInformado);
    if(cepValido){
        fetch(`https://viacep.com.br/ws/${cepInformado}/json/`)
        .then(resultado => resultado.json())
        .then(json => {
            if(json.erro){
                mostrarTelaErro();
            }else{
                preencherCamposComJSON(json);
            }
        })
        .catch(erro => {
            mostrarTelaErro();
        })
>>>>>>> 7c93c101872dc03fab06920d3adfcc0590fb3202
    }
}

<<<<<<< HEAD
function mostrarTelaDeErro(){
    limpar();
    document.getElementById('divDeTudo').style.backgroundColor = "red";
    alert('CEP informado não existe')
=======
function preencherCamposComJSON(json){
    if(json.bairro){ 
        bairro.value = json.bairro;
    }else{
        bairro.disabled = false;
    }

    if(json.logradouro){ 
        rua.value = json.logradouro;
    }else{
        rua.disabled = false;
    }

    estado.value = json.uf;
    cidade.value = json.localidade;
    cidade.disabled = true;
    estado.disabled = true;
>>>>>>> 7c93c101872dc03fab06920d3adfcc0590fb3202
}

function limpar(){
    formulario.style = 'background-color: aqua';
    rua.value = '';
    bairro.value = '';
    cidade.value = '';
    estado.value = '';
    bairro.disabled = true;
    rua.disabled = true;
    cidade.disabled = true;
    estado.disabled = true;
}

function mostrarTelaErro(){
    limpar();
    formulario.style = 'background-color: red';
    alert('CEP informado não existe');
}

function validarCEP(cepFormatado){
    var fieldsetCep = document.getElementById('fieldset-consulta-cep');
    var cepValido = false;
    if(cepFormatado.length == 8){
        fieldsetCep.style = 'background-color: purple';
        cepValido = true;
    }else{
        fieldsetCep.style = 'background-color: orange';
    }

    return cepValido;
}

function salvarEndereco(){
    //TODO chamar no backend
    alert('Ainda não desenvolvido');
}