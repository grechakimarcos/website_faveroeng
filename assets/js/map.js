// Brazil Projects Map with Leaflet.js - Interactive Real Map
document.addEventListener('DOMContentLoaded', () => {
    const mapSvgContainer = document.getElementById('map-svg-container');
    if (!mapSvgContainer) return;

    console.log('Interactive Leaflet Map initialized');

    // Project data with real geographic coordinates (state capitals)
    const projectsByState = {
        PA: {
            name: "Pará",
            abbr: "PA",
            lat: -1.4558, // Belém
            lng: -48.4902,
            projects: [
                { title: "Centro Comercial Belém", description: "PPCI e instalações elétricas", year: "2022" }
            ]
        },
        MG: {
            name: "Minas Gerais",
            abbr: "MG",
            lat: -19.9167, // Belo Horizonte
            lng: -43.9345,
            projects: [
                { title: "SESC Minas Gerais", description: "Projeto de climatização e adequação elétrica", year: "2024" },
                { title: "Complexo Industrial BH", description: "Projetos hidrossanitários e elétricos", year: "2023" }
            ]
        },
        RJ: {
            name: "Rio de Janeiro",
            abbr: "RJ",
            lat: -22.9068, // Rio de Janeiro
            lng: -43.1729,
            projects: [
                { title: "Edifício Comercial Rio", description: "Sistema hidrossanitário e PPCI", year: "2023" }
            ]
        },
        SP: {
            name: "São Paulo",
            abbr: "SP",
            lat: -23.5505, // São Paulo
            lng: -46.6333,
            projects: [
                { title: "Centro Empresarial Paulista", description: "Projeto completo de instalações e climatização", year: "2024" },
                { title: "Grupo OAD - Unidade São Paulo", description: "Adequação de sistemas e saúde ocupacional", year: "2023" }
            ]
        },
        PR: {
            name: "Paraná",
            abbr: "PR",
            lat: -25.4284, // Curitiba
            lng: -49.2733,
            projects: [
                { title: "Hospital Regional Curitiba", description: "Sistema de climatização e saúde e segurança do trabalho", year: "2023" },
                { title: "Complexo Industrial Paraná", description: "Projetos elétricos e PPCI", year: "2022" }
            ]
        },
        SC: {
            name: "Santa Catarina",
            abbr: "SC",
            lat: -27.5954, // Florianópolis
            lng: -48.5480,
            projects: [
                { title: "Beiramar Shopping", description: "Manutenção e adequação de sistemas elétricos e PPCI", year: "2024" },
                { title: "Edifício Empresarial Florianópolis", description: "Projeto elétrico e climatização completa", year: "2023" }
            ]
        },
        RS: {
            name: "Rio Grande do Sul",
            abbr: "RS",
            lat: -30.0346, // Porto Alegre
            lng: -51.2177,
            projects: [
                { title: "Centro Comercial Porto Alegre", description: "Projeto completo de instalações hidrossanitárias e elétricas", year: "2023" },
                { title: "Condomínio Residencial Gaúcho", description: "PPCI e sistema de climatização", year: "2022" }
            ]
        }
    };

    let selectedState = null;
    let map = null;
    let markers = {};

    // Add Leaflet styles
    if (!document.getElementById('leaflet-css')) {
        const leafletCSS = document.createElement('link');
        leafletCSS.id = 'leaflet-css';
        leafletCSS.rel = 'stylesheet';
        leafletCSS.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
        document.head.appendChild(leafletCSS);
    }

    // Add animation styles
    if (!document.getElementById('map-styles')) {
        const style = document.createElement('style');
        style.id = 'map-styles';
        style.textContent = `
            #map {
                height: 600px;
                width: 100%;
                border-radius: 1rem;
                z-index: 1;
            }
            
            .custom-marker {
                background: transparent;
                border: none;
            }
            
            .custom-marker-icon {
                width: 50px;
                height: 72px;
                display: block;
                position: relative;
                cursor: pointer;
                animation: markerDrop 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
                transition: all 0.3s ease;
            }
            
            @keyframes markerDrop {
                0% { 
                    transform: translateY(-150px) scale(0) rotate(-15deg); 
                    opacity: 0; 
                }
                50% {
                    transform: translateY(10px) scale(1.1) rotate(5deg);
                }
                70% { 
                    transform: translateY(-5px) scale(0.95) rotate(-2deg); 
                }
                85% {
                    transform: translateY(2px) scale(1.02) rotate(1deg);
                }
                100% { 
                    transform: translateY(0) scale(1) rotate(0deg); 
                    opacity: 1; 
                }
            }
            
            .custom-marker-icon:hover {
                transform: translateY(-8px) scale(1.1);
                filter: drop-shadow(0 8px 16px rgba(77, 116, 147, 0.4));
            }
            
            .custom-marker-icon.selected {
                animation: markerPulse 1.5s ease-in-out infinite;
            }
            
            @keyframes markerPulse {
                0%, 100% { 
                    transform: scale(1); 
                    filter: drop-shadow(0 4px 8px rgba(77, 116, 147, 0.3));
                }
                50% { 
                    transform: scale(1.15); 
                    filter: drop-shadow(0 8px 16px rgba(77, 116, 147, 0.6));
                }
            }

            .panel-slide-in {
                animation: panelSlideIn 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
            }
            @keyframes panelSlideIn {
                from { opacity: 0; transform: translateX(30px); }
                to { opacity: 1; transform: translateX(0); }
            }
            .panel-fade-in {
                animation: panelFadeIn 0.3s ease-out forwards;
            }
            @keyframes panelFadeIn {
                from { opacity: 0; transform: scale(0.98); }
                to { opacity: 1; transform: scale(1); }
            }
            .project-card-animate {
                opacity: 0;
                transform: translateY(15px);
                animation: projectCardIn 0.4s ease-out forwards;
            }
            @keyframes projectCardIn {
                to { opacity: 1; transform: translateY(0); }
            }
        `;
        document.head.appendChild(style);
    }

    function createCustomMarkerIcon(abbr, pinColor, projectCount) {
        return `
            <svg width="50" height="65" viewBox="0 0 50 65" xmlns="http://www.w3.org/2000/svg">
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
                
                <!-- Pin shadow -->
                <ellipse cx="25" cy="60" rx="8" ry="3" fill="rgba(0,0,0,0.2)"/>
                
                <!-- Main pin body -->
                <g filter="url(#shadow-${abbr})">
                    <!-- Pin circle -->
                    <circle cx="25" cy="18" r="16" fill="url(#pin-gradient-${abbr})" stroke="white" stroke-width="2.5"/>
                    <circle cx="25" cy="18" r="10" fill="white" opacity="0.3"/>
                    
                    <!-- Inner glow -->
                    <circle cx="25" cy="18" r="7" fill="white" opacity="0.6"/>
                    
                    <!-- Pin point -->
                    <path d="M 18,28 L 25,42 L 32,28 Q 25,32 18,28 Z" fill="url(#pin-gradient-${abbr})" stroke="white" stroke-width="1"/>
                </g>
                
                <!-- State label with background -->
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
                
                <!-- Project count badge -->
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

    function selectState(abbr) {
        if (projectsByState[abbr]) {
            selectedState = abbr;
            updateMarkers();
            renderPanel();
        }
    }

    function updateMarkers() {
        Object.keys(markers).forEach(abbr => {
            const icon = markers[abbr].getElement();
            if (icon) {
                const svg = icon.querySelector('svg');
                if (svg) {
                    svg.classList.toggle('selected', selectedState === abbr);
                }
            }
        });
    }

    function initMap() {
        // Create map container
        mapSvgContainer.innerHTML = `
            <div id="map"></div>
            <div class="flex justify-center gap-8 mt-4">
                <div class="flex items-center gap-2">
                    <div style="width: 20px; height: 20px; background: #4D7493; border-radius: 50%;"></div>
                    <span class="text-xs text-muted-foreground">Estados com projetos</span>
                </div>
            </div>
        `;

        // Wait for Leaflet to load
        const checkLeaflet = setInterval(() => {
            if (typeof L !== 'undefined') {
                clearInterval(checkLeaflet);
                renderMap();
            }
        }, 100);
    }

    function renderMap() {
        // Initialize map centered on Brazil
        map = L.map('map', {
            center: [-14.2350, -51.9253], // Center of Brazil
            zoom: 4,
            minZoom: 4,
            maxZoom: 8,
            scrollWheelZoom: false
        });

        // Add tile layer (OpenStreetMap)
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors',
            maxZoom: 19
        }).addTo(map);

        // Add markers
        const isDark = document.documentElement.classList.contains('dark');
        const pinColor = isDark ? '#90ADC1' : '#4D7493';

        Object.entries(projectsByState).forEach(([abbr, data], index) => {
            const projectCount = data.projects.length;
            const iconHtml = createCustomMarkerIcon(abbr, pinColor, projectCount);

            const customIcon = L.divIcon({
                className: 'custom-marker',
                html: `<div class="custom-marker-icon" style="animation-delay: ${index * 0.15}s">${iconHtml}</div>`,
                iconSize: [50, 72],
                iconAnchor: [25, 65],
                popupAnchor: [0, -65]
            });

            const marker = L.marker([data.lat, data.lng], { icon: customIcon })
                .addTo(map)
                .on('click', () => selectState(abbr));

            // Add tooltip with state info
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
                .custom-tooltip:before {
                    border-top-color: ${pinColor};
                }
                .leaflet-tooltip-top:before {
                    border-top-color: ${pinColor} !important;
                }
            `;
            document.head.appendChild(tooltipStyle);
        }

        // Theme observer
        const observer = new MutationObserver(() => {
            if (map) {
                map.remove();
                renderMap();
            }
        });
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

        if (!selectedState || !projectsByState[selectedState]) {
            panel.innerHTML = `
                <div class="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 border border-dashed border-border rounded-2xl p-8 text-center panel-fade-in">
                    <div class="w-16 h-16 mx-auto mb-5 rounded-2xl flex items-center justify-center bg-primary/10">
                        <i data-lucide="map-pin" class="w-8 h-8 text-primary"></i>
                    </div>
                    <h4 class="text-lg font-semibold text-foreground mb-2">Selecione um local</h4>
                    <p class="text-sm text-muted-foreground mb-6">Clique em um dos alfinetes no mapa para visualizar os projetos.</p>
                    <div class="space-y-3">
                        <p class="text-xs font-medium text-muted-foreground uppercase tracking-wider">Acesso rápido</p>
                        <div class="flex flex-wrap justify-center gap-2">
                            ${Object.entries(projectsByState).map(([abbr, data]) => `
                                <button class="quick-select-btn px-4 py-2 text-sm font-medium rounded-lg transition-all duration-300 hover:scale-110 hover:shadow-lg bg-primary/10 text-primary dark:text-primary-foreground/90 dark:bg-primary/20"
                                    data-abbr="${abbr}">
                                    ${data.name}
                                </button>
                            `).join('')}
                        </div>
                    </div>
                </div>
            `;

            if (typeof lucide !== 'undefined') lucide.createIcons();

            // Quick select buttons
            document.querySelectorAll('.quick-select-btn').forEach(btn => {
                btn.addEventListener('click', function () {
                    selectState(this.getAttribute('data-abbr'));
                });
            });
            return;
        }

        const data = projectsByState[selectedState];
        panel.innerHTML = `
            <div class="bg-card border border-border rounded-2xl overflow-hidden shadow-xl panel-slide-in">
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
                    <button id="close-panel-btn" class="p-2.5 hover:bg-white/20 rounded-full transition-all duration-300">
                        <i data-lucide="x" class="w-5 h-5 text-white"></i>
                    </button>
                </div>
                <div class="p-5 space-y-4 max-h-[400px] overflow-y-auto">
                    ${data.projects.map((project, index) => `
                        <div class="project-card-animate bg-secondary/30 rounded-xl p-4 hover:bg-secondary/60 transition-all duration-300 border border-transparent hover:border-primary/20 hover:shadow-md" 
                             style="animation-delay: ${index * 0.1}s">
                            <div class="flex items-start gap-4">
                                <div class="w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 bg-primary/10">
                                    <i data-lucide="building-2" class="w-7 h-7 text-primary"></i>
                                </div>
                                <div class="flex-1 min-w-0">
                                    <h5 class="font-bold text-foreground text-lg">${project.title}</h5>
                                    <p class="text-sm text-muted-foreground mt-1.5 leading-relaxed">${project.description}</p>
                                    <div class="flex items-center gap-3 mt-3">
                                        <div class="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-accent/10">
                                            <i data-lucide="calendar" class="w-3.5 h-3.5 text-accent"></i>
                                            <span class="text-xs font-semibold text-accent">${project.year}</span>
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
            updateMapPins();
            renderPanel();
        });
    }

    // Initial render
    renderMap();
    renderPanel();
});
