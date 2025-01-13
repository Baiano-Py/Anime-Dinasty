// Seleção dos elementos
const mobileMenu = document.querySelector('.mobile-menu');
const navMenu = document.querySelector('nav ul');
const newsIcon = document.querySelector('.news');
const newsMobile = document.querySelector('.news-mobile');
const navItems = document.querySelectorAll('nav ul li'); // Seleciona os <li>

let selectedCount = 0;
let totalRobux = 0;
let cartItems = []; // Armazenar os itens selecionados

// Função para fechar o menu
function closeMenu() {
    if (navMenu) navMenu.classList.remove('show');
    if (mobileMenu) mobileMenu.classList.remove('open');
    if (newsMobile) {
        newsMobile.style.visibility = 'hidden';
        newsMobile.style.pointerEvents = 'none';
    }
    if (newsIcon) newsIcon.style.display = 'flex';
    document.body.classList.remove('no-scroll'); // Reativa o scroll
}

// Função para alternar o estado do menu
function toggleMenu() {
    const isMenuOpen = navMenu && navMenu.classList.contains('show'); // Verifica se o menu está aberto

    if (isMenuOpen) {
        closeMenu(); // Fecha o menu
    } else {
        if (navMenu) navMenu.classList.add('show'); // Abre o menu
        if (mobileMenu) mobileMenu.classList.add('open'); // Muda para o ícone de "X"
        if (newsMobile) {
            newsMobile.style.visibility = 'visible';
            newsMobile.style.pointerEvents = 'auto';
        }
        if (newsIcon) newsIcon.style.display = 'none';

        // Desativa o scroll
        document.body.classList.add('no-scroll');
    }
}

// Evento de clique no botão do menu
mobileMenu.addEventListener('click', toggleMenu);

// Evento para cada item <li> no menu
navItems.forEach(item => {
    item.addEventListener('click', (e) => {
        const link = item.querySelector('a'); // Encontra o link dentro do <li>
        if (link) {
            e.preventDefault(); // Evita o comportamento padrão do link
            const targetId = link.getAttribute('href'); // Obtém o id da seção
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                // Rola para a seção correspondente
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        }
        closeMenu(); // Fecha o menu
    });
});

// Função para alternar a seleção dos cards
function toggleCardSelection(button, price, name) {
    const card = button.closest('.wrapper'); // Encontra o card que contém o botão clicado
    const image = card.querySelector('img'); // Pega o <img> dentro do card

    if (image) {
        const imageSrc = image.src; // Obtemos o src da imagem

        if (!button.classList.contains('selected')) {
            button.innerHTML = '❌'; // Muda o ícone para "X"
            button.classList.add('selected');
            selectedCount++;
            totalRobux += price;

            // Adiciona o item ao carrinho
            cartItems.push({ name, price, imageSrc });
        } else {
            button.innerHTML = '🛒'; // Volta o ícone para o carrinho
            button.classList.remove('selected');
            selectedCount--;
            totalRobux -= price;

            // Remove o item do carrinho
            cartItems = cartItems.filter(item => item.name !== name);
        }

        updateCounter();
    }
}

function updateCounter() {
    const counterContainer = document.getElementById('counter-container');
    const btnToTop = document.querySelector('a#btn-to-top');

    if (counterContainer) {
        counterContainer.style.display = selectedCount > 0 ? 'flex' : 'none';
    }

    if (btnToTop) {
        btnToTop.style.display = selectedCount > 0 ? 'none' : 'block';
    }

    // Atualiza os contadores
    if (document.getElementById('selected-count')) document.getElementById('selected-count').innerText = selectedCount;
    if (document.getElementById('total-robux')) document.getElementById('total-robux').innerText = totalRobux;
}

// Função para finalizar a compra e exibir o modal
function finalizePurchase() {
    if (selectedCount > 0) {
        openModal(); // Chama a função para abrir o modal
    }
}

// Função para abrir o modal e exibir os itens do carrinho
function openModal() {
    const cartItemsContainer = document.getElementById('cart-items');
    if (cartItemsContainer) {
        cartItemsContainer.innerHTML = ''; // Limpa os itens anteriores

        // Adiciona os itens do carrinho ao modal
        cartItems.forEach(item => {
            const itemDiv = document.createElement('div');
            itemDiv.classList.add('cart-item');

            // Imagem
            const img = document.createElement('img');
            img.src = item.imageSrc; // Usa o caminho da imagem armazenado
            itemDiv.appendChild(img);

            // Info do item (nome e preço)
            const infoDiv = document.createElement('div');
            infoDiv.classList.add('cart-item-info');
            infoDiv.innerHTML = `<strong>${item.name}</strong> - ${item.price} Robux`;
            itemDiv.appendChild(infoDiv);

            // Botão de remoção (X)
            const removeBtn = document.createElement('span');
            removeBtn.classList.add('remove-btn');
            removeBtn.innerHTML = '❌';
            removeBtn.onclick = () => removeItem(item.name, item.price, itemDiv); // Passa a referência do itemDiv
            itemDiv.appendChild(removeBtn);

            cartItemsContainer.appendChild(itemDiv);
        });

        // Atualiza o total de Robux
        if (document.getElementById('total-price')) document.getElementById('total-price').innerText = totalRobux;

        // Exibe o modal
        document.getElementById('modal').style.display = 'flex';

        // Desativa o scroll do body
        document.body.classList.add('no-scroll');
    }
}

function removeItem(name, price, itemDiv) {
    // Remove o item da lista do carrinho
    cartItems = cartItems.filter(item => item.name !== name); 

    // Atualiza os contadores
    selectedCount--;
    totalRobux -= price;

    // Atualiza o contador na tela
    updateCounter();

    // Remove o item visualmente do modal
    itemDiv.remove();

    // Atualiza o total no modal
    if (document.getElementById('total-price')) document.getElementById('total-price').innerText = totalRobux;

    // Se não houver mais itens, fecha o modal automaticamente
    if (selectedCount === 0) {
        closeModal();
    }

    // Atualiza o botão de seleção
    const button = Array.from(document.querySelectorAll('.btn-cart')).find(button => {
        // Aqui verificamos o nome do item e tentamos encontrar o botão correspondente
        return button.closest('.wrapper').querySelector('img').src === itemDiv.querySelector('img').src;
    });

    if (button) {
        button.innerHTML = '🛒'; // Volta o ícone para o carrinho
        button.classList.remove('selected'); // Remove a classe de seleção
    }

    // Atualiza o total no modal
    if (document.getElementById('total-price')) document.getElementById('total-price').innerText = totalRobux;
}

// Função para fechar o modal
function closeModal() {
    const modal = document.getElementById('modal');
    if (modal) modal.style.display = 'none';

    // Ativa novamente o scroll do body
    document.body.classList.remove('no-scroll');
}

// Função para cancelar a seleção e limpar o carrinho
function cancelSelection() {
    // Zera os contadores e limpa o carrinho
    selectedCount = 0;
    totalRobux = 0;
    cartItems = [];

    // Atualiza os contadores na tela
    updateCounter();

    // Remove os itens do carrinho exibido no modal
    const cartItemsContainer = document.getElementById('cart-items');
    if (cartItemsContainer) cartItemsContainer.innerHTML = '';

    // Atualiza o total no modal para 0
    if (document.getElementById('total-price')) document.getElementById('total-price').innerText = '0';

    // Reseta os botões de seleção no menu
    document.querySelectorAll('.btn-cart').forEach(button => {
        button.innerHTML = '🛒'; // Volta o ícone para o carrinho
        button.classList.remove('selected'); // Remove a classe de seleção
    });

    // Oculta o modal, se estiver aberto
    closeModal();

    // Oculta o contador do menu
    const counterContainer = document.getElementById('counter-container');
    if (counterContainer) counterContainer.style.display = 'none';
}




// Função para abrir o modal
function openCodeModal() {
    document.getElementById('code-modal').style.display = 'flex';

    // Adicionando códigos dinamicamente (Exemplo)
    const codesList = document.getElementById('codes-list');

    // Exemplo de um código, você pode gerar isso dinamicamente ou com base em dados
}

// Função para fechar o modal
function closeCodeModal() {
    document.getElementById('code-modal').style.display = 'none';
}
