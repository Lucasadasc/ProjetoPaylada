const url = "http://127.0.0.1:8000/paylada/"

//carregamento
const loading = document.querySelector("#loading")
const conteudo = document.querySelector("#conteudo")

//lista de jogadores
const pagmes = document.querySelector("#pagmesespecifico");
const lista_jogadores = []
//id da pelada no localStorage
const id_pelada = localStorage.getItem('id_pelada')
//ano da análise
const ano_selecionado = document.querySelector('#anofinanceiro')
//pagina do jogador
const jogpay = document.querySelector("#jogadorpay");

//pegando id da url
const urlsearchParams = new URLSearchParams(window.location.search) //me entrega um objeto que eu posso acessar os parametros na url
const jogadorId = urlsearchParams.get("id")

//div dos cards de receita extra e despesas
const cardsreceitas = document.querySelector('#cardreceita')
const cardsdespesas = document.querySelector('#carddespesa')

//cards iniciais
const totaljog = document.querySelector("#totalatletas")
let contjog = 0
function totaisCards() {
    totaljog.innerHTML = contjog
}
async function getPagMes() { //async - vou usar await para esperar as requisições
    const response = await fetch(url + 'jog/')
    const jogadores = await response.json()

    loading.classList.add("hide")
    conteudo.classList.remove("hide")

    await jogadores.map((jogador) => {
        if(jogador.id_pelada==id_pelada){
            contjog++ //número de jogadores
            getPagJog(jogador.id, ano_selecionado.value)
            lista_jogadores.push(jogador)
        }
    })
}
async function getPagJog(id, ano) {
    const responseJog = await fetch(`${url}jog/${id}`)
    const jogador = await responseJog.json()

    const responsePag = await fetch(`${url}pag/`)
    const pagamentos = await responsePag.json()

    const responsePelada = await fetch(`${url}pelada/`)
    const peladas = await responsePelada.json()

    const detalhar = `<a href="../jogador.html?id=${id}">
                        <i class="fa-solid fa-magnifying-glass fa-2xs"></i>
                    </a>`
    var somapags = 0;
    peladas.map((pelada) => {
        if (pelada.id == jogador.id_pelada) {
            valormensal = Number(pelada.valorpagamento)
        }
    })
    let pagmes;
    pagamentos.map((pagamento) => {
        if (pagamento.id_jogador == id && pagamento.anoatual == ano) {
            if(pagamento.pagfev=='pago'){
                pagmes = `<i class="fa-solid fa-circle-check" style="color: #03ad00;"></i></td>`
            }else if(pagamento.pagfev=='pendente'){
                pagmes = `<i class="fa=s fa-dollar-sign fa-1,5x text-gray-300"></i>`
            }else if(pagamento.pagfev=='isento'){
                pagmes = `<i class="fa-solid fa-circle-minus"></i>`
            }else{
                pagmes = `<i class="fa-solid fa-dollar-sign" style="color: #b40404;"></i>`
            }
            $(document).ready(function () {
                var t = $('#pagmesespecifico').DataTable();
    
                t.row.add([detalhar, jogador.nome, jogador.numero, jogador.time, jogador.datadeingresso, pagmes, pagamento.pagfev, pagamento.status, "R$"+somapags]).draw(false);
            });
        }

    })
}
async function addDespesa(){
    const nome = document.querySelector("#addnomed")
    const dia = document.querySelector('#datadespesa')
    const valor = document.querySelector('#addvalord')

    let roudnovo = {
        "id_pelada": id_pelada,
        "nome": nome.value,
        "tipo": 'despesa',
        "dia": dia.value,
        "mes": '02',
        "ano": '2023',
        "valor": valor.value
    };

    roudnovo = JSON.stringify(roudnovo);
    addRecOuDesp(roudnovo)
}
async function addReceita(){
    const nome = document.querySelector("#addnome")
    const dia = document.querySelector('#datareceita')
    const valor = document.querySelector('#addvalor')

    let roudnovo = {
        "id_pelada": id_pelada,
        "nome": nome.value,
        "tipo": 'receita',
        "dia": dia.value,
        "mes": '02',
        "ano": '2023',
        "valor": valor.value
    };

    roudnovo = JSON.stringify(roudnovo);
    addRecOuDesp(roudnovo)
}
async function addRecOuDesp(roudnovo) {
    const response = await fetch(url + 'receitas/',
        {
            method: "POST",
            body: roudnovo,
            headers: {
                "Content-type": "application/json",
            },
        });

    const receita_adicionada = await response.json();
    if(receita_adicionada.tipo=='despesa'){
        cardsdespesas.innerHTML = addHtmlRouC(receita_adicionada.nome, receita_adicionada.dia, receita_adicionada.mes, receita_adicionada.ano, receita_adicionada.valor, receita_adicionada.tipo) + cardsdespesas.innerHTML
    }else{
        cardsreceitas.innerHTML = addHtmlRouC(receita_adicionada.nome, receita_adicionada.dia, receita_adicionada.mes, receita_adicionada.ano, receita_adicionada.valor, receita_adicionada.tipo) + cardsreceitas.innerHTML
    }
    
}
async function percorreRecouDesp(){
    const response = await fetch(url + 'receitas/')
    const receitas = await response.json()

    await receitas.map((receita)=>{
        if(receita.id_pelada==id_pelada){
            if(receita.tipo == 'despesa'){
                cardsdespesas.innerHTML = addHtmlRouC(receita.nome, receita.dia, receita.mes, receita.ano, receita.valor, receita.tipo) + cardsdespesas.innerHTML
            }else{
                cardsreceitas.innerHTML = addHtmlRouC(receita.nome, receita.dia, receita.mes, receita.ano, receita.valor, receita.tipo) + cardsreceitas.innerHTML
            }
            
        }
    })
}
function addHtmlRouC(nome, dia, mes, ano, valor, tipo){
    if(tipo == 'despesa'){
        return `
            <div class="card shadow mb-4">
                <div class="card-header cent">
                    <h6 class="m-0 font-weight-bold text-danger">${nome}</h6>
                    <button type="button" class="btn btn-danger">X</button>
                </div>
                <div class="card-body">
                    <div id="card-info">
                        <strong><p>Data</p></strong>
                        <strong><p>Valor</p></strong>
                    </div>
                    <div id="card-info">
                        <p>${dia}/${mes}/${ano}</p>
                        <p>R$${valor}</p>
                    </div>
                </div>
            </div>`
    }else{
        return `
            <div class="card shadow mb-4">
                <div class="card-header cent">
                    <h6 class="m-0 font-weight-bold text-success">${nome}</h6>
                    <button type="button" class="btn btn-danger">X</button>
                </div>
                <div class="card-body">
                    <div id="card-info">
                        <strong><p>Data</p></strong>
                        <strong><p>Valor</p></strong>
                    </div>
                    <div id="card-info">
                        <p>${dia}/${mes}/${ano}</p>
                        <p>R$${valor}</p>
                    </div>
                </div>
            </div>`
    }
}
window.onload = function(){
    getPagMes()
    percorreRecouDesp()
}