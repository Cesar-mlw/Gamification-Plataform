import express = require("express")
import wrap = require("express-async-error-wrapper");
import Projeto = require("../../models/Informacao");

const router = express.Router()

router.post("/criar", wrap(async (req: express.Request, res: express.Response) => {
    let i = req.body as Informacao
    let erro = await Informacao.criar(i)

    if (erro) {
        res.statusCode = 400
        res.json(erro)
    }
    else {
        res.json("Informacao criada")
    }

}))

router.get("/listar", wrap(async (req: express.Request, res: express.Response) => {
    let lista = await Informacao.listar()

    res.json(lista)
}))

router.post("/deletar", wrap(async (req: express.Request, res: express.Response) => {
    let idInformacao = req.body.idInformacao
    let i = await Projeto.deletar(idInformacao)
    if (i == false) {

        res.json("Informacao não encontrada")
    }

    else {
        res.json("Informacao deletada")
    }
}))

router.get("/obter", wrap(async (req: express.Request, res: express.Response) => {
    let idInformacao = req.query.idInformacao
    let i = await Informacao.obter(idInformacao)
    res.json(i)
}))

router.post("/alterar", wrap(async (req: express.Request, res: express.Response) => {
    let i = req.body as Informacao
    let erro = await Informacao.alterar(i)

    if (erro) {

        res.json("Informação inexistente")
    }

    else {
        res.json("Informação alterada!")
    }


}))

export = router;