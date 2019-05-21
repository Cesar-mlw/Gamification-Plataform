"use strict";
const Sql = require("../infra/sql");
module.exports = class Area {
    static async listar() {
        let lista = null;
        await Sql.conectar(async (sql) => {
            lista = await sql.query("select * from area");
        });
        return lista;
    }
};
//# sourceMappingURL=Area.js.map