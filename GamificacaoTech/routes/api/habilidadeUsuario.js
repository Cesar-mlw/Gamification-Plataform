"use strict";
const express = require("express");
const wrap = require("express-async-error-wrapper");
const UsuarioHabilidade = require("../../models/UsuarioHabilidade");
const router = express.Router();
router.post("/criar", wrap(async (req, res) => {
    let p = req.body;
    let erro = await UsuarioHabilidade.criar(p);
    if (erro) {
        res.statusCode = 400;
        res.json(erro);
    }
    else {
        res.json("Habilidade Registrada");
    }
}));
module.exports = router;
//# sourceMappingURL=habilidadeUsuario.js.map