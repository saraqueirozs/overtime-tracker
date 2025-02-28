import { HorasTrabalho } from "../models/HorasTrabalho";

export class BancoDeHorasService {
  private converterParaMinutos(tempo: string): number {
    const [horas, minutos] = tempo.split(":").map(Number);
    return horas * 60 + minutos;
  }

  private converterParaHoras(minutos: number): string {
    const horas = Math.floor(minutos / 60);
    const minutosRestantes = minutos % 60;
    return `${horas.toString().padStart(2, "0")}:${minutosRestantes
      .toString()
      .padStart(2, "0")}`;
  }

  public calcularSaldo(horas: HorasTrabalho): number {
    const jornadaMinutos = this.converterParaMinutos(horas.jornadaDiaria);
    const trabalhadoMinutos = this.converterParaMinutos(horas.horasTrabalhadas);
    return trabalhadoMinutos - jornadaMinutos;
  }

  public calcularCompensacao(saldo: number): {
    dias: number;
    horasDiarias: string[];
    saldoFormatado: string;
    horasParaDescanso?: string;
  } {
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
    let horasDiarias: string[] = [];

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
