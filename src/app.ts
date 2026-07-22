import express from "express";
import path from "path";
const app = express();

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

export default app;