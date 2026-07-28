// Project Modal with Image Carousel
document.addEventListener('DOMContentLoaded', () => {
    // Project data with images
    const projectsData = {
        'beiramar': {
            title: 'Beiramar Shopping',
            i18n: {
                pt: {
                    description: 'Projeto completo de instalações elétricas, hidrossanitárias e sistema de prevenção contra incêndio para a expansão do Beiramar Shopping. O projeto contemplou mais de 15.000m² de área construída, incluindo novas lojas, praça de alimentação e estacionamento.',
                    services: ['Projeto Elétrico', 'Hidrossanitário', 'PPCI', 'Climatização']
                },
                en: {
                    description: 'Complete project of electrical, plumbing, and fire prevention systems for the expansion of Beiramar Shopping. The project covered over 15,000m² of built area, including new stores, a food court, and parking.',
                    services: ['Electrical Project', 'Plumbing', 'Fire Safety', 'HVAC']
                },
                es: {
                    description: 'Proyecto completo de instalaciones eléctricas, hidrosanitarias y sistema de prevención de incendios para la expansión de Beiramar Shopping. El proyecto abarcó más de 15.000m² de área construida, incluyendo nuevas tiendas, patio de comidas y estacionamiento.',
                    services: ['Proyecto Eléctrico', 'Hidrosanitario', 'PPCI', 'Climatización']
                }
            },
            location: 'Florianópolis, SC',
            year: '2024',
            category: 'Comercial',
            images: [
                'assets/images/Capa_projetoBeriamarShopping.jpg',
                'assets/images/civil-engineering-team-working-professional.jpg',
                'assets/images/civil-engineering-office-professional-team.jpg'
            ],
            stats: { area: '15.000 m²', duration: '8 meses', team: '12' }
        },
        'sesc': {
            title: 'SESC Minas Gerais',
            i18n: {
                pt: {
                    description: 'Desenvolvimento de projetos de climatização e sistema preventivo contra incêndio para unidade do SESC em Florianópolis. Projeto focado em eficiência energética e sustentabilidade, atendendo às normas mais rigorosas do mercado.',
                    services: ['Climatização', 'PPCI', 'Consultoria Técnica']
                },
                en: {
                    description: 'Development of HVAC and fire prevention system projects for a SESC unit in Florianópolis. The project focused on energy efficiency and sustainability, meeting the strictest market standards.',
                    services: ['HVAC', 'Fire Safety', 'Technical Consulting']
                },
                es: {
                    description: 'Desarrollo de proyectos de climatización y sistema preventivo contra incendios para una unidad de SESC en Florianópolis. Proyecto enfocado en la eficiencia energética y la sostenibilidad, cumpliendo con las normas más rigurosas del mercado.',
                    services: ['Climatización', 'PPCI', 'Consultoría Técnica']
                }
            },
            location: 'Belo Horizonte, MG',
            year: '2023',
            category: 'Institucional',
            images: [
                'assets/images/Capa_projetoSescMG.jpg',
                'assets/images/civil-engineering-construction-site-modern.jpg',
                'assets/images/civil-engineering-team-working-professional.jpg'
            ],
            stats: { area: '8.500 m²', duration: '6 meses', team: '8' }
        },
        'prefeitura': {
            title: 'Prefeitura de Porto Alegre',
            i18n: {
                pt: {
                    description: 'Consultoria técnica e desenvolvimento de projetos de instalações para diversos edifícios públicos da Prefeitura de Porto Alegre. Trabalho envolveu adequação às normas de acessibilidade e modernização dos sistemas existentes.',
                    services: ['Elétrico', 'Hidrossanitário', 'Consultoria', 'Adequação NR']
                },
                en: {
                    description: 'Technical consulting and development of installation projects for several public buildings of the Porto Alegre City Hall. The work involved adapting to accessibility standards and modernizing existing systems.',
                    services: ['Electrical', 'Plumbing', 'Consulting', 'NR Compliance']
                },
                es: {
                    description: 'Consultoría técnica y desarrollo de proyectos de instalaciones para diversos edificios públicos del Ayuntamiento de Porto Alegre. El trabajo implicó la adecuación a las normas de accesibilidad y la modernización de los sistemas existentes.',
                    services: ['Eléctrico', 'Hidrosanitario', 'Consultoría', 'Adecuación NR']
                }
            },
            location: 'Porto Alegre, RS',
            year: '2023',
            category: 'Público',
            images: [
                'assets/images/Capa_projetoPrefeituaPoa.jpg',
                'assets/images/civil-engineering-office-professional-team.jpg',
                'assets/images/civil-engineering-construction-site-modern.jpg'
            ],
            stats: { area: '25.000 m²', duration: '12 meses', team: '15' }
        },
        'hospital-curitiba': {
            title: 'Hospital Regional Curitiba',
            i18n: {
                pt: {
                    description: 'Projeto completo de sistema de climatização hospitalar e implementação do programa de saúde e segurança do trabalho. O projeto contemplou adequação dos sistemas de HVAC para ambientes hospitalares críticos, incluindo salas cirúrgicas, UTI e áreas de isolamento, seguindo as normas da ANVISA e NR-32.',
                    services: ['Climatização', 'SST', 'HVAC Hospitalar', 'Adequação NR-32']
                },
                en: {
                    description: 'Complete project for a hospital air conditioning system and implementation of a health and safety at work program. The project included adapting HVAC systems for critical hospital environments, including operating rooms, ICUs, and isolation areas, following ANVISA and NR-32 standards.',
                    services: ['HVAC', 'Occupational Health & Safety', 'Hospital HVAC', 'NR-32 Compliance']
                },
                es: {
                    description: 'Proyecto completo de sistema de climatización hospitalaria e implementación del programa de salud y seguridad en el trabajo. El proyecto contempló la adecuación de los sistemas de HVAC para ambientes hospitalarios críticos, incluyendo quirófanos, UCI y áreas de aislamiento, siguiendo las normas de ANVISA y NR-32.',
                    services: ['Climatización', 'SST', 'HVAC Hospitalario', 'Adecuación NR-32']
                }
            },
            location: 'Curitiba, PR',
            year: '2024',
            category: 'SST & Climatização',
            images: [
                'assets/images/Capa_ProjetoHospitalRegionalCuritiba.jpg',
                'assets/images/civil-engineering-construction-site-modern.jpg',
                'assets/images/civil-engineering-team-working-professional.jpg'
            ],
            stats: { area: '12.000 m²', duration: '10 meses', team: '10' }
        },
        'grupo-oad-sp': {
            title: 'Grupo OAD - Unidade São Paulo',
            i18n: {
                pt: {
                    description: 'Adequação de sistemas prediais e implementação de programa de saúde ocupacional para a unidade do Grupo OAD em São Paulo. O projeto envolveu modernização completa das instalações elétricas, hidrossanitárias e de climatização, além da implementação do PCMSO e PPRA.',
                    services: ['Sistemas Prediais', 'Saúde Ocupacional', 'PCMSO', 'Adequação NR']
                },
                en: {
                    description: 'Adaptation of building systems and implementation of an occupational health program for the Grupo OAD unit in São Paulo. The project involved a complete modernization of electrical, plumbing, and air conditioning installations, in addition to the implementation of PCMSO and PPRA.',
                    services: ['Building Systems', 'Occupational Health', 'PCMSO', 'NR Compliance']
                },
                es: {
                    description: 'Adecuación de sistemas de edificios e implementación de un programa de salud ocupacional para la unidad del Grupo OAD en São Paulo. El proyecto implicó la modernización completa de las instalaciones eléctricas, hidrosanitarias y de climatización, además de la implementación del PCMSO y PPRA.',
                    services: ['Sistemas de Edificios', 'Salud Ocupacional', 'PCMSO', 'Adecuación NR']
                }
            },
            location: 'São Paulo, SP',
            year: '2024',
            category: 'Adequações Técnicas',
            images: [
                'assets/images/Capa_ProjetoGrupoOADUnidadeSaoPaulo.avif',
                'assets/images/civil-engineering-office-professional-team.jpg',
                'assets/images/civil-engineering-team-working-professional.jpg'
            ],
            stats: { area: '9.200 m²', duration: '7 meses', team: '9' }
        },
        'complexo-industrial-bh': {
            title: 'Complexo Industrial BH',
            i18n: {
                pt: {
                    description: 'Desenvolvimento de projetos hidrossanitários e elétricos integrados para complexo industrial em Belo Horizonte. O escopo incluiu dimensionamento completo das redes de água fria, esgoto sanitário, águas pluviais e instalações elétricas de média e baixa tensão.',
                    services: ['Hidrossanitário', 'Elétrico', 'Águas Pluviais', 'Média Tensão']
                },
                en: {
                    description: 'Development of integrated plumbing and electrical projects for an industrial complex in Belo Horizonte. The scope included complete sizing of cold water, sanitary sewer, rainwater networks, and medium and low voltage electrical installations.',
                    services: ['Plumbing', 'Electrical', 'Rainwater', 'Medium Voltage']
                },
                es: {
                    description: 'Desarrollo de proyectos hidrosanitarios y eléctricos integrados para un complejo industrial en Belo Horizonte. El alcance incluyó el dimensionamiento completo de las redes de agua fría, alcantarillado sanitario, aguas pluviales e instalaciones eléctricas de media y baja tensión.',
                    services: ['Hidrosanitario', 'Eléctrico', 'Aguas Pluviales', 'Media Tensión']
                }
            },
            location: 'Belo Horizonte, MG',
            year: '2023',
            category: 'Projetos Integrados',
            images: [
                'assets/images/Capa_ProjetoComplexoIndustrialBH.png',
                'assets/images/civil-engineering-construction-site-modern.jpg',
                'assets/images/civil-engineering-office-professional-team.jpg'
            ],
            stats: { area: '18.000 m²', duration: '9 meses', team: '14' }
        },
        'edificio-florianopolis': {
            title: 'Edifício Empresarial Florianópolis',
            i18n: {
                pt: {
                    description: 'Projeto elétrico completo e sistema de climatização para edifício corporativo em Florianópolis. Incluiu projetos de instalações elétricas, SPDA, cabeamento estruturado, climatização VRF e sistema preventivo contra incêndio, atendendo às mais rigorosas normas técnicas.',
                    services: ['Elétrico', 'Climatização', 'SPDA', 'Cabeamento', 'PPCI']
                },
                en: {
                    description: 'Complete electrical project and air conditioning system for a corporate building in Florianópolis. It included projects for electrical installations, lightning protection, structured cabling, VRF air conditioning, and a fire prevention system, meeting the strictest technical standards.',
                    services: ['Electrical', 'HVAC', 'Lightning Protection', 'Cabling', 'Fire Safety']
                },
                es: {
                    description: 'Proyecto eléctrico completo y sistema de climatización para un edificio corporativo en Florianópolis. Incluyó proyectos de instalaciones eléctricas, SPDA, cableado estructurado, climatización VRF y sistema preventivo contra incendios, cumpliendo con las más rigurosas normas técnicas.',
                    services: ['Eléctrico', 'Climatización', 'SPDA', 'Cableado', 'PPCI']
                }
            },
            location: 'Florianópolis, SC',
            year: '2024',
            category: 'Projeto Completo',
            images: [
                'assets/images/Capa_ProjetoEdifícioEmpresarialFlorianópolis.jpg',
                'assets/images/civil-engineering-team-working-professional.jpg',
                'assets/images/civil-engineering-construction-site-modern.jpg'
            ],
            stats: { area: '20.000 m²', duration: '11 meses', team: '13' }
        },
        'makai': {
            title: 'Residencial Makai – Florianópolis SC',
            i18n: {
                pt: {
                    title: 'Residencial Makai – Florianópolis SC',
                    description: 'O Residencial Makai é um empreendimento multifamiliar em Florianópolis – SC, com 64.000 m² de área construída, desenvolvido com foco em segurança, tecnologia e eficiência construtiva. O projeto contempla serviços de Projeto Preventivo Contra Incêndio, Modelagem BIM, compatibilização de projetos e aprovação junto aos órgãos competentes, garantindo conformidade com as normas técnicas e maior qualidade na execução da obra.',
                    services: ['Projeto Preventivo Contra Incêndio', 'Modelagem e Compatibilização BIM', 'Aprovação junto aos órgãos competentes']
                },
                en: {
                    title: 'Residencial Makai – Florianópolis SC',
                    description: 'Residencial Makai is a multi-family development in Florianópolis – SC, with 64,000 m² of built area, developed with a focus on safety, technology and constructive efficiency. The project includes Fire Prevention, BIM Modeling, project compatibility and approval with competent bodies.',
                    services: ['Fire Prevention Project', 'BIM Modeling & Compatibility', 'Regulatory Approval']
                },
                es: {
                    title: 'Residencial Makai – Florianópolis SC',
                    description: 'Residencial Makai es un desarrollo multifamiliar en Florianópolis – SC, con 64.000 m² de área construida, desarrollado con foco en seguridad, tecnología y eficiencia constructiva. El proyecto contempla servicios de Prevención de Incendios, Modelado BIM, compatibilización de proyectos y aprobación ante los órganos competentes.',
                    services: ['Proyecto de Prevención de Incendios', 'Modelado BIM y Compatibilización', 'Aprobación Regulatoria']
                }
            },
            location: 'Florianópolis, SC',
            year: '2024',
            category: 'Projeto Completo',
            images: [
                'assets/images/Projetos/Makai/MakaiCapa.webp',
                'assets/images/Projetos/Makai/makai02.webp',
                'assets/images/Projetos/Makai/makai03.webp',
                'assets/images/Projetos/Makai/makaicapa02.webp',
                'assets/images/Projetos/Makai/makaicapa03.webp'
            ],
            stats: { area: '64.000 m²', duration: '18 meses', team: '20' }
        },
        'mppu': {
            title: 'Ministério Público de Porto União – SC',
            i18n: {
                pt: {
                    title: 'Ministério Público de Porto União – SC',
                    description: 'Projeto desenvolvido para o Ministério Público de Porto União – SC, com aproximadamente 3.100 m² de área construída, contemplando os projetos hidrossanitário e preventivo contra incêndio. Os serviços foram elaborados conforme as normas técnicas vigentes, garantindo segurança, eficiência e conformidade para a edificação.',
                    services: ['Projeto Hidrossanitário', 'Projeto Preventivo Contra Incêndio']
                },
                en: {
                    title: 'Ministério Público de Porto União – SC',
                    description: 'Project developed for the Ministério Público de Porto União – SC, with approximately 3,100 m² of built area, encompassing plumbing and fire prevention projects. Services were executed in accordance with current technical standards, ensuring safety, efficiency and compliance.',
                    services: ['Plumbing Project', 'Fire Prevention Project']
                },
                es: {
                    title: 'Ministério Público de Porto União – SC',
                    description: 'Proyecto desarrollado para el Ministério Público de Porto União – SC, con aproximadamente 3.100 m² de área construida, contemplando proyectos hidrosanitarios y de prevención contra incendios. Los servicios fueron elaborados conforme las normas técnicas vigentes.',
                    services: ['Proyecto Hidrosanitario', 'Proyecto de Prevención de Incendios']
                }
            },
            location: 'Porto União, SC',
            year: '2024',
            category: 'Preventivo',
            images: [
                'assets/images/Projetos/MPPU/mppupreventivo01.webp',
                'assets/images/Projetos/MPPU/mppupreventivo01_1.webp',
                'assets/images/Projetos/MPPU/mppupreventivo02.webp',
                'assets/images/Projetos/MPPU/mppupreventivo02_1.webp'
            ],
            stats: { area: '3.100 m²', duration: '8 meses', team: '7' }
        },
        'ambulatorio-mg': {
            title: 'Ambulatório – Minas Gerais',
            i18n: {
                pt: {
                    title: 'Ambulatório – Minas Gerais',
                    description: 'O Ambulatório, localizado em Minas Gerais, é uma edificação hospitalar com aproximadamente 12.450 m² de área construída, desenvolvida com foco em segurança, eficiência operacional e conformidade com as normas técnicas para estabelecimentos de saúde. O projeto contemplou o desenvolvimento dos sistemas hidrossanitários e de prevenção e combate a incêndio, utilizando modelagem e compatibilização BIM, além do acompanhamento para aprovação junto aos órgãos competentes.',
                    services: ['Projeto Hidrossanitário', 'Projeto Preventivo Contra Incêndio', 'Modelagem e Compatibilização BIM', 'Aprovação junto aos órgãos competentes']
                },
                en: {
                    title: 'Outpatient Clinic – Minas Gerais',
                    description: 'A hospital building in Minas Gerais with approximately 12,450 m² of built area, developed with a focus on safety, operational efficiency and compliance with technical standards for healthcare facilities. The project included plumbing systems, fire prevention and BIM modeling.',
                    services: ['Plumbing Project', 'Fire Prevention Project', 'BIM Modeling & Compatibility', 'Regulatory Approval']
                },
                es: {
                    title: 'Ambulatorio – Minas Gerais',
                    description: 'Edificio hospitalario en Minas Gerais con aproximadamente 12.450 m² de área construida, desarrollado con foco en seguridad, eficiencia operacional y conformidad con normas técnicas para establecimientos de salud. El proyecto incluyó sistemas hidrosanitarios, prevención de incendios y modelado BIM.',
                    services: ['Proyecto Hidrosanitario', 'Prevención de Incendios', 'Modelado BIM y Compatibilización', 'Aprobación Regulatoria']
                }
            },
            location: 'Minas Gerais, MG',
            year: '2024',
            category: 'Hospitalar',
            images: [
                'assets/images/Projetos/Ambulat%C3%B3rio%20em%20mg/Ambulatorio_em_mg01.png',
                'assets/images/Projetos/Ambulat%C3%B3rio%20em%20mg/Ambulatorio_em_mg02.png',
                'assets/images/Projetos/Ambulat%C3%B3rio%20em%20mg/Ambulatorio_em_mg03.png',
                'assets/images/Projetos/Ambulat%C3%B3rio%20em%20mg/Ambulatorio_em_mg04.png',
                'assets/images/Projetos/Ambulat%C3%B3rio%20em%20mg/Ambulatorio_em_mg05.png',
                'assets/images/Projetos/Ambulat%C3%B3rio%20em%20mg/Ambulatorio_em_mg06.png',
                'assets/images/Projetos/Ambulat%C3%B3rio%20em%20mg/Ambulatorio_em_mg07.png'
            ],
            stats: { area: '12.450 m²', duration: '12 meses', team: '10' }
        },
        'ed-comercial': {
            title: 'Edifício Comercial',
            i18n: {
                pt: {
                    title: 'Edifício Comercial',
                    description: 'O Edifício Comercial é um empreendimento com aproximadamente 3.600 m² de área construída, desenvolvido para atender às demandas de infraestrutura elétrica e de comunicação, garantindo segurança, desempenho e confiabilidade para as operações do edifício. O projeto contemplou o desenvolvimento das instalações elétricas e do sistema de cabeamento estruturado, além do processo de aprovação junto à CELESC.',
                    services: ['Projeto de Instalações Elétricas', 'Projeto de Cabeamento Estruturado', 'Aprovação junto à CELESC']
                },
                en: {
                    title: 'Commercial Building',
                    description: 'A commercial building with approximately 3,600 m² of built area, developed to meet electrical infrastructure and communication demands, ensuring safety, performance and reliability. The project included electrical installations, structured cabling and CELESC approval.',
                    services: ['Electrical Installations Project', 'Structured Cabling Project', 'CELESC Approval']
                },
                es: {
                    title: 'Edificio Comercial',
                    description: 'Edificio comercial con aproximadamente 3.600 m² de área construida, desarrollado para atender las demandas de infraestructura eléctrica y de comunicación, garantizando seguridad, desempeño y confiabilidad. El proyecto incluyó instalaciones eléctricas, cableado estructurado y aprobación ante CELESC.',
                    services: ['Instalaciones Eléctricas', 'Cableado Estructurado', 'Aprobación CELESC']
                }
            },
            location: 'Santa Catarina, SC',
            year: '2024',
            category: 'Elétrico',
            images: [
                'assets/images/Projetos/ED%20Comercial/ED_01.png',
                'assets/images/Projetos/ED%20Comercial/ED_02.png',
                'assets/images/Projetos/ED%20Comercial/ED_03.png',
                'assets/images/Projetos/ED%20Comercial/ED_04.png',
                'assets/images/Projetos/ED%20Comercial/ED_05.png',
                'assets/images/Projetos/ED%20Comercial/ED_06.png',
                'assets/images/Projetos/ED%20Comercial/ED_07.png'
            ],
            stats: { area: '3.600 m²', duration: '6 meses', team: '6' }
        },
        'parque-linear': {
            title: 'Parque Linear',
            i18n: {
                pt: {
                    title: 'Parque Linear',
                    description: 'O Parque Linear é uma obra pública com aproximadamente 64.000 m² de área, desenvolvida para proporcionar infraestrutura urbana segura, eficiente e sustentável, contribuindo para a valorização dos espaços públicos e melhoria da mobilidade da população. O projeto contemplou o desenvolvimento completo das instalações elétricas e do sistema de iluminação pública, priorizando eficiência energética e segurança.',
                    services: ['Projeto de Instalações Elétricas', 'Projeto de Iluminação Pública']
                },
                en: {
                    title: 'Linear Park',
                    description: 'A public infrastructure project with approximately 64,000 m² of area, developed to provide safe, efficient and sustainable urban infrastructure, contributing to the enhancement of public spaces and improved population mobility. The project covered electrical installations and public lighting systems.',
                    services: ['Electrical Installations Project', 'Public Lighting Project']
                },
                es: {
                    title: 'Parque Lineal',
                    description: 'Obra pública con aproximadamente 64.000 m² de área, desarrollada para proporcionar infraestructura urbana segura, eficiente y sostenible, contribuyendo a la valorización de los espacios públicos y mejora de la movilidad. El proyecto incluyó instalaciones eléctricas e iluminación pública.',
                    services: ['Instalaciones Eléctricas', 'Iluminación Pública']
                }
            },
            location: 'Brasil',
            year: '2024',
            category: 'Obra Pública',
            images: [
                'assets/images/Projetos/Parque%20Linear/Parque_01.png',
                'assets/images/Projetos/Parque%20Linear/Parque_02.png',
                'assets/images/Projetos/Parque%20Linear/Parque_03.png',
                'assets/images/Projetos/Parque%20Linear/Parque_04.png',
                'assets/images/Projetos/Parque%20Linear/Parque_05.png'
            ],
            stats: { area: '64.000 m²', duration: '18 meses', team: '15' }
        },
        'residencial-site': {
            title: 'Residencial Site',
            i18n: {
                pt: {
                    title: 'Residencial Site',
                    description: 'O Residencial Site é um empreendimento residencial com aproximadamente 1.600 m² de área construída, desenvolvido com foco na eficiência dos sistemas hidrossanitários, segurança sanitária e conformidade com as normas técnicas vigentes. O projeto contemplou o desenvolvimento completo das instalações hidrossanitárias e o processo de aprovação junto à Vigilância Sanitária.',
                    services: ['Projeto Hidrossanitário', 'Aprovação junto à Vigilância Sanitária']
                },
                en: {
                    title: 'Residencial Site',
                    description: 'A residential development with approximately 1,600 m² of built area, developed with a focus on plumbing system efficiency, sanitary safety and compliance with current technical standards. The project included complete plumbing installations and health authority approval.',
                    services: ['Plumbing Project', 'Health Authority Approval']
                },
                es: {
                    title: 'Residencial Site',
                    description: 'Desarrollo residencial con aproximadamente 1.600 m² de área construida, enfocado en la eficiencia de sistemas hidrosanitarios, seguridad sanitaria y conformidad con las normas técnicas vigentes. El proyecto incluyó instalaciones hidrosanitarias y aprobación ante la Vigilancia Sanitaria.',
                    services: ['Proyecto Hidrosanitario', 'Aprobación Sanitaria']
                }
            },
            location: 'Brasil',
            year: '2024',
            category: 'Residencial',
            images: [
                'assets/images/Projetos/Residencial%20Site/Site_01.png',
                'assets/images/Projetos/Residencial%20Site/Site_02.png',
                'assets/images/Projetos/Residencial%20Site/Site_03.png',
                'assets/images/Projetos/Residencial%20Site/Site_04.png',
                'assets/images/Projetos/Residencial%20Site/Site_05.png'
            ],
            stats: { area: '1.600 m²', duration: '4 meses', team: '4' }
        },
        'senac-pouso-alegre': {
            title: 'SENAC – Pouso Alegre',
            i18n: {
                pt: {
                    title: 'SENAC – Pouso Alegre',
                    description: 'A unidade do SENAC em Pouso Alegre é uma obra pública com aproximadamente 2.000 m² de área construída, desenvolvida para oferecer ambientes com elevado padrão de conforto térmico, qualidade do ar e eficiência energética, atendendo às necessidades de instituições de ensino. O projeto contemplou o desenvolvimento completo dos sistemas de climatização e renovação de ar, garantindo condições adequadas de conforto ambiental e controle da qualidade do ar interno.',
                    services: ['Projeto de Climatização', 'Projeto de Renovação de Ar']
                },
                en: {
                    title: 'SENAC – Pouso Alegre',
                    description: 'The SENAC unit in Pouso Alegre is a public work with approximately 2,000 m² of built area, developed to provide environments with high thermal comfort, air quality and energy efficiency standards for professional training institutions. The project included complete HVAC and air renewal systems.',
                    services: ['HVAC Project', 'Air Renewal Project']
                },
                es: {
                    title: 'SENAC – Pouso Alegre',
                    description: 'La unidad del SENAC en Pouso Alegre es una obra pública con aproximadamente 2.000 m² de área construida, desarrollada para proporcionar ambientes con alto estándar de confort térmico, calidad del aire y eficiencia energética para instituciones educativas. El proyecto incluyó sistemas completos de climatización y renovación de aire.',
                    services: ['Proyecto de Climatización', 'Proyecto de Renovación de Aire']
                }
            },
            location: 'Pouso Alegre, MG',
            year: '2024',
            category: 'Climatização',
            images: [
                'assets/images/Projetos/Senac%20Pouso%20Alegre/Senac_01.png',
                'assets/images/Projetos/Senac%20Pouso%20Alegre/Senac_02.png',
                'assets/images/Projetos/Senac%20Pouso%20Alegre/Senac_03.png',
                'assets/images/Projetos/Senac%20Pouso%20Alegre/Senac_04.png',
                'assets/images/Projetos/Senac%20Pouso%20Alegre/Senac_05.png'
            ],
            stats: { area: '2.000 m²', duration: '5 meses', team: '5' }
        },
        'ceim': {
            title: 'Edificação Escolar – Governador Celso Ramos SC',
            i18n: {
                pt: {
                    title: 'Edificação Escolar – Governador Celso Ramos SC',
                    description: 'A Edificação Escolar, localizada em Governador Celso Ramos – SC, possui aproximadamente 2.362,50 m² de área construída e foi desenvolvida para atender aos requisitos técnicos de segurança, funcionalidade, eficiência e conforto exigidos para ambientes educacionais. O projeto contemplou o desenvolvimento multidisciplinar das instalações prediais, incluindo sistemas hidrossanitários, elétricos, telecomunicações, climatização, prevenção e combate a incêndio e proteção contra descargas atmosféricas (SPDA), com modelagem e compatibilização em BIM.',
                    services: ['Projeto Hidrossanitário', 'Projeto Preventivo Contra Incêndio', 'Projeto de Instalações Elétricas', 'Projeto de Telecomunicações', 'Projeto de Climatização e Renovação de Ar', 'Projeto de SPDA', 'Modelagem e Compatibilização BIM', 'Aprovação junto aos órgãos competentes']
                },
                en: {
                    title: 'School Building – Governador Celso Ramos SC',
                    description: 'A school building located in Governador Celso Ramos – SC, with approximately 2,362.50 m² of built area, developed to meet technical requirements for safety, functionality, efficiency and comfort in educational environments. The project included multidisciplinary development of building installations, including plumbing, electrical, telecommunications, HVAC, fire prevention and lightning protection (SPDA), all modeled and coordinated in BIM.',
                    services: ['Plumbing Project', 'Fire Prevention Project', 'Electrical Installations Project', 'Telecommunications Project', 'HVAC & Air Renewal Project', 'Lightning Protection (SPDA)', 'BIM Modeling & Compatibility', 'Regulatory Approval']
                },
                es: {
                    title: 'Edificio Escolar – Governador Celso Ramos SC',
                    description: 'Edificio escolar ubicado en Governador Celso Ramos – SC, con aproximadamente 2.362,50 m² de área construida, desarrollado para cumplir con los requisitos técnicos de seguridad, funcionalidad, eficiencia y confort en ambientes educativos. El proyecto incluyó el desarrollo multidisciplinar de instalaciones prediales, con modelado y compatibilización BIM.',
                    services: ['Proyecto Hidrosanitario', 'Prevención de Incendios', 'Instalaciones Eléctricas', 'Telecomunicaciones', 'Climatización y Renovación de Aire', 'SPDA', 'Modelado BIM y Compatibilización', 'Aprobación Regulatoria']
                }
            },
            location: 'Governador Celso Ramos, SC',
            year: '2024',
            category: 'Projeto Completo',
            images: [
                'assets/images/Projetos/CEIM/CEIM1.png',
                'assets/images/Projetos/CEIM/CEIM2.png',
                'assets/images/Projetos/CEIM/CEIM3.png',
                'assets/images/Projetos/CEIM/CEIM4.png',
                'assets/images/Projetos/CEIM/CEIM5.png',
                'assets/images/Projetos/CEIM/CEIM6.png',
                'assets/images/Projetos/CEIM/CEIM7.png',
                'assets/images/Projetos/CEIM/CEIM8.png',
                'assets/images/Projetos/CEIM/CEIM9.png',
                'assets/images/Projetos/CEIM/CEIM10.png'
            ],
            stats: { area: '2.362 m²', duration: '10 meses', team: '12' }
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
            overflow-y: auto;
            overflow-x: hidden;
            z-index: 10000;
            opacity: 0;
            visibility: hidden;
            transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
            scrollbar-width: none;
            -ms-overflow-style: none;
        }
        .project-modal::-webkit-scrollbar {
            display: none;
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
            aspect-ratio: 16/10;
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

        // Get current language and translated content
        const lang = localStorage.getItem('site_lang') || 'pt';
        const projectContent = project.i18n[lang] || project.i18n.pt; // Fallback to 'pt'
        const t = (typeof translations !== 'undefined' && translations[lang]) ? translations[lang] : {};

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
            <h2 class="text-2xl md:text-3xl font-bold text-foreground mb-4">${projectContent.title || project.title}</h2>
            <p class="text-muted-foreground leading-relaxed mb-6">${projectContent.description}</p>
            
            <div class="grid grid-cols-3 gap-4 mb-6">
                <div class="stat-card">
                    <div class="text-lg font-bold text-foreground">${project.stats.area}</div>
                    <div class="text-xs text-muted-foreground">${t['modal.stat.area'] || 'Área Total'}</div>
                </div>
                <div class="stat-card">
                    <div class="text-lg font-bold text-foreground">${project.stats.duration}</div>
                    <div class="text-xs text-muted-foreground">${t['modal.stat.duration'] || 'Duração'}</div>
                </div>
                <div class="stat-card">
                    <div class="text-lg font-bold text-foreground">${project.stats.team}</div>
                    <div class="text-xs text-muted-foreground">${t['modal.stat.team'] || 'Equipe'}</div>
                </div>
            </div>

            <div>
                <h3 class="text-sm font-semibold text-foreground mb-3">${t['modal.services.title'] || 'Serviços Realizados'}</h3>
                <div class="flex flex-wrap gap-2">
                    ${projectContent.services.map(s => `<span class="service-tag">${s}</span>`).join('')}
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

    // Issue #3: Touch/swipe support for carousel
    let touchStartX = 0;
    let touchStartY = 0;
    let touchEndX = 0;
    let isSwiping = false;

    const carouselContainer = document.getElementById('carouselContainer');

    carouselContainer.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
        touchStartY = e.changedTouches[0].screenY;
        isSwiping = true;
    }, { passive: true });

    carouselContainer.addEventListener('touchmove', (e) => {
        if (!isSwiping) return;
        const diffX = Math.abs(e.changedTouches[0].screenX - touchStartX);
        const diffY = Math.abs(e.changedTouches[0].screenY - touchStartY);
        // If horizontal swipe is dominant, prevent vertical scroll
        if (diffX > diffY && diffX > 10) {
            e.preventDefault();
        }
    }, { passive: false });

    carouselContainer.addEventListener('touchend', (e) => {
        if (!isSwiping) return;
        isSwiping = false;
        touchEndX = e.changedTouches[0].screenX;
        const diff = touchStartX - touchEndX;
        // Minimum swipe distance of 50px
        if (Math.abs(diff) > 50) {
            if (diff > 0) {
                nextSlide(); // Swipe left = next
            } else {
                prevSlide(); // Swipe right = prev
            }
        }
    }, { passive: true });

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
