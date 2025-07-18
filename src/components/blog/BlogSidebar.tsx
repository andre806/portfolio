'use client';


import React, { useState } from 'react';
import Link from 'next/link';
import { BlogPost, Category, Tag } from '../../models/BlogPost';
import BlogCard from './BlogCard';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';

interface BlogSidebarProps {
    recentPosts: BlogPost[];
    popularPosts: BlogPost[];
    categories: Category[];
    tags: Tag[];
    onCategoryClick?: (categorySlug: string) => void;
    onTagClick?: (tagSlug: string) => void;
    className?: string;
}

const BlogSidebar: React.FC<BlogSidebarProps> = ({
    recentPosts,
    popularPosts,
    categories,
    tags,
    onCategoryClick,
    onTagClick,
    className = ''
}) => {
    const [activeTab, setActiveTab] = useState<'recent' | 'popular'>('recent');
    const [showAllTags, setShowAllTags] = useState(false);
    const [newsletterEmail, setNewsletterEmail] = useState('');
    const [newsletterStatus, setNewsletterStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    const handleNewsletterSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newsletterEmail.trim()) return;

        setNewsletterStatus('loading');

        try {
            // Simular envio
            await new Promise(resolve => setTimeout(resolve, 1000));
            console.log('Newsletter subscription:', newsletterEmail);

            setNewsletterStatus('success');
            setNewsletterEmail('');

            setTimeout(() => setNewsletterStatus('idle'), 3000);
        } catch {
            setNewsletterStatus('error');
            setTimeout(() => setNewsletterStatus('idle'), 3000);
        }
    };

    const displayedTags = showAllTags ? tags : tags.slice(0, 12);

    return (
        <Box component="aside" className={className} sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {/* Newsletter Subscription */}
            <Paper elevation={2} sx={{ p: 3, borderRadius: 3, background: 'linear-gradient(135deg, #e0e7ff 0%, #f0f5ff 100%)', border: '1px solid', borderColor: 'primary.light' }}>
                <Box textAlign="center" mb={2}>
                    <Typography fontSize={32} mb={1}>📧</Typography>
                    <Typography variant="h6" fontWeight={700} mb={1}>Newsletter Tech</Typography>
                    <Typography color="text.secondary" fontSize={14} mb={1}>
                        Receba os melhores artigos direto no seu email. Sem spam, apenas conteúdo de qualidade!
                    </Typography>
                </Box>
                <Box component="form" onSubmit={handleNewsletterSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <input
                        type="email"
                        value={newsletterEmail}
                        onChange={(e) => setNewsletterEmail(e.target.value)}
                        placeholder="seu@email.com"
                        style={{ padding: 12, borderRadius: 8, border: '1px solid #cbd5e1', fontSize: 14, background: '#fff', color: '#222' }}
                        disabled={newsletterStatus === 'loading'}
                        required
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        disabled={newsletterStatus === 'loading' || !newsletterEmail.trim()}
                        sx={{ borderRadius: 2, fontWeight: 600, py: 1.2 }}
                    >
                        {newsletterStatus === 'loading' ? 'Inscrevendo...' : 'Inscrever-se'}
                    </Button>
                    {newsletterStatus === 'success' && (
                        <Typography variant="caption" color="success.main" align="center">
                            ✓ Inscrição realizada com sucesso!
                        </Typography>
                    )}
                    {newsletterStatus === 'error' && (
                        <Typography variant="caption" color="error.main" align="center">
                            ✗ Erro ao inscrever. Tente novamente.
                        </Typography>
                    )}
                </Box>
                <Typography variant="caption" color="text.secondary" align="center" display="block" mt={2}>
                    Máximo 1 email por semana. Cancele a qualquer momento.
                </Typography>
            </Paper>

            {/* Categorias */}
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 flex items-center">
                    <span className="mr-2">📁</span>
                    Categorias
                </h3>

                <div className="space-y-2">
                    {categories.map(category => (
                        <button
                            key={category.id}
                            onClick={() => onCategoryClick?.(category.slug)}
                            className="w-full flex items-center justify-between p-3 text-left rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors duration-200 group"
                        >
                            <div className="flex items-center space-x-3">
                                <span className="text-lg">{category.icon}</span>
                                <div>
                                    <div className="font-medium text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                                        {category.name}
                                    </div>
                                    <div className="text-xs text-slate-500 dark:text-slate-400">
                                        {category.description}
                                    </div>
                                </div>
                            </div>

                            <span className="text-sm text-slate-500 dark:text-slate-400 bg-slate-100 dark:bg-slate-600 px-2 py-1 rounded-full">
                                {category.postCount}
                            </span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Posts Recentes vs Populares */}
            <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 overflow-hidden">
                {/* Tab Headers */}
                <div className="flex border-b border-slate-200 dark:border-slate-700">
                    <button
                        onClick={() => setActiveTab('recent')}
                        className={`flex-1 px-4 py-3 text-sm font-medium transition-colors duration-200 ${activeTab === 'recent'
                            ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400 bg-blue-50 dark:bg-blue-900/20'
                            : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                            }`}
                    >
                        🕒 Recentes
                    </button>
                    <button
                        onClick={() => setActiveTab('popular')}
                        className={`flex-1 px-4 py-3 text-sm font-medium transition-colors duration-200 ${activeTab === 'popular'
                            ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400 bg-blue-50 dark:bg-blue-900/20'
                            : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                            }`}
                    >
                        🔥 Populares
                    </button>
                </div>

                {/* Tab Content */}
                <div className="p-4">
                    <div className="space-y-4">
                        {(activeTab === 'recent' ? recentPosts : popularPosts).map(post => (
                            <BlogCard
                                key={post.id}
                                post={post}
                                variant="compact"
                                showExcerpt={false}
                            />
                        ))}
                    </div>

                    <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                        <Link
                            href="/blog"
                            className="block text-center text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-200"
                        >
                            Ver todos os posts →
                        </Link>
                    </div>
                </div>
            </div>

            {/* Tags */}
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 flex items-center">
                    <span className="mr-2">🏷️</span>
                    Tags Populares
                </h3>

                <div className="flex flex-wrap gap-2">
                    {displayedTags.map(tag => (
                        <button
                            key={tag.id}
                            onClick={() => onTagClick?.(tag.slug)}
                            className="inline-flex items-center px-3 py-1 text-sm bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-full hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors duration-200"
                            style={{
                                backgroundColor: tag.color ? `${tag.color}20` : undefined,
                                color: tag.color || undefined
                            }}
                        >
                            #{tag.name}
                            {tag.postCount && (
                                <span className="ml-1 text-xs opacity-75">
                                    {tag.postCount}
                                </span>
                            )}
                        </button>
                    ))}
                </div>

                {tags.length > 12 && (
                    <button
                        onClick={() => setShowAllTags(!showAllTags)}
                        className="mt-3 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors duration-200"
                    >
                        {showAllTags ? 'Ver menos' : `Ver mais ${tags.length - 12} tags`}
                    </button>
                )}
            </div>

            {/* Redes Sociais */}
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 flex items-center">
                    <span className="mr-2">🌐</span>
                    Me siga
                </h3>

                <div className="space-y-3">
                    <a
                        href="https://twitter.com/andre_dev"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-3 p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors duration-200 group"
                    >
                        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm">
                            𝕏
                        </div>
                        <div>
                            <div className="font-medium text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                                Twitter
                            </div>
                            <div className="text-xs text-slate-500 dark:text-slate-400">
                                Atualizações e insights
                            </div>
                        </div>
                    </a>

                    <a
                        href="https://linkedin.com/in/andre-dev"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-3 p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors duration-200 group"
                    >
                        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm">
                            in
                        </div>
                        <div>
                            <div className="font-medium text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                                LinkedIn
                            </div>
                            <div className="text-xs text-slate-500 dark:text-slate-400">
                                Carreira e networking
                            </div>
                        </div>
                    </a>

                    <a
                        href="https://github.com/andre-dev"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center space-x-3 p-3 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors duration-200 group"
                    >
                        <div className="w-8 h-8 bg-slate-800 dark:bg-slate-600 rounded-full flex items-center justify-center text-white text-sm">
                            gh
                        </div>
                        <div>
                            <div className="font-medium text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
                                GitHub
                            </div>
                            <div className="text-xs text-slate-500 dark:text-slate-400">
                                Projetos e código
                            </div>
                        </div>
                    </a>
                </div>
            </div>

            {/* Call to Action */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-100 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-6 border border-purple-200 dark:border-purple-800 text-center">
                <div className="text-3xl mb-3">💼</div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                    Precisa de um dev?
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                    Estou disponível para projetos freelance e consultorias.
                </p>
                <Link
                    href="/public/contact"
                    className="inline-block px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white text-sm font-medium rounded-lg transition-all duration-200 transform hover:scale-105"
                >
                    Entre em contato
                </Link>
            </div>
        </Box>
    );
};

export default BlogSidebar;