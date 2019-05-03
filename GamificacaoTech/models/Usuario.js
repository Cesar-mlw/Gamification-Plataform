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
            lista = await sql.query("select ra_usuario, nome_usuario, curso_usuario, fk_id_usuario, semestre_usuario, dt_entrada_usuario, email_usuario from usuario order by asc");
        });
        return (lista || []);
    }
    static async criar(u) {
        let res;
        u.senha = await GeradorHash.criarHash(u.senha);
        //let month = u.dt_entrada_usuario.getMonth()
        //let year = u.dt_entrada_usuario.getFullYear()
        //let date = u.dt_entrada_usuario.getDate()
        //let dt_entrada_usuario:string = (year.toString() + "-" + month.toString() + "-" + date.toString())
        if ((res = Usuario.validar(u)))
            return res;
        await Sql.conectar(async (sql) => {
            try {
                await sql.query("insert into usuario (ra_usuario, nome_usuario, semestre_usuario, email_usuario, dt_entrada_usuario, id_curso, senha_usuario) values (?, ?, ?, ?, ?, ?, ?)", [u.ra, u.nome, u.semestre, u.email, u.dt_entrada_usuario, u.curso, u.senha]);
            }
            catch (e) {
                if (e.code && e.code === "ER_DUP_ENTRY")
                    res = `O RA ${u.ra.toString()} já está em uso`;
                else
                    throw e;
            }
        });
        return res;
    }
    static async obter(id) {
        let lista = null;
        await Sql.conectar(async (sql) => {
            lista = await sql.query("select u.ra_usuario, u.nome_usuario, u.semestre_usuario, u.email_usuario, u.dt_entrada_usuario, c.nome_curso from usuario u, curso c where ra_usuario = ? and u.id_curso = c.id_curso", [id]);
        });
        return ((lista && lista[0]) || null);
    }
    static async alterar(u) {
        let res;
        await Sql.conectar(async (sql) => {
            await sql.query("update usuario set nome_usuario = ?, id_curso = ?, semestre_usuario = ?, email_usuario = ?, ra_usuario = ?", [u.nome, u.curso, u.semestre, u.email, u.ra]);
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