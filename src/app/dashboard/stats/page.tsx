/**
 * Página principal do dashboard de estatísticas
 */

'use client';

import { useState } from 'react';
import { useDashboard } from '@/hooks/useDashboard';
import { MetricCard } from '@/models/Dashboard';
import StatsOverview from '@/components/dashboard/StatsPanel';
import {
    LineChart,
    BarChart,
    PieChart,
    AreaChart
} from '@/components/dashboard/Charts';

export default function DashboardPage() {
    const {
        metrics,
        filters,
        config,
        isLoading,
        error,
        lastUpdated,
        computedData,
        metricCards,
        goals,
        fetchDashboardData,
        setDatePreset,
        exportData,
        shareInsight,
        toggleAutoRefresh
    } = useDashboard();

    const [activeTab, setActiveTab] = useState<'overview' | 'analytics' | 'performance' | 'goals'>('overview');

    // Handle metric card click
    const handleMetricCardClick = (card: MetricCard) => {
        shareInsight(`📊 ${card.title}: ${card.value} (${card.change > 0 ? '+' : ''}${card.change}%)`);
    };

    // Date preset options
    const datePresets = [
        { id: 'last7days' as const, label: 'Últimos 7 dias', icon: '📅' },
        { id: 'last30days' as const, label: 'Últimos 30 dias', icon: '📆' },
        { id: 'last3months' as const, label: 'Últimos 3 meses', icon: '🗓️' },
        { id: 'lastyear' as const, label: 'Último ano', icon: '📊' }
    ];

    // Tab configuration
    const tabs = [
        { id: 'overview', label: 'Visão Geral', icon: '📊' },
        { id: 'analytics', label: 'Analytics', icon: '📈' },
        { id: 'performance', label: 'Performance', icon: '⚡' },
        { id: 'goals', label: 'Metas', icon: '🎯' }
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex items-center gap-4">
                            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                                <span className="text-3xl">📊</span>
                                Dashboard
                            </h1>

                            {isLoading && (
                                <div className="flex items-center gap-2 text-sm text-gray-500">
                                    <div className="animate-spin w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full"></div>
                                    Atualizando...
                                </div>
                            )}
                        </div>

                        <div className="flex items-center gap-4">
                            {/* Auto-refresh toggle */}
                            <button
                                onClick={toggleAutoRefresh}
                                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${config.autoRefresh
                                    ? 'bg-green-100 text-green-700 hover:bg-green-200'
                                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                    }`}
                            >
                                <span className={`w-2 h-2 rounded-full ${config.autoRefresh ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}></span>
                                Auto-refresh
                            </button>

                            {/* Date presets */}
                            <div className="flex items-center gap-2">
                                {datePresets.map(preset => (
                                    <button
                                        key={preset.id}
                                        onClick={() => setDatePreset(preset.id)}
                                        className={`px-3 py-2 text-sm rounded-lg transition-colors ${filters.dateRange.preset === preset.id
                                            ? 'bg-blue-100 text-blue-700'
                                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                            }`}
                                    >
                                        {preset.icon} {preset.label}
                                    </button>
                                ))}
                            </div>

                            {/* Export options */}
                            <div className="relative">
                                <select
                                    onChange={(e) => {
                                        if (e.target.value) {
                                            exportData(e.target.value as 'json' | 'csv' | 'pdf');
                                            e.target.value = '';
                                        }
                                    }}
                                    className="px-3 py-2 bg-gray-100 border border-gray-300 rounded-lg text-sm"
                                    defaultValue=""
                                >
                                    <option value="" disabled>📤 Exportar</option>
                                    <option value="json">JSON</option>
                                    <option value="csv">CSV</option>
                                    <option value="pdf">PDF</option>
                                </select>
                            </div>

                            {/* Refresh button */}
                            <button
                                onClick={fetchDashboardData}
                                disabled={isLoading}
                                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 transition-colors"
                            >
                                🔄 Atualizar
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Navigation Tabs */}
            <nav className="bg-white border-b border-gray-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex space-x-8">
                        {tabs.map(tab => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id as 'overview' | 'analytics' | 'performance' | 'goals')}
                                className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${activeTab === tab.id
                                    ? 'border-blue-500 text-blue-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                    }`}
                            >
                                <span className="flex items-center gap-2">
                                    {tab.icon} {tab.label}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>
            </nav>

            {/* Main Content */}
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {error && (
                    <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
                        <div className="flex items-center gap-3">
                            <span className="text-2xl">⚠️</span>
                            <div>
                                <h3 className="font-semibold text-red-800">Erro ao carregar dados</h3>
                                <p className="text-sm text-red-600">{error}</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Last updated info */}
                <div className="mb-6 text-sm text-gray-500 flex items-center gap-2">
                    <span>⏱️</span>
                    Última atualização: {lastUpdated.toLocaleString('pt-BR')}
                </div>

                {/* Tab Content */}
                {activeTab === 'overview' && (
                    <StatsOverview
                        metrics={metrics}
                        computedData={computedData}
                        metricCards={metricCards}
                        onCardClick={handleMetricCardClick}
                    />
                )}

                {activeTab === 'analytics' && (
                    <div className="space-y-8">
                        {/* Traffic Analytics */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                    📈 Visualizações ao Longo do Tempo
                                </h3>
                                <LineChart
                                    data={metrics.projects.viewsOverTime}
                                    width={400}
                                    height={250}
                                />
                            </div>

                            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                    🌍 Fontes de Tráfego
                                </h3>
                                <PieChart
                                    data={metrics.traffic.sources}
                                    width={350}
                                    height={250}
                                />
                            </div>
                        </div>

                        {/* Technology Usage */}
                        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                💻 Tecnologias Mais Utilizadas
                            </h3>
                            <BarChart
                                data={metrics.projects.technologiesUsed}
                                width={800}
                                height={300}
                            />
                        </div>

                        {/* Device and Browser Stats */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                    📱 Dispositivos
                                </h3>
                                <BarChart
                                    data={metrics.traffic.devices}
                                    width={350}
                                    height={200}
                                />
                            </div>

                            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                    🌐 Navegadores
                                </h3>
                                <BarChart
                                    data={metrics.traffic.browsers}
                                    width={350}
                                    height={200}
                                />
                            </div>
                        </div>

                        {/* Geographic Distribution */}
                        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                🗺️ Visitantes por País
                            </h3>
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                                {metrics.traffic.countries.map((country, index) => (
                                    <div key={index} className="text-center p-3 bg-gray-50 rounded-lg">
                                        <div className="text-2xl mb-2">{country.flag}</div>
                                        <div className="font-semibold text-gray-900">{country.visitors.toLocaleString()}</div>
                                        <div className="text-sm text-gray-600">{country.country}</div>
                                        <div className="text-xs text-gray-500">{country.percentage}%</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Peak Hours Heatmap */}
                        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                🕒 Horários de Pico
                            </h3>
                            <AreaChart
                                data={metrics.traffic.peakHours}
                                width={800}
                                height={200}
                            />
                        </div>
                    </div>
                )}

                {activeTab === 'performance' && (
                    <div className="space-y-8">
                        {/* Lighthouse Scores */}
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                            {Object.entries(metrics.performance.lighthouse).map(([key, score]) => (
                                <div key={key} className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm text-center">
                                    <div className="text-3xl font-bold text-gray-900 mb-2">
                                        {score}
                                    </div>
                                    <div className="text-sm text-gray-600 capitalize">
                                        {key.replace(/([A-Z])/g, ' $1')}
                                    </div>
                                    <div className="mt-3 bg-gray-200 rounded-full h-2">
                                        <div
                                            className="bg-blue-500 rounded-full h-2 transition-all duration-500"
                                            style={{ width: `${score}%` }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Core Web Vitals */}
                        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                ⚡ Core Web Vitals
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="text-center">
                                    <div className="text-2xl font-bold text-green-600 mb-2">
                                        {metrics.performance.coreWebVitals.lcp}s
                                    </div>
                                    <div className="text-sm text-gray-600">
                                        Largest Contentful Paint
                                    </div>
                                    <div className="text-xs text-green-600 mt-1">✅ Bom</div>
                                </div>

                                <div className="text-center">
                                    <div className="text-2xl font-bold text-green-600 mb-2">
                                        {metrics.performance.coreWebVitals.fid}ms
                                    </div>
                                    <div className="text-sm text-gray-600">
                                        First Input Delay
                                    </div>
                                    <div className="text-xs text-green-600 mt-1">✅ Bom</div>
                                </div>

                                <div className="text-center">
                                    <div className="text-2xl font-bold text-green-600 mb-2">
                                        {metrics.performance.coreWebVitals.cls}
                                    </div>
                                    <div className="text-sm text-gray-600">
                                        Cumulative Layout Shift
                                    </div>
                                    <div className="text-xs text-green-600 mt-1">✅ Bom</div>
                                </div>
                            </div>
                        </div>

                        {/* Detailed Performance Metrics */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                                <h4 className="font-semibold text-gray-900 mb-4">Métricas de Carregamento</h4>
                                <div className="space-y-3">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Page Load Time</span>
                                        <span className="font-medium">{metrics.performance.pageLoadTime}s</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">First Contentful Paint</span>
                                        <span className="font-medium">{metrics.performance.firstContentfulPaint}s</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Time to Interactive</span>
                                        <span className="font-medium">2.4s</span>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                                <h4 className="font-semibold text-gray-900 mb-4">Otimizações Sugeridas</h4>
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2 text-sm">
                                        <span className="text-green-500">✅</span>
                                        <span>Compressão de imagens otimizada</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm">
                                        <span className="text-green-500">✅</span>
                                        <span>Cache de recursos configurado</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm">
                                        <span className="text-yellow-500">⚠️</span>
                                        <span>Considerar lazy loading para imagens</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm">
                                        <span className="text-green-500">✅</span>
                                        <span>CSS e JS minificados</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'goals' && (
                    <div className="space-y-8">
                        {/* Goals Overview */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {goals.map(goal => {
                                const getStatusColor = (status: string) => {
                                    switch (status) {
                                        case 'completed': return 'bg-green-100 text-green-800 border-green-200';
                                        case 'on-track': return 'bg-blue-100 text-blue-800 border-blue-200';
                                        case 'at-risk': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
                                        case 'behind': return 'bg-red-100 text-red-800 border-red-200';
                                        default: return 'bg-gray-100 text-gray-800 border-gray-200';
                                    }
                                };

                                const getStatusIcon = (status: string) => {
                                    switch (status) {
                                        case 'completed': return '✅';
                                        case 'on-track': return '🎯';
                                        case 'at-risk': return '⚠️';
                                        case 'behind': return '🚨';
                                        default: return '📊';
                                    }
                                };

                                return (
                                    <div key={goal.id} className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                                        <div className="flex items-center justify-between mb-4">
                                            <h3 className="font-semibold text-gray-900">{goal.title}</h3>
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(goal.status)}`}>
                                                {getStatusIcon(goal.status)} {goal.status.replace('-', ' ')}
                                            </span>
                                        </div>

                                        <div className="mb-4">
                                            <div className="flex justify-between text-sm text-gray-600 mb-2">
                                                <span>Progresso</span>
                                                <span>{goal.percentage}%</span>
                                            </div>
                                            <div className="bg-gray-200 rounded-full h-3">
                                                <div
                                                    className={`rounded-full h-3 transition-all duration-500 ${goal.status === 'completed' ? 'bg-green-500' :
                                                        goal.status === 'on-track' ? 'bg-blue-500' :
                                                            goal.status === 'at-risk' ? 'bg-yellow-500' :
                                                                'bg-red-500'
                                                        }`}
                                                    style={{ width: `${Math.min(goal.percentage, 100)}%` }}
                                                />
                                            </div>
                                        </div>

                                        <div className="text-sm text-gray-600 mb-2">
                                            {goal.current.toLocaleString()} / {goal.target.toLocaleString()}
                                        </div>

                                        <div className="text-xs text-gray-500 mb-3">
                                            Prazo: {new Date(goal.deadline).toLocaleDateString('pt-BR')}
                                        </div>

                                        <p className="text-sm text-gray-600">
                                            {goal.description}
                                        </p>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Goals Progress Chart */}
                        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                📊 Progresso das Metas
                            </h3>
                            <BarChart
                                data={goals.map(goal => ({
                                    name: goal.title,
                                    value: goal.percentage,
                                    color: goal.status === 'completed' ? '#10B981' :
                                        goal.status === 'on-track' ? '#3B82F6' :
                                            goal.status === 'at-risk' ? '#F59E0B' : '#EF4444'
                                }))}
                                width={800}
                                height={300}
                            />
                        </div>

                        {/* Goal Insights */}
                        <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                                💡 Insights e Recomendações
                            </h3>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                                <div>
                                    <h4 className="font-medium text-gray-900 mb-3">🎯 Metas no Prazo</h4>
                                    <ul className="space-y-2">
                                        {goals.filter(g => g.status === 'on-track' || g.status === 'completed').map(goal => (
                                            <li key={goal.id} className="flex items-center gap-2 text-sm text-gray-600">
                                                <span className="text-green-500">✅</span>
                                                {goal.title} ({goal.percentage}%)
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                <div>
                                    <h4 className="font-medium text-gray-900 mb-3">⚠️ Requer Atenção</h4>
                                    <ul className="space-y-2">
                                        {goals.filter(g => g.status === 'at-risk' || g.status === 'behind').map(goal => (
                                            <li key={goal.id} className="flex items-center gap-2 text-sm text-gray-600">
                                                <span className="text-yellow-500">⚠️</span>
                                                {goal.title} ({goal.percentage}%)
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
