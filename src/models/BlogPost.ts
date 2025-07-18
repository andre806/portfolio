export interface BlogPost {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    content: string;
    author: Author;
    publishedAt: string;
    updatedAt?: string;
    status: 'draft' | 'published' | 'archived';
    featured: boolean;
    coverImage?: string;
    readingTime: number; // em minutos
    views?: number;
    likes?: number;
    categories: Category[];
    tags: Tag[];
    seo: SEOData;
    relatedPosts?: string[]; // IDs de posts relacionados
}

export interface Author {
    id: string;
    name: string;
    avatar: string;
    bio: string;
    social: {
        twitter?: string;
        linkedin?: string;
        github?: string;
        website?: string;
    };
}

export interface Category {
    id: string;
    name: string;
    slug: string;
    description: string;
    color: string;
    icon?: string;
    postCount?: number;
}

export interface Tag {
    id: string;
    name: string;
    slug: string;
    color?: string;
    postCount?: number;
}

export interface SEOData {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string[];
    ogImage?: string;
    canonicalUrl?: string;
}

export interface BlogComment {
    id: string;
    postId: string;
    author: {
        name: string;
        email: string;
        avatar?: string;
        website?: string;
    };
    content: string;
    createdAt: string;
    updatedAt?: string;
    parentId?: string; // Para respostas
    likes: number;
    status: 'pending' | 'approved' | 'spam' | 'rejected';
}

export interface BlogStats {
    totalPosts: number;
    totalViews: number;
    totalLikes: number;
    totalComments: number;
    popularPosts: BlogPost[];
    recentPosts: BlogPost[];
    topCategories: Category[];
    topTags: Tag[];
}

export interface BlogFilters {
    search?: string;
    category?: string;
    tag?: string;
    author?: string;
    status?: BlogPost['status'];
    featured?: boolean;
    sortBy?: 'publishedAt' | 'views' | 'likes' | 'title';
    sortOrder?: 'asc' | 'desc';
    limit?: number;
    offset?: number;
}

export interface BlogPostNavigation {
    previous?: {
        id: string;
        title: string;
        slug: string;
    };
    next?: {
        id: string;
        title: string;
        slug: string;
    };
}

// Tipos para suporte a MDX
export interface MDXBlogPost extends Omit<BlogPost, 'content'> {
    content: string; // MDX content
    frontMatter: {
        [key: string]: string | number | boolean | string[] | undefined;
    };
    compiledSource?: string;
}

// Newsletter subscription
export interface NewsletterSubscription {
    id: string;
    email: string;
    name?: string;
    subscribedAt: string;
    active: boolean;
    preferences: {
        weekly: boolean;
        newPosts: boolean;
        featured: boolean;
    };
}

export default BlogPost;
