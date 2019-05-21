"use strict";
const express = require("express");
const wrap = require("express-async-error-wrapper");
const Projeto = require("../../models/Projeto");
const router = express.Router();
router.post("/criar", wrap(async (req, res) => {
    let p = req.body;
    let erro = await Projeto.criar(p);
    console.log(req.body);
    if (erro) {
        res.statusCode = 400;
        res.json(erro);
    }
    else {
        res.json("Projeto criado");
    }
}));
router.get("/listar", wrap(async (req, res) => {
    let lista = await Projeto.listar();
    res.json(lista);
}));
router.post("/deletar", wrap(async (req, res) => {
    let idProjeto = req.body.idProjeto;
    let p = await Projeto.deletar(idProjeto); //aqui coloco a variável como escreve no modelo Projeto ou como ta na tabela no workbench??
    if (p == false) {
        res.json("Projeto não encontrado");
    }
    else {
        res.json("Projeto deletado");
    }
}));
router.get("/obter", wrap(async (req, res) => {
    let idProjeto = req.query.idProjeto;
    let p = await Projeto.obter(idProjeto);
    res.json(p);
}));
router.post("/alterar", wrap(async (req, res) => {
    let p = req.body;
    let erro = await Projeto.alterar(p);
    console.log(erro);
    if (erro) {
        res.json("Este projeto não existe");
    }
    else {
        res.json("Projeto alterado!");
    }
}));
module.exports = router;
//# sourceMappingURL=projeto.js.map