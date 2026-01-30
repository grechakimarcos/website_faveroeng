document.addEventListener('DOMContentLoaded', () => {
    // Check if user already accepted cookies
    if (localStorage.getItem('cookiesAccepted') === 'true') {
        return;
    }

    // Create banner elements
    const banner = document.createElement('div');
    banner.id = 'cookie-banner';
    banner.className = 'fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-md border-t border-border p-4 shadow-lg z-50 transform translate-y-full transition-transform duration-500 ease-out';

    // Banner content HTML
    banner.innerHTML = `
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div class="flex items-start gap-3">
                <div class="p-2 bg-primary/10 rounded-lg hidden sm:block">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-primary w-6 h-6"><path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5"></path><path d="M8.5 8.5v.01"></path><path d="M16 15.5v.01"></path><path d="M12 12v.01"></path><path d="M11 17v.01"></path><path d="M7 14v.01"></path></svg>
                </div>
                <div>
                    <h3 class="text-base font-semibold text-foreground">Utilizamos cookies 🍪</h3>
                    <p class="text-sm text-muted-foreground mt-1">
                        Usamos cookies para melhorar sua experiência e analisar o tráfego do site. Ao continuar navegando, você concorda com nossa política de privacidade.
                    </p>
                </div>
            </div>
            <div class="flex items-center gap-3 w-full sm:w-auto">
                <button id="accept-cookies-btn" class="w-full sm:w-auto inline-flex items-center justify-center rounded-lg bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
                    Aceitar
                </button>
            </div>
        </div>
    `;

    // Append to body
    document.body.appendChild(banner);

    // Trigger animation after small delay
    setTimeout(() => {
        banner.classList.remove('translate-y-full');
    }, 500);

    // Handle click
    const acceptBtn = document.getElementById('accept-cookies-btn');
    acceptBtn.addEventListener('click', () => {
        // Save preference
        localStorage.setItem('cookiesAccepted', 'true');

        // Animate out
        banner.classList.add('translate-y-full');

        // Remove from DOM after animation
        setTimeout(() => {
            banner.remove();
        }, 500);
    });
});
