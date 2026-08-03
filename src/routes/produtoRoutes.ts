import { Router, Request, Response } from "express";
import { Produto } from "../entities/Produto";

const router = Router();

// Simulação de banco de dados em memória
let produtosDB: Produto[] = [];

// --- GET /produtos - Listar todos os produtos ---
router.get("/", (req: Request, res: Response) => {
  try {
    const listaProdutos = produtosDB.map((prod) => prod.toJSON());
    return res.json(listaProdutos);
  } catch (error: any) {
    return res.status(500).json({ erro: "Erro ao buscar produtos.", detalhe: error.message });
  }
});

// --- GET /produtos/:id - Buscar um produto específico pelo ID ---
router.get("/:id", (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const produto = produtosDB.find((p) => p.id === id);

    if (!produto) {
      return res.status(404).json({ erro: "Produto não encontrado." });
    }

    return res.json(produto.toJSON());
  } catch (error: any) {
    return res.status(500).json({ erro: "Erro ao buscar produto.", detalhe: error.message });
  }
});

// --- POST /produtos - Criar um novo produto ---
router.post("/", (req: Request, res: Response) => {
  try {
    // Instancia o Produto a partir do corpo da requisição usando o método estático fromJSON
    const novoProduto = Produto.fromJSON(req.body);

    // Executa a validação do modelo
    if (!novoProduto.validar()) {
      return res.status(400).json({ erro: "Dados de produto inválidos." });
    }

    produtosDB.push(novoProduto);

    return res.status(201).json({
      mensagem: "Produto criado com sucesso!",
      produto: novoProduto.toJSON(),
    });
  } catch (error: any) {
    // Captura os erros lançados pelos SETTERS (ex: preço negativo, nome curto)
    return res.status(400).json({ erro: error.message });
  }
});

// --- PUT /produtos/:id - Atualizar dados de um produto ---
router.put("/:id", (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const produto = produtosDB.find((p) => p.id === id);

    if (!produto) {
      return res.status(404).json({ erro: "Produto não encontrado." });
    }

    const { nome, descricao, preco, categoria, imagemUrl } = req.body;

    // Atualiza os campos através dos Setters (que acionam as validações do Model)
    if (nome !== undefined) produto.nome = nome;
    if (descricao !== undefined) produto.descricao = descricao;
    if (preco !== undefined) produto.preco = Number(preco);
    if (categoria !== undefined) produto.categoria = categoria;
    if (imagemUrl !== undefined) produto.imagemUrl = imagemUrl;

    return res.json({
      mensagem: "Produto atualizado com sucesso!",
      produto: produto.toJSON(),
    });
  } catch (error: any) {
    return res.status(400).json({ erro: error.message });
  }
});

// --- DELETE /produtos/:id - Remover produto ---
router.delete("/:id", (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const index = produtosDB.findIndex((p) => p.id === id);

    if (index === -1) {
      return res.status(404).json({ erro: "Produto não encontrado." });
    }

    produtosDB.splice(index, 1);

    return res.json({ mensagem: "Produto removido com sucesso." });
  } catch (error: any) {
    return res.status(500).json({ erro: "Erro ao deletar produto.", detalhe: error.message });
  }
});

export default router;