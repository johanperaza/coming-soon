document.addEventListener('DOMContentLoaded', () => {

    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const galleryImages = document.querySelectorAll('.gallery-item img');
    const closeBtn = document.querySelector('.close-btn');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');

    if (lightbox && lightboxImg && galleryImages.length > 0) {
        let currentIndex = 0;

        const updateLightbox = () => {
            const currentImg = galleryImages[currentIndex];
            lightboxImg.src = currentImg.src;
            lightboxImg.alt = currentImg.alt;
            lightboxCaption.textContent = currentImg.getAttribute('data-credit') || '';
        };

        const closeLightbox = () => {
            lightbox.classList.remove('active');
            document.body.classList.remove('lightbox-open'); // 👈 Le devolvemos la visibilidad a la nav
        };

        galleryImages.forEach(img => {
            img.addEventListener('click', (e) => {
                lightbox.classList.add('active');
                document.body.classList.add('lightbox-open'); // 👈 Ocultamos Home y Hamburguesa al abrir foto
                currentIndex = parseInt(e.target.getAttribute('data-index'), 10);
                updateLightbox();
            });
        });

        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                currentIndex = (currentIndex + 1) % galleryImages.length;
                updateLightbox();
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                currentIndex = (currentIndex - 1 + galleryImages.length) % galleryImages.length;
                updateLightbox();
            });
        }

        if (closeBtn) {
            closeBtn.addEventListener('click', closeLightbox);
        }

        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (!lightbox.classList.contains('active')) return;

            if (e.key === 'Escape') {
                closeLightbox();
            } else if (e.key === 'ArrowRight' && nextBtn) {
                nextBtn.click();
            } else if (e.key === 'ArrowLeft' && prevBtn) {
                prevBtn.click();
            }
        });

        // Dynamic Touch Swipe Navigation
        let touchStartX = 0;
        let touchEndX = 0;

        lightbox.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        lightbox.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, { passive: true });

        const handleSwipe = () => {
            const swipeThreshold = 50;
            if (touchEndX < touchStartX - swipeThreshold && nextBtn) {
                nextBtn.click();
            }
            if (touchEndX > touchStartX + swipeThreshold && prevBtn) {
                prevBtn.click();
            }
        };
    }
});