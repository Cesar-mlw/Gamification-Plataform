import Sql = require("../infra/sql")
import GeradorHash = require("../utils/geradorHash")

export = class AchievementUsuario {

    public id_achievement_usuario: number;
    public fk_achievement_id: number;
    public fk_usuario_id: number;
    public dt_semestre_achievement: number;


    public static validar(a: AchievementUsuario): string {
        let resp: string
        return resp
    }

    public static async listar(): Promise<string> {
        let lista: string = null;

        await Sql.conectar(async (sql: Sql) => {
            lista = JSON.stringify(await sql.query("select a.id_achievement, a.nome_achievement, a.criterio_achievement from achievement a, achievement_usuario u where a.id_achievement = u.fk_achievement_id"))
        })

        return lista
    }

    public static async criar(a: AchievementUsuario): Promise<string> {
        let res: string;

        await Sql.conectar(async (sql: Sql) => {
            try {
                await sql.query("insert into achievement (fk_achievement_id, fk_usuario_id, dt_semestre_achievement) values (?, ?, ?)", [a.fk_achievement_id, a.fk_achievement_id, a.dt_semestre_achievement])
            } catch (e) {
                if (e.code && e.code === "ER_DUP_ENTRY")
                    res = `já está em uso`
                else
                    throw e
            }
        })

        return res
    }

    public static async obterCompletado(ra: number): Promise<string> {
        let lista: string = null

        await Sql.conectar(async (sql: Sql) => {
            lista = JSON.stringify(await sql.query("select a.id_achievement, a.nome_achievement, a.criterio_achievement from achievement a, achievement_usuario u where fk_usuario_id = ? and a.id_achievement = u.fk_achievement_id", [ra]))
            console.log(lista)
        })

        return lista
    }
    public static async obterNaoCompletado(ra: number): Promise<string> {
        let lista: string = null

        await Sql.conectar(async (sql: Sql) => {
            lista = JSON.stringify(await sql.query("select a.id_achievement, a.nome_achievement, a.criterio_achievement from achievement a, achievement_usuario u where fk_usuario_id != ? and a.id_achievement = u.fk_achievement_id", [ra]))
        })

        return lista
    }


}