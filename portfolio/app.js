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

    // --- Active Nav Link Highlight ---
    const sections = document.querySelectorAll('section, header');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100; // Offset for navbar
            const sectionHeight = section.clientHeight;
            
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('text-indigo-400');
            link.classList.add('text-gray-300'); // Or whatever default is
            
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.remove('text-gray-300');
                link.classList.add('text-indigo-400');
            }
        });
    });
});
