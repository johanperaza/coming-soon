document.addEventListener('DOMContentLoaded', () => {
    
    const menuButton = document.getElementById('menu-button');
    const fullscreenMenu = document.getElementById('fullscreen-menu');
    const desktopNavigation = document.querySelector('.site-navigation');
    const mobileTriggerContainer = document.querySelector('.nav-trigger-container');

    if (menuButton && fullscreenMenu) {
        menuButton.addEventListener('click', () => {
            const isMenuExpanded = menuButton.getAttribute('aria-expanded') === 'true';
            
            menuButton.setAttribute('aria-expanded', !isMenuExpanded);
            fullscreenMenu.setAttribute('aria-hidden', isMenuExpanded);
            fullscreenMenu.classList.toggle('is-active');
            menuButton.classList.toggle('is-open');
        });

        const sidebarLinks = fullscreenMenu.querySelectorAll('a');
        sidebarLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuButton.setAttribute('aria-expanded', 'false');
                fullscreenMenu.setAttribute('aria-hidden', 'true');
                fullscreenMenu.classList.remove('is-active');
                menuButton.classList.remove('is-open');
            });
        });
    }

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        const desktopViewportWidth = window.innerWidth > 768;

        if (desktopViewportWidth) {
            if (currentScrollY > 50) {
                desktopNavigation.style.opacity = '0';
                desktopNavigation.style.pointerEvents = 'none';
                
                mobileTriggerContainer.style.opacity = '1';
                mobileTriggerContainer.style.pointerEvents = 'auto';
            } else {
                desktopNavigation.style.opacity = '1';
                desktopNavigation.style.pointerEvents = 'auto';
                
                mobileTriggerContainer.style.opacity = '0';
                mobileTriggerContainer.style.pointerEvents = 'none';
            }
        }
    });

});

// ==========================================================================
// SCROLL SUAVE AL INICIO (BLINDADO CONTRA REBOTES E INTERRUPCIONES)
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
    const backToTopBtn = document.getElementById('backToTopBtn');

    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', (e) => {
            e.preventDefault();

            // 1. Le ponemos una clase temporal al body para avisarle a la web que estamos subiendo automáticamente
            document.body.classList.add('is-scrolling-up');

            // 2. Ejecutamos la subida suave
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });

            // 3. Quitamos la clase temporal después de que la animación termine (aprox. 800ms)
            setTimeout(() => {
                document.body.classList.remove('is-scrolling-up');
            }, 800);
        });
    }
});



// ==========================================================================
// CÁLCULO AUTOMÁTICO DE EDAD (BIO - CORREGIDO HUSO HORARIO)
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {
    const ageElement = document.getElementById('calculated-age');
    
    if (ageElement) {
        const birthDateString = ageElement.getAttribute('data-birth'); // Lee "1998-05-09"
        
        // Reemplazamos los guiones por barras ("1998/05/09") para forzar la lectura local
        const localBirthDateString = birthDateString.replace(/-/g, '/');
        
        const birthDate = new Date(localBirthDateString);
        const today = new Date();
        
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDifference = today.getMonth() - birthDate.getMonth();
        
        // Si aún no ha sido tu cumpleaños este año, restamos 1 año
        if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        
        // Formateamos la fecha para que se vea hermosa al lado de la edad calculada
        const options = { month: 'long', day: 'numeric', year: 'numeric' };
        const formattedBirth = birthDate.toLocaleDateString('en-US', options); // "May 9, 1998"
        
        // Lo pintamos en pantalla: "May 9, 1998 (Age 28)"
        ageElement.textContent = `${formattedBirth} (Age ${age})`;
    }
});