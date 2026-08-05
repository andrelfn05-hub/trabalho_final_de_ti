import { Request, Response } from "express";
import { CarrinhoService } from "../services/CarrinhoService";
import { ProdutoRepository } from "../repositories/ProdutoRepository";

const produtoRepo = new ProdutoRepository();

export const CarrinhoController = {
  // GET /carrinho -> Exibe a tela do carrinho
  index: (req: Request, res: Response) => {
    const itens = CarrinhoService.getCarrinho(req);
    const total = CarrinhoService.getTotal(req);

    res.render("carrinho/index", {
      itens,
      total,
      usuario: (req.session as any).usuario || null
    });
  },

  // POST /carrinho/adicionar -> Adiciona um produto
  adicionar: async (req: Request, res: Response) => {
    const { produtoId, quantidade } = req.body;

    try {
        const produto = await produtoRepo.buscarPorId(produtoId);
      if (!produto) {
        return res.status(404).send("Produto não encontrado.");
      }

      CarrinhoService.adicionar(req, produto, Number(quantidade) || 1);
      return res.redirect("/carrinho");
    } catch (error) {
      console.error("Erro ao adicionar ao carrinho:", error);
      return res.redirect("/produtos");
    }
  },

  // POST /carrinho/remover -> Remove um produto
  remover: (req: Request, res: Response) => {
    const { produtoId } = req.body;
    CarrinhoService.remover(req, produtoId);
    res.redirect("/carrinho");
  },

  // POST /carrinho/atualizar -> Atualiza a quantidade
  atualizar: (req: Request, res: Response) => {
    const { produtoId, quantidade } = req.body;
    CarrinhoService.atualizarQuantidade(req, produtoId, Number(quantidade));
    res.redirect("/carrinho");
  }
};