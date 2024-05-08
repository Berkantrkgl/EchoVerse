document.addEventListener("DOMContentLoaded", function () {
    // Flash mesajları için zamanlayıcı ayarlayın
    const alertTimeout = 600; // Mesajın ekranda kalacağı süre (milisaniye olarak). Örneğin 5000 ms = 5 saniye
    const alertBox = document.querySelector(".alert");

    if (alertBox) {
        setTimeout(function () {
            alertBox.style.transition = "opacity 1.5s ease"; // Saydamlık azalmasının süresini ve animasyon tipini ayarla
            alertBox.style.opacity = "0"; // Yavaşça saydamlığı azaltarak kaybolmasını sağla
            setTimeout(function () {
                alertBox.remove(); // Tamamen saydamlığı azaldıktan sonra DOM'dan kaldır
            }, 2500); // Saydamlığı azalma süresi
        }, alertTimeout);
    }
});
