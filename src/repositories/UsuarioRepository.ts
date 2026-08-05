import fs from "fs/promises";
import { existsSync, mkdirSync } from "fs";
import path from "path";
import { Usuario } from "../entities/Usuario";

// Sobe 2 níveis de 'src/repositories' para a RAIZ do projeto e entra na pasta 'dados'
const dadosDir = path.resolve(__dirname, "..", "..", "dados");
const filePath = path.join(dadosDir, "usuarios.json");

// Garante que a pasta 'dados' exista
if (!existsSync(dadosDir)) {
  mkdirSync(dadosDir, { recursive: true });
}

export class UsuarioRepository {
  private async readData(): Promise<Usuario[]> {
    try {
      if (!existsSync(filePath)) {
        await fs.writeFile(filePath, "[]", "utf-8");
        return [];
      }
      const data = await fs.readFile(filePath, "utf-8");
      const jsonList = JSON.parse(data || "[]");
      return jsonList.map((item: any) => Usuario.fromJSON(item));
    } catch (error) {
      console.error("Erro ao ler dados/usuarios.json:", error);
      return [];
    }
  }

  private async writeData(usuarios: Usuario[]): Promise<void> {
    try {
      const jsonList = usuarios.map((u) => (u.toJSON ? u.toJSON() : u));
      await fs.writeFile(filePath, JSON.stringify(jsonList, null, 2), "utf-8");
    } catch (error) {
      console.error("Erro ao escrever dados/usuarios.json:", error);
    }
  }

  async create(usuario: Usuario): Promise<Usuario> {
    const usuarios = await this.readData();
    usuarios.push(usuario);
    await this.writeData(usuarios);
    return usuario;
  }

  async findByEmail(email: string): Promise<Usuario | null> {
    const usuarios = await this.readData();
    const usuario = usuarios.find((u) => u.email.toLowerCase() === email.toLowerCase());
    return usuario || null;
  }

  async findAll(): Promise<Usuario[]> {
    return await this.readData();
  }
}