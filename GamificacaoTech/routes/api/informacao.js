"use strict";
const express = require("express");
const wrap = require("express-async-error-wrapper");
const Informacao = require("../../models/Informacao");
const router = express.Router();
router.post("/criar", wrap(async (req, res) => {
    let i = req.body;
    let erro = await Informacao.criar(i);
    if (erro) {
        res.statusCode = 400;
        res.json(erro);
    }
    else {
        res.json("Informacao criada");
    }
}));
router.get("/listar", wrap(async (req, res) => {
    let lista = await Informacao.listar();
    res.json(lista);
}));
router.post("/deletar", wrap(async (req, res) => {
    let idInformacao = req.body.idInformacao;
    let i = await Informacao.deletar(idInformacao);
    if (i == false) {
        res.json("Informacao não encontrada");
    }
    else {
        res.json("Informacao deletada");
    }
}));
router.get("/obter", wrap(async (req, res) => {
    let idInformacao = req.query.idInformacao;
    let i = await Informacao.obter(idInformacao);
    res.json(i);
}));
router.post("/alterar", wrap(async (req, res) => {
    let i = req.body;
    let erro = await Informacao.alterar(i);
    if (erro) {
        res.json("Informação inexistente");
    }
    else {
        res.json("Informação alterada!");
    }
}));
module.exports = router;
//# sourceMappingURL=informacao.js.map