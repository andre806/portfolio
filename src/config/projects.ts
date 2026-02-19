import { Project } from '../models/Project';

export const projects: Project[] = [];

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
