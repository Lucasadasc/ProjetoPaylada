const url = "http://127.0.0.1:8000/paylada/user/"

const loading = document.querySelector("#loading")
const conteudo = document.querySelector("#container-fluid")

//Pegando todos os jogadores
async function getAllJogadores(){ //async - vou usar await para esperar as requisições
    const response = await fetch(url)

    const jogadores = await response.json()

    console.log(jogadores)

    loading.classList.add("hide")

    jogadores.map
}

getAllJogadores()