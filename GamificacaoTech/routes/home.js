"use strict";
const express = require("express");
const wrap = require("express-async-error-wrapper");
const Usuario = require("../models/Usuario");
const TipoProjeto = require("../models/TipoProjeto");
const Area = require("../models/Area");
const Habilidade = require("../models/Habilidade");
const ItemUsuario = require("../models/ItemUsuario");
const UsuarioHabilidade = require("../models/UsuarioHabilidade");
const Projeto = require("../models/Projeto");
const Noticia = require("../models/Noticia");
const AchievementUsuario = require("../models/AchievementUsuario");
const router = express.Router();
//import usuario
router.get('/', wrap(async (req, res) => {
    //itens / pontos das áreas
    let u = await Usuario.obter(11122233);
    let iu = await ItemUsuario.obterItensUsuario(11122233);
    let pontos = [];
    pontos.push(u.pontos_bi, u.pontos_dev, u.pontos_games, u.pontos_inov, u.pontos_outros);
    res.render('home', { titulo: 'Gamificação TECH', pontos: pontos, iu }); //função para exibir layout para o usuário. res.resnder(/nome da rota/, {/variáveis que poderão ser consumidas pelo layout/})
}));
router.get('/pc', wrap(async (req, res) => {
    res.render('pc', { titulo: 'Gamificação TECH' }); //função para exibir layout para o usuário. res.resnder(/nome da rota/, {/variáveis que poderão ser consumidas pelo layout/})
}));
router.get('/cv', wrap(async (req, res) => {
    let habilidades = await UsuarioHabilidade.obter(11122233);
    res.render('cvPage', { titulo: 'Gamificação TECH', hab: habilidades }); //função para exibir layout para o usuário. res.resnder(/nome da rota/, {/variáveis que poderão ser consumidas pelo layout/})
}));
router.get('/port', wrap(async (req, res) => {
    let projetos = await Projeto.obter(11122233);
    res.render('cvPage', { titulo: 'Gamificação TECH', proj: projetos }); //função para exibir layout para o usuário. res.resnder(/nome da rota/, {/variáveis que poderão ser consumidas pelo layout/})
}));
router.get('/feed', wrap(async (req, res) => {
    let noticias = await Noticia.listar();
    res.render('feed', { titulo: 'Gamificação TECH', noti: noticias }); //função para exibir layout para o usuário. res.resnder(/nome da rota/, {/variáveis que poderão ser consumidas pelo layout/})
}));
router.get('/achieve', wrap(async (req, res) => {
    let achieveCompleto = await AchievementUsuario.obterCompletado(11122233);
    let achieveNCompleto = await AchievementUsuario.obterNaoCompletado(11122233);
    console.log(achieveCompleto);
    res.render('achieve', { titulo: 'Gamificação TECH', achiComp: achieveCompleto, achiNComp: achieveNCompleto }); //função para exibir layout para o usuário. res.resnder(/nome da rota/, {/variáveis que poderão ser consumidas pelo layout/})
}));
router.get('/formTest', wrap(async (req, res) => {
    let tps = await TipoProjeto.listar(); //métodos do modelos 
    let ar = await Area.listar();
    let hab = await Habilidade.listar();
    res.render('formTest', { tps: tps, ar: ar, hab: hab }); //renderizar a tela
}));
module.exports = router;
//# sourceMappingURL=home.js.map