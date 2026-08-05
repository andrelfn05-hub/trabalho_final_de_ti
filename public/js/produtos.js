document.querySelectorAll(".btn-comprar").forEach(botao => {

    botao.addEventListener("click", () => {

        window.location.href = "/products/detalhe";

    });

});

const adicionar = document.querySelector(".btn-adicionar");

if(adicionar){

    adicionar.addEventListener("click", ()=>{

        alert("Produto adicionado ao carrinho!");

    });

}