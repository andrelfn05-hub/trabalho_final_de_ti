import fs from "fs/promises";
import path from "path";
import { Usuario } from "../entities/Usuario";

const filePath = path.join(__dirname, "..", "dados", "usuarios.json");

export class UsuarioRepository {
  private async readData(): Promise<Usuario[]> {
    try {
      const data = await fs.readFile(filePath, "utf-8");
      const jsonList = JSON.parse(data);
      return jsonList.map((item: any) => Usuario.fromJSON(item));
    } catch (error) {
      return [];
    }
  }

  private async writeData(usuarios: Usuario[]): Promise<void> {
    const jsonList = usuarios.map((u) => u.toJSON());
    await fs.writeFile(filePath, JSON.stringify(jsonList, null, 2), "utf-8");
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