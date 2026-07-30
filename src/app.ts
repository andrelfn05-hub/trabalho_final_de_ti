import express from "express";
import path from "path";
const app = express();
import authRouter from "./routes/authRoutes"; // Importa as rotas de autenticação

// Permite receber dados em JSON
app.use(express.json());

// Configuração do EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Arquivos estáticos
app.use(express.static(path.join(__dirname, "..", "public")));

// Pasta de uploads
app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));

// Rota inicial
app.get("/", (req, res) => {
    res.render("index");
});

// Rota de teste
app.get("/", (req, res) => {
    res.send("Bem-vindo à Casas Potiguar!");
});

// Permite receber dados em JSON e URL-encoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuração do EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Arquivos estáticos
app.use(express.static(path.join(__dirname, "..", "public")));

// Pasta de uploads
app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));

// Rotas
app.use("/", authRouter); // Usa as rotas de autenticação (login, register, logout)

// Rota inicial (Corrigida: juntamos as duas rotas "/" que você tinha)
app.get("/", (req, res) => {
    // Você pode escolher usar res.send ou res.render. 
    // Se quiser renderizar o HTML do EJS:
    res.render("index");
    
    // Se quiser enviar um texto simples, comente a linha acima e use a de baixo:
    // res.send("Bem-vindo à Casas Potiguar!");
});

export default app;



app.use('/uploads', express.static('uploads'));