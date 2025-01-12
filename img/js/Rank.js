let currentIndex = 0;
const images = document.querySelectorAll('.rank-image .rank');
const btnVoltar = document.querySelector('.btn-voltar');
const btnAvancar = document.querySelector('.btn-avancar');

function updateButtons() {
    // Desabilitar botão "Voltar" se já estiver na primeira imagem
    if (currentIndex === 0) {
        btnVoltar.disabled = true;
    } else {
        btnVoltar.disabled = false;
    }

    // Desabilitar botão "Avançar" se já estiver na última imagem
    if (currentIndex === images.length - 1) {
        btnAvancar.disabled = true;
    } else {
        btnAvancar.disabled = false;
    }
}

function showImage(index) {
    // Esconde todas as imagens
    images.forEach(img => img.style.display = 'none');
    // Mostra a imagem atual
    images[index].style.display = 'block';
    updateButtons();
}

function nextImage() {
    if (currentIndex < images.length - 1) {
        currentIndex++;
        showImage(currentIndex);
    }
}

function previousImage() {
    if (currentIndex > 0) {
        currentIndex--;
        showImage(currentIndex);
    }
}

// Inicializar exibindo a primeira imagem
showImage(currentIndex);
