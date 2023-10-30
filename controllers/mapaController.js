const mapaModel = require("../models/mapaModel");

async function cadastroArea(req, res) {
    if (req.session.usuario && req.session.usuario.id_usuario !== undefined) {
        const index = require('../index');
        
        let id_usuario = req.session.usuario.id_usuario;
        console.log(id_usuario);
    
        let proprietario = index.proprietario;
        let area = index.area;
        let perimetro = index.perimetro;
        let coordinates = index.coordinates;
        let usuario_cadastrante = index.usuario_cadastrante;
        let descricao = index.descricao;

        let respCadastro = await mapaModel.cadastroArea(id_usuario, proprietario, area, perimetro, coordinates, usuario_cadastrante, descricao);
        let resp = await mapaModel.verificarArea(id_usuario, proprietario, area, perimetro, coordinates, usuario_cadastrante, descricao);

        if (resp.length > 0 && respCadastro.affectedRows > 0) {
            req.session.area = {
                id_area: resp[0].id_area,
                proprietario: resp[0].proprietario,
                area: resp[0].area,
                perimetro: resp[0].perimetro,
                coordinates: resp[0].coordinates,
                usuario_cadastrante: resp[0].usuario_cadastrante,
                descricao: resp[0].descricao,
            };
            res.redirect('/mapa');
        } else {
            console.log('Falha em cadastrar nova área');
            res.redirect('/mapa');
        }
    } else {
        res.redirect('/login');
    }
}

async function pegarAreas(req, res) {
    try {
      const areas = await MapaModel.pegarAreas();
      res.json({ areas });
    } catch (error) {
      console.error('Erro ao recuperar áreas:', error);
      res.status(500).json({ error: 'Erro ao recuperar áreas.' });
    }
}

module.exports = { cadastroArea, pegarAreas };