// Criar função para cada "filtro" (mostrar todas/duas colunas 
// Fixar cabeçalho e esconder de acordo com a função de cima, e não esconder <- Avaliar

let listaTarefas = []
let lista = document.querySelector('tbody')
// querySelector pega somente a primeira aparicao do elemento, querySelectorAll pega todas
let btnInserir = document.querySelector('button')
let btnListaPrioridade = document.getElementById('listarPrioridade')
let dsc = document.querySelector('#idTarefa')
let autor = document.querySelector('#idAutor')
let dpto = document.querySelector('#idDpto') 
let imp = document.querySelector('#idImportancia')

let tarefa = {
    descricao: dsc,
    autor: autor,
    dpto: dpto,
    importancia: imp,
    valor: 0,
    duracao: 0
}

btnInserir.addEventListener('click', function() {
    let tarefa = {
        descricao: dsc.value,
        autor: autor.value,
        dpto: dpto.value,
        importancia: imp.value,
        valor: 0,
        duracao: 0
    }
    listaTarefas.push(tarefa)
    atualizaTabela()    
})

function atualizaTabela() {
    let cabecalho = document.querySelector('thead')
    cabecalho.innerHTML = `
    <tr>
        <th>Descrição</th>
        <th>Autor</th>
        <th>Departamento</th>
        <th>Importância</th>
        <th>Valor</th>
        <th>Duração(dias)</th>
    </tr>`
    lista.innerHTML = ''
    listaTarefas.forEach((item, i)=> {
        //Escreve uma linha nova para cada objeto "tarefa" da listaTarefas.
        lista.innerHTML += `<tr>
        <td>${item.descricao}</td><td>${item.autor}</td>
        <td>${item.dpto}</td>
        <td>${item.importancia}</td>
        <td>${item.valor || ""}<button id="adicionarValor" onclick="addValor('${i}')">Adicionar</button></td>
        <td>${item.duracao || ""}<button id="adicionarDuracao" onclick="addDuracao('${i}')">Adicionar</button></td>
        <td><button class="btnRemove" onclick="apagar('${i}')">Remover</button></td>
        </tr>`

        if (item.valor != 0){
            document.getElementById('adicionarValor').remove()
        }
        if (item.duracao != 0){
            document.getElementById('adicionarDuracao').remove()
        } 
    })
}

function apagar(i) {
    listaTarefas.splice(i,1)
    atualizaTabela()
}

function addValor(i) {
    let novoValor = prompt("Digite o valor da tarefa:")
    listaTarefas[i].valor = novoValor
    atualizaTabela()
}

function addDuracao(i) {
    let novaDuracao = prompt("Digite a duração da tarefa (em dias):")
    listaTarefas[i].duracao = novaDuracao
    atualizaTabela()
}

btnListaPrioridade.addEventListener('click', function() {
    let cabecalho = document.querySelector('thead')
    cabecalho.innerHTML = `
    <tr>
        <th>Descrição</th>
        <th>Importância</th>
    </tr>`
    let listaOrdenada = [...listaTarefas].sort(function(a, b) {
        if (a.importancia > b.importancia){
            return -1
        }
    })
    lista.innerHTML = ''
    listaOrdenada.forEach((item, i)=> {
        lista.innerHTML += `<tr><td>${item.descricao}</td><td>${item.importancia}</td>`
    })
})
