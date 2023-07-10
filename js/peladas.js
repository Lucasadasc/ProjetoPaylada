const divpeladas = document.querySelector("#peladas")

async function addPelada(novapelada) {
    const response = await fetch(url + 'pelada/',
        {
            method: "POST",
            body: novapelada,
            headers: {
                "Content-type": "application/json",
            },
        });

    const pelada = await response.json();
    
    divpeladas.innerHTML += addCardPelada(pelada.id, pelada.logopelada, pelada.nomepelada, pelada.diacriacao, pelada.mescriacao, pelada.anocriacao, 0) //tá sendo pegado do logar.js

    window.location.href = "./minhaspeladas.html?id="+userId
}
function criarPelada(){

    const nome = document.querySelector("#nome-pelada")
    const time_a = document.querySelector("#time-a")
    const time_b = document.querySelector("#time-b")
    const diamax_pagamento = document.querySelector("#pay-day")
    const valor_pag = document.querySelector("#valor-mensal")
    //const logo = document.querySelector("#logo-pelada")

    if(time_a.value == ""){
        time_a.value = "N/I"
    }else if(time_b.value == ""){
        time_b.value = "N/I"
    }

    var data = new Date();
    var diaatual = data.getDate()
    var mesatual = data.getMonth() + 1
    var anoatual = data.getFullYear()

    console.log(userId)

    let novapelada = {
        "id_usuario":parseInt(userId),
        "nomepelada": nome.value,
        "timea": time_a.value,
        "timeb": time_b.value,
        "diamaxpagamento": diamax_pagamento.value,
        "valorpagamento": valor_pag.value,
        "diacriacao": String(diaatual),
        "mescriacao": String(mesatual),
        "anocriacao": String(anoatual),
    }

    novapelada = JSON.stringify(novapelada);
    console.log(novapelada)
    addPelada(novapelada)
}
