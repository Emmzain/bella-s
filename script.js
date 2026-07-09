document.addEventListener('DOMContentLoaded', () => {

    // ═══════════ 1. NAVBAR SCROLL EFFECT ═══════════
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
    });

    // ═══════════ 2. MOBILE MENU TOGGLE ═══════════
    const mobileToggle = document.getElementById('mobile-toggle');
    const navLinks = document.getElementById('nav-links');
    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            navLinks.classList.toggle('mobile-open');
            mobileToggle.classList.toggle('active');
        });
    }

    // ═══════════ 3. CINEMATIC SECTION REVEALS ═══════════
    const revealElements = document.querySelectorAll('.section-reveal');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');

                // Trigger fade-in-up children
                const fadeEls = entry.target.querySelectorAll('.fade-in-up');
                fadeEls.forEach(el => el.classList.add('visible'));

                // Trigger counter animations
                const counters = entry.target.querySelectorAll('.counter');
                counters.forEach(counter => {
                    const target = +counter.getAttribute('data-target');
                    const animate = () => {
                        const current = +counter.innerText;
                        const increment = target / 60;
                        if (current < target) {
                            counter.innerText = Math.ceil(current + increment);
                            requestAnimationFrame(animate);
                        } else {
                            counter.innerText = target;
                        }
                    };
                    animate();
                    counter.classList.remove('counter');
                });

                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    revealElements.forEach(el => revealObserver.observe(el));

    // Trigger hero immediately
    setTimeout(() => {
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.classList.add('active');
            hero.querySelectorAll('.fade-in-up').forEach(el => el.classList.add('visible'));
        }
    }, 100);

    // ═══════════ 4. 3D TILT EFFECT ═══════════
    const tiltCards = document.querySelectorAll('.tilt-card');

    tiltCards.forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const tiltX = (y - centerY) / 18;
            const tiltY = (centerX - x) / 18;
            card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.02, 1.02, 1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
        });
    });

    // ═══════════ 5. HERO PARALLAX ═══════════
    const hero = document.querySelector('.hero');
    const heroBgLayer = document.querySelector('.hero-bg-layer');
    const heroImg = document.querySelector('.hero-food-img');
    const heroOrbit = document.getElementById('hero-orbit');

    if (hero) {
        hero.addEventListener('mousemove', (e) => {
            const x = (window.innerWidth / 2 - e.pageX) / 30;
            const y = (window.innerHeight / 2 - e.pageY) / 30;

            if (heroBgLayer) heroBgLayer.style.transform = `translate(${x * 0.5}px, ${y * 0.5}px)`;
            if (heroImg) heroImg.style.transform = `translate(${-x * 1.8}px, ${-y * 1.8}px)`;
            if (heroOrbit) heroOrbit.style.transform = `translateY(-50%) translate(${x * 0.8}px, ${y * 0.8}px)`;
        });

        hero.addEventListener('mouseleave', () => {
            if (heroBgLayer) heroBgLayer.style.transform = 'translate(0, 0)';
            if (heroImg) heroImg.style.transform = 'translate(0, 0)';
            if (heroOrbit) heroOrbit.style.transform = 'translateY(-50%) translate(0, 0)';
        });
    }

    // ═══════════ 6. SMOOTH SCROLL ═══════════
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: 'smooth'
                });
                // Close mobile menu if open
                if (navLinks) navLinks.classList.remove('mobile-open');
                if (mobileToggle) mobileToggle.classList.remove('active');
            }
        });
    });

    // ═══════════ 7. ACTIVE NAV LINK ON SCROLL ═══════════
    const sections = document.querySelectorAll('section[id], header[id]');
    const navAnchors = document.querySelectorAll('.nav-links a');

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const top = section.offsetTop - 100;
            if (window.scrollY >= top) {
                current = section.getAttribute('id');
            }
        });
        navAnchors.forEach(a => {
            a.classList.remove('nav-active');
            if (a.getAttribute('href') === '#' + current) {
                a.classList.add('nav-active');
            }
        });
    });
});
