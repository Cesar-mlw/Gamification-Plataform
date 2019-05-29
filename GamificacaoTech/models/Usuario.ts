import Sql = require("../infra/sql")
import GeradorHash = require("../utils/geradorHash")

export = class Usuario {


    public ra_usuario: number;
    public nome_usuario: string;
    public id_curso: number;
    public semestre_usuario: number;
    public email_usuario: string;
    public pontos_bi: number;
    public pontos_dev: number;
    public pontos_games: number;
    public pontos_inov: number;
    public pontos_outros: number;
    public dt_entrada_usuario: string;
    public senha_usuario: string;

    public static validar(u: Usuario): string {
        let resp: string
        return resp
    }

    public static async listar(): Promise<Usuario[]> {
        let lista: Usuario[] = null;

        await Sql.conectar(async (sql: Sql) => {
            lista = await sql.query("select u.ra_usuario, u.nome_usuario, u.semestre_usuario, u.email_usuario, u.pontos_bi, u.pontos_dev, u.pontos_games, u.pontos_inov, u.pontos_outros,  u.dt_entrada_usuario, c.nome_curso from usuario u, curso c where u.id_curso = c.id_curso order by ra_usuario") as Usuario[]
        })
        return lista
    }

    public static async criar(u: Usuario): Promise<string> { //Dados a serem passados - ra: number / nome: string / curso: number / semestre: number / email: string / dt_entrada_usuario
        let res: string;
        u.senha_usuario = await GeradorHash.criarHash(u.senha_usuario)
        if ((res = Usuario.validar(u)))
            return res

        await Sql.conectar(async (sql: Sql) => {
            try {
                await sql.query("insert into usuario (ra_usuario, nome_usuario, semestre_usuario, email_usuario, pontos_bi, pontos_dev, pontos_games, pontos_inov, pontos_outros, dt_entrada_usuario, id_curso, senha_usuario) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [u.ra_usuario, u.nome_usuario, u.semestre_usuario, u.email_usuario, u.pontos_bi, u.pontos_dev, u.pontos_games, u.pontos_inov, u.pontos_outros, u.dt_entrada_usuario, u.id_curso, u.senha_usuario])
            } catch (e) {
                if (e.code && e.code === "ER_DUP_ENTRY")
                    res = `O RA ${u.ra_usuario.toString()} já está em uso`
                else
                    throw e
            }
        })

        return res
    }

    public static async obter(id: number): Promise<Usuario> {
        let lista: Usuario[] = null

        await Sql.conectar(async (sql: Sql) => {
            lista = await sql.query("select u.ra_usuario, u.pontos_bi, u.pontos_dev, u.pontos_games, u.pontos_inov, u.pontos_outros, u.nome_usuario, u.semestre_usuario, u.email_usuario, u.dt_entrada_usuario, c.nome_curso from usuario u, curso c where ra_usuario = ? and u.id_curso = c.id_curso", [id]) as Usuario[]
        })

        return ((lista && lista[0]) || null)
    }

    public static async alterar(u: Usuario): Promise<string> {// 
        let res: string;

        await Sql.conectar(async (sql: Sql) => {
            await sql.query("update usuario set nome_usuario = ?, id_curso = ?, semestre_usuario = ?, email_usuario = ?, ra_usuario = ?", [u.ra_usuario, u.nome_usuario, u.id_curso, u.semestre_usuario, u.email_usuario, u.pontos_bi, u.pontos_dev, u.pontos_games, u.pontos_inov, u.pontos_outros])
            if (!sql.linhasAfetadas)
                res = "Usuário Inexistente"
        })

        return res
    }

    public static async deletar(ra: number): Promise<boolean> {
        let res: boolean = true;

        await Sql.conectar(async (sql: Sql) => {
            await sql.query("delete from usuario where ra_usuario = ?", [ra])
            if (!sql.linhasAfetadas)
                res = false
        })

        return res
    }

    public static async efetuarLogin(ra: number, senha: string): Promise<boolean> {//parametros a serem passados - ra: number / senha: string
        let res: boolean = true;
        await Sql.conectar(async (sql: Sql) => {
            let hash
            hash = await sql.query("select senha_usuario from usuario where ra_usuario = ?", [ra])
            if (!await GeradorHash.validarSenha(senha, hash[0].senha_usuario)) {
                res = false
            }
        })

        return res
    }
}