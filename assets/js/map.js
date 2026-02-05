// Brazil Projects Map with Leaflet.js - Enhanced Version
document.addEventListener('DOMContentLoaded', () => {
    const mapSvgContainer = document.getElementById('map-svg-container');
    if (!mapSvgContainer) return;

    console.log('Enhanced Interactive Leaflet Map initialized');

    // Project data with real geographic coordinates (state capitals)
    const projectsByState = {
        PA: {
            name: "Pará",
            abbr: "PA",
            lat: -1.4558,
            lng: -48.4902,
            projects: [
                { title: "Centro Comercial Belém", description: "PPCI e instalações elétricas", year: "2022", type: "PPCI" }
            ]
        },
        MG: {
            name: "Minas Gerais",
            abbr: "MG",
            lat: -19.9167,
            lng: -43.9345,
            projects: [
                { title: "SESC Minas Gerais", description: "Projeto de climatização e adequação elétrica", year: "2024", type: "Climatização" },
                { title: "Complexo Industrial BH", description: "Projetos hidrossanitários e elétricos", year: "2023", type: "Hidrossanitário" }
            ]
        },
        RJ: {
            name: "Rio de Janeiro",
            abbr: "RJ",
            lat: -22.9068,
            lng: -43.1729,
            projects: [
                { title: "Edifício Comercial Rio", description: "Sistema hidrossanitário e PPCI", year: "2023", type: "Hidrossanitário" }
            ]
        },
        SP: {
            name: "São Paulo",
            abbr: "SP",
            lat: -23.5505,
            lng: -46.6333,
            projects: [
                { title: "Centro Empresarial Paulista", description: "Projeto completo de instalações e climatização", year: "2024", type: "Climatização" },
                { title: "Grupo OAD - Unidade São Paulo", description: "Adequação de sistemas e saúde ocupacional", year: "2023", type: "Elétrico" }
            ]
        },
        PR: {
            name: "Paraná",
            abbr: "PR",
            lat: -25.4284,
            lng: -49.2733,
            projects: [
                { title: "Hospital Regional Curitiba", description: "Sistema de climatização e saúde e segurança do trabalho", year: "2023", type: "Climatização" },
                { title: "Complexo Industrial Paraná", description: "Projetos elétricos e PPCI", year: "2022", type: "PPCI" }
            ]
        },
        SC: {
            name: "Santa Catarina",
            abbr: "SC",
            lat: -27.5954,
            lng: -48.5480,
            projects: [
                { title: "Beiramar Shopping", description: "Manutenção e adequação de sistemas elétricos e PPCI", year: "2024", type: "Elétrico" },
                { title: "Edifício Empresarial Florianópolis", description: "Projeto elétrico e climatização completa", year: "2023", type: "Climatização" }
            ]
        },
        RS: {
            name: "Rio Grande do Sul",
            abbr: "RS",
            lat: -30.0346,
            lng: -51.2177,
            projects: [
                { title: "Centro Comercial Porto Alegre", description: "Projeto completo de instalações hidrossanitárias e elétricas", year: "2023", type: "Hidrossanitário" },
                { title: "Condomínio Residencial Gaúcho", description: "PPCI e sistema de climatização", year: "2022", type: "PPCI" }
            ]
        }
    };

    let selectedState = null;
    let map = null;
    let markers = {};
    let stateKeys = Object.keys(projectsByState);
    let currentStateIndex = -1;

    // Add Leaflet styles
    if (!document.getElementById('leaflet-css')) {
        const leafletCSS = document.createElement('link');
        leafletCSS.id = 'leaflet-css';
        leafletCSS.rel = 'stylesheet';
        leafletCSS.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
        document.head.appendChild(leafletCSS);
    }

    // Enhanced animation styles
    if (!document.getElementById('map-styles')) {
        const style = document.createElement('style');
        style.id = 'map-styles';
        style.textContent = `
            /* AREA 5: RESPONSIVENESS - Adaptive height */
            #map {
                height: clamp(400px, 60vh, 700px);
                width: 100%;
                border-radius: 1rem;
                z-index: 1;
                position: relative;
            }
            
            /* Loading overlay */
            .map-loading {
                position: absolute;
                inset: 0;
                background: rgba(255, 255, 255, 0.9);
                dark:background: rgba(0, 0, 0, 0.8);
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                z-index: 1000;
                border-radius: 1rem;
                backdrop-filter: blur(4px);
            }
            
            /* AREA 4: VISUAL - Loading spinner */
            .map-spinner {
                width: 50px;
                height: 50px;
                border: 4px solid rgba(77, 116, 147, 0.2);
                border-top-color: #4D7493;
                border-radius: 50%;
                animation: spin 0.8s linear infinite;
            }
            
            @keyframes spin {
                to { transform: rotate(360deg); }
            }
            
            .custom-marker {
                background: transparent;
                border: none;
            }
            
            /* AREA 6: ACCESSIBILITY - Focus states */
            .custom-marker:focus-visible {
                outline: 3px solid #4D7493;
                outline-offset: 4px;
                border-radius: 50%;
            }
            
            .custom-marker-icon {
                width: 50px;
                height: 72px;
                display: block;
                position: relative;
                cursor: pointer;
                animation: markerDropEnhanced 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
                transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
            }
            
            /* AREA 2: ANIMATIONS - Enhanced drop animation */
            @keyframes markerDropEnhanced {
                0% {
                    transform: translateY(-200px) scale(0) rotate(-20deg);
                    opacity: 0;
                    filter: blur(4px) drop-shadow(0 0 0 transparent);
                }
                40% {
                    transform: translateY(15px) scale(1.2) rotate(8deg);
                    filter: blur(0) drop-shadow(0 4px 8px rgba(77, 116, 147, 0.3));
                }
                60% {
                    transform: translateY(-8px) scale(0.9) rotate(-3deg);
                }
                75% {
                    transform: translateY(4px) scale(1.05) rotate(1deg);
                }
                90% {
                    transform: translateY(-2px) scale(0.98);
                }
                100% {
                    transform: translateY(0) scale(1) rotate(0);
                    opacity: 1;
                    filter: blur(0) drop-shadow(0 4px 8px rgba(77, 116, 147, 0.2));
                }
            }
            
            /* AREA 2: ANIMATIONS - Enhanced hover with glow */
            .custom-marker-icon:hover {
                transform: translateY(-10px) scale(1.15);
                filter: drop-shadow(0 12px 24px rgba(77, 116, 147, 0.5));
            }
            
            .custom-marker-icon:hover::before {
                content: '';
                position: absolute;
                inset: -15px;
                background: radial-gradient(circle, rgba(77, 116, 147, 0.3), transparent 70%);
                animation: glowPulse 2s ease-in-out infinite;
                z-index: -1;
                border-radius: 50%;
            }
            
            @keyframes glowPulse {
                0%, 100% { opacity: 0.4; transform: scale(1); }
                50% { opacity: 1; transform: scale(1.3); }
            }
            
            /* AREA 2: ANIMATIONS - Enhanced selection state */
            .custom-marker-icon.selected {
                animation: markerPulseEnhanced 1.5s ease-in-out infinite;
                transform: scale(1.2);
            }
            
            @keyframes markerPulseEnhanced {
                0%, 100% {
                    transform: scale(1.2);
                    filter: drop-shadow(0 6px 12px rgba(77, 116, 147, 0.4));
                }
                50% {
                    transform: scale(1.35) rotate(5deg);
                    filter: drop-shadow(0 12px 24px rgba(77, 116, 147, 0.7));
                }
            }

            /* AREA 2: ANIMATIONS - Smooth transitions */
            .leaflet-marker-icon {
                transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1),
                            filter 0.3s ease;
            }

            /* Panel animations */
            .panel-slide-in {
                animation: panelSlideInEnhanced 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
            }
            
            @keyframes panelSlideInEnhanced {
                from {
                    opacity: 0;
                    transform: translateX(40px) scale(0.95);
                }
                to {
                    opacity: 1;
                    transform: translateX(0) scale(1);
                }
            }
            
            .panel-fade-in {
                animation: panelFadeInEnhanced 0.4s ease-out forwards;
            }
            
            @keyframes panelFadeInEnhanced {
                from {
                    opacity: 0;
                    transform: scale(0.96) translateY(10px);
                }
                to {
                    opacity: 1;
                    transform: scale(1) translateY(0);
                }
            }
            
            /* AREA 2: ANIMATIONS - Project cards with stagger */
            .project-card-animate {
                opacity: 0;
                transform: translateY(20px);
                animation: projectCardInEnhanced 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
            }
            
            @keyframes projectCardInEnhanced {
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            /* AREA 2: ANIMATIONS - Card hover effects */
            .project-card {
                transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
            }
            
            .project-card:hover {
                transform: translateY(-4px) scale(1.02);
                box-shadow: 0 12px 28px rgba(0, 0, 0, 0.15);
            }

            /* AREA 4: VISUAL - Tooltip enhanced */
            .custom-tooltip {
                animation: tooltipSlideDown 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
            }
            
            @keyframes tooltipSlideDown {
                from {
                    opacity: 0;
                    transform: translateY(-15px) scale(0.9);
                }
                to {
                    opacity: 1;
                    transform: translateY(0) scale(1);
                }
            }

            /* AREA 5: RESPONSIVENESS - Mobile bottom sheet */
            @media (max-width: 768px) {
                #map {
                    height: clamp(300px, 50vh, 500px);
                }
                
                .panel-mobile-sheet {
                    position: fixed;
                    bottom: 0;
                    left: 0;
                    right: 0;
                    max-height: 70vh;
                    background: white;
                    border-top-left-radius: 1.5rem;
                    border-top-right-radius: 1.5rem;
                    box-shadow: 0 -8px 32px rgba(0, 0, 0, 0.2);
                    z-index: 2000;
                    animation: slideUpSheet 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
                    overflow-y: auto;
                }
                
                @keyframes slideUpSheet {
                    from {
                        transform: translateY(100%);
                    }
                    to {
                        transform: translateY(0);
                    }
                }
                
                .panel-mobile-sheet::before {
                    content: '';
                    position: absolute;
                    top: 8px;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 40px;
                    height: 4px;
                    background: rgba(0, 0, 0, 0.2);
                    border-radius: 2px;
                }
            }

            /* AREA 7: CONTENT - Stats counter */
            .stat-counter {
                font-variant-numeric: tabular-nums;
                animation: countUp 2s ease-out;
            }
            
            @keyframes countUp {
                from { opacity: 0; transform: scale(0.5); }
                to { opacity: 1; transform: scale(1); }
            }
        `;
        document.head.appendChild(style);
    }

    function createCustomMarkerIcon(abbr, pinColor, projectCount) {
        return `
            <svg width="50" height="65" viewBox="0 0 50 65" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <defs>
                    <filter id="shadow-${abbr}" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur in="SourceAlpha" stdDeviation="3"/>
                        <feOffset dx="0" dy="4" result="offsetblur"/>
                        <feComponentTransfer>
                            <feFuncA type="linear" slope="0.4"/>
                        </feComponentTransfer>
                        <feMerge>
                            <feMergeNode/>
                            <feMergeNode in="SourceGraphic"/>
                        </feMerge>
                    </filter>
                    <linearGradient id="pin-gradient-${abbr}" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" style="stop-color:${pinColor};stop-opacity:1" />
                        <stop offset="100%" style="stop-color:${pinColor};stop-opacity:0.8" />
                    </linearGradient>
                </defs>
                
                <ellipse cx="25" cy="60" rx="8" ry="3" fill="rgba(0,0,0,0.2)"/>
                
                <g filter="url(#shadow-${abbr})">
                    <circle cx="25" cy="18" r="16" fill="url(#pin-gradient-${abbr})" stroke="white" stroke-width="2.5"/>
                    <circle cx="25" cy="18" r="10" fill="white" opacity="0.3"/>
                    <circle cx="25" cy="18" r="7" fill="white" opacity="0.6"/>
                    <path d="M 18,28 L 25,42 L 32,28 Q 25,32 18,28 Z" fill="url(#pin-gradient-${abbr})" stroke="white" stroke-width="1"/>
                </g>
                
                <g transform="translate(25, 50)">
                    <rect x="-20" y="0" width="40" height="22" rx="4" 
                          fill="white" opacity="0.98" 
                          stroke="${pinColor}" stroke-width="2"
                          filter="url(#shadow-${abbr})"/>
                    <text x="0" y="14" 
                          font-family="'Inter', 'Segoe UI', sans-serif" 
                          font-size="11" 
                          font-weight="700" 
                          fill="${pinColor}" 
                          text-anchor="middle">
                        ${abbr}
                    </text>
                </g>
                
                ${projectCount > 0 ? `
                    <g transform="translate(40, 10)">
                        <circle cx="0" cy="0" r="9" fill="#ef4444" stroke="white" stroke-width="2" filter="url(#shadow-${abbr})"/>
                        <text x="0" y="4" 
                              font-family="'Inter', sans-serif" 
                              font-size="10" 
                              font-weight="bold" 
                              fill="white" 
                              text-anchor="middle">
                            ${projectCount}
                        </text>
                    </g>
                ` : ''}
            </svg>
        `;
    }

    // AREA 1: UX - Enhanced state selection with auto zoom
    function selectState(abbr, shouldZoom = true) {
        if (projectsByState[abbr]) {
            selectedState = abbr;
            currentStateIndex = stateKeys.indexOf(abbr);
            updateMarkers();
            renderPanel();

            // AREA 1: UX - Auto zoom to selected marker
            if (shouldZoom && map && markers[abbr]) {
                const data = projectsByState[abbr];
                map.flyTo([data.lat, data.lng], 6, {
                    animate: true,
                    duration: 1.5,
                    easeLinearity: 0.25
                });
            }
        }
    }

    // AREA 1: UX - Keyboard navigation
    function handleKeyboardNavigation(e) {
        if (!selectedState && e.key.startsWith('Arrow')) {
            // If no selection, select first state
            selectState(stateKeys[0]);
            return;
        }

        if (!selectedState) return;

        switch (e.key) {
            case 'ArrowRight':
            case 'ArrowDown':
                e.preventDefault();
                currentStateIndex = (currentStateIndex + 1) % stateKeys.length;
                selectState(stateKeys[currentStateIndex]);
                break;
            case 'ArrowLeft':
            case 'ArrowUp':
                e.preventDefault();
                currentStateIndex = (currentStateIndex - 1 + stateKeys.length) % stateKeys.length;
                selectState(stateKeys[currentStateIndex]);
                break;
            case 'Escape':
                e.preventDefault();
                selectedState = null;
                currentStateIndex = -1;
                updateMarkers();
                renderPanel();
                map.flyTo([-14.2350, -51.9253], 4, { duration: 1 });
                break;
        }
    }

    document.addEventListener('keydown', handleKeyboardNavigation);

    function updateMarkers() {
        Object.keys(markers).forEach(abbr => {
            const markerElement = markers[abbr].getElement();
            if (markerElement) {
                const iconDiv = markerElement.querySelector('.custom-marker-icon');
                if (iconDiv) {
                    iconDiv.classList.toggle('selected', selectedState === abbr);
                }
            }
        });
    }

    // AREA 4: VISUAL - Show loading state
    function showLoading() {
        const loadingDiv = document.createElement('div');
        loadingDiv.className = 'map-loading';
        loadingDiv.setAttribute('role', 'status');
        loadingDiv.setAttribute('aria-live', 'polite');
        loadingDiv.innerHTML = `
            <div class="map-spinner"></div>
            <p class="mt-4 text-sm text-muted-foreground">Carregando mapa...</p>
        `;
        mapSvgContainer.appendChild(loadingDiv);
        return loadingDiv;
    }

    function initMap() {
        // AREA 6: ACCESSIBILITY - ARIA labels
        mapSvgContainer.innerHTML = `
            <div id="map" role="region" aria-label="Mapa interativo de projetos no Brasil" tabindex="0"></div>
            <div class="flex flex-wrap justify-center gap-6 mt-6" role="complementary" aria-label="Estatísticas de projetos">
                <div class="flex items-center gap-3 bg-card px-4 py-3 rounded-lg border border-border">
                    <div class="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <i data-lucide="map-pin" class="h-5 w-5 text-primary"></i>
                    </div>
                    <div>
                        <div class="text-2xl font-bold text-foreground stat-counter">${Object.keys(projectsByState).length}</div>
                        <div class="text-xs text-muted-foreground">Estados</div>
                    </div>
                </div>
                <div class="flex items-center gap-3 bg-card px-4 py-3 rounded-lg border border-border">
                    <div class="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <i data-lucide="building-2" class="h-5 w-5 text-primary"></i>
                    </div>
                    <div>
                        <div class="text-2xl font-bold text-foreground stat-counter">${Object.values(projectsByState).reduce((sum, state) => sum + state.projects.length, 0)}</div>
                        <div class="text-xs text-muted-foreground">Projetos</div>
                    </div>
                </div>
            </div>
        `;

        if (typeof lucide !== 'undefined') lucide.createIcons();

        const loading = showLoading();

        // AREA 3: PERFORMANCE - Lazy load Leaflet with timeout
        const checkLeaflet = setInterval(() => {
            if (typeof L !== 'undefined') {
                clearInterval(checkLeaflet);
                loading.remove();
                renderMap();
            }
        }, 100);

        // Timeout fallback
        setTimeout(() => {
            if (typeof L === 'undefined') {
                clearInterval(checkLeaflet);
                loading.innerHTML = `
                    <p class="text-red-500">Erro ao carregar o mapa. Por favor, recarregue a página.</p>
                `;
            }
        }, 10000);
    }

    // AREA 3: PERFORMANCE - Debounced theme observer
    let themeChangeTimeout;
    function debouncedThemeChange() {
        clearTimeout(themeChangeTimeout);
        themeChangeTimeout = setTimeout(() => {
            if (map) {
                const isDark = document.documentElement.classList.contains('dark');
                const newColor = isDark ? '#90ADC1' : '#4D7493';

                // Update markers without recreating map
                Object.entries(projectsByState).forEach(([abbr, data]) => {
                    if (markers[abbr]) {
                        const markerElement = markers[abbr].getElement();
                        if (markerElement) {
                            const projectCount = data.projects.length;
                            const iconHtml = createCustomMarkerIcon(abbr, newColor, projectCount);
                            const iconDiv = markerElement.querySelector('.custom-marker-icon');
                            if (iconDiv) {
                                const wasSelected = iconDiv.classList.contains('selected');
                                iconDiv.innerHTML = iconHtml;
                                if (wasSelected) iconDiv.classList.add('selected');
                            }
                        }
                    }
                });

                // Update tooltip styles
                const tooltipStyleEl = document.getElementById('tooltip-styles');
                if (tooltipStyleEl) {
                    tooltipStyleEl.textContent = `
                        .custom-tooltip {
                            background: white;
                            border: 2px solid ${newColor};
                            border-radius: 8px;
                            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                            padding: 8px 12px;
                            font-family: 'Inter', sans-serif;
                        }
                        .leaflet-tooltip-top:before {
                            border-top-color: ${newColor} !important;
                        }
                    `;
                }
            }
        }, 300);
    }

    function renderMap() {
        map = L.map('map', {
            center: [-14.2350, -51.9253],
            zoom: 4,
            minZoom: 4,
            maxZoom: 8,
            scrollWheelZoom: false,
            tap: true,
            tapTolerance: 15
        });

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors',
            maxZoom: 19
        }).addTo(map);

        const isDark = document.documentElement.classList.contains('dark');
        const pinColor = isDark ? '#90ADC1' : '#4D7493';

        Object.entries(projectsByState).forEach(([abbr, data], index) => {
            const projectCount = data.projects.length;
            const iconHtml = createCustomMarkerIcon(abbr, pinColor, projectCount);

            const customIcon = L.divIcon({
                className: 'custom-marker',
                html: `<div class="custom-marker-icon" style="animation-delay: ${index * 0.15}s" tabindex="0" role="button" aria-label="Ver projetos em ${data.name}">${iconHtml}</div>`,
                iconSize: [50, 72],
                iconAnchor: [25, 65],
                popupAnchor: [0, -65]
            });

            const marker = L.marker([data.lat, data.lng], { icon: customIcon })
                .addTo(map)
                .on('click', () => selectState(abbr));

            // AREA 6: ACCESSIBILITY - Keyboard support on markers
            marker.on('add', () => {
                const markerElement = marker.getElement();
                if (markerElement) {
                    const iconDiv = markerElement.querySelector('.custom-marker-icon');
                    if (iconDiv) {
                        iconDiv.addEventListener('keypress', (e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                                e.preventDefault();
                                selectState(abbr);
                            }
                        });
                    }
                }
            });

            const tooltipContent = `
                <div style="font-family: 'Inter', sans-serif; padding: 4px;">
                    <strong style="color: ${pinColor}; font-size: 14px;">${data.name}</strong><br/>
                    <span style="font-size: 12px; color: #666;">
                        ${projectCount} projeto${projectCount > 1 ? 's' : ''} realizado${projectCount > 1 ? 's' : ''}
                    </span>
                </div>
            `;

            marker.bindTooltip(tooltipContent, {
                permanent: false,
                direction: 'top',
                offset: [0, -60],
                className: 'custom-tooltip',
                opacity: 0.95
            });

            markers[abbr] = marker;
        });

        // Add custom tooltip styles
        if (!document.getElementById('tooltip-styles')) {
            const tooltipStyle = document.createElement('style');
            tooltipStyle.id = 'tooltip-styles';
            tooltipStyle.textContent = `
                .custom-tooltip {
                    background: white;
                    border: 2px solid ${pinColor};
                    border-radius: 8px;
                    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                    padding: 8px 12px;
                    font-family: 'Inter', sans-serif;
                }
                .leaflet-tooltip-top:before {
                    border-top-color: ${pinColor} !important;
                }
            `;
            document.head.appendChild(tooltipStyle);
        }

        // AREA 3: PERFORMANCE - Debounced theme observer
        const observer = new MutationObserver(debouncedThemeChange);
        observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    }

    // Load Leaflet.js
    if (typeof L === 'undefined') {
        const script = document.createElement('script');
        script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
        script.onload = initMap;
        document.head.appendChild(script);
    } else {
        initMap();
    }

    function renderPanel() {
        const panel = document.getElementById('map-info-panel');
        if (!panel) return;

        // AREA 6: ACCESSIBILITY - ARIA live region
        panel.setAttribute('aria-live', 'polite');
        panel.setAttribute('aria-relevant', 'all');

        // AREA 5: RESPONSIVENESS - Mobile detection
        const isMobile = window.innerWidth < 768;
        const panelClass = isMobile ? 'panel-mobile-sheet' : '';

        if (!selectedState || !projectsByState[selectedState]) {
            panel.innerHTML = `
                <div class="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 border border-dashed border-border rounded-2xl p-8 text-center panel-fade-in ${panelClass}">
                    <div class="w-16 h-16 mx-auto mb-5 rounded-2xl flex items-center justify-center bg-primary/10">
                        <i data-lucide="map-pin" class="w-8 h-8 text-primary"></i>
                    </div>
                    <h4 class="text-lg font-semibold text-foreground mb-2">Selecione um local</h4>
                    <p class="text-sm text-muted-foreground mb-2">Clique em um dos alfinetes no mapa para visualizar os projetos.</p>
                    <p class="text-xs text-muted-foreground mb-6">Use as setas ← → para navegar entre estados</p>
                    <div class="space-y-3">
                        <p class="text-xs font-medium text-muted-foreground uppercase tracking-wider">Acesso rápido</p>
                        <div class="flex flex-wrap justify-center gap-2">
                            ${Object.entries(projectsByState).map(([abbr, data]) => `
                                <button class="quick-select-btn px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 hover:scale-110 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 bg-primary/10 text-primary dark:text-primary-foreground/90 dark:bg-primary/20"
                                    data-abbr="${abbr}"
                                    aria-label="Ver projetos em ${data.name}">
                                    ${data.name}
                                </button>
                            `).join('')}
                        </div>
                    </div>
                </div>
            `;

            if (typeof lucide !== 'undefined') lucide.createIcons();

            document.querySelectorAll('.quick-select-btn').forEach(btn => {
                btn.addEventListener('click', function () {
                    selectState(this.getAttribute('data-abbr'));
                });
            });
            return;
        }

        const data = projectsByState[selectedState];
        panel.innerHTML = `
            <div class="bg-card border border-border rounded-2xl overflow-hidden shadow-xl panel-slide-in ${panelClass}">
                <div class="bg-gradient-to-br from-primary to-primary/80 px-6 py-5 flex items-center justify-between">
                    <div class="flex items-center gap-4">
                        <div class="w-14 h-14 rounded-xl bg-white/20 flex items-center justify-center backdrop-blur-sm">
                            <span class="text-2xl font-bold text-white">${data.abbr}</span>
                        </div>
                        <div>
                            <h4 class="text-xl font-bold text-white">${data.name}</h4>
                            <p class="text-sm text-white/80">${data.projects.length} projeto(s)</p>
                        </div>
                    </div>
                    <button id="close-panel-btn" class="p-2.5 hover:bg-white/20 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white" aria-label="Fechar painel">
                        <i data-lucide="x" class="w-5 h-5 text-white"></i>
                    </button>
                </div>
                <div class="p-5 space-y-4 max-h-[400px] overflow-y-auto">
                    ${data.projects.map((project, index) => `
                        <div class="project-card project-card-animate bg-secondary/30 rounded-xl p-4 hover:bg-secondary/60 transition-all duration-300 border border-transparent hover:border-primary/20 hover:shadow-md" 
                             style="animation-delay: ${index * 0.1}s">
                            <div class="flex items-start gap-4">
                                <div class="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 bg-primary/10">
                                    <i data-lucide="building-2" class="w-7 h-7 text-primary"></i>
                                </div>
                                <div class="flex-1 min-w-0">
                                    <h5 class="font-bold text-foreground text-lg">${project.title}</h5>
                                    <p class="text-sm text-muted-foreground mt-1.5 leading-relaxed">${project.description}</p>
                                    <div class="flex items-center gap-3 mt-3 flex-wrap">
                                        <div class="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-accent/10">
                                            <i data-lucide="calendar" class="w-3.5 h-3.5 text-accent"></i>
                                            <span class="text-xs font-semibold text-accent">${project.year}</span>
                                        </div>
                                        <div class="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/10">
                                            <i data-lucide="tag" class="w-3.5 h-3.5 text-primary"></i>
                                            <span class="text-xs font-semibold text-primary">${project.type}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;

        if (typeof lucide !== 'undefined') lucide.createIcons();

        document.getElementById('close-panel-btn')?.addEventListener('click', () => {
            selectedState = null;
            currentStateIndex = -1;
            updateMarkers();
            renderPanel();
            map.flyTo([-14.2350, -51.9253], 4, { duration: 1 });
        });
    }

    // Initial render
    renderPanel();
});
