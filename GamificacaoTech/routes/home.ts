
import express = require('express');
import wrap = require('express-async-error-wrapper')
import Usuario = require('../models/Usuario')
import request = require('request')
import TipoProjeto = require("../models/TipoProjeto")
import Area = require("../models/Area")
import Habilidade = require("../models/Habilidade")
import ItemUsuario = require("../models/ItemUsuario")
import UsuarioHabilidade = require("../models/UsuarioHabilidade")
import Projeto = require('../models/Projeto');
import Noticia = require("../models/Noticia")
import AchievementUsuario = require("../models/AchievementUsuario")
const router = express.Router();

//import usuario
router.get('/', wrap(async (req: express.Request, res: express.Response) => {//Declaração de rota
    //itens / pontos das áreas
    let u = await Usuario.obter(11122233)
    let iu = await ItemUsuario.obterItensUsuario(11122233)
    let pontos = []
    pontos.push(u.pontos_bi, u.pontos_dev, u.pontos_games, u.pontos_inov, u.pontos_outros)
    res.render('home', { titulo: 'Gamificação TECH', pontos: pontos, iu}); //função para exibir layout para o usuário. res.resnder(/nome da rota/, {/variáveis que poderão ser consumidas pelo layout/})
}));

router.get('/pc', wrap(async (req: express.Request, res: express.Response) => {//Declaração de rota
    res.render('pc', { titulo: 'Gamificação TECH'}); //função para exibir layout para o usuário. res.resnder(/nome da rota/, {/variáveis que poderão ser consumidas pelo layout/})
}));

router.get('/cv', wrap(async (req: express.Request, res: express.Response) => {//Declaração de rota
    let habilidades = await UsuarioHabilidade.obter(11122233)
    res.render('cvPage', { titulo: 'Gamificação TECH', hab: habilidades }); //função para exibir layout para o usuário. res.resnder(/nome da rota/, {/variáveis que poderão ser consumidas pelo layout/})
}));

router.get('/port', wrap(async (req: express.Request, res: express.Response) => {//Declaração de rota
    let projetos = await Projeto.obter(11122233)
    res.render('cvPage', { titulo: 'Gamificação TECH', proj:projetos }); //função para exibir layout para o usuário. res.resnder(/nome da rota/, {/variáveis que poderão ser consumidas pelo layout/})
}));

router.get('/feed', wrap(async (req: express.Request, res: express.Response) => {//Declaração de rota
    let noticias = await Noticia.listar()
    res.render('feed', { titulo: 'Gamificação TECH', noti: noticias }); //função para exibir layout para o usuário. res.resnder(/nome da rota/, {/variáveis que poderão ser consumidas pelo layout/})
}));

router.get('/achieve', wrap(async (req: express.Request, res: express.Response) => {//Declaração de rota
    let achieveCompleto = await AchievementUsuario.obterCompletado(11122233)
    let achieveNCompleto = await AchievementUsuario.obterNaoCompletado(11122233)
    let achieveBI = JSON.stringify(JSON.parse(achieveCompleto).filter(ac => { return ac.area_achievement == 1 }))
    let achieveGames = JSON.stringify(JSON.parse(achieveCompleto).filter(ac => { return ac.area_achievement == 2 }))
    let achieveDev = JSON.stringify(JSON.parse(achieveCompleto).filter(ac => { return ac.area_achievement == 3 }))
    let achieveInov = JSON.stringify(JSON.parse(achieveCompleto).filter(ac => { return ac.area_achievement == 4 }))
    console.log(achieveBI)
    res.render('achieve', { titulo: 'Gamificação TECH', achiComp: achieveCompleto, achiNComp: achieveNCompleto, achiBI: achieveBI, achiGames: achieveGames, achiDev: achieveDev, achiInov: achieveInov}); //função para exibir layout para o usuário. res.resnder(/nome da rota/, {/variáveis que poderão ser consumidas pelo layout/})
}));

router.get('/formTest', wrap(async (req: express.Request, res: express.Response) => {
    let tps = await TipoProjeto.listar() //métodos do modelos 
    let ar = await Area.listar()
    let hab = await Habilidade.listar()
    res.render('formTest', { tps: tps, ar: ar, hab: hab})//renderizar a tela
}));

router.get('/portifolio', wrap(async (req: express.Request, res: express.Response) => {
    res.render('portifolio', { titulo: "Portifolio"})//renderizar a tela
}));




export = router;