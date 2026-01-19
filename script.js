 <script>
            // Intersection Observer for scroll animations
            const observerOptions = {
                threshold: 0.1
            };

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('opacity-100');
                        entry.target.classList.remove('translate-y-10');
                    }
                });
            }, observerOptions);

            // Add basic entry animations to cards
            document.querySelectorAll('.card-hover').forEach(card => {
                card.classList.add('transition-all', 'duration-700', 'translate-y-10', 'opacity-0');
                observer.observe(card);
            });
        };

        // Smooth scroll implementation
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

// Función para expandir/colapsar preguntas frecuentes
function toggleFaq(button) {
    const content = button.nextElementSibling;
    const icon = button.querySelector('i');
    
    // Toggle visibilidad
    content.classList.toggle('hidden');
    
}
    </script>

