// Brazil Projects Map Logic
document.addEventListener('DOMContentLoaded', () => {
    const mapSvgContainer = document.getElementById('map-svg-container');
    if (!mapSvgContainer) return;

    console.log('Map initialized'); // Debug

    // Data from original component
    const statesData = {
        RS: { name: "Rio Grande do Sul", abbr: "RS", projects: [{ title: "Centro Comercial Porto Alegre", description: "Projeto completo de instalações hidrossanitárias e elétricas", year: "2023" }, { title: "Condomínio Residencial Gaúcho", description: "PPCI e sistema de climatização", year: "2022" }] },
        SC: { name: "Santa Catarina", abbr: "SC", projects: [{ title: "Beiramar Shopping", description: "Manutenção e adequação de sistemas elétricos e PPCI", year: "2024" }, { title: "Edifício Empresarial Florianópolis", description: "Projeto elétrico e climatização completa", year: "2023" }] },
        PR: { name: "Paraná", abbr: "PR", projects: [{ title: "Hospital Regional Curitiba", description: "Sistema de climatização e saúde e segurança do trabalho", year: "2023" }, { title: "Complexo Industrial Paraná", description: "Projetos elétricos e PPCI", year: "2022" }] },
        SP: { name: "São Paulo", abbr: "SP", projects: [{ title: "Centro Empresarial Paulista", description: "Projeto completo de instalações e climatização", year: "2024" }, { title: "Grupo OAD - Unidade São Paulo", description: "Adequação de sistemas e saúde ocupacional", year: "2023" }] },
        RJ: { name: "Rio de Janeiro", abbr: "RJ", projects: [{ title: "Edifício Comercial Rio", description: "Sistema hidrossanitário e PPCI", year: "2023" }] },
        MG: { name: "Minas Gerais", abbr: "MG", projects: [{ title: "SESC Minas Gerais", description: "Projeto de climatização e adequação elétrica", year: "2024" }, { title: "Complexo Industrial BH", description: "Projetos hidrossanitários e elétricos", year: "2023" }] },
        PA: { name: "Pará", abbr: "PA", projects: [{ title: "Centro Comercial Belém", description: "PPCI e instalações elétricas", year: "2022" }] }
    };

    const brazilStates = {
        AC: { path: "M45,215 L75,205 L85,220 L80,240 L55,245 L40,235 Z", cx: 62, cy: 225 },
        AM: { path: "M55,130 L150,125 L175,140 L180,180 L160,210 L140,220 L90,225 L55,210 L45,175 L40,145 Z", cx: 110, cy: 175 },
        RR: { path: "M100,75 L140,70 L155,95 L145,125 L115,130 L95,110 Z", cx: 125, cy: 100 },
        PA: { path: "M155,125 L270,110 L290,130 L295,175 L275,205 L240,220 L200,225 L175,215 L160,180 L155,150 Z", cx: 225, cy: 165 },
        AP: { path: "M240,75 L275,65 L290,90 L280,120 L255,125 L235,105 Z", cx: 262, cy: 95 },
        MA: { path: "M290,145 L345,135 L365,165 L355,200 L320,215 L295,200 L285,170 Z", cx: 325, cy: 175 },
        PI: { path: "M340,175 L375,165 L390,200 L385,250 L355,260 L335,235 L330,200 Z", cx: 360, cy: 215 },
        CE: { path: "M380,145 L420,135 L435,160 L425,195 L395,200 L378,175 Z", cx: 405, cy: 168 },
        RN: { path: "M430,150 L460,145 L468,170 L450,185 L428,178 Z", cx: 447, cy: 165 },
        PB: { path: "M420,188 L468,180 L475,200 L440,212 L418,205 Z", cx: 445, cy: 195 },
        PE: { path: "M375,210 L475,198 L480,225 L445,245 L385,250 L370,235 Z", cx: 425, cy: 225 },
        AL: { path: "M448,248 L480,240 L485,268 L458,280 L445,265 Z", cx: 465, cy: 258 },
        SE: { path: "M442,282 L470,275 L478,298 L455,308 L438,295 Z", cx: 458, cy: 290 },
        BA: { path: "M355,260 L450,250 L475,310 L465,380 L420,400 L365,390 L340,350 L335,295 Z", cx: 400, cy: 325 },
        TO: { path: "M295,210 L340,200 L355,260 L350,320 L315,340 L285,310 L280,255 Z", cx: 318, cy: 270 },
        GO: { path: "M300,340 L365,325 L395,360 L385,415 L345,435 L305,420 L290,380 Z", cx: 340, cy: 380 },
        DF: { path: "M355,365 L378,360 L385,380 L368,390 L352,382 Z", cx: 368, cy: 375 },
        MT: { path: "M155,225 L280,215 L295,260 L305,340 L275,385 L215,400 L165,370 L145,300 L140,250 Z", cx: 220, cy: 305 },
        MS: { path: "M225,400 L305,380 L335,420 L325,480 L280,510 L235,490 L215,445 Z", cx: 275, cy: 445 },
        MG: { path: "M345,350 L430,335 L470,375 L480,440 L445,480 L385,490 L340,455 L330,400 Z", cx: 405, cy: 415 },
        ES: { path: "M475,385 L505,378 L515,425 L495,445 L470,435 Z", cx: 492, cy: 412 },
        RJ: { path: "M445,455 L505,440 L520,475 L490,505 L455,495 L440,475 Z", cx: 480, cy: 475 },
        SP: { path: "M335,435 L420,415 L455,455 L450,510 L395,535 L340,515 L320,475 Z", cx: 385, cy: 475 },
        PR: { path: "M320,500 L395,485 L420,520 L410,565 L355,585 L315,560 L305,530 Z", cx: 360, cy: 535 },
        SC: { path: "M345,575 L405,560 L420,595 L395,625 L350,630 L335,605 Z", cx: 375, cy: 595 },
        RS: { path: "M310,610 L385,595 L405,640 L385,700 L330,720 L285,690 L275,650 Z", cx: 340, cy: 660 },
        RO: { path: "M90,235 L155,225 L165,280 L155,330 L115,345 L75,320 L65,275 Z", cx: 115, cy: 285 }
    };

    let selectedState = null;

    // Add styles for animations
    if (!document.getElementById('map-panel-styles')) {
        const style = document.createElement('style');
        style.id = 'map-panel-styles';
        style.textContent = `
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
            .state-path {
                cursor: pointer;
                transition: all 0.3s ease;
            }
            .state-path:hover {
                filter: brightness(1.2);
            }
            .state-path.has-projects:hover {
                transform: scale(1.02);
            }
        `;
        document.head.appendChild(style);
    }

    function selectState(abbr) {
        if (statesData[abbr]) {
            selectedState = abbr;
            updateMapColors();
            renderPanel();
        }
    }

    function updateMapColors() {
        Object.entries(brazilStates).forEach(([abbr, data]) => {
            const path = document.getElementById('state-' + abbr);
            const text = document.getElementById('text-' + abbr);

            if (path) {
                const hasProjects = abbr in statesData;
                const isSelected = selectedState === abbr;

                // Reset classes
                path.classList.remove('fill-muted', 'fill-primary', 'fill-accent', 'stroke-[1]', 'stroke-[3]', 'stroke-border', 'stroke-white');

                // Colors
                if (hasProjects) {
                    if (isSelected) {
                        path.classList.add('fill-accent', 'stroke-white', 'stroke-[3]');
                    } else {
                        path.classList.add('fill-primary', 'stroke-white', 'stroke-[1]');
                    }
                } else {
                    path.classList.add('fill-muted', 'stroke-border', 'stroke-[1]');
                }
            }

            if (text) {
                const hasProjects = abbr in statesData;
                text.classList.remove('fill-white', 'fill-muted-foreground', 'dark:fill-muted-foreground');
                if (hasProjects) {
                    text.classList.add('fill-white');
                } else {
                    text.classList.add('fill-muted-foreground');
                }
            }
        });
    }

    function renderMap() {
        let svgPaths = '';
        Object.entries(brazilStates).forEach(([abbr, data]) => {
            const hasProjects = abbr in statesData;

            svgPaths += `
                <path id="state-${abbr}" 
                    d="${data.path}" 
                    class="state-path ${hasProjects ? 'fill-primary stroke-white has-projects' : 'fill-muted stroke-border'}"
                    stroke-width="1"
                    data-abbr="${abbr}"
                />
                <text id="text-${abbr}" x="${data.cx}" y="${data.cy}" text-anchor="middle" dominant-baseline="middle" 
                    class="pointer-events-none select-none text-[9px] font-semibold ${hasProjects ? 'fill-white' : 'fill-muted-foreground'}"
                    style="font-size: 10px; font-weight: 600;">
                    ${abbr}
                </text>
            `;
        });

        const svgContent = `
            <svg viewBox="30 60 500 680" class="w-full max-w-md mx-auto" style="max-height: 500px;">
                <defs>
                    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                        <feDropShadow dx="0" dy="2" stdDeviation="3" flood-opacity="0.1" />
                    </filter>
                </defs>
                <g style="filter: url(#shadow)">
                    ${svgPaths}
                </g>
            </svg>
            <div class="flex justify-center gap-8 mt-6 pt-4 border-t border-border">
                <div class="flex items-center gap-2">
                    <div class="w-4 h-4 rounded bg-primary"></div>
                    <span class="text-xs text-muted-foreground">Com projetos</span>
                </div>
                <div class="flex items-center gap-2">
                    <div class="w-4 h-4 rounded border bg-muted border-border"></div>
                    <span class="text-xs text-muted-foreground">Sem projetos</span>
                </div>
            </div>
        `;

        mapSvgContainer.innerHTML = svgContent;

        // Attach click events
        document.querySelectorAll('.state-path.has-projects').forEach(path => {
            path.addEventListener('click', function (e) {
                e.preventDefault();
                e.stopPropagation();
                const abbr = this.getAttribute('data-abbr');
                selectState(abbr);
            });
        });
    }

    function renderPanel() {
        const panel = document.getElementById('map-info-panel');
        if (!panel) return;

        if (!selectedState || !statesData[selectedState]) {
            panel.innerHTML = `
                <div class="bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 border border-dashed border-border rounded-2xl p-8 text-center panel-fade-in">
                    <div class="w-16 h-16 mx-auto mb-5 rounded-2xl flex items-center justify-center bg-primary/10">
                        <i data-lucide="map-pin" class="w-8 h-8 text-primary"></i>
                    </div>
                    <h4 class="text-lg font-semibold text-foreground mb-2">Selecione um estado</h4>
                    <p class="text-sm text-muted-foreground mb-6">Clique em um dos estados destacados no mapa para visualizar os projetos.</p>
                    <div class="space-y-3">
                        <p class="text-xs font-medium text-muted-foreground uppercase tracking-wider">Acesso rápido</p>
                        <div class="flex flex-wrap justify-center gap-2">
                            ${Object.entries(statesData).map(([abbr, data]) => `
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

        const data = statesData[selectedState];
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
            updateMapColors();
            renderPanel();
        });
    }

    // Initial render
    renderMap();
    renderPanel();
});
