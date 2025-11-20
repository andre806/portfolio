export interface Project {
    id: string;
    title: string;
    description: string;
    shortDescription: string;
    image: string;
    mediaType?: 'image' | 'video'; // Tipo de mídia (detectado automaticamente se não especificado)
    technologies: string[];
    category: 'web' | 'mobile' | 'desktop' | 'api' | 'ai' | 'other';
    status: 'completed' | 'in-progress' | 'planned';
    featured: boolean;
    githubUrl?: string;
    liveUrl?: string;
    demoUrl?: string;
    documentation?: string;
    startDate: string;
    endDate?: string;
    team?: {
        name: string;
        role: string;
        linkedin?: string;
    }[];
    features: string[];
    challenges?: string[];
    achievements?: string[];
    metrics?: {
        label: string;
        value: string;
    }[];
    gallery?: string[];
    tags: string[];
    priority: number;
    isPublic: boolean;
    client?: string;
    budget?: string;
}

export interface ProjectFilter {
    category?: string;
    technology?: string;
    status?: string;
    featured?: boolean;
    search?: string;
}

export interface ProjectSort {
    field: 'title' | 'startDate' | 'priority' | 'status';
    direction: 'asc' | 'desc';
}

export const PROJECT_CATEGORIES = [
    { id: 'all', label: 'all', icon: '🎯' },
    { id: 'web', label: 'Web', icon: '🌐' },
    { id: 'mobile', label: 'Mobile', icon: '📱' },
    { id: 'desktop', label: 'Desktop', icon: '💻' },
    { id: 'api', label: 'APIs', icon: '🔗' },
    { id: 'ai', label: 'IA/ML', icon: '🤖' },
    { id: 'other', label: 'others', icon: '⚡' }
] as const;

export const PROJECT_TECHNOLOGIES = [
    'React', 'Next.js', 'TypeScript', 'JavaScript', 'Node.js', 'Python',
    'Java', 'Vue.js', 'Angular', 'Svelte', 'Flutter',
    'React Native', 'Swift', 'Kotlin', 'MongoDB', 'PostgreSQL', 'MySQL',
    'Firebase', 'AWS', 'Docker', 'Kubernetes', 'GraphQL', 'REST API',
    'TailwindCSS', 'SASS', 'CSS3', 'HTML5', 'Figma',  
] as const;
