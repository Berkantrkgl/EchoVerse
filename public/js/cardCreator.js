
document.getElementById("plusButton").addEventListener("click", function() {
    var inputBox = document.getElementById("input-box");
    if (inputBox.classList.contains('d-none')) {
        inputBox.classList.remove('d-none'); // Div'i görünür yap
    } else {
        inputBox.classList.add('d-none'); // Div'i gizle
    }
});

