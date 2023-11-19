const mapaModel = require("../models/mapaModel");

async function cadastroArea(req, res) {
    const { areadados } = require('../index');

    areadados().then(async(dados) => {
        if (req.session.usuario && req.session.usuario.id_usuario !== undefined) {
            let id_usuario = req.session.usuario.id_usuario;
        
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
            let email_cadastrante = dados.email_cadastrante;

            let respCadastro = await mapaModel.cadastroArea(id_usuario, proprietario, area, perimetro, coordinates, usuario_cadastrante, descricao, email_proprietario, municipio, endereco, tipo, email_cadastrante);
            let resp = await mapaModel.verificarArea(id_usuario, proprietario, area, perimetro, coordinates, usuario_cadastrante, descricao, email_proprietario, municipio, endereco, tipo, email_cadastrante);

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
                    email_cadastrante: resp[0].email_cadastrante,
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

async function apagarArea(req, res ) {
    const { areadados } = require('../index');

    areadados().then(async(dados) => {
        let email_cadastrante = dados.email_cadastrante;

        if(req.session.usuario.email === email_cadastrante) {
            let coordenadasArea = dados.coordinates;

            await mapaModel.apagarArea(coordenadasArea);

            res.redirect('/mapa');
        } else {
            console.log("Você não possui permissão para isso.")
        }
    });
}

async function verificarSobreposicao(areas) {
    for (let i = 0; i < areas.length; i++) {
      for (let j = i + 1; j < areas.length; j++) {
        const coordenadasArea1 = JSON.parse(areas[i].coordinates);
        const coordenadasArea2 = JSON.parse(areas[j].coordinates);
  
        const sobreposta = poligonosSobrepostos(coordenadasArea1, coordenadasArea2);
  
        console.log(`Área ${areas[i].id_area} e Área ${areas[j].id_area} estão se sobrepõendo: ${sobreposta}`);
        
        if (sobreposta) {
            const ultimaArea = areas.pop();
            const idArea = ultimaArea.id_area;

            await mapaModel.apagarAreaId(idArea);

            console.log(`Área ${ultimaArea.id_area} excluída devido à sobreposição.`);
        }
      }
    }
  }
  
  function poligonosSobrepostos(coords1, coords2) {
    for (let i = 0; i < coords1.length - 1; i++) {
      for (let j = 0; j < coords2.length - 1; j++) {
        if (segmentosIntersectam(coords1[i], coords1[i + 1], coords2[j], coords2[j + 1])) {
          return true;
        }
      }
    }
  
    if (segmentosIntersectam(coords1[coords1.length - 1], coords1[0], coords2[coords2.length - 1], coords2[0])) {
      return true;
    }
  
    return false;
  }
  
  function segmentosIntersectam(a, b, c, d) {
    return (
      linhasSeIntersectam(a, b, c, d) &&
      linhasSeIntersectam(c, d, a, b)
    );
  }
  
  function linhasSeIntersectam(p, q, r, s) {
    const orientacao1 = orientacao(p, q, r);
    const orientacao2 = orientacao(p, q, s);
    const orientacao3 = orientacao(r, s, p);
    const orientacao4 = orientacao(r, s, q);
  
    if (orientacao1 !== orientacao2 && orientacao3 !== orientacao4) {
      return true;
    }
  
    if (
      (orientacao1 === 0 && pontoNaLinha(p, q, r)) ||
      (orientacao2 === 0 && pontoNaLinha(p, q, s)) ||
      (orientacao3 === 0 && pontoNaLinha(r, s, p)) ||
      (orientacao4 === 0 && pontoNaLinha(r, s, q))
    ) {
      return true;
    }
  
    return false;
  }
  
  function orientacao(p, q, r) {
    const valor = (q.lng - p.lng) * (r.lat - q.lat) - (q.lat - p.lat) * (r.lng - q.lng);
  
    if (valor === 0) {
      return 0;
    }
  
    return valor > 0 ? 1 : 2;
  }
  
  function pontoNaLinha(p, q, r) {
    return q.lat <= Math.max(p.lat, r.lat) &&
           q.lat >= Math.min(p.lat, r.lat) &&
           q.lng <= Math.max(p.lng, r.lng) &&
           q.lng >= Math.min(p.lng, r.lng);
  }

module.exports = { cadastroArea, apagarArea, verificarSobreposicao };