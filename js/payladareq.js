const url = "https://api-paylada-b70863bb5798.herokuapp.com/paylada/"

//carregamento
const loading = document.querySelector("#loading")
const conteudo = document.querySelector("#conteudo")

//id da pelada no localStorage
const id_pelada = localStorage.getItem('id_pelada')
let pel_sel = ''
//ano da análise
const ano_selecionado = document.querySelector('#anofinanceiro')
//lista de jogadores
const lista = document.querySelector("#geralpagamentos");
const lista_jogadores = []
//usuário dono da pelada
let user = ''
//pagina do jogador - pagamento
const jogpay = document.querySelector("#jogadorpay");

//pegando id da url
const urlsearchParams = new URLSearchParams(window.location.search) //me entrega um objeto que eu posso acessar os parametros na url
const jogadorId = urlsearchParams.get("id")

//modais
const modalAddJogador = document.querySelector("#addjogador")
//ações do modal
const adicionado = document.querySelector('#sucesso')
const loadAdicionar = document.querySelector('#jog-footer')
//itens do forms
const formadd = document.querySelector("#novojogador")
const nome = document.querySelector("#addnome")
const time = document.querySelector("#timeselect")
const numero = document.querySelector("#numero")
const ingresso = document.querySelector("#ingresso")

//modal de mudar pelada
const nome_modal = document.querySelector('#modnomepelada')
const time_a = document.querySelector('#modtimesa')
const time_b = document.querySelector('#modtimesb')
const payday = document.querySelector('#paydayv')
const valormensal = document.querySelector('#valormensal')

//cards iniciais
const totaljog = document.querySelector("#totalatletas")
let contjog = 0
function totaisCards() {
    totaljog.innerHTML = contjog
}

//Pegando todos os jogadores
async function getAllJogadores() { //async - vou usar await para esperar as requisições

    //pegando a pelada e guardando numa variavel
    const responsePelada = await fetch(`${url}pelada/${id_pelada}`)
    pel_sel = await responsePelada.json()

    //pegando o usuário responsavél pela pelada
    const user_response = await fetch(url + 'user/' + pel_sel.id_usuario);
    user = await user_response.json();

    const response = await fetch(url + 'jog/')
    const jogadores = await response.json()

    await jogadores.map((jogador) => {
        if (jogador.id_pelada == id_pelada) {
            contjog++ //número de jogadores
            getPagJog(jogador.id, ano_selecionado.value)
            lista_jogadores.push(jogador)
        }
    })

    totaisCards()
    analiseRecorrente()
    personalizando()

    loading.classList.add("hide")
    conteudo.classList.remove("hide")
}
//Toda vez que abre vê a situação do peladeiro
async function analiseRecorrente() {
    const responsePag = await fetch(`${url}pag/`)
    const pagamentos = await responsePag.json()

    //somando todos os pagamentos de todos os meses dos jogadores
    // --> criando variaveis pra preencher pelos valores antes da analise
    let modjan, modfev, modmar, modabr, modmai, modjun, modjul, modago, modset, modout, modnov, moddez, modstaus
    lista_jogadores.forEach(function (jogador) {
        pagamentos.map((pagamento) => {
            if (jogador.id == pagamento.id_jogador) {
                //preenchendo pelos valores antes da analise
                modjan = pagamento.pagjan
                modfev = pagamento.pagfev
                modmar = pagamento.pagmar
                modabr = pagamento.pagabr
                modmai = pagamento.pagmai
                modjun = pagamento.pagjun
                modjul = pagamento.pagjul
                modago = pagamento.pagago
                modset = pagamento.pagset
                modout = pagamento.pagout
                modnov = pagamento.pagnov
                moddez = pagamento.pagdez
                modstatus = pagamento.status
                //lista pra percorrer
                pagsjog = [pagamento.pagjan, pagamento.pagfev, pagamento.pagmar, pagamento.pagabr,
                pagamento.pagmai, pagamento.pagjun, pagamento.pagjul, pagamento.pagago,
                pagamento.pagset, pagamento.pagout, pagamento.pagnov, pagamento.pagdez]

                let mes = 0
                pagsjog.forEach(function (pag) {
                    mes++
                    if (pag == "pendente") {
                        var data = new Date();
                        var diaatual = data.getDate()
                        var mesatual = data.getMonth() + 1
                        var anoatual = data.getFullYear()

                        if (anoatual > ano_selecionado.value) {
                            if (mes == 1) {
                                modjan = 'alerta'
                            } else if (mes == 2) {
                                modfev = 'alerta'
                            } else if (mes == 3) {
                                modmar = 'alerta'
                            } else if (mes == 4) {
                                modabr = 'alerta'
                            } else if (mes == 5) {
                                modmai = 'alerta'
                            } else if (mes == 6) {
                                modjun = 'alerta'
                            } else if (mes == 7) {
                                modjul = 'alerta'
                            } else if (mes == 8) {
                                modago = 'alerta'
                            } else if (mes == 9) {
                                modset = 'alerta'
                            } else if (mes == 10) {
                                modout = 'alerta'
                            } else if (mes == 11) {
                                modnov = 'alerta'
                            } else if (mes == 12) {
                                moddez = 'alerta'
                            }
                            modstatus = 'inapto'
                            atualizarsit = {
                                "id_jogador": jogador.id,
                                "anoatual": pagamento.anoatual,
                                "pagjan": modjan,
                                "valor_pagjan": pagamento.valor_pagjan,
                                "data_pagjan": pagamento.data_pagjan,
                                "pagfev": modfev,
                                "valor_pagfev": pagamento.valor_pagfev,
                                "data_pagfev": pagamento.data_pagfev,
                                "pagmar": modmar,
                                "valor_pagmar": pagamento.valor_pagmar,
                                "data_pagmar": pagamento.data_pagmar,
                                "pagabr": modabr,
                                "valor_pagabr": pagamento.valor_pagabr,
                                "data_pagabr": pagamento.data_pagabr,
                                "pagmai": modmai,
                                "valor_pagmai": pagamento.valor_pagmai,
                                "data_pagmai": pagamento.data_pagmai,
                                "pagjun": modjun,
                                "valor_pagjun": pagamento.valor_pagjun,
                                "data_pagjun": pagamento.data_pagjan,
                                "pagjul": modjul,
                                "valor_pagjul": pagamento.valor_pagjul,
                                "data_pagjul": pagamento.data_pagjul,
                                "pagago": modago,
                                "valor_pagago": pagamento.valor_pagago,
                                "data_pagago": pagamento.data_pagago,
                                "pagset": modset,
                                "valor_pagset": pagamento.valor_pagset,
                                "data_pagset": pagamento.data_pagset,
                                "pagout": modout,
                                "valor_pagout": pagamento.valor_pagout,
                                "data_pagout": pagamento.data_pagout,
                                "pagnov": modnov,
                                "valor_pagnov": pagamento.valor_pagnov,
                                "data_pagnov": pagamento.data_pagnov,
                                "pagdez": moddez,
                                "valor_pagdez": pagamento.valor_pagdez,
                                "data_pagdez": pagamento.data_pagdez,
                                "totalpag": pagamento.totalpag,
                                "status": modstatus
                            };
                            novopagamento = JSON.stringify(atualizarsit);
                            console.log(novopagamento)
                            confirmandoPagamento(novopagamento, pagamento.id)

                        } else if (mesatual > mes) {
                            if (mes == 1) {
                                modjan = 'alerta'
                            } else if (mes == 2) {
                                modfev = 'alerta'
                            } else if (mes == 3) {
                                modmar = 'alerta'
                            } else if (mes == 4) {
                                modabr = 'alerta'
                            } else if (mes == 5) {
                                modmai = 'alerta'
                            } else if (mes == 6) {
                                modjun = 'alerta'
                            } else if (mes == 7) {
                                modjul = 'alerta'
                            } else if (mes == 8) {
                                modago = 'alerta'
                            } else if (mes == 9) {
                                modset = 'alerta'
                            } else if (mes == 10) {
                                modout = 'alerta'
                            } else if (mes == 11) {
                                modnov = 'alerta'
                            } else if (mes == 12) {
                                moddez = 'alerta'
                            }
                            modstatus = 'inapto'
                            atualizarsit = {
                                "id_jogador": jogador.id,
                                "anoatual": pagamento.anoatual,
                                "pagjan": modjan,
                                "valor_pagjan": pagamento.valor_pagjan,
                                "data_pagjan": pagamento.data_pagjan,
                                "pagfev": modfev,
                                "valor_pagfev": pagamento.valor_pagfev,
                                "data_pagfev": pagamento.data_pagfev,
                                "pagmar": modmar,
                                "valor_pagmar": pagamento.valor_pagmar,
                                "data_pagmar": pagamento.data_pagmar,
                                "pagabr": modabr,
                                "valor_pagabr": pagamento.valor_pagabr,
                                "data_pagabr": pagamento.data_pagabr,
                                "pagmai": modmai,
                                "valor_pagmai": pagamento.valor_pagmai,
                                "data_pagmai": pagamento.data_pagmai,
                                "pagjun": modjun,
                                "valor_pagjun": pagamento.valor_pagjun,
                                "data_pagjun": pagamento.data_pagjan,
                                "pagjul": modjul,
                                "valor_pagjul": pagamento.valor_pagjul,
                                "data_pagjul": pagamento.data_pagjul,
                                "pagago": modago,
                                "valor_pagago": pagamento.valor_pagago,
                                "data_pagago": pagamento.data_pagago,
                                "pagset": modset,
                                "valor_pagset": pagamento.valor_pagset,
                                "data_pagset": pagamento.data_pagset,
                                "pagout": modout,
                                "valor_pagout": pagamento.valor_pagout,
                                "data_pagout": pagamento.data_pagout,
                                "pagnov": modnov,
                                "valor_pagnov": pagamento.valor_pagnov,
                                "data_pagnov": pagamento.data_pagnov,
                                "pagdez": moddez,
                                "valor_pagdez": pagamento.valor_pagdez,
                                "data_pagdez": pagamento.data_pagdez,
                                "totalpag": pagamento.totalpag,
                                "status": modstatus
                            };
                            novopagamento = JSON.stringify(atualizarsit);
                            console.log(novopagamento)
                            confirmandoPagamento(novopagamento, pagamento.id)
                        } else if (mesatual == mes) {
                            if (diaatual > pel_sel.diamaxpagamento) {
                                if (mes == 1) {
                                    modjan = 'alerta'
                                } else if (mes == 2) {
                                    modfev = 'alerta'
                                } else if (mes == 3) {
                                    modmar = 'alerta'
                                } else if (mes == 4) {
                                    modabr = 'alerta'
                                } else if (mes == 5) {
                                    modmai = 'alerta'
                                } else if (mes == 6) {
                                    modjun = 'alerta'
                                } else if (mes == 7) {
                                    modjul = 'alerta'
                                } else if (mes == 8) {
                                    modago = 'alerta'
                                } else if (mes == 9) {
                                    modset = 'alerta'
                                } else if (mes == 10) {
                                    modout = 'alerta'
                                } else if (mes == 11) {
                                    modnov = 'alerta'
                                } else if (mes == 12) {
                                    moddez = 'alerta'
                                }
                                modstatus = 'inapto'
                                atualizarsit = {
                                    "id_jogador": jogador.id,
                                    "anoatual": pagamento.anoatual,
                                    "pagjan": modjan,
                                    "valor_pagjan": pagamento.valor_pagjan,
                                    "data_pagjan": pagamento.data_pagjan,
                                    "pagfev": modfev,
                                    "valor_pagfev": pagamento.valor_pagfev,
                                    "data_pagfev": pagamento.data_pagfev,
                                    "pagmar": modmar,
                                    "valor_pagmar": pagamento.valor_pagmar,
                                    "data_pagmar": pagamento.data_pagmar,
                                    "pagabr": modabr,
                                    "valor_pagabr": pagamento.valor_pagabr,
                                    "data_pagabr": pagamento.data_pagabr,
                                    "pagmai": modmai,
                                    "valor_pagmai": pagamento.valor_pagmai,
                                    "data_pagmai": pagamento.data_pagmai,
                                    "pagjun": modjun,
                                    "valor_pagjun": pagamento.valor_pagjun,
                                    "data_pagjun": pagamento.data_pagjan,
                                    "pagjul": modjul,
                                    "valor_pagjul": pagamento.valor_pagjul,
                                    "data_pagjul": pagamento.data_pagjul,
                                    "pagago": modago,
                                    "valor_pagago": pagamento.valor_pagago,
                                    "data_pagago": pagamento.data_pagago,
                                    "pagset": modset,
                                    "valor_pagset": pagamento.valor_pagset,
                                    "data_pagset": pagamento.data_pagset,
                                    "pagout": modout,
                                    "valor_pagout": pagamento.valor_pagout,
                                    "data_pagout": pagamento.data_pagout,
                                    "pagnov": modnov,
                                    "valor_pagnov": pagamento.valor_pagnov,
                                    "data_pagnov": pagamento.data_pagnov,
                                    "pagdez": moddez,
                                    "valor_pagdez": pagamento.valor_pagdez,
                                    "data_pagdez": pagamento.data_pagdez,
                                    "totalpag": pagamento.totalpag,
                                    "status": modstatus
                                };
                                novopagamento = JSON.stringify(atualizarsit);
                                console.log(novopagamento)
                                confirmandoPagamento(novopagamento, pagamento.id)
                            }
                        }
                    }
                })
            }
        })
    })
}
async function confirmandoPagamento(novopagamento, id) {
    const response = await fetch(url + 'pag/' + id + '/',
        {
            method: "PUT",
            body: novopagamento,
            headers: {
                "Content-type": "application/json",
            },
        });
}
//Pegando jogador especifico
async function getJogador(id) {
    const responseJog = await fetch(`${url}jog/${id}`)
    const responsePag = await fetch(`${url}pag/`)

    const jogador = await responseJog.json()
    const pagamentos = await responsePag.json()

    const header_pagamentos = document.getElementById('pagamentos')
    const nome = document.querySelector("#nomejog")
    const time = document.querySelector("#time")
    const numero = document.querySelector("#numero")
    const ingresso = document.querySelector("#ingresso")

    const status = document.querySelector("#status")
    pagamentos.map((pagamento) => {
        if (pagamento.id_jogador == jogador.id) {
            status.innerHTML = "O peladeiro está " + pagamento.status + " a jogar"
        }
    })
    header_pagamentos.innerHTML = "Pagamentos de " + jogador.nome
    nome.innerHTML = jogador.nome
    time.innerHTML = jogador.time
    numero.innerHTML = jogador.numero
    ingresso.innerHTML = jogador.datadeingresso

    loading.classList.add("hide")
    conteudo.classList.remove("hide")
}

//relacionando jogador com pagamento
async function getPagJog(id, ano) {

    const responseJog = await fetch(`${url}jog/${id}`)
    const jog = await responseJog.json()

    const responsePag = await fetch(`${url}pag/`)
    const pagamentos = await responsePag.json()

    const detalhar = `<a href="./jogador.html?id=${id}" class="btn btn-outline-success">
                        <i class="fa-solid fa-magnifying-glass fa-2xs"></i>
                    </a>`
    let status;
    var somapags;
    let pagjan, pagfev, pagmar, pagabr, pagmai, pagjun, pagjul, pagago, pagset, pagout, pagnov, pagdez
    pagamentos.map((pagamento) => {
        if (pagamento.id_jogador == id && pagamento.anoatual == ano) {
            status = pagamento.status
            somapags = pagamento.totalpag
            var pags = [pagamento.pagjan, pagamento.pagfev, pagamento.pagmar, pagamento.pagabr,
            pagamento.pagmai, pagamento.pagjun, pagamento.pagjul, pagamento.pagago,
            pagamento.pagset, pagamento.pagout, pagamento.pagnov, pagamento.pagdez]
            let mes = 0;
            pags.forEach(function (statuspag) {
                mes++
                if (statuspag == 'pago') {
                    if (mes == 1) {
                        pagjan = `<i class="fa-solid fa-circle-check" style="color: #03ad00;" id="jan"></i></td>`
                    } else if (mes == 2) {
                        pagfev = `<i class="fa-solid fa-circle-check" style="color: #03ad00;" id="fev"></i></td>`
                    } else if (mes == 3) {
                        pagmar = `<i class="fa-solid fa-circle-check" style="color: #03ad00;" id="mar"></i></td>`
                    } else if (mes == 4) {
                        pagabr = `<i class="fa-solid fa-circle-check" style="color: #03ad00;" id="abr"></i></td>`
                    } else if (mes == 5) {
                        pagmai = `<i class="fa-solid fa-circle-check" style="color: #03ad00;" id="mai"></i></td>`
                    } else if (mes == 6) {
                        pagjun = `<i class="fa-solid fa-circle-check" style="color: #03ad00;" id="jun"></i></td>`
                    } else if (mes == 7) {
                        pagjul = `<i class="fa-solid fa-circle-check" style="color: #03ad00;" id="jul"></i></td>`
                    } else if (mes == 8) {
                        pagago = `<i class="fa-solid fa-circle-check" style="color: #03ad00;" id="ago"></i></td>`
                    } else if (mes == 9) {
                        pagset = `<i class="fa-solid fa-circle-check" style="color: #03ad00;" id="set"></i></td>`
                    } else if (mes == 10) {
                        pagout = `<i class="fa-solid fa-circle-check" style="color: #03ad00;" id="out"></i></td>`
                    } else if (mes == 11) {
                        pagnov = `<i class="fa-solid fa-circle-check" style="color: #03ad00;" id="nov"></i></td>`
                    } else if (mes == 12) {
                        pagdez = `<i class="fa-solid fa-circle-check" style="color: #03ad00;" id="dez"></i></td>`
                    }
                } else if (statuspag == 'pendente') {
                    if (mes == 1) {
                        pagjan = `<i class="fas fa-dollar-sign fa-1,5x text-gray-300" id="jan"></i>`
                    } else if (mes == 2) {
                        pagfev = `<i class="fas fa-dollar-sign fa-1,5x text-gray-300" id="fev"></i>`
                    } else if (mes == 3) {
                        pagmar = `<i class="fas fa-dollar-sign fa-1,5x text-gray-300" id="mar"></i>`
                    } else if (mes == 4) {
                        pagabr = `<i class="fas fa-dollar-sign fa-1,5x text-gray-300" id="abr"></i>`
                    } else if (mes == 5) {
                        pagmai = `<i class="fas fa-dollar-sign fa-1,5x text-gray-300" id="mai"></i>`
                    } else if (mes == 6) {
                        pagjun = `<i class="fas fa-dollar-sign fa-1,5x text-gray-300" id="jun"></i>`
                    } else if (mes == 7) {
                        pagjul = `<i class="fas fa-dollar-sign fa-1,5x text-gray-300" id="jul"></i>`
                    } else if (mes == 8) {
                        pagago = `<i class="fas fa-dollar-sign fa-1,5x text-gray-300" id="ago"></i>`
                    } else if (mes == 9) {
                        pagset = `<i class="fas fa-dollar-sign fa-1,5x text-gray-300" id="set"></i>`
                    } else if (mes == 10) {
                        pagout = `<i class="fas fa-dollar-sign fa-1,5x text-gray-300" id="out"></i>`
                    } else if (mes == 11) {
                        pagnov = `<i class="fas fa-dollar-sign fa-1,5x text-gray-300" id="nov"></i>`
                    } else if (mes == 12) {
                        pagdez = `<i class="fas fa-dollar-sign fa-1,5x text-gray-300" id="dez"></i>`
                    }
                } else if (statuspag == 'isento') {
                    if (mes == 1) {
                        pagjan = `<i class="fa-solid fa-circle-minus" style="color: #858796;" id="jan"></i>`
                    } else if (mes == 2) {
                        pagfev = `<i class="fa-solid fa-circle-minus" style="color: #858796;" id="fev"></i>`
                    } else if (mes == 3) {
                        pagmar = `<i class="fa-solid fa-circle-minus" style="color: #858796;" id="mar"></i>`
                    } else if (mes == 4) {
                        pagabr = `<i class="fa-solid fa-circle-minus" style="color: #858796;" id="abr"></i>`
                    } else if (mes == 5) {
                        pagmai = `<i class="fa-solid fa-circle-minus" style="color: #858796;" id="mai"></i>`
                    } else if (mes == 6) {
                        pagjun = `<i class="fa-solid fa-circle-minus" style="color: #858796;" id="jun"></i>`
                    } else if (mes == 7) {
                        pagjul = `<i class="fa-solid fa-circle-minus" style="color: #858796;" id="jul"></i>`
                    } else if (mes == 8) {
                        pagago = `<i class="fa-solid fa-circle-minus" style="color: #858796;" id="ago"></i>`
                    } else if (mes == 9) {
                        pagset = `<i class="fa-solid fa-circle-minus" style="color: #858796;" id="set"></i>`
                    } else if (mes == 10) {
                        pagout = `<i class="fa-solid fa-circle-minus" style="color: #858796;" id="out"></i>`
                    } else if (mes == 11) {
                        pagnov = `<i class="fa-solid fa-circle-minus" style="color: #858796;" id="nov"></i>`
                    } else if (mes == 12) {
                        pagdez = `<i class="fa-solid fa-circle-minus" style="color: #858796;" id="dez"></i>`
                    }
                } else {
                    if (mes == 1) {
                        pagjan = `<i class="fa-solid fa-dollar-sign" style="color: #b40404;" id="jan"></i>`
                    } else if (mes == 2) {
                        pagfev = `<i class="fa-solid fa-dollar-sign" style="color: #b40404;" id="fev"></i>`
                    } else if (mes == 3) {
                        pagmar = `<i class="fa-solid fa-dollar-sign" style="color: #b40404;" id="mar"></i>`
                    } else if (mes == 4) {
                        pagabr = `<i class="fa-solid fa-dollar-sign" style="color: #b40404;" id="abr"></i>`
                    } else if (mes == 5) {
                        pagmai = `<i class="fa-solid fa-dollar-sign" style="color: #b40404;" id="mai"></i>`
                    } else if (mes == 6) {
                        pagjun = `<i class="fa-solid fa-dollar-sign" style="color: #b40404;" id="jun"></i>`
                    } else if (mes == 7) {
                        pagjul = `<i class="fa-solid fa-dollar-sign" style="color: #b40404;" id="jul"></i>`
                    } else if (mes == 8) {
                        pagago = `<i class="fa-solid fa-dollar-sign" style="color: #b40404;" id="ago"></i>`
                    } else if (mes == 9) {
                        pagset = `<i class="fa-solid fa-dollar-sign" style="color: #b40404;" id="set"></i>`
                    } else if (mes == 10) {
                        pagout = `<i class="fa-solid fa-dollar-sign" style="color: #b40404;" id="out"></i>`
                    } else if (mes == 11) {
                        pagnov = `<i class="fa-solid fa-dollar-sign" style="color: #b40404;" id="nov"></i>`
                    } else if (mes == 12) {
                        pagdez = `<i class="fa-solid fa-dollar-sign" style="color: #b40404;" id="dez"></i>`
                    }
                }
            });
        }
    })

    if (!jogadorId) {
        $(document).ready(function () {
            var t = $('#tabgeral').DataTable();

            t.row.add([detalhar, jog.nome, jog.numero, jog.time, pagjan, pagfev, pagmar, pagabr, pagmai, pagjun, pagjul, pagago, pagset, pagout, pagnov, pagdez, status, "R$" + somapags]).draw(false);

        });
    } else {
        jogpay.innerHTML =
            `<tr align="center">
        <td><button onclick="editPag('janeiro')">${pagjan}</button></td>
        <td><button onclick="editPag('fevereiro')">${pagfev}</button></td>
        <td><button onclick="editPag('março')">${pagmar}</button></td>
        <td><button onclick="editPag('abril')">${pagabr}</button></td>
        <td><button onclick="editPag('maio')">${pagmai}</button></td>
        <td><button onclick="editPag('junho')">${pagjun}</button></td>
        <td><button onclick="editPag('julho')">${pagjul}</button></td>
        <td><button onclick="editPag('agosto')">${pagago}</button></td>
        <td><button onclick="editPag('setembro')">${pagset}</button></td>
        <td><button onclick="editPag('outubro')">${pagout}</button></td>
        <td><button onclick="editPag('novembro')">${pagnov}</button></td>
        <td><button onclick="editPag('dezembro')">${pagdez}</button></td>
        <td>R$${somapags}</td>
        </tr>`
    }
}

// adicionando jogador
async function addJogador(jognovo) {
    const response = await fetch(url + 'jog/',
        {
            method: "POST",
            body: jognovo,
            headers: {
                "Content-type": "application/json",
            },
        });

    contjog++
    totaisCards()

    const data = await response.json();
    await gerarListaPagamentos(data.id)
    getPagJog(data.id, 2023)

    adicionado.innerHTML = `<div class="alert alert-success" role="alert">
                                ${data.nome} foi adicionado
                            </div>`
    loadAdicionar.innerHTML = `<button type="submit" class="btn btn-outline-success"
                                id="concluir">Adicionar +</button>`
}
//criando o pagamento do peladeiro 
async function gerarListaPagamentos(id) {
    const responseJog = await fetch(`${url}jog/${id}`)
    const jogador = await responseJog.json()

    let pagmaximo = Number(pel_sel.diamaxpagamento)

    let pagjan, pagfev, pagmar, pagabr, pagmai, pagjun, pagjul, pagago, pagset, pagout, pagnov, pagdez, status

    var data = new Date();
    var anoatual = data.getFullYear()

    var datadeingresso = jogador.datadeingresso
    var diaingresso = Number(datadeingresso.substring(8, 10))
    var mesingresso = Number(datadeingresso.substring(5, 7))

    if (mesingresso == 1) {
        if (diaingresso > pagmaximo) {
            pagjan = "alerta"
            status = "inapto"

            pagfev = pagmar = pagabr = pagmai = pagjun = pagjul = pagago = pagset = pagout = pagnov = pagdez = "pendente"
        } else {
            pagjan = pagfev = pagmar = pagabr = pagmai = pagjun = pagjul = pagago = pagset = pagout = pagnov = pagdez = "pendente"
            status = "apto"
        }
    } else if (mesingresso == 2) {
        pagjan = "isento"
        if (diaingresso > pagmaximo) {
            pagfev = "alerta"
            status = "inapto"

            pagmar = pagabr = pagmai = pagjun = pagjul = pagago = pagset = pagout = pagnov = pagdez = "pendente"
        } else {
            pagfev = pagmar = pagabr = pagmai = pagjun = pagjul = pagago = pagset = pagout = pagnov = pagdez = "pendente"
            status = "apto"
        }
    } else if (mesingresso == 3) {
        pagjan = pagfev = "isento"
        if (diaingresso > pagmaximo) {
            pagmar = "alerta"
            status = "inapto"

            pagabr = pagmai = pagjun = pagjul = pagago = pagset = pagout = pagnov = pagdez = "pendente"
        } else {

            pagmar = pagabr = pagmai = pagjun = pagjul = pagago = pagset = pagout = pagnov = pagdez = "pendente"
            status = "apto"
        }
    } else if (mesingresso == 4) {
        pagjan = pagfev = pagmar = "isento"
        if (diaingresso > pagmaximo) {
            pagabr = "alerta"
            status = "inapto"

            pagmai = pagjun = pagjul = pagago = pagset = pagout = pagnov = pagdez = "pendente"
        } else {
            pagabr = pagmai = pagjun = pagjul = pagago = pagset = pagout = pagnov = pagdez = "pendente"
            status = "apto"
        }
    } else if (mesingresso == 5) {
        pagjan = pagfev = pagmar = pagabr = "isento"
        if (diaingresso > pagmaximo) {
            pagmai = "alerta"
            status = "inapto"

            pagjun = pagjul = pagago = pagset = pagout = pagnov = pagdez = "pendente"
        } else {
            pagmai = pagjun = pagjul = pagago = pagset = pagout = pagnov = pagdez = "pendente"
            status = "apto"
        }
    } else if (mesingresso == 6) {
        pagjan = pagfev = pagmar = pagabr = pagmai = "isento"
        if (diaingresso > pagmaximo) {
            pagjun = "alerta"
            status = "inapto"

            pagjul = pagago = pagset = pagout = pagnov = pagdez = "pendente"
        } else {
            pagjun = pagjul = pagago = pagset = pagout = pagnov = pagdez = "pendente"
            status = "apto"
        }
    } else if (mesingresso == 7) {
        pagjan = pagfev = pagmar = pagabr = pagmai = pagjun = "isento"
        if (diaingresso > pagmaximo) {
            pagjul = "alerta"
            status = "inapto"

            pagago = pagset = pagout = pagnov = pagdez = "pendente"
        } else {
            pagjul = pagago = pagset = pagout = pagnov = pagdez = "pendente"
            status = "apto"
        }
    } else if (mesingresso == 8) {
        pagjan = pagfev = pagmar = pagabr = pagmai = pagjun = pagjul = "isento"
        if (diaingresso > pagmaximo) {
            pagago = "alerta"
            status = "inapto"

            pagset = pagout = pagnov = pagdez = "pendente"
        } else {
            pagago = pagset = pagout = pagnov = pagdez = "pendente"
            status = "apto"
        }
    } else if (mesingresso == 9) {
        pagjan = pagfev = pagmar = pagabr = pagmai = pagjun = pagjul = pagago = "isento"
        if (diaingresso > pagmaximo) {
            pagset = "alerta"
            status = "inapto"

            pagout = pagnov = pagdez = "pendente"
        } else {
            pagset = pagout = pagnov = pagdez = "pendente"
            status = "apto"
        }
    } else if (mesingresso == 10) {
        pagjan = pagfev = pagmar = pagabr = pagmai = pagjun = pagjul = pagago = pagset = "isento"
        if (diaingresso > pagmaximo) {
            pagout = "alerta"
            status = "inapto"

            pagnov = pagdez = "pendente"
        } else {
            pagout = pagnov = pagdez = "pendente"
            status = "apto"
        }
    } else if (mesingresso == 11) {
        pagjan = pagfev = pagmar = pagabr = pagmai = pagjun = pagjul = pagago = pagset = pagout = "isento"
        if (diaingresso > pagmaximo) {
            pagnov = "alerta"
            status = "inapto"

            pagdez = "pendente"
        } else {
            pagnov = pagdez = "pendente"
            status = "apto"
        }
    } else if (mesingresso == 12) {
        pagjan = pagfev = pagmar = pagabr = pagmai = pagjun = pagjul = pagago = pagset = pagout = pagnov = "isento"
        if (diaingresso > pagmaximo) {
            pagdez = "alerta"
            status = "inapto"
        } else {
            pagdez = "pendente"
            status = "apto"
        }
    }

    let novopagamento = {
        "id_jogador": jogador.id,
        "anoatual": String(anoatual),
        "pagjan": pagjan,
        "valor_pagjan": 0,
        "data_pagjan": 'não pago',
        "pagfev": pagfev,
        "valor_pagfev": 0,
        "data_pagfev": 'não pago',
        "pagmar": pagmar,
        "valor_pagmar": 0,
        "data_pagmar": 'não pago',
        "pagabr": pagabr,
        "valor_pagabr": 0,
        "data_pagabr": 'não pago',
        "pagmai": pagmai,
        "valor_pagmai": 0,
        "data_pagmai": 'não pago',
        "pagjun": pagjun,
        "valor_pagjun": 0,
        "data_pagjun": 'não pago',
        "pagjul": pagjul,
        "valor_pagjul": 0,
        "data_pagjul": 'não pago',
        "pagago": pagago,
        "valor_pagago": 0,
        "data_pagago": 'não pago',
        "pagset": pagset,
        "valor_pagset": 0,
        "data_pagset": 'não pago',
        "pagout": pagout,
        "valor_pagout": 0,
        "data_pagout": 'não pago',
        "pagnov": pagnov,
        "valor_pagnov": 0,
        "data_pagnov": 'não pago',
        "pagdez": pagdez,
        "valor_pagdez": 0,
        "data_pagdez": 'não pago',
        "totalpag": 0,
        "status": status
    };

    novopagamento = JSON.stringify(novopagamento);

    addPagamento(novopagamento)
}
async function addPagamento(novopagamento) {
    const response = await fetch(url + 'pag/',
        {
            method: "POST",
            body: novopagamento,
            headers: {
                "Content-type": "application/json",
            },
        });

}
function mesesFoco() {
    const mesesemfoco = document.querySelector("#mf")

    //pegando a data atual
    var data = new Date();
    var mesatual = data.getMonth() + 1

    var meses
    if (mesatual == 1) {
        meses = `
            <a class="nav-link" href="./meses/jan.html">
                <i class="fa-regular fa-calendar-days"></i>
                <span>Janeiro</span>
            </a>
        `
    } else if (mesatual == 2) {
        meses = `
        
            <a class="nav-link" href="./meses/fev.html">
                <i class="fa-regular fa-calendar-days"></i>
                <span>Fevereiro</span>
            </a>
        `
    } else if (mesatual == 3) {
        meses = `
        
            <a class="nav-link" href="./meses/mar.html">
                <i class="fa-regular fa-calendar-days"></i>
                <span>Março</span>
            </a>
        `
    } else if (mesatual == 4) {
        meses = `
        
            <a class="nav-link" href="./meses/abr.html">
                <i class="fa-regular fa-calendar-days"></i>
                <span>Abril</span>
            </a>
        `
    } else if (mesatual == 5) {
        meses = `
            <a class="nav-link" href="./meses/mai.html">
                <i class="fa-regular fa-calendar-days"></i>
                <span>Maio</span>
            </a>
        `
    } else if (mesatual == 6) {
        meses = `
            <a class="nav-link" href="./meses/jun.html">
                <i class="fa-regular fa-calendar-days"></i>
                <span>Junho</span>
            </a>
        `
    } else if (mesatual == 7) {
        meses = `
        
            <a class="nav-link" href="./meses/jul.html">
                <i class="fa-regular fa-calendar-days"></i>
                <span>Julho</span>
            </a>
        `
    } else if (mesatual == 8) {
        meses = `
        
            <a class="nav-link" href="./meses/ago.html">
                <i class="fa-regular fa-calendar-days"></i>
                <span>Agosto</span>
            </a>
        `
    } else if (mesatual == 9) {
        meses = `
        
            <a class="nav-link" href="./meses/set.html">
                <i class="fa-regular fa-calendar-days"></i>
                <span>Setembro</span>
            </a>
        `
    } else if (mesatual == 10) {
        meses = `
            <a class="nav-link" href="./meses/out.html">
                <i class="fa-regular fa-calendar-days"></i>
                <span>Outubro</span>
            </a>
        `
    } else if (mesatual == 11) {
        meses = `
            <a class="nav-link"  href="./meses/nov.html">
                <i class="fa-regular fa-calendar-days"></i>
                <span>Novembro</span>
            </a>
        `
    } else if (mesatual == 12) {
        meses = `
            <a class="nav-link" href="./meses/dez.html">
                <i class="fa-regular fa-calendar-days"></i>
                <span>Dezembro</span>
            </a>
        `
    }
    return mesesemfoco.innerHTML += meses
}
async function personalizando() {

    //nome da pelada no sidebar
    const sidebar_nome = document.querySelector('#peladanome-sel');

    sidebar_nome.innerHTML = pel_sel.nomepelada;

    localStorage.setItem('nome_pelada', pel_sel.nomepelada)

    //personalizando áreas do usuário
    const pelada_user = document.getElementById('usuario-nome')

    pelada_user.innerHTML = user.nome

    localStorage.setItem('nome_usuario', user.nome)

    //modal de add jogador
    const timesel_a = document.querySelector('#opcao-a')
    const timesel_b = document.querySelector('#opcao-b')

    timesel_a.innerHTML = pel_sel.timea
    timesel_b.innerHTML = pel_sel.timeb
    timesel_a.value = pel_sel.timea
    timesel_b.value = pel_sel.timeb

    //modal de mudar pelada

    nome_modal.value = pel_sel.nomepelada
    time_a.value = pel_sel.timea
    time_b.value = pel_sel.timeb
    payday.value = pel_sel.diamaxpagamento
    valormensal.value = pel_sel.valorpagamento

    estatisticasPelada(id_pelada)

}
async function estatisticasPelada(id_pelada) {
    const responsePag = await fetch(`${url}pag/`)
    const pagamentos = await responsePag.json()

    const response = await fetch(`${url}receitas/`)
    const receitas = await response.json()

    //card de arrecadado
    const arrecadado = document.getElementById('arrecadado')

    let faturamento = 0
    let despesas = 0

    //somando todos os pagamentos de todos os meses dos jogadores
    lista_jogadores.forEach(function (jogador) {
        pagamentos.map((pagamento) => {
            if (jogador.id == pagamento.id_jogador) {
                faturamento += pagamento.totalpag
            }
        })
    })
    //pegando as despesas e receitas extras de todos os meses
    receitas.map((receita) => {
        if (receita.id_pelada == id_pelada) {
            if (receita.tipo == 'receita') {
                faturamento += parseFloat(receita.valor)
            } else {
                faturamento -= parseFloat(receita.valor)
                despesas += parseFloat(receita.valor)
            }
        }
    })

    arrecadado.innerHTML = "R$" + faturamento

    if (faturamento > 0) {
        arrecadado.style.color = "#03ad00"
    } else {
        arrecadado.style.color = "#b40404"
    }

}
async function editarDefPelada(edicao){
    const response = await fetch(url + 'pelada/'+pel_sel.id+"/",
        {
            method: "PUT",
            body: edicao,
            headers: {
                "Content-type": "application/json",
            },
        });

    const confirmacao = document.getElementById("confirmacao-mudanca")
    confirmacao.innerHTML = `<div class="alert alert-success" role="alert">
                                As alterações no pagamento foram salvas
                            </div>`

}
function editarPelada() {

    //modal de mudar pelada
    let edicao = {
        "id_usuario": user.id,
        "nomepelada": nome_modal.value,
        "timea": time_a.value,
        "timeb": time_b.value,
        "diamaxpagamento": payday.value,
        "valorpagamento": valormensal.value,
        "diacriacao": pel_sel.diacriacao,
        "mescriacao": pel_sel.mescriacao,
        "anocriacao": pel_sel.anocriacao,
    }

    edicao = JSON.stringify(edicao);
    console.log(edicao)
    editarDefPelada(edicao)

}

if (!jogadorId) {
    mesesFoco() //pega o mês atual
    getAllJogadores()
    console.log(lista_jogadores)

    // evento de mudança na escolha do ano
    ano_selecionado.addEventListener('change', function () {
        console.log(ano_selecionado.value)
    })
    // evento de add jogador
    formadd.addEventListener("submit", (e) => {
        e.preventDefault();

        loadAdicionar.innerHTML = `<button class="btn btn-secondary" type="button" id="concluir" disabled>
                                        <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true" style="margin-right: 6px;"></span>
                                         Adicionando
                                    </button>`

        if (numero.value == "") {
            numero.value = "s/n"
        }
        let jognovo = {
            "id_pelada": id_pelada,
            "nome": nome.value,
            "numero": numero.value,
            "time": time.value,
            "datadeingresso": ingresso.value
        };

        jognovo = JSON.stringify(jognovo);

        addJogador(jognovo); //mudar
    })
} else {
    getJogador(jogadorId)
    getPagJog(jogadorId, 2023)
}