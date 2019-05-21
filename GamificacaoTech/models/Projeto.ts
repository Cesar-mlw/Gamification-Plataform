import Sql = require("../infra/sql")
import GeradorHash = require("../utils/geradorHash")


export = class Projeto {

    public ra: number;
    public idArea: number;
    public idTipoProjeto: number;
    public nome: string;
    public terminado: number;
    public local: string;
    public descricao: string;
    public pontosExtra: number;


    public static validar(p: Projeto): string {
        let resp: string
        return resp
    }

    public static async listar(): Promise<Projeto[]> {
        let lista: Projeto[] = null;

        await Sql.conectar(async (sql: Sql) => {
            lista = await sql.query("select t.nome_tipo_projeto, p.id_projeto, p.fk_id_area, p.fk_ra_usuario, p.fk_id_tipo_projeto, p.nome_projeto, p.terminado_projeto, p.local_projeto, p.descricao_projeto, p.pontos_extra from projeto p, tipo_projeto t where t.id_tipo_projeto = p.fk_id_tipo_projeto") as Projeto[]
        })

        return lista
    }

    public static async criar(p: Projeto): Promise<string> {
        let res: string;
        //u.senha = await GeradorHash.criarHash(u.senha)
        if ((res = Projeto.validar(p)))
            return res

        await Sql.conectar(async (sql: Sql) => {
            try {
                await sql.query("insert into projeto (fk_ra_usuario, fk_id_tipo_projeto, fk_id_area, nome_projeto, terminado_projeto, local_projeto, descricao_projeto, pontos_extra) values (?, ?, ?, ?, ?, ?, ?, ?)", [p.ra, p.idTipoProjeto, p.idArea, p.nome, p.terminado, p.local, p.descricao, p.pontosExtra])
            } catch (e) {
                if (e.code && e.code === "ER_DUP_ENTRY")
                    res = `O ID ${p.nome.toString()} já está em uso`
                else
                    throw e
            }
        })

        return res
    }

    public static async obter(id: number): Promise<Projeto> {
        let lista: Projeto[] = null

        await Sql.conectar(async (sql: Sql) => {
            lista = await sql.query("select p.id_projeto, a.nome_area, p.nome_projeto, p.terminado_projeto, p.local_projeto, p.descricao_projeto, t.nome_tipo_projeto from projeto p, tipo_projeto t, area a where id_projeto = ? and p.fk_id_tipo_projeto = t.id_tipo_projeto and p.fk_id_area = a.id_area", [id]) as Projeto[]
        })

        return ((lista && lista[0]) || null)
    }


    public static async alterar(p: Projeto): Promise<string> {
        let res: string;

        await Sql.conectar(async (sql: Sql) => {
            await sql.query("update projeto set  fk_id_tipo_projeto = ?, nome_projeto = ?, fk_id_area = ?, local_projeto = ?, descricao_projeto = ?", [p.idTipoProjeto, p.nome, p.idArea, p.local, p.descricao]) //coloca as duas Fks e o terminado??
            if (!sql.linhasAfetadas)
                res = "Projeto Inexistente"
        })

        return res
    }

    public static async deletar(idProjeto: number): Promise<boolean> {
        let res: boolean = true;

        await Sql.conectar(async (sql: Sql) => {
            await sql.query("delete from projeto where id_projeto = ?", [idProjeto])
            if (!sql.linhasAfetadas)
                res = false
        })

        return res
    }

}