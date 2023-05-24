// Vídeo da unidade 1 - https://youtu.be/w8kyZMl2ioE 

//Dados

//[valor, dia máx de pagamento, mês do inicio, mês de termino, time a, time b]
var gerencia = [40, "10", "02", "11"]
var jogadores =[[1, "Douglas","Inter", "9", "2023-05-02"],
                [2, "Lucas","Inter", "9", "2023-05-02"],
                [3, "Manelgol","Milan", "9", "2023-05-05"],
                [4, "Johnatas","Inter", "7", "2023-05-05"],
               ];
var pagamentos = [];

window.onload = function () {
    totaisCards()
    mesesFoco()

    const lista = document.querySelector("#geralpagamentos");
    gerarAnalise(1,10,2)
    lista.innerHTML += inserirTab(1, "Douglas", "9", "Internazionale")
    gerarAnalise(2,10,2)
    lista.innerHTML += inserirTab(2, "Lucas", "10", "Internazionale")
    gerarAnalise(3,11,6)
    lista.innerHTML += inserirTab(3, "Manelgol", "9", "Milan")
    gerarAnalise(4,6,6)
    lista.innerHTML += inserirTab(4, "Johnatas", "7", "Internazionale")
}
function totaisCards() {
    const totaljog = document.querySelector("#totalatletas")
    var total = String(jogadores.length)
    totaljog.innerHTML = total
}
function mesesFoco(){
    const mesesemfoco = document.querySelector("#mf")

    //pegando a data atual
    var data = new Date();
    var mesatual = data.getMonth() + 1

    var meses
    if(mesatual==1){
        meses = `
            <a class="nav-link" href="">
                <i class="fa-regular fa-calendar-days"></i>
                <span>Janeiro</span>
            </a>
        `
    }else if(mesatual == 2){
        meses = `
        
            <a class="nav-link" href="">
                <i class="fa-regular fa-calendar-days"></i>
                <span>Fevereiro</span>
            </a>
        `
    }else if(mesatual == 3){
        meses = `
        
            <a class="nav-link" href="">
                <i class="fa-regular fa-calendar-days"></i>
                <span>Março</span>
            </a>
        `
    }else if(mesatual == 4){
        meses = `
        
            <a class="nav-link" href="">
                <i class="fa-regular fa-calendar-days"></i>
                <span>Abril</span>
            </a>
        `
    }else if(mesatual == 5){
        meses = `
            <a class="nav-link" href="">
                <i class="fa-regular fa-calendar-days"></i>
                <span>Maio</span>
            </a>
        `
    }else if(mesatual == 6){
        meses = `
            <a class="nav-link" href="">
                <i class="fa-regular fa-calendar-days"></i>
                <span>Junho</span>
            </a>
        `
    }else if(mesatual == 7){
        meses = `
        
            <a class="nav-link" href="">
                <i class="fa-regular fa-calendar-days"></i>
                <span>Julho</span>
            </a>
        `
    }else if(mesatual == 8){
        meses = `
        
            <a class="nav-link" href="">
                <i class="fa-regular fa-calendar-days"></i>
                <span>Agosto</span>
            </a>
        `
    }else if(mesatual == 9){
        meses = `
        
            <a class="nav-link" href="">
                <i class="fa-regular fa-calendar-days"></i>
                <span>Setembro</span>
            </a>
        `
    }else if(mesatual == 10){
        meses = `
        
            <a class="nav-link" href="">
                <i class="fa-regular fa-calendar-days"></i>
                <span>Setembro</span>
            </a>
            <a class="nav-link" href="">
                <i class="fa-regular fa-calendar-days"></i>
                <span>Outubro</span>
            </a>
        
            <a class="nav-link" href="">
                <i class="fa-regular fa-calendar-days"></i>
                <span>Novembro</span>
            </a>
        `
    }else if(mesatual == 11){
        meses = `
        
            <a class="nav-link" href="">
                <i class="fa-regular fa-calendar-days"></i>
                <span>Novembro</span>
            </a>
        `
    }else if(mesatual == 12){
        meses = `
            <a class="nav-link" href="">
                <i class="fa-regular fa-calendar-days"></i>
                <span>Dezembro</span>
            </a>
        `
    }
    return mesesemfoco.innerHTML += meses
}
function salvarJogadores() {

    const lista = document.querySelector("#visaogeralresultados");

    var nome = document.getElementById("addnome").value;
    var time = document.getElementById("timeselect").value;
    var numero = document.getElementById("numero").value;
    var datadeingresso = document.getElementById("ingresso").value;
    var id = (jogadores.length) + 1

    var jogador = [id, nome, time, numero, datadeingresso]

    var diadoingresso = Number(datadeingresso.substring(8, 10))
    var mesdoingresso = Number(datadeingresso.substring(5, 7))

    gerarAnalise(id, diadoingresso, mesdoingresso)

    jogadores.push(jogador)
    totaisCards()

    console.log(jogadores)


    lista.innerHTML += inserirTab(id, nome, numero, time)
}

function gerarAnalise(id, diaingresso, mesingresso) {
    var pagjan, pagfev, pagmar, pagabr, pagmai, pagjun, pagjul, pagago, pagset, pagout, pagnov, pagdez, status

    var data = new Date();
    var anoatual = data.getFullYear()

    //pegando data máxima pra pagamento e mês de inicio e termino
    var pagmaximo = Number(gerencia[1])
    var mesinicio = Number(gerencia[2])
    var mestermino = Number(gerencia[3])

    if (mesingresso < mesinicio || mesingresso > mestermino) {

    }else{
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

    }
    var totalpag = 0
    var pagamento = [id, anoatual, pagjan, pagfev, pagmar, pagabr, pagmai, pagjun, pagjul, pagago, pagset, pagout, pagnov, pagdez, totalpag, status]
    pagamentos.push(pagamento)
    console.log(pagamentos)
}

function inserirTab(id, nome, numero, time) {
    var status //situação do jogador 

    var fixo = `
    <tr align="center">
        <td>
            <a href="./jogador.html/${id}">
                <i class="fa-solid fa-magnifying-glass fa-2xs"></i>
            </a>
        </td>
        <td>${nome}</td>
        <td>${numero}</td>
        <td>${time}</td>`

    //pegando o status do pagemento do jogador pelo id e substituindo no html
    var pagjan, pagfev, pagmar, pagabr, pagmai, pagjun, pagjul, pagago, pagset, pagout, pagnov, pagdez, status
    pagamentos.forEach(function (idpagamento) {
        if (id == idpagamento[0]) {
            status = idpagamento[15]

            pagjan = idpagamento[2]
            pagfev = idpagamento[3]
            pagmar = idpagamento[4]
            pagabr = idpagamento[5]
            pagmai = idpagamento[6]
            pagjun = idpagamento[7]
            pagjul = idpagamento[8]
            pagago = idpagamento[9]
            pagset = idpagamento[10]
            pagout = idpagamento[11]
            pagnov = idpagamento[12]
            pagdez = idpagamento[13]
        }
    });
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
function somaPagamentos(id) {
    var pagjan, pagfev, pagmar, pagabr, pagmai, pagjun, pagjul, pagago, pagset, pagout, pagnov, pagdez, status
    var totalpag = 0 //total de pagamentos inicial
    pagamentos.forEach(function (idpagamento) {
        if (id == idpagamento[0]) {
            status = idpagamento[15]
            pagjan = idpagamento[2]
            pagfev = idpagamento[3]
            pagmar = idpagamento[4]
            pagabr = idpagamento[5]
            pagmai = idpagamento[6]
            pagjun = idpagamento[7]
            pagjul = idpagamento[8]
            pagago = idpagamento[9]
            pagset = idpagamento[10]
            pagout = idpagamento[11]
            pagnov = idpagamento[12]
            pagdez = idpagamento[13]
        }
    });
    var valorespag = [pagjan, pagfev, pagmar, pagabr, pagmai, pagjun, pagjul, pagago, pagset, pagout, pagnov, pagdez]
    valorespag.forEach(function (statuspag) {
        if (statuspag == 'pago') {
            totalpag += gerencia[0]
        } else {
            totalpag += 0
            console.log(totalpag)
        }
    });

    return totalpag
}