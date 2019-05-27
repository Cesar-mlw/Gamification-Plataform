import Sql = require("../infra/sql")
import GeradorHash = require("../utils/geradorHash")

export = class Informacao {

    public idInformacao: number;
    public idTipoInformacao: number;
    public nome: string;
    public texto: string;
    public local: string;
    public idArea: number;

    public static validar(i: Informacao): string {
        let resp: string
        return resp
    }

    public static async listar(): Promise<Informacao[]> {
        let lista: Informacao[] = null;

        await Sql.conectar(async (sql: Sql) => {
            lista = await sql.query("select i.id_informacao, t.nome_tipo_informacao, i.nome_informacao, i.texto_informacao, i.local_informacao, i.fk_id_area from informacao i, tipo_informacao t where t.id_tipo_informacao = i.fk_id_tipo_informacao") as Informacao[]
        })

        return lista
    }

    public static async criar(i: Informacao): Promise<string> {
        let res: string;

        if ((res = Informacao.validar(i)))
            return res

        await Sql.conectar(async (sql: Sql) => {
            try {
                await sql.query("insert into informacao (id_informacao, fk_id_tipo_informacao, nome_informacao, texto_informacao, local_informacao, fk_id_area) values (?, ?, ?, ?, ?, ?)", [i.idInformacao, i.idTipoInformacao, i.nome, i.texto, i.local, i.idArea])
            } catch (e) {
                if (e.code && e.code === "ER_DUP_ENTRY")
                    res = `O ID ${i.idInformacao.toString()} já está em uso`
                else
                    throw e
            }
        })

        return res
    }

    public static async obter(id: number): Promise<Informacao> {
        let lista: Informacao[] = null

        await Sql.conectar(async (sql: Sql) => {
            lista = await sql.query("select i.id_informacao, t.nome_tipo_informacao, a.nome_area, i.nome_informacao, i.texto_informacao, i.local_informacao from informacao i, tipo_informacao t, area a where id_informacao = ? and i.fk_id_tipo_informacao = t.id_tipo_informacao and i.fk_id_area = a.id_area", [id]) as Informacao[]
        })

        return ((lista && lista[0]) || null)
    }

    public static async alterar(i: Informacao): Promise<string> { //pode alterar o id??
        let res: string;

        await Sql.conectar(async (sql: Sql) => {
            await sql.query("update informacao set fk_id_tipo_informacao = ?, nome_informacao = ?, texto_informacao = ?, local_informacao = ?, fk_id_area = ?", [i.idTipoInformacao, i.nome, i.texto, i.local, i.idArea])
            if (!sql.linhasAfetadas)
                res = "Informacao Inexistente"
        })

        return res
    }

    public static async deletar(idInformacao: number): Promise<boolean> {
        let res: boolean = true;

        await Sql.conectar(async (sql: Sql) => {
            await sql.query("delete from informacao where id_informacao = ?", [idInformacao])
            if (!sql.linhasAfetadas)
                res = false
        })

        return res
    }

}