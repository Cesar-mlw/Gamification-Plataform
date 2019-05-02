"use strict";
const express = require("express");
const wrap = require("express-async-error-wrapper");
const Usuario = require("../../models/Usuario");
const router = express.Router();
router.post("/criar", wrap(async (req, res) => {
    let u = req.body;
    let erro = await Usuario.criar(u);
    if (erro) {
        res.statusCode = 400;
        res.json(erro);
    }
    else {
        res.json("Usuário criado");
        res.statusCode = 204;
    }
}));
router.get("/obter", wrap(async (req, res) => {
    let ra = req.query.ra;
    let u = await Usuario.obter(ra);
    res.json(u);
}));
module.exports = router;
//# sourceMappingURL=usuario.js.map