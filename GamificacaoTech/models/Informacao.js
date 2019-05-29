"use strict";
const Sql = require("../infra/sql");
module.exports = class Informacao {
    static validar(i) {
        let resp;
        return resp;
    }
    static async listar() {
        let lista = null;
        await Sql.conectar(async (sql) => {
            lista = await sql.query("select i.id_informacao, t.nome_tipo_informacao, i.nome_informacao, i.texto_informacao, i.local_informacao, i.fk_id_area from informacao i, tipo_informacao t where t.id_tipo_informacao = i.fk_id_tipo_informacao");
        });
        return lista;
    }
    static async criar(i) {
        let res;
        if ((res = Informacao.validar(i)))
            return res;
        await Sql.conectar(async (sql) => {
            try {
                await sql.query("insert into informacao (id_informacao, fk_id_tipo_informacao, nome_informacao, texto_informacao, local_informacao, fk_id_area) values (?, ?, ?, ?, ?, ?)", [i.idInformacao, i.idTipoInformacao, i.nome, i.texto, i.local, i.idArea]);
            }
            catch (e) {
                if (e.code && e.code === "ER_DUP_ENTRY")
                    res = `O ID ${i.idInformacao.toString()} já está em uso`;
                else
                    throw e;
            }
        });
        return res;
    }
    static async obter(id) {
        let lista = null;
        await Sql.conectar(async (sql) => {
            lista = await sql.query("select i.id_informacao, t.nome_tipo_informacao, a.nome_area, i.nome_informacao, i.texto_informacao, i.local_informacao from informacao i, tipo_informacao t, area a where id_informacao = ? and i.fk_id_tipo_informacao = t.id_tipo_informacao and i.fk_id_area = a.id_area", [id]);
        });
        return ((lista && lista[0]) || null);
    }
    static async alterar(i) {
        let res;
        await Sql.conectar(async (sql) => {
            await sql.query("update informacao set fk_id_tipo_informacao = ?, nome_informacao = ?, texto_informacao = ?, local_informacao = ?, fk_id_area = ?", [i.idTipoInformacao, i.nome, i.texto, i.local, i.idArea]);
            if (!sql.linhasAfetadas)
                res = "Informacao Inexistente";
        });
        return res;
    }
    static async deletar(idInformacao) {
        let res = true;
        await Sql.conectar(async (sql) => {
            await sql.query("delete from informacao where id_informacao = ?", [idInformacao]);
            if (!sql.linhasAfetadas)
                res = false;
        });
        return res;
    }
};
//# sourceMappingURL=Informacao.js.map