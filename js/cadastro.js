const url = "https://api-paylada-b70863bb5798.herokuapp.com/paylada/";

//itens do forms
const nomerec = document.querySelector("#nome");
const sobrenomerec = document.querySelector("#sobrenome");
const emailrec = document.querySelector("#email");
const loginrec = document.querySelector("#login-usuario");
const senharec = document.querySelector("#senha");
const senha_confirmadarec = document.querySelector("#senha-confirmada");

async function cadastrar(){

    let nome = nomerec.value;
    let sobrenome = sobrenomerec.value;
    let email = emailrec.value;
    let login = loginrec.value;
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

    }else{

    }
};