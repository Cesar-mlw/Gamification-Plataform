"use strict";
const express = require("express");
const wrap = require("express-async-error-wrapper");
const router = express.Router();
router.get('/', wrap(async (req, res) => {
    res.render('home', { titulo: 'Gamificação TECH', }); //função para exibir layout para o usuário. res.resnder(/nome da rota/, {/variáveis que poderão ser consumidas pelo layout/})
}));
router.get('/curso', wrap(async (req, res) => {
    //dentro dessa função podemos fazer chamadas à API para que possamos capturar dados do usuário e assim alimentar o layout com os dados necessários
    res.render('curso', { titulo: 'Gamificação TECH', nome_curso: "Banco de Dados" }); //estarei deixando como exemplo a rota curso e junto um arquivo chamado curso.ejs
}));
router.get('/requestTest', wrap(async (req, res) => {
    var item;
    console.log(item);
}));
module.exports = router;
//# sourceMappingURL=home.js.map