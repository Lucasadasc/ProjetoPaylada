const url = "http://127.0.0.1:8000/paylada/"

//carregamento
const loading = document.querySelector("#loading")
const conteudo = document.querySelector("#conteudo")

//lista de jogadores
const lista = document.querySelector("#geralpagamentos");

//pagina do jogador
const jogpay = document.querySelector("#jogadorpay");

//pegando id da url
const urlsearchParams = new URLSearchParams(window.location.search) //me entrega um objeto que eu posso acessar os parametros na url
const jogadorId = urlsearchParams.get("id")

//modais
const modalAddJogador = document.querySelector("#addjogador")
//itens do forms
const formadd = document.querySelector("#novojogador")
const nome = document.querySelector("#addnome")
const time = document.querySelector("#timeselect")
const numero = document.querySelector("#numero")
const ingresso = document.querySelector("#ingresso")

//cards iniciais
const totaljog = document.querySelector("#totalatletas")
let contjog = 0
function totaisCards() {
    totaljog.innerHTML = contjog
}
