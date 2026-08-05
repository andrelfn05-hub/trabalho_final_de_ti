import { Request } from "express";
import { Produto } from "../entities/Produto";

export interface CartItemSession {
  produtoId: string | number;
  nome: string;
  preco: number;
  quantidade: number;
}

export class CarrinhoService {
  // Obtém a lista de itens da sessão
  public static getCarrinho(req: Request): CartItemSession[] {
    if (!(req.session as any).carrinho) {
      (req.session as any).carrinho = [];
    }
    return (req.session as any).carrinho;
  }

  // Adiciona um produto ao carrinho
  public static adicionar(req: Request, produto: Produto, quantidade: number = 1): void {
    const carrinho = this.getCarrinho(req);
    const index = carrinho.findIndex((item) => String(item.produtoId) === String(produto.id));

    if (index >= 0) {
      carrinho[index].quantidade += quantidade;
    } else {
      carrinho.push({
        produtoId: produto.id,
        nome: produto.nome,
        preco: produto.preco,
        quantidade: quantidade,
      });
    }
  }

  // Remove um item do carrinho
  public static remover(req: Request, produtoId: string | number): void {
    let carrinho = this.getCarrinho(req);
    carrinho = carrinho.filter((item) => String(item.produtoId) !== String(produtoId));
    (req.session as any).carrinho = carrinho;
  }

  // Atualiza a quantidade de um item
  public static atualizarQuantidade(req: Request, produtoId: string | number, quantidade: number): void {
    const carrinho = this.getCarrinho(req);
    const item = carrinho.find((i) => String(i.produtoId) === String(produtoId));
    if (item) {
      if (quantidade <= 0) {
        this.remover(req, produtoId);
      } else {
        item.quantidade = quantidade;
      }
    }
  }

  // Calcula o valor total do carrinho
  public static getTotal(req: Request): number {
    const carrinho = this.getCarrinho(req);
    return carrinho.reduce((total, item) => total + item.preco * item.quantidade, 0);
  }

  // Limpa o carrinho
  public static limpar(req: Request): void {
    (req.session as any).carrinho = [];
  }
}