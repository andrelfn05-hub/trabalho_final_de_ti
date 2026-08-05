import { Router } from "express";
import { CarrinhoController } from "../controllers/CarrinhoControler";

const carrinhoRouter = Router();

carrinhoRouter.get("/carrinho", CarrinhoController.index);
carrinhoRouter.post("/carrinho/adicionar", CarrinhoController.adicionar);
carrinhoRouter.post("/carrinho/remover", CarrinhoController.remover);
carrinhoRouter.post("/carrinho/atualizar", CarrinhoController.atualizar);




export default carrinhoRouter;