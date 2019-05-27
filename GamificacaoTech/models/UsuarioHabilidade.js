"use strict";
const Sql = require("../infra/sql");
module.exports = class UsuarioHabilidade {
    static async validar(uh) {
        let resp = true;
        let lista = null;
        await Sql.conectar(async (sql) => {
            lista = await sql.query("select * from usuario_habilidade where id_usuario_usuario_habilidade = ? and id_habilidade_usuario_habilidade = ?", [uh.idUsuario, uh.idHabilidade]);
            if (lista != null || lista.length != 0)
                resp = false;
        });
        return resp;
    }
    static async obter(ra) {
        let lista = null;
        await Sql.conectar(async (sql) => {
            lista = await sql.query("select * from usuario_habilidade where id_usuario_usuario_habilidade = ?", [ra]);
        });
        return lista;
    }
    static async criar(uh) {
        let resp;
        console.log(this.validar(uh));
        await Sql.conectar(async (sql) => {
            try {
                await sql.query("insert into usuario_habilidade (id_usuario_usuario_habilidade, id_habilidade_usuario_habilidade, id_nivel_proficiencia_usuario_habilidade) values (?, ?, ?)", [uh.idUsuario, uh.idHabilidade, uh.idNivelProficiencia]);
            }
            catch (e) {
                if (e.code && e.code == "ER_DUP_ENTRY") {
                    resp = "Error";
                }
            }
        });
        return resp;
    }
};
//# sourceMappingURL=UsuarioHabilidade.js.map