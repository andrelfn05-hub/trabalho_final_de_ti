import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { UsuarioRepository } from "../repositories/UsuarioRepository";
import { Usuario } from "../entities/Usuario";

const usuarioRepo = new UsuarioRepository();

export const AuthController = {
  showLogin: (req: Request, res: Response) => {
    res.render("auth/login", { error: null });
  },

  processLogin: async (req: Request, res: Response) => {
    const { email, password } = req.body;

    try {
      if (!email || !password) {
        return res.render("auth/login", { error: "Informe e-mail e senha." });
      }

      const usuario = await usuarioRepo.findByEmail(email);
      if (!usuario) {
        return res.render("auth/login", { error: "E-mail ou senha inválidos." });
      }

      const senhaValida = await bcrypt.compare(password, usuario.senha);
      if (!senhaValida) {
        return res.render("auth/login", { error: "E-mail ou senha inválidos." });
      }

      // Cast em (req as any) evita erro de compilação da propriedade session
      (req as any).session.usuario = usuario.toJSON();

      return res.redirect("/");
    } catch (error: any) {
      return res.status(500).render("auth/login", { error: "Erro interno no servidor." });
    }
  },

  showRegister: (req: Request, res: Response) => {
    res.render("auth/register", { error: null });
  },

  processRegister: async (req: Request, res: Response) => {
    const { name, email, password, confirmPassword } = req.body;

    try {
      if (!name || !email || !password) {
        return res.render("auth/register", { error: "Preencha todos os campos obrigatórios." });
      }

      if (password !== confirmPassword) {
        return res.render("auth/register", { error: "As senhas não coincidem." });
      }

      const jaExiste = await usuarioRepo.findByEmail(email);
      if (jaExiste) {
        return res.render("auth/register", { error: "Este e-mail já está cadastrado." });
      }

      const senhaHash = await bcrypt.hash(password, 10);

      // Instanciação compatível com a ordem do construtor de Usuario
      const novoUsuario = new Usuario(name, email, senhaHash, "cliente");
      await usuarioRepo.create(novoUsuario);

      return res.redirect("/login");
    } catch (error: any) {
      return res.status(500).render("auth/register", { error: error.message || "Erro ao cadastrar usuário." });
    }
  },

  logout: (req: Request, res: Response) => {
    const reqSession = (req as any).session;
    if (reqSession) {
      reqSession.destroy((err: any) => {
        if (err) {
          return res.status(500).send("Erro ao realizar logout.");
        }
        res.redirect("/login");
      });
    } else {
      res.redirect("/login");
    }
  },
};