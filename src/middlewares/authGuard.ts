import { Request, Response, NextFunction } from "express";

export const authGuard = (req: Request, res: Response, next: NextFunction): void => {
  // Acessa a propriedade session com um cast simples para evitar o erro de tipagem
  const reqSession = (req as any).session;

  if (reqSession && reqSession.usuario) {
    return next();
  }

  // Se a requisição for feita via API (JSON/Fetch)
  if (req.headers["content-type"] === "application/json" || req.xhr) {
    res.status(401).json({ mensagem: "Acesso negado. Faça login para continuar." });
    return;
  }

  // Redireciona para a tela de login
  res.redirect("/login");
};

export default authGuard;