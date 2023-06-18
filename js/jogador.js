let modjan, modfev, modmar, modabr, modmai, modjun, modjul, modago, modset, modout, modnov, moddez 
modjan = modfev = modmar = modabr = modmai = modjun = modjul = modago = modset = modout = modnov = moddez = 'n/a'

async function editPag(mes) {
    let diapagmaximo
    const responsePelada = await fetch(`${url}pelada/`)
    const peladas = await responsePelada.json()
    peladas.map((pelada) => {
        if (pelada.id == 1) {
            diapagmaximo = Number(pelada.diamaxpagamento)
        }
    })
    if (mes == "janeiro") {
        const icon = document.getElementById("jan");
        modjan = modPag(icon, 1, diapagmaximo)
    } else if (mes == "fevereiro") {
        const icon = document.getElementById("fev");
        modfev = modPag(icon, 2, diapagmaximo)
    } else if (mes == "março") {
        const icon = document.getElementById("mar");
        modmar = modPag(icon, 3, diapagmaximo)
    } else if (mes == "abril") {
        const icon = document.getElementById("abr");
        modabr = modPag(icon, 4, diapagmaximo)
    } else if (mes == "maio") {
        const icon = document.getElementById("mai");
        modmai = modPag(icon, 5, diapagmaximo)
    } else if (mes == "junho") {
        const icon = document.getElementById("jun");
        modjun = modPag(icon, 6, diapagmaximo)
    } else if (mes == "julho") {
        const icon = document.getElementById("jul");
        modjul = modPag(icon, 7, diapagmaximo)
    } else if (mes == "agosto") {
        const icon = document.getElementById("ago");
        modago = modPag(icon, 8, diapagmaximo)
    } else if (mes == "setembro") {
        const icon = document.getElementById("set");
        modset = modPag(icon, 9, diapagmaximo)
    } else if (mes == "outubro") {
        const icon = document.getElementById("out");
        modout = modPag(icon, 10, diapagmaximo)
    } else if (mes == "novembro") {
        const icon = document.getElementById("nov");
        modnov = modPag(icon, 11, diapagmaximo)
    } else if (mes == "dezembro") {
        const icon = document.getElementById("dez");
        moddez = modPag(icon, 12, diapagmaximo)
    }
}
function modPag(icon, mes, diapagmaximo) {
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
        return 'pago'
    } else {
        icon.classList.remove("fa-circle-check")
        icon.classList.add("fa-circle-minus")
        icon.classList.add("text-secondary-300")
        icon.style.color = "#858796"
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

    if (diaatual > diapagmaximo) {
        situacao = 'alerta'
    } else if (mesatual > mes) {
        situacao = 'alerta'
    } else if (anoatual > 2023) {
        situacao = 'alerta'
    } else {
        situacao = 'pendente'
    }
    return situacao
}
function mudandoPagamento(){
    let somapags;

    
    if(modjan!='n/a'){
        if(modjan=='pago'){
            somapags=somapags+//valordapelada
        }
    }
}
