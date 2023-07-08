const url = "https://api-paylada-b70863bb5798.herokuapp.com/paylada/"

//carregamento
const loading = document.querySelector("#loading")
const conteudo = document.querySelector("#conteudo")

//lista de jogadores
const pagmes = document.querySelector("#pagmesespecifico");
const lista_jogadores = []
//id da pelada no localStorage
const id_pelada = localStorage.getItem('id_pelada')
//ano da análise
const ano_selecionado = document.querySelector('#anofinanceiro')
//pagina do jogador
const jogpay = document.querySelector("#jogadorpay");

//pegando id da url
const urlsearchParams = new URLSearchParams(window.location.search) //me entrega um objeto que eu posso acessar os parametros na url
const jogadorId = urlsearchParams.get("id")

//div dos cards de receita extra e despesas
const cardsreceitas = document.querySelector('#cardreceita')
const cardsdespesas = document.querySelector('#carddespesa')

let pagina_mes =  ''
async function getPagMes(mes) { //async - vou usar await para esperar as requisições
    const response = await fetch(url + 'jog/')
    const jogadores = await response.json()

    loading.classList.add("hide")
    conteudo.classList.remove("hide")

    await jogadores.map((jogador) => {
        if (jogador.id_pelada == id_pelada) {
            getPagJog(jogador.id, ano_selecionado.value, mes)
            lista_jogadores.push(jogador)
        }
    })
}
async function getPagJog(id, ano, mes) {
    const responseJog = await fetch(`${url}jog/${id}`)
    const jogador = await responseJog.json()

    const responsePag = await fetch(`${url}pag/`)
    const pagamentos = await responsePag.json()

    const responsePelada = await fetch(`${url}pelada/`)
    const peladas = await responsePelada.json()

    const detalhar = `<a href="./jogador.html?id=${id}" class="btn btn-outline-success">
                        <i class="fa-solid fa-magnifying-glass fa-2xs"></i>
                     </a>`
    var somapags = 0;
    peladas.map((pelada) => {
        if (pelada.id == jogador.id_pelada) {
            valormensal = Number(pelada.valorpagamento)
        }
    })
    let pagmes;
    pagamentos.map((pagamento) => {
        if (pagamento.id_jogador == id && pagamento.anoatual == ano) {
            switch (mes) {
                case 0:
                    if (pagamento.pagjan == 'pago') {
                        pagmes = `<i class="fa-solid fa-circle-check" style="color: #03ad00;"></i></td>`
                    } else if (pagamento.pagjan == 'pendente') {
                        pagmes = `<i class="fa=s fa-dollar-sign fa-1,5x text-gray-300"></i>`
                    } else if (pagamento.pagjan == 'isento') {
                        pagmes = `<i class="fa-solid fa-circle-minus"></i>`
                    } else {
                        pagmes = `<i class="fa-solid fa-dollar-sign" style="color: #b40404;"></i>`
                    }
                    break;
                case 1:
                    if (pagamento.pagfev == 'pago') {
                        pagmes = `<i class="fa-solid fa-circle-check" style="color: #03ad00;"></i></td>`
                    } else if (pagamento.pagfev == 'pendente') {
                        pagmes = `<i class="fa=s fa-dollar-sign fa-1,5x text-gray-300"></i>`
                    } else if (pagamento.pagfev == 'isento') {
                        pagmes = `<i class="fa-solid fa-circle-minus"></i>`
                    } else {
                        pagmes = `<i class="fa-solid fa-dollar-sign" style="color: #b40404;"></i>`
                    }
                    break;
                case 2:
                    if (pagamento.pagmar == 'pago') {
                        pagmes = `<i class="fa-solid fa-circle-check" style="color: #03ad00;"></i></td>`
                    } else if (pagamento.pagmar == 'pendente') {
                        pagmes = `<i class="fa=s fa-dollar-sign fa-1,5x text-gray-300"></i>`
                    } else if (pagamento.pagmar == 'isento') {
                        pagmes = `<i class="fa-solid fa-circle-minus"></i>`
                    } else {
                        pagmes = `<i class="fa-solid fa-dollar-sign" style="color: #b40404;"></i>`
                    }
                    break;
                case 3:
                    if (pagamento.pagabr == 'pago') {
                        pagmes = `<i class="fa-solid fa-circle-check" style="color: #03ad00;"></i></td>`
                    } else if (pagamento.pagabr == 'pendente') {
                        pagmes = `<i class="fa=s fa-dollar-sign fa-1,5x text-gray-300"></i>`
                    } else if (pagamento.pagabr == 'isento') {
                        pagmes = `<i class="fa-solid fa-circle-minus"></i>`
                    } else {
                        pagmes = `<i class="fa-solid fa-dollar-sign" style="color: #b40404;"></i>`
                    }
                    break;
                case 4:
                    if (pagamento.pagmai == 'pago') {
                        pagmes = `<i class="fa-solid fa-circle-check" style="color: #03ad00;"></i></td>`
                    } else if (pagamento.pagmai == 'pendente') {
                        pagmes = `<i class="fa=s fa-dollar-sign fa-1,5x text-gray-300"></i>`
                    } else if (pagamento.pagmai == 'isento') {
                        pagmes = `<i class="fa-solid fa-circle-minus"></i>`
                    } else {
                        pagmes = `<i class="fa-solid fa-dollar-sign" style="color: #b40404;"></i>`
                    }
                    break;
                case 5:
                    if (pagamento.pagjun == 'pago') {
                        pagmes = `<i class="fa-solid fa-circle-check" style="color: #03ad00;"></i></td>`
                    } else if (pagamento.pagjun == 'pendente') {
                        pagmes = `<i class="fa=s fa-dollar-sign fa-1,5x text-gray-300"></i>`
                    } else if (pagamento.pagjun == 'isento') {
                        pagmes = `<i class="fa-solid fa-circle-minus"></i>`
                    } else {
                        pagmes = `<i class="fa-solid fa-dollar-sign" style="color: #b40404;"></i>`
                    }
                    break;
                case 6:
                    if (pagamento.pagjul == 'pago') {
                        pagmes = `<i class="fa-solid fa-circle-check" style="color: #03ad00;"></i></td>`
                    } else if (pagamento.pagjul == 'pendente') {
                        pagmes = `<i class="fa=s fa-dollar-sign fa-1,5x text-gray-300"></i>`
                    } else if (pagamento.pagjul == 'isento') {
                        pagmes = `<i class="fa-solid fa-circle-minus"></i>`
                    } else {
                        pagmes = `<i class="fa-solid fa-dollar-sign" style="color: #b40404;"></i>`
                    }
                    break;
                case 7:
                    if (pagamento.pagago == 'pago') {
                        pagmes = `<i class="fa-solid fa-circle-check" style="color: #03ad00;"></i></td>`
                    } else if (pagamento.pagago == 'pendente') {
                        pagmes = `<i class="fa=s fa-dollar-sign fa-1,5x text-gray-300"></i>`
                    } else if (pagamento.pagago == 'isento') {
                        pagmes = `<i class="fa-solid fa-circle-minus"></i>`
                    } else {
                        pagmes = `<i class="fa-solid fa-dollar-sign" style="color: #b40404;"></i>`
                    }
                    break;
                case 8:
                    if (pagamento.pagset == 'pago') {
                        pagmes = `<i class="fa-solid fa-circle-check" style="color: #03ad00;"></i></td>`
                    } else if (pagamento.pagset == 'pendente') {
                        pagmes = `<i class="fa=s fa-dollar-sign fa-1,5x text-gray-300"></i>`
                    } else if (pagamento.pagset == 'isento') {
                        pagmes = `<i class="fa-solid fa-circle-minus"></i>`
                    } else {
                        pagmes = `<i class="fa-solid fa-dollar-sign" style="color: #b40404;"></i>`
                    }
                    break;
                case 9:
                    if (pagamento.pagout == 'pago') {
                        pagmes = `<i class="fa-solid fa-circle-check" style="color: #03ad00;"></i></td>`
                    } else if (pagamento.pagout == 'pendente') {
                        pagmes = `<i class="fa=s fa-dollar-sign fa-1,5x text-gray-300"></i>`
                    } else if (pagamento.pagout == 'isento') {
                        pagmes = `<i class="fa-solid fa-circle-minus"></i>`
                    } else {
                        pagmes = `<i class="fa-solid fa-dollar-sign" style="color: #b40404;"></i>`
                    }
                    break;
                case 10:
                    if (pagamento.pagnov == 'pago') {
                        pagmes = `<i class="fa-solid fa-circle-check" style="color: #03ad00;"></i></td>`
                    } else if (pagamento.pagnov == 'pendente') {
                        pagmes = `<i class="fa=s fa-dollar-sign fa-1,5x text-gray-300"></i>`
                    } else if (pagamento.pagnov == 'isento') {
                        pagmes = `<i class="fa-solid fa-circle-minus"></i>`
                    } else {
                        pagmes = `<i class="fa-solid fa-dollar-sign" style="color: #b40404;"></i>`
                    }
                    break;
                case 11:
                    if (pagamento.pagdez == 'pago') {
                        pagmes = `<i class="fa-solid fa-circle-check" style="color: #03ad00;"></i></td>`
                    } else if (pagamento.pagdez == 'pendente') {
                        pagmes = `<i class="fa=s fa-dollar-sign fa-1,5x text-gray-300"></i>`
                    } else if (pagamento.pagdez == 'isento') {
                        pagmes = `<i class="fa-solid fa-circle-minus"></i>`
                    } else {
                        pagmes = `<i class="fa-solid fa-dollar-sign" style="color: #b40404;"></i>`
                    }
                    break;
            }

            $(document).ready(function () {
                var t = $('#pagmesespecifico').DataTable();

                t.row.add([detalhar, jogador.nome, jogador.numero, jogador.time, jogador.datadeingresso, pagmes, pagamento.pagfev, pagamento.status, "R$" + somapags]).draw(false);
            });
        }

    })
}
function addFinancaMes(tipo) {
    let nome, dia, valor, alerta_erro

    if (tipo == 'despesa') {

        nome = document.querySelector("#addnomed").value;
        dia = document.querySelector('#datadespesa').value;
        valor = document.querySelector('#addvalord').value;

        alerta_erro = document.querySelector('#erro-despesa');

    } else {

        nome = document.querySelector("#addnome").value;
        dia = document.querySelector('#datareceita').value;
        valor = document.querySelector('#addvalor').value;

        alerta_erro = document.querySelector('#erro-receita');
    }

    var data = new Date();

    let validar = 'ok';

    if (nome == '') {
        validar = 'Insira um titulo';
    } else if (valor == '') {
        validar = 'Insira um valor'
    } else if (dia == '') {
        var diaatual = data.getDate();
        dia = "0" + String(diaatual);
    }

    if (validar == 'ok') {

        let roudnovo = {
            "id_pelada": id_pelada,
            "nome": nome,
            "tipo": tipo,
            "dia": dia,
            "mes": pagina_mes+1,
            "ano": '2023',
            "valor": valor
        };

        roudnovo = JSON.stringify(roudnovo);
        addRecOuDesp(roudnovo);
    } else {
        alerta_erro.innerHTML = `<div class="alert alert-danger" role="alert">
                                    ${validar}
                                 </div>`
    }
}
async function addRecOuDesp(roudnovo) {
    const response = await fetch(url + 'receitas/',
        {
            method: "POST",
            body: roudnovo,
            headers: {
                "Content-type": "application/json",
            },
        });

    const receita_adicionada = await response.json();
    if (receita_adicionada.tipo == 'despesa') {
        cardsdespesas.innerHTML = addHtmlRouC(receita_adicionada.id, receita_adicionada.nome, receita_adicionada.dia, receita_adicionada.mes, receita_adicionada.ano, receita_adicionada.valor, receita_adicionada.tipo) + cardsdespesas.innerHTML
    } else {
        cardsreceitas.innerHTML = addHtmlRouC(receita_adicionada.id, receita_adicionada.nome, receita_adicionada.dia, receita_adicionada.mes, receita_adicionada.ano, receita_adicionada.valor, receita_adicionada.tipo) + cardsreceitas.innerHTML
    }

}
async function percorreRecouDesp(mes) {
    const response = await fetch(url + 'receitas/')
    const receitas = await response.json()

    await receitas.map((receita) => {
        if (receita.id_pelada == id_pelada && receita.tipo == 'despesa' && parseInt(receita.mes) == (mes+1) ) {
            if (receita.tipo == 'despesa') {
                cardsdespesas.innerHTML = addHtmlRouC(receita.id, receita.nome, receita.dia, receita.mes, receita.ano, receita.valor, receita.tipo) + cardsdespesas.innerHTML
            } else {
                cardsreceitas.innerHTML = addHtmlRouC(receita.id, receita.nome, receita.dia, receita.mes, receita.ano, receita.valor, receita.tipo) + cardsreceitas.innerHTML
            }

        }
    })
}
async function deletarRouC(id) {
    const excluir_div = document.getElementById(id)
    excluir_div.innerHTML = ''

    const response = await fetch(url + 'receitas/' + id + '/',
        {
            method: "DELETE",
        });
}
function addHtmlRouC(id, nome, dia, mes, ano, valor, tipo) {
    if (tipo == 'despesa') {
        return `
            <div class="card shadow mb-4" id="${id}">
                <div class="card-header cent">
                    <h6 class="m-0 font-weight-bold text-danger">${nome}</h6>
                    <button type="button" class="btn btn-danger" onclick="deletarRouC(${id})">X</button>
                </div>
                <div class="card-body">
                    <div id="card-info">
                        <strong><p>Data</p></strong>
                        <strong><p>Valor</p></strong>
                    </div>
                    <div id="card-info">
                        <p>${dia}/${mes}/${ano}</p>
                        <p>R$${valor}</p>
                    </div>
                </div>
            </div>`
    } else {
        return `
            <div class="card shadow mb-4" id="${id}">
                <div class="card-header cent">
                    <h6 class="m-0 font-weight-bold text-success">${nome}</h6>
                    <button type="button" class="btn btn-danger" onclick="deletarRouC(${id})">X</button>
                </div>
                <div class="card-body">
                    <div id="card-info">
                        <strong><p>Data</p></strong>
                        <strong><p>Valor</p></strong>
                    </div>
                    <div id="card-info">
                        <p>${dia}/${mes}/${ano}</p>
                        <p>R$${valor}</p>
                    </div>
                </div>
            </div>`
    }
}
window.onload = function () {
    //pegando o mês da pelada 
    const mes_selecionado = document.getElementById('mestext')

    let mes;
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

    pagina_mes = mes

    getPagMes(mes)
    percorreRecouDesp(mes)
}