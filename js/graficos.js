const jogadores_dados = []
let pel_selecionada = ''
let somajan = somafev = somamar = somaabr = somamai = somajun = somajul = somaago = somaset = somaout = somanov = somadez = 0
let desjan = desfev = desmar = desabr = desmai = desjun = desjul = desago = desset = desout = desnov = desdez = 0
receitas_data = []
despesas_data = []
faturamento_mes = []
faturamento_anual = []

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
  despesas_data = [desjan, desfev, desmar, desabr, desmai, desjun, desjul, desago, desset, desout, desnov, desdez]
  receitas_data = [somajan, somafev, somamar, somaabr, somamai, somajun, somajul, somaago, somaset, somaout, somanov, somadez]
  faturamento_mes = [
    somajan - desjan,
    somafev - desfev,
    somamar - desmar,
    somaabr - desabr,
    somamai - desmai,
    somajun - desjun,
    somajul - desjul,
    somaago - desago,
    somaset - desset,
    somaout - desout,
    somanov - desnov,
    somadez - desdez
  ]
  for (i = 0; i < 12; i++) {
    if (i == 0) {
      faturamento_anual[0] = faturamento_mes[0]
    } else {
      faturamento_anual[i] = faturamento_mes[i] + faturamento_anual[i - 1]
    }
  }
  grafico1()
  grafico2()
  porcPagamento('fevereiro')
  dadosEspecificos(1) 
  //totalPagosMes('fevereiro')
}
function dadosEspecificos(mes){
  
  //card lucro
  const lucro = document.getElementById('lucro')
  const comparar = document.getElementById('faturamento-despesas')
  
  let cor
  if(faturamento_mes[mes]<=0){
    cor = 'danger'
  }
  lucro.innerHTML = 'R$'+faturamento_mes[mes]
  lucro.classList.remove('text-gray-800')
  lucro.classList.add('text-danger')

  let somas = receitas_data[mes] + despesas_data[mes]
  let perc_receitas = ((receitas_data[mes]/somas)*100).toFixed(2)
  let perc_despesas = 100-perc_receitas

  comparar.innerHTML = `<h4 class="small font-weight-bold text-success">
                          Faturamento
                          <span class="float-right">R$${receitas_data[mes]}</span>
                        </h4>
                        <div class="progress mb-4">
                          <div class="progress-bar bg-success" role="progressbar" 
                            style="width: ${perc_receitas}%"
                            aria-valuencow="80" aria-valuemin="0" aria-valuemax="100">
                          </div>
                        </div>
                        <h4 class="small font-weight-bold text-danger">
                          Despesas
                          <span class="float-right">${despesas_data[mes]}</span>
                        </h4>
                        <div class="progress">
                          <div class="progress-bar bg-danger" role="progressbar" 
                          style="width: ${perc_despesas}%"
                          aria-valuenow="100" aria-valuemin="0" aria-valuemax="100">
                          </div>
                      </div>`
}
async function porcPagamento(mes) {
  const responsePag = await fetch(`${url}pag/`)
  const pagamentos = await responsePag.json()

  let pago=0;
  let naopago=0;

  jogadores_dados.forEach(function (jogador) {
    pagamentos.map((pagamento) => {
      if (jogador.id == pagamento.id_jogador) {
        if(mes=='fevereiro'){
          if(pagamento.pagfev=='pago'){
            pago++
          }else if(pagamento.pagfev =='alerta' || pagamento.pagfev == 'pendente'){
            naopago++
          }
        }
      }
    })
  })

  let total = pago + naopago
  let percentual

  if(pago==0 && naopago==0){
    percentual = 100
  }else{
    percentual = (pago/total)*100
  }
  
  let cor = 'danger'
  if(percentual>30){
    cor = 'warning'
  }else if(cor>70){
    cor = 'success'
  }
  
  const perc_html = document.getElementById('porc-pagamento')
  perc_html.innerHTML = `<h4 class="small font-weight-bold">
                            Já pagos no mês
                            <span class="float-right">${percentual.toFixed(2)}%</span>
                          </h4>
                          <div class="progress mb-4">
                            <div class="progress-bar bg-${cor}" role="progressbar" style="width: ${percentual}%"
                              aria-valuenow="50" aria-valuemin="30" aria-valuemax="60"></div>
                            </div>
                          <h4 class="small font-weight-bold text-success">
                            Jogadores que pagaram:
                          <span class="float-right">${pago}</span>
                          </h4>
                          <h4 class="small font-weight-bold text-warning">
                            Estão pendentes:
                            <span class="float-right">${naopago}</span>
                          </h4>`
}
function grafico1() {
  var options = {
    series: [{
      name: "Faturamento anual",
      data: faturamento_anual
    }, {
      name: 'Faturamento mês',
      data: faturamento_mes
    }],
    chart: {
      height: 350,
      type: 'line',
      zoom: {
        enabled: false
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      curve: 'straight'
    },
    title: {
      text: 'Faturamento anual e mensal',
      align: 'left'
    },
    grid: {
      row: {
        colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
        opacity: 0.5
      },
    },
    xaxis: {
      categories: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
    }
  };

  var chart = new ApexCharts(document.querySelector("#faturamento-mes"), options);
  chart.render();
}
function grafico2() {
  var options = {
    series: [{
      name: 'Despesas',
      data: despesas_data
    }, {
      name: 'Receitas',
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
        text: 'Valor em R$'
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

  var chart = new ApexCharts(document.querySelector("#gastos-despesas"), options);
  chart.render();
}
getAllJogadores()