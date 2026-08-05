import express from "express";
import path from "path";
import session from "express-session";

// Importação das rotas com caminho absoluto a partir de src
import authRouter from "../src/routes/authRoutes";
import produtoRouter from "../src/routes/produtoRoutes";
import categoriaRouter from "../src/routes/categoriaRoutes";
import pedidoRouter from "../src/routes/pedidoRoutes";
import usuarioRouter from "../src/routes/usuarioRoutes";

const app = express();

// Configuração do motor de templates EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Configuração da Sessão
app.use(
  session({
    secret: "casas_potiguar_secret_key_123",
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false },
  })
);

// Middlewares para processar dados de formulários e JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Arquivos estáticos
app.use(express.static(path.join(__dirname, "..", "public")));

// Servir a pasta de uploads
app.use("/uploads", express.static(path.join(__dirname, "..", "public", "uploads")));

// --- Registro das Rotas ---
app.use("/", authRouter);
app.use("/products", produtoRouter);
app.use("/categorias", categoriaRouter);
app.use("/pedidos", pedidoRouter);
app.use("/usuarios", usuarioRouter);

// Rota Inicial
app.get("/", (req, res) => {
  const usuario = (req as any).session?.usuario || null;
  res.render("index", { usuario });
});

import carrinhoRouter from "./routes/carrinhoRoutes";
app.use("/", carrinhoRouter);

export default app;