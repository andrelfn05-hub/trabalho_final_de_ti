import { Request, Response } from "express";

export const ProductController = {
    // Exibe a página com a lista de produtos
    showProducts: async (req: Request, res: Response) => {
        try {
            // LÓGICA PARA BUSCAR PRODUTOS NO BANCO DE DADOS AQUI
            // Exemplo mock (remova depois):
            const products = [
                { id: 1, name: "Camisa", price: 79.90, description: "Camisa de algodão" },
                { id: 2, name: "Calça Jeans", price: 129.90, description: "Calça jeans slim fit" },
            ];
            res.render("products/list", { products, error: null });
        } catch (error) {
            return res.status(500).render("products/list", { products: [], error: "Erro ao carregar produtos." });
        }
    },

    // Exibe o formulário para criar um novo produto
    showCreateProduct: (req: Request, res: Response) => {
        res.render("products/create", { error: null });
    },

    // Processa a criação de um novo produto
    processCreateProduct: async (req: Request, res: Response) => {
        const { name, price, description } = req.body;

        try {
            // Validação básica
            if (!name || !price) {
                return res.render("products/create", { error: "Nome e preço são obrigatórios." });
            }

            // LÓGICA PARA SALVAR O NOVO PRODUTO NO BANCO DE DADOS AQUI
            console.log(`Novo produto criado: ${name}, ${price}, ${description}`);

            return res.redirect("/products");
        } catch (error) {
            return res.status(500).render("products/create", { error: "Erro ao criar produto." });
        }
    },

    // Exibe o formulário para editar um produto existente
    showEditProduct: async (req: Request, res: Response) => {
        const idParam = req.params.id;
const id = Array.isArray(idParam) ? idParam[0] : idParam;
        try {
            // LÓGICA PARA BUSCAR O PRODUTO PELO ID NO BANCO DE DADOS AQUI
            // Exemplo mock (remova depois):
            const product = { id: parseInt(id), name: "Camisa Editada", price: 89.90, description: "Camisa de algodão editada" }; // Simula um produto encontrado

            if (!product) {
                return res.status(404).redirect("/products");
            }
            res.render("products/edit", { product, error: null });
        } catch (error) {
            return res.status(500).redirect("/products");
        }
    },

    // Processa a edição de um produto existente
    processEditProduct: async (req: Request, res: Response) => {
        const { id } = req.params;
        const { name, price, description } = req.body;

        try {
            // Validação básica
            if (!name || !price) {
                // Pode ser melhor renderizar a página de edição com o erro
                return res.redirect(`/products/edit/${id}`);
            }

            // LÓGICA PARA ATUALIZAR O PRODUTO NO BANCO DE DADOS AQUI
            console.log(`Produto ${id} atualizado: ${name}, ${price}, ${description}`);

            return res.redirect("/products");
        } catch (error) {
            return res.status(500).redirect("/products");
        }
    },

    // Exclui um produto
    deleteProduct: async (req: Request, res: Response) => {
        const { id } = req.params;

        try {
            // LÓGICA PARA EXCLUIR O PRODUTO DO BANCO DE DADOS AQUI
            console.log(`Produto ${id} excluído.`);

            return res.redirect("/products");
        } catch (error) {
            return res.status(500).redirect("/products");
        }
    },
};
