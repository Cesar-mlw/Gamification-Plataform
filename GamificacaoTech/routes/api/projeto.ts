import express = require("express")
import wrap = require("express-async-error-wrapper");
import Projeto = require("../../models/Projeto");

const router = express.Router()


router.post("/criar", wrap(async (req: express.Request, res: express.Response) => {
    let p = req.body as Projeto
    let erro = await Projeto.criar(p)
    console.log(req.body)

    if (erro) {
        res.statusCode = 400
        res.json(erro)
    }
    else {
        res.json("Projeto criado")
    }

}))

router.get("/listar", wrap(async (req: express.Request, res: express.Response) => {
    let lista = await Projeto.listar()

    res.json(lista)
}))

router.post("/deletar", wrap(async (req: express.Request, res: express.Response) => {
    let idProjeto = req.body.idProjeto
    let p = await Projeto.deletar(idProjeto) //aqui coloco a variável como escreve no modelo Projeto ou como ta na tabela no workbench??
    if (p == false) {

        res.json("Projeto não encontrado")
    }

    else {
        res.json("Projeto deletado")
    }
}))


router.get("/obter", wrap(async (req: express.Request, res: express.Response) => {
    let idProjeto = req.query.idProjeto
    let p = await Projeto.obter(idProjeto)
    res.json(p)
}))

router.post("/alterar", wrap(async (req: express.Request, res: express.Response) => {
    let p = req.body as Projeto
    let erro = await Projeto.alterar(p)
    console.log(erro)

    if (erro) {

        res.json("Este projeto não existe")
    }

    else {
        res.json("Projeto alterado!")
    }


}))

export = router;