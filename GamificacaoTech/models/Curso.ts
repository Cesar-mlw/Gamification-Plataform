export = class Curso {
    public id: number;
    public nome: string;

    private static validar(c: Curso): string {
        c.nome = (c.nome || "").trim().toUpperCase()
        if (c.nome.length < 3 || c.nome.length > 50)
            return "Nome inválido";
        return null;
    }

    public static criar(c: Curso): string {
        let res: string;
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
    public static listar(): Curso[] {
        let lista: Curso[] = [
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
    public static obter(id: number): Curso {
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
    public static alterar(c: Curso): string {
        let res: string;
        if ((res = Curso.validar(c)))
            return res;

        if ((c.id !== 1 && c.nome === "ANÁLISE") ||
            (c.id !== 2 && c.nome === "BANCO") ||
            (c.id !== 3 && c.nome === "SISTEMAS"))
            res = `O curso "${c.nome}" já existe`;

        return res;
    }
    public static excluir(id: number): string {
        let res: string = null;

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
}