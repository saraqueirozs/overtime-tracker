"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BancoDeHorasController = void 0;
const BancoDeHorasService_1 = require("../services/BancoDeHorasService");
const bancoDeHorasService = new BancoDeHorasService_1.BancoDeHorasService();
class BancoDeHorasController {
    static calcularHorasACompensar(req, res) {
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
        }
        catch (error) {
            return res.status(500).json({ error: "Erro interno no servidor" });
        }
    }
}
exports.BancoDeHorasController = BancoDeHorasController;
