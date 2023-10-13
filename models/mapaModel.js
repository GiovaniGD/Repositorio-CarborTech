const db = require('./db');

class MapaModel {
    constructor(id_area, id_usuario, area, perimetro) {
        this.id_area = id_area;
        this.id_usuario = id_usuario;
        this.area = area;
        this.perimetro = perimetro;
    }

    static async cadastroArea(id_usuario, area, perimetro){
        let sql = `INSERT INTO area (id_usuario, area, perimetro) VALUES ('${id_usuario}', '${area}', '${perimetro}')`;
        let resp = await db.query(sql);
        return resp;
    }
}

module.exports = MapaModel;