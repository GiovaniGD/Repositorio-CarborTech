const db = require("./db");
const md5 = require("md5");

class UsuarioModel {
  constructor(id_usuario, nome, email, senha) {
    this.id_usuario = id_usuario;
    this.nome = nome;
    this.email = email;
    this.senha = senha;
  }

  static async verificarUsuario(email, senha) {
    let sql = `SELECT * FROM usuario WHERE email = '${email}' AND senha = '${md5(senha)}'`;
    let resp = await db.query(sql);
    return resp;
  }

  static async verificarEmail(email) {
    let sql = `SELECT * FROM usuario WHERE email = '${email}'`;
    let resp = await db.query(sql);
    return resp;
  }

  static async cadastrarUsuario(nome, email, senha) {
    let jaExiste = await UsuarioModel.verificarEmail(email);

    if (jaExiste.length > 0) {
      console.log("Usuário já existe");
      return false;
    }

    let sql = `INSERT INTO usuario (nome, email, senha) VALUES ('${nome}', '${email}', '${md5(senha)}')`;
    let resp = await db.query(sql);
    return resp;
  }
}

module.exports = UsuarioModel;
