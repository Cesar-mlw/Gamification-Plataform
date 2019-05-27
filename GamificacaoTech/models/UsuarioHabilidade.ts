import Sql = require("../infra/sql")
import GeradorHash = require("../utils/geradorHash")


export = class UsuarioHabilidade {

    public id: number;
    public idUsuario: number;
    public idHabilidade: number;
    public idNivelProficiencia: string;






    public static async validar(uh: UsuarioHabilidade): Promise<boolean> {
        let resp = true
        let lista: UsuarioHabilidade[] = null
        await Sql.conectar(async (sql: Sql) => {
            lista = await sql.query("select * from usuario_habilidade where id_usuario_usuario_habilidade = ? and id_habilidade_usuario_habilidade = ?", [uh.idUsuario, uh.idHabilidade])
            if(lista != null || lista.length != 0) resp = false
        })
        return resp
    }

    public static async obter(ra:number): Promise<UsuarioHabilidade[]> {
        let lista: UsuarioHabilidade[] = null;

        await Sql.conectar(async (sql: Sql) => {
            lista = await sql.query("select * from usuario_habilidade where id_usuario_usuario_habilidade = ?", [ra]) as UsuarioHabilidade[]
        })
        return lista
    }

    public static async criar(uh: UsuarioHabilidade): Promise<string> {
        let resp: string
        console.log(this.validar(uh))
            await Sql.conectar(async (sql: Sql) => {
                try {
                    await sql.query("insert into usuario_habilidade (id_usuario_usuario_habilidade, id_habilidade_usuario_habilidade, id_nivel_proficiencia_usuario_habilidade) values (?, ?, ?)", [uh.idUsuario, uh.idHabilidade, uh.idNivelProficiencia])
                }
                catch (e) {
                    if (e.code && e.code == "ER_DUP_ENTRY") {
                        resp = "Error"
                    }
                }
            })
               

        return resp
    }




}