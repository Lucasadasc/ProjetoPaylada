const url = "https://api-paylada-b70863bb5798.herokuapp.com/paylada/";

//itens do forms
const nomerec = document.querySelector("#nome");
const sobrenomerec = document.querySelector("#sobrenome");
const emailrec = document.querySelector("#email");
const loginrec = document.querySelector("#login-usuario");
const senharec = document.querySelector("#senha");
const senha_confirmadarec = document.querySelector("#senha-confirmada");

const alerta_erro = document.getElementById('erro')
const btn_logar = document.getElementById('concluir')

async function addRecOuDesp(roudnovo) {

    const response = await fetch(url + 'user/',
        {
            method: "POST",
            body: roudnovo,
            headers: {
                "Content-type": "application/json",
            },
        });

        const usuario_adicionado = await response.json();

        alerta_erro.innerHTML = `<div class="alert alert-success" role="alert">
                                    ${usuario_adicionado.usuario} adicionado 
                                </div>
                                `
        const log = document.getElementById('botao-logar')
        log.innerHTML = `<a href="../index.html" class="btn btn-success" id="concluir" >Logar</a>`
}

async function cadastrar(){

    btn_logar.innerHTML = `
        <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true" style="margin-right: 6px;"></span>
            Adicionando
        `
    
    let nome = nomerec.value;
    let sobrenome = sobrenomerec.value;
    let email = emailrec.value;
    let login_bruto = (loginrec.value);
    let login = (login_bruto.trim()).toLowerCase()
    let senha = senharec.value;
    let senha_confirmada = senha_confirmadarec.value;

    const response = await fetch(url + 'user/');
    const usuarios = await response.json();

    let status = 'sucesso';

    usuarios.map((usuario)=>{
        if(usuario.usuario == login){
            status = "nome de usuário não disponivel"
        }
    });
    
    if(senha != senha_confirmada){
        status = "senhas não iguais";
    }
    if(nome ==''){
        status = "Nome não informado";
    }else if(email == ''){
        status = "E-mail não informado";
    }else if(login == ''){
        status = "Nome de usuário não informado";
    }else if(senha == ''){
        status = "Senha não informada";
    }

    if(status == 'sucesso'){

        let novo_usuario = {
            "nome": nome +" "+ sobrenome,
            "email" : email,
            "usuario": login,
            "senha": senha
        };

        novo_usuario = JSON.stringify(novo_usuario);
        addRecOuDesp(novo_usuario);
    
    }else{
        alerta_erro.innerHTML = `<div class="alert alert-danger" role="alert">
                                    ${status}
                                 </div>`
        btn_logar.innerHTML = 'Cadastrar'
    }
};
