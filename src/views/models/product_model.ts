export class Produto {
    private _id!: string;      
    private _nome!: string;      
    private _descricao!: string;
    private _preco!: number;
    private _categoria!: string;
    private _imagemUrl!: string; 

    constructor(
        id: string,
        nome: string,
        descricao: string,
        preco: number,
        categoria: string,
        imagemUrl: string
    ) {
        
        this.id = id;
        this.nome = nome;
        this.descricao = descricao;
        this.preco = preco;
        this.categoria = categoria;
        this.imagemUrl = imagemUrl;
    }

    // --- GETTERS (Leitura) ---
    get id(): string { return this._id; }
    get nome(): string { return this._nome; }
    get descricao(): string { return this._descricao; }
    get preco(): number { return this._preco; }
    get categoria(): string { return this._categoria; }
    get imagemUrl(): string { return this._imagemUrl; }

    // --- SETTERS (Validação e Alteração) ---
    set id(novoId: string) {
        if (novoId.trim() === '') throw new Error("O ID não pode ser vazio.");
        this._id = novoId;
    }

    set nome(novoNome: string) {
        if (novoNome.trim().length < 3) throw new Error("O nome do produto deve ter pelo menos 3 caracteres.");
        this._nome = novoNome.trim();
    }

    set descricao(novaDescricao: string) {
        this._descricao = novaDescricao;
    }

    set preco(novoPreco: number) {
        if (novoPreco < 0) throw new Error("O preço não pode ser negativo.");
        this._preco = Math.round(novoPreco * 100) / 100; 
    }

    set categoria(novaCategoria: string) {
        if (novaCategoria.trim() === '') throw new Error("A categoria não pode ser vazia.");
        this._categoria = novaCategoria.trim();
    }

    set imagemUrl(novaImagemUrl: string) {
        this._imagemUrl = novaImagemUrl;
    }}