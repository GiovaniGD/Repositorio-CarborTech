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
    
        let proprietario = index.proprietario;
        let area = index.area;
        let perimetro = index.perimetro;

        let respCadastro = await mapaModel.cadastroArea(id_usuario, proprietario, area, perimetro);
        let resp = await mapaModel.verificarArea(id_usuario, proprietario, area, perimetro);

        if (resp.length > 0 && respCadastro.affectedRows > 0) {
            req.session.area = {
                id_area: resp[0].id_area,
                proprietario: resp[0].proprietario,
                area: resp[0].area,
                perimetro: resp[0].perimetro
            };
            res.locals.layoutVariables = { area: req.session.area };
            console.log('Você cadastrou uma nova área');
            console.log(req.session.area);
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