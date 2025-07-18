// Modelo de dados para vagas de emprego
export interface Job {
    id: string;
    title: string;
    company: string;
    companyLogo?: string;
    location: string;
    type: 'full-time' | 'part-time' | 'contract' | 'freelance' | 'internship';
    level: 'junior' | 'mid' | 'senior' | 'lead' | 'principal';
    salary?: {
        min: number;
        max: number;
        currency: string;
        period: 'hour' | 'month' | 'year';
    };
    description: string;
    requirements: string[];
    responsibilities: string[];
    benefits?: string[];
    technologies: string[];
    remote: boolean;
    featured: boolean;
    urgent: boolean;
    posted: Date;
    deadline?: Date;
    applicationUrl: string;
    source: 'linkedin' | 'github' | 'stackoverflow' | 'internal' | 'other';
    category: 'frontend' | 'backend' | 'fullstack' | 'mobile' | 'devops' | 'data' | 'design' | 'product' | 'other';
}

export interface JobFilters {
    search: string;
    location: string;
    type: Job['type'][];
    level: Job['level'][];
    category: Job['category'][];
    remote: boolean | null;
    salaryMin: number;
    salaryMax: number;
    technologies: string[];
    featured: boolean;
    urgent: boolean;
}

export interface JobStats {
    total: number;
    featured: number;
    remote: number;
    byCategory: Record<Job['category'], number>;
    byLevel: Record<Job['level'], number>;
    byType: Record<Job['type'], number>;
    avgSalary: {
        junior: number;
        mid: number;
        senior: number;
    };
    topTechnologies: Array<{
        name: string;
        count: number;
    }>;
    topCompanies: Array<{
        name: string;
        count: number;
    }>;
}

export interface JobApplication {
    jobId: string;
    name: string;
    email: string;
    resume: File | null;
    coverLetter: string;
    linkedin?: string;
    portfolio?: string;
    appliedAt: Date;
}
