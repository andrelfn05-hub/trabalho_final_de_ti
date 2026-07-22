export interface CriarUsuario {
    nome: string;
    email: string;
    senha: string;
    role?: 'admin' | 'cliente'; // Se não mandar, assume 'cliente'
}