        // Función principal de inicialización
        function initApp() {
            // Inicializar Lucide con manejo de errores
            if (typeof lucide !== 'undefined') {
                lucide.createIcons();
            }

            // FAQ Logic
            const faqItems = document.querySelectorAll('.faq-item');
            faqItems.forEach(item => {
                const btn = item.querySelector('button');
                btn.addEventListener('click', () => {
                    const isActive = item.classList.contains('active');
                    faqItems.forEach(other => other.classList.remove('active'));
                    if (!isActive) item.classList.add('active');
                });
            });

            // Animaciones de Scroll
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('opacity-100');
                        entry.target.classList.remove('translate-y-10');
                    }
                });
            }, { threshold: 0.1 });

            document.querySelectorAll('.card-hover').forEach(card => {
                card.classList.add('transition-all', 'duration-700', 'translate-y-10', 'opacity-0');
                observer.observe(card);
            });
        }

        // Ejecutar cuando el DOM esté listo (más seguro para Netlify)
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', initApp);
        } else {
            initApp();
        }

        // Smooth Scroll
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    window.scrollTo({
                        top: target.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            });
        });
