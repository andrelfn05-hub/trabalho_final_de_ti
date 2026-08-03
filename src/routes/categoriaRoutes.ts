import { Router } from "express";
// Importe o seu controller de categorias quando ele estiver criado:
// import { CategoriaController } from "../controllers/CategoriaController";

const router = Router();

// --- Rotas da Entidade Categoria ---

// Listar todas as categorias
router.get("/", (req, res) => {
  // CategoriaController.listar(req, res);
  res.send("Lista de categorias");
});

// Exibir formulário de criação (se usar EJS/SSR)
router.get("/criar", (req, res) => {
  res.render("categorias/criar");
});

// Criar uma nova categoria
router.post("/", (req, res) => {
  // CategoriaController.criar(req, res);
  res.send("Categoria criada com sucesso");
});

// Buscar uma categoria específica pelo ID
router.get("/:id", (req, res) => {
  // CategoriaController.buscarPorId(req, res);
  res.send(`Detalhes da categoria ${req.params.id}`);
});

// Atualizar uma categoria
router.put("/:id", (req, res) => {
  // CategoriaController.atualizar(req, res);
  res.send(`Categoria ${req.params.id} atualizada`);
});

// Deletar uma categoria
router.delete("/:id", (req, res) => {
  // CategoriaController.deletar(req, res);
  res.send(`Categoria ${req.params.id} removida`);
});

// Importante: export default para funcionar o import no app.ts
export default router;