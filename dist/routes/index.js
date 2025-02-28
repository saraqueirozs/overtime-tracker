"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const BancoDeHorasController_1 = require("../controllers/BancoDeHorasController");
const router = (0, express_1.Router)();
router.post("/horas-compensar", (req, res) => {
    BancoDeHorasController_1.BancoDeHorasController.calcularHorasACompensar(req, res);
});
exports.default = router;
