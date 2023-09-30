const mapaModel = require("../models/mapaModel");

const areaRecuperada = localStorage.getItem(area);
console.log(areaRecuperada);

let polygons = [];

function cadastroArea(req, res) {
  res.render('mapa');
}

async function efetivarCadastro(req, res) {
  
    let id_usuario = req.session.usuario.id_usuario;
    console.log(req.body);
    
    let resp = await mapaModel.cadastroArea(id_area, id_usuario, area, perimetro);
    if (resp.affectedRows > 0) {
        console.log('Você cadastrou uma nova área');
    } else {
        console.log('Falha em cadastrar nova área');
        res.redirect('/mapa');
    }
}

module.exports = { cadastroArea, efetivarCadastro };