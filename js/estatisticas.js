async function estatisticaMes(mes){
    const responsePag = await fetch(`${url}pag/`)
    const pagamentos = await responsePag.json()

    const response = await fetch(`${url}receitas/`)
    const receitas = await response.json()

    let faturamento = 0

    //somando todos os pagamentos de todos os meses dos jogadores
    lista_jogadores.forEach(function(jogador){
        pagamentos.map((pagamento)=>{
            if(jogador.id == pagamento.id_jogador){
                faturamento += pagamento.totalpag
            }
        })
    })
    //pegando as despesas e receitas extras de todos os meses
    receitas.map((receita)=>{
        if(receita.id_pelada==id_pelada){
            if(receita.tipo=='receita'){
                faturamento += Number(receita.valor)
            }else{
                faturamento -= Number(receita.valor)
            }
        }
    })

    arrecadado.innerHTML = "R$"+faturamento

    if(faturamento>0){
        arrecadado.style.color = "#03ad00"
    }else{
        arrecadado.style.color = "#b40404"
    }
}