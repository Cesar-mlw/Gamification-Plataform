import Sql = require("../infra/sql")
import GeradorHash = require("../utils/geradorHash")


export = class Area {

    public idArea: number;
    public nomeArea: string;
    public pontosArea: number;




    public static async listar(): Promise<Area[]> {
        let lista: Area[] = null;

        await Sql.conectar(async (sql: Sql) => {
            lista = await sql.query("select * from area") as Area[]
        })
        return lista
    }


}