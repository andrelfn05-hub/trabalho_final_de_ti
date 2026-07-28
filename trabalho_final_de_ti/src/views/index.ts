// Importa a classe do outro arquivo
import { Produto } from "./models/product_model";


// Criando o produto com as informações reais
const cama = new Produto(
    "1", 
    "Cama Box Casal",
    " 1,38 m Suede Prince",
    300,
    "quarto",
    "imagem da cama"
);

console.log(cama.preco); // Usa o GETTER -> 5000

// Alterando o preço (Usa o SETTER)
cama.preco = 300; 
console.log(cama.preco); // 4500

// Tentando colocar um preço inválido (O SETTER vai barrar)
try {
    cama.preco = -100;
} catch (error: any) {
    console.error(error.message); // Imprime: "O preço não pode ser negativo."
    console.log(cama.preco);   // Continua sendo 4500, o valor foi protegido
}

// Tentando colocar um nome inválido
try {
    cama.nome = "AB"; // Menos de 3 caracteres
} catch (error: any) {
    console.error(error.message); // Imprime: "O nome do produto deve ter pelo menos 3 caracteres."
}

const sofá = new Produto(
    "1", 
    "Sofá Living 3 Lugares",
    " Linho Resistente Madeira + Almofadas",
    700,
    "sala",
    "imagem do sofá"
);

console.log(sofá.preco); 
sofá.preco = 300; 
console.log(sofá.preco); 

try {
    sofá.preco = -100;
} catch (error: any) {
    console.error(error.message); 
    console.log(sofá.preco);   
}


try {
    sofá.nome = "AB"; 
} catch (error: any) {
    console.error(error.message); 
}