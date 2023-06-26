let id_pag, ano,
modjan, modvalor_pagjan, moddata_pagjan, 
modfev, modvalor_pagfev, moddata_pagfev,
modmar, modvalor_pagmar, moddata_pagmar,
modabr, modvalor_pagabr, moddata_pagabr,
modmai, modvalor_pagmai, moddata_pagmai,
modjun, modvalor_pagjun, moddata_pagjun,
modjul, modvalor_pagjul, moddata_pagjul,
modago, modvalor_pagago, moddata_pagago,
modset, modvalor_pagset, moddata_pagset,
modout, modvalor_pagout, moddata_pagout,
modnov, modvalor_pagnov, moddata_pagnov,
moddez, modvalor_pagdez, moddata_pagdez,
modstatus, modtotalpag
let totalmudpag = 0
let valorpag // pa
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
            id_pag = pagamento.id
            ano = pagamento.anoatual
            modjan = pagamento.pagjan
            modvalor_pagjan = pagamento.valor_pagjan
            moddata_pagjan = pagamento.data_pagjan
            modfev = pagamento.pagfev
            modvalor_pagfev = pagamento.valor_pagfev
            moddata_pagfev = pagamento.data_pagfev
            modmar = pagamento.pagmar
            modvalor_pagmar = pagamento.valor_pagmar
            moddata_pagmar = pagamento.data_pagmar
            modabr = pagamento.pagabr
            modvalor_pagabr = pagamento.valor_pagabr
            moddata_pagabr = pagamento.data_pagabr
            modmai = pagamento.pagmai
            modvalor_pagmai = pagamento.valor_pagmai
            moddata_pagmai = pagamento.data_pagmai
            modjun = pagamento.pagjun
            modvalor_pagjun = pagamento.valor_pagjun
            moddata_pagjun = pagamento.data_pagjun
            modjul = pagamento.pagjul
            modvalor_pagjul = pagamento.valor_pagjul
            moddata_pagjul = pagamento.data_pagjul
            modago = pagamento.pagago
            modvalor_pagago = pagamento.valor_pagago
            moddata_pagago = pagamento.data_pagago
            modset = pagamento.pagset
            modvalor_pagset = pagamento.valor_pagset
            moddata_pagset = pagamento.data_pagset
            modout = pagamento.pagout
            modvalor_pagout = pagamento.valor_pagout
            moddata_pagout = pagamento.data_pagout
            modnov = pagamento.pagnov
            modvalor_pagnov = pagamento.valor_pagnov
            moddata_pagnov = pagamento.data_pagnov
            moddez = pagamento.pagdez
            modvalor_pagdez = pagamento.valor_pagdez
            moddata_pagdez = pagamento.data_pagdez
            modtotalpag = parseInt(pagamento.totalpag)
            modstatus = pagamento.status
        }
    })
}
async function editPag(mes) {
    console.log(totalmudpag)
    let diapagmaximo
    const responsePelada = await fetch(`${url}pelada/`)
    const peladas = await responsePelada.json()

    const id_pelada = localStorage.getItem('id_pelada')
    peladas.map((pelada) => {
        if (pelada.id == id_pelada) {
            diapagmaximo = Number(pelada.diamaxpagamento)
            valorpag = Number(pelada.valorpagamento)
        }
    })
    var data = new Date();
    var diaatual = data.getDate()
    var mesatual = data.getMonth() + 1
    var anoatual = data.getFullYear()

    if (mes == "janeiro") {
        const icon = document.getElementById("jan");
        modjan = modPag(icon, 1, diapagmaximo, valorpag)
        if(modjan == 'pago'){
            modvalor_pagjan = Number(valorpag)
            moddata_pagjan = diaatual+"/"+mesatual+"/"+anoatual
        }
    } else if (mes == "fevereiro") {
        const icon = document.getElementById("fev");
        modfev = modPag(icon, 2, diapagmaximo)
        if(modfev == 'pago'){
            modvalor_pagfev = Number(valorpag)
            moddata_pagfev = diaatual+"/"+mesatual+"/"+anoatual
        }
    } else if (mes == "março") {
        const icon = document.getElementById("mar");
        modmar = modPag(icon, 3, diapagmaximo, valorpag)
        if(modmar == 'pago'){
            modvalor_pagmar = Number(valorpag)
            moddata_pagmar = diaatual+"/"+mesatual+"/"+anoatual
        }
    } else if (mes == "abril") {
        const icon = document.getElementById("abr");
        modabr = modPag(icon, 4, diapagmaximo, valorpag)
        if(modabr == 'pago'){
            modvalor_pagabr = Number(valorpag)
            moddata_pagabr = diaatual+"/"+mesatual+"/"+anoatual
        }
    } else if (mes == "maio") {
        const icon = document.getElementById("mai");
        modmai = modPag(icon, 5, diapagmaximo, valorpag)
        if(modmai == 'pago'){
            modvalor_pagmai = Number(valorpag)
            moddata_pagmai = diaatual+"/"+mesatual+"/"+anoatual
        }
    } else if (mes == "junho") {
        const icon = document.getElementById("jun");
        modjun = modPag(icon, 6, diapagmaximo, valorpag)
        if(modjun == 'pago'){
            modvalor_pagjun = Number(valorpag)
            moddata_pagjun = diaatual+"/"+mesatual+"/"+anoatual
        }
    } else if (mes == "julho") {
        const icon = document.getElementById("jul");
        modjul = modPag(icon, 7, diapagmaximo, valorpag)
        if(modjul == 'pago'){
            modvalor_pagjul = Number(valorpag)
            moddata_pagjul = diaatual+"/"+mesatual+"/"+anoatual
        }
    } else if (mes == "agosto") {
        const icon = document.getElementById("ago");
        modago = modPag(icon, 8, diapagmaximo, valorpag)
        if(modago == 'pago'){
            modvalor_pagago = Number(valorpag)
            moddata_pagago = diaatual+"/"+mesatual+"/"+anoatual
        }
    } else if (mes == "setembro") {
        const icon = document.getElementById("set");
        modset = modPag(icon, 9, diapagmaximo, valorpag)
        if(modset == 'pago'){
            modvalor_pagset = Number(valorpag)
            moddata_pagset = diaatual+"/"+mesatual+"/"+anoatual
        }
    } else if (mes == "outubro") {
        const icon = document.getElementById("out");
        modout = modPag(icon, 10, diapagmaximo, valorpag)
        if(modout == 'pago'){
            modvalor_pagout = Number(valorpag)
            moddata_pagout = diaatual+"/"+mesatual+"/"+anoatual
        }
    } else if (mes == "novembro") {
        const icon = document.getElementById("nov");
        modnov = modPag(icon, 11, diapagmaximo, valorpag)
        if(modnov == 'pago'){
            modvalor_pagnov = Number(valorpag)
            moddata_pagnov = diaatual+"/"+mesatual+"/"+anoatual
        }
    } else if (mes == "dezembro") {
        const icon = document.getElementById("dez");
        moddez = modPag(icon, 12, diapagmaximo, valorpag)
        if(moddez == 'pago'){
            modvalor_pagdez = Number(valorpag)
            moddata_pagdez = diaatual+"/"+mesatual+"/"+anoatual
        }
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
    const response = await fetch(url + 'pag/'+ id_pag+'/',
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
        "valor_pagjan": modvalor_pagjan,
        "data_pagjan": moddata_pagjan,
        "pagfev": modfev,
        "valor_pagfev": modvalor_pagfev,
        "data_pagfev": moddata_pagfev,
        "pagmar": modmar,
        "valor_pagmar": modvalor_pagmar,
        "data_pagmar": moddata_pagmar,
        "pagabr": modabr,
        "valor_pagabr": modvalor_pagabr,
        "data_pagabr": moddata_pagabr,
        "pagmai": modmai,
        "valor_pagmai": modvalor_pagmai,
        "data_pagmai": moddata_pagmai,
        "pagjun": modjun,
        "valor_pagjun": modvalor_pagjun,
        "data_pagjun": moddata_pagjun,
        "pagjul": modjul,
        "valor_pagjul": modvalor_pagjul,
        "data_pagjul": moddata_pagjul,
        "pagago": modago,
        "valor_pagago": modvalor_pagago,
        "data_pagago": moddata_pagago,
        "pagset": modset,
        "valor_pagset": modvalor_pagset,
        "data_pagset": moddata_pagset,
        "pagout": modout,
        "valor_pagout": modvalor_pagout,
        "data_pagout": moddata_pagout,
        "pagnov": modnov,
        "valor_pagnov": modvalor_pagnov,
        "data_pagnov": moddata_pagnov,
        "pagdez": moddez,
        "valor_pagdez": modvalor_pagdez,
        "data_pagdez": moddata_pagdez,
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
