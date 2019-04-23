import express = require("express");
import Curso = require("../../models/Curso");

const router = express.Router();


let cursos: Curso[] = [{ id: 0, nome: "Sistemas" }, { id: 1, nome: "Banco de Dados" }] // Cria o Array com dois cursos já inseridos 1 curso = {id: numero, nome: string}

router.get("/listar", (req: express.Request, res: express.Response) => { //Define a rota
    let resp = JSON.stringify(cursos) //transforma um vetor em uma string JSON (executa no Postmant para ver o que sai.)
    res.json(resp); //envia a resposta em formato JSON
});

router.post("/adicionar", (req: express.Request, res: express.Response) => {
    let c: Curso = req.body //Recebe o corpo da requisição (Mandei no grupo uma imagem) e atribui isso a uma variavel do tipo Curso - classe Curso está localizada na pasta models
    cursos.map(curso => { //a função map percorre toda a lista de Cursos cadastrado - Dentro das chaves é o que será executado para cada item da lista, -
                         //portanto, neste caso, ele vai pegar o item da lista e seu nome, -
                         //item sendo guardado na variável curso, e comparar os nomes na lista com o nome que veio na requisição, -
                         //se esse nome já existir ele vai retornar uma resposta falando que o curso já foi criado.
        if (curso.nome === c.nome) {
            res.json("Curso já criado") //Dá uma resposta ao usuário avisando que o curso já foi criado
            res.sendStatus(400) //Devolve um código da requisição, neste caso, 400 - Bad Request
        }
    })
    if (c.nome !== "") { // checa se na requisição há um nome
        cursos.push(c) // Insere o curso no vetor cursos declarado no começo do script
        res.json("Curso Adicionado " + JSON.stringify(cursos)); //Devolve o aviso de que o curso foi adicionado mais a lista com todos os cursos. Ele a string da lista através do JSON.stringify(vetor)
    }
    else {
        res.json("BAD FUCKING REQUEST") //Devolve uma string avisando que ele cometeu um bad request
        res.sendStatus(400) //Se o nome vier vazio, ele retorna 400 - Bad Request
    }
});

//Rota para alterar curso - o usuario devera fornecer o id e o novo nome do curso, a rota devera checar se o nome do id especificado é o mesmo, se sim a mudança não será feita. A mudança não será feita se ele especificar um id não existente
//post

//Rota para obter um curso especifico - usuario fornece um id através do URL localhost:1337/api/curso/obter?id=1 o rota deverá obter atravé do req.query[0]
//get

//rota para excluir um curso - usuario devera fornecer o id do mesmo jeito que a ultima rota
//get
export = router;