import fs from "fs";
import path from "path";
import { Produto } from "../entities/Produto";

const caminhoBanco = path.join(__dirname, "..", "dados", "produtos.json");

export class ProdutoRepository {
  private salvarArquivo(produtos: Produto[]): void {
    const dadosJson = JSON.stringify(produtos.map((p) => p.toJSON()), null, 2);
    fs.writeFileSync(caminhoBanco, dadosJson, "utf-8");
  }

  listar(): Produto[] {
    try {
      if (!fs.existsSync(caminhoBanco)) {
        return [];
      }
      const dados = fs.readFileSync(caminhoBanco, "utf-8");
      const json = JSON.parse(dados);
      return json.map((p: any) => Produto.fromJSON(p));
    } catch (error) {
      return [];
    }
  }

  buscarPorId(id: string): Produto | undefined {
    const produtos = this.listar();
    return produtos.find((p) => p.id === id);
  }

  criar(produto: Produto): void {
    const produtos = this.listar();
    produtos.push(produto);
    this.salvarArquivo(produtos);
  }

  atualizar(id: string, produtoAtualizado: Produto): boolean {
    const produtos = this.listar();
    const index = produtos.findIndex((p) => p.id === id);
    if (index === -1) return false;

    produtos[index] = produtoAtualizado;
    this.salvarArquivo(produtos);
    return true;
  }

  remover(id: string): boolean {
    let produtos = this.listar();
    const tamanhoOriginal = produtos.length;
    produtos = produtos.filter((p) => p.id !== id);
    
    if (produtos.length === tamanhoOriginal) return false;

    this.salvarArquivo(produtos);
    return true;
  }
}