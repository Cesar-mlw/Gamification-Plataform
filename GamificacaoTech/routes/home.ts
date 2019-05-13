/*
 * GET home page.
 */
import express = require('express');
const router = express.Router();

router.get('/', (req: express.Request, res: express.Response) => {//Declaração de rota
    res.render('home', { titulo: 'Gamificação TECH', }); //função para exibir layout para o usuário. res.resnder(/nome da rota/, {/variáveis que poderão ser consumidas pelo layout/})
});

router.get('/curso', (req: express.Request, res: express.Response) => {
    //dentro dessa função podemos fazer chamadas à API para que possamos capturar dados do usuário e assim alimentar o layout com os dados necessários
    res.render('curso', { titulo: 'Gamificação TECH', nome_curso: "Banco de Dados"});//estarei deixando como exemplo a rota curso e junto um arquivo chamado curso.ejs
});

router.get('/requestTest', (req: express.Request, res: express.Response) => {
    
    res.render('requestTest', { titulo: 'Gamificação TECH'});
});




export default router;