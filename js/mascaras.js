
let input_1 = document.querySelector('.mask-sonumeros');
let input_2 = document.querySelector('.mask-sonumeros-2');

formatandoValor(input_1)
formatandoValor(input_2)

function formatandoValor(input) {

    input.addEventListener("input", function (e) {
        let { value } = e.target;
        value = value.replace(/\D/g, "")
        input.value = value;
    });
}


