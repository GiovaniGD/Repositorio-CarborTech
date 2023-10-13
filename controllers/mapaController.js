const mapaModel = require("../models/mapaModel");

let polygons = [];

function cadastroArea(req, res) {
  res.render('servicos/mapa');
}
 
async function efetivarCadastro(req, res) {
    const index = require('../index');
    console.log('Área em outro arquivo: ', index.area);
    console.log('Perímetro em outro arquivo: ', index.perimetro);
    
    let id_usuario = req.session.usuario.id_usuario;
    
    console.log(id_usuario);
    
    let resp = await mapaModel.cadastroArea(id_usuario, index.area, index.perimetro);
    if (resp.affectedRows > 0) {
        console.log('Você cadastrou uma nova área');
    } else {
        console.log('Falha em cadastrar nova área');
        res.redirect('/mapa');
    }
}

module.exports = { cadastroArea, efetivarCadastro };