import express from "express";
import path from "path";

// Importação das rotas (todas usando o caminho relativo correto "./routes/...")
import authRouter from "../src/routes/authRoutes";
import produtoRouter from "../src/routes/produtoRoutes";
import categoriaRouter from "../src/routes/categoriaRoutes";
import pedidoRouter from "../src/routes/pedidoRoutes";
import usuarioRouter from "../src/routes/usuarioRoutes"; 

const app = express();

// Configuração do motor de templates EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Middlewares para processar dados de formulários e JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Arquivos estáticos (CSS, JS, imagens estáticas)
app.use(express.static(path.join(__dirname, "..", "public")));

// Servir a pasta de uploads de imagens
app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));

// --- Registro das Rotas ---

// Autenticação (Login, Registro, Logout)
app.use("/", authRouter);

// Rotas das Entidades
app.use("/produtos", produtoRouter);
app.use("/categorias", categoriaRouter);
app.use("/pedidos", pedidoRouter);
app.use("/usuarios", usuarioRouter);

// Rota Inicial (Renderiza a View principal)
app.get("/", (req, res) => {
  res.render("index");
});

export default app;

