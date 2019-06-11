"use strict";
const Sql = require("../infra/sql");
module.exports = class AchievementUsuario {
    static validar(a) {
        let resp;
        return resp;
    }
    static async listar() {
        let lista = null;
        await Sql.conectar(async (sql) => {
            lista = JSON.stringify(await sql.query("select a.id_achievement, a.nome_achievement, a.criterio_achievement from achievement a, achievement_usuario u where a.id_achievement = u.fk_achievement_id"));
        });
        return lista;
    }
    static async criar(a) {
        let res;
        await Sql.conectar(async (sql) => {
            try {
                await sql.query("insert into achievement (fk_achievement_id, fk_usuario_id, dt_semestre_achievement) values (?, ?, ?)", [a.fk_achievement_id, a.fk_achievement_id, a.dt_semestre_achievement]);
            }
            catch (e) {
                if (e.code && e.code === "ER_DUP_ENTRY")
                    res = `já está em uso`;
                else
                    throw e;
            }
        });
        return res;
    }
    static async obterCompletado(ra) {
        let lista = null;
        await Sql.conectar(async (sql) => {
            lista = JSON.stringify(await sql.query("select a.id_achievement, a.nome_achievement, a.criterio_achievement, a.area_achievement from achievement a, achievement_usuario u where fk_usuario_id = ? and a.id_achievement = u.fk_achievement_id", [ra]));
        });
        return lista;
    }
    static async obterNaoCompletado(ra) {
        let lista = null;
        await Sql.conectar(async (sql) => {
            lista = JSON.stringify(await sql.query("select * from achievement a where a.id_achievement not in (select fk_achievement_id from achievement_usuario where fk_usuario_id = ?);", [ra]));
        });
        return lista;
    }
};
//# sourceMappingURL=AchievementUsuario.js.map