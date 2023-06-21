const url = "http://127.0.0.1:8000/paylada/"

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

async function logar(){
    const login = document.querySelector('#login-usuario')
    const senha = document.querySelector('#senha')

    verificarConta(login.value, senha.value)
}
async function verificarConta(login, senha){
    const response = await fetch(url + 'user/')
    const usuarios = await response.json()

    usuarios.map((user) => {
        if(user.usuario == login){
            if(user.senha == senha){
                var url = "./paginas/minhaspeladas.html?id="+user.id
                window.location.href = url
            }else{
                alerta_erro.innerHTML= `<div class="alert alert-danger" role="alert">
                                            Usuário ou senha incorretos!
                                        </div>`
            }
        }else{
            alerta_erro.innerHTML= `<div class="alert alert-danger" role="alert">
                                        Usuário ou senha incorretos!
                                    </div>`
        }
    })
}
async function minhasPeladas(){
    const responsePel = await fetch(url + 'pelada/')
    const peladas = await responsePel.json()

    const response = await fetch(url + 'jog/')
    const jogadores = await response.json()

    const divpeladas = document.querySelector("#peladas")

    peladas.map((pelada)=>{
        if(pelada.id_usuario = userId){

            let quantJogadores = 0
            jogadores.map((jogador)=>{
                if(jogador.id_pelada = pelada.id){
                    quantJogadores++
                }
            })
            
            divpeladas.innerHTML += `<a href="./inicio.html" class="card shadow" id="botao-pelada">
                                        <div class="card-body" id="card-pelada">
                                            <img src="${pelada.logopelada}" alt="">
                                            <div id="infos-pelada">
                                                <span><strong>${pelada.nomepelada}</strong></span>
                                                <span><strong>Criada em: </strong>${pelada.diacriacao}/${pelada.mescriacao}/${pelada.anocriacao}</span>
                                                <span><strong>Total de jogadores: </strong>${quantJogadores}</span>
                                            </div>
                                        </div>
                                    </a>`
            console.log(pelada.nomepelada)
        }
    })
}
if(!userId){
    console.log('a')
}else{
    minhasPeladas()
}