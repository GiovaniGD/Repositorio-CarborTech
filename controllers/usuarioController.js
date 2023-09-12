const usuarioModel = require('../models/usuarioModel');

function login(req, res) {
    erro = req.query.erro;
    if(erro == 1){
        erro = 'Dados não correspondentes, verifique-os';
    }else if(erro == 2){
        erro = 'Faça login antes de prosseguir para essa tela';
    }else{
        erro = '';
    }
    res.locals.layoutVariables = {
        url: process.env.URL, title: "CarborTech"
    };
    res.render('usuarios/login');
}

function cadastro(req, res) {
    erro = req.query.erro;
    if(erro == 1){
        erro = 'Este email já está cadastrado';
    }else if(erro == 2){
        erro = 'Senha incorreta';
    }else{
        erro = '';
    }
    res.locals.layoutVariables = {
        url: process.env.URL, title: "CarborTech"
    };
    res.render('usuarios/cadastro');
}

async function autenticar(req, res) {
    const { email, senha } = req.body;
    let resp = await usuarioModel.verificarUsuario(email, senha);
    if(resp.length > 0){
        req.session.usuario = {
            id: resp[0].id,
            nome: resp[0].nome,
            email: resp[0].email,
        };
        res.locals.layoutVariables = {usuario: req.session.usuario};
        console.log('Usuário encontrado');
        res.redirect('/');
    }else{
        console.log('Usuário não encontrado');
        res.redirect('/login?erro=1');
    }
}

async function cadastrar(req, res) {
    const { nome, email, senha , criptSenha} = req.body;
    if(senha !== criptSenha){
        console.log('Senhas não conferem');
        res.redirect('/cadastro?erro=2');
    }else{
        let resp = await usuarioModel.cadastrarUsuario(nome, email, senha);
    if(resp === false){
        console.log('Este usuário já cadastrado');
        res.redirect('/cadastro?erro=1');
        }else{
            console.log('Erro ao cadastrar usuário');
            res.redirect('/cadastro');
        }
    }
}

function deslogar(req, res){
    delete req.session.usuario;
    res.redirect('/login');
}

module.exports = { login, cadastro, autenticar, cadastrar, deslogar };