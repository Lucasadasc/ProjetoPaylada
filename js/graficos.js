const jogadores_dados = []
let pel_selecionada = ''
let somajan = somafev = somamar = somaabr = somamai = somajun = somajul = somaago = somaset = somaout = somanov = somadez = 0
let desjan = desfev = desmar = desabr = desmai = desjun = desjul = desago = desset = desout = desnov = desdez = 0
receitas_separadas = [] //receitas e pagamentos organizados separadamente
receitas_data = [] //soma de receitas extras e pagamentos de jogadores em cada mes
despesas_data = [] //soma das despesas em cada mes
faturamento_mes = [] //receitas - despesas em cada mês
faturamento_anual = [] //soma do faturamento a cada mês


async function porcPagamento(mes) {
  const responsePag = await fetch(`${url}pag/`)
  const pagamentos = await responsePag.json()

  let pago = 0;
  let naopago = 0;

  jogadores_dados.forEach(function (jogador) {
    pagamentos.map((pagamento) => {
      if (jogador.id == pagamento.id_jogador) {
        switch (mes) {
          case 0:
            if (pagamento.pagjan == 'pago') {
              pago++
            } else if (pagamento.pagjan == 'alerta' || pagamento.pagjan == 'pendente') {
              naopago++
            }
            break;
          case 1:
            if (pagamento.pagfev == 'pago') {
              pago++
            } else if (pagamento.pagfev == 'alerta' || pagamento.pagfev == 'pendente') {
              naopago++
            }
            break;
          case 2:
            if (pagamento.pagmar == 'pago') {
              pago++
            } else if (pagamento.pagmar == 'alerta' || pagamento.pagmar == 'pendente') {
              naopago++
            }
            break;
          case 3:
            if (pagamento.pagabr == 'pago') {
              pago++
            } else if (pagamento.pagabr == 'alerta' || pagamento.pagabr == 'pendente') {
              naopago++
            }
            break;
          case 4:
            if (pagamento.pagmai == 'pago') {
              pago++
            } else if (pagamento.pagmai == 'alerta' || pagamento.pagmai == 'pendente') {
              naopago++
            }
            break;
          case 5:
            if (pagamento.pagjun == 'pago') {
              pago++
            } else if (pagamento.pagjun == 'alerta' || pagamento.pagfjun == 'pendente') {
              naopago++
            }
            break;
          case 6:
            if (pagamento.pagjul == 'pago') {
              pago++
            } else if (pagamento.pagjul == 'alerta' || pagamento.pagjul == 'pendente') {
              naopago++
            }
            break;
          case 7:
            if (pagamento.pagago == 'pago') {
              pago++
            } else if (pagamento.pagago == 'alerta' || pagamento.pagago == 'pendente') {
              naopago++
            }
            break;
          case 8:
            if (pagamento.pagset == 'pago') {
              pago++
            } else if (pagamento.pagset == 'alerta' || pagamento.pagset == 'pendente') {
              naopago++
            }
            break;
          case 9:
            if (pagamento.pagout == 'pago') {
              pago++
            } else if (pagamento.pagout == 'alerta' || pagamento.pagout == 'pendente') {
              naopago++
            }
            break;
          case 10:
            if (pagamento.pagnov == 'pago') {
              pago++
            } else if (pagamento.pagnov == 'alerta' || pagamento.pagnov == 'pendente') {
              naopago++
            }
            break;
          case 11:
            if (pagamento.pagdez == 'pago') {
              pago++
            } else if (pagamento.pagdez == 'alerta' || pagamento.pagdez == 'pendente') {
              naopago++
            }
            break;
        }



      }
    })
  })

  console.log(pago)

  let total = pago + naopago
  let percentual

  if (pago == 0 && naopago == 0) {
    percentual = 100
  } else {
    percentual = (pago / total) * 100
  }

  let cor = 'danger'
  if (percentual > 30 && percentual < 70) {
    cor = 'warning'
  } else if (percentual >= 70) {
    cor = 'success'
  }

  const perc_html = document.getElementById('porc-pagamento')
  perc_html.innerHTML = `<h4 class="small font-weight-bold">
                            Já pagos no mês
                            <span class="float-right text-${cor}">${percentual.toFixed(2)}%</span>
                          </h4>
                          <div class="progress mb-4">
                            <div class="progress-bar bg-${cor}" role="progressbar" style="width: ${percentual}%"
                              aria-valuenow="50" aria-valuemin="30" aria-valuemax="60"></div>
                            </div>
                          <h4 class="small font-weight-bold text-${cor}">
                            Jogadores que pagaram:
                          <span class="float-right">${pago}</span>
                          </h4>
                          <h4 class="small font-weight-bold text-warning">
                            Estão pendentes:
                            <span class="float-right">${naopago}</span>
                          </h4>`
}
async function receitasInfo(mes) {

  const valor_receita = document.getElementById('valor-despesa')
  valor_receita.innerHTML = "R$" + despesas_data[mes]

  const response = await fetch(`${url}receitas/`)
  const receitas = await response.json()

  let maiores_receitas = [0, 0, 0, 0]

  receitas.map((receita) => {
    if (receita.id_pelada == id_pelada && receita.tipo == 'despesa' && parseInt(receita.mes) == (mes + 1)) {
      for (i = 0; i < 4; i++) {
        if (receita.valor > maiores_receitas[i]) {
          maiores_receitas[i] = {
            'nome_receita': receita.nome,
            'valor_receita': receita.valor
          }
          i = 5
        }
      }
    }
  })

  const maiores_despesas = document.getElementById('principais-despesas')

  let cont_vazio = 0

  for (i = 0; i < 4; i++) {
    if (maiores_receitas[i] == 0) {
      cont_vazio++
    } else {
      maiores_despesas.innerHTML += `<h4 class="small font-weight-bold text-danger">
                                        ${maiores_receitas[i].nome_receita}                                      
                                        <span class="float-right">R$${maiores_receitas[i].valor_receita} </span>
                                      </h4>`
    }
  }

  if (cont_vazio == 4) {
    maiores_despesas.innerHTML = `<h4 class="small font-weight-bold text-danger">
                                    - Não houveram despesas
                                  </h4>`
  }
}
function dadosEspecificos(mes) {

  //CARD LUCRO

  const lucro = document.getElementById('lucro')
  const comparar = document.getElementById('faturamento-despesas')

  let cor = 'success'
  if (faturamento_mes[mes] <= 0) {
    cor = 'danger'
  }
  lucro.innerHTML = 'R$' + faturamento_mes[mes]
  lucro.classList.remove('text-gray-800')
  lucro.classList.add('text-' + cor)

  let somas = receitas_data[mes] + despesas_data[mes]
  let perc_receitas = ((receitas_data[mes] / somas) * 100).toFixed(2)
  let perc_despesas = 100 - perc_receitas

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

  //CARD RECEITAS POSITIVAS

  const valor_receitas = document.getElementById('so-receitas')
  total_receitas = receitas_data[mes]
  valor_receitas.innerHTML = total_receitas

  let valor_jogadores = total_receitas - receitas_separadas[mes]

  let porc_jogadores = ((valor_jogadores / total_receitas) * 100).toFixed(2)
  let porc_receitas = 100 - porc_jogadores

  const origem = document.getElementById('origem-receitas')
  origem.innerHTML = `<h4 class="small font-weight-bold text-success">
                        Jogadores
                        <span class="float-right">R$${valor_jogadores}</span>
                      </h4>
                      <div class="progress mb-4">
                      <div class="progress-bar bg-success" role="progressbar" style="width: ${porc_jogadores}%"
                        aria-valuenow="80" aria-valuemin="0" aria-valuemax="100"></div>
                      </div>
                      <h4 class="small font-weight-bold text-success">
                        Receitas extras                                           
                        <span class="float-right">R$${receitas_separadas[mes]}</span>
                      </h4>
                      <div class="progress">
                      <div class="progress-bar bg-success" role="progressbar" style="width: ${porc_receitas}%"
                        aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
                      </div>`

  //CARD DESPESAS
  receitasInfo(mes)

  // CARD % DE PAGAMENTO
  porcPagamento(mes)

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
async function estatisticaMes(mes) {
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

  receitas_separadas = [somajan, somafev, somamar, somaabr, somamai,
    somajun, somajul, somaago, somaset, somaout,
    somanov, somadez]

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

  if (mes != 'inicio') {
    dadosEspecificos(mes)
  } else {
    grafico1()
    grafico2()
  }
}
async function getAllJogadores() { //async - vou usar await para esperar as requisições

  //pegando o mês da pelada 
  const mes_selecionado = document.getElementById('mestext')

  let mes = 'inicio';
  if (mes_selecionado != null) {
    switch (mes_selecionado.innerHTML) {
      case "JANEIRO":
        mes = 0
        break;
      case "FEVEREIRO":
        mes = 1
        break;
      case "MARÇO":
        mes = 2
        break;
      case "ABRIL":
        mes = 3
        break;
      case "MAIO":
        mes = 4
        break;
      case "JUNHO":
        mes = 5
        break;
      case "JULHO":
        mes = 6
        break;
      case "AGOSTO":
        mes = 7
        break;
      case "SETEMBRO":
        mes = 8
        break;
      case "OUTUBRO":
        mes = 9
        break;
      case "NOVEMBRO":
        mes = 10
        break;
      case "DEZEMBRO":
        mes = 11
        break;
    }
  }
  console.log(mes)

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

  estatisticaMes(mes)
}
getAllJogadores()