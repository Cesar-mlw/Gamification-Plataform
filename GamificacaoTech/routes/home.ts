
import express = require('express');
import wrap = require('express-async-error-wrapper')
import Usuario = require('../models/Usuario')
import Request = require('../utils/requests')
const router = express.Router();


router.get('/', wrap(async (req: express.Request, res: express.Response) => {//Declaração de rota
    res.render('home', { titulo: 'Gamificação TECH', }); //função para exibir layout para o usuário. res.resnder(/nome da rota/, {/variáveis que poderão ser consumidas pelo layout/})
}));

router.get('/curso', wrap( async(req: express.Request, res: express.Response) => {
    //dentro dessa função podemos fazer chamadas à API para que possamos capturar dados do usuário e assim alimentar o layout com os dados necessários
    res.render('curso', { titulo: 'Gamificação TECH', nome_curso: "Banco de Dados"});//estarei deixando como exemplo a rota curso e junto um arquivo chamado curso.ejs
}));

router.get('/requestTest', wrap(async (req: express.Request, res: express.Response) => {
    var item
    
    console.log(item)
}));




export = router;