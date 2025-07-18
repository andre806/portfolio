/**
 * Dados simulados para o dashboard de estatísticas
 */

import { DashboardMetrics, MetricCard, GoalProgress } from '@/models/Dashboard';

// Função para gerar dados aleatórios realistas
const generateRandomData = (base: number, variance: number = 0.2) => {
    return Math.floor(base * (1 + (Math.random() - 0.5) * variance));
};

// Gerar dados dos últimos 30 dias
const generateTimeSeriesData = (days: number = 30, baseValue: number = 100) => {
    const data = [];
    const now = new Date();

    for (let i = days - 1; i >= 0; i--) {
        const date = new Date(now);
        date.setDate(date.getDate() - i);

        data.push({
            date: date.toISOString().split('T')[0],
            views: generateRandomData(baseValue, 0.3),
            sessions: generateRandomData(baseValue * 0.7, 0.4),
            messages: generateRandomData(baseValue * 0.1, 0.5)
        });
    }

    return data;
};

const timeSeriesData = generateTimeSeriesData();

export const dashboardMetrics: DashboardMetrics = {
    overview: {
        totalVisitors: 12847,
        totalPageViews: 34521,
        avgSessionDuration: 185, // segundos
        bounceRate: 32.4, // porcentagem
        conversionRate: 8.7, // porcentagem
        lastUpdated: new Date().toISOString()
    },

    projects: {
        totalProjects: 15,
        featuredProjects: 6,
        totalViews: 8934,
        totalLikes: 456,
        totalStars: 234,
        mostViewedProject: {
            id: 'ecommerce-platform',
            title: 'E-commerce Platform',
            views: 1847
        },
        technologiesUsed: [
            { name: 'React', count: 12, percentage: 35, color: '#61DAFB' },
            { name: 'TypeScript', count: 10, percentage: 29, color: '#3178C6' },
            { name: 'Next.js', count: 8, percentage: 23, color: '#000000' },
            { name: 'Node.js', count: 6, percentage: 18, color: '#339933' },
            { name: 'Python', count: 4, percentage: 12, color: '#3776AB' },
            { name: 'Vue.js', count: 3, percentage: 9, color: '#4FC08D' }
        ],
        viewsOverTime: timeSeriesData.map(d => ({ date: d.date, views: d.views }))
    },

    blog: {
        totalPosts: 18,
        publishedPosts: 15,
        totalViews: 15634,
        totalLikes: 892,
        totalComments: 234,
        avgReadingTime: 6.5, // minutos
        mostPopularPost: {
            id: 'react-performance-optimization',
            title: 'React Performance Optimization',
            views: 2845,
            likes: 187
        },
        categoriesDistribution: [
            { name: 'React', count: 6, percentage: 33, color: '#61DAFB' },
            { name: 'JavaScript', count: 4, percentage: 22, color: '#F7DF1E' },
            { name: 'TypeScript', count: 3, percentage: 17, color: '#3178C6' },
            { name: 'Web Development', count: 3, percentage: 17, color: '#FF6B6B' },
            { name: 'Performance', count: 2, percentage: 11, color: '#4ECDC4' }
        ],
        viewsOverTime: timeSeriesData.map(d => ({ date: d.date, views: d.views * 1.5 })),
        engagementRate: 24.8
    },

    playground: {
        totalExamples: 12,
        totalViews: 5678,
        totalLikes: 389,
        totalForks: 127,
        activeUsers: 89,
        mostPopularExample: {
            id: 'todo-app',
            title: 'Todo App with LocalStorage',
            views: 1234,
            likes: 89
        },
        languagesUsed: [
            { language: 'React', count: 8, percentage: 40, color: '#61DAFB' },
            { language: 'JavaScript', count: 6, percentage: 30, color: '#F7DF1E' },
            { language: 'CSS', count: 4, percentage: 20, color: '#1572B6' },
            { language: 'HTML', count: 2, percentage: 10, color: '#E34F26' }
        ],
        difficultyDistribution: [
            { difficulty: 'Beginner', count: 5, percentage: 42 },
            { difficulty: 'Intermediate', count: 5, percentage: 42 },
            { difficulty: 'Advanced', count: 2, percentage: 16 }
        ],
        usageOverTime: timeSeriesData.map(d => ({ date: d.date, sessions: d.sessions }))
    },

    contact: {
        totalMessages: 167,
        responseRate: 98.2,
        avgResponseTime: 4.2, // horas
        messagesByType: [
            { type: 'Freelance', count: 78, percentage: 47 },
            { type: 'Job Offer', count: 45, percentage: 27 },
            { type: 'Collaboration', count: 28, percentage: 17 },
            { type: 'Question', count: 16, percentage: 9 }
        ],
        messagesOverTime: timeSeriesData.map(d => ({ date: d.date, messages: d.messages })),
        conversionToProject: 23.4
    },

    performance: {
        pageLoadTime: 1.8, // segundos
        firstContentfulPaint: 1.2,
        largestContentfulPaint: 2.1,
        cumulativeLayoutShift: 0.08,
        firstInputDelay: 45, // ms
        performanceScore: 94,
        lighthouse: {
            performance: 94,
            accessibility: 98,
            bestPractices: 92,
            seo: 96
        },
        coreWebVitals: {
            lcp: 2.1,
            fid: 45,
            cls: 0.08,
            status: 'good'
        }
    },

    traffic: {
        sources: [
            { source: 'Direct', visitors: 4523, percentage: 35, color: '#4F46E5' },
            { source: 'Google', visitors: 3890, percentage: 30, color: '#EA4335' },
            { source: 'GitHub', visitors: 2156, percentage: 17, color: '#181717' },
            { source: 'LinkedIn', visitors: 1445, percentage: 11, color: '#0A66C2' },
            { source: 'Twitter', visitors: 890, percentage: 7, color: '#1DA1F2' }
        ],
        devices: [
            { device: 'Desktop', visitors: 7234, percentage: 56 },
            { device: 'Mobile', visitors: 4567, percentage: 35 },
            { device: 'Tablet', visitors: 1203, percentage: 9 }
        ],
        browsers: [
            { browser: 'Chrome', visitors: 8456, percentage: 66 },
            { browser: 'Firefox', visitors: 2134, percentage: 16 },
            { browser: 'Safari', visitors: 1678, percentage: 13 },
            { browser: 'Edge', visitors: 634, percentage: 5 }
        ],
        countries: [
            { country: 'Brazil', visitors: 5678, percentage: 44, flag: '🇧🇷' },
            { country: 'United States', visitors: 2345, percentage: 18, flag: '🇺🇸' },
            { country: 'Germany', visitors: 1234, percentage: 10, flag: '🇩🇪' },
            { country: 'United Kingdom', visitors: 987, percentage: 8, flag: '🇬🇧' },
            { country: 'Canada', visitors: 756, percentage: 6, flag: '🇨🇦' },
            { country: 'Others', visitors: 1904, percentage: 14, flag: '🌍' }
        ],
        peakHours: Array.from({ length: 24 }, (_, hour) => ({
            hour,
            visitors: generateRandomData(200 + Math.sin(hour * Math.PI / 12) * 150, 0.3)
        })),
        topPages: [
            { path: '/public/home', views: 8934, uniqueViews: 6745, avgTime: 145 },
            { path: '/public/projects', views: 6789, uniqueViews: 5234, avgTime: 234 },
            { path: '/blog', views: 5678, uniqueViews: 4567, avgTime: 189 },
            { path: '/public/about', views: 4567, uniqueViews: 3890, avgTime: 167 },
            { path: '/interactive/playground', views: 3456, uniqueViews: 2789, avgTime: 298 },
            { path: '/public/contact', views: 2345, uniqueViews: 2134, avgTime: 123 }
        ]
    },

    engagement: {
        socialShares: [
            { platform: 'LinkedIn', shares: 234, growth: 15.2 },
            { platform: 'Twitter', shares: 189, growth: 8.7 },
            { platform: 'Facebook', shares: 145, growth: -2.3 },
            { platform: 'Reddit', shares: 67, growth: 23.1 }
        ],
        interactions: [
            { type: 'Page Views', count: 34521, growth: 12.4 },
            { type: 'Project Likes', count: 456, growth: 18.9 },
            { type: 'Blog Comments', count: 234, growth: 7.3 },
            { type: 'Contact Messages', count: 167, growth: 25.6 },
            { type: 'Playground Forks', count: 127, growth: 34.2 }
        ],
        retentionRate: 67.8,
        activeUsers: {
            daily: 245,
            weekly: 1567,
            monthly: 4892
        },
        userJourney: [
            { step: 'Landing', users: 1000, dropoffRate: 0 },
            { step: 'Browse Projects', users: 750, dropoffRate: 25 },
            { step: 'View Project Details', users: 450, dropoffRate: 40 },
            { step: 'Check Playground', users: 280, dropoffRate: 38 },
            { step: 'Read Blog', users: 180, dropoffRate: 36 },
            { step: 'Contact', users: 90, dropoffRate: 50 }
        ]
    }
};

// Cards de métricas principais
export const metricCards: MetricCard[] = [
    {
        title: 'Total de Visitantes',
        value: '12.8K',
        change: 12.4,
        changeType: 'increase',
        icon: '👥',
        color: 'blue',
        description: 'Visitantes únicos últimos 30 dias',
        trend: timeSeriesData.slice(-7).map(d => ({ date: d.date, value: d.views }))
    },
    {
        title: 'Visualizações de Projetos',
        value: '8.9K',
        change: 18.7,
        changeType: 'increase',
        icon: '🚀',
        color: 'green',
        description: 'Total de views nos projetos',
        trend: timeSeriesData.slice(-7).map(d => ({ date: d.date, value: d.views * 0.8 }))
    },
    {
        title: 'Leitores do Blog',
        value: '15.6K',
        change: 8.3,
        changeType: 'increase',
        icon: '📝',
        color: 'purple',
        description: 'Visualizações de posts',
        trend: timeSeriesData.slice(-7).map(d => ({ date: d.date, value: d.views * 1.2 }))
    },
    {
        title: 'Taxa de Conversão',
        value: '8.7%',
        change: 3.2,
        changeType: 'increase',
        icon: '📈',
        color: 'yellow',
        description: 'Visitantes que entram em contato'
    },
    {
        title: 'Playground Sessions',
        value: '5.7K',
        change: 24.1,
        changeType: 'increase',
        icon: '🛝',
        color: 'pink',
        description: 'Sessões no playground interativo',
        trend: timeSeriesData.slice(-7).map(d => ({ date: d.date, value: d.sessions }))
    },
    {
        title: 'Performance Score',
        value: '94',
        change: 2.1,
        changeType: 'increase',
        icon: '⚡',
        color: 'orange',
        description: 'Score do Lighthouse'
    },
    {
        title: 'Tempo de Resposta',
        value: '4.2h',
        change: -15.3,
        changeType: 'increase',
        icon: '⏱️',
        color: 'teal',
        description: 'Tempo médio de resposta a mensagens'
    },
    {
        title: 'Taxa de Retenção',
        value: '67.8%',
        change: 5.7,
        changeType: 'increase',
        icon: '🔄',
        color: 'indigo',
        description: 'Usuários que retornam ao site'
    }
];

// Metas e objetivos
export const goals: GoalProgress[] = [
    {
        id: 'monthly-visitors',
        title: 'Visitantes Mensais',
        current: 12847,
        target: 15000,
        percentage: 85.6,
        deadline: '2025-07-31',
        status: 'on-track',
        description: 'Meta de visitantes únicos para julho'
    },
    {
        id: 'blog-posts',
        title: 'Posts no Blog',
        current: 15,
        target: 20,
        percentage: 75,
        deadline: '2025-12-31',
        status: 'on-track',
        description: 'Publicar 20 posts técnicos este ano'
    },
    {
        id: 'project-likes',
        title: 'Likes em Projetos',
        current: 456,
        target: 500,
        percentage: 91.2,
        deadline: '2025-08-15',
        status: 'on-track',
        description: 'Alcançar 500 likes nos projetos'
    },
    {
        id: 'contact-conversion',
        title: 'Taxa de Conversão',
        current: 8.7,
        target: 10,
        percentage: 87,
        deadline: '2025-09-30',
        status: 'at-risk',
        description: 'Melhorar conversão para 10%'
    },
    {
        id: 'performance-score',
        title: 'Performance Score',
        current: 94,
        target: 95,
        percentage: 98.9,
        deadline: '2025-07-15',
        status: 'on-track',
        description: 'Manter score Lighthouse acima de 95'
    }
];

// Função para simular atualizações em tempo real
export const generateRealtimeUpdate = () => {
    const updates = {
        visitors: generateRandomData(245, 0.1),
        pageViews: generateRandomData(890, 0.15),
        activeUsers: generateRandomData(89, 0.2),
        newMessages: Math.random() > 0.8 ? 1 : 0,
        newProjectView: Math.random() > 0.7 ? 1 : 0
    };

    return updates;
};
