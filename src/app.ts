import express from "express";
import path from "path";
import authRouter from "./routes/authRoutes"; // Importa as rotas de autenticação

const app = express();

// Configuração do motor de templates EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middlewares para processar dados de formulários e JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Arquivos estáticos (CSS, JS, imagens)
app.use(express.static(path.join(__dirname, "..", "public")));

// Servir a pasta de uploads de imagens
app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));

// Rotas de Autenticação (login, registro, logout)
app.use("/", authRouter);

// Rota inicial (Renderiza a View EJS)
app.get("/", (req, res) => {
  res.render("index");
});

export default app;



app.use('/uploads', express.static('uploads'));