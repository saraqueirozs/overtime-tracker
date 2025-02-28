import { Request, Response, NextFunction } from "express";

/**
 * Middleware para capturar erros e retornar respostas padronizadas.
 */
export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  console.error(err); // Log do erro no console

  // Se o erro já possui um status definido, retornamos esse status
  const status = err.status || 500;
  const message = err.message || "Erro interno no servidor";

  res.status(status).json({ error: message });
}
