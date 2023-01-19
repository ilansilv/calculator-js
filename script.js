const calculator = document.querySelector(".calculator");
const botoes = calculator.querySelector(".botoes");

botoes.addEventListener("click", (e) => {
    if (e.target.matches("button")) {
    console.log("ok");
    }

});

