import inquirer from "inquirer";
import axios from "axios";
import chalk from "chalk";

async function executarCLI() {
  console.log(chalk.blue.bold("\nCálculo de horas a compensar!\n"));

  const respostas = await inquirer.prompt([
    {
      type: "input",
      name: "jornadaDiaria",
      message: "Jornada diária (HH:MM)",
      default: "08:00",
    },
    {
      type: "input",
      name: "horasTrabalhadas",
      message: "⏳ Horas trabalhadas (HH:MM)",
      default: "03:45",
    },
  ]);

  const response = await axios.post(
    "http://localhost:3000/api/horas-compensar",
    respostas
  );

  console.log(
    chalk.green(`Horas a compensar: ${response.data.horasACompensar}`)
  );
  console.log(
    chalk.yellow(`Dias necessários: ${response.data.diasParaCompensar}`)
  );
  response.data.horasTrabalhadasPorDia.forEach((h: any, i: number) =>
    console.log(`Dia ${i + 1}: ${h}`)
  );
}

executarCLI();
