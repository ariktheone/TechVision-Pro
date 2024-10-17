// Generate floating elements
const floatingElements = document.getElementById('floatingElements');
for (let i = 0; i < 20; i++) {
    const element = document.createElement('div');
    element.className = 'floating-element';
    element.style.left = `${Math.random() * 100}%`;
    element.style.animationDelay = `${Math.random() * 15}s`;
    element.style.width = `${Math.random() * 30 + 20}px`;
    element.style.height = element.style.width;
    floatingElements.appendChild(element);
}

// Initialize Vanilla Tilt
VanillaTilt.init(document.querySelectorAll(".glass-card"), {
    max: 15,
    speed: 400,
    glare: true,
    "max-glare": 0.2,
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Scroll animations
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.glass-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(50px)';
    card.style.transition = 'all 0.6s ease-out';
    observer.observe(card);
});

// Mouse parallax effect
document.addEventListener('mousemove', (e) => {
    const cards = document.querySelectorAll('.glass-card');
    const mouseX = e.clientX / window.innerWidth - 0.5;
    const mouseY = e.clientY / window.innerHeight - 0.5;

    cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const cardCenterX = rect.left + rect.width / 2;
        const cardCenterY = rect.top + rect.height / 2;
        const angleX = (cardCenterY - e.clientY) * 0.01;
        const angleY = (e.clientX - cardCenterX) * 0.01;

        card.style.transform = `perspective(1000px) rotateX(${angleX}deg) rotateY(${angleY}deg)`;
    });
});
