"use strict";
module.exports = class Curso {
    static validar(c) {
        c.nome = (c.nome || "").trim().toUpperCase();
        if (c.nome.length < 3 || c.nome.length > 50)
            return "Nome inválido";
        return null;
    }
    static criar(c) {
        let res;
        if ((res = Curso.validar(c)))
            return res;
        switch (c.nome) {
            case "ANÁLISE":
            case "BANCO":
            case "SISTEMAS":
                res = `O curso "${c.nome}" já existe`;
                break;
        }
        return res;
    }
    static listar() {
        let lista = [
            {
                id: 1,
                nome: "ANÁLISE"
            },
            {
                id: 2,
                nome: "BANCO"
            },
            {
                id: 3,
                nome: "SISTEMAS"
            },
        ];
        return lista;
    }
    static obter(id) {
        switch (id) {
            case 1:
                return {
                    id: 1,
                    nome: "ANÁLISE"
                };
            case 2:
                return {
                    id: 2,
                    nome: "BANCO"
                };
            case 3:
                return {
                    id: 3,
                    nome: "SISTEMAS"
                };
        }
        return null;
    }
    static alterar(c) {
        let res;
        if ((res = Curso.validar(c)))
            return res;
        if ((c.id !== 1 && c.nome === "ANÁLISE") ||
            (c.id !== 2 && c.nome === "BANCO") ||
            (c.id !== 3 && c.nome === "SISTEMAS"))
            res = `O curso "${c.nome}" já existe`;
        return res;
    }
    static excluir(id) {
        let res = null;
        switch (id) {
            case 1:
            case 2:
            case 3:
                break;
            default:
                res = "Curso inexistente";
                break;
        }
        return res;
    }
};
//# sourceMappingURL=Curso.js.map