// Entidade Produto: Representa um item cadastrado na loja Casas Potiguar.
// Responsável por encapsular as regras de negócio e validações básicas de um produto.

export class Produto {
    private _id: string;
    private _nome: string;
    private _categoria: string;
    private _descricao: string;
    private _imagemUrl: string;
  
    constructor(
      nome: string,
      categoria: string,
      descricao: string = "",
      imagemUrl: string = "",
      id: string = ""
    ) {
      this._id = id || Date.now().toString(); // Gera um ID baseado no tempo se não vier um
      this._nome = nome;
      this._categoria = categoria;
      this._descricao = descricao;
      this._imagemUrl = imagemUrl;
    }
  
    // --- Getters ---
    get id(): string { return this._id; }
    get nome(): string { return this._nome; }
    get categoria(): string { return this._categoria; }
    get descricao(): string { return this._descricao; }
    get imagemUrl(): string { return this._imagemUrl; }
  
    // --- Setters com Validação ---
    set nome(novoNome: string) {
      if (!novoNome || novoNome.trim() === "") {
        throw new Error("O nome do produto é obrigatório.");
      }
      this._nome = novoNome.trim();
    }
  
    set categoria(novaCategoria: string) {
      if (!novaCategoria || novaCategoria.trim() === "") {
        throw new Error("A categoria do produto é obrigatória.");
      }
      this._categoria = novaCategoria.trim();
    }
  
    set descricao(novaDescricao: string) { this._descricao = novaDescricao; }
    set imagemUrl(novaUrl: string) { this._imagemUrl = novaUrl; }
  
    // --- Métodos exigidos pelo professor ---
  
    // Valida se o objeto está pronto para ser salvo
    validar(): boolean {
      if (!this._nome || this._nome.trim() === "") return false;
      if (!this._categoria || this._categoria.trim() === "") return false;
      return true;
    }
  
    // Converte o objeto para um formato simples para salvar no arquivo JSON
    toJSON() {
      return {
        id: this._id,
        nome: this._nome,
        categoria: this._categoria,
        descricao: this._descricao,
        imagemUrl: this._imagemUrl
      };
    }
  
    // Cria um objeto Produto a partir de um dado vindo do JSON
    static fromJSON(json: any): Produto {
      return new Produto(
        json.nome,
        json.categoria,
        json.descricao,
        json.imagemUrl,
        json.id
      );
    }
  }