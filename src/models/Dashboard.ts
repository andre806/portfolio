/**
 * Modelos de dados para o dashboard de estatísticas
 */

export interface DashboardMetrics {
    overview: OverviewMetrics;
    projects: ProjectMetrics;
    blog: BlogMetrics;
    playground: PlaygroundMetrics;
    contact: ContactMetrics;
    performance: PerformanceMetrics;
    traffic: TrafficMetrics;
    engagement: EngagementMetrics;
}

export interface OverviewMetrics {
    totalVisitors: number;
    totalPageViews: number;
    avgSessionDuration: number;
    bounceRate: number;
    conversionRate: number;
    lastUpdated: string;
}

export interface ProjectMetrics {
    totalProjects: number;
    featuredProjects: number;
    totalViews: number;
    totalLikes: number;
    totalStars: number;
    mostViewedProject: {
        id: string;
        title: string;
        views: number;
    };
    technologiesUsed: Array<{
        name: string;
        count: number;
        percentage: number;
        color: string;
    }>;
    viewsOverTime: Array<{
        date: string;
        views: number;
    }>;
}

export interface BlogMetrics {
    totalPosts: number;
    publishedPosts: number;
    totalViews: number;
    totalLikes: number;
    totalComments: number;
    avgReadingTime: number;
    mostPopularPost: {
        id: string;
        title: string;
        views: number;
        likes: number;
    };
    categoriesDistribution: Array<{
        name: string;
        count: number;
        percentage: number;
        color: string;
    }>;
    viewsOverTime: Array<{
        date: string;
        views: number;
    }>;
    engagementRate: number;
}

export interface PlaygroundMetrics {
    totalExamples: number;
    totalViews: number;
    totalLikes: number;
    totalForks: number;
    activeUsers: number;
    mostPopularExample: {
        id: string;
        title: string;
        views: number;
        likes: number;
    };
    languagesUsed: Array<{
        language: string;
        count: number;
        percentage: number;
        color: string;
    }>;
    difficultyDistribution: Array<{
        difficulty: string;
        count: number;
        percentage: number;
    }>;
    usageOverTime: Array<{
        date: string;
        sessions: number;
    }>;
}

export interface ContactMetrics {
    totalMessages: number;
    responseRate: number;
    avgResponseTime: number;
    messagesByType: Array<{
        type: string;
        count: number;
        percentage: number;
    }>;
    messagesOverTime: Array<{
        date: string;
        messages: number;
    }>;
    conversionToProject: number;
}

export interface PerformanceMetrics {
    pageLoadTime: number;
    firstContentfulPaint: number;
    largestContentfulPaint: number;
    cumulativeLayoutShift: number;
    firstInputDelay: number;
    performanceScore: number;
    lighthouse: {
        performance: number;
        accessibility: number;
        bestPractices: number;
        seo: number;
    };
    coreWebVitals: {
        lcp: number;
        fid: number;
        cls: number;
        status: 'good' | 'needs-improvement' | 'poor';
    };
}

export interface TrafficMetrics {
    sources: Array<{
        source: string;
        visitors: number;
        percentage: number;
        color: string;
    }>;
    devices: Array<{
        device: string;
        visitors: number;
        percentage: number;
    }>;
    browsers: Array<{
        browser: string;
        visitors: number;
        percentage: number;
    }>;
    countries: Array<{
        country: string;
        visitors: number;
        percentage: number;
        flag: string;
    }>;
    peakHours: Array<{
        hour: number;
        visitors: number;
    }>;
    topPages: Array<{
        path: string;
        views: number;
        uniqueViews: number;
        avgTime: number;
    }>;
}

export interface EngagementMetrics {
    socialShares: Array<{
        platform: string;
        shares: number;
        growth: number;
    }>;
    interactions: Array<{
        type: string;
        count: number;
        growth: number;
    }>;
    retentionRate: number;
    activeUsers: {
        daily: number;
        weekly: number;
        monthly: number;
    };
    userJourney: Array<{
        step: string;
        users: number;
        dropoffRate: number;
    }>;
}

// Tipos para filtros e configurações
export interface DashboardFilters {
    dateRange: {
        start: string;
        end: string;
        preset?: 'last7days' | 'last30days' | 'last3months' | 'lastyear' | 'custom';
    };
    metrics: string[];
    granularity: 'hour' | 'day' | 'week' | 'month';
}

export interface DashboardConfig {
    refreshInterval: number;
    autoRefresh: boolean;
    widgets: Array<{
        id: string;
        type: string;
        position: { x: number; y: number; w: number; h: number };
        visible: boolean;
    }>;
    theme: 'light' | 'dark' | 'auto';
}

// Interfaces para componentes específicos
export interface MetricCard {
    title: string;
    value: string | number;
    change: number;
    changeType: 'increase' | 'decrease' | 'neutral';
    icon: string;
    color: string;
    description?: string;
    trend?: Array<{ date: string; value: number }>;
}

export interface ChartData {
    labels: string[];
    datasets: Array<{
        label: string;
        data: number[];
        backgroundColor?: string | string[];
        borderColor?: string;
        borderWidth?: number;
        fill?: boolean;
    }>;
}

export interface GoalProgress {
    id: string;
    title: string;
    current: number;
    target: number;
    percentage: number;
    deadline: string;
    status: 'on-track' | 'at-risk' | 'behind' | 'completed';
    description: string;
}
