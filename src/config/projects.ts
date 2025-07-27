import { Project } from '../models/Project';

export const projects: Project[] = [
    {
        id: 'crypto-market',
        title: 'crypto-market',
        description: 'project that shows cryptocurrency graphs, analyzes and shows the cryptos that are growing the most',
        shortDescription: '',
        image: '/caminho/para/imagem.png',
        technologies: ['React', 'TypeScript', 'MySQL'],
        category: 'web',
        status: 'completed',
        featured: false,
        githubUrl: 'https://github.com/andre806/crypto-market',
        demoUrl: 'https://crypto-market-2tj6.vercel.app/',
        startDate: '2024-06-07',
        endDate: '2024-07-08',
        features: ['Funcionalidade 1', 'Funcionalidade 2'],
        tags: ['React', 'TypeScript', 'MySQL'],
        priority: 1,
        isPublic: true
    },
    {
        id: 'kyra-presenca-digital',
        title: 'kyra presença digital',
        description: 'empresa que cuida da digitalização de empresas fisicas fazendo web sites e aplicações',
        shortDescription: 'web site para a empresa kyra',
        image: '/projects/novoprojeto.svg',
        technologies: ['nextjs', 'MUI'],
        category: 'web',
        status: 'completed',
        featured: false,
        githubUrl: 'https://github.com/andre806/kyra',
        demoUrl: 'https://kyra-nine.vercel.app/',
        startDate: '',
        endDate: '',
        features: [],
        tags: ['nextjs', 'MUI'],
        priority: 2,
        isPublic: true
    },
    {
    id: 'open-library',
    title: 'Open-Library',
    shortDescription: 'Open Library is a modern, responsive digital library web app built with Next.js, React, TypeScript, and Material UI. Users can search, preview, and download PDF books, register/login, upload new books, and explore content by tags—all with a clean, mobile-friendly interface.',
    description: 'Open Library is a full-featured digital library platform designed for easy access to PDF books. Built with Next.js (App Router), React, TypeScript, and Material UI, it offers a visually appealing and highly responsive user experience on both desktop and mobile devices. Users can register, log in, upload new books (with direct storage integration for large files), and browse or search the collection using advanced filters and tags. The app features PDF preview (with page count), download functionality, and a feedback system. All pages are styled with a custom blue palette and modern UI patterns, including a navigation bar, hero section, statistics, and AdSense integration. The project is optimized for performance, accessibility, and scalability, making it suitable for public or private digital libraries.',
    image: '/public/open.PNG',
    technologies: ['React', 'Node.js', 'MongoDB', 'Nextjs', 'typescript'],
    category: 'web',
    status: 'completed',
    featured: false,
    githubUrl: 'https://github.com/andre806/Open-Library',
    demoUrl: 'https://open-library-olive.vercel.app/',
    startDate: '',
    endDate: '',
    features: [],
    tags: ['React', 'Node.js', 'MongoDB', 'Nextjs', 'typescript'],
    priority: 3,
    isPublic: true
},
];

// Função para filtrar projetos
export const filterProjects = (
    projects: Project[],
    filter: {
        category?: string;
        technology?: string;
        status?: string;
        featured?: boolean;
        search?: string;
    }
): Project[] => {
    return projects.filter(project => {
        if (filter.category && filter.category !== 'all' && project.category !== filter.category) {
            return false;
        }

        if (filter.technology && !project.technologies.includes(filter.technology)) {
            return false;
        }

        if (filter.status && project.status !== filter.status) {
            return false;
        }

        if (filter.featured !== undefined && project.featured !== filter.featured) {
            return false;
        }

        if (filter.search) {
            const searchLower = filter.search.toLowerCase();
            return (
                project.title.toLowerCase().includes(searchLower) ||
                project.description.toLowerCase().includes(searchLower) ||
                project.technologies.some(tech => tech.toLowerCase().includes(searchLower)) ||
                project.tags.some(tag => tag.toLowerCase().includes(searchLower))
            );
        }

        return true;
    });
};

// Função para ordenar projetos
export const sortProjects = (
    projects: Project[],
    sort: { field: string; direction: 'asc' | 'desc' }
): Project[] => {
    return [...projects].sort((a, b) => {
        let comparison = 0;

        switch (sort.field) {
            case 'title':
                comparison = a.title.localeCompare(b.title);
                break;
            case 'startDate':
                comparison = new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
                break;
            case 'priority':
                comparison = a.priority - b.priority;
                break;
            case 'status':
                comparison = a.status.localeCompare(b.status);
                break;
            default:
                comparison = 0;
        }

        return sort.direction === 'desc' ? -comparison : comparison;
    });
};
