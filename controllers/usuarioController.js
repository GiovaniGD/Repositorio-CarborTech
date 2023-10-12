const usuarioModel = require("../models/usuarioModel");

// Análise de erros para o login
function login(req, res) {
  erro = req.query.erro;
  if (erro == 1) {
    erro = "Email ou senha incorretos";
  } else if (erro == 2) {
    erro = "Você precisa estar logado para acessar essa página";
  } else if (erro == 3) {
    erro = "Usuário cadastrado com sucesso";
  } else {
    erro = "";
  }
  res.locals.layoutVariables = {
    url: process.env.URL,
    title: "CarborTech",
  };
  res.render("usuarios/login");
}

// Análise de erros para o cadastro
function cadastro(req, res) {
  erro = req.query.erro;
  if (erro == 1) {
    erro = "Já existe um usuário com esse email";
  } else if (erro == 2) {
    erro = "Senhas não conferem";
  } else {
    erro = "";
  }
  res.locals.layoutVariables = {
    url: process.env.URL,
    title: "CarborTech",
  };
  res.render("usuarios/cadastro");
}

// Função que busca os dados do login na sessão para autenticar
async function autenticar(req, res) {
  const { email, senha } = req.body;
  let resp = await usuarioModel.verificarUsuario(email, senha);
  if (resp.length > 0) {
    req.session.usuario = {
      id: resp[0].id,
      nome: resp[0].nome,
      email: resp[0].email,
    };
    res.locals.layoutVariables = { usuario: req.session.usuario };
    console.log("Usuário encontrado");
    res.redirect("/");
  } else {
    console.log("Usuário não encontrado");
    res.redirect("/login?erro=1");
  }
}

// Função que registra os dados de cadastro no banco de dados
async function cadastrar(req, res) {
  const { nome, email, senha, senha2 } = req.body;
  if (senha !== senha2) {
    console.log("Senhas não conferem");
    res.redirect("/cadastro?erro=2");
  } else {
    let resp = await usuarioModel.cadastrarUsuario(nome, email, senha);
    if (resp === false) {
      console.log("Usuário já existe");
      res.redirect("/cadastro?erro=1");
    } else if (resp.affectedRows > 0) {
      console.log("Usuário cadastrado");
      res.redirect("/login?erro=3");
    } else {
      console.log("Erro ao cadastrar usuário");
      res.redirect("/cadastro");
    }
  }
}

// Pega o id do usuário
async function pegarUsuario(req, res) {
  console.log(req.session.usuario)
  if (req.session.usuario) {
    const usuario = req.session.usuario;
    res.locals.usuario = usuario;
  }
  res.render('layouts/header', { usuario });
  res.render('servicos/mapa', { usuario });
}

// Desloga o usuário
function logout(req, res) {
  delete req.session.usuario;
  res.redirect("/login");
}

module.exports = { login, cadastro, autenticar, cadastrar, pegarUsuario, logout };
