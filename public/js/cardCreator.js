document.getElementById("plusButton").addEventListener("click", function() {
    var inputBox = document.getElementById("input-box");
    if (inputBox.classList.contains('d-none')) {
        inputBox.classList.remove('d-none'); // Div'i görünür yap
    } else {
        inputBox.classList.add('d-none'); // Div'i gizle
    }
});

document.addEventListener("DOMContentLoaded", function() {
    const cards = document.querySelectorAll('.grid-placement');
    const maxColumns = 5;
    const maxRows = 4;
    const totalPositions = maxColumns * maxRows;

    const savedPositions = localStorage.getItem('cardPositions');
    let positions = savedPositions ? JSON.parse(savedPositions) : [];
    let availablePositions = [];

    if (!savedPositions) {
        // Eğer kaydedilmiş pozisyon yoksa, tüm pozisyonları oluştur
        for (let row = 1; row <= maxRows; row++) {
            for (let col = 1; col <= maxColumns; col++) {
                availablePositions.push({ column: col, row: row });
            }
        }
    } else {
        // Kaydedilmiş pozisyonlar varsa, kullanılmayan pozisyonları hesapla
        const usedPositions = new Set(positions.map(pos => `${pos.column}-${pos.row}`));
        for (let row = 1; row <= maxRows; row++) {
            for (let col = 1; col <= maxColumns; col++) {
                if (!usedPositions.has(`${col}-${row}`)) {
                    availablePositions.push({ column: col, row: row });
                }
            }
        }
    }

    // Mevcut kartların pozisyonlarını güncelle veya yeni kartlar için pozisyon ata
    cards.forEach((card, index) => {
        if (!positions[index]) {
            // Yeni kart için pozisyon ata
            const positionIndex = Math.floor(Math.random() * availablePositions.length);
            const position = availablePositions.splice(positionIndex, 1)[0];
            positions[index] = position; // Yeni pozisyonu kaydet
        }
        // Pozisyonu uygula
        card.style.gridColumn = positions[index].column;
        card.style.gridRow = positions[index].row;
    });

    // Güncellenmiş pozisyonları Local Storage'a kaydet
    localStorage.setItem('cardPositions', JSON.stringify(positions));
});