import { useState, useMemo, useCallback } from 'react';
import { Project, ProjectFilter, ProjectSort } from '../models/Project';
import { projects as allProjects, filterProjects, sortProjects } from '../config/projects';

export const useProjects = () => {
    const [filter, setFilter] = useState<ProjectFilter>({
        category: 'all'
    });

    const [sort, setSort] = useState<ProjectSort>({
        field: 'priority',
        direction: 'asc'
    });

    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    // Filtrar e ordenar projetos
    const filteredProjects = useMemo(() => {
        const filtered = filterProjects(allProjects, filter);
        return sortProjects(filtered, sort);
    }, [filter, sort]);

    // Projetos em destaque
    const featuredProjects = useMemo(() => {
        return allProjects
            .filter(project => project.featured)
            .sort((a, b) => a.priority - b.priority)
            .slice(0, 3);
    }, []);

    // Projetos recentes
    const recentProjects = useMemo(() => {
        return [...allProjects]
            .sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime())
            .slice(0, 4);
    }, []);

    // Estatísticas dos projetos
    const stats = useMemo(() => {
        const total = allProjects.length;
        const completed = allProjects.filter(p => p.status === 'completed').length;
        const inProgress = allProjects.filter(p => p.status === 'in-progress').length;
        const technologies = new Set(allProjects.flatMap(p => p.technologies)).size;

        return {
            total,
            completed,
            inProgress,
            technologies,
            completionRate: Math.round((completed / total) * 100)
        };
    }, []);

    // Tecnologias mais usadas
    const topTechnologies = useMemo(() => {
        const techCount = allProjects.reduce((acc, project) => {
            project.technologies.forEach(tech => {
                acc[tech] = (acc[tech] || 0) + 1;
            });
            return acc;
        }, {} as Record<string, number>);

        return Object.entries(techCount)
            .sort(([, a], [, b]) => b - a)
            .slice(0, 10)
            .map(([tech, count]) => ({ name: tech, count }));
    }, []);

    // Funções para atualizar filtros
    const updateFilter = useCallback((newFilter: Partial<ProjectFilter>) => {
        setFilter(prev => ({ ...prev, ...newFilter }));
    }, []);

    const updateSort = useCallback((field: string) => {
        setSort(prev => ({
            field: field as ProjectSort['field'],
            direction: prev.field === field && prev.direction === 'asc' ? 'desc' : 'asc'
        }));
    }, []);

    const clearFilters = useCallback(() => {
        setFilter({ category: 'all' });
        setSort({ field: 'priority', direction: 'asc' });
    }, []);

    // Buscar projeto por ID
    const getProjectById = useCallback((id: string): Project | undefined => {
        return allProjects.find(project => project.id === id);
    }, []);

    // Projetos relacionados
    const getRelatedProjects = useCallback((currentProject: Project, limit = 3): Project[] => {
        return allProjects
            .filter(project =>
                project.id !== currentProject.id &&
                (project.category === currentProject.category ||
                    project.technologies.some(tech => currentProject.technologies.includes(tech)))
            )
            .sort(() => Math.random() - 0.5) // Randomizar
            .slice(0, limit);
    }, []);

    return {
        // Data
        projects: filteredProjects,
        allProjects,
        featuredProjects,
        recentProjects,
        stats,
        topTechnologies,

        // State
        filter,
        sort,
        viewMode,
        selectedProject,

        // Actions
        updateFilter,
        updateSort,
        clearFilters,
        setViewMode,
        setSelectedProject,
        getProjectById,
        getRelatedProjects,

        // Computed
        hasActiveFilters: Object.keys(filter).some(key =>
            key !== 'category' || filter.category !== 'all'
        ),
        totalProjects: allProjects.length,
        filteredCount: filteredProjects.length
    };
};
