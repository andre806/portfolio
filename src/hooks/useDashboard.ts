/**
 * Hook para gerenciamento do dashboard de estatísticas
 */

import { useState, useEffect, useCallback, useMemo } from 'react';
import {
    DashboardMetrics,
    DashboardFilters,
    DashboardConfig
} from '@/models/Dashboard';
import {
    dashboardMetrics,
    metricCards,
    goals,
    generateRealtimeUpdate
} from '@/config/dashboardData';

export function useDashboard() {
    const [metrics, setMetrics] = useState<DashboardMetrics>(dashboardMetrics);
    const [filters, setFilters] = useState<DashboardFilters>({
        dateRange: {
            start: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
            end: new Date().toISOString().split('T')[0],
            preset: 'last30days'
        },
        metrics: ['overview', 'projects', 'blog', 'playground'],
        granularity: 'day'
    });
    const [config, setConfig] = useState<DashboardConfig>({
        refreshInterval: 30000, // 30 segundos
        autoRefresh: true,
        widgets: [],
        theme: 'auto'
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

    // Função para buscar dados (simulada)
    const fetchDashboardData = useCallback(async () => {
        setIsLoading(true);
        setError(null);

        try {
            // Simular delay de API
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Em uma aplicação real, aqui seria feita a chamada para APIs
            // const response = await fetch('/api/dashboard', { 
            //   method: 'POST',
            //   body: JSON.stringify(filters)
            // });

            // Simular pequenas variações nos dados
            const updatedMetrics = {
                ...dashboardMetrics,
                overview: {
                    ...dashboardMetrics.overview,
                    totalVisitors: dashboardMetrics.overview.totalVisitors + Math.floor(Math.random() * 10),
                    totalPageViews: dashboardMetrics.overview.totalPageViews + Math.floor(Math.random() * 50),
                    lastUpdated: new Date().toISOString()
                }
            };

            setMetrics(updatedMetrics);
            setLastUpdated(new Date());
        } catch (err) {
            setError('Erro ao carregar dados do dashboard');
            console.error('Dashboard data fetch error:', err);
        } finally {
            setIsLoading(false);
        }
    }, []);

    // Função para atualizar filtros
    const updateFilters = useCallback((newFilters: Partial<DashboardFilters>) => {
        setFilters(prev => ({
            ...prev,
            ...newFilters
        }));
    }, []);

    // Função para definir preset de data
    const setDatePreset = useCallback((preset: DashboardFilters['dateRange']['preset']) => {
        const now = new Date();
        let start: Date;

        switch (preset) {
            case 'last7days':
                start = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
                break;
            case 'last30days':
                start = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
                break;
            case 'last3months':
                start = new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000);
                break;
            case 'lastyear':
                start = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);
                break;
            default:
                return;
        }

        updateFilters({
            dateRange: {
                start: start.toISOString().split('T')[0],
                end: now.toISOString().split('T')[0],
                preset
            }
        });
    }, [updateFilters]);

    // Função para atualizar configurações
    const updateConfig = useCallback((newConfig: Partial<DashboardConfig>) => {
        setConfig(prev => ({
            ...prev,
            ...newConfig
        }));
    }, []);

    // Função para toggle de métrica
    const toggleMetric = useCallback((metric: string) => {
        setFilters(prev => ({
            ...prev,
            metrics: prev.metrics.includes(metric)
                ? prev.metrics.filter(m => m !== metric)
                : [...prev.metrics, metric]
        }));
    }, []);

    // Dados computados
    const computedData = useMemo(() => {
        // Calcular variações e tendências
        const totalVisitors = metrics.overview.totalVisitors;
        const totalViews = metrics.projects.totalViews + metrics.blog.totalViews + metrics.playground.totalViews;
        const totalEngagement = metrics.projects.totalLikes + metrics.blog.totalLikes + metrics.playground.totalLikes;

        // Calcular score geral do portfólio
        const portfolioScore = Math.round(
            (metrics.performance.performanceScore +
                metrics.overview.conversionRate * 10 +
                metrics.engagement.retentionRate +
                (100 - metrics.overview.bounceRate)) / 4
        );

        // Top performing content
        const topContent = [
            {
                type: 'project',
                title: metrics.projects.mostViewedProject.title,
                views: metrics.projects.mostViewedProject.views,
                engagement: metrics.projects.totalLikes
            },
            {
                type: 'blog',
                title: metrics.blog.mostPopularPost.title,
                views: metrics.blog.mostPopularPost.views,
                engagement: metrics.blog.mostPopularPost.likes
            },
            {
                type: 'playground',
                title: metrics.playground.mostPopularExample.title,
                views: metrics.playground.mostPopularExample.views,
                engagement: metrics.playground.mostPopularExample.likes
            }
        ].sort((a, b) => b.views - a.views);

        // Alertas e insights
        const alerts: Array<{
            type: 'warning' | 'error' | 'info';
            message: string;
            metric: string;
        }> = [];
        if (metrics.overview.bounceRate > 40) {
            alerts.push({
                type: 'warning',
                message: 'Taxa de rejeição alta - considere melhorar o conteúdo da landing page',
                metric: 'bounceRate'
            });
        }
        if (metrics.performance.pageLoadTime > 3) {
            alerts.push({
                type: 'error',
                message: 'Tempo de carregamento muito alto - otimização necessária',
                metric: 'performance'
            });
        }
        if (metrics.contact.responseRate < 90) {
            alerts.push({
                type: 'warning',
                message: 'Taxa de resposta baixa - melhorar agilidade no atendimento',
                metric: 'response'
            });
        }

        return {
            totalVisitors,
            totalViews,
            totalEngagement,
            portfolioScore,
            topContent,
            alerts
        };
    }, [metrics]);

    // Auto-refresh
    useEffect(() => {
        if (!config.autoRefresh) return;

        const interval = setInterval(() => {
            // Simular atualizações em tempo real
            const realtimeUpdate = generateRealtimeUpdate();

            setMetrics(prev => ({
                ...prev,
                overview: {
                    ...prev.overview,
                    totalVisitors: prev.overview.totalVisitors + (realtimeUpdate.newMessages ? 1 : 0),
                    totalPageViews: prev.overview.totalPageViews + realtimeUpdate.pageViews
                }
            }));

            setLastUpdated(new Date());
        }, config.refreshInterval);

        return () => clearInterval(interval);
    }, [config.autoRefresh, config.refreshInterval]);

    // Fetch inicial
    useEffect(() => {
        fetchDashboardData();
    }, [fetchDashboardData]);

    // Função para exportar dados
    const exportData = useCallback((format: 'json' | 'csv' | 'pdf') => {
        const dataToExport = {
            metrics,
            filters,
            generatedAt: new Date().toISOString(),
            period: `${filters.dateRange.start} to ${filters.dateRange.end}`
        };

        switch (format) {
            case 'json':
                const jsonBlob = new Blob([JSON.stringify(dataToExport, null, 2)],
                    { type: 'application/json' });
                const jsonUrl = URL.createObjectURL(jsonBlob);
                const jsonLink = document.createElement('a');
                jsonLink.href = jsonUrl;
                jsonLink.download = `dashboard-data-${new Date().toISOString().split('T')[0]}.json`;
                jsonLink.click();
                break;

            case 'csv':
                // Converter métricas principais para CSV
                const csvData = [
                    ['Metric', 'Value', 'Change'],
                    ['Total Visitors', metrics.overview.totalVisitors, '+12.4%'],
                    ['Page Views', metrics.overview.totalPageViews, '+8.7%'],
                    ['Conversion Rate', `${metrics.overview.conversionRate}%`, '+3.2%'],
                    ['Bounce Rate', `${metrics.overview.bounceRate}%`, '-5.1%'],
                    ['Performance Score', metrics.performance.performanceScore, '+2.1%']
                ].map(row => row.join(',')).join('\n');

                const csvBlob = new Blob([csvData], { type: 'text/csv' });
                const csvUrl = URL.createObjectURL(csvBlob);
                const csvLink = document.createElement('a');
                csvLink.href = csvUrl;
                csvLink.download = `dashboard-metrics-${new Date().toISOString().split('T')[0]}.csv`;
                csvLink.click();
                break;

            case 'pdf':
                // Em uma aplicação real, usar biblioteca como jsPDF
                alert('Exportação PDF será implementada com jsPDF');
                break;
        }
    }, [metrics, filters]);

    // Função para compartilhar insights
    const shareInsight = useCallback((insight: string) => {
        if (navigator.share) {
            navigator.share({
                title: 'Portfolio Dashboard Insight',
                text: insight,
                url: window.location.href
            });
        } else {
            navigator.clipboard.writeText(`${insight}\n\n${window.location.href}`);
            alert('Insight copiado para a área de transferência!');
        }
    }, []);

    return {
        // Estado
        metrics,
        filters,
        config,
        isLoading,
        error,
        lastUpdated,

        // Dados computados
        computedData,
        metricCards,
        goals,

        // Ações
        fetchDashboardData,
        updateFilters,
        updateConfig,
        setDatePreset,
        toggleMetric,
        exportData,
        shareInsight,

        // Utilitários
        refresh: fetchDashboardData,
        toggleAutoRefresh: () => updateConfig({ autoRefresh: !config.autoRefresh })
    };
}
