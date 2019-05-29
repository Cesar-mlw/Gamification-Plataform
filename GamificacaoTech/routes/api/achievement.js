"use strict";
const express = require("express");
const wrap = require("express-async-error-wrapper");
const Achievement = require("../../models/Achievement");
const router = express.Router();
router.post("/criar", wrap(async (req, res) => {
    let a = req.body;
    let erro = await Achievement.criar(a);
    if (erro) {
        res.statusCode = 400;
        res.json(erro);
    }
    else {
        res.json("Achievement criado");
    }
}));
router.get("/listar", wrap(async (req, res) => {
    let lista = await Achievement.listar();
    res.json(lista);
}));
router.post("/deletar", wrap(async (req, res) => {
    let idAchievement = req.body.idAchievement;
    let a = await Achievement.deletar(idAchievement);
    if (a == false) {
        res.json("Achievement não encontrado");
    }
    else {
        res.json("Achievement deletado");
    }
}));
router.get("/obter", wrap(async (req, res) => {
    let idAchievement = req.query.idAchievement;
    let a = await Achievement.obter(idAchievement);
    res.json(a);
}));
router.post("/alterar", wrap(async (req, res) => {
    let a = req.body;
    let erro = await Achievement.alterar(a);
    if (erro) {
        res.json("Achievement inexistente");
    }
    else {
        res.json("Achievement alterado!");
    }
}));
module.exports = router;
//# sourceMappingURL=achievement.js.map