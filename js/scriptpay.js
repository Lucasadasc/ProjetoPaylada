//Dados

//[valor, dia máx de pagamento, mês do inicio, mês de termino]
var gerencia = [40, "10", "02", "11"]
var jogadores = [];
var pagamentos = [];



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

    console.log(jogadores)


    lista.innerHTML += inserirTab(id, nome, numero, time)
}

function gerarAnalise(id, diaingresso, mesingresso) {
    var pagjan, pagfev, pagmar, pagabr, pagmai, pagjun, pagjul, pagago, pagset, pagout, pagnov, pagdez, status

    var data = new Date();

    var diaatual = data.getDate()
    var mesatual = data.getMonth() + 1
    var anoatual = data.getFullYear()

    //pegando data máxima pra pagamento e mês de inicio e termino
    var pagmaximo = Number(gerencia[1])
    var mesinicio = Number(gerencia[2])
    var mestermino = Number(gerencia[3])

    if (mesingresso < mesinicio || mesingresso > mestermino) {

    } else {
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
    var paganual //valor total pago no ano
    var fixo = `
    <tr>
        <th scope="row">1</th>
        <td>${nome}</td>
        <td>${numero}</td>
        <td>${time}</td>`
    
    //pegando o status do pagemento do jogador pelo id e substituindo no html
    var pagjan, pagfev, pagmar, pagabr, pagmai, pagjun, pagjul, pagago, pagset, pagout, pagnov, pagdez
    pagamentos.forEach(function (idpagamento) {
        if(id==idpagamento[0]){
            console.log(idpagamento[0])
            console.log(idpagamento[2])
            pagjan = String(idpagamento[2])
            pagfev = idpagamento[3]
            console.log(pagfev)
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
    valorespag.forEach(function (statuspag) {
        if (statuspag == 'pago') {
            paganual += `<td><i class="fa-solid fa-circle-check"></i></td>`
        } else if (statuspag == 'pendente') {
            paganual += `<td><i class="fas fa-dollar-sign fa-1,5x text-gray-300"></i></td>`
        } else if(statuspag == 'isento'){
            paganual += `<td><i class="fa-solid fa-hyphen"></i></td>`
        }
    });
    var fixob = `
    <td>${status}</td>
    <td>R$300</td>`
    var ampliar = `
    <td>
        <a href="./jogador.html">
            <i class="fa-solid fa-magnifying-glass fa-2xs"></i>
        </a>
    </td>`
    return fixo + paganual + fixob + ampliar
}
