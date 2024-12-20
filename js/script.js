// Seleção dos elementos
const mobileMenu = document.querySelector('.mobile-menu');
const navMenu = document.querySelector('nav ul');
const newsIcon = document.querySelector('.news');
const newsMobile = document.querySelector('.news-mobile');
const navLinks = document.querySelectorAll('nav ul li a');

// Função para fechar o menu
function closeMenu() {
    navMenu.classList.remove('show');
    mobileMenu.classList.remove('open');
    newsMobile.style.visibility = 'hidden';
    newsMobile.style.pointerEvents = 'none';
    newsIcon.style.display = 'flex';
    document.body.classList.remove('no-scroll');
}

// Evento para o botão do menu mobile
mobileMenu.addEventListener('click', () => {
    navMenu.classList.toggle('show');

    if (navMenu.classList.contains('show')) {
        newsMobile.style.visibility = 'visible';
        newsMobile.style.pointerEvents = 'auto';
    } else {
        newsMobile.style.visibility = 'hidden';
        newsMobile.style.pointerEvents = 'none';
    }

    newsIcon.style.display = navMenu.classList.contains('show') ? 'none' : 'flex';
    mobileMenu.classList.toggle('open');
    document.body.classList.toggle('no-scroll');
});

// Evento para cada link de navegação
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        closeMenu();
    });
});
