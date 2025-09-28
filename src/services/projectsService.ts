import { Project, ProjectFilter } from '../models/Project';

export interface DatabaseProject {
    id: string;
    title: string;
    description: string;
    short_description?: string;
    image_url?: string;
    technologies: string | string[]; // Can be JSON string or array
    category: string;
    status: string;
    is_featured?: boolean;
    github_url?: string;
    live_url?: string;
    demo_url?: string;
    documentation_url?: string;
    start_date: string;
    end_date?: string;
    features?: string | string[]; // Can be JSON string or array
    tags?: string | string[]; // Can be JSON string or array
    priority?: number;
    is_public?: boolean;
    client?: string;
    budget?: string;
    team?: string | Array<{ name: string; role: string; linkedin?: string }>; // Can be JSON string or array
    challenges?: string | string[];
    achievements?: string | string[];
    metrics?: string | Array<{ label: string; value: string }>;
    gallery?: string | string[];
    created_at?: string;
    updated_at?: string;
}

/**
 * Transform database project to match the Project interface
 */
export const transformDatabaseProject = (dbProject: DatabaseProject): Project => {
    // Helper function to parse JSON strings or return the value if it's already parsed
    const parseJsonField = <T>(field: string | T[] | undefined, defaultValue: T[] = []): T[] => {
        if (!field) return defaultValue;
        if (Array.isArray(field)) return field;
        try {
            const parsed = JSON.parse(field as string);
            return Array.isArray(parsed) ? parsed : defaultValue;
        } catch {
            // If it's a simple string, try to split by comma
            if (typeof field === 'string') {
                return field.split(',').map(item => item.trim()).filter(Boolean) as T[];
            }
            return defaultValue;
        }
    };

    // Helper function to parse JSON object fields
    const parseJsonObject = <T>(field: string | T | undefined, defaultValue?: T): T | undefined => {
        if (!field) return defaultValue;
        if (typeof field === 'object') return field;
        try {
            return JSON.parse(field as string);
        } catch {
            return defaultValue;
        }
    };

    return {
        id: dbProject.id,
        title: dbProject.title,
        description: dbProject.description,
        shortDescription: dbProject.short_description || '',
        image: dbProject.image_url || '/images/project-placeholder.png',
        technologies: parseJsonField<string>(dbProject.technologies),
        category: (dbProject.category || 'other') as Project['category'],
        status: (dbProject.status || 'planned') as Project['status'],
        featured: dbProject.is_featured || false,
        githubUrl: dbProject.github_url,
        liveUrl: dbProject.live_url,
        demoUrl: dbProject.demo_url,
        documentation: dbProject.documentation_url,
        startDate: dbProject.start_date,
        endDate: dbProject.end_date,
        team: parseJsonObject<Array<{ name: string; role: string; linkedin?: string }>>(dbProject.team),
        features: parseJsonField<string>(dbProject.features),
        challenges: parseJsonField<string>(dbProject.challenges),
        achievements: parseJsonField<string>(dbProject.achievements),
        metrics: parseJsonObject<Array<{ label: string; value: string }>>(dbProject.metrics),
        gallery: parseJsonField<string>(dbProject.gallery),
        tags: parseJsonField<string>(dbProject.tags, parseJsonField<string>(dbProject.technologies)),
        priority: dbProject.priority || 999,
        isPublic: dbProject.is_public !== false, // Default to true
        client: dbProject.client,
        budget: dbProject.budget
    };
};

/**
 * Mock database service for demonstration
 * In a real application, replace these with actual database calls
 */
export class ProjectsService {
    private static instance: ProjectsService;
    private projects: DatabaseProject[] = [];
    private isInitialized = false;

    static getInstance(): ProjectsService {
        if (!ProjectsService.instance) {
            ProjectsService.instance = new ProjectsService();
        }
        return ProjectsService.instance;
    }

    /**
     * Initialize with mock data or connect to real database
     */
    async initialize(): Promise<void> {
        if (this.isInitialized) return;

        // Mock database projects - in real implementation, this would be a database call
        this.projects = [
            {
                id: 'db-project-1',
                title: 'E-commerce Platform',
                description: 'A full-stack e-commerce platform with payment integration, inventory management, and admin dashboard.',
                short_description: 'Modern e-commerce solution with React and Node.js',
                image_url: '/projects/ecommerce.jpg',
                technologies: JSON.stringify(['React', 'Node.js', 'MongoDB', 'Stripe', 'TypeScript']),
                category: 'web',
                status: 'completed',
                is_featured: true,
                github_url: 'https://github.com/user/ecommerce-platform',
                live_url: 'https://ecommerce-demo.vercel.app',
                start_date: '2024-01-15',
                end_date: '2024-04-30',
                features: JSON.stringify([
                    'Product catalog with search and filters',
                    'Shopping cart and checkout process',
                    'Payment integration with Stripe',
                    'Order tracking and history',
                    'Admin dashboard for inventory management'
                ]),
                tags: JSON.stringify(['React', 'E-commerce', 'Full-stack', 'MongoDB']),
                priority: 1,
                is_public: true,
                metrics: JSON.stringify([
                    { label: 'Products', value: '500+' },
                    { label: 'Users', value: '1,200' },
                    { label: 'Orders', value: '850' },
                    { label: 'Revenue', value: '$25K' }
                ])
            },
            {
                id: 'db-project-2',
                title: 'Task Management App',
                description: 'A collaborative task management application with real-time updates, team collaboration, and project tracking.',
                short_description: 'Team collaboration tool with real-time features',
                image_url: '/projects/task-manager.jpg',
                technologies: JSON.stringify(['Vue.js', 'Express', 'PostgreSQL', 'Socket.io', 'TypeScript']),
                category: 'web',
                status: 'in-progress',
                is_featured: false,
                github_url: 'https://github.com/user/task-manager',
                demo_url: 'https://task-manager-demo.netlify.app',
                start_date: '2024-03-01',
                features: JSON.stringify([
                    'Create and assign tasks to team members',
                    'Real-time notifications and updates',
                    'Project timeline and milestone tracking',
                    'Team collaboration features',
                    'Reporting and analytics dashboard'
                ]),
                tags: JSON.stringify(['Vue.js', 'Real-time', 'Collaboration', 'PostgreSQL']),
                priority: 2,
                is_public: true
            },
            {
                id: 'db-project-3',
                title: 'AI Image Generator',
                description: 'An AI-powered image generation tool using machine learning models to create unique artwork and designs.',
                short_description: 'AI tool for generating creative images',
                image_url: '/projects/ai-generator.jpg',
                technologies: JSON.stringify(['Python', 'TensorFlow', 'React', 'FastAPI', 'Docker']),
                category: 'ai',
                status: 'completed',
                is_featured: true,
                github_url: 'https://github.com/user/ai-image-generator',
                live_url: 'https://ai-generator.herokuapp.com',
                documentation_url: 'https://docs.ai-generator.com',
                start_date: '2024-05-10',
                end_date: '2024-08-15',
                features: JSON.stringify([
                    'Generate images from text prompts',
                    'Multiple AI model options',
                    'Image editing and enhancement',
                    'Gallery of generated artwork',
                    'API for developers'
                ]),
                tags: JSON.stringify(['AI', 'Machine Learning', 'Python', 'Image Generation']),
                priority: 1,
                is_public: true,
                metrics: JSON.stringify([
                    { label: 'Images Generated', value: '10K+' },
                    { label: 'Active Users', value: '500' },
                    { label: 'API Calls', value: '50K' },
                    { label: 'Models', value: '5' }
                ])
            }
        ];

        this.isInitialized = true;
    }

    /**
     * Fetch all projects from database
     */
    async getAllProjects(): Promise<DatabaseProject[]> {
        await this.initialize();
        return [...this.projects];
    }

    /**
     * Fetch projects with filtering
     */
    async getFilteredProjects(filter?: ProjectFilter): Promise<DatabaseProject[]> {
        await this.initialize();
        
        if (!filter) return [...this.projects];

        return this.projects.filter(project => {
            // Category filter
            if (filter.category && filter.category !== 'all' && project.category !== filter.category) {
                return false;
            }

            // Technology filter
            if (filter.technology) {
                const technologies = typeof project.technologies === 'string' 
                    ? JSON.parse(project.technologies) 
                    : project.technologies;
                if (!technologies.includes(filter.technology)) {
                    return false;
                }
            }

            // Status filter
            if (filter.status && project.status !== filter.status) {
                return false;
            }

            // Featured filter
            if (filter.featured !== undefined && project.is_featured !== filter.featured) {
                return false;
            }

            // Search filter
            if (filter.search) {
                const searchLower = filter.search.toLowerCase();
                const technologies = typeof project.technologies === 'string' 
                    ? JSON.parse(project.technologies) 
                    : project.technologies;
                const tags = project.tags 
                    ? (typeof project.tags === 'string' ? JSON.parse(project.tags) : project.tags)
                    : [];

                const matchesSearch = 
                    project.title.toLowerCase().includes(searchLower) ||
                    project.description.toLowerCase().includes(searchLower) ||
                    (project.short_description && project.short_description.toLowerCase().includes(searchLower)) ||
                    technologies.some((tech: string) => tech.toLowerCase().includes(searchLower)) ||
                    tags.some((tag: string) => tag.toLowerCase().includes(searchLower));

                if (!matchesSearch) {
                    return false;
                }
            }

            return true;
        });
    }

    /**
     * Fetch a specific project by ID
     */
    async getProjectById(id: string): Promise<DatabaseProject | null> {
        await this.initialize();
        return this.projects.find(project => project.id === id) || null;
    }

    /**
     * Add a new project (for admin/management purposes)
     */
    async addProject(project: Omit<DatabaseProject, 'id'>): Promise<DatabaseProject> {
        await this.initialize();
        const newProject: DatabaseProject = {
            ...project,
            id: `db-project-${Date.now()}`, // Simple ID generation
        };
        this.projects.push(newProject);
        return newProject;
    }

    /**
     * Update an existing project
     */
    async updateProject(id: string, updates: Partial<DatabaseProject>): Promise<DatabaseProject | null> {
        await this.initialize();
        const index = this.projects.findIndex(project => project.id === id);
        if (index === -1) return null;

        this.projects[index] = { ...this.projects[index], ...updates };
        return this.projects[index];
    }

    /**
     * Delete a project
     */
    async deleteProject(id: string): Promise<boolean> {
        await this.initialize();
        const index = this.projects.findIndex(project => project.id === id);
        if (index === -1) return false;

        this.projects.splice(index, 1);
        return true;
    }
}

/**
 * Utility function to get organized database projects
 * This applies the same organization logic as static projects
 */
export const getOrganizedDatabaseProjects = async (filter?: ProjectFilter) => {
    const service = ProjectsService.getInstance();
    const dbProjects = await service.getFilteredProjects(filter);
    
    // Transform database projects to match Project interface
    const transformedProjects = dbProjects.map(transformDatabaseProject);
    
    return transformedProjects;
};

/**
 * Prompt utility to help organize database projects consistently
 */
export const createProjectOrganizationPrompt = (projectData: any) => {
    return `
# Project Organization Guide

When adding a new project to the database, ensure it follows this structure for consistency:

## Required Fields:
- **id**: Unique identifier
- **title**: Project name
- **description**: Detailed project description
- **category**: One of: web, mobile, desktop, api, ai, other
- **status**: One of: completed, in-progress, planned
- **start_date**: ISO date string (YYYY-MM-DD)

## Recommended Fields:
- **short_description**: Brief summary (50-100 chars)
- **image_url**: Project image path
- **technologies**: JSON array of tech stack
- **features**: JSON array of key features
- **tags**: JSON array of searchable tags
- **priority**: Number (1 = highest priority)
- **is_featured**: Boolean for featured projects
- **is_public**: Boolean for public visibility

## URL Fields (optional):
- **github_url**: Source code repository
- **live_url**: Production/live demo
- **demo_url**: Interactive demo
- **documentation_url**: Documentation link

## Example Structure:
\`\`\`json
{
    "id": "unique-project-id",
    "title": "Project Title",
    "description": "Detailed description of the project...",
    "short_description": "Brief summary",
    "image_url": "/projects/project-image.jpg",
    "technologies": ["React", "Node.js", "MongoDB"],
    "category": "web",
    "status": "completed",
    "is_featured": true,
    "github_url": "https://github.com/user/repo",
    "live_url": "https://project-demo.com",
    "start_date": "2024-01-15",
    "end_date": "2024-04-30",
    "features": [
        "Feature 1 description",
        "Feature 2 description"
    ],
    "tags": ["React", "Full-stack", "MongoDB"],
    "priority": 1,
    "is_public": true
}
\`\`\`

## Current Project Data to Organize:
${JSON.stringify(projectData, null, 2)}
    `;
};