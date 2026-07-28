// Entidade Produto: Representa um item cadastrado na loja Casas Potiguar.
// Responsável por encapsular as regras de negócio e validações básicas de um produto.

export class Produto {
  private _id!: string;
  private _nome!: string;
  private _descricao!: string;
  private _preco!: number;
  private _categoria!: string;
  private _imagemUrl!: string;

  constructor(
      nome: string,
      categoria: string,
      descricao: string = "",
      preco: number = 0,
      imagemUrl: string = "",
      id: string = ""
  ) {
      this.id = id || Date.now().toString();
      this.nome = nome;
      this.categoria = categoria;
      this.descricao = descricao;
      this.preco = preco;
      this.imagemUrl = imagemUrl;
  }

  // --- GETTERS (Leitura) ---

  get id(): string {
      return this._id;
  }

  get nome(): string {
      return this._nome;
  }

  get descricao(): string {
      return this._descricao;
  }

  get preco(): number {
      return this._preco;
  }

  get categoria(): string {
      return this._categoria;
  }

  get imagemUrl(): string {
      return this._imagemUrl;
  }

  // --- SETTERS (Validação e Alteração) ---

  set id(novoId: string) {
      if (novoId.trim() === "") {
          throw new Error("O ID não pode ser vazio.");
      }

      this._id = novoId;
  }

  set nome(novoNome: string) {
      if (novoNome.trim().length < 3) {
          throw new Error(
              "O nome do produto deve ter pelo menos 3 caracteres."
          );
      }

      this._nome = novoNome.trim();
  }

  set descricao(novaDescricao: string) {
      this._descricao = novaDescricao;
  }

  set preco(novoPreco: number) {
      if (novoPreco < 0) {
          throw new Error("O preço não pode ser negativo.");
      }

      this._preco = Math.round(novoPreco * 100) / 100;
  }

  set categoria(novaCategoria: string) {
      if (novaCategoria.trim() === "") {
          throw new Error("A categoria não pode ser vazia.");
      }

      this._categoria = novaCategoria.trim();
  }

  set imagemUrl(novaImagemUrl: string) {
      this._imagemUrl = novaImagemUrl;
  }

  // --- VALIDAÇÃO ---

  validar(): boolean {
      if (!this._nome || this._nome.trim() === "") {
          return false;
      }

      if (!this._categoria || this._categoria.trim() === "") {
          return false;
      }

      if (this._preco < 0) {
          return false;
      }

      return true;
  }

  // --- CONVERTE O OBJETO PARA JSON ---

  toJSON() {
      return {
          id: this._id,
          nome: this._nome,
          descricao: this._descricao,
          preco: this._preco,
          categoria: this._categoria,
          imagemUrl: this._imagemUrl
      };
  }

  // --- CRIA UM PRODUTO A PARTIR DE UM JSON ---

  static fromJSON(json: any): Produto {
      return new Produto(
          json.nome,
          json.categoria,
          json.descricao,
          json.preco,
          json.imagemUrl,
          json.id
      );
  }
}