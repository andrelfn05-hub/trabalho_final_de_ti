import { Router, Request, Response } from "express";
import { Pedido } from "../entities/Pedido";

const router = Router();

// Simulação de banco de dados em memória
let pedidosDB: Pedido[] = [];

// --- GET /pedidos - Listar todos os pedidos ---
router.get("/", (req: Request, res: Response) => {
  try {
    const listaPedidos = pedidosDB.map((pedido) => pedido.toJSON());
    return res.json(listaPedidos);
  } catch (error: any) {
    return res.status(500).json({ erro: "Erro ao buscar pedidos.", detalhe: error.message });
  }
});

// --- GET /pedidos/:id - Buscar um pedido por ID ---
router.get("/:id", (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const pedido = pedidosDB.find((p) => p.id === id);

    if (!pedido) {
      return res.status(404).json({ erro: "Pedido não encontrado." });
    }

    return res.json(pedido.toJSON());
  } catch (error: any) {
    return res.status(500).json({ erro: "Erro ao buscar pedido.", detalhe: error.message });
  }
});

// --- GET /pedidos/usuario/:email - Listar pedidos de um usuário específico ---
router.get("/usuario/:email", (req: Request, res: Response) => {
  try {
    const email = String(req.params.email).toLowerCase();
    const pedidosDoUsuario = pedidosDB
      .filter((p) => p.usuarioEmail === email)
      .map((p) => p.toJSON());

    return res.json(pedidosDoUsuario);
  } catch (error: any) {
    return res.status(500).json({ erro: "Erro ao buscar pedidos do usuário.", detalhe: error.message });
  }
});

// --- POST /pedidos - Criar/Realizar um novo pedido ---
router.post("/", (req: Request, res: Response) => {
  try {
    // Instancia o Pedido usando o fromJSON
    const novoPedido = Pedido.fromJSON(req.body);

    // Valida o modelo de negócio
    if (!novoPedido.validar()) {
      return res.status(400).json({ erro: "Dados do pedido são inválidos." });
    }

    pedidosDB.push(novoPedido);

    return res.status(201).json({
      mensagem: "Pedido realizado com sucesso!",
      pedido: novoPedido.toJSON(),
    });
  } catch (error: any) {
    // Captura exceções lançadas nos setters (ex: sem itens, e-mail inválido, endereço curto)
    return res.status(400).json({ erro: error.message });
  }
});

// --- PATCH /pedidos/:id/status - Atualizar apenas o status do pedido (ex: pago, em_transporte, entregue) ---
router.patch("/:id/status", (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const pedido = pedidosDB.find((p) => p.id === id);

    if (!pedido) {
      return res.status(404).json({ erro: "Pedido não encontrado." });
    }

    // O setter de status do Pedido fará a validação das opções permitidas
    pedido.status = status;

    return res.json({
      mensagem: "Status do pedido atualizado com sucesso!",
      pedido: pedido.toJSON(),
    });
  } catch (error: any) {
    return res.status(400).json({ erro: error.message });
  }
});

// --- DELETE /pedidos/:id - Cancelar/Remover pedido ---
router.delete("/:id", (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const index = pedidosDB.findIndex((p) => p.id === id);

    if (index === -1) {
      return res.status(404).json({ erro: "Pedido não encontrado." });
    }

    pedidosDB.splice(index, 1);

    return res.json({ mensagem: "Pedido cancelado e removido com sucesso." });
  } catch (error: any) {
    return res.status(500).json({ erro: "Erro ao remover pedido.", detalhe: error.message });
  }
});

export default router;