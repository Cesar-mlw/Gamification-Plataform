"use strict";
const express = require("express");
const wrap = require("express-async-error-wrapper");
const TipoProjeto = require("../models/TipoProjeto");
const Area = require("../models/Area");
const Habilidade = require("../models/Habilidade");
const router = express.Router();
//import usuario
router.get('/', wrap(async (req, res) => {
    res.render('home', { titulo: 'Gamificação TECH', }); //função para exibir layout para o usuário. res.resnder(/nome da rota/, {/variáveis que poderão ser consumidas pelo layout/})
}));
router.get('/curso', wrap(async (req, res) => {
    res.render('curso', { titulo: 'Gamificação TECH', nome_curso: "Banco de Dados" }); //estarei deixando como exemplo a rota curso e junto um arquivo chamado curso.ejs
}));
router.get('/formTest', wrap(async (req, res) => {
    let tps = await TipoProjeto.listar();
    let ar = await Area.listar();
    let hab = await Habilidade.listar();
    res.render('formTest', { tps: tps, ar: ar, hab: hab });
}));
module.exports = router;
//# sourceMappingURL=home.js.map