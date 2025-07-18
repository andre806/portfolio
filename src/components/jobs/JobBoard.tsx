'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useJobs } from '../../hooks/useJobs';
import { Job } from '../../models/Job';
import JobDetailsModal from './JobDetailsModal';

// Componente de Card de Vaga
const JobCard: React.FC<{ job: Job; onViewDetails: (job: Job) => void }> = ({ job, onViewDetails }) => {
    const { toggleFavorite, isFavorited } = useJobs();
    const [favorited, setFavorited] = useState(isFavorited(job.id));

    const handleFavoriteClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        toggleFavorite(job.id);
        setFavorited(!favorited);
    };

    const formatSalary = (job: Job) => {
        if (!job.salary) return 'Salário a combinar';

        const { min, max, currency, period } = job.salary;
        const periodText = period === 'hour' ? '/h' : period === 'month' ? '/mês' : '/ano';

        if (min === max) {
            return `${currency} ${min.toLocaleString()}${periodText}`;
        }
        return `${currency} ${min.toLocaleString()} - ${max.toLocaleString()}${periodText}`;
    };

    const getDaysAgo = (date: Date) => {
        const now = new Date();
        const diffTime = Math.abs(now.getTime() - date.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays === 1) return 'Há 1 dia';
        if (diffDays < 7) return `Há ${diffDays} dias`;
        if (diffDays < 30) return `Há ${Math.ceil(diffDays / 7)} semanas`;
        return `Há ${Math.ceil(diffDays / 30)} meses`;
    };

    const getLevelColor = (level: string) => {
        switch (level) {
            case 'junior': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
            case 'mid': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
            case 'senior': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
            case 'lead': return 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300';
            case 'principal': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300';
            default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
        }
    };

    const getTypeColor = (type: string) => {
        switch (type) {
            case 'full-time': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300';
            case 'part-time': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300';
            case 'contract': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300';
            case 'freelance': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300';
            case 'internship': return 'bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-300';
            default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300';
        }
    };

    return (
        <div
            className={`bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 cursor-pointer transition-all duration-300 hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-600 ${job.featured ? 'ring-2 ring-blue-500 ring-opacity-50' : ''}`}
            onClick={() => onViewDetails(job)}
        >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                        {job.companyLogo ? (
                            <Image
                                src={job.companyLogo}
                                alt={job.company}
                                width={32}
                                height={32}
                                className="rounded"
                            />
                        ) : (
                            <span className="text-xl font-bold text-gray-600 dark:text-gray-400">
                                {job.company[0]}
                            </span>
                        )}
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                            {job.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400">{job.company}</p>
                    </div>
                </div>

                <div className="flex items-center space-x-2">
                    {job.featured && (
                        <span className="px-2 py-1 bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300 text-xs font-medium rounded-full">
                            Destaque
                        </span>
                    )}
                    {job.urgent && (
                        <span className="px-2 py-1 bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300 text-xs font-medium rounded-full">
                            Urgente
                        </span>
                    )}
                    <button
                        onClick={handleFavoriteClick}
                        className={`p-2 rounded-full transition-colors ${favorited ? 'text-red-500 hover:text-red-600' : 'text-gray-400 hover:text-red-500'}`}
                    >
                        <svg className="w-5 h-5" fill={favorited ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Info */}
            <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="flex items-center text-gray-600 dark:text-gray-400">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="text-sm">{job.location}</span>
                    {job.remote && (
                        <span className="ml-2 px-2 py-1 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 text-xs rounded-full">
                            Remoto
                        </span>
                    )}
                </div>
                <div className="flex items-center text-gray-600 dark:text-gray-400">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                    </svg>
                    <span className="text-sm font-medium">{formatSalary(job)}</span>
                </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getLevelColor(job.level)}`}>
                    {job.level.charAt(0).toUpperCase() + job.level.slice(1)}
                </span>
                <span className={`px-2 py-1 text-xs font-medium rounded-full ${getTypeColor(job.type)}`}>
                    {job.type === 'full-time' ? 'Integral' :
                        job.type === 'part-time' ? 'Meio período' :
                            job.type === 'contract' ? 'Contrato' :
                                job.type === 'freelance' ? 'Freelance' : 'Estágio'}
                </span>
            </div>

            {/* Technologies */}
            <div className="flex flex-wrap gap-1 mb-4">
                {job.technologies.slice(0, 5).map((tech, index) => (
                    <span
                        key={index}
                        className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded"
                    >
                        {tech}
                    </span>
                ))}
                {job.technologies.length > 5 && (
                    <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 text-xs rounded">
                        +{job.technologies.length - 5}
                    </span>
                )}
            </div>

            {/* Description */}
            <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2 mb-4">
                {job.description}
            </p>

            {/* Footer */}
            <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500 dark:text-gray-400">
                    {getDaysAgo(job.posted)}
                </span>
                <button className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-medium">
                    Ver detalhes →
                </button>
            </div>
        </div>
    );
};

// Componente de Filtros
const JobFilters: React.FC = () => {
    const { filters, updateFilters, clearFilters, hasActiveFilters, availableTechnologies, availableLocations } = useJobs();
    const [showAllTechs, setShowAllTechs] = useState(false);

    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Filtros</h3>
                {hasActiveFilters && (
                    <button
                        onClick={clearFilters}
                        className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-medium"
                    >
                        Limpar filtros
                    </button>
                )}
            </div>

            <div className="space-y-6">
                {/* Busca */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Buscar
                    </label>
                    <input
                        type="text"
                        value={filters.search}
                        onChange={(e) => updateFilters({ search: e.target.value })}
                        placeholder="Título, empresa, tecnologia..."
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                </div>

                {/* Localização */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Localização
                    </label>
                    <select
                        value={filters.location}
                        onChange={(e) => updateFilters({ location: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                        <option value="">Todas as localizações</option>
                        {availableLocations.map(location => (
                            <option key={location} value={location}>{location}</option>
                        ))}
                    </select>
                </div>

                {/* Tipo de vaga */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Tipo de vaga
                    </label>
                    <div className="space-y-2">
                        {[
                            { value: 'full-time', label: 'Integral' },
                            { value: 'part-time', label: 'Meio período' },
                            { value: 'contract', label: 'Contrato' },
                            { value: 'freelance', label: 'Freelance' },
                            { value: 'internship', label: 'Estágio' }
                        ].map(type => (
                            <label key={type.value} className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={filters.type.includes(type.value as 'full-time' | 'part-time' | 'contract' | 'freelance' | 'internship')}
                                    onChange={(e) => {
                                        const newTypes = e.target.checked
                                            ? [...filters.type, type.value as 'full-time' | 'part-time' | 'contract' | 'freelance' | 'internship']
                                            : filters.type.filter(t => t !== type.value);
                                        updateFilters({ type: newTypes });
                                    }}
                                    className="w-4 h-4 text-blue-600 rounded border-gray-300 dark:border-gray-600 focus:ring-blue-500"
                                />
                                <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">{type.label}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Nível */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Nível
                    </label>
                    <div className="space-y-2">
                        {[
                            { value: 'junior', label: 'Júnior' },
                            { value: 'mid', label: 'Pleno' },
                            { value: 'senior', label: 'Sênior' },
                            { value: 'lead', label: 'Lead' },
                            { value: 'principal', label: 'Principal' }
                        ].map(level => (
                            <label key={level.value} className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={filters.level.includes(level.value as 'junior' | 'mid' | 'senior' | 'lead' | 'principal')}
                                    onChange={(e) => {
                                        const newLevels = e.target.checked
                                            ? [...filters.level, level.value as 'junior' | 'mid' | 'senior' | 'lead' | 'principal']
                                            : filters.level.filter(l => l !== level.value);
                                        updateFilters({ level: newLevels });
                                    }}
                                    className="w-4 h-4 text-blue-600 rounded border-gray-300 dark:border-gray-600 focus:ring-blue-500"
                                />
                                <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">{level.label}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Categoria */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Categoria
                    </label>
                    <div className="space-y-2">
                        {[
                            { value: 'frontend', label: 'Frontend' },
                            { value: 'backend', label: 'Backend' },
                            { value: 'fullstack', label: 'Full Stack' },
                            { value: 'mobile', label: 'Mobile' },
                            { value: 'devops', label: 'DevOps' },
                            { value: 'data', label: 'Data Science' },
                            { value: 'design', label: 'Design' }
                        ].map(category => (
                            <label key={category.value} className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={filters.category.includes(category.value as 'frontend' | 'backend' | 'fullstack' | 'mobile' | 'devops' | 'data' | 'design')}
                                    onChange={(e) => {
                                        const newCategories = e.target.checked
                                            ? [...filters.category, category.value as 'frontend' | 'backend' | 'fullstack' | 'mobile' | 'devops' | 'data' | 'design']
                                            : filters.category.filter(c => c !== category.value);
                                        updateFilters({ category: newCategories });
                                    }}
                                    className="w-4 h-4 text-blue-600 rounded border-gray-300 dark:border-gray-600 focus:ring-blue-500"
                                />
                                <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">{category.label}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Remote */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Trabalho remoto
                    </label>
                    <div className="space-y-2">
                        <label className="flex items-center">
                            <input
                                type="radio"
                                name="remote"
                                checked={filters.remote === null}
                                onChange={() => updateFilters({ remote: null })}
                                className="w-4 h-4 text-blue-600 border-gray-300 dark:border-gray-600 focus:ring-blue-500"
                            />
                            <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Todos</span>
                        </label>
                        <label className="flex items-center">
                            <input
                                type="radio"
                                name="remote"
                                checked={filters.remote === true}
                                onChange={() => updateFilters({ remote: true })}
                                className="w-4 h-4 text-blue-600 border-gray-300 dark:border-gray-600 focus:ring-blue-500"
                            />
                            <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Apenas remoto</span>
                        </label>
                        <label className="flex items-center">
                            <input
                                type="radio"
                                name="remote"
                                checked={filters.remote === false}
                                onChange={() => updateFilters({ remote: false })}
                                className="w-4 h-4 text-blue-600 border-gray-300 dark:border-gray-600 focus:ring-blue-500"
                            />
                            <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Presencial/Híbrido</span>
                        </label>
                    </div>
                </div>

                {/* Salário */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Faixa salarial (BRL/mês)
                    </label>
                    <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                            <input
                                type="number"
                                value={filters.salaryMin}
                                onChange={(e) => updateFilters({ salaryMin: Number(e.target.value) })}
                                placeholder="Min"
                                className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                            <span className="text-gray-500">até</span>
                            <input
                                type="number"
                                value={filters.salaryMax}
                                onChange={(e) => updateFilters({ salaryMax: Number(e.target.value) })}
                                placeholder="Max"
                                className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                    </div>
                </div>

                {/* Tecnologias */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Tecnologias
                    </label>
                    <div className="space-y-2 max-h-48 overflow-y-auto">
                        {(showAllTechs ? availableTechnologies : availableTechnologies.slice(0, 8)).map(tech => (
                            <label key={tech} className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={filters.technologies.includes(tech)}
                                    onChange={(e) => {
                                        const newTechs = e.target.checked
                                            ? [...filters.technologies, tech]
                                            : filters.technologies.filter(t => t !== tech);
                                        updateFilters({ technologies: newTechs });
                                    }}
                                    className="w-4 h-4 text-blue-600 rounded border-gray-300 dark:border-gray-600 focus:ring-blue-500"
                                />
                                <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">{tech}</span>
                            </label>
                        ))}
                    </div>
                    {availableTechnologies.length > 8 && (
                        <button
                            onClick={() => setShowAllTechs(!showAllTechs)}
                            className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 text-sm font-medium mt-2"
                        >
                            {showAllTechs ? 'Ver menos' : 'Ver mais tecnologias'}
                        </button>
                    )}
                </div>

                {/* Destacadas */}
                <div className="space-y-2">
                    <label className="flex items-center">
                        <input
                            type="checkbox"
                            checked={filters.featured}
                            onChange={(e) => updateFilters({ featured: e.target.checked })}
                            className="w-4 h-4 text-blue-600 rounded border-gray-300 dark:border-gray-600 focus:ring-blue-500"
                        />
                        <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Apenas destacadas</span>
                    </label>
                    <label className="flex items-center">
                        <input
                            type="checkbox"
                            checked={filters.urgent}
                            onChange={(e) => updateFilters({ urgent: e.target.checked })}
                            className="w-4 h-4 text-blue-600 rounded border-gray-300 dark:border-gray-600 focus:ring-blue-500"
                        />
                        <span className="ml-2 text-sm text-gray-700 dark:text-gray-300">Apenas urgentes</span>
                    </label>
                </div>
            </div>
        </div>
    );
};

// Componente principal do JobBoard
const JobBoard: React.FC = () => {
    const {
        jobs,
        loading,
        error,
        sortBy,
        setSortBy,
        resultCount,
        isEmpty,
        hasActiveFilters,
        refreshJobs,
        stats
    } = useJobs();

    const [selectedJob, setSelectedJob] = useState<Job | null>(null);

    const handleJobSelect = (job: Job) => {
        setSelectedJob(job);
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <div className="text-red-600 dark:text-red-400 text-lg mb-4">{error}</div>
                    <button
                        onClick={refreshJobs}
                        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        Tentar novamente
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                        Vagas de Emprego
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                        Encontre oportunidades incríveis na área de tecnologia
                    </p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                        <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                            {stats.total}
                        </div>
                        <div className="text-gray-600 dark:text-gray-400">Total de vagas</div>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                        <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">
                            {stats.remote}
                        </div>
                        <div className="text-gray-600 dark:text-gray-400">Trabalho remoto</div>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                        <div className="text-3xl font-bold text-yellow-600 dark:text-yellow-400 mb-2">
                            {stats.featured}
                        </div>
                        <div className="text-gray-600 dark:text-gray-400">Vagas em destaque</div>
                    </div>
                    <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
                        <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                            R$ {stats.avgSalary.mid.toLocaleString()}
                        </div>
                        <div className="text-gray-600 dark:text-gray-400">Salário médio (Pleno)</div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Sidebar com filtros */}
                    <div className="lg:col-span-1">
                        <JobFilters />
                    </div>

                    {/* Lista de vagas */}
                    <div className="lg:col-span-3">
                        {/* Header da lista */}
                        <div className="flex items-center justify-between mb-6">
                            <div className="text-gray-600 dark:text-gray-400">
                                {resultCount} {resultCount === 1 ? 'vaga encontrada' : 'vagas encontradas'}
                                {hasActiveFilters && ' (filtrado)'}
                            </div>
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value as 'newest' | 'oldest' | 'salary-high' | 'salary-low' | 'featured')}
                                className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            >
                                <option value="newest">Mais recentes</option>
                                <option value="oldest">Mais antigas</option>
                                <option value="salary-high">Maior salário</option>
                                <option value="salary-low">Menor salário</option>
                                <option value="featured">Destacadas primeiro</option>
                            </select>
                        </div>

                        {/* Lista de vagas */}
                        {isEmpty ? (
                            <div className="text-center py-12">
                                <svg className="w-24 h-24 mx-auto text-gray-400 dark:text-gray-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                </svg>
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                                    Nenhuma vaga encontrada
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400 mb-4">
                                    Tente ajustar os filtros ou limpar a busca
                                </p>
                                {hasActiveFilters && (
                                    <button
                                        onClick={() => window.location.reload()}
                                        className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                    >
                                        Ver todas as vagas
                                    </button>
                                )}
                            </div>
                        ) : (
                            <div className="space-y-6">
                                {jobs.map(job => (
                                    <JobCard
                                        key={job.id}
                                        job={job}
                                        onViewDetails={handleJobSelect}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Modal de detalhes */}
            {selectedJob && (
                <JobDetailsModal
                    job={selectedJob}
                    isOpen={!!selectedJob}
                    onClose={() => setSelectedJob(null)}
                />
            )}
        </div>
    );
};

export default JobBoard;
