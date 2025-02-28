import { Request, Response } from "express";
import { BancoDeHorasService } from "../services/BancoDeHorasService";

const bancoDeHorasService = new BancoDeHorasService();

export class BancoDeHorasController {
  static calcularHorasACompensar(req: Request, res: Response) {
    try {
      const { jornadaDiaria, horasTrabalhadas } = req.body;
      if (!jornadaDiaria || !horasTrabalhadas) {
        return res
          .status(400)
          .json({ error: "Todos os campos são obrigatórios" });
      }

      const saldo = bancoDeHorasService.calcularSaldo({
        jornadaDiaria,
        horasTrabalhadas,
      });
      const resultado = bancoDeHorasService.calcularCompensacao(saldo);

      // Se tiver "horasParaDescanso", significa que o saldo é positivo
      if (resultado.horasParaDescanso) {
        return res.status(200).json({
          horasTrabalhadas: resultado.saldoFormatado,
          horasParaDescanso: resultado.horasParaDescanso,
        });
      }

      return res.status(200).json({
        horasACompensar: resultado.saldoFormatado,
        diasParaCompensar: resultado.dias,
        horasTrabalhadasPorDia: resultado.horasDiarias,
      });
    } catch (error) {
      return res.status(500).json({ error: "Erro interno no servidor" });
    }
  }
}
