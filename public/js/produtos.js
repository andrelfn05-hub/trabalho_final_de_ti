document.addEventListener("DOMContentLoaded", () => {

    const botoesComprar = document.querySelectorAll(".btn-comprar");

    botoesComprar.forEach(botao => {
        botao.addEventListener("click", () => {
            alert("Produto adicionado ao carrinho!");
        });
    });

});