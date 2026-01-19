// Principal initialization function
function initApp() {
    // Initialize Lucide icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    } else {
        console.error("Lucide library not loaded");
    }

    // FAQ Logic
    window.toggleFaq = function (btn) {
        const container = btn.closest('.border') || btn.parentElement;
        if (!container) return;
        
        // Find the hidden content div and the icon
        const content = container.querySelector('div.hidden') || container.querySelector('div:not(button)');
        const icon = btn.querySelector('i');

        // Close other FAQ items for accordion effect
        document.querySelectorAll('#faq .border').forEach(other => {
            if (other === container) return;
            const oContent = other.querySelector('div:not(button)');
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

    // Scroll Animations
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

// Execute when DOM is ready
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
