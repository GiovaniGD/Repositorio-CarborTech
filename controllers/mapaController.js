const mapaModel = require("../models/mapaModel");

async function cadastroArea(req, res) {
    const { areadados } = require('../index');

    areadados().then(async(dados) => {
        if (req.session.usuario && req.session.usuario.id_usuario !== undefined) {
            let id_usuario = req.session.usuario.id_usuario;
            console.log(id_usuario);
        
            let proprietario = dados.proprietario;
            let area = dados.area;
            let perimetro = dados.perimetro;
            let coordinates = dados.coordinates;
            let usuario_cadastrante = dados.usuario_cadastrante;
            let descricao = dados.descricao;
            let email_proprietario = dados.email;
            let municipio = dados.municipio;
            let endereco = dados.endereco;
            let tipo = dados.tipo;

            let respCadastro = await mapaModel.cadastroArea(id_usuario, proprietario, area, perimetro, coordinates, usuario_cadastrante, descricao, email_proprietario, municipio, endereco, tipo);
            let resp = await mapaModel.verificarArea(id_usuario, proprietario, area, perimetro, coordinates, usuario_cadastrante, descricao, email_proprietario, municipio, endereco, tipo);

            if (resp.length > 0 && respCadastro.affectedRows > 0) {

                req.session.area = {
                    id_area: resp[0].id_area,
                    id_usuario: resp[0].id_usuario,
                    proprietario: resp[0].proprietario,
                    area: resp[0].area,
                    perimetro: resp[0].perimetro,
                    coordinates: resp[0].coordinates,
                    usuario_cadastrante: resp[0].usuario_cadastrante,
                    descricao: resp[0].descricao,
                    email_proprietario: resp[0].email_proprietario,
                    municipio: resp[0].municipio,
                    endereco: resp[0].endereco,
                    tipo: resp[0].tipo,
                };
                res.locals.layoutVariables = { area: req.session.area };
                res.redirect('/mapa');
            } else {
                console.log('Falha em cadastrar nova área');
                res.redirect('/mapa');
            }
        } else {
            res.redirect('/login');
        }
    });
}

async function apagarArea(req, res) {
    const { areadados } = require('../index');

    areadados().then(async(dados) => {
        let usuario_cadastrante = dados.usuario_cadastrante;

        if(req.session.usuario.nome === usuario_cadastrante) {
            let coordenadasArea = dados.coordinates;

            await mapaModel.apagarArea(coordenadasArea);
            res.redirect('/mapa');
        } else {
            console.log("Você não possui permissão para isso.")
        }
    });
}

async function abrirServico(req, res) {
    const { areadados } = require('../index');

    areadados().then(async(dados) => {
        let usuario_cadastrante = dados.usuario_cadastrante;

        if(req.session.usuario.nome === usuario_cadastrante) {
            let coordenadasArea = dados.coordinates;

            //Solicitar serviço
            
            res.redirect('/mapa');
        } else {
            console.log("Você não possui permissão para isso.")
        }
    });
}

module.exports = { cadastroArea, apagarArea, abrirServico };