"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BancoDeHorasService = void 0;
class BancoDeHorasService {
    converterParaMinutos(tempo) {
        const [horas, minutos] = tempo.split(":").map(Number);
        return horas * 60 + minutos;
    }
    converterParaHoras(minutos) {
        const horas = Math.floor(minutos / 60);
        const minutosRestantes = minutos % 60;
        return `${horas.toString().padStart(2, "0")}:${minutosRestantes
            .toString()
            .padStart(2, "0")}`;
    }
    calcularSaldo(horas) {
        const jornadaMinutos = this.converterParaMinutos(horas.jornadaDiaria);
        const trabalhadoMinutos = this.converterParaMinutos(horas.horasTrabalhadas);
        return trabalhadoMinutos - jornadaMinutos;
    }
    calcularCompensacao(saldo) {
        const jornadaMinutos = this.converterParaMinutos("08:00");
        // Se saldo for POSITIVO: Calcular DESCANSO
        if (saldo > 0) {
            const descanso = this.converterParaHoras(saldo);
            return {
                dias: 0,
                horasDiarias: [],
                saldoFormatado: `+${this.converterParaHoras(saldo)}`,
                horasParaDescanso: this.converterParaHoras(jornadaMinutos - saldo),
            };
        }
        // Se saldo for NEGATIVO: Manter a lógica original de compensação
        let saldoRestante = Math.abs(saldo);
        let diasNecessarios = 0;
        const horasExtrasFixas = this.converterParaMinutos("01:50");
        let horasDiarias = [];
        while (saldoRestante > 0) {
            diasNecessarios++;
            const horasHoje = Math.min(saldoRestante, horasExtrasFixas);
            saldoRestante -= horasHoje;
            horasDiarias.push(this.converterParaHoras(horasHoje));
        }
        return {
            dias: diasNecessarios,
            horasDiarias,
            saldoFormatado: `-${this.converterParaHoras(Math.abs(saldo))}`,
        };
    }
}
exports.BancoDeHorasService = BancoDeHorasService;
