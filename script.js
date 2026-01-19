// Función principal de inicialización
function initApp() {
    // Inicializar Lucide con manejo de errores
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // FAQ Logic
    // Expose toggleFaq globally so inline onclick="toggleFaq(this)" works
    window.toggleFaq = function (btn) {
        const container = btn.closest('.border') || btn.parentElement;
        if (!container) return;
        // assume the answer panel is the next div sibling inside the container
        const content = container.querySelector('div.hidden') || Array.from(container.children).find(c => c.tagName === 'DIV' && c !== btn);
        const icon = btn.querySelector('i');

        // Close other FAQ items
        document.querySelectorAll('#faq .border').forEach(other => {
            if (other === container) return;
            const oContent = other.querySelector('div.hidden, div:not(button)');
            if (oContent && !oContent.classList.contains('hidden')) {
                oContent.classList.add('hidden');
                const oIcon = other.querySelector('button i');
                if (oIcon) oIcon.style.transform = '';
            }
        });

        if (!content) return;
        const isHidden = content.classList.contains('hidden');
        if (isHidden) {
            content.classList.remove('hidden');
            if (icon) icon.style.transform = 'rotate(180deg)';
        } else {
            content.classList.add('hidden');
            if (icon) icon.style.transform = '';
        }
    };

    // Also attach event listeners to FAQ buttons (in case you remove inline onclick later)
    document.querySelectorAll('#faq button').forEach(btn => {
        btn.addEventListener('click', function (e) {
            // prevent double-handling if inline onclick already triggered
            // but calling toggleFaq directly is safe
            window.toggleFaq(this);
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
