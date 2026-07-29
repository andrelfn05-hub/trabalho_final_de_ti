import { Router } from "express";
import { AuthController } from "../controllers/AuthController";

const authRouter = Router();

// Rotas de Login
authRouter.get("/login", AuthController.showLogin);
authRouter.post("/login", AuthController.processLogin);

// Rotas de Cadastro
authRouter.get("/register", AuthController.showRegister);
authRouter.post("/register", AuthController.processRegister);

// Rota de Logout
authRouter.get("/logout", AuthController.logout);

export default authRouter;