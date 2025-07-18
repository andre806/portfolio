'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { BlogPost } from '../../models/BlogPost';
import AnimatedCard from '../common/AnimatedCard';

interface BlogCardProps {
    post: BlogPost;
    variant?: 'default' | 'featured' | 'compact';
    showExcerpt?: boolean;
    className?: string;
}

const BlogCard: React.FC<BlogCardProps> = ({
    post,
    variant = 'default',
    showExcerpt = true,
    className = ''
}) => {
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

    if (variant === 'compact') {
        return (
            <AnimatedCard className={className}>
                <Link href={`/blog/${post.slug}`} className="group">
                    <article className="flex items-start space-x-4 p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-lg transition-colors duration-200">
                        {post.coverImage && (
                            <div className="flex-shrink-0 w-16 h-16 relative overflow-hidden rounded-lg">
                                <Image
                                    src={post.coverImage}
                                    alt={post.title}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-200"
                                />
                            </div>
                        )}

                        <div className="flex-1 min-w-0">
                            <h3 className="text-sm font-medium text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200 line-clamp-2">
                                {post.title}
                            </h3>

                            <div className="flex items-center space-x-2 mt-2 text-xs text-slate-500 dark:text-slate-400">
                                <time dateTime={post.publishedAt}>
                                    {formatDate(post.publishedAt)}
                                </time>
                                <span>•</span>
                                <span>{formatReadingTime(post.readingTime)}</span>
                                {post.views && (
                                    <>
                                        <span>•</span>
                                        <span>{post.views} views</span>
                                    </>
                                )}
                            </div>

                            {post.categories.length > 0 && (
                                <div className="flex items-center space-x-1 mt-2">
                                    <span
                                        className="inline-block px-2 py-1 text-xs font-medium rounded-full"
                                        style={{
                                            backgroundColor: `${post.categories[0].color}20`,
                                            color: post.categories[0].color
                                        }}
                                    >
                                        {post.categories[0].name}
                                    </span>
                                </div>
                            )}
                        </div>
                    </article>
                </Link>
            </AnimatedCard>
        );
    }

    if (variant === 'featured') {
        return (
            <AnimatedCard className={className} glowOnHover>
                <Link href={`/blog/${post.slug}`} className="group">
                    <article className="relative bg-white dark:bg-slate-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-slate-200 dark:border-slate-700 group-hover:scale-[1.02]">
                        {/* Badge de Featured */}
                        <div className="absolute top-4 left-4 z-10">
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
                                ⭐ Em Destaque
                            </span>
                        </div>

                        {/* Imagem de capa */}
                        {post.coverImage && (
                            <div className="relative h-48 overflow-hidden">
                                <Image
                                    src={post.coverImage}
                                    alt={post.title}
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                            </div>
                        )}

                        <div className="p-6">
                            {/* Categorias */}
                            {post.categories.length > 0 && (
                                <div className="flex flex-wrap gap-2 mb-3">
                                    {post.categories.slice(0, 2).map(category => (
                                        <span
                                            key={category.id}
                                            className="inline-flex items-center px-2 py-1 text-xs font-medium rounded-full"
                                            style={{
                                                backgroundColor: `${category.color}20`,
                                                color: category.color
                                            }}
                                        >
                                            {category.icon} {category.name}
                                        </span>
                                    ))}
                                </div>
                            )}

                            {/* Título */}
                            <h2 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200 mb-3 line-clamp-2">
                                {post.title}
                            </h2>

                            {/* Excerpt */}
                            {showExcerpt && (
                                <p className="text-slate-600 dark:text-slate-400 text-sm mb-4 line-clamp-3">
                                    {post.excerpt}
                                </p>
                            )}

                            {/* Metadados */}
                            <div className="flex items-center justify-between text-sm text-slate-500 dark:text-slate-400">
                                <div className="flex items-center space-x-4">
                                    <div className="flex items-center space-x-2">
                                        <Image
                                            src={post.author.avatar}
                                            alt={post.author.name}
                                            width={24}
                                            height={24}
                                            className="rounded-full"
                                        />
                                        <span>{post.author.name}</span>
                                    </div>

                                    <time dateTime={post.publishedAt}>
                                        {formatDate(post.publishedAt)}
                                    </time>
                                </div>

                                <div className="flex items-center space-x-3">
                                    <span>{formatReadingTime(post.readingTime)}</span>
                                    {post.views && (
                                        <span className="flex items-center space-x-1">
                                            <span>👁️</span>
                                            <span>{post.views}</span>
                                        </span>
                                    )}
                                    {post.likes && (
                                        <span className="flex items-center space-x-1">
                                            <span>❤️</span>
                                            <span>{post.likes}</span>
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* Tags */}
                            {post.tags.length > 0 && (
                                <div className="flex flex-wrap gap-1 mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                                    {post.tags.slice(0, 3).map(tag => (
                                        <span
                                            key={tag.id}
                                            className="inline-block px-2 py-1 text-xs bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 rounded hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors duration-200"
                                        >
                                            #{tag.name}
                                        </span>
                                    ))}
                                    {post.tags.length > 3 && (
                                        <span className="inline-block px-2 py-1 text-xs text-slate-500 dark:text-slate-500">
                                            +{post.tags.length - 3} mais
                                        </span>
                                    )}
                                </div>
                            )}
                        </div>
                    </article>
                </Link>
            </AnimatedCard>
        );
    }

    // Variant padrão
    return (
        <AnimatedCard className={className}>
            <Link href={`/blog/${post.slug}`} className="group">
                <article className="bg-white dark:bg-slate-800 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-slate-200 dark:border-slate-700 group-hover:scale-[1.02]">
                    {/* Imagem de capa */}
                    {post.coverImage && (
                        <div className="relative h-48 overflow-hidden">
                            <Image
                                src={post.coverImage}
                                alt={post.title}
                                fill
                                className="object-cover group-hover:scale-110 transition-transform duration-300"
                            />
                            {post.featured && (
                                <div className="absolute top-3 right-3">
                                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-500 text-white">
                                        ⭐
                                    </span>
                                </div>
                            )}
                        </div>
                    )}

                    <div className="p-5">
                        {/* Categorias */}
                        {post.categories.length > 0 && (
                            <div className="flex flex-wrap gap-2 mb-3">
                                {post.categories.slice(0, 2).map(category => (
                                    <span
                                        key={category.id}
                                        className="inline-flex items-center px-2 py-1 text-xs font-medium rounded-full"
                                        style={{
                                            backgroundColor: `${category.color}20`,
                                            color: category.color
                                        }}
                                    >
                                        {category.icon} {category.name}
                                    </span>
                                ))}
                            </div>
                        )}

                        {/* Título */}
                        <h2 className="text-lg font-semibold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200 mb-2 line-clamp-2">
                            {post.title}
                        </h2>

                        {/* Excerpt */}
                        {showExcerpt && (
                            <p className="text-slate-600 dark:text-slate-400 text-sm mb-4 line-clamp-3">
                                {post.excerpt}
                            </p>
                        )}

                        {/* Metadados */}
                        <div className="flex items-center justify-between text-sm text-slate-500 dark:text-slate-400 mb-3">
                            <div className="flex items-center space-x-2">
                                <Image
                                    src={post.author.avatar}
                                    alt={post.author.name}
                                    width={20}
                                    height={20}
                                    className="rounded-full"
                                />
                                <span>{post.author.name}</span>
                            </div>

                            <time dateTime={post.publishedAt}>
                                {formatDate(post.publishedAt)}
                            </time>
                        </div>

                        <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
                            <span>{formatReadingTime(post.readingTime)}</span>

                            <div className="flex items-center space-x-3">
                                {post.views && (
                                    <span className="flex items-center space-x-1">
                                        <span>👁️</span>
                                        <span>{post.views}</span>
                                    </span>
                                )}
                                {post.likes && (
                                    <span className="flex items-center space-x-1">
                                        <span>❤️</span>
                                        <span>{post.likes}</span>
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>
                </article>
            </Link>
        </AnimatedCard>
    );
};

export default BlogCard;