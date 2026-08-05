import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { UsuarioRepository } from "../repositories/UsuarioRepository";
import { Usuario } from "../entities/Usuario";

const usuarioRepo = new UsuarioRepository();

export const AuthController = {
  // GET /login -> Exibe a tela de login
  showLogin: (req: Request, res: Response) => {
    res.render("auth/login", { error: null });
  },

  // POST /login -> Processa a autenticação
  processLogin: async (req: Request, res: Response) => {
    const { email, password, senha } = req.body;
    const senhaInformada = password || senha;

    try {
      if (!email || !senhaInformada) {
        return res.render("auth/login", { error: "Informe e-mail e senha." });
      }

      const usuario = await usuarioRepo.findByEmail(email);
      if (!usuario) {
        return res.render("auth/login", { error: "E-mail ou senha inválidos." });
      }

      const senhaValida = await bcrypt.compare(senhaInformada, usuario.senha);
      if (!senhaValida) {
        return res.render("auth/login", { error: "E-mail ou senha inválidos." });
      }

      (req as any).session.usuario = typeof usuario.toJSON === "function" ? usuario.toJSON() : usuario;
      return res.redirect("/");
    } catch (error: any) {
      console.error("Erro no login:", error);
      return res.status(500).render("auth/login", { error: "Erro interno no servidor ao tentar logar." });
    }
  },

  // GET /register -> Exibe a tela de cadastro
  showRegister: (req: Request, res: Response) => {
    res.render("auth/register", { error: null });
  },

  // POST /register -> Cria o usuário e grava no dados/usuarios.json
  processRegister: async (req: Request, res: Response) => {
    const { name, nome, email, password, senha, confirmPassword, confirmarSenha, role } = req.body;

    const nomeFinal = name || nome;
    const senhaFinal = password || senha;
    const confirmacaoFinal = confirmPassword || confirmarSenha;

    try {
      // 1. Validação de campos obrigatórios
      if (!nomeFinal || !email || !senhaFinal) {
        return res.render("auth/register", { error: "Nome, e-mail e senha são obrigatórios." });
      }

      if (senhaFinal !== confirmacaoFinal) {
        return res.render("auth/register", { error: "As senhas não coincidem." });
      }

      // 2. Verifica se o e-mail já existe
      const usuarioExistente = await usuarioRepo.findByEmail(email);
      if (usuarioExistente) {
        return res.render("auth/register", { error: "Este e-mail já está cadastrado." });
      }

      // 3. Criptografa a senha
      const senhaHash = await bcrypt.hash(senhaFinal, 10);

     // 4. Instancia o novo usuário usando a sua entidade
const papelUsuario = role ? String(role) : "cliente";

const novoUsuario = new Usuario(
  String(nomeFinal),
  String(email),
  senhaHash,
  papelUsuario as any // O 'as any' previne a incompatibilidade de tipos do TypeScript
);

// 5. Salva no arquivo JSON via repositório
await usuarioRepo.create(novoUsuario);

      console.log(`✅ Usuário cadastrado e salvo com sucesso: ${email}`);

      // 6. Redireciona para a tela de login
      return res.redirect("/login");
    } catch (error: any) {
      console.error("Erro no cadastro:", error);
      return res.status(500).render("auth/register", { error: error.message || "Erro ao cadastrar usuário." });
    }
  },

  // GET /logout -> Encerra a sessão
  logout: (req: Request, res: Response) => {
    const reqSession = (req as any).session;
    if (reqSession) {
      reqSession.destroy(() => {
        res.redirect("/login");
      });
    } else {
      res.redirect("/login");
    }
  },
};