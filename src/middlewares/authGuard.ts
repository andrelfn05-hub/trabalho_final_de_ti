import { Router } from "express";
import { ProductController } from "./controllers/ProductController";
import { AuthGuard } from "./middlewares/AuthGuard";

const router = Router();

// Rota protegida: o AuthGuard verifica o login antes de chamar o controller
router.get("/products", AuthGuard, ProductController.showProducts);
router.get("/products/create", AuthGuard, ProductController.showCreateProduct);

export default router;