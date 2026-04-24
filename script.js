// Mobile Menu Toggle
function toggleMenu() {
    document.getElementById('nav-menu').classList.toggle('active');
}

// Header Scroll Effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (header) {
        if(window.scrollY > 50) {
            header.style.background = 'rgba(8, 8, 8, 0.95)';
            header.style.boxShadow = '0 5px 20px rgba(0,0,0,0.5)';
        } else {
            header.style.background = 'rgba(8, 8, 8, 0.85)';
            header.style.boxShadow = 'none';
        }
    }
});

// Scroll Reveal Animation
function reveal() {
    var reveals = document.querySelectorAll('.reveal');
    for (var i = 0; i < reveals.length; i++) {
        var windowHeight = window.innerHeight;
        var elementTop = reveals[i].getBoundingClientRect().top;
        var elementVisible = 150;
        if (elementTop < windowHeight - elementVisible) {
            reveals[i].classList.add('active');
        }
    }
}
window.addEventListener('scroll', reveal);

// Trigger on load
document.addEventListener('DOMContentLoaded', reveal);
