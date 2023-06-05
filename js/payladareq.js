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

//itens do forms
const formadd = document.querySelector("#novojogador")
const nome = document.querySelector("#addnome")
const time = document.querySelector("#timeselect")
const numero = document.querySelector("#numero")
const ingresso = document.querySelector("#ingresso")

//Pegando todos os jogadores
async function getAllJogadores() { //async - vou usar await para esperar as requisições
    const response = await fetch(url + 'jog/')

    const jogadores = await response.json()

    loading.classList.add("hide")
    conteudo.classList.remove("hide")

    await jogadores.map((jogador) => {
        getPagJog(jogador.id, 2023)
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
async function getPagJog(id, ano) {
    const responseJog = await fetch(`${url}jog/${id}`)
    const jogador = await responseJog.json()

    const responsePag = await fetch(`${url}pag/`)
    const pagamentos = await responsePag.json()

    const responsePelada = await fetch(`${url}pelada/`)
    const peladas = await responsePelada.json()

    var fixo = `
    <tr align="center">
        <td>
            <a href="./paginas/jogador.html?id=${id}">
                <i class="fa-solid fa-magnifying-glass fa-2xs"></i>
            </a>
        </td>
        <td style= "white-space: nowrap;">${jogador.nome}</td>
        <td>${jogador.numero}</td>
        <td>${jogador.time}</td>`

    //gerando o html com base na situação de pagamento do mês
    var paganual = '' //variavél que vai guardar o trecho de html compativel a situção de pagemento em cada mes
    var status;
    var somapags = 0;
    var valormensal;
    peladas.map((pelada) => {
        if (pelada.id == jogador.id_pelada) {
            valormensal = Number(pelada.valorpagamento)
        }
    })
    pagamentos.map((pagamento) => {
        status = pagamento.status
        if (pagamento.id_jogador == id && pagamento.anoatual == ano) {
            let pags = [pagamento.pagjan, pagamento.pagfev, pagamento.pagmar, pagamento.pagabr,
            pagamento.pagmai, pagamento.pagjun, pagamento.pagjul, pagamento.pagago,
            pagamento.pagset, pagamento.pagout, pagamento.pagnov, pagamento.pagdez]
            pags.forEach(function (statuspag) {
                if (statuspag == 'pago') {
                    paganual += `<td><i class="fa-solid fa-circle-check" style="color: #03ad00;"></i></td>`
                    somapags += valormensal
                } else if (statuspag == 'pendente') {
                    paganual += `<td><i class="fas fa-dollar-sign fa-1,5x text-gray-300"></i></td>`
                } else if (statuspag == 'isento') {
                    paganual += `<td><i class="fa-solid fa-circle-minus"></i></td>`
                } else {
                    paganual += `<td><i class="fa-solid fa-dollar-sign" style="color: #b40404;"></i></td>`
                }
            });
            pagamento.totalpag = somapags
        }
    })

    var fixob = `<td>${status}</td>
                <td>R$</td></tr>`
    if (!jogadorId) {
        lista.innerHTML += (fixo + paganual + fixob)
    } else {
        jogpay.innerHTML += `<tr align="center">` + paganual + `<td>R$${somapags}</td></tr>`
    }
}

// Insert a comment
async function addJogador(jognovo) {
    const response = await fetch(url + 'jog/',
        {
            method: "POST",
            body: jognovo,
            headers: {
                "Content-type": "application/json",
            },
        });

    const data = await response.json();
    addPagamento(data.id)
    getPagJog(data.id, 2023)
}

if (!jogadorId) {
    getAllJogadores()

    // evento de add jogador
    formadd.addEventListener("submit", (e) => {
        e.preventDefault();

        let jognovo = {
            "id_pelada": 1,
            "nome": nome.value,
            "numero": numero.value,
            "time": time.value,
            "datadeingresso": ingresso.value
        };

        jognovo = JSON.stringify(jognovo);

        addJogador(jognovo); //mudar
    })
} else {
    getJogador(jogadorId)
    getPagJog(jogadorId, 2023)
}

//criando o pagamento do peladeiro 
async function gerarListaPagamentos(id) {
    const responseJog = await fetch(`${url}jog/${id}`)
    const jogador = await responseJog.json()

    const responsePelada = await fetch(`${url}pelada/`)
    const peladas = await responsePelada.json()

    let pagmaximo
    peladas.map((pelada) => {
        if (pelada.id == jogador.id_pelada) {
            pagmaximo = Number(pelada.diamaxpagamento)
        }
    })

    let pagjan, pagfev, pagmar, pagabr, pagmai, pagjun, pagjul, pagago, pagset, pagout, pagnov, pagdez, status

    var data = new Date();
    var anoatual = data.getFullYear()

    var datadeingresso = jogador.datadeingresso
    var diaingresso = Number(datadeingresso.substring(8, 10))
    var mesingresso = Number(datadeingresso.substring(5, 7))

    if (mesingresso == 1) {
        if (diaingresso > pagmaximo) {
            pagjan = "alerta"
            status = "inapto"

            pagfev = pagmar = pagabr = pagmai = pagjun = pagjul = pagago = pagset = pagout = pagnov = pagdez = "pendente"
        } else {
            pagjan = pagfev = pagmar = pagabr = pagmai = pagjun = pagjul = pagago = pagset = pagout = pagnov = pagdez = "pendente"
            status = "apto"
        }
    } else if (mesingresso == 2) {
        pagjan = "isento"
        if (diaingresso > pagmaximo) {
            pagfev = "alerta"
            status = "inapto"

            pagmar = pagabr = pagmai = pagjun = pagjul = pagago = pagset = pagout = pagnov = pagdez = "pendente"
        } else {
            pagfev = pagmar = pagabr = pagmai = pagjun = pagjul = pagago = pagset = pagout = pagnov = pagdez = "pendente"
            status = "apto"
        }
    } else if (mesingresso == 3) {
        pagjan = pagfev = "isento"
        if (diaingresso > pagmaximo) {
            pagmar = "alerta"
            status = "inapto"

            pagabr = pagmai = pagjun = pagjul = pagago = pagset = pagout = pagnov = pagdez = "pendente"
        } else {

            pagmar = pagabr = pagmai = pagjun = pagjul = pagago = pagset = pagout = pagnov = pagdez = "pendente"
            status = "apto"
        }
    } else if (mesingresso == 4) {
        pagjan = pagfev = pagmar = "isento"
        if (diaingresso > pagmaximo) {
            pagabr = "alerta"
            status = "inapto"

            pagmai = pagjun = pagjul = pagago = pagset = pagout = pagnov = pagdez = "pendente"
        } else {
            pagabr = pagmai = pagjun = pagjul = pagago = pagset = pagout = pagnov = pagdez = "pendente"
            status = "apto"
        }
    } else if (mesingresso == 5) {
        pagjan = pagfev = pagmar = pagabr = "isento"
        if (diaingresso > pagmaximo) {
            pagmai = "alerta"
            status = "inapto"

            pagjun = pagjul = pagago = pagset = pagout = pagnov = pagdez = "pendente"
        } else {
            pagmai = pagjun = pagjul = pagago = pagset = pagout = pagnov = pagdez = "pendente"
            status = "apto"
        }
    } else if (mesingresso == 6) {
        pagjan = pagfev = pagmar = pagabr = pagmai = "isento"
        if (diaingresso > pagmaximo) {
            pagjun = "alerta"
            status = "inapto"

            pagjul = pagago = pagset = pagout = pagnov = pagdez = "pendente"
        } else {
            pagjun = pagjul = pagago = pagset = pagout = pagnov = pagdez = "pendente"
            status = "apto"
        }
    } else if (mesingresso == 7) {
        pagjan = pagfev = pagmar = pagabr = pagmai = pagjun = "isento"
        if (diaingresso > pagmaximo) {
            pagjul = "alerta"
            status = "inapto"

            pagago = pagset = pagout = pagnov = pagdez = "pendente"
        } else {
            pagjul = pagago = pagset = pagout = pagnov = pagdez = "pendente"
            status = "apto"
        }
    } else if (mesingresso == 8) {
        pagjan = pagfev = pagmar = pagabr = pagmai = pagjun = pagjul = "isento"
        if (diaingresso > pagmaximo) {
            pagago = "alerta"
            status = "inapto"

            pagset = pagout = pagnov = pagdez = "pendente"
        } else {
            pagago = pagset = pagout = pagnov = pagdez = "pendente"
            status = "apto"
        }
    } else if (mesingresso == 9) {
        pagjan = pagfev = pagmar = pagabr = pagmai = pagjun = pagjul = pagago = "isento"
        if (diaingresso > pagmaximo) {
            pagset = "alerta"
            status = "inapto"

            pagout = pagnov = pagdez = "pendente"
        } else {
            pagset = pagout = pagnov = pagdez = "pendente"
            status = "apto"
        }
    } else if (mesingresso == 10) {
        pagjan = pagfev = pagmar = pagabr = pagmai = pagjun = pagjul = pagago = pagset = "isento"
        if (diaingresso > pagmaximo) {
            pagout = "alerta"
            status = "inapto"

            pagnov = pagdez = "pendente"
        } else {
            pagout = pagnov = pagdez = "pendente"
            status = "apto"
        }
    } else if (mesingresso == 11) {
        pagjan = pagfev = pagmar = pagabr = pagmai = pagjun = pagjul = pagago = pagset = pagout = "isento"
        if (diaingresso > pagmaximo) {
            pagnov = "alerta"
            status = "inapto"

            pagdez = "pendente"
        } else {
            pagnov = pagdez = "pendente"
            status = "apto"
        }
    } else if (mesingresso == 12) {
        pagjan = pagfev = pagmar = pagabr = pagmai = pagjun = pagjul = pagago = pagset = pagout = pagnov = "isento"
        if (diaingresso > pagmaximo) {
            pagdez = "alerta"
            status = "inapto"
        } else {
            pagdez = "pendente"
            status = "apto"
        }
    }
    
    let novopagamento = {
        "id_jogador": jogador.id,
        "anoatual": anoatual,
        "pagjan": pagjan,
        "pagfev": pagfev,
        "pagmar": pagmar,
        "pagabr": pagabr,
        "pagmai": pagmai,
        "pagjun": pagjun,
        "pagjul": pagjul,
        "pagago": pagago,
        "pagset": pagset,
        "pagout": pagout,
        "pagnov": pagnov,
        "pagdez": pagdez,
        "totalpag": 0,
        "status": status
    };

    novopagamento = JSON.stringify(novopagamento);

    addPagamento(novopagamento)
}
async function addPagamento(novopagamento) {
    const response = await fetch(url + 'pag/',
        {
            method: "POST",
            body: novopagamento,
            headers: {
                "Content-type": "application/json",
            },
        });
}