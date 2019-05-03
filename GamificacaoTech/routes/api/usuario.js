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
    }
}));
router.get("/obter", wrap(async (req, res) => {
    let ra = req.query.ra;
    let u = await Usuario.obter(ra);
    res.json(u);
}));
//criar rota delete
router.post("/deletar", wrap(async (req, res) => {
    let ra = req.body.ra;
    let u = await Usuario.deletar(ra);
    if (u == false) {
        res.json("Usuário não encontrado");
    }
    else {
        res.json("Usuário deletado");
    }
}));
//criar rota listar
router.get("/listar", wrap(async (req, res) => {
    let lista = req.query.lista;
    //let u = await Usuario.listar(lista)
    res.json(lista);
}));
module.exports = router;
//# sourceMappingURL=usuario.js.map