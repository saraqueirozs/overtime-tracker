import { Router, Request, Response } from "express";
import { BancoDeHorasController } from "../controllers/BancoDeHorasController";

const router = Router();

router.post("/horas-compensar", (req: Request, res: Response) => {
  BancoDeHorasController.calcularHorasACompensar(req, res);
});

export default router;
