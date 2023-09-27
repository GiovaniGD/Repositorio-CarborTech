const mapaModel = require("../models/mapaModel");

import { initMap } from "../js/mapa";

let polygons = [];

function cadastroArea(req, res) {
  res.render('mapa');
}

async function efetivarCadastro(req, res) {
    const area = initMap.area;
    console.log(`Àrea no controllers: ${area}`);
  
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