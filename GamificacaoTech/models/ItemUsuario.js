"use strict";
const Sql = require("../infra/sql");
module.exports = class ItemUsuario {
    static async obterItensUsuario(ra) {
        let lista = null;
        await Sql.conectar(async (sql) => {
            lista = await sql.query("select i.id_item, i.nome_item, i.img_url_item from item_usuario u, item where fk_usuario_id = ? and u.fk_item_id = i.id_item", [ra]);
        });
        return lista;
    }
};
//# sourceMappingURL=ItemUsuario.js.map