/**
 * Componente da sidebar do playground
 */

'use client';

import { useState } from 'react';
import { CodeExample, Difficulty, PlaygroundFilters, PlaygroundStats } from '@/models/CodeExample';

interface PlaygroundSidebarProps {
    examples: CodeExample[];
    activeExample: CodeExample | null;
    categories: string[];
    popularTags: string[];
    filters: PlaygroundFilters;
    onSelectExample: (example: CodeExample) => void;
    onFilterChange: (filters: Partial<PlaygroundFilters>) => void;
    onClearFilters: () => void;
    onCreateNew: (templateId: string) => void;
    stats: PlaygroundStats;
}

function PlaygroundSidebar({
    examples,
    activeExample,
    categories,
    popularTags,
    filters,
    onSelectExample,
    onFilterChange,
    onClearFilters,
    onCreateNew,
    stats
}: PlaygroundSidebarProps) {
    const [activeTab, setActiveTab] = useState<'examples' | 'filters' | 'stats'>('examples');
    const [searchTerm, setSearchTerm] = useState(filters.search || '');

    // Aplicar busca
    const handleSearch = (term: string) => {
        setSearchTerm(term);
        onFilterChange({ search: term || undefined });
    };

    // Aplicar filtro
    const handleFilterChange = (key: keyof PlaygroundFilters, value: string | boolean | string[] | undefined) => {
        onFilterChange({ [key]: value === filters[key] ? undefined : value });
    };

    // Tabs
    const tabs = [
        { id: 'examples', label: 'Exemplos', icon: '📝', count: examples.length },
        { id: 'filters', label: 'Filtros', icon: '🔍', count: Object.keys(filters).length },
        { id: 'stats', label: 'Estatísticas', icon: '📊', count: null }
    ];

    return (
        <div className="h-full bg-white border-r border-gray-200 flex flex-col">
            {/* Header com tabs */}
            <div className="border-b border-gray-200">
                <div className="flex">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as 'examples' | 'filters' | 'stats')}
                            className={`flex-1 px-3 py-2 text-sm font-medium border-b-2 transition-colors ${activeTab === tab.id
                                ? 'border-blue-500 text-blue-600 bg-blue-50'
                                : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                                }`}
                        >
                            <div className="flex items-center justify-center gap-1">
                                <span>{tab.icon}</span>
                                <span className="hidden sm:inline">{tab.label}</span>
                                {tab.count !== null && (
                                    <span className="bg-gray-200 text-gray-600 text-xs px-1.5 py-0.5 rounded-full">
                                        {tab.count}
                                    </span>
                                )}
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto">
                {/* Tab: Examples */}
                {activeTab === 'examples' && (
                    <div className="p-4">
                        {/* Search */}
                        <div className="mb-4">
                            <div className="relative">
                                <input
                                    type="text"
                                    value={searchTerm}
                                    onChange={(e) => handleSearch(e.target.value)}
                                    placeholder="Buscar exemplos..."
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <span className="text-gray-400">🔍</span>
                                </div>
                                {searchTerm && (
                                    <button
                                        onClick={() => handleSearch('')}
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                                    >
                                        ✕
                                    </button>
                                )}
                            </div>
                        </div>

                        {/* Quick Actions */}
                        <div className="mb-4">
                            <h3 className="text-sm font-semibold text-gray-700 mb-2">Ações Rápidas</h3>
                            <div className="space-y-2">
                                <button
                                    onClick={() => onCreateNew('react-component')}
                                    className="w-full px-3 py-2 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                                >
                                    + Novo React Component
                                </button>
                                <button
                                    onClick={() => onCreateNew('html-page')}
                                    className="w-full px-3 py-2 text-sm bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                                >
                                    + Nova Página HTML
                                </button>
                            </div>
                        </div>

                        {/* Examples List */}
                        <div>
                            <div className="flex items-center justify-between mb-3">
                                <h3 className="text-sm font-semibold text-gray-700">
                                    Exemplos ({examples.length})
                                </h3>
                                {Object.keys(filters).length > 0 && (
                                    <button
                                        onClick={onClearFilters}
                                        className="text-xs text-blue-600 hover:text-blue-800"
                                    >
                                        Limpar filtros
                                    </button>
                                )}
                            </div>

                            <div className="space-y-2">
                                {examples.map(example => (
                                    <div
                                        key={example.id}
                                        onClick={() => onSelectExample(example)}
                                        className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${activeExample?.id === example.id
                                            ? 'border-blue-500 bg-blue-50'
                                            : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                                            }`}
                                    >
                                        <div className="flex items-start justify-between mb-2">
                                            <h4 className="font-medium text-sm text-gray-900 line-clamp-2">
                                                {example.title}
                                            </h4>
                                            {example.featured && (
                                                <span className="text-yellow-500 text-sm">⭐</span>
                                            )}
                                        </div>

                                        <p className="text-xs text-gray-600 mb-2 line-clamp-2">
                                            {example.description}
                                        </p>

                                        <div className="flex items-center justify-between text-xs">
                                            <div className="flex items-center gap-2">
                                                <span className={`px-2 py-1 rounded-full text-xs ${example.difficulty === 'beginner' ? 'bg-green-100 text-green-700' :
                                                    example.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-700' :
                                                        'bg-red-100 text-red-700'
                                                    }`}>
                                                    {example.difficulty}
                                                </span>
                                                <span className="text-gray-500">{example.framework}</span>
                                            </div>

                                            <div className="flex items-center gap-2 text-gray-500">
                                                <span>👁 {example.stats.views}</span>
                                                <span>❤️ {example.stats.likes}</span>
                                            </div>
                                        </div>

                                        <div className="flex flex-wrap gap-1 mt-2">
                                            {example.tags.slice(0, 3).map(tag => (
                                                <span
                                                    key={tag}
                                                    className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                            {example.tags.length > 3 && (
                                                <span className="text-xs text-gray-500">
                                                    +{example.tags.length - 3}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                ))}

                                {examples.length === 0 && (
                                    <div className="text-center py-8 text-gray-500">
                                        <div className="text-4xl mb-2">🔍</div>
                                        <p>Nenhum exemplo encontrado</p>
                                        <p className="text-xs mt-1">Tente ajustar os filtros</p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}

                {/* Tab: Filters */}
                {activeTab === 'filters' && (
                    <div className="p-4 space-y-6">
                        {/* Category Filter */}
                        <div>
                            <h3 className="text-sm font-semibold text-gray-700 mb-3">Categoria</h3>
                            <div className="space-y-2">
                                {categories.map(category => (
                                    <label key={category} className="flex items-center">
                                        <input
                                            type="radio"
                                            name="category"
                                            checked={filters.category === category}
                                            onChange={() => handleFilterChange('category', category)}
                                            className="mr-2"
                                        />
                                        <span className="text-sm text-gray-600">{category}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Framework Filter */}
                        <div>
                            <h3 className="text-sm font-semibold text-gray-700 mb-3">Framework</h3>
                            <div className="space-y-2">
                                {['react', 'vanilla', 'next', 'node'].map(framework => (
                                    <label key={framework} className="flex items-center">
                                        <input
                                            type="radio"
                                            name="framework"
                                            checked={filters.framework === framework}
                                            onChange={() => handleFilterChange('framework', framework)}
                                            className="mr-2"
                                        />
                                        <span className="text-sm text-gray-600 capitalize">{framework}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Difficulty Filter */}
                        <div>
                            <h3 className="text-sm font-semibold text-gray-700 mb-3">Dificuldade</h3>
                            <div className="space-y-2">
                                {(['beginner', 'intermediate', 'advanced'] as Difficulty[]).map(difficulty => (
                                    <label key={difficulty} className="flex items-center">
                                        <input
                                            type="radio"
                                            name="difficulty"
                                            checked={filters.difficulty === difficulty}
                                            onChange={() => handleFilterChange('difficulty', difficulty)}
                                            className="mr-2"
                                        />
                                        <span className={`text-sm px-2 py-1 rounded ${difficulty === 'beginner' ? 'bg-green-100 text-green-700' :
                                            difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-700' :
                                                'bg-red-100 text-red-700'
                                            }`}>
                                            {difficulty}
                                        </span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Featured Filter */}
                        <div>
                            <label className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={filters.featured || false}
                                    onChange={() => handleFilterChange('featured', !filters.featured)}
                                    className="mr-2"
                                />
                                <span className="text-sm text-gray-600">Apenas destacados ⭐</span>
                            </label>
                        </div>

                        {/* Popular Tags */}
                        <div>
                            <h3 className="text-sm font-semibold text-gray-700 mb-3">Tags Populares</h3>
                            <div className="flex flex-wrap gap-2">
                                {popularTags.slice(0, 12).map(tag => (
                                    <button
                                        key={tag}
                                        onClick={() => {
                                            const currentTags = filters.tags || [];
                                            const newTags = currentTags.includes(tag)
                                                ? currentTags.filter((t: string) => t !== tag)
                                                : [...currentTags, tag];
                                            handleFilterChange('tags', newTags.length > 0 ? newTags : undefined);
                                        }}
                                        className={`px-2 py-1 text-xs rounded transition-colors ${(filters.tags || []).includes(tag)
                                            ? 'bg-blue-500 text-white'
                                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                                            }`}
                                    >
                                        {tag}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Tab: Stats */}
                {activeTab === 'stats' && (
                    <div className="p-4 space-y-6">
                        {/* Overview */}
                        <div>
                            <h3 className="text-sm font-semibold text-gray-700 mb-3">Visão Geral</h3>
                            <div className="grid grid-cols-2 gap-3">
                                <div className="bg-blue-50 p-3 rounded-lg text-center">
                                    <div className="text-2xl font-bold text-blue-600">{stats.totalExamples}</div>
                                    <div className="text-xs text-blue-600">Exemplos</div>
                                </div>
                                <div className="bg-green-50 p-3 rounded-lg text-center">
                                    <div className="text-2xl font-bold text-green-600">{stats.totalViews}</div>
                                    <div className="text-xs text-green-600">Visualizações</div>
                                </div>
                                <div className="bg-pink-50 p-3 rounded-lg text-center">
                                    <div className="text-2xl font-bold text-pink-600">{stats.totalLikes}</div>
                                    <div className="text-xs text-pink-600">Curtidas</div>
                                </div>
                                <div className="bg-purple-50 p-3 rounded-lg text-center">
                                    <div className="text-2xl font-bold text-purple-600">
                                        {stats.popularCategories.length}
                                    </div>
                                    <div className="text-xs text-purple-600">Categorias</div>
                                </div>
                            </div>
                        </div>

                        {/* Popular Categories */}
                        <div>
                            <h3 className="text-sm font-semibold text-gray-700 mb-3">Categorias Populares</h3>
                            <div className="space-y-2">
                                {stats.popularCategories.slice(0, 5).map((category) => (
                                    <div key={category.name} className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <div
                                                className="w-3 h-3 rounded-full"
                                                style={{ backgroundColor: category.color }}
                                            />
                                            <span className="text-sm text-gray-600">{category.name}</span>
                                        </div>
                                        <span className="text-sm font-medium text-gray-900">{category.count}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Language Distribution */}
                        <div>
                            <h3 className="text-sm font-semibold text-gray-700 mb-3">Linguagens</h3>
                            <div className="space-y-2">
                                {stats.languageDistribution.slice(0, 5).map((lang) => (
                                    <div key={lang.language} className="flex items-center justify-between">
                                        <span className="text-sm text-gray-600 capitalize">{lang.language}</span>
                                        <div className="flex items-center gap-2">
                                            <div className="w-16 bg-gray-200 rounded-full h-2">
                                                <div
                                                    className="bg-blue-500 h-2 rounded-full"
                                                    style={{ width: `${lang.percentage}%` }}
                                                />
                                            </div>
                                            <span className="text-xs text-gray-500 w-8 text-right">
                                                {lang.percentage}%
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Difficulty Distribution */}
                        <div>
                            <h3 className="text-sm font-semibold text-gray-700 mb-3">Dificuldade</h3>
                            <div className="space-y-2">
                                {stats.difficultyDistribution.map((diff) => (
                                    <div key={diff.difficulty} className="flex items-center justify-between">
                                        <span className={`text-sm px-2 py-1 rounded ${diff.difficulty === 'beginner' ? 'bg-green-100 text-green-700' :
                                            diff.difficulty === 'intermediate' ? 'bg-yellow-100 text-yellow-700' :
                                                'bg-red-100 text-red-700'
                                            }`}>
                                            {diff.difficulty}
                                        </span>
                                        <div className="flex items-center gap-2">
                                            <div className="w-16 bg-gray-200 rounded-full h-2">
                                                <div
                                                    className={`h-2 rounded-full ${diff.difficulty === 'beginner' ? 'bg-green-500' :
                                                        diff.difficulty === 'intermediate' ? 'bg-yellow-500' :
                                                            'bg-red-500'
                                                        }`}
                                                    style={{ width: `${diff.percentage}%` }}
                                                />
                                            </div>
                                            <span className="text-xs text-gray-500 w-8 text-right">
                                                {diff.percentage}%
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default PlaygroundSidebar;
