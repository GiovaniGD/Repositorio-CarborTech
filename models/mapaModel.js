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

    static async verificarArea(id_usuario, proprietario, area, perimetro, coordinates, usuario_cadastrante, descricao, email_proprietario, municipio, endereco, tipo, email_cadastrante) {
        let sql = `SELECT * FROM area WHERE id_usuario = '${id_usuario}' AND proprietario = '${proprietario}' AND area = '${area}' AND perimetro = '${perimetro}' AND coordinates = '${coordinates}' AND usuario_cadastrante = '${usuario_cadastrante}' AND descricao = '${descricao}' AND email_proprietario = '${email_proprietario}' AND municipio = '${municipio}'  AND endereco = '${endereco}' AND tipo = '${tipo}' AND email_cadastrante = '${email_cadastrante}'`;
        let resp = await db.query(sql);
        return resp;
    }

    static async cadastroArea(id_usuario, proprietario, area, perimetro, coordinates, usuario_cadastrante, descricao, email_proprietario, municipio, endereco, tipo, email_cadastrante){
        let sql = `INSERT INTO area (id_usuario, proprietario, area, perimetro, coordinates, usuario_cadastrante, descricao, email_proprietario, municipio, endereco, tipo, email_cadastrante) VALUES ('${id_usuario}', '${proprietario}', '${area}', '${perimetro}', '${coordinates}', '${usuario_cadastrante}', '${descricao}', '${email_proprietario}', '${municipio}', '${endereco}', '${tipo}', '${email_cadastrante}')`;
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

    static async apagarAreaId(idArea){
        let sql = `DELETE FROM area WHERE id_area = '${idArea}'`;
        let resp = await db.query(sql);
        return resp;
    }

    static async editarArea(coordenadasArea, descricaoArea, areaArea, perimetroArea){
        let sql = `UPDATE area SET coordinates = '${coordenadasArea}', area = '${areaArea}', perimetro = '${perimetroArea}' WHERE descricao = '${descricaoArea}'`;
        let resp = await db.query(sql);
        return resp;
    }
}

module.exports = MapaModel;