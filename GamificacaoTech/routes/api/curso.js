"use strict";
const express = require("express");
const router = express.Router();
let cursos = [{ id: 0, nome: "Sistemas" }, { id: 1, nome: "Banco de Dados" }]; // Cria o Array com dois cursos já inseridos 1 curso = {id: numero, nome: string}
router.get("/listar", (req, res) => {
    let resp = JSON.stringify(cursos); //transforma um vetor em uma string JSON (executa no Postmant para ver o que sai.)
    res.json(resp); //envia a resposta em formato JSON
});
router.post("/adicionar", (req, res) => {
    let c = req.body; //Recebe o corpo da requisição (Mandei no grupo uma imagem) e atribui isso a uma variavel do tipo Curso - classe Curso está localizada na pasta models
    cursos.map(curso => {
        //portanto, neste caso, ele vai pegar o item da lista e seu nome, -
        //item sendo guardado na variável curso, e comparar os nomes na lista com o nome que veio na requisição, -
        //se esse nome já existir ele vai retornar uma resposta falando que o curso já foi criado.
        if (curso.nome === c.nome) {
            res.json("Curso já criado"); //Dá uma resposta ao usuário avisando que o curso já foi criado
            res.sendStatus(400); //Devolve um código da requisição, neste caso, 400 - Bad Request
        }
    });
    if (c.nome !== "") { // checa se na requisição há um nome
        cursos.push(c); // Insere o curso no vetor cursos declarado no começo do script
        res.json("Curso Adicionado " + JSON.stringify(cursos)); //Devolve o aviso de que o curso foi adicionado mais a lista com todos os cursos. Ele a string da lista através do JSON.stringify(vetor)
    }
    else {
        res.json("BAD FUCKING REQUEST"); //Devolve uma string avisando que ele cometeu um bad request
        res.sendStatus(400); //Se o nome vier vazio, ele retorna 400 - Bad Request
    }
});
module.exports = router;
//# sourceMappingURL=curso.js.map