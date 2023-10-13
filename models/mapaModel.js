const db = require('./db');

class MapaModel {
    constructor(id_area, id_usuario, proprietario, area, perimetro) {
        this.id_area = id_area;
        this.id_usuario = id_usuario;
        this.proprietario = proprietario;
        this.area = area;
        this.perimetro = perimetro;
    }

    static async cadastroArea(id_usuario, proprietario, area, perimetro){
        let sql = `INSERT INTO area (id_usuario, proprietario, area, perimetro) VALUES ('${id_usuario}', '${proprietario}', '${area}', '${perimetro}')`;
        let resp = await db.query(sql);
        return resp;
    }
}

module.exports = MapaModel;