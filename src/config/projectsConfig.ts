import { ProjectSource } from '../hooks/useProjectsEnhanced';

export interface ProjectConfig {
    // Data source configuration
    source: ProjectSource;
    
    // Database configuration
    database: {
        enabled: boolean;
        caching: boolean;
        refreshInterval: number; // milliseconds
        retryAttempts: number;
        retryDelay: number; // milliseconds
    };

    // Display configuration
    display: {
        defaultViewMode: 'grid' | 'list';
        defaultSort: {
            field: 'priority' | 'title' | 'startDate' | 'status';
            direction: 'asc' | 'desc';
        };
        defaultCategory: string;
        projectsPerPage: number;
        enableInfiniteScroll: boolean;
    };

    // Feature flags
    features: {
        enableProjectManagement: boolean; // Add/edit/delete projects
        enableAdvancedFiltering: boolean;
        enableProjectComments: boolean;
        enableProjectLikes: boolean;
        enableProjectSharing: boolean;
        enableProjectAnalytics: boolean;
    };

    // Error handling
    errors: {
        showErrorDetails: boolean;
        fallbackToStatic: boolean; // Fallback to static projects if database fails
        maxErrorRetries: number;
    };
}

// Default configuration
export const defaultProjectConfig: ProjectConfig = {
    source: 'static', // Safe default
    
    database: {
        enabled: true,
        caching: true,
        refreshInterval: 5 * 60 * 1000, // 5 minutes
        retryAttempts: 3,
        retryDelay: 1000 // 1 second
    },

    display: {
        defaultViewMode: 'grid',
        defaultSort: {
            field: 'priority',
            direction: 'asc'
        },
        defaultCategory: 'all',
        projectsPerPage: 12,
        enableInfiniteScroll: false
    },

    features: {
        enableProjectManagement: false, // Disabled by default for security
        enableAdvancedFiltering: true,
        enableProjectComments: false,
        enableProjectLikes: false,
        enableProjectSharing: true,
        enableProjectAnalytics: false
    },

    errors: {
        showErrorDetails: false, // Hide in production
        fallbackToStatic: true, // Always fallback to static
        maxErrorRetries: 3
    }
};

// Environment-specific configurations
export const developmentConfig: Partial<ProjectConfig> = {
    source: 'both', // Show both static and database projects in development
    errors: {
        showErrorDetails: true,
        fallbackToStatic: true,
        maxErrorRetries: 1
    },
    features: {
        enableProjectManagement: true, // Enable management features in development
        enableAdvancedFiltering: true,
        enableProjectAnalytics: true
    }
};

export const productionConfig: Partial<ProjectConfig> = {
    source: 'database', // Use database projects in production
    errors: {
        showErrorDetails: false,
        fallbackToStatic: true,
        maxErrorRetries: 3
    },
    features: {
        enableProjectManagement: false, // Disable management features in production
        enableAdvancedFiltering: true,
        enableProjectSharing: true
    }
};

// Function to get configuration based on environment
export const getProjectConfig = (): ProjectConfig => {
    const baseConfig = { ...defaultProjectConfig };
    
    if (process.env.NODE_ENV === 'development') {
        return { ...baseConfig, ...developmentConfig };
    }
    
    if (process.env.NODE_ENV === 'production') {
        return { ...baseConfig, ...productionConfig };
    }
    
    // Test environment or fallback
    return baseConfig;
};

// Configuration context for React components
export const PROJECT_CONFIG = getProjectConfig();

// Utility function to check if a feature is enabled
export const isFeatureEnabled = (feature: keyof ProjectConfig['features']): boolean => {
    return PROJECT_CONFIG.features[feature];
};

// Utility function to get database configuration
export const getDatabaseConfig = () => {
    return PROJECT_CONFIG.database;
};

// Utility function to get display configuration
export const getDisplayConfig = () => {
    return PROJECT_CONFIG.display;
};