// ==========================================================================
// INICIALIZAÇÃO DE BIBLIOTECAS (AOS)
// ==========================================================================
AOS.init({ once: true });

// ==========================================================================
// BANCO DE IMAGENS DOS SERVIÇOS (MODAL GALERIA)
// ==========================================================================
const servicePhotos = {
    sofa: { title: "Resultados: Limpeza de Sofás", images: ["img/sofa1.jpg", "img/sofa2.jpg", "img/sofa3.jpg", "img/sofa4.jpg", "img/sofa5.jpg"] },
    poltronas: { title: "Resultados: Limpeza de Poltronas", images: ["img/poltrona1.jpg", "img/poltrona2.jpg"] },
    impermeabilizacao: { title: "Resultados: Impermeabilização", images: ["img/imper1.jpeg", "img/imper2.jpeg", "img/imper3.jpeg"] },
    colchao: { title: "Resultados: Higienização de Colchões", images: ["img/colchao1.jpg", "img/colchao2.jpg"] },
    automotiva: { title: "Resultados: Higienização Automotiva", images: ["img/car1.jpeg", "img/car2.jpeg", "img/car3.jpeg"] },
    domesticos: { title: "Resultados: Serviços Domésticos", images: ["img/casa1.jpeg", "img/casa2.jpeg"] }
};

// ==========================================================================
// CARROSSEL AUTOMÁTICO DA HERO (FOTOS DO SOFÁ NO TOPO)
// ==========================================================================
const heroSlider = document.querySelector('.hero-image-slider');

if (heroSlider) {
    setInterval(() => {
        const firstImg = heroSlider.querySelector('img');
        if (firstImg) {
            const imgWidth = firstImg.clientWidth;
            
            // Se chegou ao final do scroll, volta para o início de forma suave
            if (heroSlider.scrollLeft + heroSlider.clientWidth >= heroSlider.scrollWidth - 5) {
                heroSlider.scrollTo({ left: 0, behavior: 'smooth' });
            } else {
                // Caso contrário, avança para a próxima imagem da fila
                heroSlider.scrollBy({ left: imgWidth, behavior: 'smooth' });
            }
        }
    }, 3000); // Executa a transição a cada 3000 milissegundos (3 segundos)
}

// ==========================================================================
// CONTROLE DO MENU RESPONSIVO MOBILE
// ==========================================================================
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');
const menuLinks = document.querySelectorAll('.nav-menu a');

if (menuToggle && navMenu) {
    // Abre e fecha o menu ao clicar no botão hambúrguer
    menuToggle.addEventListener('click', () => {
        const isOpen = navMenu.classList.toggle('active');
        menuToggle.setAttribute('aria-expanded', isOpen);
        
        // Alterna o ícone entre barras e "X" para fechar
        const icon = menuToggle.querySelector('i');
        if (isOpen) {
            icon.className = 'fas fa-times';
        } else {
            icon.className = 'fas fa-bars';
        }
    });

    // Fecha o menu automaticamente quando o usuário clica em um link
    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
            menuToggle.querySelector('i').className = 'fas fa-bars';
        });
    });

    // Fecha o menu se o usuário clicar em qualquer área vazia fora dele
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
            navMenu.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
            menuToggle.querySelector('i').className = 'fas fa-bars';
        }
    });
}

// ==========================================================================
// LÓGICA DO CARROSSEL DA JANELA MODAL (GALERIA DE FOTOS)
// ==========================================================================
const modal = document.getElementById('galleryModal');
const modalTitle = document.getElementById('modalTitle');
const modalPhotosSlider = document.getElementById('modalPhotosSlider');
const closeModal = document.getElementById('closeModal');
const serviceCards = document.querySelectorAll('.service-card');
const modalPrevBtn = document.getElementById('modalPrevBtn');
const modalNextBtn = document.getElementById('modalNextBtn');

serviceCards.forEach(card => {
    card.addEventListener('click', () => {
        const serviceKey = card.getAttribute('data-service');
        const data = servicePhotos[serviceKey];
        
        if (data) {
            modalTitle.innerText = data.title;
            modalPhotosSlider.innerHTML = '';
            modalPhotosSlider.scrollLeft = 0;
            
            // Renderiza as fotos dinamicamente no slider
            data.images.forEach(src => {
                const img = document.createElement('img');
                img.src = src;
                img.alt = data.title;
                // Fallback caso a imagem dê erro ao carregar localmente
                img.onerror = () => { img.src = 'https://via.placeholder.com/600x400?text=The+Doctor+Clean'; };
                modalPhotosSlider.appendChild(img);
            });
            
            modal.classList.add('active');
            modal.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden'; // Bloqueia scroll da página ao fundo
        }
    });
});

// Navegação por setas dentro da modal de fotos
if (modalNextBtn && modalPrevBtn && modalPhotosSlider) {
    modalNextBtn.addEventListener('click', () => {
        const photoWidth = modalPhotosSlider.querySelector('img')?.clientWidth || 400;
        modalPhotosSlider.scrollLeft += photoWidth;
    });
    modalPrevBtn.addEventListener('click', () => {
        const photoWidth = modalPhotosSlider.querySelector('img')?.clientWidth || 400;
        modalPhotosSlider.scrollLeft -= photoWidth;
    });
}

// Fechamento da janela modal
const funcCloseModal = () => {
    modal.classList.remove('active');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
};
if (closeModal) closeModal.addEventListener('click', funcCloseModal);
if (modal) modal.addEventListener('click', (e) => { if (e.target === modal) funcCloseModal(); });

// ==========================================================================
// LÓGICA DO CARROSSEL DE DEPOIMENTOS
// ==========================================================================
const slider = document.getElementById('testimonialSlider');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

if (slider && prevBtn && nextBtn) {
    const getScrollAmount = () => {
        const firstCard = slider.querySelector('.testimonial-card');
        return firstCard ? firstCard.clientWidth + 24 : 340; // Largura do card + espaçamento (gap)
    };
    nextBtn.addEventListener('click', () => { slider.scrollLeft += getScrollAmount(); });
    prevBtn.addEventListener('click', () => { slider.scrollLeft -= getScrollAmount(); });
}