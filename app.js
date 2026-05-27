document.addEventListener('DOMContentLoaded', () => {
    // --- Navbar Scroll Effect ---
    const navbar = document.getElementById('navbar');
    
    const handleScroll = () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
            navbar.classList.remove('py-4');
            navbar.classList.add('py-2');
        } else {
            navbar.classList.remove('scrolled');
            navbar.classList.add('py-4');
            navbar.classList.remove('py-2');
        }
    };
    
    // Initial check and scroll event listener
    handleScroll();
    window.addEventListener('scroll', handleScroll);

    // --- Mobile Menu Toggle ---
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileBtn && mobileMenu) {
        mobileBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            mobileMenu.classList.toggle('flex');
            // Toggle icon from bars to times
            const icon = mobileBtn.querySelector('i');
            if (icon.classList.contains('fa-bars')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });

        // Close mobile menu on link click
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                mobileMenu.classList.remove('flex');
                const icon = mobileBtn.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            });
        });
    }

    // --- Typewriter Effect ---
    const typewriterElement = document.getElementById('typewriter');
    const words = ['Front End Developer', 'Full Stack Engineer', 'Python Enthusiast', 'Problem Solver'];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingDelay = 100;

    function typeWriter() {
        if (!typewriterElement) return;
        
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            charIndex--;
            typingDelay = 50;
        } else {
            charIndex++;
            typingDelay = 150;
        }

        typewriterElement.textContent = currentWord.substring(0, charIndex);

        if (!isDeleting && charIndex === currentWord.length) {
            // Pause at end of word
            typingDelay = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typingDelay = 500; // Pause before typing next word
        }

        setTimeout(typeWriter, typingDelay);
    }

    // Start typing effect
    setTimeout(typeWriter, 1000);

    // --- Intersection Observer for Scroll Animations ---
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add visible class to trigger fade-in animations
                entry.target.classList.add('visible');
                
                // Animate skill progress bars if they are within this section
                if (entry.target.id === 'skills' || entry.target.closest('#skills')) {
                    const progressBars = entry.target.querySelectorAll('.skill-progress');
                    progressBars.forEach(bar => {
                        const targetWidth = bar.getAttribute('data-width');
                        if (targetWidth) {
                            // Small timeout to ensure transition triggers
                            setTimeout(() => {
                                bar.style.width = targetWidth;
                            }, 200);
                        }
                    });
                }
                
                // Optional: stop observing once animated
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe specific elements
    document.querySelectorAll('.fade-in-up, .fade-in-left, .fade-in-right, .skill-progress').forEach(el => {
        observer.observe(el);
    });
    
    // Also observe the skills section container to trigger all bars at once if preferred
    const skillsSection = document.getElementById('skills');
    if (skillsSection) {
        observer.observe(skillsSection);
    }

    // --- Animated Counter for Stats ---
    function animateCounter(element, target, duration = 2000) {
        let current = 0;
        const increment = target / (duration / 50);
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target;
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current);
            }
        }, 50);
    }

    // Observe stats section for counter animation
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                entry.target.classList.add('animated');
                const counters = entry.target.querySelectorAll('[data-count]');
                counters.forEach(counter => {
                    const target = parseInt(counter.getAttribute('data-count'));
                    animateCounter(counter, target);
                });
            }
        });
    }, { threshold: 0.5 });

    // Add data-count attributes to counter elements
    document.querySelectorAll('.stats-counter').forEach(el => {
        const value = parseInt(el.textContent);
        el.setAttribute('data-count', value);
        statsObserver.observe(el);
    });

    // --- Smooth Scroll for Anchor Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && document.querySelector(href)) {
                e.preventDefault();
                document.querySelector(href).scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // --- Hover Tilt Effect ---
    const tiltElements = document.querySelectorAll('.hover-tilt');
    tiltElements.forEach(element => {
        element.addEventListener('mousemove', (e) => {
            const rect = element.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            element.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
        });
        element.addEventListener('mouseleave', () => {
            element.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        });
    });

    // --- Scroll Progress Bar ---
    const scrollProgress = document.createElement('div');
    scrollProgress.className = 'scroll-progress';
    document.body.prepend(scrollProgress);

    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        scrollProgress.style.width = scrolled + '%';
    });

    // --- Staggered Animation on Scroll ---
    const staggerObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated-stagger')) {
                entry.target.classList.add('animated-stagger');
                const items = entry.target.querySelectorAll('.stagger-item');
                items.forEach(item => {
                    item.style.animation = `fadeInUp 0.6s ease-out forwards`;
                });
            }
        });
    }, { threshold: 0.2 });

    // Apply to grid containers
    document.querySelectorAll('.grid').forEach(grid => {
        staggerObserver.observe(grid);
    });

    // --- Animated Progress Bars ---
    const progressObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('progress-animated')) {
                entry.target.classList.add('progress-animated');
                const skillBars = entry.target.querySelectorAll('.skill-bar');
                skillBars.forEach((bar, index) => {
                    setTimeout(() => {
                        bar.classList.add('animate');
                        const percentage = bar.getAttribute('data-percentage') || bar.style.width;
                        bar.style.setProperty('--width', percentage);
                    }, index * 100);
                });
            }
        });
    }, { threshold: 0.3 });

    document.querySelectorAll('.skill-section').forEach(section => {
        progressObserver.observe(section);
    });

    // --- Parallax Scrolling Effect ---
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    window.addEventListener('scroll', () => {
        parallaxElements.forEach(element => {
            const scrollPosition = window.scrollY;
            const elementOffset = element.offsetTop;
            const distance = scrollPosition - elementOffset;
            const parallaxValue = distance * 0.5;
            element.style.transform = `translateY(${parallaxValue}px)`;
        });
    });

    // --- Card Entrance Animation ---
    const cardObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting && !entry.target.classList.contains('card-entered')) {
                entry.target.classList.add('card-entered');
                setTimeout(() => {
                    entry.target.classList.add('card-entrance');
                }, index * 100);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.glass-card, .group').forEach(card => {
        cardObserver.observe(card);
    });

    // --- Active Nav Link Highlight ---
    const sections = document.querySelectorAll('section, header');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('text-indigo-400');
            link.classList.add('text-gray-300');
            
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.remove('text-gray-300');
                link.classList.add('text-indigo-400');
            }
        });
    });
});
