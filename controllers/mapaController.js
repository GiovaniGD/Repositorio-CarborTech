/*const mapaModel = require("../models/mapaModel");

let polygons = [];

function cadastroArea(req, res) {
  res.render('mapa');
}

async function efetivarCadastro(req, res) {
    const {nome, descricao, categoria, valor, estoque} = req.body;
  
    let id_usuario = req.session.usuario.id_usuario;
    console.log(req.body);
    
    let resp = await produtosModel.cadastroProduto(id_usuario, id_categoria, nome, descricao, valor, estoque, categoria, imagem);
    if (resp.affectedRows > 0) {
        console.log('Você adicionou um novo produto');
    } else {
        console.log('Falha em cadastrar nova área');
        res.redirect('/mapa');
    }
  }*/