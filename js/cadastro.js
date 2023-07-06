const url = "https://api-paylada-b70863bb5798.herokuapp.com/paylada/";

//itens do forms
const nome = document.querySelector("#nome");
const sobrenome = document.querySelector("#sobrenome");
const email = document.querySelector("#email");
const login = document.querySelector("#login-usuario");
const senha = document.querySelector("#senha");
const senha_confirmada = document.querySelector("#senha-confirmada");

function logar(){
    const login = document.querySelector('#login-usuario')
    const senha = document.querySelector('#senha')

    let validar = 'invalido'
    let id = ''

    console.log(lista_usuarios)

    lista_usuarios.forEach(function(user){
        if(user.usuario == login.value && user.senha == senha.value){
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

    peladas.map((pelada)=>{
        if(pelada.id_usuario == userId){

            let quantJogadores = 0
            jogadores.map((jogador)=>{
                if(jogador.id_pelada == pelada.id){
                    quantJogadores++
                }
            })

            divpeladas.innerHTML += addCardPelada(pelada.id, pelada.logopelada, pelada.nomepelada, pelada.diacriacao, pelada.mescriacao, pelada.anocriacao, quantJogadores)
        }
    })

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
    console.log(id)
    localStorage.setItem('id_pelada', id)
}
if(!userId){
    console.log('c')
    guardandoUsuarios()
}else{
    guardandoUsuarios()
    minhasPeladas()
}