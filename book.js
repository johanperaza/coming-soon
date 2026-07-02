const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxCaption = document.getElementById('lightbox-caption');
const galleryImages = document.querySelectorAll('.gallery-item img');
const closeBtn = document.querySelector('.close-btn');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');

let currentIndex = 0;

// Abrir Lightbox
galleryImages.forEach(img => {
    img.addEventListener('click', (e) => {
        lightbox.classList.add('active');
        currentIndex = parseInt(e.target.getAttribute('data-index'));
        updateLightbox();
    });
});

// Actualizar contenido del Lightbox
function updateLightbox() {
    const currentImg = galleryImages[currentIndex];
    lightboxImg.src = currentImg.src;
    lightboxImg.alt = currentImg.alt;
    lightboxCaption.textContent = currentImg.getAttribute('data-credit');
}

// Botón Siguiente
nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % galleryImages.length;
    updateLightbox();
});

// Botón Anterior
prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
    updateLightbox();
});

// Cerrar Lightbox
closeBtn.addEventListener('click', () => {
    lightbox.classList.remove('active');
});

// Cerrar si hacen clic en el fondo negro
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        lightbox.classList.remove('active');
    }
});
