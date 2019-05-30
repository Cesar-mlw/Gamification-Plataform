"use strict";
const Sql = require("../infra/sql");
module.exports = class Noticia {
    static async listar() {
        let lista = null;
        await Sql.conectar(async (sql) => {
            lista = await sql.query("select * from noticia");
        });
        return lista;
    }
};
//# sourceMappingURL=Noticia.js.map