import { Job, JobStats } from '../models/Job';

// Dados simulados de vagas de emprego
export const jobsData: Job[] = [
    {
        id: '1',
        title: 'Senior Frontend Developer',
        company: 'TechCorp Inc.',
        companyLogo: '/companies/techcorp.svg',
        location: 'São Paulo, SP',
        type: 'full-time',
        level: 'senior',
        salary: {
            min: 8000,
            max: 12000,
            currency: 'BRL',
            period: 'month'
        },
        description: 'Estamos procurando um desenvolvedor frontend sênior para liderar projetos de alto impacto usando React, TypeScript e Next.js.',
        requirements: [
            '5+ anos de experiência com React',
            'Conhecimento avançado em TypeScript',
            'Experiência com Next.js e SSR',
            'Conhecimento em testes (Jest, Testing Library)',
            'Experiência com Git e metodologias ágeis'
        ],
        responsibilities: [
            'Desenvolver interfaces de usuário responsivas',
            'Liderar code reviews e mentoring',
            'Otimizar performance de aplicações',
            'Colaborar com designers e backend',
            'Implementar melhores práticas de desenvolvimento'
        ],
        benefits: [
            'Plano de saúde e odontológico',
            'Vale refeição e alimentação',
            'Home office flexível',
            'Auxílio educação',
            'Stock options'
        ],
        technologies: ['React', 'TypeScript', 'Next.js', 'TailwindCSS', 'Jest'],
        remote: true,
        featured: true,
        urgent: false,
        posted: new Date('2024-01-15'),
        deadline: new Date('2024-02-15'),
        applicationUrl: 'https://techcorp.com/careers/senior-frontend',
        source: 'linkedin',
        category: 'frontend'
    },
    {
        id: '2',
        title: 'Full Stack Developer',
        company: 'StartupXYZ',
        companyLogo: '/companies/startupxyz.svg',
        location: 'Remote',
        type: 'full-time',
        level: 'mid',
        salary: {
            min: 6000,
            max: 9000,
            currency: 'BRL',
            period: 'month'
        },
        description: 'Junte-se à nossa startup inovadora como desenvolvedor full stack. Trabalhe com tecnologias modernas em um ambiente dinâmico.',
        requirements: [
            '5+ anos de experiência em desenvolvimento web',
            'Conhecimento em Node.js e Express',
            'Experiência com React ou Vue.js',
            'Conhecimento em bancos de dados (PostgreSQL, MongoDB)',
            'Familiaridade com Docker e AWS'
        ],
        responsibilities: [
            'Desenvolver APIs RESTful robustas',
            'Criar interfaces de usuário intuitivas',
            'Implementar testes automatizados',
            'Participar do design de arquitetura',
            'Colaborar em equipe multidisciplinar'
        ],
        benefits: [
            'Equity na empresa',
            'Horário flexível',
            '100% remoto',
            'Equipamento fornecido',
            'Ambiente inovador'
        ],
        technologies: ['Node.js', 'React', 'PostgreSQL', 'Docker', 'AWS'],
        remote: true,
        featured: false,
        urgent: true,
        posted: new Date('2024-01-18'),
        deadline: new Date('2024-02-10'),
        applicationUrl: 'https://startupxyz.com/jobs/fullstack',
        source: 'github',
        category: 'fullstack'
    },
    {
        id: '3',
        title: 'React Native Developer',
        company: 'MobileFirst',
        companyLogo: '/companies/mobilefirst.svg',
        location: 'Rio de Janeiro, RJ',
        type: 'contract',
        level: 'mid',
        salary: {
            min: 80,
            max: 120,
            currency: 'BRL',
            period: 'hour'
        },
        description: 'Desenvolva aplicativos móveis inovadores usando React Native para iOS e Android.',
        requirements: [
            '2+ anos com React Native',
            'Conhecimento em JavaScript/TypeScript',
            'Experiência com Redux ou Context API',
            'Familiaridade com native modules',
            'Experiência com App Store e Play Store'
        ],
        responsibilities: [
            'Desenvolver apps React Native',
            'Integrar com APIs REST',
            'Otimizar performance mobile',
            'Implementar push notifications',
            'Manter código limpo e documentado'
        ],
        technologies: ['React Native', 'TypeScript', 'Redux', 'Firebase'],
        remote: false,
        featured: true,
        urgent: false,
        posted: new Date('2024-01-12'),
        deadline: new Date('2024-02-20'),
        applicationUrl: 'https://mobilefirst.com/careers/react-native',
        source: 'stackoverflow',
        category: 'mobile'
    },
    {
        id: '4',
        title: 'DevOps Engineer',
        company: 'CloudTech Solutions',
        companyLogo: '/companies/cloudtech.svg',
        location: 'Belo Horizonte, MG',
        type: 'full-time',
        level: 'senior',
        salary: {
            min: 10000,
            max: 15000,
            currency: 'BRL',
            period: 'month'
        },
        description: 'Procuramos um engenheiro DevOps experiente para automatizar e otimizar nossa infraestrutura na nuvem.',
        requirements: [
            '4+ anos em DevOps/SRE',
            'Experiência com AWS/Azure/GCP',
            'Conhecimento em Kubernetes e Docker',
            'Experiência com CI/CD (Jenkins, GitLab)',
            'Conhecimento em Terraform/Ansible'
        ],
        responsibilities: [
            'Gerenciar infraestrutura na nuvem',
            'Implementar pipelines CI/CD',
            'Monitorar sistemas e aplicações',
            'Automatizar processos de deploy',
            'Garantir segurança e compliance'
        ],
        benefits: [
            'Salário competitivo',
            'Certificações AWS/Azure pagas',
            'Horário flexível',
            'Equipamentos top de linha',
            'Plano de carreira'
        ],
        technologies: ['AWS', 'Kubernetes', 'Docker', 'Terraform', 'Jenkins'],
        remote: true,
        featured: true,
        urgent: false,
        posted: new Date('2024-01-10'),
        applicationUrl: 'https://cloudtech.com/jobs/devops-engineer',
        source: 'internal',
        category: 'devops'
    },
    {
        id: '5',
        title: 'Junior Frontend Developer',
        company: 'WebStudio',
        companyLogo: '/companies/webstudio.svg',
        location: 'Florianópolis, SC',
        type: 'full-time',
        level: 'junior',
        salary: {
            min: 3500,
            max: 5000,
            currency: 'BRL',
            period: 'month'
        },
        description: 'Oportunidade para desenvolvedor frontend júnior crescer em uma agência digital criativa.',
        requirements: [
            '1+ ano de experiência com HTML, CSS, JS',
            'Conhecimento básico em React',
            'Familiaridade com Git',
            'Conhecimento em design responsivo',
            'Vontade de aprender e crescer'
        ],
        responsibilities: [
            'Desenvolver páginas web responsivas',
            'Implementar designs do Figma',
            'Manter sites existentes',
            'Participar de reuniões de planejamento',
            'Aprender novas tecnologias'
        ],
        benefits: [
            'Mentorship com seniores',
            'Cursos e treinamentos',
            'Ambiente criativo',
            'Projetos variados',
            'Crescimento rápido'
        ],
        technologies: ['HTML', 'CSS', 'JavaScript', 'React', 'Figma'],
        remote: false,
        featured: false,
        urgent: false,
        posted: new Date('2024-01-20'),
        deadline: new Date('2024-02-25'),
        applicationUrl: 'https://webstudio.com/careers/junior-frontend',
        source: 'other',
        category: 'frontend'
    },
    {
        id: '6',
        title: 'Data Scientist',
        company: 'DataLab',
        companyLogo: '/companies/datalab.svg',
        location: 'São Paulo, SP',
        type: 'full-time',
        level: 'mid',
        salary: {
            min: 9000,
            max: 13000,
            currency: 'BRL',
            period: 'month'
        },
        description: 'Trabalhe com big data e machine learning para extrair insights valiosos dos dados.',
        requirements: [
            '5+ anos em Data Science',
            'Experiência com Python e R',
            'Conhecimento em ML/AI',
            'Experiência com SQL e NoSQL',
            'Conhecimento em estatística'
        ],
        responsibilities: [
            'Analisar grandes volumes de dados',
            'Desenvolver modelos de ML',
            'Criar dashboards e relatórios',
            'Apresentar insights para stakeholders',
            'Otimizar algoritmos existentes'
        ],
        technologies: ['Python', 'R', 'TensorFlow', 'Pandas', 'SQL'],
        remote: true,
        featured: false,
        urgent: true,
        posted: new Date('2024-01-16'),
        deadline: new Date('2024-02-05'),
        applicationUrl: 'https://datalab.com/careers/data-scientist',
        source: 'linkedin',
        category: 'data'
    },
    {
        id: '7',
        title: 'UI/UX Designer',
        company: 'DesignHub',
        companyLogo: '/companies/designhub.svg',
        location: 'Remote',
        type: 'freelance',
        level: 'mid',
        salary: {
            min: 60,
            max: 100,
            currency: 'BRL',
            period: 'hour'
        },
        description: 'Crie experiências digitais incríveis como designer UI/UX freelancer.',
        requirements: [
            '2+ anos em UI/UX Design',
            'Proficiência em Figma/Sketch',
            'Portfolio sólido',
            'Conhecimento em design systems',
            'Experiência com user research'
        ],
        responsibilities: [
            'Criar wireframes e protótipos',
            'Desenvolver design systems',
            'Conduzir pesquisas com usuários',
            'Colaborar com desenvolvedores',
            'Iterar baseado em feedback'
        ],
        technologies: ['Figma', 'Sketch', 'Adobe XD', 'Principle', 'InVision'],
        remote: true,
        featured: false,
        urgent: false,
        posted: new Date('2024-01-14'),
        applicationUrl: 'https://designhub.com/freelance/ui-ux',
        source: 'other',
        category: 'design'
    },
    {
        id: '8',
        title: 'Backend Developer - Node.js',
        company: 'ServerSide Co.',
        companyLogo: '/companies/serverside.svg',
        location: 'Curitiba, PR',
        type: 'full-time',
        level: 'senior',
        salary: {
            min: 8500,
            max: 12000,
            currency: 'BRL',
            period: 'month'
        },
        description: 'Desenvolva APIs robustas e escaláveis usando Node.js e tecnologias modernas.',
        requirements: [
            '4+ anos com Node.js',
            'Experiência com Express/Fastify',
            'Conhecimento em bancos de dados',
            'Experiência com microservices',
            'Conhecimento em testes unitários'
        ],
        responsibilities: [
            'Desenvolver APIs RESTful e GraphQL',
            'Otimizar performance de aplicações',
            'Implementar segurança e autenticação',
            'Trabalhar com arquitetura de microservices',
            'Mentoring de desenvolvedores junior'
        ],
        benefits: [
            'Plano de saúde premium',
            'Auxílio home office',
            'Horário flexível',
            'Treinamentos técnicos',
            'Bônus por performance'
        ],
        technologies: ['Node.js', 'Express', 'PostgreSQL', 'Redis', 'Docker'],
        remote: true,
        featured: true,
        urgent: false,
        posted: new Date('2024-01-11'),
        deadline: new Date('2024-02-18'),
        applicationUrl: 'https://serverside.com/jobs/nodejs-backend',
        source: 'github',
        category: 'backend'
    }
];

// Estatísticas das vagas
export const jobStats: JobStats = {
    total: jobsData.length,
    featured: jobsData.filter(job => job.featured).length,
    remote: jobsData.filter(job => job.remote).length,
    byCategory: {
        frontend: jobsData.filter(job => job.category === 'frontend').length,
        backend: jobsData.filter(job => job.category === 'backend').length,
        fullstack: jobsData.filter(job => job.category === 'fullstack').length,
        mobile: jobsData.filter(job => job.category === 'mobile').length,
        devops: jobsData.filter(job => job.category === 'devops').length,
        data: jobsData.filter(job => job.category === 'data').length,
        design: jobsData.filter(job => job.category === 'design').length,
        product: jobsData.filter(job => job.category === 'product').length,
        other: jobsData.filter(job => job.category === 'other').length
    },
    byLevel: {
        junior: jobsData.filter(job => job.level === 'junior').length,
        mid: jobsData.filter(job => job.level === 'mid').length,
        senior: jobsData.filter(job => job.level === 'senior').length,
        lead: jobsData.filter(job => job.level === 'lead').length,
        principal: jobsData.filter(job => job.level === 'principal').length
    },
    byType: {
        'full-time': jobsData.filter(job => job.type === 'full-time').length,
        'part-time': jobsData.filter(job => job.type === 'part-time').length,
        contract: jobsData.filter(job => job.type === 'contract').length,
        freelance: jobsData.filter(job => job.type === 'freelance').length,
        internship: jobsData.filter(job => job.type === 'internship').length
    },
    avgSalary: {
        junior: 4250,
        mid: 7500,
        senior: 10250
    },
    topTechnologies: [
        { name: 'React', count: 4 },
        { name: 'TypeScript', count: 4 },
        { name: 'Node.js', count: 3 },
        { name: 'JavaScript', count: 3 },
        { name: 'Docker', count: 3 },
        { name: 'AWS', count: 2 },
        { name: 'PostgreSQL', count: 2 },
        { name: 'Python', count: 2 }
    ],
    topCompanies: [
        { name: 'TechCorp Inc.', count: 1 },
        { name: 'StartupXYZ', count: 1 },
        { name: 'MobileFirst', count: 1 },
        { name: 'CloudTech Solutions', count: 1 }
    ]
};

// Tecnologias disponíveis para filtro
export const availableTechnologies = [
    'React', 'TypeScript', 'JavaScript', 'Node.js', 'Python', 'Java',
    'Docker', 'AWS', 'PostgreSQL', 'MongoDB', 'Redis', 'Kubernetes',
    'Next.js', 'Vue.js', 'Angular', 'Express', 'Fastify', 'GraphQL',
    'TailwindCSS', 'Sass', 'Jest', 'Cypress', 'Figma', 'Adobe XD'
];

// Localizações disponíveis
export const availableLocations = [
    'São Paulo, SP',
    'Rio de Janeiro, RJ',
    'Belo Horizonte, MG',
    'Curitiba, PR',
    'Florianópolis, SC',
    'Brasília, DF',
    'Salvador, BA',
    'Recife, PE',
    'Remote',
    'Híbrido'
];
