document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Lucide Icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // 2. Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const menuIcon = hamburger.querySelector('i');
            if (menuIcon) {
                menuIcon.setAttribute('data-lucide',
                    navLinks.classList.contains('active') ? 'x' : 'menu'
                );
                lucide.createIcons();
            }
            document.body.classList.toggle('nav-active');
        });

        // Close menu when clicking links
        document.querySelectorAll('.nav-links a:not(.dropdown-trigger)').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                document.body.classList.remove('nav-active');
                const menuIcon = hamburger.querySelector('i');
                if (menuIcon) {
                    menuIcon.setAttribute('data-lucide', 'menu');
                    lucide.createIcons();
                }
            });
        });

        // Toggle mobile dropdown
        const dropdownTrigger = document.querySelector('.dropdown-trigger');
        const dropdown = document.querySelector('.dropdown');
        if (dropdownTrigger && dropdown) {
            dropdownTrigger.addEventListener('click', (e) => {
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    dropdown.classList.toggle('active');
                }
            });
        }
    }

    // 3. Header Scroll Effect
    const header = document.querySelector('#header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // 4. Client-Side Form Submission (if applicable)
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        const submitBtn = document.getElementById('submit-btn');
        const formStatus = document.getElementById('form-status');

        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            // Loading State
            if (submitBtn) {
                submitBtn.disabled = true;
                const originalText = submitBtn.innerHTML;
                submitBtn.innerHTML = '<span>Processing...</span>';

                if (formStatus) {
                    formStatus.style.display = 'block';
                    formStatus.style.background = 'rgba(29, 78, 216, 0.1)';
                    formStatus.style.color = 'var(--primary-neon)';
                    formStatus.innerText = 'Connecting to server...';
                }

                const formData = new FormData(contactForm);
                const data = Object.fromEntries(formData.entries());

                try {
                    const response = await fetch('https://formsubmit.co/ajax/vinamraseo652@gmail.com', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'Accept': 'application/json'
                        },
                        body: JSON.stringify(data)
                    });

                    const result = await response.json();

                    if (response.ok && result.success === "true") {
                        if (formStatus) {
                            formStatus.style.background = 'rgba(16, 185, 129, 0.1)';
                            formStatus.style.color = '#10b981';
                            formStatus.innerText = 'Success! Your message has been sent.';
                        }
                        contactForm.reset();
                        setTimeout(() => {
                            if (formStatus) formStatus.style.display = 'none';
                        }, 5000);
                    } else {
                        throw new Error('Submission failed');
                    }
                } catch (error) {
                    if (formStatus) {
                        formStatus.style.background = 'rgba(239, 68, 68, 0.1)';
                        formStatus.style.color = '#ef4444';
                        formStatus.innerText = 'Error: Please try again later.';
                    }
                } finally {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalText;
                }
            }
        });
    }

    // 5. Smooth Scroll for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                e.preventDefault();
                const headerHeight = header ? header.offsetHeight : 80;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 6. PPC FAQ Interactivity
    document.addEventListener('click', (e) => {
        const trigger = e.target.closest('.faq-trigger');
        if (trigger) {
            const item = trigger.parentElement;
            const isActive = item.classList.contains('active');

            // Close other FAQ items in the same container if desired
            const container = item.parentElement;
            container.querySelectorAll('.faq-item-ppc').forEach(el => el.classList.remove('active'));

            if (!isActive) {
                item.classList.add('active');
            }
        }
    });

    // Check for hash in URL on load for smooth scroll to section
    if (window.location.hash) {
        setTimeout(() => {
            const targetId = window.location.hash.substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                const headerHeight = header ? header.offsetHeight : 80;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        }, 100);
    }
});


