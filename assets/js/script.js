document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide Icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // --- Mobile Menu ---
    const mobileMenuButton = document.getElementById('mobile-menu-button'); // check ID consistency
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            const isExpanded = mobileMenuButton.getAttribute('aria-expanded') === 'true';
            mobileMenuButton.setAttribute('aria-expanded', !isExpanded);
            mobileMenu.classList.toggle('hidden');
        });

        // Close mobile menu when clicking anchor links
        const mobileNavLinks = mobileMenu.querySelectorAll('a[href^="#"]');
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                mobileMenuButton.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // --- Smooth Scroll for Anchor Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = 64; // Height of sticky header
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Active Section Highlight ---
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');

    function highlightActiveSection() {
        const scrollPosition = window.scrollY + 100; // Offset for header

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active', 'text-primary');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active', 'text-primary');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', highlightActiveSection);
    highlightActiveSection(); // Initial call

    // --- Dark Mode ---
    const themeToggleBtn = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;

    function setTheme(theme) {
        if (theme === 'dark') {
            htmlElement.classList.add('dark');
            localStorage.setItem('theme', 'dark');
        } else {
            htmlElement.classList.remove('dark');
            localStorage.setItem('theme', 'light');
        }
    }

    // Init theme
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
        setTheme('dark');
    } else {
        setTheme('light');
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const isDark = htmlElement.classList.contains('dark');
            setTheme(isDark ? 'light' : 'dark');
        });
    }

    // --- Animation Observer ---
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const animateObserver = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                obs.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach(el => animateObserver.observe(el));

    // --- Logo Loader (Homepage) ---
    const heroLogo = document.getElementById('hero-img');
    if (heroLogo) {
        // Preload
        const finalImg = new Image();
        finalImg.src = "assets/images/logo-favrto-withe.png";

        setTimeout(() => {
            // Determine path context (root or subdir)
            const currentSrc = heroLogo.src;
            const isSubDir = currentSrc.includes('../');
            const newSrc = isSubDir ? "../assets/images/logo-favrto-withe.png" : "assets/images/logo-favrto-withe.png";

            heroLogo.style.opacity = '0'; // fade out slight
            setTimeout(() => {
                heroLogo.src = newSrc;
                heroLogo.style.opacity = '1';
            }, 200); // quick fade swap
        }, 4300);
    }


    // --- Newsletter Form Logic ---
    const newsletterForm = document.getElementById('newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = document.getElementById('newsletter-btn');
            const emailInput = document.getElementById('newsletter-email');
            const successMsg = document.getElementById('newsletter-success');
            const errorMsg = document.getElementById('newsletter-error');

            if (!emailInput.value) return;

            // Loading state
            const originalBtnText = btn.innerText;
            btn.innerHTML = `
                <svg class="mr-2 h-4 w-4 animate-spin" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12a9 9 0 1 1-6.219-8.56"></path></svg>
                Inscrevendo...
            `;
            btn.disabled = true;
            emailInput.disabled = true;

            // Simulate API
            setTimeout(() => {
                // Success
                btn.innerHTML = originalBtnText;
                btn.disabled = false;
                emailInput.disabled = false;
                emailInput.value = '';

                // Show success, hide form or just show success below
                newsletterForm.classList.add('hidden');
                successMsg.classList.remove('hidden');

                // Reset after 5s if desired, or leave it
                setTimeout(() => {
                    // successMsg.classList.add('hidden');
                    // newsletterForm.classList.remove('hidden');
                }, 5000);

            }, 1500);
        });
    }
});
