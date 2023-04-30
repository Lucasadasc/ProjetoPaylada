//Dados

//[valor, dia máx de pagamento, mês do inicio, mês de termino]
var gerencia = [40, "10", "02", "11"]
var jogadores = [];
var pagamentos = [];



function salvarJogadores() {

    const lista = document.querySelector("#visaogeralresultados");

    var nome = document.getElementById("addnome").value;
    var time = document.getElementById("timeselect").value;
    var numero = document.getElementById("numero").value;
    var datadeingresso = document.getElementById("ingresso").value;
    var id = (jogadores.length) + 1

    var jogador = [id, nome, time, numero, datadeingresso]

    jogadores.push(jogador)

    console.log(jogadores)

    lista.innerHTML = gerarTabela()
}

function gerarPagamentos(id, diaingresso, mesingresso){
    var data = new Date();

    var dia = data.getDate()
    var mes = data.getMonth()+1
    var ano = data.getFullYear()


    var diadoingresso = Number(datadeingresso.substring(8,10))
    var mesdoingresso = Number(datadeingresso.substring(5,7))

    var pagjan = "paga"
    var pagfev = "paga"
    var pagmar = "paga"
    var pagabr = "paga"
    var pagmai = "paga"
    var pagjun = "paga"
    var pagjul = "paga"
    var pagago = "paga"
    var pagset = "paga"
    var pagout = "paga"
    var pagnov = "paga"
    var pagdez = "paga"

    if(mesdoingresso==1){
        pagjan='semjogos'
    }
}

function gerarTabela() {
    return `
    <tr>
        <th scope="row">1</th>
            <td>Lucas</td>
            <td>10</td>
                <td>Inter</td>
                <td><i class="fa-solid fa-circle-check"></i></td>
                <td><i class="fa-solid fa-circle-check"></i></td>
                <td><i class="fa-solid fa-circle-check"></i></td>
                <td><i class="fa-solid fa-circle-check"></i></td>
                <td><i class="fa-solid fa-circle-check"></i></td>
                <td><i class="fa-solid fa-circle-check"></i></td>
                <td><i class="fa-solid fa-circle-check"></i></td>
                <td><i class="fa-solid fa-circle-check"></i></td>
                <td><i class="fa-solid fa-circle-check"></i></td>
                <td><i class="fa-solid fa-circle-check"></i></td>
                <td><i class="fa-solid fa-circle-check"></i></td>
                <td><i class="fas fa-dollar-sign fa-1,5x text-gray-300"></i></td>
                <td>Ativo</td>
                <td>R$300</td>
                <td>
                    <a href="./jogador.html">
                        <i class="fa-solid fa-magnifying-glass fa-2xs"></i>
                    </a>
                </td>
    </tr>
    `;
}
