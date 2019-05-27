import Sql = require("../infra/sql")
import GeradorHash = require("../utils/geradorHash")

export = class Achievement {

    public idAchievement: number;
    public nome: string;
    public criterio: string;


    public static validar(a: Achievement): string {
        let resp: string
        return resp
    }

    public static async listar(): Promise<Achievement[]> {
        let lista: Achievement[] = null;

        await Sql.conectar(async (sql: Sql) => {
            lista = await sql.query("select a.id_achievement, a.nome_achievement, a.criterio_achievement from achievement a") as Achievement[]
        })

        return lista
    }

    public static async criar(a: Achievement): Promise<string> {
        let res: string;

        if ((res = Achievement.validar(a)))
            return res

        await Sql.conectar(async (sql: Sql) => {
            try {
                await sql.query("insert into achievement (id_achievement, nome_achievement, criterio_achievement) values (?, ?, ?)", [a.idAchievement, a.nome, a.criterio])
            } catch (e) {
                if (e.code && e.code === "ER_DUP_ENTRY")
                    res = `O ID ${a.idAchievement.toString()} já está em uso`
                else
                    throw e
            }
        })

        return res
    }

    public static async obter(id: number): Promise<Achievement> {
        let lista: Achievement[] = null

        await Sql.conectar(async (sql: Sql) => {
            lista = await sql.query("select a.id_achievement, a.nome_achievement, a.criterio_achievement from achievement a where id_achievement = ? ", [id]) as Achievement[]
        })

        return ((lista && lista[0]) || null)
    }

    public static async alterar(a: Achievement): Promise<string> {
        let res: string;

        await Sql.conectar(async (sql: Sql) => {
            await sql.query("update achievement set nome_achievement = ?, criterio_achievement = ?", [a.nome, a.criterio])
            if (!sql.linhasAfetadas)
                res = "Achievement Inexistente"
        })

        return res
    }

    public static async deletar(idAchievement: number): Promise<boolean> {
        let res: boolean = true;

        await Sql.conectar(async (sql: Sql) => {
            await sql.query("delete from achievement where id_achievement = ?", [idAchievement])
            if (!sql.linhasAfetadas)
                res = false
        })

        return res
    }


}