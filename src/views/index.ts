// Importa a classe do outro arquivo
import { Produto } from "./models/product_model";


// Criando o produto com as informações reais
const celular = new Produto(
    "1", 
    "iPhone 15", 
    "Celular da Apple", 
    5000, 
    "Smartphones", 
    "http://imagem.com/iphone.jpg"
);

console.log(celular.preco); // Usa o GETTER -> 5000

// Alterando o preço (Usa o SETTER)
celular.preco = 4500; 
console.log(celular.preco); // 4500

// Tentando colocar um preço inválido (O SETTER vai barrar)
try {
    celular.preco = -100;
} catch (error: any) {
    console.error(error.message); // Imprime: "O preço não pode ser negativo."
    console.log(celular.preco);   // Continua sendo 4500, o valor foi protegido
}

// Tentando colocar um nome inválido
try {
    celular.nome = "AB"; // Menos de 3 caracteres
} catch (error: any) {
    console.error(error.message); // Imprime: "O nome do produto deve ter pelo menos 3 caracteres."
}