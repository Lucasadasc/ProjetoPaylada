const url = "http://127.0.0.1:8000/paylada/"

//carregamento
const loading = document.querySelector("#loading")
const conteudo = document.querySelector("#conteudo")

//lista de jogadores
const pagmes = document.querySelector("#pagmesespecifico");

//pagina do jogador
const jogpay = document.querySelector("#jogadorpay");

//pegando id da url
const urlsearchParams = new URLSearchParams(window.location.search) //me entrega um objeto que eu posso acessar os parametros na url
const jogadorId = urlsearchParams.get("id")

//forms

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
        contjog++ //número de jogadores
        getPagJog(jogador.id, 2023)
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
window.onload = function(){
    getPagMes()
}
function addReceitaouDespesa(){
    const nome = document.querySelector("#addnome")
    const dia = document.querySelector('#datareceita')
    const valor = document.querySelector('#addvalor')

    let roudnovo = {
        "id_pelada": 1,
        "nome": nome.value,
        "tipo": 'despesa',
        "dia": dia.value,
        "mes": 'fevereiro',
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
}