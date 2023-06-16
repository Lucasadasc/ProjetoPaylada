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

//Pegando todos os jogadores
async function getAllJogadores() { //async - vou usar await para esperar as requisições
    const response = await fetch(url + 'jog/')
    const jogadores = await response.json()


    loading.classList.add("hide")
    conteudo.classList.remove("hide")

    
    await jogadores.map((jogador) => {
        contjog++ //número de jogadores
        getPagJog(jogador.id, 2023)
    })
    totaisCards()
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

    const detalhar = `<a href="./paginas/jogador.html?id=${id}">
                        <i class="fa-solid fa-magnifying-glass fa-2xs"></i>
                    </a>`

    let status;
    var somapags = 0;
    var valormensal;
    peladas.map((pelada) => {
        if (pelada.id == jogador.id_pelada) {
            valormensal = Number(pelada.valorpagamento)
        }
    })
    let pagjan, pagfev, pagmar, pagabr, pagmai, pagjun, pagjul, pagago, pagset, pagout, pagnov, pagdez
    pagamentos.map((pagamento) => {
        if (pagamento.id_jogador == id && pagamento.anoatual == ano) {
            status = pagamento.status
            var pags = [pagamento.pagjan, pagamento.pagfev, pagamento.pagmar, pagamento.pagabr,
            pagamento.pagmai, pagamento.pagjun, pagamento.pagjul, pagamento.pagago,
            pagamento.pagset, pagamento.pagout, pagamento.pagnov, pagamento.pagdez]
            let mes = 0;
            pags.forEach(function (statuspag) {
                mes++
                if (statuspag == 'pago') {
                    somapags += valormensal
                    if(mes==1){
                        pagjan = `<i class="fa-solid fa-circle-check" style="color: #03ad00;"></i></td>`
                    }else if(mes==2){
                        pagfev = `<i class="fa-solid fa-circle-check" style="color: #03ad00;"></i></td>`
                    }else if(mes==3){
                        pagmar = `<i class="fa-solid fa-circle-check" style="color: #03ad00;"></i></td>`
                    }else if(mes==4){
                        pagabr = `<i class="fa-solid fa-circle-check" style="color: #03ad00;"></i></td>`
                    }else if(mes==5){
                        pagmai = `<i class="fa-solid fa-circle-check" style="color: #03ad00;"></i></td>`
                    }else if(mes==6){
                        pagjun = `<i class="fa-solid fa-circle-check" style="color: #03ad00;"></i></td>`
                    }else if(mes==7){
                        pagjul = `<i class="fa-solid fa-circle-check" style="color: #03ad00;"></i></td>`
                    }else if(mes==8){
                        pagago = `<i class="fa-solid fa-circle-check" style="color: #03ad00;"></i></td>`
                    }else if(mes==9){
                        pagset = `<i class="fa-solid fa-circle-check" style="color: #03ad00;"></i></td>`
                    }else if(mes==10){
                        pagout = `<i class="fa-solid fa-circle-check" style="color: #03ad00;"></i></td>`
                    }else if(mes==11){
                        pagnov = `<i class="fa-solid fa-circle-check" style="color: #03ad00;"></i></td>`
                    }else if(mes==12){
                        pagdez = `<i class="fa-solid fa-circle-check" style="color: #03ad00;"></i></td>`
                    }
                } else if (statuspag == 'pendente') {
                    if(mes==1){
                        pagjan = `<i class="fas fa-dollar-sign fa-1,5x text-gray-300"></i>`
                    }else if(mes==2){
                        pagfev = `<i class="fas fa-dollar-sign fa-1,5x text-gray-300"></i>`
                    }else if(mes==3){
                        pagmar = `<i class="fas fa-dollar-sign fa-1,5x text-gray-300"></i>`
                    }else if(mes==4){
                        pagabr = `<i class="fas fa-dollar-sign fa-1,5x text-gray-300"></i>`
                    }else if(mes==5){
                        pagmai = `<i class="fas fa-dollar-sign fa-1,5x text-gray-300"></i>`
                    }else if(mes==6){
                        pagjun = `<i class="fas fa-dollar-sign fa-1,5x text-gray-300"></i>`
                    }else if(mes==7){
                        pagjul = `<i class="fas fa-dollar-sign fa-1,5x text-gray-300"></i>`
                    }else if(mes==8){
                        pagago = `<i class="fas fa-dollar-sign fa-1,5x text-gray-300"></i>`
                    }else if(mes==9){
                        pagset = `<i class="fas fa-dollar-sign fa-1,5x text-gray-300"></i>`
                    }else if(mes==10){
                        pagout = `<i class="fas fa-dollar-sign fa-1,5x text-gray-300"></i>`
                    }else if(mes==11){
                        pagnov = `<i class="fas fa-dollar-sign fa-1,5x text-gray-300"></i>`
                    }else if(mes==12){
                        pagdez = `<i class="fas fa-dollar-sign fa-1,5x text-gray-300"></i>`
                    }
                } else if (statuspag == 'isento') {
                    if(mes==1){
                        pagjan = `<i class="fa-solid fa-circle-minus"></i>`
                    }else if(mes==2){
                        pagfev = `<i class="fa-solid fa-circle-minus"></i>`
                    }else if(mes==3){
                        pagmar = `<i class="fa-solid fa-circle-minus"></i>`
                    }else if(mes==4){
                        pagabr = `<i class="fa-solid fa-circle-minus"></i>`
                    }else if(mes==5){
                        pagmai = `<i class="fa-solid fa-circle-minus"></i>`
                    }else if(mes==6){
                        pagjun = `<i class="fa-solid fa-circle-minus"></i>`
                    }else if(mes==7){
                        pagjul = `<i class="fa-solid fa-circle-minus"></i>`
                    }else if(mes==8){
                        pagago = `<i class="fa-solid fa-circle-minus"></i>`
                    }else if(mes==9){
                        pagset = `<i class="fa-solid fa-circle-minus"></i>`
                    }else if(mes==10){
                        pagout = `<i class="fa-solid fa-circle-minus"></i>`
                    }else if(mes==11){
                        pagnov = `<i class="fa-solid fa-circle-minus"></i>`
                    }else if(mes==12){
                        pagdez = `<i class="fa-solid fa-circle-minus"></i>`
                    }
                } else {
                    if(mes==1){
                        pagjan = `<i class="fa-solid fa-dollar-sign" style="color: #b40404;"></i>`
                    }else if(mes==2){
                        pagfev = `<i class="fa-solid fa-dollar-sign" style="color: #b40404;"></i>`
                    }else if(mes==3){
                        pagmar = `<i class="fa-solid fa-dollar-sign" style="color: #b40404;"></i>`
                    }else if(mes==4){
                        pagabr = `<i class="fa-solid fa-dollar-sign" style="color: #b40404;"></i>`
                    }else if(mes==5){
                        pagmai = `<i class="fa-solid fa-dollar-sign" style="color: #b40404;"></i>`
                    }else if(mes==6){
                        pagjun = `<i class="fa-solid fa-dollar-sign" style="color: #b40404;"></i>`
                    }else if(mes==7){
                        pagjul = `<i class="fa-solid fa-dollar-sign" style="color: #b40404;"></i>`
                    }else if(mes==8){
                        pagago = `<i class="fa-solid fa-dollar-sign" style="color: #b40404;"></i>`
                    }else if(mes==9){
                        pagset = `<i class="fa-solid fa-dollar-sign" style="color: #b40404;"></i>`
                    }else if(mes==10){
                        pagout = `<i class="fa-solid fa-dollar-sign" style="color: #b40404;"></i>`
                    }else if(mes==11){
                        pagnov = `<i class="fa-solid fa-dollar-sign" style="color: #b40404;"></i>`
                    }else if(mes==12){
                        pagdez = `<i class="fa-solid fa-dollar-sign" style="color: #b40404;"></i>`
                    }
                }
            });
        }

    })

    if (!jogadorId) {
        $(document).ready(function () {
            var t = $('#tabgeral').DataTable();

            t.row.add([detalhar, jogador.nome, jogador.numero, jogador.time, pagjan, pagfev, pagmar, pagabr, pagmai, pagjun, pagjul, pagago, pagset, pagout, pagnov, pagdez, status, "R$"+somapags]).draw(false);

        });
    } else {
        jogpay.innerHTML += 
        `<tr align="center">
        <td>${pagjan}</td>
        <td>${pagfev}</td>
        <td>${pagmar}</td>
        <td>${pagabr}</td>
        <td>${pagmai}</td>
        <td>${pagjun}</td>
        <td>${pagjul}</td>
        <td>${pagago}</td>
        <td>${pagset}</td>
        <td>${pagout}</td>
        <td>${pagnov}</td>
        <td>${pagdez}</td>
        <td>R$${somapags}</td>
        </tr>`
    }
}

// adicionando jogador
async function addJogador(jognovo) {
    const response = await fetch(url + 'jog/',
        {
            method: "POST",
            body: jognovo,
            headers: {
                "Content-type": "application/json",
            },
        });
    
    contjog++
    totaisCards()

    const data = await response.json();
    await gerarListaPagamentos(data.id)
    getPagJog(data.id, 2023)
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
        "anoatual": String(anoatual),
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
if (!jogadorId) {
    getAllJogadores()

    // evento de add jogador
    formadd.addEventListener("submit", (e) => {
        e.preventDefault();

        if(numero.value==""){
            numero.value = "s/n"
        }
        let jognovo = {
            "id_pelada": 1,
            "nome": nome.value,
            "numero": numero.value,
            "time": time.value,
            "datadeingresso": ingresso.value
        };

        jognovo = JSON.stringify(jognovo);

        addJogador(jognovo); //mudar

        modalAddJogador.modal('hide')
    })
} else {
    getJogador(jogadorId)
    getPagJog(jogadorId, 2023)
}