export class Categoria {
    // 1. Declaração explícita de todas as propriedades privadas
    private _id: string;
    private _nome!: string; // Usa '!' pois é inicializado via setter no construtor
    private _slug!: string; // Usa '!' pois é inicializado via setter no construtor
    private _descricao?: string;
    private _imagemUrl?: string;
    private _parentCategoryId?: string;
    private _subCategories?: Categoria[];
    private _isActive: boolean;
    private _createdAt: Date;
    private _updatedAt: Date;
  
    constructor(
      nome: string,
      slug: string,
      descricao: string = '',
      imagemUrl: string = '',
      parentCategoryId: string = '',
      isActive: boolean = true,
      id: string = '',
      createdAt: Date = new Date(),
      updatedAt: Date = new Date()
    ) {
      this._id = id || Date.now().toString();
      this.nome = nome; // Executa a validação do 'set nome'
      this.slug = slug; // Executa a validação do 'set slug'
      this._descricao = descricao;
      this._imagemUrl = imagemUrl;
      this._parentCategoryId = parentCategoryId;
      this._isActive = isActive;
      this._createdAt = createdAt;
      this._updatedAt = updatedAt;
    }
  
    // --- GETTERS (Leitura) ---
  
    get id(): string {
      return this._id;
    }
  
    get nome(): string {
      return this._nome;
    }
  
    get slug(): string {
      return this._slug;
    }
  
    get descricao(): string | undefined {
      return this._descricao;
    }
  
    get imagemUrl(): string | undefined {
      return this._imagemUrl;
    }
  
    get parentCategoryId(): string | undefined {
      return this._parentCategoryId;
    }
  
    get subCategories(): Categoria[] | undefined {
      return this._subCategories;
    }
  
    get isActive(): boolean {
      return this._isActive;
    }
  
    get createdAt(): Date {
      return this._createdAt;
    }
  
    get updatedAt(): Date {
      return this._updatedAt;
    }
  
    // --- SETTERS (Validação e Alteração) ---
  
    set id(novoId: string) {
      if (novoId.trim() === '') {
        throw new Error('O ID da categoria não pode ser vazio.');
      }
      this._id = novoId;
    }
  
    set nome(novoNome: string) {
      if (!novoNome || novoNome.trim().length < 2) {
        throw new Error('O nome da categoria deve ter pelo menos 2 caracteres.');
      }
      this._nome = novoNome.trim();
    }
  
    set slug(novoSlug: string) {
      if (!novoSlug || novoSlug.trim().length < 2) {
        throw new Error('O slug da categoria deve ter pelo menos 2 caracteres.');
      }
      this._slug = novoSlug.trim().toLowerCase().replace(/\s+/g, '-');
    }
  
    set descricao(novaDescricao: string | undefined) {
      this._descricao = novaDescricao;
    }
  
    set imagemUrl(novaImagemUrl: string | undefined) {
      this._imagemUrl = novaImagemUrl;
    }
  
    set parentCategoryId(novoParentId: string | undefined) {
      this._parentCategoryId = novoParentId;
    }
  
    set subCategories(novasSubCategories: Categoria[] | undefined) {
      this._subCategories = novasSubCategories;
    }
  
    set isActive(status: boolean) {
      this._isActive = status;
    }
  
    set createdAt(date: Date) {
      this._createdAt = date;
    }
  
    set updatedAt(date: Date) {
      this._updatedAt = date;
    }
  
    // --- VALIDAÇÃO ---
  
    validar(): boolean {
      if (!this._nome || this._nome.trim().length < 2) {
        return false;
      }
      if (!this._slug || this._slug.trim().length < 2) {
        return false;
      }
      return true;
    }
  
    // --- CONVERTE O OBJETO PARA JSON ---
  
    toJSON(): Record<string, any> {
      return {
        id: this._id,
        nome: this._nome,
        slug: this._slug,
        descricao: this._descricao,
        imagemUrl: this._imagemUrl,
        parentCategoryId: this._parentCategoryId,
        subCategories: this._subCategories?.map((sub) => sub.toJSON()),
        isActive: this._isActive,
        createdAt: this._createdAt ? this._createdAt.toISOString() : new Date().toISOString(),
        updatedAt: this._updatedAt ? this._updatedAt.toISOString() : new Date().toISOString(),
      };
    }
  
    // --- CRIA UMA CATEGORIA A PARTIR DE UM JSON ---
  
    static fromJSON(json: any): Categoria {
      const categoria = new Categoria(
        json.nome,
        json.slug,
        json.descricao,
        json.imagemUrl,
        json.parentCategoryId,
        json.isActive,
        json.id,
        json.createdAt ? new Date(json.createdAt) : new Date(),
        json.updatedAt ? new Date(json.updatedAt) : new Date()
      );
  
      if (json.subCategories && Array.isArray(json.subCategories)) {
        categoria.subCategories = json.subCategories.map((subJson: any) =>
          Categoria.fromJSON(subJson)
        );
      }
  
      return categoria;
    }
  }
  
  