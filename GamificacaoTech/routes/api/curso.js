"use strict";
const express = require("express");
const router = express.Router();
router.get("/listar", (req, res) => {
    let nums = [0, 10, 2, 3, 4];
    res.json(nums);
});
router.get("/adicionar", (req, res) => {
    let nums = "adicionado";
    res.json(nums);
});
module.exports = router;
//# sourceMappingURL=curso.js.map