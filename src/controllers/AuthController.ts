import { Request, Response } from "express";

export const AuthController = {
    // Exibe a página de login
    showLogin: (req: Request, res: Response) => {
        res.render("auth/login", { error: null }); // Passa error null para o EJS não quebrar
    },

    // Processa o login
    processLogin: async (req: Request, res: Response) => {
        const { email, password } = req.body;

        try {
            // LÓGICA DE AUTENTICAÇÃO AQUI
            // 1. Buscar usuário no banco pelo email
            // const user = await User.findOne({ where: { email } });
            
            // 2. Verificar se o usuário existe e se a senha está correta
            // const passwordMatch = await bcrypt.compare(password, user.password);
            
            // Exemplo mock (remova depois):
            if (email === "admin@casaspotiguar.com" && password === "123456") {
                // 3. Criar sessão ou gerar token JWT
                // req.session.userId = user.id; 
                
                // Redireciona para a página inicial após login bem-sucedido
                return res.redirect("/");
            }

            // Se o login falhar, renderiza a página novamente com mensagem de erro
            return res.render("auth/login", { error: "E-mail ou senha inválidos." });

        } catch (error) {
            return res.status(500).render("auth/login", { error: "Erro interno no servidor." });
        }
    },

    // Exibe a página de cadastro
    showRegister: (req: Request, res: Response) => {
        res.render("auth/register", { error: null });
    },

    // Processa o cadastro
    processRegister: async (req: Request, res: Response) => {
        const { name, email, password, confirmPassword } = req.body;

        try {
            // Validação básica de senhas
            if (password !== confirmPassword) {
                return res.render("auth/register", { error: "As senhas não coincidem." });
            }

            // LÓGICA DE REGISTRO AQUI
            // 1. Verificar se o e-mail já existe no banco
            // 2. Criptografar a senha (bcrypt.hash)
            // 3. Salvar o usuário no banco
            
            console.log(`Usuário cadastrado: ${name}, ${email}`);

            // Após cadastro, redireciona para o login
            return res.redirect("/login");

        } catch (error) {
            return res.status(500).render("auth/register", { error: "Erro ao cadastrar usuário." });
        }
    },

    // Logout
    logout: (req: Request, res: Response) => {
        // Destroi a sessão se estiver usando express-session
        // req.session.destroy(() => {
        //     res.redirect("/login");
        // });

        // Redirecionamento simples temporário
        res.redirect("/login");
    }
};