import Sql = require("../infra/sql")

export = class Usuario {
    public ra: number;
    public nome: string;
    public id_quarto: number;
    public curso: string;
    public semestre: string;
    public email: string;

    public static validar(u: Usuario): string {
        u.nome = (u.nome || "").trim().toUpperCase()
        let ra: string = u.ra.toString()
        let resp: string = ""
        if (u.nome.length < 3 || u.nome.length > 50)
            resp = "Nome inválido"
        if (ra.length < 5 || ra.length > 8) {
            resp = "RA Inválido"
        }
        if (u.curso != "TECH") { //TODO: Implement all courses
            resp = "Curso Inválido"
        }
        return resp
    }

    public static async listar(): Promise<Usuario[]> {
        let lista: Usuario[] = null;

        await Sql.conectar(async (sql: Sql) => {
            lista = await sql.query("select ra_usuario, nome_usuario, curso_usuario, fk_id_usuario, semestre_usuario, dt_entrada_usuario, email_usuario from usuario order by asc") as Usuario[]
        })

        return (lista || [])
    }
}