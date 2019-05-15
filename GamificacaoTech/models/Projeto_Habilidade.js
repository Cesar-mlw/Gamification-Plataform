"use strict";
const Sql = require("../infra/sql");
module.exports = class ProjetoHabilidade {
    static async obterProjeto(idProjeto) {
        let lista;
        await Sql.conectar(async (sql) => {
            lista = sql.query("select p.nome_projeto, h.nome_habilidade from projeto_habilidade g, projeto p, habilidade h where g. ");
        });
    }
};
//# sourceMappingURL=Projeto_Habilidade.js.map