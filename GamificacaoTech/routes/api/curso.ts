import express = require("express");
import Curso = require("../../models/Curso");

const router = express.Router();



router.get("/listar", (req: express.Request, res: express.Response) => {
    let nums: number[] = [0, 10, 2, 3, 4]
    res.json(nums);
});

router.get("/adicionar", (req: express.Request, res: express.Response) => {
    let nums: string = "adicionado"
    res.json(nums);
});
export = router;