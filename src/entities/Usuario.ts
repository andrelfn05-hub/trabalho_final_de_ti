export interface Usuario {
    nome: string;
    email: string;
    senha: string;
    role?: 'admin' | 'cliente'; 
    cpfCnpj?: string; 
    telefone?: string; }

