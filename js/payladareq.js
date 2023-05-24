const url = "http://127.0.0.1:8000/paylada/"

//carregamento
const loading = document.querySelector("#loading")
const conteudo = document.querySelector("#conteudo")

//lista de jogadores
const lista = document.querySelector("#visaogeralresultados");

//pagina do jogador

//pegando id da url
const urlsearchParams = new URLSearchParams(window.location.search) //me entrega um objeto que eu posso acessar os parametros na url
const jogadorId = urlsearchParams.get("id")

//Pegando todos os jogadores
async function getAllJogadores() { //async - vou usar await para esperar as requisições
    const response = await fetch(url + 'jog/')

    const jogadores = await response.json()

    console.log(jogadores)

    loading.classList.add("hide")
    conteudo.classList.remove("hide")

    jogadores.map((jogador) => {
        lista.innerHTML += addTabela(jogador.id, jogador.nome, jogador.numero, jogador.time)
    })
}

//Adicionando linha referente a um jogador na tabela
function addTabela(id, nome, numero, time) {
    var status //situação do jogador 

    var fixo = `
    <tr align="center">
        <td>
            <a href="./paginas/jogador.html?id=${id}">
                <i class="fa-solid fa-magnifying-glass fa-2xs"></i>
            </a>
        </td>
        <td style= "white-space: nowrap;">${nome}</td>
        <td>${numero}</td>
        <td>${time}</td>`

    //pegando o status do pagamento do jogador pelo id e substituindo no html
    var valorespag = [pagjan, pagfev, pagmar, pagabr, pagmai, pagjun, pagjul, pagago, pagset, pagout, pagnov, pagdez]

    //gerando o html com base na situação de pagamento do mês
    var paganual = ''; //variavél que vai guardar o trecho de html compativel a situção de pagemento em cada mes
    valorespag.forEach(function (statuspag) {
        console.log(statuspag)
        if (statuspag == 'pago') {
            paganual += `<td><i class="fa-solid fa-circle-check" style="color: #03ad00;"></i></td>`
        } else if (statuspag == 'pendente') {
            paganual += `<td><i class="fas fa-dollar-sign fa-1,5x text-gray-300"></i></td>`
        } else if (statuspag == 'isento') {
            paganual += `<td><i class="fa-solid fa-circle-minus"></i></td>`
        } else {
            paganual += `<td><i class="fa-solid fa-dollar-sign" style="color: #b40404;"></i></td>`
        }
    });
    var fixob = `<td>${status}</td>
                <td>R$${somaPagamentos(id)}</td></tr>`
    return fixo + paganual + fixob
}

//Pegando jogador especifico
async function getJogador(id) {
    const responseJog = await fetch(`${url}jog/${id}`)
    const responsePag = await fetch(`${url}pag/`)

    const jogador = await responseJog.json()
    const pagamentos = await responsePag.json()

    const nome = document.querySelector("#nomejog")
    const time = document.querySelector("#time")
    const numero = document.querySelector("#numero")
    const ingresso = document.querySelector("#ingresso")

    const status = document.querySelector("#status")
    pagamentos.map((pagamento) => {
        if (pagamento.id_jogador == jogador.id) {
            status.innerHTML = "O peladeiro está " + pagamento.status + " a jogar"
        }
    })
    nome.innerHTML = jogador.nome
    time.innerHTML = jogador.time
    numero.innerHTML = jogador.numero
    ingresso.innerHTML = jogador.datadeingresso

    loading.classList.add("hide")
    conteudo.classList.remove("hide")
}

//relacionando jogador com pagamento
async function getPagJog(id, ano, pagina) {
    const responsePag = await fetch(`${url}pag/`)
    const pagamentos = await responsePag.json()

    pagamentos.map((pagamento) => {
        if (pagamento.id_jogador == id && pagamento.anoatual == ano) {
            let pags = [pagamento.pagjan, pagamento.pagfev, pagamento.pagmar, pagamento.pagabr,
                        pagamento.pagmai, pagamento.pagjun, pagamento.pagjul, pagamento.pagago,
                        pagamento.pagset, pagamento.pagout, pagamento.pagnov, pagamento.pagdez]
            pags.forEach(function () {
                if (statuspag == 'pago') {
                    paganual += `<td><i class="fa-solid fa-circle-check" style="color: #03ad00;"></i></td>`
                } else if (statuspag == 'pendente') {
                    paganual += `<td><i class="fas fa-dollar-sign fa-1,5x text-gray-300"></i></td>`
                } else if (statuspag == 'isento') {
                    paganual += `<td><i class="fa-solid fa-circle-minus"></i></td>`
                } else {
                    paganual += `<td><i class="fa-solid fa-dollar-sign" style="color: #b40404;"></i></td>`
                }
            });
        }
    })
    return paglista
}
if (!jogadorId) {
    getAllJogadores()
} else {
    getJogador(jogadorId)
}