// src/repositories/UsuarioRepository.ts
import fs from "fs/promises";
import path from "path";
import { Usuario } from "../entities/Usuario";

// Caminho para o arquivo JSON de dados
const filePath = path.join(__dirname, "..", "dados", "usuarios.json");

export interface IUsuarioRepository {
  create(data: Omit<Usuario, "id">): Promise<Usuario>;
  findById(id: string): Promise<Usuario | null>;
  findByEmail(email: string): Promise<Usuario | null>;
  findAll(): Promise<Usuario[]>;
  update(id: string, data: Partial<Usuario>): Promise<Usuario>;
  delete(id: string): Promise<void>;
}

export class UsuarioRepository implements IUsuarioRepository {
  // Lê os usuários do arquivo .json
  private async readData(): Promise<any[]> {
    try {
      const data = await fs.readFile(filePath, "utf-8");
      return JSON.parse(data);
    } catch (error) {
      // Se o arquivo não existir, retorna array vazio
      return [];
    }
  }

  // Escreve a lista atualizada no arquivo .json
  private async writeData(data: any[]): Promise<void> {
    await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");
  }

  async create(data: Omit<Usuario, "id">): Promise<Usuario> {
    const usuarios = await this.readData();
    
    // Gerando um ID simples caso sua entidade não gere automaticamente
    const novoUsuario = {
      id: Date.now().toString(),
      ...data,
    };

    usuarios.push(novoUsuario);
    await this.writeData(usuarios);
    return novoUsuario as unknown as Usuario;
  }

  async findById(id: string): Promise<Usuario | null> {
    const usuarios = await this.readData();
    const usuario = usuarios.find((u) => u.id === id);
    return usuario ? (usuario as Usuario) : null;
  }

  async findByEmail(email: string): Promise<Usuario | null> {
    const usuarios = await this.readData();
    const usuario = usuarios.find((u) => u.email === email);
    return usuario ? (usuario as Usuario) : null;
  }

  async findAll(): Promise<Usuario[]> {
    const usuarios = await this.readData();
    return usuarios as Usuario[];
  }

  async update(id: string, data: Partial<Usuario>): Promise<Usuario> {
    const usuarios = await this.readData();
    const index = usuarios.findIndex((u) => u.id === id);

    if (index === -1) {
      throw new Error("Usuário não encontrado");
    }

    usuarios[index] = { ...usuarios[index], ...data };
    await this.writeData(usuarios);
    return usuarios[index] as Usuario;
  }

  async delete(id: string): Promise<void> {
    const usuarios = await this.readData();
    const novosUsuarios = usuarios.filter((u) => u.id !== id);
    await this.writeData(novosUsuarios);
  }
}