'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { BlogPost } from '../../../models/BlogPost';
import { useBlog } from '../../../hooks/useBlog';
import BlogCard from '../../../components/blog/BlogCard';
import BlogSidebar from '../../../components/blog/BlogSidebar';

const BlogSlugPage = () => {
    const params = useParams();
    const router = useRouter();
    const slug = params?.slug as string;

    const {
        getPostBySlug,
        getRelatedPostsFor,
        incrementViews,
        likePost,
        recentPosts,
        popularPosts,
        categories,
        tags
    } = useBlog();

    const [post, setPost] = useState<BlogPost | null>(null);
    const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
    const [isLiked, setIsLiked] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [readingProgress, setReadingProgress] = useState(0);

    useEffect(() => {
        if (slug) {
            const foundPost = getPostBySlug(slug);
            if (foundPost) {
                setPost(foundPost);
                setRelatedPosts(getRelatedPostsFor(foundPost.id));
                incrementViews(foundPost.id);
            } else {
                router.push('/blog');
            }
        }
    }, [slug, getPostBySlug, getRelatedPostsFor, incrementViews, router]);

    useEffect(() => {
        const handleScroll = () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = scrollTop / docHeight;

            setReadingProgress(Math.min(scrollPercent * 100, 100));
            setIsScrolled(scrollTop > 100);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLike = async () => {
        if (post && !isLiked) {
            await likePost(post.id);
            setIsLiked(true);
        }
    };

    const handleShare = async () => {
        if (navigator.share && post) {
            try {
                await navigator.share({
                    title: post.title,
                    text: post.excerpt,
                    url: window.location.href
                });
            } catch (error) {
                console.log('Erro ao compartilhar:', error);
            }
        } else if (post) {
            // Fallback para cópia do link
            navigator.clipboard.writeText(window.location.href);
            alert('Link copiado para a área de transferência!');
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('pt-BR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const formatReadingTime = (minutes: number) => {
        return `${minutes} min de leitura`;
    };

    if (!post) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-2 border-blue-600 border-t-transparent"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
            {/* Barra de progresso de leitura */}
            <div className="fixed top-0 left-0 w-full h-1 bg-slate-200 dark:bg-slate-700 z-50">
                <div
                    className="h-full bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300"
                    style={{ width: `${readingProgress}%` }}
                />
            </div>

            {/* Botões flutuantes */}
            <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-40 space-y-3">
                {/* Voltar ao topo */}
                {isScrolled && (
                    <button
                        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                        className="p-3 bg-white dark:bg-slate-800 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 border border-slate-200 dark:border-slate-700"
                        title="Voltar ao topo"
                    >
                        ↑
                    </button>
                )}

                {/* Like */}
                <button
                    onClick={handleLike}
                    className={`p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 border ${isLiked
                            ? 'bg-red-500 text-white border-red-500'
                            : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-red-500 border-slate-200 dark:border-slate-700'
                        }`}
                    title="Curtir post"
                >
                    ❤️
                </button>

                {/* Compartilhar */}
                <button
                    onClick={handleShare}
                    className="p-3 bg-white dark:bg-slate-800 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 border border-slate-200 dark:border-slate-700"
                    title="Compartilhar"
                >
                    📤
                </button>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
                    {/* Conteúdo principal */}
                    <article className="lg:col-span-3">
                        {/* Breadcrumb */}
                        <nav className="mb-8">
                            <ol className="flex items-center space-x-2 text-sm text-slate-500 dark:text-slate-400">
                                <li>
                                    <Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200">
                                        Home
                                    </Link>
                                </li>
                                <li>→</li>
                                <li>
                                    <Link href="/blog" className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200">
                                        Blog
                                    </Link>
                                </li>
                                <li>→</li>
                                <li className="text-slate-700 dark:text-slate-300">
                                    {post.title}
                                </li>
                            </ol>
                        </nav>

                        {/* Header do post */}
                        <header className="mb-12">
                            {/* Categorias */}
                            {post.categories.length > 0 && (
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {post.categories.map(category => (
                                        <Link
                                            key={category.id}
                                            href={`/blog?category=${category.slug}`}
                                            className="inline-flex items-center px-3 py-1 text-sm font-medium rounded-full transition-all duration-200 hover:scale-105"
                                            style={{
                                                backgroundColor: `${category.color}20`,
                                                color: category.color
                                            }}
                                        >
                                            {category.icon} {category.name}
                                        </Link>
                                    ))}
                                </div>
                            )}

                            {/* Título */}
                            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 dark:text-white mb-6 leading-tight">
                                {post.title}
                            </h1>

                            {/* Excerpt */}
                            <p className="text-xl text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
                                {post.excerpt}
                            </p>

                            {/* Metadados */}
                            <div className="flex flex-wrap items-center gap-6 text-sm text-slate-500 dark:text-slate-400 mb-8">
                                <div className="flex items-center space-x-3">
                                    <Image
                                        src={post.author.avatar}
                                        alt={post.author.name}
                                        width={40}
                                        height={40}
                                        className="rounded-full"
                                    />
                                    <div>
                                        <div className="font-medium text-slate-700 dark:text-slate-300">
                                            {post.author.name}
                                        </div>
                                        <div>Autor</div>
                                    </div>
                                </div>

                                <time dateTime={post.publishedAt}>
                                    📅 {formatDate(post.publishedAt)}
                                </time>

                                <span>⏱️ {formatReadingTime(post.readingTime)}</span>

                                {post.views && (
                                    <span>👁️ {post.views.toLocaleString()} visualizações</span>
                                )}

                                {post.likes && (
                                    <span>❤️ {post.likes} curtidas</span>
                                )}
                            </div>

                            {/* Imagem de capa */}
                            {post.coverImage && (
                                <div className="relative h-64 md:h-96 rounded-xl overflow-hidden mb-8">
                                    <Image
                                        src={post.coverImage}
                                        alt={post.title}
                                        fill
                                        className="object-cover"
                                        priority
                                    />
                                </div>
                            )}
                        </header>

                        {/* Conteúdo do post */}
                        <div className="prose prose-lg dark:prose-invert max-w-none">
                            <div
                                className="text-slate-700 dark:text-slate-300 leading-relaxed"
                                style={{
                                    fontSize: '1.125rem',
                                    lineHeight: '1.75'
                                }}
                                dangerouslySetInnerHTML={{
                                    __html: post.content.replace(/```([^`]+)```/g, '<pre class="bg-slate-100 dark:bg-slate-800 p-4 rounded-lg overflow-x-auto"><code>$1</code></pre>')
                                        .replace(/`([^`]+)`/g, '<code class="bg-slate-100 dark:bg-slate-800 px-2 py-1 rounded text-sm">$1</code>')
                                        .replace(/\n\n/g, '</p><p class="mb-6">')
                                        .replace(/^/, '<p class="mb-6">')
                                        .replace(/$/, '</p>')
                                }}
                            />
                        </div>

                        {/* Tags */}
                        {post.tags.length > 0 && (
                            <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-700">
                                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                                    Tags
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {post.tags.map(tag => (
                                        <Link
                                            key={tag.id}
                                            href={`/blog?tag=${tag.slug}`}
                                            className="inline-block px-3 py-1 text-sm bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-full hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors duration-200"
                                            style={{
                                                backgroundColor: tag.color ? `${tag.color}20` : undefined,
                                                color: tag.color || undefined
                                            }}
                                        >
                                            #{tag.name}
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Autor */}
                        <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-700">
                            <div className="flex items-start space-x-4 p-6 bg-slate-50 dark:bg-slate-800 rounded-xl">
                                <Image
                                    src={post.author.avatar}
                                    alt={post.author.name}
                                    width={64}
                                    height={64}
                                    className="rounded-full"
                                />
                                <div className="flex-1">
                                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                                        {post.author.name}
                                    </h3>
                                    <p className="text-slate-600 dark:text-slate-400 mb-4">
                                        {post.author.bio}
                                    </p>
                                    <div className="flex space-x-4">
                                        {post.author.social.twitter && (
                                            <a
                                                href={`https://twitter.com/${post.author.social.twitter}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-500 hover:text-blue-600 transition-colors duration-200"
                                            >
                                                Twitter
                                            </a>
                                        )}
                                        {post.author.social.linkedin && (
                                            <a
                                                href={`https://linkedin.com/in/${post.author.social.linkedin}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-600 hover:text-blue-700 transition-colors duration-200"
                                            >
                                                LinkedIn
                                            </a>
                                        )}
                                        {post.author.social.github && (
                                            <a
                                                href={`https://github.com/${post.author.social.github}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors duration-200"
                                            >
                                                GitHub
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Posts relacionados */}
                        {relatedPosts.length > 0 && (
                            <div className="mt-16">
                                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-8">
                                    Posts Relacionados
                                </h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {relatedPosts.map(relatedPost => (
                                        <BlogCard
                                            key={relatedPost.id}
                                            post={relatedPost}
                                            variant="default"
                                        />
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Navegação anterior/próximo */}
                        <div className="mt-16 pt-8 border-t border-slate-200 dark:border-slate-700">
                            <div className="flex justify-between">
                                <Link
                                    href="/blog"
                                    className="inline-flex items-center px-6 py-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg transition-colors duration-200"
                                >
                                    ← Voltar ao Blog
                                </Link>

                                <div className="flex space-x-4">
                                    <button
                                        onClick={handleLike}
                                        className={`inline-flex items-center px-6 py-3 rounded-lg transition-all duration-200 ${isLiked
                                                ? 'bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300'
                                                : 'bg-slate-100 dark:bg-slate-800 hover:bg-red-50 dark:hover:bg-red-900/20 text-slate-700 dark:text-slate-300'
                                            }`}
                                    >
                                        ❤️ {isLiked ? 'Curtido' : 'Curtir'}
                                    </button>

                                    <button
                                        onClick={handleShare}
                                        className="inline-flex items-center px-6 py-3 bg-blue-100 dark:bg-blue-900 hover:bg-blue-200 dark:hover:bg-blue-800 text-blue-700 dark:text-blue-300 rounded-lg transition-colors duration-200"
                                    >
                                        📤 Compartilhar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </article>

                    {/* Sidebar */}
                    <aside className="lg:col-span-1">
                        <BlogSidebar
                            recentPosts={recentPosts}
                            popularPosts={popularPosts}
                            categories={categories}
                            tags={tags}
                            className="sticky top-8"
                        />
                    </aside>
                </div>
            </div>
        </div>
    );
};

export default BlogSlugPage;
