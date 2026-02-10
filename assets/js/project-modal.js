// Project Modal with Image Carousel
document.addEventListener('DOMContentLoaded', () => {
    // Project data with images
    const projectsData = {
        'beiramar': {
            title: 'Beiramar Shopping',
            location: 'Florianópolis, SC',
            year: '2024',
            category: 'Comercial',
            description: 'Projeto completo de instalações elétricas, hidrossanitárias e sistema de prevenção contra incêndio para a expansão do Beiramar Shopping. O projeto contemplou mais de 15.000m² de área construída, incluindo novas lojas, praça de alimentação e estacionamento.',
            services: ['Projeto Elétrico', 'Hidrossanitário', 'PPCI', 'Climatização'],
            images: [
                'assets/images/Capa_projetoBeriamarShopping.jpg',
                'assets/images/civil-engineering-team-working-professional.jpg',
                'assets/images/civil-engineering-office-professional-team.jpg'
            ],
            stats: { area: '15.000 m²', duration: '8 meses', team: '12 engenheiros' }
        },
        'sesc': {
            title: 'SESC Minas Gerais',
            location: 'Belo Horizonte, MG',
            year: '2023',
            category: 'Institucional',
            description: 'Desenvolvimento de projetos de climatização e sistema preventivo contra incêndio para unidade do SESC em Florianópolis. Projeto focado em eficiência energética e sustentabilidade, atendendo às normas mais rigorosas do mercado.',
            services: ['Climatização', 'PPCI', 'Consultoria Técnica'],
            images: [
                'assets/images/Capa_projetoSescMG.jpg',
                'assets/images/civil-engineering-construction-site-modern.jpg',
                'assets/images/civil-engineering-team-working-professional.jpg'
            ],
            stats: { area: '8.500 m²', duration: '6 meses', team: '8 engenheiros' }
        },
        'prefeitura': {
            title: 'Prefeitura de Porto Alegre',
            location: 'Porto Alegre, RS',
            year: '2023',
            category: 'Público',
            description: 'Consultoria técnica e desenvolvimento de projetos de instalações para diversos edifícios públicos da Prefeitura de Porto Alegre. Trabalho envolveu adequação às normas de acessibilidade e modernização dos sistemas existentes.',
            services: ['Elétrico', 'Hidrossanitário', 'Consultoria', 'Adequação NR'],
            images: [
                'assets/images/Capa_projetoPrefeituaPoa.jpg',
                'assets/images/civil-engineering-office-professional-team.jpg',
                'assets/images/civil-engineering-construction-site-modern.jpg'
            ],
            stats: { area: '25.000 m²', duration: '12 meses', team: '15 engenheiros' }
        },
        'hospital-curitiba': {
            title: 'Hospital Regional Curitiba',
            location: 'Curitiba, PR',
            year: '2024',
            category: 'SST & Climatização',
            description: 'Projeto completo de sistema de climatização hospitalar e implementação do programa de saúde e segurança do trabalho. O projeto contemplou adequação dos sistemas de HVAC para ambientes hospitalares críticos, incluindo salas cirúrgicas, UTI e áreas de isolamento, seguindo as normas da ANVISA e NR-32.',
            services: ['Climatização', 'SST', 'HVAC Hospitalar', 'Adequação NR-32'],
            images: [
                'assets/images/Capa_ProjetoHospitalRegionalCuritiba.jpg',
                'assets/images/civil-engineering-construction-site-modern.jpg',
                'assets/images/civil-engineering-team-working-professional.jpg'
            ],
            stats: { area: '12.000 m²', duration: '10 meses', team: '10 engenheiros' }
        },
        'grupo-oad-sp': {
            title: 'Grupo OAD - Unidade São Paulo',
            location: 'São Paulo, SP',
            year: '2024',
            category: 'Adequações Técnicas',
            description: 'Adequação de sistemas prediais e implementação de programa de saúde ocupacional para a unidade do Grupo OAD em São Paulo. O projeto envolveu modernização completa das instalações elétricas, hidrossanitárias e de climatização, além da implementação do PCMSO e PPRA.',
            services: ['Sistemas Prediais', 'Saúde Ocupacional', 'PCMSO', 'Adequação NR'],
            images: [
                'assets/images/Capa_ProjetoGrupoOADUnidadeSaoPaulo.avif',
                'assets/images/civil-engineering-office-professional-team.jpg',
                'assets/images/civil-engineering-team-working-professional.jpg'
            ],
            stats: { area: '9.200 m²', duration: '7 meses', team: '9 engenheiros' }
        },
        'complexo-industrial-bh': {
            title: 'Complexo Industrial BH',
            location: 'Belo Horizonte, MG',
            year: '2023',
            category: 'Projetos Integrados',
            description: 'Desenvolvimento de projetos hidrossanitários e elétricos integrados para complexo industrial em Belo Horizonte. O escopo incluiu dimensionamento completo das redes de água fria, esgoto sanitário, águas pluviais e instalações elétricas de média e baixa tensão.',
            services: ['Hidrossanitário', 'Elétrico', 'Águas Pluviais', 'Média Tensão'],
            images: [
                'assets/images/Capa_ProjetoComplexoIndustrialBH.png',
                'assets/images/civil-engineering-construction-site-modern.jpg',
                'assets/images/civil-engineering-office-professional-team.jpg'
            ],
            stats: { area: '18.000 m²', duration: '9 meses', team: '14 engenheiros' }
        },
        'edificio-florianopolis': {
            title: 'Edifício Empresarial Florianópolis',
            location: 'Florianópolis, SC',
            year: '2024',
            category: 'Projeto Completo',
            description: 'Projeto elétrico completo e sistema de climatização para edifício corporativo em Florianópolis. Incluiu projetos de instalações elétricas, SPDA, cabeamento estruturado, climatização VRF e sistema preventivo contra incêndio, atendendo às mais rigorosas normas técnicas.',
            services: ['Elétrico', 'Climatização', 'SPDA', 'Cabeamento', 'PPCI'],
            images: [
                'assets/images/Capa_ProjetoEdifícioEmpresarialFlorianópolis.jpg',
                'assets/images/civil-engineering-team-working-professional.jpg',
                'assets/images/civil-engineering-construction-site-modern.jpg'
            ],
            stats: { area: '20.000 m²', duration: '11 meses', team: '13 engenheiros' }
        }
    };

    let currentImageIndex = 0;
    let currentProject = null;

    // Inject modal styles
    const style = document.createElement('style');
    style.textContent = `
        .project-modal-overlay {
            position: fixed;
            inset: 0;
            background: rgba(0, 0, 0, 0.8);
            backdrop-filter: blur(8px);
            z-index: 9999;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s ease;
        }
        .project-modal-overlay.active {
            opacity: 1;
            visibility: visible;
        }
        .project-modal {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) scale(0.9);
            width: 95%;
            max-width: 1000px;
            max-height: 90vh;
            background: var(--card);
            border-radius: 1.5rem;
            overflow: hidden;
            z-index: 10000;
            opacity: 0;
            visibility: hidden;
            transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
        }
        .project-modal.active {
            opacity: 1;
            visibility: visible;
            transform: translate(-50%, -50%) scale(1);
        }
        .modal-close-btn {
            position: absolute;
            top: 1rem;
            right: 1rem;
            width: 44px;
            height: 44px;
            border-radius: 50%;
            background: rgba(0, 0, 0, 0.5);
            backdrop-filter: blur(10px);
            border: none;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            z-index: 10;
            transition: all 0.3s ease;
        }
        .modal-close-btn:hover {
            background: rgba(0, 0, 0, 0.7);
            transform: rotate(90deg);
        }
        .carousel-container {
            position: relative;
            aspect-ratio: 16/9;
            overflow: hidden;
        }
        .carousel-track {
            display: flex;
            transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
            height: 100%;
        }
        .carousel-slide {
            min-width: 100%;
            height: 100%;
            background-size: cover;
            background-position: center;
        }
        .carousel-btn {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            width: 48px;
            height: 48px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.9);
            border: none;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            color: #1e3a5f;
            transition: all 0.3s ease;
            box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        }
        .carousel-btn:hover {
            background: white;
            transform: translateY(-50%) scale(1.1);
        }
        .carousel-btn.prev { left: 1rem; }
        .carousel-btn.next { right: 1rem; }
        .carousel-dots {
            position: absolute;
            bottom: 1rem;
            left: 50%;
            transform: translateX(-50%);
            display: flex;
            gap: 0.5rem;
        }
        .carousel-dot {
            width: 10px;
            height: 10px;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.5);
            border: none;
            cursor: pointer;
            transition: all 0.3s ease;
        }
        .carousel-dot.active {
            background: white;
            transform: scale(1.2);
        }
        .modal-content {
            padding: 2rem;
            max-height: calc(90vh - 56.25vw);
            overflow-y: auto;
        }
        @media (min-width: 768px) {
            .modal-content {
                max-height: 40vh;
            }
        }
        .service-tag {
            display: inline-flex;
            padding: 0.375rem 0.75rem;
            background: rgba(77, 116, 147, 0.15);
            color: #4D7493;
            border-radius: 9999px;
            font-size: 0.75rem;
            font-weight: 600;
        }
        .stat-card {
            background: var(--secondary);
            border-radius: 0.75rem;
            padding: 1rem;
            text-align: center;
        }
        .project-card-clickable {
            cursor: pointer;
        }
    `;
    document.head.appendChild(style);

    // Create modal HTML
    const modalHTML = `
        <div class="project-modal-overlay" id="projectModalOverlay"></div>
        <div class="project-modal" id="projectModal">
            <button class="modal-close-btn" id="modalCloseBtn">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M18 6L6 18M6 6l12 12"/>
                </svg>
            </button>
            <div class="carousel-container" id="carouselContainer">
                <div class="carousel-track" id="carouselTrack"></div>
                <button class="carousel-btn prev" id="carouselPrev">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M15 18l-6-6 6-6"/>
                    </svg>
                </button>
                <button class="carousel-btn next" id="carouselNext">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <path d="M9 18l6-6-6-6"/>
                    </svg>
                </button>
                <div class="carousel-dots" id="carouselDots"></div>
            </div>
            <div class="modal-content" id="modalContent"></div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHTML);

    const modal = document.getElementById('projectModal');
    const overlay = document.getElementById('projectModalOverlay');
    const closeBtn = document.getElementById('modalCloseBtn');
    const carouselTrack = document.getElementById('carouselTrack');
    const carouselDots = document.getElementById('carouselDots');
    const modalContent = document.getElementById('modalContent');
    const prevBtn = document.getElementById('carouselPrev');
    const nextBtn = document.getElementById('carouselNext');

    function openModal(projectId) {
        const project = projectsData[projectId];
        if (!project) return;

        currentProject = project;
        currentImageIndex = 0;

        // Render carousel
        carouselTrack.innerHTML = project.images.map(img =>
            `<div class="carousel-slide" style="background-image: url('${img}')"></div>`
        ).join('');

        carouselDots.innerHTML = project.images.map((_, i) =>
            `<button class="carousel-dot ${i === 0 ? 'active' : ''}" data-index="${i}"></button>`
        ).join('');

        // Render content
        modalContent.innerHTML = `
            <div class="flex flex-wrap items-center gap-3 mb-4">
                <span class="service-tag">${project.category}</span>
                <span class="text-sm text-muted-foreground flex items-center gap-1">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/></svg>
                    ${project.location}
                </span>
                <span class="text-sm text-muted-foreground flex items-center gap-1">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                    ${project.year}
                </span>
            </div>
            <h2 class="text-2xl md:text-3xl font-bold text-foreground mb-4">${project.title}</h2>
            <p class="text-muted-foreground leading-relaxed mb-6">${project.description}</p>
            
            <div class="grid grid-cols-3 gap-4 mb-6">
                <div class="stat-card">
                    <div class="text-lg font-bold text-foreground">${project.stats.area}</div>
                    <div class="text-xs text-muted-foreground">Área Total</div>
                </div>
                <div class="stat-card">
                    <div class="text-lg font-bold text-foreground">${project.stats.duration}</div>
                    <div class="text-xs text-muted-foreground">Duração</div>
                </div>
                <div class="stat-card">
                    <div class="text-lg font-bold text-foreground">${project.stats.team}</div>
                    <div class="text-xs text-muted-foreground">Equipe</div>
                </div>
            </div>

            <div>
                <h3 class="text-sm font-semibold text-foreground mb-3">Serviços Realizados</h3>
                <div class="flex flex-wrap gap-2">
                    ${project.services.map(s => `<span class="service-tag">${s}</span>`).join('')}
                </div>
            </div>
        `;

        updateCarousel();
        overlay.classList.add('active');
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        overlay.classList.remove('active');
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    function updateCarousel() {
        carouselTrack.style.transform = `translateX(-${currentImageIndex * 100}%)`;
        document.querySelectorAll('.carousel-dot').forEach((dot, i) => {
            dot.classList.toggle('active', i === currentImageIndex);
        });
    }

    function nextSlide() {
        if (currentProject) {
            currentImageIndex = (currentImageIndex + 1) % currentProject.images.length;
            updateCarousel();
        }
    }

    function prevSlide() {
        if (currentProject) {
            currentImageIndex = (currentImageIndex - 1 + currentProject.images.length) % currentProject.images.length;
            updateCarousel();
        }
    }

    // Event listeners
    closeBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', closeModal);
    prevBtn.addEventListener('click', prevSlide);
    nextBtn.addEventListener('click', nextSlide);

    carouselDots.addEventListener('click', (e) => {
        if (e.target.classList.contains('carousel-dot')) {
            currentImageIndex = parseInt(e.target.dataset.index);
            updateCarousel();
        }
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!modal.classList.contains('active')) return;
        if (e.key === 'Escape') closeModal();
        if (e.key === 'ArrowLeft') prevSlide();
        if (e.key === 'ArrowRight') nextSlide();
    });

    // Make project cards clickable
    document.querySelectorAll('[data-project]').forEach(card => {
        card.classList.add('project-card-clickable');
        card.addEventListener('click', () => {
            openModal(card.dataset.project);
        });
    });

    // Expose to global for inline onclick
    window.openProjectModal = openModal;
});
