import { Project, ProjectFilter, ProjectSort } from '../models/Project';
import { filterProjects, sortProjects } from '../config/projects';
import { ProjectsService, transformDatabaseProject, createProjectOrganizationPrompt } from '../services/projectsService';
import { PROJECT_CONFIG } from '../config/projectsConfig';

/**
 * Main utility function to organize database projects using the same logic as static projects
 * This is the core function that maintains consistency between static and database project organization
 */
export const organizeProjectsFromDatabase = async (
    filter?: ProjectFilter,
    sort?: ProjectSort,
    options?: {
        limit?: number;
        offset?: number;
        includePrivate?: boolean;
        useCache?: boolean;
    }
) => {
    const {
        limit,
        offset = 0,
        includePrivate = false,
        useCache = PROJECT_CONFIG.database.caching
    } = options || {};

    try {
        // Get the projects service instance
        const projectsService = ProjectsService.getInstance();

        // Fetch database projects with filtering applied at the database level for efficiency
        const dbProjects = await projectsService.getFilteredProjects(filter);

        // Transform database projects to match the Project interface
        const transformedProjects = dbProjects.map(transformDatabaseProject);

        // Apply privacy filter
        let filteredProjects = includePrivate 
            ? transformedProjects 
            : transformedProjects.filter(project => project.isPublic);

        // Apply additional client-side filtering (for any filters not handled at DB level)
        if (filter) {
            filteredProjects = filterProjects(filteredProjects, filter);
        }

        // Apply sorting using the same logic as static projects
        const defaultSort: ProjectSort = {
            field: PROJECT_CONFIG.display.defaultSort.field,
            direction: PROJECT_CONFIG.display.defaultSort.direction
        };

        const appliedSort = sort || defaultSort;
        const sortedProjects = sortProjects(filteredProjects, appliedSort);

        // Apply pagination
        const paginatedProjects = limit 
            ? sortedProjects.slice(offset, offset + limit)
            : sortedProjects.slice(offset);

        return {
            projects: paginatedProjects,
            total: filteredProjects.length,
            offset,
            limit,
            hasMore: limit ? (offset + limit) < filteredProjects.length : false,
            filter: filter || {},
            sort: appliedSort,
            metadata: {
                fetchTime: new Date().toISOString(),
                source: 'database',
                useCache,
                includePrivate
            }
        };

    } catch (error) {
        console.error('Error organizing projects from database:', error);
        
        // Fallback behavior based on configuration
        if (PROJECT_CONFIG.errors.fallbackToStatic) {
            console.warn('Falling back to static projects due to database error');
            
            // Import static projects as fallback
            const { projects: staticProjects } = await import('../config/projects');
            
            let fallbackProjects = includePrivate 
                ? staticProjects 
                : staticProjects.filter(project => project.isPublic);

            if (filter) {
                fallbackProjects = filterProjects(fallbackProjects, filter);
            }

            const defaultSort: ProjectSort = {
                field: PROJECT_CONFIG.display.defaultSort.field,
                direction: PROJECT_CONFIG.display.defaultSort.direction
            };

            const appliedSort = sort || defaultSort;
            const sortedProjects = sortProjects(fallbackProjects, appliedSort);

            const paginatedProjects = limit 
                ? sortedProjects.slice(offset, offset + limit)
                : sortedProjects.slice(offset);

            return {
                projects: paginatedProjects,
                total: fallbackProjects.length,
                offset,
                limit,
                hasMore: limit ? (offset + limit) < fallbackProjects.length : false,
                filter: filter || {},
                sort: appliedSort,
                metadata: {
                    fetchTime: new Date().toISOString(),
                    source: 'static_fallback',
                    useCache,
                    includePrivate,
                    error: PROJECT_CONFIG.errors.showErrorDetails ? error : 'Database unavailable'
                }
            };
        }

        throw error;
    }
};

/**
 * Get featured projects from database using the same logic as static projects
 */
export const getFeaturedProjectsFromDatabase = async (limit: number = 3) => {
    try {
        const result = await organizeProjectsFromDatabase(
            { featured: true },
            { field: 'priority', direction: 'asc' },
            { limit }
        );

        return result.projects;
    } catch (error) {
        console.error('Error fetching featured projects from database:', error);
        return [];
    }
};

/**
 * Get recent projects from database using the same logic as static projects
 */
export const getRecentProjectsFromDatabase = async (limit: number = 4) => {
    try {
        const result = await organizeProjectsFromDatabase(
            undefined,
            { field: 'startDate', direction: 'desc' },
            { limit }
        );

        return result.projects.filter(project => project.startDate);
    } catch (error) {
        console.error('Error fetching recent projects from database:', error);
        return [];
    }
};

/**
 * Get project statistics from database using the same logic as static projects
 */
export const getProjectStatsFromDatabase = async () => {
    try {
        const result = await organizeProjectsFromDatabase();
        const projects = result.projects;

        const total = projects.length;
        const completed = projects.filter(p => p.status === 'completed').length;
        const inProgress = projects.filter(p => p.status === 'in-progress').length;
        const technologies = new Set(projects.flatMap(p => p.technologies)).size;

        return {
            total,
            completed,
            inProgress,
            technologies,
            completionRate: total > 0 ? Math.round((completed / total) * 100) : 0,
            featured: projects.filter(p => p.featured).length
        };
    } catch (error) {
        console.error('Error fetching project stats from database:', error);
        return {
            total: 0,
            completed: 0,
            inProgress: 0,
            technologies: 0,
            completionRate: 0,
            featured: 0
        };
    }
};

/**
 * Get top technologies from database using the same logic as static projects
 */
export const getTopTechnologiesFromDatabase = async (limit: number = 10) => {
    try {
        const result = await organizeProjectsFromDatabase();
        const projects = result.projects;

        const techCount = projects.reduce((acc, project) => {
            project.technologies.forEach(tech => {
                acc[tech] = (acc[tech] || 0) + 1;
            });
            return acc;
        }, {} as Record<string, number>);

        return Object.entries(techCount)
            .sort(([, a], [, b]) => b - a)
            .slice(0, limit)
            .map(([tech, count]) => ({ name: tech, count }));
    } catch (error) {
        console.error('Error fetching top technologies from database:', error);
        return [];
    }
};

/**
 * Search projects in database using the same logic as static projects
 */
export const searchProjectsInDatabase = async (
    searchTerm: string,
    options?: {
        categories?: string[];
        technologies?: string[];
        statuses?: string[];
        limit?: number;
        offset?: number;
    }
) => {
    const filter: ProjectFilter = {
        search: searchTerm
    };

    // Add additional filters from options
    if (options?.categories && options.categories.length > 0) {
        // For multiple categories, we'll need to handle this in the database service
        // For now, we'll just use the first category as the main filter
        filter.category = options.categories[0];
    }

    if (options?.technologies && options.technologies.length > 0) {
        filter.technology = options.technologies[0];
    }

    if (options?.statuses && options.statuses.length > 0) {
        filter.status = options.statuses[0];
    }

    return organizeProjectsFromDatabase(
        filter,
        { field: 'priority', direction: 'asc' },
        { 
            limit: options?.limit, 
            offset: options?.offset 
        }
    );
};

/**
 * Get related projects from database using the same logic as static projects
 */
export const getRelatedProjectsFromDatabase = async (
    currentProjectId: string, 
    limit: number = 3
) => {
    try {
        const projectsService = ProjectsService.getInstance();
        const currentProject = await projectsService.getProjectById(currentProjectId);
        
        if (!currentProject) {
            return [];
        }

        const transformedCurrentProject = transformDatabaseProject(currentProject);
        const result = await organizeProjectsFromDatabase();
        
        const relatedProjects = result.projects
            .filter(project =>
                project.id !== transformedCurrentProject.id &&
                (project.category === transformedCurrentProject.category ||
                    project.technologies.some(tech => transformedCurrentProject.technologies.includes(tech)))
            )
            .sort(() => Math.random() - 0.5) // Randomize
            .slice(0, limit);

        return relatedProjects;
    } catch (error) {
        console.error('Error fetching related projects from database:', error);
        return [];
    }
};

/**
 * Utility function to create a prompt for organizing a new database project
 * This helps ensure consistency when adding projects to the database
 */
export const createOrganizationPromptForDatabaseProject = (projectData: any) => {
    const prompt = createProjectOrganizationPrompt(projectData);
    
    // Add database-specific guidance
    const databaseGuidance = `

## Database-Specific Notes:

### JSON Field Handling:
- Arrays like 'technologies', 'features', 'tags' can be stored as JSON strings
- The system will automatically parse these when displaying projects
- Ensure proper JSON format: ["item1", "item2", "item3"]

### Required Database Fields:
- All projects must have: id, title, description, category, status, start_date
- Use ISO date format for dates: "YYYY-MM-DD"
- Categories must be one of: web, mobile, desktop, api, ai, other
- Status must be one of: completed, in-progress, planned

### Priority and Ordering:
- Lower priority numbers = higher importance (1 is highest priority)
- Featured projects (is_featured: true) appear in highlighted sections
- Projects without start_date will be filtered out of recent projects

### Image Handling:
- Store image paths relative to public directory: "/projects/image-name.jpg"
- Ensure images are optimized and accessible
- Provide fallback placeholder for missing images

### Consistency with Static Projects:
This database project will be organized using the same filtering, sorting, and display logic as static projects in the system.
    `;

    return prompt + databaseGuidance;
};

/**
 * Validation function to ensure database project data is consistent with static projects
 */
export const validateDatabaseProjectData = (projectData: any): { 
    isValid: boolean; 
    errors: string[]; 
    suggestions: string[] 
} => {
    const errors: string[] = [];
    const suggestions: string[] = [];

    // Required fields validation
    const requiredFields = ['id', 'title', 'description', 'category', 'status'];
    requiredFields.forEach(field => {
        if (!projectData[field]) {
            errors.push(`Missing required field: ${field}`);
        }
    });

    // Category validation
    const validCategories = ['web', 'mobile', 'desktop', 'api', 'ai', 'other'];
    if (projectData.category && !validCategories.includes(projectData.category)) {
        errors.push(`Invalid category: ${projectData.category}. Must be one of: ${validCategories.join(', ')}`);
    }

    // Status validation
    const validStatuses = ['completed', 'in-progress', 'planned'];
    if (projectData.status && !validStatuses.includes(projectData.status)) {
        errors.push(`Invalid status: ${projectData.status}. Must be one of: ${validStatuses.join(', ')}`);
    }

    // Date validation
    if (projectData.start_date) {
        const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
        if (!dateRegex.test(projectData.start_date)) {
            errors.push('start_date must be in YYYY-MM-DD format');
        }
    }

    if (projectData.end_date) {
        const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
        if (!dateRegex.test(projectData.end_date)) {
            errors.push('end_date must be in YYYY-MM-DD format');
        }
    }

    // Suggestions for improvement
    if (!projectData.short_description) {
        suggestions.push('Consider adding a short_description for better project previews');
    }

    if (!projectData.technologies || (Array.isArray(projectData.technologies) && projectData.technologies.length === 0)) {
        suggestions.push('Adding technologies will improve project discoverability');
    }

    if (!projectData.priority) {
        suggestions.push('Set a priority (number) to control project ordering');
    }

    if (!projectData.image_url) {
        suggestions.push('Adding an image will improve visual presentation');
    }

    return {
        isValid: errors.length === 0,
        errors,
        suggestions
    };
};