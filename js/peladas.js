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

    let nome = document.querySelector("#nome-pelada").value
    let time_a = document.querySelector("#time-a").value
    let time_b = document.querySelector("#time-b").value
    let diamax_pagamento = document.querySelector("#pay-day").value
    let valor_pag = document.querySelector("#valor-mensal").value
    //const logo = document.querySelector("#logo-pelada")

    let erro = 'nenhum'
    if(nome == ''){
        erro = 'A pelada precisa ter um nome'
    }

    if(diamax_pagamento == ''){
        diamax_pagamento = '31'
    }else if(parseInt(diamax_pagamento)>31 || parseInt(diamax_pagamento)<1){
        erro = 'O dia de pagamento deve estar entre 1 e 31'
    }
 
    if(time_a == ""){
        time_a = "N/I"
    }
    if(time_b == ""){
        time_b = "N/I"
    }

    var data = new Date();
    var diaatual = data.getDate()
    var mesatual = data.getMonth() + 1
    var anoatual = data.getFullYear()


    let erro_cadastro = document.getElementById('erro_pelada')

    if(erro != 'nenhum'){
        erro_cadastro.innerHTML = `<div class="alert alert-danger" role="alert">
                                        ${erro}
                                   </div>`
    }else{
        let novapelada = {
            "id_usuario":parseInt(userId),
            "nomepelada": nome,
            "timea": time_a,
            "timeb": time_b,
            "diamaxpagamento": diamax_pagamento,
            "valorpagamento": valor_pag,
            "diacriacao": String(diaatual),
            "mescriacao": String(mesatual),
            "anocriacao": String(anoatual),
        }
    
        novapelada = JSON.stringify(novapelada);
        addPelada(novapelada)

        console.log(novapelada)
    }

    

    
}
