"use strict";
const express = require("express");
const wrap = require("express-async-error-wrapper");
const Usuario = require("../models/Usuario");
const router = express.Router();
//import usuario
router.get('/', wrap(async (req, res) => {
    //itens / pontos das áreas
    res.render('login', { titulo: 'Area Logada' }); //função para exibir layout para o usuário. res.resnder(/nome da rota/, {/variáveis que poderão ser consumidas pelo layout/})
}));
router.get('/home', wrap(async (req, res) => {
    //itens / pontos das áreas
    if (req.cookies.logged) {
        let alunos = await Usuario.listar();
        res.render('homeAdmin', { titulo: 'Area Logada', alu: alunos, layout: 'layoutAdmin' }); //função para exibir layout para o usuário. res.resnder(/nome da rota/, {/variáveis que poderão ser consumidas pelo layout/})
    }
    else {
        res.redirect("/admin/");
    }
}));
module.exports = router;
//# sourceMappingURL=admin.js.map