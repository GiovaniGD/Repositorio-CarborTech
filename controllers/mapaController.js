const mapaModel = require("../models/mapaModel");

let polygons = [];
 
async function cadastroArea(req, res) {
    if (req.session.usuario && req.session.usuario.id_usuario !== undefined) {
        const index = require('../index');
        console.log('Proprietario em outro arquivo: ', index.proprietario);
        console.log('Área em outro arquivo: ', index.area);
        console.log('Perímetro em outro arquivo: ', index.perimetro);
        
        let id_usuario = req.session.usuario.id_usuario;
        console.log(id_usuario);
    
        let resp = await mapaModel.cadastroArea(id_usuario, index.proprietario, index.area, index.perimetro);
        if (resp.affectedRows > 0) {
            console.log('Você cadastrou uma nova área');
            res.redirect('/mapa');
        } else {
            console.log('Falha em cadastrar nova área');
            res.redirect('/mapa');
        }
    } else {
        res.redirect('/login');
    }
}

module.exports = { cadastroArea };