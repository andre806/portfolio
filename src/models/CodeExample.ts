/**
 * Modelo de dados para exemplos de código do playground
 */

export type Language = 'javascript' | 'typescript' | 'react' | 'html' | 'css' | 'json';
export type Framework = 'react' | 'vanilla' | 'next' | 'node';
export type Difficulty = 'beginner' | 'intermediate' | 'advanced';

export interface CodeFile {
    id: string;
    name: string;
    language: Language;
    content: string;
    readonly?: boolean;
}

export interface CodeExample {
    id: string;
    title: string;
    description: string;
    category: string;
    difficulty: Difficulty;
    framework: Framework;
    tags: string[];
    files: CodeFile[];
    previewConfig?: {
        showPreview: boolean;
        autoRun: boolean;
        dependencies?: string[];
    };
    author: {
        name: string;
        avatar: string;
    };
    stats: {
        views: number;
        likes: number;
        forks: number;
    };
    createdAt: string;
    updatedAt?: string;
    featured: boolean;
}

export interface PlaygroundFilters {
    category?: string;
    difficulty?: Difficulty;
    framework?: Framework;
    tags?: string[];
    search?: string;
    featured?: boolean;
}

export interface PlaygroundState {
    examples: CodeExample[];
    activeExample: CodeExample | null;
    activeFileId: string | null;
    filters: PlaygroundFilters;
    isLoading: boolean;
    error: string | null;
    previewVisible: boolean;
    consoleOutput: string[];
}

export interface PlaygroundStats {
    totalExamples: number;
    totalViews: number;
    totalLikes: number;
    popularCategories: Array<{
        name: string;
        count: number;
        color: string;
    }>;
    languageDistribution: Array<{
        language: Language;
        count: number;
        percentage: number;
    }>;
    difficultyDistribution: Array<{
        difficulty: Difficulty;
        count: number;
        percentage: number;
    }>;
}

// Tipos para funcionalidades avançadas
export interface CodeExecutionResult {
    output: string;
    error?: string;
    logs: string[];
    executionTime: number;
}

export interface ShareableLink {
    id: string;
    url: string;
    expiresAt?: string;
    accessCount: number;
}

export interface CodeTemplate {
    id: string;
    name: string;
    framework: Framework;
    files: Omit<CodeFile, 'id'>[];
    description: string;
}
