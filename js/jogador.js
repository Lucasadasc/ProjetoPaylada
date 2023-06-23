let ano, modjan, modfev, modmar, modabr, modmai, modjun, modjul, modago, modset, modout, modnov, moddez, modstatus, modtotalpag
let totalmudpag = 0
let atualizarpagamento

async function atribuindoPagamento(jogadorId){
    //pegando jogador
    const responseJog = await fetch(`${url}jog/${jogadorId}`)
    const jogador = await responseJog.json()
    //pegando pagamento
    const responsePag = await fetch(`${url}pag/`)
    const pagamentos = await responsePag.json()
    //atribuindo pagamento ao jogador
    pagamentos.map((pagamento) => {
        if (pagamento.id_jogador == jogador.id) {
            ano = pagamento.anoatual
            modjan = pagamento.pagjan
            modfev = pagamento.pagfev
            modmar = pagamento.pagmar
            modabr = pagamento.pagabr
            modmai = pagamento.pagmai
            modjun = pagamento.pagjun
            modjul = pagamento.pagjul
            modago = pagamento.pagago
            modset = pagamento.pagset
            modout = pagamento.pagout
            modnov = pagamento.pagnov
            moddez = pagamento.pagdez
            modtotalpag = Number(pagamento.totalpag)
            modstatus = pagamento.status
        }
    })
}
async function editPag(mes) {
    console.log(totalmudpag)
    let diapagmaximo
    let valorpag
    const responsePelada = await fetch(`${url}pelada/`)
    const peladas = await responsePelada.json()

    const id_pelada = localStorage.getItem('id_pelada')
    peladas.map((pelada) => {
        if (pelada.id == id_pelada) {
            diapagmaximo = Number(pelada.diamaxpagamento)
            valorpag = Number(pelada.valorpagamento)
        }
    })
    if (mes == "janeiro") {
        const icon = document.getElementById("jan");
        modjan = modPag(icon, 1, diapagmaximo, valorpag)
    } else if (mes == "fevereiro") {
        const icon = document.getElementById("fev");
        modfev = modPag(icon, 2, diapagmaximo)
    } else if (mes == "março") {
        const icon = document.getElementById("mar");
        modmar = modPag(icon, 3, diapagmaximo, valorpag)
    } else if (mes == "abril") {
        const icon = document.getElementById("abr");
        modabr = modPag(icon, 4, diapagmaximo, valorpag)
    } else if (mes == "maio") {
        const icon = document.getElementById("mai");
        modmai = modPag(icon, 5, diapagmaximo, valorpag)
    } else if (mes == "junho") {
        const icon = document.getElementById("jun");
        modjun = modPag(icon, 6, diapagmaximo, valorpag)
    } else if (mes == "julho") {
        const icon = document.getElementById("jul");
        modjul = modPag(icon, 7, diapagmaximo, valorpag)
    } else if (mes == "agosto") {
        const icon = document.getElementById("ago");
        modago = modPag(icon, 8, diapagmaximo, valorpag)
    } else if (mes == "setembro") {
        const icon = document.getElementById("set");
        modset = modPag(icon, 9, diapagmaximo, valorpag)
    } else if (mes == "outubro") {
        const icon = document.getElementById("out");
        modout = modPag(icon, 10, diapagmaximo, valorpag)
    } else if (mes == "novembro") {
        const icon = document.getElementById("nov");
        modnov = modPag(icon, 11, diapagmaximo, valorpag)
    } else if (mes == "dezembro") {
        const icon = document.getElementById("dez");
        moddez = modPag(icon, 12, diapagmaximo, valorpag)
    }

}
function modPag(icon, mes, diapagmaximo, valorpag) {
    if (icon.classList.contains("fa-circle-minus")) {
        icon.classList.remove("fa-circle-minus")

        var retStatus = verificarStatus(mes, diapagmaximo)

        if (retStatus == 'alerta') {
            icon.classList.add("fa-dollar-sign")
            icon.classList.add("fa-1,5x")
            icon.style.color = "#b40404"
            return 'alerta'
        } else {
            icon.classList.add("fa-dollar-sign")
            icon.classList.add("fa-1,5x")
            icon.classList.add("text-gray-300")
            return 'pendente'
        }
    } else if (icon.classList.contains("fa-dollar-sign")) {
        icon.classList.remove("fa-dollar-sign")
        icon.classList.remove("text-gray-300")
        icon.classList.add("fa-circle-check")
        icon.style.color = "#03ad00"
        totalmudpag += valorpag
        return 'pago'
    } else {
        icon.classList.remove("fa-circle-check")
        icon.classList.add("fa-circle-minus")
        icon.classList.add("text-secondary-300")
        icon.style.color = "#858796"
        totalmudpag -= valorpag
        return 'isento'
    }
}
function verificarStatus(mes, diapagmaximo) {
    //pegando data atual pra comparar
    var data = new Date();
    var diaatual = data.getDate()
    var mesatual = data.getMonth() + 1
    var anoatual = data.getFullYear()

    let situacao

    
    if (anoatual > 2023) {
        situacao = 'alerta'
    } else if (mesatual > mes) {
        situacao = 'alerta'
    } else if (mesatual == mes) {
        if (diaatual > diapagmaximo) {
            situacao = 'alerta'
        }
    } else {
        situacao = 'pendente'
    }
    return situacao
}
async function confirmandoPagamento(novopagamento){
    const response = await fetch(url + 'pag/'+ jogadorId+'/',
        {
            method: "PUT",
            body: novopagamento,
            headers: {
                "Content-type": "application/json",
            },
        });
        
        getPagJog(jogadorId, 2023)
}
async function mudandoPagamento(){
    atualizarpagamento = {
        "id_jogador": jogadorId,
        "anoatual": ano,
        "pagjan": modjan,
        "pagfev": modfev,
        "pagmar": modmar,
        "pagabr": modabr,
        "pagmai": modmai,
        "pagjun": modjun,
        "pagjul": modjul,
        "pagago": modago,
        "pagset": modset,
        "pagout": modout,
        "pagnov": modnov,
        "pagdez": moddez,
        "totalpag": modtotalpag+totalmudpag,
        "status": modstatus
    };

    novopagamento = JSON.stringify(atualizarpagamento);
    console.log(novopagamento)
    confirmandoPagamento(novopagamento)
}
window.onload = function(){
    atribuindoPagamento(jogadorId)
}
