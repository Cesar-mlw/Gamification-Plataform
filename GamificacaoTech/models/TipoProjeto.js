"use strict";
const Sql = require("../infra/sql");
module.exports = class TipoProjeto {
    static async listar() {
        let lista = null;
        await Sql.conectar(async (sql) => {
            lista = await sql.query("select * from tipo_projeto");
        });
        return lista;
    }
};
//# sourceMappingURL=TipoProjeto.js.map