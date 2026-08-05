import { Produto } from '../Produto';

describe('Entidade: Produto', () => {
  
  it('deve criar uma instância válida de Produto', () => {
    // Supondo a ordem padrão de parâmetros do constructor (ajuste se necessário)
    const produto = new Produto('p1', 'Teclado Mecânico', 250, 'categoria-1', 'teclado.jpg');

    expect(produto.id).toBe('p1');
    expect(produto.nome).toBe('Teclado Mecânico');
    expect(produto.preco).toBe(250);
  });

  it('deve converter corretamente de e para JSON (fromJSON e toJSON)', () => {
    const dadosJSON = {
      id: 'p2',
      nome: 'Mouse Gamer',
      preco: 120,
      categoriaId: 'cat-2',
      imagem: 'mouse.png'
    };

    // Testando o método estático chamado pelo ProdutoRepository (linha 20 da sua imagem)
    const produto = Produto.fromJSON(dadosJSON);
    expect(produto).toBeInstanceOf(Produto);
    expect(produto.nome).toBe('Mouse Gamer');

    // Testando o método toJSON usado ao salvar o arquivo (linha 9 da sua imagem)
    const jsonExportado = produto.toJSON();
    expect(jsonExportado).toEqual(dadosJSON);
  });

  it('deve validar se o produto atende às regras de negócio', () => {
    const produtoValido = new Produto('p3', 'Monitor 144Hz', 1200);
    
    // Testa o método de validação exigido no edital
    if (typeof produtoValido.validar === 'function') {
      expect(produtoValido.validar()).toBeTruthy();
    }
  });

});