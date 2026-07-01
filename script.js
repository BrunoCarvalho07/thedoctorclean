// INITIALIZE AOS (ANIMATION ON SCROLL)
AOS.init({
    once: true,
    mirror: false
});

// MOBILE MENU TOGGLE
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');

if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        const isExpanded = navMenu.classList.contains('active');
        menuToggle.setAttribute('aria-expanded', isExpanded);
    });

    // Close menu when clicking on a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
        });
    });
}

// DARK MODE / THEME TOGGLE FUNCTIONALITY (Ajustado para usar classe)
const themeToggleBtn = document.querySelector('.theme-toggle-btn'); // Alterado de getElementById para querySelector
if (themeToggleBtn) {
    const icon = themeToggleBtn.querySelector('i');
    
    // Check local storage for theme persistence
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        if (icon) {
            icon.classList.remove('fa-moon');
            icon.classList.add('fa-sun');
        }
    }

    themeToggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-theme');
        
        if (document.body.classList.contains('dark-theme')) {
            localStorage.setItem('theme', 'dark');
            if (icon) {
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
            }
        } else {
            localStorage.setItem('theme', 'light');
            if (icon) {
                icon.classList.remove('fa-sun');
                icon.classList.add('fa-moon');
            }
        }
    });
}

// BEFORE/AFTER INTERACTIVE SLIDER
const slider = document.getElementById('change-slider');
const beforeImage = document.querySelector('.image-before');
const buttonLine = document.querySelector('.slider-button-line');

if (slider && beforeImage && buttonLine) {
    slider.addEventListener('input', (e) => {
        const value = e.target.value;
        beforeImage.style.width = `${value}%`;
        buttonLine.style.left = `${value}%`;
    });
}

// TESTIMONIALS CAROUSEL SLIDER
const sliderContainer = document.getElementById('testimonialSlider');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

if (sliderContainer && prevBtn && nextBtn) {
    const getScrollAmount = () => {
        const card = sliderContainer.querySelector('.testimonial-card');
        if (card) {
            const cardWidth = card.getBoundingClientRect().width;
            const style = window.getComputedStyle(sliderContainer);
            const gap = parseFloat(style.gap) || 24;
            return cardWidth + gap;
        }
        return 350; 
    };

    nextBtn.addEventListener('click', () => {
        sliderContainer.scrollBy({ left: getScrollAmount(), behavior: 'smooth' });
    });

    prevBtn.addEventListener('click', () => {
        sliderContainer.scrollBy({ left: -getScrollAmount(), behavior: 'smooth' });
    });
}

// GALLERY MODAL DATA BANK
const servicePhotos = {
    sofa: { 
        title: "Resultados: Limpeza de Sofás", 
        images: ["img/sofa1.jpg", "img/sofa2.jpg", "img/sofa3.jpg", "img/sofa4.jpg", "img/sofa5.jpg"] 
    },
    poltronas: { 
        title: "Resultados: Limpeza de Poltronas", 
        images: ["img/poltrona1.jpg", "img/poltrona2.jpg", "img/poltrona3.jpg"] 
    },
    impermeabilizacao: { 
        title: "Resultados: Impermeabilização", 
        images: ["img/hipermia.jpeg", "img/Impermeabilizacao.png"] 
    },
    colchao: { 
        title: "Resultados: Higienização de Colchões", 
        images: ["img/colchao1.jpg", "img/colchao2.jpg"] 
    },
    automotiva: { 
        title: "Resultados: Higienização Automotiva", 
        images: ["img/carro1.jpg", "img/carro2.jpg", "img/carro3.jpg", "img/carro4.jpg", "img/carro5.jpg"] 
    },
    domesticos: { 
        title: "Resultados: Serviços Domésticos", 
        images: ["img/limpezacasa.png", "img/limpezacasa1.png", "img/limpezacasa2.png"] 
    }
};

// MODAL FUNCTIONALITY LOGIC
const modal = document.getElementById('galleryModal');
const modalTitle = document.getElementById('modalTitle');
const modalPhotosSlider = document.getElementById('modalPhotosSlider');
const closeModalBtn = document.getElementById('closeModal');
const modalPrevBtn = document.getElementById('modalPrevBtn');
const modalNextBtn = document.getElementById('modalNextBtn');

let currentServicePhotos = [];

if (modal && modalPhotosSlider && closeModalBtn) {
    document.querySelectorAll('.service-card').forEach(card => {
        card.addEventListener('click', () => {
            const serviceKey = card.getAttribute('data-service');
            const serviceData = servicePhotos[serviceKey];
            
            if (!serviceData) {
                const serviceTitle = card.querySelector('h3').innerText;
                modalTitle.innerText = `Resultados: ${serviceTitle}`;
                currentServicePhotos = [];
            } else {
                modalTitle.innerText = serviceData.title;
                currentServicePhotos = serviceData.images;
            }
            
            modalPhotosSlider.innerHTML = '';
            
            if (currentServicePhotos.length === 0) {
                modalPhotosSlider.innerHTML = '<p style="padding: 20px; color:#666; text-align:center; width:100%;">Brevemente adicionaremos fotos para este serviço!</p>';
                if (modalPrevBtn) modalPrevBtn.style.display = 'none';
                if (modalNextBtn) modalNextBtn.style.display = 'none';
            } else {
                currentServicePhotos.forEach(photoUrl => {
                    const img = document.createElement('img');
                    img.src = photoUrl; 
                    img.alt = modalTitle.innerText;
                    modalPhotosSlider.appendChild(img);
                });
                
                if (modalPrevBtn) modalPrevBtn.style.display = currentServicePhotos.length > 1 ? 'flex' : 'none';
                if (modalNextBtn) modalNextBtn.style.display = currentServicePhotos.length > 1 ? 'flex' : 'none';
            }
            
            modal.classList.add('active');
            modal.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
        });
    });

    const closeModalFunc = () => {
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    };

    closeModalBtn.addEventListener('click', closeModalFunc);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModalFunc();
    });

    if (modalNextBtn && modalPrevBtn) {
        modalNextBtn.addEventListener('click', () => {
            const width = modalPhotosSlider.getBoundingClientRect().width;
            modalPhotosSlider.scrollBy({ left: width, behavior: 'smooth' });
        });

        modalPrevBtn.addEventListener('click', () => {
            const width = modalPhotosSlider.getBoundingClientRect().width;
            modalPhotosSlider.scrollBy({ left: -width, behavior: 'smooth' });
        });
    }
}

// VIDEO CAROUSEL SLIDER CONTROLLER
const videoSlider = document.getElementById('videoSlider');
const videoPrevBtn = document.getElementById('videoPrevBtn');
const videoNextBtn = document.getElementById('videoNextBtn');

if (videoSlider && videoPrevBtn && videoNextBtn) {
    const getVideoScrollAmount = () => {
        const videoCard = videoSlider.querySelector('.video-card');
        if (videoCard) {
            return videoCard.getBoundingClientRect().width + 20; // Largura do card + gap do CSS
        }
        return 400;
    };

    videoNextBtn.addEventListener('click', () => {
        videoSlider.scrollBy({ left: getVideoScrollAmount(), behavior: 'smooth' });
    });

    videoPrevBtn.addEventListener('click', () => {
        videoSlider.scrollBy({ left: -getVideoScrollAmount(), behavior: 'smooth' });
    });
}