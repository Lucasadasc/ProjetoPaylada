const url = "https://web-production-5bb0.up.railway.app/paylada/";

// const url = "https://api-paylada-b70863bb5798.herokuapp.com/paylada/"

//carregamento
const loading = document.querySelector("#loading")
const conteudo = document.querySelector("#conteudo")

//pegando id da url
const urlsearchParams = new URLSearchParams(window.location.search) //me entrega um objeto que eu posso acessar os parametros na url
const userId = urlsearchParams.get("id")

//modais
const modalAddJogador = document.querySelector("#addjogador")
//itens do forms
const formadd = document.querySelector("#novojogador")
const nome = document.querySelector("#addnome")
const time = document.querySelector("#timeselect")
const numero = document.querySelector("#numero")
const ingresso = document.querySelector("#ingresso")

const alerta_erro = document.querySelector('#erro')

const lista_usuarios = []

async function guardandoUsuarios(){
    const response = await fetch(url + 'user/')
    const usuarios = await response.json()

    usuarios.map((usuario)=>{
        lista_usuarios.push(usuario)
    })

}

function logar(){
    const login_bruto = document.querySelector('#login-usuario').value
    const senha = document.querySelector('#senha')

    let validar = 'invalido'
    let id = ''

    let login = login_bruto.trim()

    lista_usuarios.forEach(function(user){
        if(user.usuario == login.toLowerCase() && user.senha == senha.value){
            validar = 'logado'
            id = user.id
        }
    })

    if(validar == 'logado'){
        let urlgo = "./paginas/minhaspeladas.html?id="+id
        window.location.href = urlgo
    }else{
        alerta_erro.innerHTML= `<div class="alert alert-danger" role="alert">
                                    Usuário ou senha incorretos!
                                </div>`
    }
}
async function minhasPeladas(){

    const responsePel = await fetch(url + 'pelada/')
    const peladas = await responsePel.json()

    const response = await fetch(url + 'jog/')
    const jogadores = await response.json()

    const divpeladas = document.querySelector("#peladas")

    const nomeUsuario = document.querySelector('#h2')
    //nomeUsuario.innerHTML = 'a'

    lista_usuarios.forEach(function(usuario){
        if(usuario.id == userId){
            nomeUsuario.innerHTML = `<strong>Olá, ${usuario.nome}!</strong>`
        }
    })

    let num_peladas = 0
    peladas.map((pelada)=>{
        if(pelada.id_usuario == userId){

            num_peladas++

            let quantJogadores = 0
            jogadores.map((jogador)=>{
                if(jogador.id_pelada == pelada.id){
                    quantJogadores++
                }
            })

            divpeladas.innerHTML += addCardPelada(pelada.id, pelada.logopelada, pelada.nomepelada, pelada.diacriacao, pelada.mescriacao, pelada.anocriacao, quantJogadores)
        }
    })
    if(num_peladas == 0){
        let sem_peladas = document.getElementById('escolher-pelada')
        
        sem_peladas.innerHTML = `<div class="alert alert-warning d-flex" role="alert" style="justify-content: center; align-items: center">
                                    Você ainda não gerencia nenhuma pelada
                                    <i class="fa-solid fa-face-meh ml-2"></i>
                                </div>`
    }

    loading.classList.remove("spinner-border")
    conteudo.classList.remove("hide")
}
function addCardPelada(id, logopelada, nomepelada, diacriacao, mescriacao, anocriacao, quantJogadores){
    return `<a href="./inicio.html" onclick="passarId(${id})" class="card shadow" id="botao-pelada">
                <div class="card-body" id="card-pelada">
                    <img src="../img/def/logopadrao.svg" alt="">
                    <div id="infos-pelada">
                        <span><strong>${nomepelada}</strong></span>
                        <span><strong>Criada em: </strong>${diacriacao}/${mescriacao}/${anocriacao}</span>
                        <span><strong>Total de jogadores: </strong>${quantJogadores}</span>
                    </div>
                </div>
            </a>`
}
function passarId(id){

    localStorage.setItem('id_pelada', id)
}
if(!userId){
    console.log('c')
    guardandoUsuarios()
}else{
    guardandoUsuarios()
    minhasPeladas()
}