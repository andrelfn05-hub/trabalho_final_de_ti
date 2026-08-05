import { Router } from "express";
import { ProductController } from "../controllers/ProdutoController";
import { authGuard } from "../middlewares/authGuard";
import { upload } from "../middlewares/uploadMiddleware";

const router = Router();

// Rotas públicas ou protegidas de listagem
router.get("/", ProductController.showProducts);

// Rotas protegidas (exigem login) com upload de arquivo
router.get("/create", authGuard, ProductController.showCreateProduct);
router.post("/create", authGuard, upload.single("imagem"), ProductController.processCreateProduct);

router.get("/edit/:id", authGuard, ProductController.showEditProduct);
router.post("/edit/:id", authGuard, upload.single("imagem"), ProductController.processEditProduct);

router.post("/delete/:id", authGuard, ProductController.deleteProduct);

export default router;