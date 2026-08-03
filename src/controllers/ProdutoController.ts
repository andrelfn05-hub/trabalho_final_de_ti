import { Request, Response } from "express";
import { ProdutoRepository } from "../repositories/ProdutoRepository";
import { Produto } from "../entities/Produto";

const produtoRepo = new ProdutoRepository();

export const ProductController = {
  showProducts: async (req: Request, res: Response) => {
    try {
      const products = produtoRepo.listar();
      res.render("products/list", { products, error: null });
    } catch (error) {
      return res.status(500).render("products/list", { products: [], error: "Erro ao carregar produtos." });
    }
  },

  showCreateProduct: (req: Request, res: Response) => {
    res.render("products/create", { error: null });
  },

  processCreateProduct: async (req: Request, res: Response) => {
    const { name, price, description, category } = req.body;
    const reqFile = (req as any).file;
    const imagemUrl = reqFile ? `/uploads/${reqFile.filename}` : "";

    try {
      if (!name || !price || !category) {
        return res.render("products/create", { error: "Nome, preço e categoria são obrigatórios." });
      }

      // Ordem do construtor de Produto: nome, categoria, descricao, preco, imagemUrl
      const novoProduto = new Produto(
        String(name),
        String(category),
        String(description || ""),
        Number(price),
        String(imagemUrl)
      );

      if (!novoProduto.validar()) {
        return res.render("products/create", { error: "Dados inválidos para o produto." });
      }

      produtoRepo.criar(novoProduto);
      return res.redirect("/products");
    } catch (error: any) {
      return res.render("products/create", { error: error.message || "Erro ao criar produto." });
    }
  },

  showEditProduct: async (req: Request, res: Response) => {
    const id = String(req.params.id);
    try {
      const product = produtoRepo.buscarPorId(id);
      if (!product) {
        return res.status(404).redirect("/products");
      }
      res.render("products/edit", { product: product.toJSON(), error: null });
    } catch (error) {
      return res.status(500).redirect("/products");
    }
  },

  processEditProduct: async (req: Request, res: Response) => {
    const id = String(req.params.id);
    const { name, price, description, category } = req.body;
    const reqFile = (req as any).file;

    try {
      const produtoExistente = produtoRepo.buscarPorId(id);
      if (!produtoExistente) {
        return res.status(404).redirect("/products");
      }

      if (name) produtoExistente.nome = String(name);
      if (price !== undefined) produtoExistente.preco = Number(price);
      if (description) produtoExistente.descricao = String(description);
      if (category) produtoExistente.categoria = String(category);
      if (reqFile) produtoExistente.imagemUrl = `/uploads/${reqFile.filename}`;

      produtoRepo.atualizar(id, produtoExistente);
      return res.redirect("/products");
    } catch (error: any) {
      return res.status(500).redirect("/products");
    }
  },

  deleteProduct: async (req: Request, res: Response) => {
    const id = String(req.params.id);
    try {
      produtoRepo.remover(id);
      return res.redirect("/products");
    } catch (error) {
      return res.status(500).redirect("/products");
    }
  },
};