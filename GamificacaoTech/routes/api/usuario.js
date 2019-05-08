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
    let lista = await Usuario.listar();
    res.json(lista);
}));
//efetuar o Login
router.post("/efetuarLogin", wrap(async (req, res) => {
    let ra = req.body.ra;
    let senha = req.body.senha;
    let resp = await Usuario.efetuarLogin(ra, senha);
    if (resp) {
        res.json("LOGADO");
    }
    else {
        res.json("TA ERRADO SEU MERDA");
    }
}));
module.exports = router;
//# sourceMappingURL=usuario.js.map