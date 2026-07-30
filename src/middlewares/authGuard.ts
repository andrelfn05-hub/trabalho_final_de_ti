import { Router } from "express";
import { ProductController } from "../controllers/ProdutoController";
import AuthGuard from "../middlewares/authGuard";

const router = Router();

// Rota protegida: o AuthGuard verifica o login antes de chamar o controller
router.get("/products", AuthGuard, ProductController.showProducts);
router.get("/products/create", AuthGuard, ProductController.showCreateProduct);

export default router;