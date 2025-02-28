"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inquirer_1 = __importDefault(require("inquirer"));
const axios_1 = __importDefault(require("axios"));
const chalk_1 = __importDefault(require("chalk"));
function executarCLI() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(chalk_1.default.blue.bold("\nCálculo de horas a compensar!\n"));
        const respostas = yield inquirer_1.default.prompt([
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
        const response = yield axios_1.default.post("http://localhost:3000/api/horas-compensar", respostas);
        console.log(chalk_1.default.green(`Horas a compensar: ${response.data.horasACompensar}`));
        console.log(chalk_1.default.yellow(`Dias necessários: ${response.data.diasParaCompensar}`));
        response.data.horasTrabalhadasPorDia.forEach((h, i) => console.log(`Dia ${i + 1}: ${h}`));
    });
}
executarCLI();
