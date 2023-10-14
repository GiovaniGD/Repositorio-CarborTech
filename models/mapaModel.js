const db = require('./db');

class MapaModel {
    constructor(id_area, id_usuario, proprietario, area, perimetro) {
        this.id_area = id_area;
        this.id_usuario = id_usuario;
        this.proprietario = proprietario;
        this.area = area;
        this.perimetro = perimetro;
    }

    static async verificarArea(id_usuario, proprietario, area, perimetro) {
        let sql = `SELECT * FROM area WHERE id_usuario = '${id_usuario}' AND proprietario = '${proprietario}' AND area = '${area}' AND perimetro = '${perimetro}'`;
        let resp = await db.query(sql);
        return resp;
    }

    static async cadastroArea(id_usuario, proprietario, area, perimetro){
        let sql = `INSERT INTO area (id_usuario, proprietario, area, perimetro) VALUES ('${id_usuario}', '${proprietario}', '${area}', '${perimetro}')`;
        let resp = await db.query(sql);
        return resp;
    }
}

module.exports = MapaModel;