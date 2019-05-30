import Sql = require("../infra/sql")
import GeradorHash = require("../utils/geradorHash")


export = class ItemUsuario {

    public id_item_usuario: number;
    public fk_item_id: number;
    public fk_usuario_id: number;
    public dt_semestre_item: number;




    public static async obterItensUsuario(ra: number): Promise<ItemUsuario[]> {
        let lista: ItemUsuario[] = null;

        await Sql.conectar(async (sql: Sql) => {
            lista = await sql.query("select i.id_item, i.nome_item, i.img_url_item from item_usuario u, item i where fk_usuario_id = ? and u.fk_item_id = i.id_item", [ra]) as ItemUsuario[]
        })
        return lista
    }


}