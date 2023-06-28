const jogadores_dados = []
let pel_selecionada = ''
let somajan = somafev = somamar = somaabr = somamai = somajun = somajul = somaago = somaset = somaout = somanov = somadez = 0
let desjan = desfev = desmar = desabr = desmai = desjun = desjul = desago = desset = desout = desnov = desdez = 0
receitas_data = []
despesas_data = []

async function getAllJogadores() { //async - vou usar await para esperar as requisições

  //pegando a pelada e guardando numa variavél
  const responsePelada = await fetch(`${url}pelada/${id_pelada}`)
  pel_selecionada = await responsePelada.json()

  const response = await fetch(url + 'jog/')
  const jogadores = await response.json()

  await jogadores.map((jogador) => {
    if (jogador.id_pelada == id_pelada) {
      jogadores_dados.push(jogador)
    }
  })

  estatisticaMes()
}
async function estatisticaMes() {
  const responsePag = await fetch(`${url}pag/`)
  const pagamentos = await responsePag.json()

  const response = await fetch(`${url}receitas/`)
  const receitas = await response.json()

  let faturamento = 0
  let despesas = 0

  //pegando as despesas e receitas extras do mes indicado
  receitas.map((receita) => {
    if (receita.id_pelada == id_pelada) {
      if (receita.tipo == 'receita') {
        if (parseInt(receita.mes) == 1) {
          somajan += receita.valor
        } else if (parseInt(receita.mes) == 2) {
          somafev += receita.valor
        } else if (parseInt(receita.mes) == 3) {
          somamar += receita.valor
        } else if (parseInt(receita.mes) == 4) {
          somaabr += receita.valor
        } else if (parseInt(receita.mes) == 5) {
          somamai += receita.valor
        } else if (parseInt(receita.mes) == 6) {
          somajun += receita.valor
        } else if (parseInt(receita.mes) == 7) {
          somajul += receita.valor
        } else if (parseInt(receita.mes) == 8) {
          somaago += receita.valor
        } else if (parseInt(receita.mes) == 9) {
          somaset += receita.valor
        } else if (parseInt(receita.mes) == 10) {
          somaout += receita.valor
        } else if (parseInt(receita.mes) == 11) {
          somanov += receita.valor
        } else if (parseInt(receita.mes) == 12) {
          somadez += receita.valor
        }
      } else {
        if (parseInt(receita.mes) == 1) {
          desjan += receita.valor
        } else if (parseInt(receita.mes) == 2) {
          desfev += receita.valor
        } else if (parseInt(receita.mes) == 3) {
          desmar += receita.valor
        } else if (parseInt(receita.mes) == 4) {
          desabr += receita.valor
        } else if (parseInt(receita.mes) == 5) {
          desmai += receita.valor
        } else if (parseInt(receita.mes) == 6) {
          desjun += receita.valor
        } else if (parseInt(receita.mes) == 7) {
          desjul += receita.valor
        } else if (parseInt(receita.mes) == 8) {
          desago += receita.valor
        } else if (parseInt(receita.mes) == 9) {
          desset += receita.valor
        } else if (parseInt(receita.mes) == 10) {
          desout += receita.valor
        } else if (parseInt(receita.mes) == 11) {
          desnov += receita.valor
        } else if (parseInt(receita.mes) == 12) {
          desdez += receita.valor
        }
      }
    }
  })

  //somando todos os pagamentos de todos os meses dos jogadores
  jogadores_dados.forEach(function (jogador) {
    pagamentos.map((pagamento) => {
      if (jogador.id == pagamento.id_jogador) {
        somajan += pagamento.valor_pagjan
        somafev += pagamento.valor_pagfev
        somamar += pagamento.valor_pagmar
        somaabr += pagamento.valor_pagabr
        somamai += pagamento.valor_pagmai
        somajun += pagamento.valor_pagjun
        somajul += pagamento.valor_pagjul
        somaago += pagamento.valor_pagago
        somaset += pagamento.valor_pagset
        somaout += pagamento.valor_pagout
        somanov += pagamento.valor_pagnov
        somadez += pagamento.valor_pagdez
      }
    })
  })
  receitas_data = [somajan, somafev, somamar, somaabr, somamai, somajun, somajul, somaago, somaset, somaout, somanov, somadez]
  grafico2()
}
getAllJogadores()

function grafico2() {
  var options = {
    series: [{
      name: 'Despesas',
      data: [44, 55, 57, 56, 61, 58, 63, 60, 66]
    }, {
      name: 'Receitas extras',
      data: receitas_data
    }],
    chart: {
      type: 'bar',
      height: 350
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '55%',
        endingShape: 'rounded'
      },
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      show: true,
      width: 2,
      colors: ['transparent']
    },
    xaxis: {
      categories: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
    },
    yaxis: {
      title: {
        text: 'R$ (thousands)'
      }
    },
    fill: {
      opacity: 1
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return "R$" + val
        }
      }
    }
  };

  var chart = new ApexCharts(document.querySelector("#chart"), options);
  chart.render();
}
