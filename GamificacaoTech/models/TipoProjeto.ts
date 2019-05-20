import Sql = require("../infra/sql")
import GeradorHash = require("../utils/geradorHash")


export = class TipoProjeto {

    public idTipoProjeto: number;
    public nomeTipoProjeto: string;
    public pontosTipoProjeto: number;
   



    public static async listar(): Promise<TipoProjeto[]> {
        let lista: TipoProjeto[] = null;

        await Sql.conectar(async (sql: Sql) => {
            lista = await sql.query("select * from tipo_projeto") as TipoProjeto[]
        })
        return lista
    }


}