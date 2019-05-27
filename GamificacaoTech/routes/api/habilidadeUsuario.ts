import express = require("express")
import wrap = require("express-async-error-wrapper");
import UsuarioHabilidade = require("../../models/UsuarioHabilidade");

const router = express.Router()


router.post("/criar", wrap(async (req: express.Request, res: express.Response) => {
    let p = req.body as UsuarioHabilidade
    let erro = await UsuarioHabilidade.criar(p)

    if (erro) {
        res.statusCode = 400
        res.json(erro)
    }
    else {
        res.json("Habilidade Registrada")
    }

}))

export = router;