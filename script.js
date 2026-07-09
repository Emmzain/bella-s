document.addEventListener('DOMContentLoaded', () => {
    // 1. Navbar Glassmorphism on Scroll
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 2. Cinematic Section Reveals
    const revealElements = document.querySelectorAll('.section-reveal');
    
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                
                // If this section has fade-in-up children, trigger them
                const fadeElements = entry.target.querySelectorAll('.fade-in-up');
                fadeElements.forEach(el => el.classList.add('visible'));
                
                // If this section has counters, trigger them
                const counters = entry.target.querySelectorAll('.counter');
                counters.forEach(counter => {
                    const updateCount = () => {
                        const target = +counter.getAttribute('data-target');
                        const count = +counter.innerText;
                        const inc = target / 50; // Adjust speed

                        if (count < target) {
                            counter.innerText = Math.ceil(count + inc);
                            setTimeout(updateCount, 40);
                        } else {
                            counter.innerText = target;
                        }
                    };
                    updateCount();
                    // Remove class so it doesn't trigger again
                    counter.classList.remove('counter'); 
                });

                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // Trigger hero animations immediately
    setTimeout(() => {
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.classList.add('active');
            const fadeElements = hero.querySelectorAll('.fade-in-up');
            fadeElements.forEach(el => el.classList.add('visible'));
        }
    }, 100);

    // 3. 3D Tilt Effect on Dish Cards
    const tiltCards = document.querySelectorAll('.tilt-card');
    
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const tiltX = (y - centerY) / 15;
            const tiltY = (centerX - x) / 15;
            
            card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(1.02, 1.02, 1.02)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
        });
    });

    // 4. Parallax Effect on Hero Background
    const hero = document.querySelector('.hero');
    const heroBg = document.querySelector('.hero-bg');
    const heroImg = document.querySelector('.hero-burger');

    if (hero) {
        hero.addEventListener('mousemove', (e) => {
            const x = (window.innerWidth / 2 - e.pageX) / 25;
            const y = (window.innerHeight / 2 - e.pageY) / 25;
            
            if(heroBg) heroBg.style.transform = `translate(${x}px, ${y}px)`;
            if(heroImg) {
                // Keep the floating animation but add slight parallax
                heroImg.style.transform = `translate(${-x*1.5}px, ${-y*1.5}px)`;
            }
        });
        
        hero.addEventListener('mouseleave', () => {
            if(heroBg) heroBg.style.transform = `translate(0px, 0px)`;
            if(heroImg) heroImg.style.transform = `translate(0px, 0px)`;
        });
    }

    // Smooth Scrolling for Anchors
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80, // adjust for navbar height
                    behavior: 'smooth'
                });
            }
        });
    });
});
