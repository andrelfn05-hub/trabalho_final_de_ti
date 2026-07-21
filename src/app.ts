import express from "express";

const app = express();

// Permite receber dados em JSON
app.use(express.json());

// Rota de teste
app.get("/", (req, res) => {
    res.send("Bem-vindo à Casas Potiguar!");
});

export default app;