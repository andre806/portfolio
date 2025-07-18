/**
 * Componente do painel de estatísticas do dashboard
 */

'use client';

import { useMemo } from 'react';
import { DashboardMetrics, MetricCard } from '@/models/Dashboard';

interface StatsCardProps {
    card: MetricCard;
    onClick?: () => void;
}

function StatsCard({ card, onClick }: StatsCardProps) {
    const getColorClasses = (color: string) => {
        const colors = {
            blue: 'bg-blue-500 text-blue-100 border-blue-400',
            green: 'bg-green-500 text-green-100 border-green-400',
            purple: 'bg-purple-500 text-purple-100 border-purple-400',
            yellow: 'bg-yellow-500 text-yellow-100 border-yellow-400',
            pink: 'bg-pink-500 text-pink-100 border-pink-400',
            orange: 'bg-orange-500 text-orange-100 border-orange-400',
            teal: 'bg-teal-500 text-teal-100 border-teal-400',
            indigo: 'bg-indigo-500 text-indigo-100 border-indigo-400'
        };
        return colors[color as keyof typeof colors] || colors.blue;
    };

    const getChangeIcon = () => {
        if (card.changeType === 'increase') return '📈';
        if (card.changeType === 'decrease') return '📉';
        return '➡️';
    };

    const getChangeColor = () => {
        if (card.changeType === 'increase') return 'text-green-600';
        if (card.changeType === 'decrease') return 'text-red-600';
        return 'text-gray-600';
    };

    return (
        <div
            className={`relative overflow-hidden rounded-xl p-6 border-2 transition-all duration-300 hover:scale-105 hover:shadow-lg ${onClick ? 'cursor-pointer' : ''
                } ${getColorClasses(card.color)}`}
            onClick={onClick}
        >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute -right-4 -top-4 text-6xl">
                    {card.icon}
                </div>
            </div>

            {/* Content */}
            <div className="relative z-10">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium opacity-90">
                        {card.title}
                    </span>
                    <span className="text-2xl">
                        {card.icon}
                    </span>
                </div>

                <div className="mb-2">
                    <span className="text-3xl font-bold">
                        {card.value}
                    </span>
                </div>

                <div className="flex items-center justify-between">
                    <div className={`flex items-center gap-1 text-sm ${getChangeColor()}`}>
                        <span>{getChangeIcon()}</span>
                        <span className="font-medium">
                            {Math.abs(card.change)}%
                        </span>
                    </div>

                    {card.trend && (
                        <div className="flex items-end gap-1 h-6">
                            {card.trend.map((point, index) => (
                                <div
                                    key={index}
                                    className="w-1 bg-white bg-opacity-60 rounded-sm"
                                    style={{
                                        height: `${Math.max(10, (point.value / Math.max(...card.trend!.map(p => p.value))) * 100)}%`
                                    }}
                                />
                            ))}
                        </div>
                    )}
                </div>

                {card.description && (
                    <p className="text-xs opacity-75 mt-2">
                        {card.description}
                    </p>
                )}
            </div>
        </div>
    );
}

interface QuickStatsProps {
    metrics: DashboardMetrics;
}

function QuickStats({ metrics }: QuickStatsProps) {
    const quickMetrics = useMemo(() => [
        {
            label: 'Visitantes Online',
            value: '89',
            icon: '🟢',
            change: '+12',
            description: 'Usuários ativos agora'
        },
        {
            label: 'Sessões Hoje',
            value: '245',
            icon: '📊',
            change: '+18%',
            description: 'vs ontem'
        },
        {
            label: 'Tempo Médio',
            value: '3m 5s',
            icon: '⏱️',
            change: '+23s',
            description: 'Duração da sessão'
        },
        {
            label: 'Taxa de Conversão',
            value: `${metrics.overview.conversionRate}%`,
            icon: '🎯',
            change: '+0.3%',
            description: 'Últimas 24h'
        }
    ], [metrics]);

    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {quickMetrics.map((metric, index) => (
                <div
                    key={index}
                    className="bg-white rounded-lg p-4 border border-gray-200 shadow-sm"
                >
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-2xl">{metric.icon}</span>
                        <span className="text-xs text-green-600 font-medium">
                            {metric.change}
                        </span>
                    </div>

                    <div className="mb-1">
                        <span className="text-xl font-bold text-gray-900">
                            {metric.value}
                        </span>
                    </div>

                    <div className="text-sm text-gray-600">
                        {metric.label}
                    </div>

                    <div className="text-xs text-gray-500 mt-1">
                        {metric.description}
                    </div>
                </div>
            ))}
        </div>
    );
}

interface TopContentProps {
    topContent: Array<{
        type: string;
        title: string;
        views: number;
        engagement: number;
    }>;
}

function TopContent({ topContent }: TopContentProps) {
    const getTypeIcon = (type: string) => {
        const icons = {
            project: '🚀',
            blog: '📝',
            playground: '🛝'
        };
        return icons[type as keyof typeof icons] || '📄';
    };

    const getTypeColor = (type: string) => {
        const colors = {
            project: 'bg-blue-100 text-blue-800',
            blog: 'bg-purple-100 text-purple-800',
            playground: 'bg-green-100 text-green-800'
        };
        return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-800';
    };

    return (
        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                🏆 Top Performing Content
            </h3>

            <div className="space-y-4">
                {topContent.map((content, index) => (
                    <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                    >
                        <div className="flex items-center gap-3">
                            <div className="text-2xl">
                                {getTypeIcon(content.type)}
                            </div>

                            <div>
                                <h4 className="font-medium text-gray-900 line-clamp-1">
                                    {content.title}
                                </h4>
                                <div className="flex items-center gap-2 mt-1">
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(content.type)}`}>
                                        {content.type}
                                    </span>
                                    <span className="text-xs text-gray-500">
                                        #{index + 1} mais visualizado
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="text-right">
                            <div className="text-lg font-bold text-gray-900">
                                {content.views.toLocaleString()}
                            </div>
                            <div className="text-xs text-gray-500">
                                {content.engagement} engagements
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

interface AlertsProps {
    alerts: Array<{
        type: 'warning' | 'error' | 'info';
        message: string;
        metric: string;
    }>;
}

function Alerts({ alerts }: AlertsProps) {
    if (alerts.length === 0) {
        return (
            <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                <div className="flex items-center gap-3">
                    <span className="text-2xl">✅</span>
                    <div>
                        <h3 className="font-semibold text-green-800">
                            Tudo funcionando perfeitamente!
                        </h3>
                        <p className="text-sm text-green-600">
                            Não há alertas ou problemas detectados no momento.
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    const getAlertStyle = (type: string) => {
        const styles = {
            error: 'bg-red-50 border-red-200 text-red-800',
            warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
            info: 'bg-blue-50 border-blue-200 text-blue-800'
        };
        return styles[type as keyof typeof styles] || styles.info;
    };

    const getAlertIcon = (type: string) => {
        const icons = {
            error: '🚨',
            warning: '⚠️',
            info: 'ℹ️'
        };
        return icons[type as keyof typeof icons] || icons.info;
    };

    return (
        <div className="space-y-3">
            <h3 className="text-lg font-semibold text-gray-900 flex items-center gap-2">
                🔔 Alertas e Insights
            </h3>

            {alerts.map((alert, index) => (
                <div
                    key={index}
                    className={`border rounded-lg p-4 ${getAlertStyle(alert.type)}`}
                >
                    <div className="flex items-start gap-3">
                        <span className="text-xl">
                            {getAlertIcon(alert.type)}
                        </span>
                        <div className="flex-1">
                            <p className="font-medium">
                                {alert.message}
                            </p>
                            <p className="text-sm opacity-75 mt-1">
                                Métrica: {alert.metric}
                            </p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

interface ComputedData {
    portfolioScore: number;
    topContent: Array<{
        type: string;
        title: string;
        views: number;
        engagement: number;
    }>;
    alerts: Array<{
        type: 'warning' | 'error' | 'info';
        message: string;
        metric: string;
    }>;
    totalVisitors: number;
    totalViews: number;
    totalEngagement: number;
}

interface StatsOverviewProps {
    metrics: DashboardMetrics;
    computedData: ComputedData;
    metricCards: MetricCard[];
    onCardClick?: (card: MetricCard) => void;
}

export default function StatsOverview({
    metrics,
    computedData,
    metricCards,
    onCardClick
}: StatsOverviewProps) {
    return (
        <div className="space-y-8">
            {/* Quick Stats */}
            <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    ⚡ Status em Tempo Real
                </h2>
                <QuickStats metrics={metrics} />
            </div>

            {/* Main Metric Cards */}
            <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    📊 Métricas Principais
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {metricCards.map((card, index) => (
                        <StatsCard
                            key={index}
                            card={card}
                            onClick={() => onCardClick?.(card)}
                        />
                    ))}
                </div>
            </div>

            {/* Portfolio Score */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white">
                <div className="flex items-center justify-between">
                    <div>
                        <h3 className="text-lg font-semibold mb-2">
                            Portfolio Performance Score
                        </h3>
                        <p className="text-blue-100">
                            Score geral baseado em performance, conversão e engajamento
                        </p>
                    </div>

                    <div className="text-center">
                        <div className="text-4xl font-bold mb-2">
                            {computedData.portfolioScore}
                        </div>
                        <div className="text-sm text-blue-100">
                            de 100 pontos
                        </div>
                    </div>
                </div>

                <div className="mt-4 bg-white bg-opacity-20 rounded-full h-3">
                    <div
                        className="bg-white rounded-full h-3 transition-all duration-500"
                        style={{ width: `${computedData.portfolioScore}%` }}
                    />
                </div>
            </div>

            {/* Two Column Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Top Content */}
                <TopContent topContent={computedData.topContent} />

                {/* Alerts */}
                <div>
                    <Alerts alerts={computedData.alerts} />
                </div>
            </div>

            {/* Summary Stats */}
            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    📈 Resumo Executivo
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                        <div className="text-3xl font-bold text-blue-600 mb-2">
                            {computedData.totalVisitors.toLocaleString()}
                        </div>
                        <div className="text-sm text-gray-600">
                            Total de Visitantes
                        </div>
                    </div>

                    <div className="text-center">
                        <div className="text-3xl font-bold text-green-600 mb-2">
                            {computedData.totalViews.toLocaleString()}
                        </div>
                        <div className="text-sm text-gray-600">
                            Visualizações de Conteúdo
                        </div>
                    </div>

                    <div className="text-center">
                        <div className="text-3xl font-bold text-purple-600 mb-2">
                            {computedData.totalEngagement.toLocaleString()}
                        </div>
                        <div className="text-sm text-gray-600">
                            Total de Engajamento
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
