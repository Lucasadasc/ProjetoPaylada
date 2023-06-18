let modjan, modfev, modmar, modabr, modmai, modjun, modjul, modago,modset, modout, modnov, moddez

function editPag(mes) {
    if (mes == "janeiro") {
        const icon = document.getElementById("jan");
        modjan = modPag(icon)
    }else if(mes == "fevereiro") {
        const icon = document.getElementById("fev");
        modfev = modPag(icon)
    }else if(mes == "março") {
        const icon = document.getElementById("mar");
        modmar = modPag(icon)
    }else if(mes == "abril") {
        const icon = document.getElementById("abr");
        modabr = modPag(icon)
    }else if(mes == "maio") {
        const icon = document.getElementById("mai");
        modmai = modPag(icon)
    }else if(mes == "junho") {
        const icon = document.getElementById("jun");
        modjun = modPag(icon)
    }else if(mes == "julho") {
        const icon = document.getElementById("jul");
        modjul = modPag(icon)
    }else if(mes == "agosto") {
        const icon = document.getElementById("ago");
        modago = modPag(icon)
    }else if(mes == "setembro") {
        const icon = document.getElementById("set");
        modset = modPag(icon)
    }else if(mes == "outubro") {
        const icon = document.getElementById("out");
        modout = modPag(icon)
    }else if(mes == "novembro") {
        const icon = document.getElementById("nov");
        modnov = modPag(icon)
    }else if(mes == "dezembro") {
        const icon = document.getElementById("dez");
        moddez = modPag(icon)
    }
}
function modPag(icon){
    if (icon.classList.contains("fa-circle-minus")) {
        icon.classList.remove("fa-circle-minus")
        icon.classList.add("fa-dollar-sign")
        icon.classList.add("fa-1,5x")
        icon.classList.add("text-gray-300")
        verificarStatus()
        return 'pendente'
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
async function verificarStatus(){
    const responsePelada = await fetch(`${url}pelada/`)
    const peladas = await responsePelada.json()

    //pegando data atual pra comparar
    var data = new Date();
    var diaatual = data.getDate()
    var mesatual = data.getMonth()+1
    var anoatual = data.getFullYear()

    console.log(mesatual)

    let diapagmaximo
    peladas.map((pelada) => {
        if (pelada.id == 1) {
            diapagmaximo = Number(pelada.diamaxpagamento)
        }
    })

    if(diapagmaximo<diaatual){
        return 'alert'
    }

}