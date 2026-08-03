import { Router, Request, Response } from "express";
import { Usuario } from "../entities/Usuario";

const router = Router();

// Simulação de banco de dados em memória (substitua pela sua lógica de repositório/JSON se houver)
let usuariosDB: Usuario[] = [];

// --- GET /usuarios - Listar todos os usuários ---
router.get("/", (req: Request, res: Response) => {
  try {
    const listaUsuarios = usuariosDB.map((user) => user.toJSON());
    return res.json(listaUsuarios);
  } catch (error: any) {
    return res.status(500).json({ erro: "Erro ao buscar usuários.", detalhe: error.message });
  }
});

// --- GET /usuarios/:email - Buscar um usuário específico pelo e-mail ---




router.get("/:email", (req: Request, res: Response) => {
  try {
    const { email } = req.params;
    const usuario = usuariosDB.find((u) => u.email === email);

    if (!usuario) {
      return res.status(404).json({ erro: "Usuário não encontrado." });
    }

    return res.json(usuario.toJSON());
  } catch (error: any) {
    return res.status(500).json({ erro: "Erro ao buscar usuário.", detalhe: error.message });
  }
});

// --- POST /usuarios - Criar um novo usuário ---
router.post("/", (req: Request, res: Response) => {
  try {
    // Instancia o Usuario a partir do corpo da requisição usando o método estático fromJSON
    const novoUsuario = Usuario.fromJSON(req.body);

    // Executa a validação do modelo
    if (!novoUsuario.validar()) {
      return res.status(400).json({ erro: "Dados de usuário inválidos." });
    }

    // Verifica se já existe um usuário com esse e-mail
    const emailExistente = usuariosDB.some((u) => u.email === novoUsuario.email);
    if (emailExistente) {
      return res.status(400).json({ erro: "E-mail já cadastrado." });
    }

    usuariosDB.push(novoUsuario);

    return res.status(201).json({
      mensagem: "Usuário criado com sucesso!",
      usuario: novoUsuario.toJSON(),
    });
  } catch (error: any) {
    // Captura os erros lançados pelos SETTERS (ex: nome curto, senha < 6 caracteres)
    return res.status(400).json({ erro: error.message });
  }
});

// --- PUT /usuarios/:email - Atualizar dados do usuário ---
router.put("/:email", (req: Request, res: Response) => {
  try {
    const { email } = req.params;
    const usuario = usuariosDB.find((u) => u.email === email);

    if (!usuario) {
      return res.status(404).json({ erro: "Usuário não encontrado." });
    }

    const { nome, senha, role, cpfCnpj, telefone } = req.body;

    // Atualiza os campos através dos Setters (que farão as validações)
    if (nome) usuario.nome = nome;
    if (senha) usuario.senha = senha;
    if (role) usuario.role = role;
    if (cpfCnpj !== undefined) usuario.cpfCnpj = cpfCnpj;
    if (telefone !== undefined) usuario.telefone = telefone;

    return res.json({
      mensagem: "Usuário atualizado com sucesso!",
      usuario: usuario.toJSON(),
    });
  } catch (error: any) {
    return res.status(400).json({ erro: error.message });
  }
});

// --- DELETE /usuarios/:email - Remover usuário ---
router.delete("/:email", (req: Request, res: Response) => {
  try {
    const { email } = req.params;
    const index = usuariosDB.findIndex((u) => u.email === email);

    if (index === -1) {
      return res.status(404).json({ erro: "Usuário não encontrado." });
    }

    usuariosDB.splice(index, 1);

    return res.json({ mensagem: "Usuário removido com sucesso." });
  } catch (error: any) {
    return res.status(500).json({ erro: "Erro ao deletar usuário.", detalhe: error.message });
  }
});

export default router;