/**
 * Toggle FAQ logic
 */
function toggleFaq(btn) {
    const container = btn.closest('.border');
    if (!container) return;

    const content = container.querySelector('div:not(button)');
    const icon = btn.querySelector('.icon-chevron');

    // Close other FAQ items (Accordion effect)
    document.querySelectorAll('#faq .border').forEach(other => {
        if (other === container) return;
        const oContent = other.querySelector('div:not(button)');
        const oIcon = other.querySelector('.icon-chevron');
        if (oContent && !oContent.classList.contains('hidden')) {
            oContent.classList.add('hidden');
            if (oIcon) oIcon.style.transform = '';
        }
    });

    // Toggle current item
    const isHidden = content.classList.contains('hidden');
    if (isHidden) {
        content.classList.remove('hidden');
        if (icon) icon.style.transform = 'rotate(180deg)';
    } else {
        content.classList.add('hidden');
        if (icon) icon.style.transform = '';
    }
}

/**
 * Scroll Animations and UI Init
 */
document.addEventListener('DOMContentLoaded', () => {
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

    // Smooth Scroll logic
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
});
