
import express = require('express');
import wrap = require('express-async-error-wrapper')
import Usuario = require('../models/Usuario')
import request = require('request')
import TipoProjeto = require("../models/TipoProjeto")
import Area = require("../models/Area")
import Habilidade = require("../models/Habilidade")
const router = express.Router();

//import usuario
router.get('/', wrap(async (req: express.Request, res: express.Response) => {//Declaração de rota
    res.render('home', { titulo: 'Gamificação TECH', }); //função para exibir layout para o usuário. res.resnder(/nome da rota/, {/variáveis que poderão ser consumidas pelo layout/})
}));

router.get('/curso', wrap( async(req: express.Request, res: express.Response) => {
    
    res.render('curso', { titulo: 'Gamificação TECH', nome_curso: "Banco de Dados"});//estarei deixando como exemplo a rota curso e junto um arquivo chamado curso.ejs
}));

router.get('/formTest', wrap(async (req: express.Request, res: express.Response) => {
    let tps = await TipoProjeto.listar() //métodos do modelos 
    let ar = await Area.listar()
    let hab = await Habilidade.listar()
    res.render('formTest', { tps: tps, ar: ar, hab: hab})//renderizar a tela
}));




export = router;