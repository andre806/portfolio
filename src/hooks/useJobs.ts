import { useState, useMemo } from 'react';
import { Job, JobFilters, JobStats } from '../models/Job';
import { jobsData, jobStats, availableTechnologies, availableLocations } from '../config/jobsData';

interface JobApplicationData {
    name: string;
    email: string;
    phone?: string;
    resume: File | string;
    coverLetter?: string;
    portfolio?: string;
    linkedIn?: string;
    github?: string;
}

const initialFilters: JobFilters = {
    search: '',
    location: '',
    type: [],
    level: [],
    category: [],
    remote: null,
    salaryMin: 0,
    salaryMax: 20000,
    technologies: [],
    featured: false,
    urgent: false
};

export const useJobs = () => {
    const [jobs, setJobs] = useState<Job[]>(jobsData);
    const [filters, setFilters] = useState<JobFilters>(initialFilters);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'salary-high' | 'salary-low' | 'featured'>('newest');

    // Filtrar vagas baseado nos filtros atuais
    const filteredJobs = useMemo(() => {
        let filtered = [...jobs];

        // Filtro de busca
        if (filters.search) {
            const searchLower = filters.search.toLowerCase();
            filtered = filtered.filter(job =>
                job.title.toLowerCase().includes(searchLower) ||
                job.company.toLowerCase().includes(searchLower) ||
                job.description.toLowerCase().includes(searchLower) ||
                job.technologies.some(tech => tech.toLowerCase().includes(searchLower))
            );
        }

        // Filtro de localização
        if (filters.location) {
            filtered = filtered.filter(job =>
                job.location.toLowerCase().includes(filters.location.toLowerCase())
            );
        }

        // Filtro de tipo de vaga
        if (filters.type.length > 0) {
            filtered = filtered.filter(job => filters.type.includes(job.type));
        }

        // Filtro de nível
        if (filters.level.length > 0) {
            filtered = filtered.filter(job => filters.level.includes(job.level));
        }

        // Filtro de categoria
        if (filters.category.length > 0) {
            filtered = filtered.filter(job => filters.category.includes(job.category));
        }

        // Filtro de remote
        if (filters.remote !== null) {
            filtered = filtered.filter(job => job.remote === filters.remote);
        }

        // Filtro de salário
        filtered = filtered.filter(job => {
            if (!job.salary) return true;

            let monthlySalary = job.salary.min;
            if (job.salary.period === 'hour') {
                monthlySalary = job.salary.min * 160; // ~160 horas por mês
            } else if (job.salary.period === 'year') {
                monthlySalary = job.salary.min / 12;
            }

            return monthlySalary >= filters.salaryMin && monthlySalary <= filters.salaryMax;
        });

        // Filtro de tecnologias
        if (filters.technologies.length > 0) {
            filtered = filtered.filter(job =>
                filters.technologies.some(tech =>
                    job.technologies.some(jobTech =>
                        jobTech.toLowerCase().includes(tech.toLowerCase())
                    )
                )
            );
        }

        // Filtro de featured
        if (filters.featured) {
            filtered = filtered.filter(job => job.featured);
        }

        // Filtro de urgent
        if (filters.urgent) {
            filtered = filtered.filter(job => job.urgent);
        }

        return filtered;
    }, [jobs, filters]);

    // Ordenar vagas
    const sortedJobs = useMemo(() => {
        const sorted = [...filteredJobs];

        switch (sortBy) {
            case 'newest':
                return sorted.sort((a, b) => new Date(b.posted).getTime() - new Date(a.posted).getTime());
            case 'oldest':
                return sorted.sort((a, b) => new Date(a.posted).getTime() - new Date(b.posted).getTime());
            case 'salary-high':
                return sorted.sort((a, b) => {
                    const salaryA = a.salary ? a.salary.max : 0;
                    const salaryB = b.salary ? b.salary.max : 0;
                    return salaryB - salaryA;
                });
            case 'salary-low':
                return sorted.sort((a, b) => {
                    const salaryA = a.salary ? a.salary.min : 0;
                    const salaryB = b.salary ? b.salary.min : 0;
                    return salaryA - salaryB;
                });
            case 'featured':
                return sorted.sort((a, b) => {
                    if (a.featured && !b.featured) return -1;
                    if (!a.featured && b.featured) return 1;
                    return new Date(b.posted).getTime() - new Date(a.posted).getTime();
                });
            default:
                return sorted;
        }
    }, [filteredJobs, sortBy]);

    // Estatísticas das vagas filtradas
    const filteredStats = useMemo(() => {
        const stats: JobStats = {
            total: filteredJobs.length,
            featured: filteredJobs.filter(job => job.featured).length,
            remote: filteredJobs.filter(job => job.remote).length,
            byCategory: {
                frontend: filteredJobs.filter(job => job.category === 'frontend').length,
                backend: filteredJobs.filter(job => job.category === 'backend').length,
                fullstack: filteredJobs.filter(job => job.category === 'fullstack').length,
                mobile: filteredJobs.filter(job => job.category === 'mobile').length,
                devops: filteredJobs.filter(job => job.category === 'devops').length,
                data: filteredJobs.filter(job => job.category === 'data').length,
                design: filteredJobs.filter(job => job.category === 'design').length,
                product: filteredJobs.filter(job => job.category === 'product').length,
                other: filteredJobs.filter(job => job.category === 'other').length
            },
            byLevel: {
                junior: filteredJobs.filter(job => job.level === 'junior').length,
                mid: filteredJobs.filter(job => job.level === 'mid').length,
                senior: filteredJobs.filter(job => job.level === 'senior').length,
                lead: filteredJobs.filter(job => job.level === 'lead').length,
                principal: filteredJobs.filter(job => job.level === 'principal').length
            },
            byType: {
                'full-time': filteredJobs.filter(job => job.type === 'full-time').length,
                'part-time': filteredJobs.filter(job => job.type === 'part-time').length,
                contract: filteredJobs.filter(job => job.type === 'contract').length,
                freelance: filteredJobs.filter(job => job.type === 'freelance').length,
                internship: filteredJobs.filter(job => job.type === 'internship').length
            },
            avgSalary: jobStats.avgSalary,
            topTechnologies: jobStats.topTechnologies,
            topCompanies: jobStats.topCompanies
        };

        return stats;
    }, [filteredJobs]);

    // Função para atualizar filtros
    const updateFilters = (newFilters: Partial<JobFilters>) => {
        setFilters(prev => ({ ...prev, ...newFilters }));
    };

    // Função para limpar filtros
    const clearFilters = () => {
        setFilters(initialFilters);
    };

    // Função para buscar vaga por ID
    const getJobById = (id: string): Job | undefined => {
        return jobs.find(job => job.id === id);
    };

    // Função para buscar vagas similares
    const getSimilarJobs = (job: Job, limit: number = 3): Job[] => {
        return jobs
            .filter(j => j.id !== job.id)
            .filter(j =>
                j.category === job.category ||
                j.level === job.level ||
                j.technologies.some(tech => job.technologies.includes(tech))
            )
            .slice(0, limit);
    };

    // Simular carregamento de vagas (para futuras integrações com APIs)
    const refreshJobs = async () => {
        setLoading(true);
        setError(null);

        try {
            // Simula chamada para API
            await new Promise(resolve => setTimeout(resolve, 1000));
            setJobs(jobsData);
        } catch {
            setError('Erro ao carregar vagas');
        } finally {
            setLoading(false);
        }
    };

    // Função para aplicar para uma vaga
    const applyToJob = async (jobId: string, applicationData: JobApplicationData) => {
        setLoading(true);
        setError(null);

        try {
            // Simula envio da aplicação
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Em uma implementação real, aqui seria feita a chamada para a API
            console.log('Application submitted:', { jobId, applicationData });

            return { success: true, message: 'Aplicação enviada com sucesso!' };
        } catch {
            setError('Erro ao enviar aplicação');
            return { success: false, message: 'Erro ao enviar aplicação' };
        } finally {
            setLoading(false);
        }
    };

    // Função para favoritar vaga (localStorage)
    const toggleFavorite = (jobId: string) => {
        if (typeof window === 'undefined') return; // Não executa no servidor
        const favorites = JSON.parse(localStorage.getItem('job-favorites') || '[]');
        const isFavorited = favorites.includes(jobId);

        if (isFavorited) {
            const newFavorites = favorites.filter((id: string) => id !== jobId);
            localStorage.setItem('job-favorites', JSON.stringify(newFavorites));
        } else {
            localStorage.setItem('job-favorites', JSON.stringify([...favorites, jobId]));
        }
    };

    // Função para verificar se vaga está favoritada
    const isFavorited = (jobId: string): boolean => {
        if (typeof window === 'undefined') return false; // Retorna false no servidor
        const favorites = JSON.parse(localStorage.getItem('job-favorites') || '[]');
        return favorites.includes(jobId);
    };

    return {
        // Estados
        jobs: sortedJobs,
        allJobs: jobs,
        filters,
        loading,
        error,
        sortBy,

        // Estatísticas
        stats: filteredStats,
        globalStats: jobStats,

        // Dados auxiliares
        availableTechnologies,
        availableLocations,

        // Funções
        updateFilters,
        clearFilters,
        setSortBy,
        getJobById,
        getSimilarJobs,
        refreshJobs,
        applyToJob,
        toggleFavorite,
        isFavorited,

        // Estados computados
        hasActiveFilters: Object.values(filters).some(value =>
            Array.isArray(value) ? value.length > 0 :
                typeof value === 'boolean' ? value :
                    value !== '' && value !== 0 && value !== 20000 && value !== null
        ),
        isEmpty: sortedJobs.length === 0,
        resultCount: sortedJobs.length
    };
};
