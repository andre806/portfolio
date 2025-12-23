import { Project } from '../models/Project';
import { DatabaseProject } from '../services/projectsService';

/**
 * Migration utility to help convert between static and database project formats
 */

/**
 * Convert a static Project to DatabaseProject format for insertion into database
 */
export const convertProjectToDatabaseFormat = (project: Project): Omit<DatabaseProject, 'id'> => {
    return {
        title: project.title,
        description: project.description,
        short_description: project.shortDescription,
        image_url: project.image,
        technologies: JSON.stringify(project.technologies),
        category: project.category,
        status: project.status,
        is_featured: project.featured,
        github_url: project.githubUrl,
        live_url: project.liveUrl,
        demo_url: project.demoUrl,
        documentation_url: project.documentation,
        start_date: project.startDate,
        end_date: project.endDate,
        features: project.features.length > 0 ? JSON.stringify(project.features) : undefined,
        tags: JSON.stringify(project.tags),
        priority: project.priority,
        is_public: project.isPublic,
        client: project.client,
        budget: project.budget,
        team: project.team ? JSON.stringify(project.team) : undefined,
        challenges: project.challenges ? JSON.stringify(project.challenges) : undefined,
        achievements: project.achievements ? JSON.stringify(project.achievements) : undefined,
        metrics: project.metrics ? JSON.stringify(project.metrics) : undefined,
        gallery: project.gallery ? JSON.stringify(project.gallery) : undefined
    };
};

/**
 * Generate SQL CREATE TABLE statement for database projects
 */
export const generateDatabaseSchema = (): string => {
    return `
-- Database schema for projects table
CREATE TABLE projects (
    -- Required fields
    id VARCHAR(255) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    category VARCHAR(50) NOT NULL CHECK (category IN ('web', 'mobile', 'desktop', 'api', 'ai', 'other')),
    status VARCHAR(50) NOT NULL CHECK (status IN ('completed', 'in-progress', 'planned')),
    start_date DATE NOT NULL,
    
    -- Optional display fields
    short_description VARCHAR(500),
    image_url VARCHAR(500),
    
    -- JSON fields (can be stored as JSON type in PostgreSQL or TEXT in other DBs)
    technologies JSON, -- Array of strings
    features JSON,     -- Array of strings  
    tags JSON,         -- Array of strings
    
    -- Boolean flags
    is_featured BOOLEAN DEFAULT FALSE,
    is_public BOOLEAN DEFAULT TRUE,
    
    -- URL fields
    github_url VARCHAR(500),
    live_url VARCHAR(500),
    demo_url VARCHAR(500),
    documentation_url VARCHAR(500),
    
    -- Date fields
    end_date DATE,
    
    -- Numeric fields
    priority INTEGER DEFAULT 999,
    
    -- Text fields
    client VARCHAR(255),
    budget VARCHAR(100),
    
    -- Complex JSON fields
    team JSON,         -- Array of {name, role, linkedin}
    challenges JSON,   -- Array of strings
    achievements JSON, -- Array of strings
    metrics JSON,      -- Array of {label, value}
    gallery JSON,      -- Array of strings
    
    -- Timestamp fields
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for better performance
CREATE INDEX idx_projects_category ON projects(category);
CREATE INDEX idx_projects_status ON projects(status);
CREATE INDEX idx_projects_featured ON projects(is_featured);
CREATE INDEX idx_projects_public ON projects(is_public);
CREATE INDEX idx_projects_start_date ON projects(start_date);
CREATE INDEX idx_projects_priority ON projects(priority);
CREATE INDEX idx_projects_title ON projects(title);

-- Full text search index (PostgreSQL specific)
CREATE INDEX idx_projects_search ON projects USING GIN (to_tsvector('english', title || ' ' || description || ' ' || short_description));
    `;
};

/**
 * Generate MongoDB collection schema
 */
export const generateMongoSchema = () => {
    return {
        validator: {
            $jsonSchema: {
                bsonType: "object",
                required: ["title", "description", "category", "status", "start_date"],
                properties: {
                    _id: { bsonType: "objectId" },
                    title: { bsonType: "string", minLength: 1, maxLength: 255 },
                    description: { bsonType: "string", minLength: 1 },
                    short_description: { bsonType: "string", maxLength: 500 },
                    category: { 
                        bsonType: "string", 
                        enum: ["web", "mobile", "desktop", "api", "ai", "other"] 
                    },
                    status: { 
                        bsonType: "string", 
                        enum: ["completed", "in-progress", "planned"] 
                    },
                    start_date: { bsonType: "date" },
                    end_date: { bsonType: "date" },
                    is_featured: { bsonType: "bool" },
                    is_public: { bsonType: "bool" },
                    priority: { bsonType: "int", minimum: 1 },
                    technologies: { bsonType: "array", items: { bsonType: "string" } },
                    features: { bsonType: "array", items: { bsonType: "string" } },
                    tags: { bsonType: "array", items: { bsonType: "string" } },
                    team: { 
                        bsonType: "array",
                        items: {
                            bsonType: "object",
                            required: ["name", "role"],
                            properties: {
                                name: { bsonType: "string" },
                                role: { bsonType: "string" },
                                linkedin: { bsonType: "string" }
                            }
                        }
                    },
                    metrics: {
                        bsonType: "array",
                        items: {
                            bsonType: "object",
                            required: ["label", "value"],
                            properties: {
                                label: { bsonType: "string" },
                                value: { bsonType: "string" }
                            }
                        }
                    },
                    github_url: { bsonType: "string" },
                    live_url: { bsonType: "string" },
                    demo_url: { bsonType: "string" },
                    documentation_url: { bsonType: "string" },
                    image_url: { bsonType: "string" },
                    client: { bsonType: "string" },
                    budget: { bsonType: "string" },
                    challenges: { bsonType: "array", items: { bsonType: "string" } },
                    achievements: { bsonType: "array", items: { bsonType: "string" } },
                    gallery: { bsonType: "array", items: { bsonType: "string" } },
                    created_at: { bsonType: "date" },
                    updated_at: { bsonType: "date" }
                }
            }
        }
    };
};

/**
 * Generate sample API endpoints documentation
 */
export const generateAPIEndpoints = (): string => {
    return `
# API Endpoints for Database Projects

## GET /api/projects
Get all projects with filtering and pagination

Query Parameters:
- category: Filter by category (web, mobile, desktop, api, ai, other)
- status: Filter by status (completed, in-progress, planned)
- featured: Filter by featured status (true, false)
- search: Search in title, description, and technologies
- page: Page number (default: 1)
- limit: Items per page (default: 20)
- sort: Sort field (title, start_date, priority, status)
- order: Sort order (asc, desc)

Example: GET /api/projects?category=web&status=completed&limit=10&sort=priority&order=asc

## GET /api/projects/:id
Get a specific project by ID

## POST /api/projects
Create a new project

Body: DatabaseProject object (without id)

## PUT /api/projects/:id
Update an existing project

Body: Partial DatabaseProject object

## DELETE /api/projects/:id
Delete a project

## GET /api/projects/featured
Get featured projects

Query Parameters:
- limit: Number of featured projects (default: 3)

## GET /api/projects/recent
Get recent projects

Query Parameters:
- limit: Number of recent projects (default: 4)

## GET /api/projects/stats
Get project statistics

Returns:
{
  total: number,
  completed: number,
  inProgress: number,
  planned: number,
  technologies: number,
  completionRate: number,
  featured: number
}

## GET /api/projects/technologies
Get technology statistics

Query Parameters:
- limit: Number of top technologies (default: 10)

Returns: Array of { name: string, count: number }
    `;
};

/**
 * Helper function to bulk migrate static projects to database
 */
export const generateMigrationScript = (staticProjects: Project[]): string => {
    const databaseProjects = staticProjects.map(project => convertProjectToDatabaseFormat(project));
    
    const insertStatements = databaseProjects.map((project, index) => {
        const id = `migrated-${index + 1}`;
        return `INSERT INTO projects (id, ${Object.keys(project).join(', ')}) VALUES ('${id}', ${Object.values(project).map(v => 
            v === undefined ? 'NULL' : 
            typeof v === 'string' ? `'${v.replace(/'/g, "''")}'` : 
            typeof v === 'boolean' ? v : 
            typeof v === 'number' ? v : 
            `'${JSON.stringify(v).replace(/'/g, "''")}'`
        ).join(', ')});`;
    });

    return `
-- Migration script to insert static projects into database
-- Generated on ${new Date().toISOString()}

${insertStatements.join('\n\n')}

-- Verify migration
SELECT 
    COUNT(*) as total_projects,
    COUNT(CASE WHEN is_featured = true THEN 1 END) as featured_projects,
    COUNT(CASE WHEN status = 'completed' THEN 1 END) as completed_projects
FROM projects;
    `;
};

/**
 * Configuration helper for different environments
 */
export const getDatabaseConfig = (environment: 'development' | 'production' | 'test') => {
    const configs = {
        development: {
            database: {
                enabled: true,
                caching: false, // Disable caching in dev for real-time updates
                refreshInterval: 30 * 1000, // 30 seconds
                retryAttempts: 1,
                retryDelay: 1000
            },
            features: {
                enableProjectManagement: true,
                enableAdvancedFiltering: true,
                enableProjectAnalytics: true
            },
            errors: {
                showErrorDetails: true,
                fallbackToStatic: true,
                maxErrorRetries: 1
            }
        },
        production: {
            database: {
                enabled: true,
                caching: true,
                refreshInterval: 5 * 60 * 1000, // 5 minutes
                retryAttempts: 3,
                retryDelay: 2000
            },
            features: {
                enableProjectManagement: false, // Security: disable in production
                enableAdvancedFiltering: true,
                enableProjectAnalytics: false // Privacy: disable analytics
            },
            errors: {
                showErrorDetails: false,
                fallbackToStatic: true,
                maxErrorRetries: 3
            }
        },
        test: {
            database: {
                enabled: false, // Use mock data in tests
                caching: false,
                refreshInterval: 0,
                retryAttempts: 0,
                retryDelay: 0
            },
            features: {
                enableProjectManagement: false,
                enableAdvancedFiltering: true,
                enableProjectAnalytics: false
            },
            errors: {
                showErrorDetails: true,
                fallbackToStatic: true,
                maxErrorRetries: 0
            }
        }
    };

    return configs[environment];
};