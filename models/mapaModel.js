const db = require('./db');

class MapaModel {
    constructor(id_area, id_usuario, proprietario, area, perimetro) {
        this.id_area = id_area;
        this.id_usuario = id_usuario;
        this.proprietario = proprietario;
        this.area = area;
        this.perimetro = perimetro;
        this.coordinates = coordinates;
    }

    static async todasAreas(){
        let sql = `SELECT * FROM area ORDER BY id_area`;
        let resp = await database.query(sql);
        return resp;
    }

    static async verificarArea(id_usuario, proprietario, area, perimetro, coordinates) {
        let sql = `SELECT * FROM area WHERE id_usuario = '${id_usuario}' AND proprietario = '${proprietario}' AND area = '${area}' AND perimetro = '${perimetro}' AND coordinates = '${coordinates}'`;
        let resp = await db.query(sql);
        return resp;
    }

    static async cadastroArea(id_usuario, proprietario, area, perimetro, coordinates){
        let sql = `INSERT INTO area (id_usuario, proprietario, area, perimetro, coordinates) VALUES ('${id_usuario}', '${proprietario}', '${area}', '${perimetro}', '${coordinates}')`;
        let resp = await db.query(sql);
        return resp;
    }

    static async pegarAreas(coordinates){
        let sql = `SELECT coordinates FROM area`;
        let resp = await db.query(sql);
        return resp;
    }
}

module.exports = MapaModel;