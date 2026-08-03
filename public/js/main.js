document.addEventListener("DOMContentLoaded", () => {

    const pesquisa = document.getElementById("pesquisa");

    pesquisa.addEventListener("keyup", () => {

        const texto = pesquisa.value.toLowerCase();

        const cards = document.querySelectorAll(".card");

        cards.forEach(card => {

            const nome = card.querySelector("h3").textContent.toLowerCase();

            if (nome.includes(texto)) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }

        });

    });

});