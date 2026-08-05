import { Produto } from "./Produto";

export class ItemCarrinho {
  public produto: Produto;
  public quantidade: number;

  constructor(produto: Produto, quantidade: number = 1) {
    this.produto = produto;
    this.quantidade = quantidade;
  }

  // Calcula o valor total deste item (Preço x Quantidade)
  public get subtotal(): number {
    return this.produto.preco * this.quantidade;
  }
}