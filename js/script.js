        // Seleção dos elementos
        const mobileMenu = document.querySelector('.mobile-menu');
        const navMenu = document.querySelector('nav ul');
        const newsIcon = document.querySelector('.news');
        const newsMobile = document.querySelector('.news-mobile');
        
        mobileMenu.addEventListener('click', () => {
            // Alterna a classe 'show' no menu de navegação
            navMenu.classList.toggle('show');
            
            // Alterna a visibilidade do ícone de notícias para dispositivos móveis
            if (navMenu.classList.contains('show')) {
                newsMobile.style.visibility = 'visible';  // Torna visível
                newsMobile.style.pointerEvents = 'auto';  // Permite interação
            } else {
                newsMobile.style.visibility = 'hidden';  // Torna invisível
                newsMobile.style.pointerEvents = 'none';  // Desabilita interação
            }

            // Alterna a visibilidade do ícone de notícias para a versão de desktop
            newsIcon.style.display = navMenu.classList.contains('show') ? 'none' : 'flex';
            
            // Alterna a classe 'open' no botão de menu (responsável pela animação)
            mobileMenu.classList.toggle('open');
            
            // Impede a rolagem da página ao abrir o menu
            document.body.classList.toggle('no-scroll');
        });

