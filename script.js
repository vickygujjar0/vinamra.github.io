document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const header = document.querySelector('#header');
    const heroGlow = document.getElementById('hero-glow');

    // Mobile Menu Toggle
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });

        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
            });
        });
    }

    // Header Scroll Effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.padding = '10px 0';
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)';
        } else {
            header.style.padding = '20px 0';
            header.style.background = 'rgba(255, 255, 255, 0.9)';
            header.style.boxShadow = 'none';
        }
    });

    // Hero Mesh Mouse Tracking (Parallax)
    const heroMesh = document.querySelector('.hero-mesh');
    if (heroMesh) {
        window.addEventListener('mousemove', (e) => {
            const x = (e.clientX / window.innerWidth - 0.5) * 40;
            const y = (e.clientY / window.innerHeight - 0.5) * 40;
            heroMesh.style.transform = `translate(${x}px, ${y}px)`;
        });
    }


    // Scroll Reveal Animation
    const revealElements = document.querySelectorAll('.reveal');
    const revealOnScroll = () => {
        revealElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight * 0.85) {
                el.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Initial check

    // Initialize Lucide Icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }
});

