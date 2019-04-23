"use strict";
const express = require("express");
const router = express.Router();
let cursos = [{ id: 0, nome: "Sistemas" }, { id: 1, nome: "Banco de Dados" }]; // Cria o Array com dois cursos já inseridos
router.get("/listar", (req, res) => {
    let resp = JSON.stringify(cursos);
    res.json(resp);
});
router.post("/adicionar", (req, res) => {
    let c = req.body;
    cursos.map(curso => {
        if (curso.nome === c.nome) {
            res.json("Curso já criado");
            res.sendStatus(400);
        }
    });
    if (c.nome !== "") {
        cursos.push(c);
        res.json("Curso Adicionado " + cursos);
    }
    else {
        res.sendStatus(400);
        res.json("BAD FUCKING REQUEST");
    }
});
module.exports = router;
//# sourceMappingURL=curso.js.map