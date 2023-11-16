const db = require('./db');

class MapaModel {
    constructor(id_area, id_usuario, proprietario, area, perimetro, coordinates, usuario_cadastrante, descricao, email_proprietario, municipio, endereco, tipo) {
        this.id_area = id_area;
        this.id_usuario = id_usuario;
        this.proprietario = proprietario;
        this.area = area;
        this.perimetro = perimetro;
        this.coordinates = coordinates;
        this.usuario_cadastrante = usuario_cadastrante;
        this.descricao = descricao;
        this.email_proprietario = email_proprietario;
        this.municipio = municipio;
        this.endereco = endereco;
        this.tipo = tipo;
    }

    static async verificarArea(id_usuario, proprietario, area, perimetro, coordinates, usuario_cadastrante, descricao, email_proprietario, municipio, endereco, tipo) {
        let sql = `SELECT * FROM area WHERE id_usuario = '${id_usuario}' AND proprietario = '${proprietario}' AND area = '${area}' AND perimetro = '${perimetro}' AND coordinates = '${coordinates}' AND usuario_cadastrante = '${usuario_cadastrante}' AND descricao = '${descricao}' AND email_proprietario = '${email_proprietario}' AND municipio = '${municipio}'  AND endereco = '${endereco}' AND tipo = '${tipo}'`;
        let resp = await db.query(sql);
        return resp;
    }

    static async cadastroArea(id_usuario, proprietario, area, perimetro, coordinates, usuario_cadastrante, descricao, email_proprietario, municipio, endereco, tipo){
        let sql = `INSERT INTO area (id_usuario, proprietario, area, perimetro, coordinates, usuario_cadastrante, descricao, email_proprietario, municipio, endereco, tipo) VALUES ('${id_usuario}', '${proprietario}', '${area}', '${perimetro}', '${coordinates}', '${usuario_cadastrante}', '${descricao}', '${email_proprietario}', '${municipio}', '${endereco}', '${tipo}')`;
        let resp = await db.query(sql);
        return resp;
    }

    static async pegarAreas(){
        let sql = `SELECT * FROM area`;
        let resp = await db.query(sql);
        return resp;
    }

    static async apagarArea(coordenadasArea){
        let sql = `DELETE FROM area WHERE coordinates = '${coordenadasArea}'`;
        let resp = await db.query(sql);
        return resp;
    }
}

module.exports = MapaModel;