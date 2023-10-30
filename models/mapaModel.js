const db = require('./db');

class MapaModel {
    constructor(id_area, id_usuario, proprietario, area, perimetro, coordinates, usuario_cadastrante, descricao, email_proprietario) {
        this.id_area = id_area;
        this.id_usuario = id_usuario;
        this.proprietario = proprietario;
        this.area = area;
        this.perimetro = perimetro;
        this.coordinates = coordinates;
        this.usuario_cadastrante = usuario_cadastrante;
        this.descricao = descricao;
        this.email_proprietario = email_proprietario;
    }

    static async verificarArea(id_usuario, proprietario, area, perimetro, coordinates, usuario_cadastrante, descricao, email_proprietario) {
        let sql = `SELECT * FROM area WHERE id_usuario = '${id_usuario}' AND proprietario = '${proprietario}' AND area = '${area}' AND perimetro = '${perimetro}' AND coordinates = '${coordinates}' AND usuario_cadastrante = '${usuario_cadastrante}' AND descricao = '${descricao}' AND email_proprietario = '${email_proprietario}'`;
        let resp = await db.query(sql);
        return resp;
    }

    static async cadastroArea(id_usuario, proprietario, area, perimetro, coordinates, usuario_cadastrante, descricao, email_proprietario){
        let sql = `INSERT INTO area (id_usuario, proprietario, area, perimetro, coordinates, usuario_cadastrante, descricao, email_proprietario) VALUES ('${id_usuario}', '${proprietario}', '${area}', '${perimetro}', '${coordinates}', '${usuario_cadastrante}', '${descricao}', '${email_proprietario}')`;
        let resp = await db.query(sql);
        return resp;
    }

    static async pegarAreas(){
        let sql = `SELECT * FROM area`;
        let resp = await db.query(sql);
        return resp;
    }
}

module.exports = MapaModel;