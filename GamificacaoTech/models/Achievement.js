"use strict";
const Sql = require("../infra/sql");
module.exports = class Achievement {
    static validar(a) {
        let resp;
        return resp;
    }
    static async listar() {
        let lista = null;
        await Sql.conectar(async (sql) => {
            lista = await sql.query("select a.id_achievement, a.nome_achievement, a.criterio_achievement from achievement a");
        });
        return lista;
    }
    static async criar(a) {
        let res;
        if ((res = Achievement.validar(a)))
            return res;
        await Sql.conectar(async (sql) => {
            try {
                await sql.query("insert into achievement (id_achievement, nome_achievement, criterio_achievement) values (?, ?, ?)", [a.idAchievement, a.nome, a.criterio]);
            }
            catch (e) {
                if (e.code && e.code === "ER_DUP_ENTRY")
                    res = `O ID ${a.idAchievement.toString()} já está em uso`;
                else
                    throw e;
            }
        });
        return res;
    }
    static async obter(id) {
        let lista = null;
        await Sql.conectar(async (sql) => {
            lista = await sql.query("select a.id_achievement, a.nome_achievement, a.criterio_achievement from achievement a where id_achievement = ? ", [id]);
        });
        return ((lista && lista[0]) || null);
    }
    static async alterar(a) {
        let res;
        await Sql.conectar(async (sql) => {
            await sql.query("update achievement set nome_achievement = ?, criterio_achievement = ?", [a.nome, a.criterio]);
            if (!sql.linhasAfetadas)
                res = "Achievement Inexistente";
        });
        return res;
    }
    static async deletar(idAchievement) {
        let res = true;
        await Sql.conectar(async (sql) => {
            await sql.query("delete from achievement where id_achievement = ?", [idAchievement]);
            if (!sql.linhasAfetadas)
                res = false;
        });
        return res;
    }
};
//# sourceMappingURL=Achievement.js.map