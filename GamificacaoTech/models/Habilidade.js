"use strict";
const Sql = require("../infra/sql");
module.exports = class Habilidade {
    static async listar() {
        let lista = null;
        await Sql.conectar(async (sql) => {
            lista = await sql.query("select * from habilidade");
        });
        return lista;
    }
};
//# sourceMappingURL=Habilidade.js.map