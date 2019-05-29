import Sql = require("../infra/sql")


export = class Noticia {

    public id_noticia: number;
    public nome_noticia: string;
    public corpo_noticia: string;
    public autor_noticia: number;




    public static async listar(): Promise<Noticia[]> {
        let lista: Noticia[] = null;

        await Sql.conectar(async (sql: Sql) => {
            lista = await sql.query("select * from noticia") as Noticia[]
        })
        return lista
    }


}