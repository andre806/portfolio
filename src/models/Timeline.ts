export interface TimelineEvent {
    id: string;
    title: string;
    subtitle: string;
    description: string;
    date: string;
    endDate?: string;
    type: 'education' | 'work' | 'project' | 'achievement' | 'certification' | 'other';
    location?: string;
    company?: string;
    technologies?: string[];
    achievements?: string[];
    skills?: string[];
    icon: string;
    color: string;
    bgColor: string;
    link?: string;
    image?: string;
    featured?: boolean;
    ongoing?: boolean;
    hidden?: boolean;
}

export interface PersonalInfo {
    name: string;
    title: string;
    bio: string;
    location: string;
    phone?: string;
    website?: string;
    avatar: string;
    coverImage?: string;
    yearsOfExperience: number;
    projectsCompleted: number;
    technologiesLearned: number;
    certifications: number;
}

export interface Skill {
    id: string;
    name: string;
    category: 'frontend' | 'backend' | 'mobile' | 'database' | 'devops' | 'design' | 'soft';
    level: number; // 1-5
    yearsOfExperience: number;
    icon: string;
    color: string;
    description?: string;
}

export interface Achievement {
    id: string;
    title: string;
    description: string;
    date: string;
    type: 'award' | 'certification' | 'milestone' | 'recognition';
    icon: string;
    color: string;
    link?: string;
    image?: string;
}

export interface Education {
    id: string;
    institution: string;
    degree: string;
    field: string;
    startDate: string;
    endDate?: string;
    ongoing?: boolean;
    gpa?: string;
    location: string;
    description?: string;
    achievements?: string[];
    coursework?: string[];
    logo?: string;
}

export interface WorkExperience {
    id: string;
    company: string;
    position: string;
    startDate: string;
    endDate?: string;
    ongoing?: boolean;
    location: string;
    description: string;
    responsibilities: string[];
    achievements: string[];
    technologies: string[];
    logo?: string;
    companyWebsite?: string;
}

export const TIMELINE_TYPES = [
    { id: 'all', label: 'Todos', icon: '📅', color: 'text-gray-600' },
    { id: 'education', label: 'Educação', icon: '🎓', color: 'text-blue-600' },
    { id: 'work', label: 'Trabalho', icon: '💼', color: 'text-green-600' },
    { id: 'project', label: 'Projetos', icon: '🚀', color: 'text-purple-600' },
    { id: 'achievement', label: 'Conquistas', icon: '🏆', color: 'text-yellow-600' },
    { id: 'certification', label: 'Certificações', icon: '📜', color: 'text-indigo-600' },
    { id: 'other', label: 'Outros', icon: '⭐', color: 'text-pink-600' }
] as const;
