// 1. Fix: Removed the stray '};' that was likely breaking the script
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

document.querySelectorAll('.card-hover').forEach(card => {
    card.classList.add('transition-all', 'duration-700', 'translate-y-10', 'opacity-0');
    observer.observe(card);
});

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

// 2. Fix: Updated FAQ Toggle Function
function toggleFaq(button) {
    const content = button.nextElementSibling;
    // Select the image inside the button to rotate it
    const icon = button.querySelector('img');
    
    // Toggle visibility of the answer
    content.classList.toggle('hidden');
    
    // Rotate the chevron icon when opened
    if (content.classList.contains('hidden')) {
        icon.classList.remove('rotate-180');
    } else {
        icon.classList.add('rotate-180');
    }
}
