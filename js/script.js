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
    navMenu.classList.remove('show');
    mobileMenu.classList.remove('open');
    newsMobile.style.visibility = 'hidden';
    newsMobile.style.pointerEvents = 'none';
    newsIcon.style.display = 'flex';
    document.body.classList.remove('no-scroll'); // Reativa o scroll
}

// Evento para o botão do menu mobile
mobileMenu.addEventListener('click', () => {
    navMenu.classList.toggle('show');

    if (navMenu.classList.contains('show')) {
        newsMobile.style.visibility = 'visible';
        newsMobile.style.pointerEvents = 'auto';
        newsIcon.style.display = 'none';

        // Desativa o scroll
        document.body.classList.add('no-scroll');
    } else {
        closeMenu(); // Fecha o menu e ativa o scroll
    }

    mobileMenu.classList.toggle('open');
});

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

// Atualiza o contador na tela e controla a visibilidade do menu
function updateCounter() {
    document.getElementById('selected-count').innerText = selectedCount;
    document.getElementById('total-robux').innerText = totalRobux;

    // Só mostra o menu se houver seleção
    if (selectedCount > 0) {
        document.getElementById('counter-container').style.display = 'flex';
    } else {
        document.getElementById('counter-container').style.display = 'none';
    }
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
        removeBtn.onclick = () => removeItem(item.name, item.price); // Chama a função para remover o item
        itemDiv.appendChild(removeBtn);

        cartItemsContainer.appendChild(itemDiv);
    });

    // Atualiza o total de Robux
    document.getElementById('total-price').innerText = totalRobux;

    // Exibe o modal
    document.getElementById('modal').style.display = 'flex';

    // Desativa o scroll do body
    document.body.classList.add('no-scroll');
}

// Função para remover um item do carrinho
function removeItem(name, price) {
    cartItems = cartItems.filter(item => item.name !== name); // Remove o item
    selectedCount--;
    totalRobux -= price;

    // Atualiza o contador e o modal
    updateCounter();
    openModal();
}

// Função para fechar o modal
function closeModal() {
    document.getElementById('modal').style.display = 'none';

    // Ativa novamente o scroll do body
    document.body.classList.remove('no-scroll');
}

// Reseta a seleção após fechar o modal
function resetSelection() {
    selectedCount = 0;
    totalRobux = 0;
    updateCounter();

    // Reseta os botões
    document.querySelectorAll('.btn-cart').forEach(button => {
        button.innerHTML = '🛒';
        button.classList.remove('selected');
    });

    // Limpa o carrinho
    cartItems = [];
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
    cartItemsContainer.innerHTML = '';

    // Atualiza o total no modal para 0
    document.getElementById('total-price').innerText = '0';

    // Oculta o modal, se estiver aberto
    closeModal();

    // Reseta os botões de seleção no menu
    document.querySelectorAll('.btn-cart').forEach(button => {
        button.innerHTML = '🛒'; // Ícone do carrinho
        button.classList.remove('selected'); // Remove a classe de seleção
    });

    // Oculta o contador do menu, se necessário
    document.getElementById('counter-container').style.display = 'none';
}

// Adicionar o evento de clique ao botão de cancelamento
const cancelButton = document.getElementById('cancel-button'); // Substitua pelo ID real do botão
if (cancelButton) {
    cancelButton.addEventListener('click', cancelSelection);
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
