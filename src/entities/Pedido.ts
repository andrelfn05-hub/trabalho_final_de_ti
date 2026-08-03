// --- Interface Auxiliar para Itens do Pedido ---
export interface ItemPedido {
    produtoId: string;
    nomeProduto: string;
    quantidade: number;
    precoUnitario: number;
  }
  
  // --- Entidade Pedido ---
  export class Pedido {
    private _id!: string;
    private _usuarioEmail!: string;
    private _itens!: ItemPedido[];
    private _valorTotal!: number;
    private _status!: "pendente" | "pago" | "em_transporte" | "entregue" | "cancelado";
    private _enderecoEntrega!: string;
    private _criadoEm!: Date;
  
    constructor(
      usuarioEmail: string,
      itens: ItemPedido[] = [],
      enderecoEntrega: string,
      status: "pendente" | "pago" | "em_transporte" | "entregue" | "cancelado" = "pendente",
      id: string = "",
      criadoEm: Date = new Date()
    ) {
      this._id = id || Date.now().toString();
      this.usuarioEmail = usuarioEmail;
      this.itens = itens; // O setter valida os itens e chama recalcularValorTotal()
      this.enderecoEntrega = enderecoEntrega;
      this.status = status;
      this._criadoEm = criadoEm;
    }
  
    // --- GETTERS (Leitura) ---
  
    get id(): string {
      return this._id;
    }
  
    get usuarioEmail(): string {
      return this._usuarioEmail;
    }
  
    get itens(): ItemPedido[] {
      return this._itens;
    }
  
    get valorTotal(): number {
      return this._valorTotal;
    }
  
    get status(): string {
      return this._status;
    }
  
    get enderecoEntrega(): string {
      return this._enderecoEntrega;
    }
  
    get criadoEm(): Date {
      return this._criadoEm;
    }
  
    // --- SETTERS (Validação e Alteração) ---
  
    set id(novoId: string) {
      if (!novoId || novoId.trim() === "") {
        throw new Error("O ID do pedido não pode ser vazio.");
      }
      this._id = novoId;
    }
  
    set usuarioEmail(novoEmail: string) {
      if (!novoEmail || !novoEmail.includes("@")) {
        throw new Error("E-mail do usuário inválido para vincular ao pedido.");
      }
      this._usuarioEmail = novoEmail.trim().toLowerCase();
    }
  
    set itens(novosItens: ItemPedido[]) {
      if (!novosItens || novosItens.length === 0) {
        throw new Error("O pedido deve conter pelo menos um produto.");
      }
      this._itens = novosItens;
      this.recalcularValorTotal();
    }
  
    set status(novoStatus: "pendente" | "pago" | "em_transporte" | "entregue" | "cancelado") {
      const statusValidos = ["pendente", "pago", "em_transporte", "entregue", "cancelado"];
      if (!statusValidos.includes(novoStatus)) {
        throw new Error("Status de pedido inválido.");
      }
      this._status = novoStatus;
    }
  
    set enderecoEntrega(novoEndereco: string) {
      if (!novoEndereco || novoEndereco.trim().length < 5) {
        throw new Error("O endereço de entrega deve ter pelo menos 5 caracteres.");
      }
      this._enderecoEntrega = novoEndereco.trim();
    }
  
    // --- MÉTODOS AUXILIARES ---
  
    private recalcularValorTotal(): void {
      const total = this._itens.reduce(
        (acc, item) => acc + item.quantidade * item.precoUnitario,
        0
      );
      this._valorTotal = Math.round(total * 100) / 100;
    }
  
    // --- VALIDAÇÃO ---
  
    validar(): boolean {
      if (!this._usuarioEmail || !this._usuarioEmail.includes("@")) {
        return false;
      }
      if (!this._itens || this._itens.length === 0) {
        return false;
      }
      if (!this._enderecoEntrega || this._enderecoEntrega.trim() === "") {
        return false;
      }
      if (this._valorTotal <= 0) {
        return false;
      }
      return true;
    }
  
    // --- CONVERTE O OBJETO PARA JSON ---
  
    toJSON(): Record<string, any> {
      return {
        id: this._id,
        usuarioEmail: this._usuarioEmail,
        itens: this._itens,
        valorTotal: this._valorTotal,
        status: this._status,
        enderecoEntrega: this._enderecoEntrega,
        criadoEm: this._criadoEm ? this._criadoEm.toISOString() : new Date().toISOString(),
      };
    }
  
    // --- CRIA UM PEDIDO A PARTIR DE UM JSON ---
  
    static fromJSON(json: any): Pedido {
      return new Pedido(
        json.usuarioEmail,
        json.itens || [],
        json.enderecoEntrega,
        json.status,
        json.id,
        json.criadoEm ? new Date(json.criadoEm) : new Date()
      );
    }
  }