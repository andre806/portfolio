'use client';

import React, { useState } from 'react';
import { useBlog } from '../../hooks/useBlog';
import BlogCard from '../../components/blog/BlogCard';
import BlogSidebar from '../../components/blog/BlogSidebar';

const BlogPage = () => {
    const {
        posts,
        totalPosts,
        hasMore,
        featuredPosts,
        popularPosts,
        recentPosts,
        categories,
        tags,
        stats,
        filters,
        loading,
        search,
        filterByCategory,
        filterByTag,
        clearFilters,
        loadMore
    } = useBlog();

    const [searchQuery, setSearchQuery] = useState('');
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        search(searchQuery);
    };

    const handleClearSearch = () => {
        setSearchQuery('');
        clearFilters();
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
            {/* Hero Section */}
            <section className="relative py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <div className="mb-6">
                            <span className="inline-block px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-medium mb-4">
                                📝 Blog Técnico
                            </span>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-white mb-6">
                                Compartilhando{' '}
                                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                    Conhecimento
                                </span>
                            </h1>
                            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto mb-8">
                                Artigos sobre desenvolvimento web, tecnologias modernas e melhores práticas.
                                Aprenda junto comigo!
                            </p>
                        </div>

                        {/* Estatísticas */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
                            <div className="text-center p-4 bg-white/50 dark:bg-slate-800/50 rounded-xl backdrop-blur-sm border border-slate-200 dark:border-slate-700">
                                <div className="text-2xl font-bold text-slate-900 dark:text-white">{stats.totalPosts}</div>
                                <div className="text-sm text-slate-600 dark:text-slate-400">Artigos</div>
                            </div>
                            <div className="text-center p-4 bg-white/50 dark:bg-slate-800/50 rounded-xl backdrop-blur-sm border border-slate-200 dark:border-slate-700">
                                <div className="text-2xl font-bold text-slate-900 dark:text-white">{stats.totalViews.toLocaleString()}</div>
                                <div className="text-sm text-slate-600 dark:text-slate-400">Visualizações</div>
                            </div>
                            <div className="text-center p-4 bg-white/50 dark:bg-slate-800/50 rounded-xl backdrop-blur-sm border border-slate-200 dark:border-slate-700">
                                <div className="text-2xl font-bold text-slate-900 dark:text-white">{categories.length}</div>
                                <div className="text-sm text-slate-600 dark:text-slate-400">Categorias</div>
                            </div>
                            <div className="text-center p-4 bg-white/50 dark:bg-slate-800/50 rounded-xl backdrop-blur-sm border border-slate-200 dark:border-slate-700">
                                <div className="text-2xl font-bold text-slate-900 dark:text-white">{tags.length}</div>
                                <div className="text-sm text-slate-600 dark:text-slate-400">Tags</div>
                            </div>
                        </div>

                        {/* Barra de busca */}
                        <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
                            <div className="relative">
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Buscar artigos, categorias, tags..."
                                    className="w-full px-6 py-4 text-lg rounded-full border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-800 focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:text-white placeholder-slate-400 dark:placeholder-slate-500 pr-20"
                                />
                                <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex space-x-2">
                                    {(filters.search || filters.category || filters.tag) && (
                                        <button
                                            type="button"
                                            onClick={handleClearSearch}
                                            className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors duration-200"
                                            title="Limpar filtros"
                                        >
                                            ✕
                                        </button>
                                    )}
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition-colors duration-200"
                                    >
                                        🔍
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>

                    {/* Posts em destaque */}
                    {featuredPosts.length > 0 && !filters.search && !filters.category && !filters.tag && (
                        <div className="mb-16">
                            <div className="flex items-center justify-between mb-8">
                                <h2 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center">
                                    <span className="mr-2">⭐</span>
                                    Posts em Destaque
                                </h2>
                            </div>

                            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                                {featuredPosts.map(post => (
                                    <BlogCard
                                        key={post.id}
                                        post={post}
                                        variant="featured"
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </section>

            {/* Conteúdo principal */}
            <section className="py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        {/* Posts principais */}
                        <div className="lg:col-span-2">
                            {/* Filtros ativos */}
                            {(filters.search || filters.category || filters.tag) && (
                                <div className="mb-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center space-x-4 text-sm">
                                            <span className="text-slate-600 dark:text-slate-400">
                                                Filtros ativos:
                                            </span>
                                            {filters.search && (
                                                <span className="px-3 py-1 bg-blue-100 dark:bg-blue-800 text-blue-800 dark:text-blue-200 rounded-full">
                                                    Busca: &ldquo;{filters.search}&rdquo;
                                                </span>
                                            )}
                                            {filters.category && (
                                                <span className="px-3 py-1 bg-green-100 dark:bg-green-800 text-green-800 dark:text-green-200 rounded-full">
                                                    Categoria: {categories.find(c => c.slug === filters.category)?.name}
                                                </span>
                                            )}
                                            {filters.tag && (
                                                <span className="px-3 py-1 bg-purple-100 dark:bg-purple-800 text-purple-800 dark:text-purple-200 rounded-full">
                                                    Tag: {tags.find(t => t.slug === filters.tag)?.name}
                                                </span>
                                            )}
                                        </div>
                                        <button
                                            onClick={clearFilters}
                                            className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm"
                                        >
                                            Limpar filtros
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Header da lista */}
                            <div className="flex items-center justify-between mb-8">
                                <div>
                                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                                        {filters.search || filters.category || filters.tag ? 'Resultados' : 'Todos os Posts'}
                                    </h2>
                                    <p className="text-slate-600 dark:text-slate-400">
                                        {totalPosts} {totalPosts === 1 ? 'artigo encontrado' : 'artigos encontrados'}
                                    </p>
                                </div>

                                {/* Toggle de visualização */}
                                <div className="flex items-center space-x-2">
                                    <button
                                        onClick={() => setViewMode('grid')}
                                        className={`p-2 rounded-lg transition-colors duration-200 ${viewMode === 'grid'
                                            ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400'
                                            : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
                                            }`}
                                        title="Visualização em grade"
                                    >
                                        ⊞
                                    </button>
                                    <button
                                        onClick={() => setViewMode('list')}
                                        className={`p-2 rounded-lg transition-colors duration-200 ${viewMode === 'list'
                                            ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400'
                                            : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
                                            }`}
                                        title="Visualização em lista"
                                    >
                                        ☰
                                    </button>
                                </div>
                            </div>

                            {/* Lista de posts */}
                            {posts.length > 0 ? (
                                <>
                                    <div className={
                                        viewMode === 'grid'
                                            ? 'grid grid-cols-1 md:grid-cols-2 gap-8'
                                            : 'space-y-6'
                                    }>
                                        {posts.map(post => (
                                            <BlogCard
                                                key={post.id}
                                                post={post}
                                                variant={viewMode === 'list' ? 'compact' : 'default'}
                                                className={viewMode === 'list' ? 'bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700' : ''}
                                            />
                                        ))}
                                    </div>

                                    {/* Load more */}
                                    {hasMore && (
                                        <div className="text-center mt-12">
                                            <button
                                                onClick={loadMore}
                                                disabled={loading}
                                                className="px-8 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 text-white font-medium rounded-lg transition-all duration-200 disabled:cursor-not-allowed flex items-center space-x-2 mx-auto"
                                            >
                                                {loading ? (
                                                    <>
                                                        <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div>
                                                        <span>Carregando...</span>
                                                    </>
                                                ) : (
                                                    <span>Carregar mais posts</span>
                                                )}
                                            </button>
                                        </div>
                                    )}
                                </>
                            ) : (
                                /* Estado vazio */
                                <div className="text-center py-16">
                                    <div className="text-6xl mb-4">📭</div>
                                    <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                                        Nenhum post encontrado
                                    </h3>
                                    <p className="text-slate-600 dark:text-slate-400 mb-6">
                                        Tente ajustar os filtros ou fazer uma nova busca.
                                    </p>
                                    <button
                                        onClick={clearFilters}
                                        className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors duration-200"
                                    >
                                        Limpar filtros
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Sidebar */}
                        <div className="lg:col-span-1">
                            <BlogSidebar
                                recentPosts={recentPosts}
                                popularPosts={popularPosts}
                                categories={categories}
                                tags={tags}
                                onCategoryClick={filterByCategory}
                                onTagClick={filterByTag}
                                className="sticky top-8"
                            />
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default BlogPage;
