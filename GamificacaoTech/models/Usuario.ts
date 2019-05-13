import Sql = require("../infra/sql")
import GeradorHash = require("../utils/geradorHash")

export = class Usuario {


    public ra: number;
    public nome: string;
    public curso: number;
    public semestre: number;
    public email: string;
    public dt_entrada_usuario: string;
    public senha: string;

    public static validar(u: Usuario): string {
        let resp: string
        return resp
    }

    public static async listar(): Promise<Usuario[]> {
        let lista: Usuario[] = null;

        await Sql.conectar(async (sql: Sql) => {
            lista = await sql.query("select u.ra_usuario, u.nome_usuario, u.semestre_usuario, u.email_usuario, u.dt_entrada_usuario, c.nome_curso from usuario u, curso c where u.id_curso = c.id_curso order by ra_usuario") as Usuario[]
        })
        return lista
    }

    public static async criar(u: Usuario): Promise<string> { //Dados a serem passados - ra: number / nome: string / curso: number / semestre: number / email: string / dt_entrada_usuario
        let res: string;
        u.senha = await GeradorHash.criarHash(u.senha)
        if ((res = Usuario.validar(u)))
            return res

        await Sql.conectar(async (sql: Sql) => {
            try {
                await sql.query("insert into usuario (ra_usuario, nome_usuario, semestre_usuario, email_usuario, dt_entrada_usuario, id_curso, senha_usuario) values (?, ?, ?, ?, ?, ?, ?)", [u.ra, u.nome, u.semestre, u.email, u.dt_entrada_usuario, u.curso, u.senha])
            } catch (e) {
                if (e.code && e.code === "ER_DUP_ENTRY")
                    res = `O RA ${u.ra.toString()} já está em uso`
                else
                    throw e
            }
        })

        return res
    }

    public static async obter(id: number): Promise<Usuario> {
        let lista: Usuario[] = null

        await Sql.conectar(async (sql: Sql) => {
            lista = await sql.query("select u.ra_usuario, u.nome_usuario, u.semestre_usuario, u.email_usuario, u.dt_entrada_usuario, c.nome_curso from usuario u, curso c where ra_usuario = ? and u.id_curso = c.id_curso", [id]) as Usuario[]
        })

        return ((lista && lista[0]) || null)
    }

    public static async alterar(u: Usuario): Promise<string> {// 
        let res: string;

        await Sql.conectar(async (sql: Sql) => {
            await sql.query("update usuario set nome_usuario = ?, id_curso = ?, semestre_usuario = ?, email_usuario = ?, ra_usuario = ?", [u.nome, u.curso, u.semestre, u.email, u.ra])
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


