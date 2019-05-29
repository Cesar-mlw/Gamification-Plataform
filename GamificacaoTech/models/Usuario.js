"use strict";
const Sql = require("../infra/sql");
const GeradorHash = require("../utils/geradorHash");
module.exports = class Usuario {
    static validar(u) {
        let resp;
        return resp;
    }
    static async listar() {
        let lista = null;
        await Sql.conectar(async (sql) => {
            lista = await sql.query("select u.ra_usuario, u.nome_usuario, u.semestre_usuario, u.email_usuario, u.pontos_bi, u.pontos_dev, u.pontos_games, u.pontos_inov, u.pontos_outros,  u.dt_entrada_usuario, c.nome_curso from usuario u, curso c where u.id_curso = c.id_curso order by ra_usuario");
        });
        return lista;
    }
    static async criar(u) {
        let res;
        u.senha_usuario = await GeradorHash.criarHash(u.senha_usuario);
        if ((res = Usuario.validar(u)))
            return res;
        await Sql.conectar(async (sql) => {
            try {
                await sql.query("insert into usuario (ra_usuario, nome_usuario, semestre_usuario, email_usuario, pontos_bi, pontos_dev, pontos_games, pontos_inov, pontos_outros, dt_entrada_usuario, id_curso, senha_usuario) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [u.ra_usuario, u.nome_usuario, u.semestre_usuario, u.email_usuario, u.pontos_bi, u.pontos_dev, u.pontos_games, u.pontos_inov, u.pontos_outros, u.dt_entrada_usuario, u.id_curso, u.senha_usuario]);
            }
            catch (e) {
                if (e.code && e.code === "ER_DUP_ENTRY")
                    res = `O RA ${u.ra_usuario.toString()} já está em uso`;
                else
                    throw e;
            }
        });
        return res;
    }
    static async obter(id) {
        let lista = null;
        await Sql.conectar(async (sql) => {
            lista = await sql.query("select u.ra_usuario, u.pontos_bi, u.pontos_dev, u.pontos_games, u.pontos_inov, u.pontos_outros, u.nome_usuario, u.semestre_usuario, u.email_usuario, u.dt_entrada_usuario, c.nome_curso from usuario u, curso c where ra_usuario = ? and u.id_curso = c.id_curso", [id]);
        });
        return ((lista && lista[0]) || null);
    }
    static async alterar(u) {
        let res;
        await Sql.conectar(async (sql) => {
            await sql.query("update usuario set nome_usuario = ?, id_curso = ?, semestre_usuario = ?, email_usuario = ?, ra_usuario = ?", [u.ra_usuario, u.nome_usuario, u.id_curso, u.semestre_usuario, u.email_usuario, u.pontos_bi, u.pontos_dev, u.pontos_games, u.pontos_inov, u.pontos_outros]);
            if (!sql.linhasAfetadas)
                res = "Usuário Inexistente";
        });
        return res;
    }
    static async deletar(ra) {
        let res = true;
        await Sql.conectar(async (sql) => {
            await sql.query("delete from usuario where ra_usuario = ?", [ra]);
            if (!sql.linhasAfetadas)
                res = false;
        });
        return res;
    }
    static async efetuarLogin(ra, senha) {
        let res = true;
        await Sql.conectar(async (sql) => {
            let hash;
            hash = await sql.query("select senha_usuario from usuario where ra_usuario = ?", [ra]);
            if (!await GeradorHash.validarSenha(senha, hash[0].senha_usuario)) {
                res = false;
            }
        });
        return res;
    }
};
//# sourceMappingURL=Usuario.js.map