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
let quantidade_mudancas = 1

const mudandoStatus = document.querySelector("#status")

function ampliar(mes) {
    const tirar_hide = document.getElementById(mes)

    tirar_hide.classList.remove('hide')
}
function faturaHtml(mes, data_pagamento, valor) {
    let id_nome = String(mes).substring(0, 3)
    return `
    <div class="accordion" id="accordionExample">
        <div class="accordion-item">
            <h2 class="accordion-header">
                <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#${id_nome}" aria-expanded="false" aria-controls="collapseTwo">
                    <strong class="text-success">${mes}</strong>
                </button>
            </h2>
            <div id="${id_nome}" class="accordion-collapse collapse" data-bs-parent="#accordionExample">
                <div class="accordion-body d-flex" style="flex-direction: column">
                    <strong >Pago em:</strong>
                    ${data_pagamento}
                    <br>
                    <strong>Valor pago:</strong>
                    R$${valor}             
                    <br>
                    <div class="mb-3">
                        <strong ><label for="formFile" class="form-label">Comprovante da fatura:</label></strong>
                        <input class="form-control" type="file" id="formFile">
                    </div>
                </div>
            </div>
        </div>
        `
}
function gerandoFaturas() {

    let ha_faturas = false

    const faturas = document.getElementById('faturas')

    faturas.innerHTML = ""

    let pags = [
        modjan,
        modfev,
        modmar,
        modabr,
        modmai,
        modjun,
        modjul,
        modago,
        modset,
        modout,
        modnov,
        moddez,
    ]

    let mes = 0;
    pags.map((statuspag) => {
        mes++
        if (statuspag == 'pago') {
            ha_faturas = true
            if (mes == 1) {
                faturas.innerHTML += faturaHtml("Janeiro", moddata_pagjan, modvalor_pagjan)
            } else if (mes == 2) {
                faturas.innerHTML += faturaHtml("Fevereiro", moddata_pagfev, modvalor_pagfev)
            } else if (mes == 3) {
                faturas.innerHTML += faturaHtml("Março", moddata_pagmar, modvalor_pagmar)
            } else if (mes == 4) {
                faturas.innerHTML += faturaHtml("Abril", moddata_pagabr, modvalor_pagabr)
            } else if (mes == 5) {
                faturas.innerHTML += faturaHtml("Maio", moddata_pagmai, modvalor_pagmai)
            } else if (mes == 6) {
                faturas.innerHTML += faturaHtml("Junho", moddata_pagjun, modvalor_pagjun)
            } else if (mes == 7) {
                faturas.innerHTML += faturaHtml("Julho", moddata_pagjul, modvalor_pagjul)
            } else if (mes == 8) {
                faturas.innerHTML += faturaHtml("Agosto", moddata_pagago, modvalor_pagago)
            } else if (mes == 9) {
                faturas.innerHTML += faturaHtml("Setembro", moddata_pagset, modvalor_pagset)
            } else if (mes == 10) {
                faturas.innerHTML += faturaHtml("Outubro", moddata_pagout, modvalor_pagout)
            } else if (mes == 11) {
                faturas.innerHTML += faturaHtml("Novembro", moddata_pagnov, modvalor_pagnov)
            } else if (mes == 12) {
                faturas.innerHTML += faturaHtml("Dezembro", moddata_pagdez, modvalor_pagdez)
            }
        }
    })
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
async function atribuindoPagamento(jogadorId) {
    //pegando jogador
    const responseJog = await fetch(`${url}jog/${jogadorId}`)
    const jogador = await responseJog.json()

    object_jogador = jogador

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

    gerandoFaturas()
}
async function editPag(mes) {
    console.log(totalmudpag)
    let diapagmaximo
    const responsePelada = await fetch(`${url}pelada/`)
    const peladas = await responsePelada.json()

    const id_pelada = localStorage.getItem('id_pelada')
    peladas.map((pelada) => {
        if (pelada.id == id_pelada) {
            diapagmaximo = parseFloat(pelada.diamaxpagamento)
            valorpag = parseFloat(pelada.valorpagamento)
        }
    })
    var data = new Date();
    var diaatual = data.getDate()
    var mesatual = data.getMonth() + 1
    var anoatual = data.getFullYear()

    if (mes == "janeiro") {
        const icon = document.getElementById("jan");
        modjan = modPag(icon, 1, diapagmaximo, valorpag)
        if (modjan == 'pago') {
            modvalor_pagjan = parseFloat(valorpag)
            moddata_pagjan = diaatual + "/" + mesatual + "/" + anoatual
            modstatus = 'apto'
        } else if (modjan == 'alerta') {
            modstatus = 'inapto'
            modvalor_pagjan = 0
            moddata_pagjan = 'não pago'
        } else if (modjan != 'pago') {
            modvalor_pagjan = 0
            moddata_pagjan = 'não pago'
        }
    } else if (mes == "fevereiro") {
        const icon = document.getElementById("fev");
        modfev = modPag(icon, 2, diapagmaximo, valorpag)
        if (modfev == 'pago') {
            modvalor_pagfev = parseFloat(valorpag)
            moddata_pagfev = diaatual + "/" + mesatual + "/" + anoatual
            modstatus = 'apto'
        } else if (modfev == 'alerta') {
            modstatus = 'inapto'
            modvalor_pagfev = 0
            moddata_pagfev = 'não pago'
        } else if (modfev != 'pago') {
            modvalor_pagfev = 0
            moddata_pagfev = 'não pago'
        }
    } else if (mes == "março") {
        const icon = document.getElementById("mar");
        modmar = modPag(icon, 3, diapagmaximo, valorpag)
        if (modmar == 'pago') {
            modvalor_pagmar = parseFloat(valorpag)
            moddata_pagmar = diaatual + "/" + mesatual + "/" + anoatual
            modstatus = 'apto'
        } else if (modmar == 'alerta') {
            modstatus = 'inapto'
            modvalor_pagmar = 0
            moddata_pagmar = 'não pago'
        } else if (modmai != 'pago') {
            modvalor_pagmar = 0
            moddata_pagmar = 'não pago'
        }
    } else if (mes == "abril") {
        const icon = document.getElementById("abr");
        modabr = modPag(icon, 4, diapagmaximo, valorpag)
        if (modabr == 'pago') {
            modvalor_pagabr = parseFloat(valorpag)
            moddata_pagabr = diaatual + "/" + mesatual + "/" + anoatual
            modstatus = 'apto'
        } else if (modabr == 'alerta') {
            modstatus = 'inapto'
            modvalor_pagabr = 0
            moddata_pagabr = 'não pago'
        } else if (modabr != 'pago') {
            modvalor_pagabr = 0
            moddata_pagabr = 'não pago'
        }
    } else if (mes == "maio") {
        const icon = document.getElementById("mai");
        modmai = modPag(icon, 5, diapagmaximo, valorpag)
        if (modmai == 'pago') {
            modvalor_pagmai = parseFloat(valorpag)
            moddata_pagmai = diaatual + "/" + mesatual + "/" + anoatual
            modstatus = 'apto'
        } else if (modmai == 'alerta') {
            modstatus = 'inapto'
            modvalor_pagmai = 0
            moddata_pagmai = 'não pago'
        } else if (modmai != 'pago') {
            modvalor_pagmai = 0
            moddata_pagmai = 'não pago'
        }
    } else if (mes == "junho") {
        const icon = document.getElementById("jun");
        modjun = modPag(icon, 6, diapagmaximo, valorpag)
        if (modjun == 'pago') {
            modvalor_pagjun = parseFloat(valorpag)
            moddata_pagjun = diaatual + "/" + mesatual + "/" + anoatual
            modstatus = 'apto'
        } else if (modjun == 'alerta') {
            modstatus = 'inapto'
            modvalor_pagjun = 0
            moddata_pagjun = 'não pago'
        } else if (modjun != 'pago') {
            modvalor_pagjun = 0
            moddata_pagjun = 'não pago'
        }
    } else if (mes == "julho") {
        const icon = document.getElementById("jul");
        modjul = modPag(icon, 7, diapagmaximo, valorpag)
        if (modjul == 'pago') {
            modvalor_pagjul = parseFloat(valorpag)
            moddata_pagjul = diaatual + "/" + mesatual + "/" + anoatual
            modstatus = 'apto'
        } else if (modjul == 'alerta') {
            modstatus = 'inapto'
            modvalor_pagjul = 0
            moddata_pagjul = 'não pago'
        } else if (modjul != 'pago') {
            modvalor_pagjul = 0
            moddata_pagjul = 'não pago'
        }
    } else if (mes == "agosto") {
        const icon = document.getElementById("ago");
        modago = modPag(icon, 8, diapagmaximo, valorpag)
        if (modago == 'pago') {
            modvalor_pagago = parseFloat(valorpag)
            moddata_pagago = diaatual + "/" + mesatual + "/" + anoatual
            modstatus = 'apto'
        } else if (modago == 'alerta') {
            modstatus = 'inapto'
            modvalor_pagago = 0
            moddata_pagago = 'não pago'
        } else if (modago != 'pago') {
            modvalor_pagago = 0
            moddata_pagago = 'não pago'
        }
    } else if (mes == "setembro") {
        const icon = document.getElementById("set");
        modset = modPag(icon, 9, diapagmaximo, valorpag)
        if (modset == 'pago') {
            modvalor_pagset = parseFloat(valorpag)
            moddata_pagset = diaatual + "/" + mesatual + "/" + anoatual
            modstatus = 'apto'
        } else if (modset == 'alerta') {
            modstatus = 'inapto'
            modvalor_pagset = 0
            moddata_pagset = 'não pago'
        } else if (modset != 'pago') {
            modvalor_pagset = 0
            moddata_pagset = 'não pago'
        }
    } else if (mes == "outubro") {
        const icon = document.getElementById("out");
        modout = modPag(icon, 10, diapagmaximo, valorpag)
        if (modout == 'pago') {
            modvalor_pagout = parseFloat(valorpag)
            moddata_pagout = diaatual + "/" + mesatual + "/" + anoatual
            modstatus = 'apto'
        } else if (modout == 'alerta') {
            modstatus = 'inapto'
            modvalor_pagout = 0
            moddata_pagout = 'não pago'
        } else if (modout != 'pago') {
            modvalor_pagout = 0
            moddata_pagout = 'não pago'
        }
    } else if (mes == "novembro") {
        const icon = document.getElementById("nov");
        modnov = modPag(icon, 11, diapagmaximo, valorpag)
        if (modnov == 'pago') {
            modvalor_pagnov = parseFloat(valorpag)
            moddata_pagnov = diaatual + "/" + mesatual + "/" + anoatual
            modstatus = 'apto'
        } else if (modnov == 'alerta') {
            modstatus = 'inapto'
            modvalor_pagnov = 0
            moddata_pagnov = 'não pago'
        } else if (modnov != 'pago') {
            modvalor_pagnov = 0
            moddata_pagnov = 'não pago'
        }
    } else if (mes == "dezembro") {
        const icon = document.getElementById("dez");
        moddez = modPag(icon, 12, diapagmaximo, valorpag)
        if (moddez == 'pago') {
            modvalor_pagdez = parseFloat(valorpag)
            moddata_pagdez = diaatual + "/" + mesatual + "/" + anoatual
            modstatus = 'apto'
        } else if (moddez == 'alerta') {
            modstatus = 'inapto'
            modvalor_pagdez = 0
            moddata_pagdez = 'não pago'
        } else if (moddez != 'pago') {
            modvalor_pagdez = 0
            moddata_pagdez = 'não pago'
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

async function confirmandoPagamento(novopagamento) {
    const response = await fetch(url + 'pag/' + id_pag + '/',
        {
            method: "PUT",
            body: novopagamento,
            headers: {
                "Content-type": "application/json",
            },
        });

    getPagJog(jogadorId, 2023)

    const confirmacao = document.getElementById('confirmacao')
    if (quantidade_mudancas == 1) {
        confirmacao.innerHTML = `<div class="alert alert-success" role="alert">
                                        As alterações no pagamento foram salvas
                                    </div>`
    } else {
        confirmacao.innerHTML = `<div class="alert alert-success" role="alert">
                                        As alterações no pagamento foram salvas (${quantidade_mudancas})
                                    </div>`
    }

    quantidade_mudancas++
}
async function mudandoPagamento() {
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
        "totalpag": modtotalpag + totalmudpag,
        "status": modstatus
    };

    mudandoStatus.innerHTML = "O peladeiro está " + modstatus + " a jogar"

    novopagamento = JSON.stringify(atualizarpagamento);
    console.log(novopagamento)

    confirmandoPagamento(novopagamento)
    gerandoFaturas()
}

window.onload = function () {

    //nome da pelada no sidebar
    const sidebar_nome = document.querySelector('#peladanome-sel');

    sidebar_nome.innerHTML = localStorage.getItem('nome_pelada')

    //personalizando áreas do usuário

    //pegando o usuário responsavél pela pelada
    const pelada_user = document.getElementById('usuario-nome')

    pelada_user.innerHTML = localStorage.getItem('nome_usuario')

    atribuindoPagamento(jogadorId)
}
