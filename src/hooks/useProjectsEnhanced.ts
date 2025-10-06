import { useState, useMemo, useCallback, useEffect } from 'react';
import { Project, ProjectFilter, ProjectSort } from '../models/Project';
import { projects as staticProjects, filterProjects, sortProjects } from '../config/projects';
import { ProjectsService, getOrganizedDatabaseProjects, transformDatabaseProject } from '../services/projectsService';

export type ProjectSource = 'static' | 'database' | 'both';

export interface UseProjectsOptions {
    source?: ProjectSource;
    enableCaching?: boolean;
    refreshInterval?: number; // in milliseconds
}

export const useProjectsEnhanced = (options: UseProjectsOptions = {}) => {
    const { 
        source = 'static', // Default to static for backward compatibility
        enableCaching = true,
        refreshInterval = 5 * 60 * 1000 // 5 minutes default
    } = options;

    const [filter, setFilter] = useState<ProjectFilter>({
        category: 'all'
    });

    const [sort, setSort] = useState<ProjectSort>({
        field: 'priority',
        direction: 'asc'
    });

    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [databaseProjects, setDatabaseProjects] = useState<Project[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [lastFetch, setLastFetch] = useState<number>(0);

    // Fetch database projects
    const fetchDatabaseProjects = useCallback(async () => {
        // Skip if using static only or if cached data is still fresh
        if (source === 'static') return;
        
        if (enableCaching && Date.now() - lastFetch < refreshInterval) {
            return; // Use cached data
        }

        setIsLoading(true);
        setError(null);

        try {
            const dbProjects = await getOrganizedDatabaseProjects();
            setDatabaseProjects(dbProjects);
            setLastFetch(Date.now());
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to fetch database projects');
            console.error('Error fetching database projects:', err);
        } finally {
            setIsLoading(false);
        }
    }, [source, enableCaching, refreshInterval, lastFetch]);

    // Effect to fetch database projects on mount and refresh
    useEffect(() => {
        if (source === 'database' || source === 'both') {
            fetchDatabaseProjects();
        }
    }, [fetchDatabaseProjects, source]);

    // Auto-refresh effect
    useEffect(() => {
        if ((source === 'database' || source === 'both') && refreshInterval > 0) {
            const interval = setInterval(() => {
                fetchDatabaseProjects();
            }, refreshInterval);

            return () => clearInterval(interval);
        }
    }, [fetchDatabaseProjects, refreshInterval, source]);

    // Combine projects based on source
    const allProjects = useMemo(() => {
        switch (source) {
            case 'static':
                return staticProjects;
            case 'database':
                return databaseProjects;
            case 'both':
                // Combine and deduplicate by ID
                const combined = [...staticProjects, ...databaseProjects];
                const uniqueProjects = combined.filter((project, index, self) => 
                    index === self.findIndex(p => p.id === project.id)
                );
                return uniqueProjects;
            default:
                return staticProjects;
        }
    }, [source, databaseProjects]);

    // Apply filtering and sorting (same logic as original)
    const filteredProjects = useMemo(() => {
        const filtered = filterProjects(allProjects, filter);
        return sortProjects(filtered, sort);
    }, [allProjects, filter, sort]);

    // Featured projects
    const featuredProjects = useMemo(() => {
        return allProjects
            .filter(project => project.featured)
            .sort((a, b) => a.priority - b.priority)
            .slice(0, 3);
    }, [allProjects]);

    // Recent projects
    const recentProjects = useMemo(() => {
        return [...allProjects]
            .filter(project => project.startDate) // Only projects with start date
            .sort((a, b) => new Date(b.startDate).getTime() - new Date(a.startDate).getTime())
            .slice(0, 4);
    }, [allProjects]);

    // Project statistics
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
            completionRate: total > 0 ? Math.round((completed / total) * 100) : 0
        };
    }, [allProjects]);

    // Top technologies
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
    }, [allProjects]);

    // Filter and sort functions
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

    // Project lookup functions
    const getProjectById = useCallback((id: string): Project | undefined => {
        return allProjects.find(project => project.id === id);
    }, [allProjects]);

    const getRelatedProjects = useCallback((currentProject: Project, limit = 3): Project[] => {
        return allProjects
            .filter(project =>
                project.id !== currentProject.id &&
                (project.category === currentProject.category ||
                    project.technologies.some(tech => currentProject.technologies.includes(tech)))
            )
            .sort(() => Math.random() - 0.5) // Randomize
            .slice(0, limit);
    }, [allProjects]);

    // Database-specific functions
    const refreshDatabaseProjects = useCallback(async () => {
        if (source !== 'static') {
            await fetchDatabaseProjects();
        }
    }, [fetchDatabaseProjects, source]);

    const addDatabaseProject = useCallback(async (projectData: any) => {
        if (source === 'static') {
            throw new Error('Cannot add projects when using static source');
        }

        try {
            setIsLoading(true);
            const service = ProjectsService.getInstance();
            const newProject = await service.addProject(projectData);
            
            // Refresh the project list
            await fetchDatabaseProjects();
            
            return transformDatabaseProject(newProject);
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to add project';
            setError(errorMessage);
            throw new Error(errorMessage);
        } finally {
            setIsLoading(false);
        }
    }, [source, fetchDatabaseProjects]);

    const updateDatabaseProject = useCallback(async (id: string, updates: any) => {
        if (source === 'static') {
            throw new Error('Cannot update projects when using static source');
        }

        try {
            setIsLoading(true);
            const service = ProjectsService.getInstance();
            const updatedProject = await service.updateProject(id, updates);
            
            if (updatedProject) {
                // Refresh the project list
                await fetchDatabaseProjects();
                return transformDatabaseProject(updatedProject);
            }
            
            throw new Error('Project not found');
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to update project';
            setError(errorMessage);
            throw new Error(errorMessage);
        } finally {
            setIsLoading(false);
        }
    }, [source, fetchDatabaseProjects]);

    const deleteDatabaseProject = useCallback(async (id: string) => {
        if (source === 'static') {
            throw new Error('Cannot delete projects when using static source');
        }

        try {
            setIsLoading(true);
            const service = ProjectsService.getInstance();
            const success = await service.deleteProject(id);
            
            if (success) {
                // Refresh the project list
                await fetchDatabaseProjects();
                return true;
            }
            
            throw new Error('Project not found');
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to delete project';
            setError(errorMessage);
            throw new Error(errorMessage);
        } finally {
            setIsLoading(false);
        }
    }, [source, fetchDatabaseProjects]);

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
        isLoading,
        error,
        source,

        // Actions
        updateFilter,
        updateSort,
        clearFilters,
        setViewMode,
        setSelectedProject,
        getProjectById,
        getRelatedProjects,

        // Database-specific actions
        refreshDatabaseProjects,
        addDatabaseProject,
        updateDatabaseProject,
        deleteDatabaseProject,

        // Computed
        hasActiveFilters: Object.keys(filter).some(key =>
            key !== 'category' || filter.category !== 'all'
        ),
        totalProjects: allProjects.length,
        filteredCount: filteredProjects.length,
        isUsingDatabase: source !== 'static',
        lastFetchTime: lastFetch
    };
};

// Backward compatibility: export the original hook that uses static projects only
export const useProjects = () => {
    return useProjectsEnhanced({ source: 'static' });
};

// Export hook for database projects only
export const useDatabaseProjects = () => {
    return useProjectsEnhanced({ source: 'database' });
};

// Export hook for combined projects (static + database)
export const useAllProjects = () => {
    return useProjectsEnhanced({ source: 'both' });
};