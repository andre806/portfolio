import { useState, useMemo, useCallback } from 'react';
import { BlogPost, BlogFilters } from '../models/BlogPost';
import blogPosts, {
    blogCategories,
    blogTags,
    getPostsByCategory,
    getPostsByTag,
    searchPosts,
    getRelatedPosts,
    getBlogStats
} from '../config/blogPosts';

export const useBlog = () => {
    const [filters, setFilters] = useState<BlogFilters>({
        search: '',
        category: '',
        tag: '',
        status: 'published',
        featured: undefined,
        sortBy: 'publishedAt',
        sortOrder: 'desc',
        limit: 10,
        offset: 0
    });

    const [loading, setLoading] = useState(false);

    // Posts filtrados e ordenados
    const filteredPosts = useMemo(() => {
        let posts = [...blogPosts];

        // Filtrar por status
        if (filters.status) {
            posts = posts.filter(post => post.status === filters.status);
        }

        // Filtrar por featured
        if (filters.featured !== undefined) {
            posts = posts.filter(post => post.featured === filters.featured);
        }

        // Filtrar por categoria
        if (filters.category) {
            posts = getPostsByCategory(filters.category);
        }

        // Filtrar por tag
        if (filters.tag) {
            posts = getPostsByTag(filters.tag);
        }

        // Busca por texto
        if (filters.search) {
            posts = searchPosts(filters.search);
        }

        // Ordenação
        posts.sort((a, b) => {
            let aValue: string | number, bValue: string | number;

            switch (filters.sortBy) {
                case 'publishedAt':
                    aValue = new Date(a.publishedAt).getTime();
                    bValue = new Date(b.publishedAt).getTime();
                    break;
                case 'views':
                    aValue = a.views || 0;
                    bValue = b.views || 0;
                    break;
                case 'likes':
                    aValue = a.likes || 0;
                    bValue = b.likes || 0;
                    break;
                case 'title':
                    aValue = a.title.toLowerCase();
                    bValue = b.title.toLowerCase();
                    break;
                default:
                    aValue = new Date(a.publishedAt).getTime();
                    bValue = new Date(b.publishedAt).getTime();
            }

            if (filters.sortOrder === 'asc') {
                return aValue > bValue ? 1 : -1;
            } else {
                return aValue < bValue ? 1 : -1;
            }
        });

        // Paginação
        const start = filters.offset || 0;
        const end = start + (filters.limit || 10);

        return {
            posts: posts.slice(start, end),
            total: posts.length,
            hasMore: end < posts.length
        };
    }, [filters]);

    // Posts em destaque
    const featuredPosts = useMemo(() => {
        return blogPosts
            .filter(post => post.featured && post.status === 'published')
            .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
            .slice(0, 3);
    }, []);

    // Posts populares
    const popularPosts = useMemo(() => {
        return blogPosts
            .filter(post => post.status === 'published')
            .sort((a, b) => (b.views || 0) - (a.views || 0))
            .slice(0, 5);
    }, []);

    // Posts recentes
    const recentPosts = useMemo(() => {
        return blogPosts
            .filter(post => post.status === 'published')
            .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
            .slice(0, 5);
    }, []);

    // Estatísticas do blog
    const stats = useMemo(() => getBlogStats(), []);

    // Atualizar filtros
    const updateFilters = useCallback((newFilters: Partial<BlogFilters>) => {
        setFilters(prev => ({
            ...prev,
            ...newFilters,
            offset: newFilters.offset !== undefined ? newFilters.offset : 0 // Reset offset se outros filtros mudaram
        }));
    }, []);

    // Limpar filtros
    const clearFilters = useCallback(() => {
        setFilters({
            search: '',
            category: '',
            tag: '',
            status: 'published',
            featured: undefined,
            sortBy: 'publishedAt',
            sortOrder: 'desc',
            limit: 10,
            offset: 0
        });
    }, []);

    // Buscar posts
    const search = useCallback((query: string) => {
        updateFilters({ search: query, offset: 0 });
    }, [updateFilters]);

    // Filtrar por categoria
    const filterByCategory = useCallback((categorySlug: string) => {
        updateFilters({ category: categorySlug, tag: '', offset: 0 });
    }, [updateFilters]);

    // Filtrar por tag
    const filterByTag = useCallback((tagSlug: string) => {
        updateFilters({ tag: tagSlug, category: '', offset: 0 });
    }, [updateFilters]);

    // Carregar mais posts (paginação)
    const loadMore = useCallback(() => {
        if (filteredPosts.hasMore && !loading) {
            setLoading(true);
            updateFilters({
                offset: (filters.offset || 0) + (filters.limit || 10)
            });

            // Simular loading
            setTimeout(() => setLoading(false), 500);
        }
    }, [filteredPosts.hasMore, loading, filters.offset, filters.limit, updateFilters]);

    // Obter post por slug
    const getPostBySlug = useCallback((slug: string): BlogPost | undefined => {
        return blogPosts.find(post => post.slug === slug && post.status === 'published');
    }, []);

    // Obter posts relacionados
    const getRelatedPostsFor = useCallback((postId: string, limit: number = 3) => {
        return getRelatedPosts(postId, limit);
    }, []);

    // Incrementar visualizações (simulado)
    const incrementViews = useCallback(async (postId: string) => {
        // Em uma aplicação real, isso faria uma chamada para API
        const post = blogPosts.find(p => p.id === postId);
        if (post) {
            post.views = (post.views || 0) + 1;
        }
    }, []);

    // Curtir post (simulado)
    const likePost = useCallback(async (postId: string) => {
        // Em uma aplicação real, isso faria uma chamada para API
        const post = blogPosts.find(p => p.id === postId);
        if (post) {
            post.likes = (post.likes || 0) + 1;
        }
    }, []);

    return {
        // Data
        posts: filteredPosts.posts,
        totalPosts: filteredPosts.total,
        hasMore: filteredPosts.hasMore,
        featuredPosts,
        popularPosts,
        recentPosts,
        categories: blogCategories,
        tags: blogTags,
        stats,

        // State
        filters,
        loading,

        // Actions
        updateFilters,
        clearFilters,
        search,
        filterByCategory,
        filterByTag,
        loadMore,
        getPostBySlug,
        getRelatedPostsFor,
        incrementViews,
        likePost
    };
};

export default useBlog;
