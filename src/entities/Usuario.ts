export class Usuario {
    private _nome!: string;
    private _email!: string;
    private _senha!: string;
    private _role?: 'admin' | 'cliente';
    private _cpfCnpj?: string;
    private _telefone?: string;
  
    constructor(
        nome: string,
        email: string,
        senha: string,
        role?: 'admin' | 'cliente',
        cpfCnpj?: string,
        telefone?: string
    ) {
        this.nome = nome;
        this.email = email;
        this.senha = senha;
        this.role = role;
        this.cpfCnpj = cpfCnpj;
        this.telefone = telefone;
    }
  
    // --- GETTERS (Leitura) ---
  
    get nome(): string {
        return this._nome;
    }
  
    get email(): string {
        return this._email;
    }
  
    get senha(): string {
        return this._senha;
    }
  
    get role(): 'admin' | 'cliente' | undefined {
        return this._role;
    }
  
    get cpfCnpj(): string | undefined {
        return this._cpfCnpj;
    }
  
    get telefone(): string | undefined {
        return this._telefone;
    }
  
    // --- SETTERS (Validação e Alteração) ---
  
    set nome(novoNome: string) {
        if (novoNome.trim().length < 3) {
            throw new Error("O nome deve ter pelo menos 3 caracteres.");
        }
        this._nome = novoNome.trim();
    }
  
    set email(novoEmail: string) {
        // Validação básica de formato de email
        if (!novoEmail.includes('@') || !novoEmail.includes('.')) {
            throw new Error("Formato de email inválido.");
        }
        this._email = novoEmail.trim().toLowerCase();
    }
  
    set senha(novaSenha: string) {
        if (novaSenha.length < 6) {
            throw new Error("A senha deve ter pelo menos 6 caracteres.");
        }
        this._senha = novaSenha;
    }
  
    set role(novaRole: 'admin' | 'cliente' | undefined) {
        this._role = novaRole;
    }
  
    set cpfCnpj(novoCpfCnpj: string | undefined) {
        // Remove espaços em branco caso seja enviado
        this._cpfCnpj = novoCpfCnpj?.trim();
    }
  
    set telefone(novoTelefone: string | undefined) {
        this._telefone = novoTelefone?.trim();
    }
  
    // --- VALIDAÇÃO ---
  
    validar(): boolean {
        if (!this._nome || this._nome.trim() === "") {
            return false;
        }
  
        if (!this._email || !this._email.includes('@')) {
            return false;
        }
  
        if (!this._senha || this._senha.length < 6) {
            return false;
        }
  
        return true;
    }
  
    // --- CONVERTE O OBJETO PARA JSON ---
    
    toJSON() {
        return {
            nome: this._nome,
            email: this._email,
            // Nota de segurança: Geralmente não retornamos a senha no toJSON 
            // a menos que seja estritamente necessário. Se não precisar, comente a linha abaixo.
            senha: this._senha, 
            role: this._role,
            cpfCnpj: this._cpfCnpj,
            telefone: this._telefone
        };
    }
  
    // --- CRIA UM USUÁRIO A PARTIR DE UM JSON ---
  
    static fromJSON(json: any): Usuario {
        return new Usuario(
            json.nome,
            json.email,
            json.senha,
            json.role,
            json.cpfCnpj,
            json.telefone
        );
    }
  }