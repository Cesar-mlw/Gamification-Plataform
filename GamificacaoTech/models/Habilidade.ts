import Sql = require("../infra/sql")
import GeradorHash = require("../utils/geradorHash")


export = class Habilidade {

    public idHabilidade: number;
    public nomeHabilidade: string;



    public static async listar(): Promise<Habilidade[]> {
        let lista: Habilidade[] = null;

        await Sql.conectar(async (sql: Sql) => {
            lista = await sql.query("select * from habilidade") as Habilidade[]
        })
        return lista
    }

    


}