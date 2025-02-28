"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = errorHandler;
/**
 * Middleware para capturar erros e retornar respostas padronizadas.
 */
function errorHandler(err, req, res, next) {
    console.error(err); // Log do erro no console
    // Se o erro já possui um status definido, retornamos esse status
    const status = err.status || 500;
    const message = err.message || "Erro interno no servidor";
    res.status(status).json({ error: message });
}
