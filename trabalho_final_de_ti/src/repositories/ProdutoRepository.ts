import fs from 'fs';
import path from 'path';
import { Produto } from '../entities/Produto'; // Certifique-se que o caminho da entidade está correto

// Caminho até o arquivo JSON que guardará os dados
const caminhoBanco = path.join(__dirname, '../../dados/produtos.json');

export class ProdutoRepository {
    
    // Lê o arquivo JSON e transforma os dados em objetos Produto
    listar(): Produto[] {
        try {
            const dados = fs.readFileSync(caminhoBanco, 'utf-8');
            const json = JSON.parse(dados);
            return json.map((p: any) => Produto.fromJSON(p));
        } catch (error) {
            // Se o arquivo não existir ou estiver vazio, retorna um array vazio
            return [];
        }
    }

    // Busca um produto específico pelo ID
    buscarPorId(id: string): Produto | undefined {
        const produtos = this.listar();
        return produtos.find(p => p.id === id);
    }

    // Adiciona um novo produto no JSON
    criar(produto: Produto): void {
        const produtos = this.listar();
        produtos.push(produto); // Usa o toJSON automaticamente por causa do push
        this.salvarArquivo(produtos);
    }

    // Remove um produto do JSON pelo ID
    remover(id: string): void {
        let produtos = this.listar();
        produtos = produtos.filter(p => p.id !== id);
        this.salvarArquivo(produtos);
    }

    // Método privado para escrever a lista de produtos de volta no arquivo JSON
    private salvarArquivo(produtos: Produto[]): void {
        // Converte os objetos Produto para JSON puro antes de salvar
        const dadosJson = JSON.stringify(produtos.map(p => p.toJSON()), null, 2);
        fs.writeFileSync(caminhoBanco, dadosJson, 'utf-8');
    }
}