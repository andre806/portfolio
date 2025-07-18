'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Job } from '../../models/Job';
import { useJobs } from '../../hooks/useJobs';

interface JobDetailsModalProps {
    job: Job;
    isOpen: boolean;
    onClose: () => void;
}

const JobDetailsModal: React.FC<JobDetailsModalProps> = ({ job, isOpen, onClose }) => {
    const { getSimilarJobs, applyToJob, toggleFavorite, isFavorited } = useJobs();
    const [showApplicationForm, setShowApplicationForm] = useState(false);
    const [applicationData, setApplicationData] = useState({
        name: '',
        email: '',
        resume: '' as string,
        coverLetter: '',
        linkedin: '',
        portfolio: ''
    });
    const [isApplying, setIsApplying] = useState(false);
    const [applicationResult, setApplicationResult] = useState<{ success: boolean; message: string } | null>(null);

    const similarJobs = getSimilarJobs(job);
    const favorited = isFavorited(job.id);

    if (!isOpen) return null;

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

    const handleApply = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsApplying(true);

        const result = await applyToJob(job.id, applicationData);
        setApplicationResult(result);
        setIsApplying(false);

        if (result.success) {
            setShowApplicationForm(false);
            setApplicationData({
                name: '',
                email: '',
                resume: '' as string,
                coverLetter: '',
                linkedin: '',
                portfolio: ''
            });
        }
    };

    const handleFavoriteToggle = () => {
        toggleFavorite(job.id);
    };

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen px-4">
                <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose}></div>

                <div className="relative bg-white dark:bg-gray-800 rounded-xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                    {/* Header */}
                    <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4 flex items-center justify-between">
                        <div className="flex items-center space-x-4">
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
                                <h2 className="text-xl font-bold text-gray-900 dark:text-white">{job.title}</h2>
                                <p className="text-gray-600 dark:text-gray-400">{job.company}</p>
                            </div>
                        </div>

                        <div className="flex items-center space-x-2">
                            <button
                                onClick={handleFavoriteToggle}
                                className={`p-2 rounded-full transition-colors ${favorited ? 'text-red-500 hover:text-red-600' : 'text-gray-400 hover:text-red-500'}`}
                            >
                                <svg className="w-6 h-6" fill={favorited ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                </svg>
                            </button>
                            <button
                                onClick={onClose}
                                className="p-2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    <div className="p-6">
                        {/* Status e badges */}
                        <div className="flex flex-wrap gap-2 mb-6">
                            {job.featured && (
                                <span className="px-3 py-1 bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300 text-sm font-medium rounded-full">
                                    ⭐ Destaque
                                </span>
                            )}
                            {job.urgent && (
                                <span className="px-3 py-1 bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300 text-sm font-medium rounded-full">
                                    🔥 Urgente
                                </span>
                            )}
                            <span className="px-3 py-1 bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300 text-sm font-medium rounded-full">
                                {job.level.charAt(0).toUpperCase() + job.level.slice(1)}
                            </span>
                            <span className="px-3 py-1 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 text-sm font-medium rounded-full">
                                {job.type === 'full-time' ? 'Integral' :
                                    job.type === 'part-time' ? 'Meio período' :
                                        job.type === 'contract' ? 'Contrato' :
                                            job.type === 'freelance' ? 'Freelance' : 'Estágio'}
                            </span>
                            {job.remote && (
                                <span className="px-3 py-1 bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300 text-sm font-medium rounded-full">
                                    🏠 Remoto
                                </span>
                            )}
                        </div>

                        {/* Informações básicas */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                                <div className="flex items-center mb-2">
                                    <svg className="w-5 h-5 text-gray-600 dark:text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    </svg>
                                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Localização</span>
                                </div>
                                <p className="text-gray-900 dark:text-white font-semibold">{job.location}</p>
                            </div>

                            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                                <div className="flex items-center mb-2">
                                    <svg className="w-5 h-5 text-gray-600 dark:text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                                    </svg>
                                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Salário</span>
                                </div>
                                <p className="text-gray-900 dark:text-white font-semibold">{formatSalary(job)}</p>
                            </div>

                            <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                                <div className="flex items-center mb-2">
                                    <svg className="w-5 h-5 text-gray-600 dark:text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span className="text-sm font-medium text-gray-600 dark:text-gray-400">Publicado</span>
                                </div>
                                <p className="text-gray-900 dark:text-white font-semibold">{getDaysAgo(job.posted)}</p>
                            </div>
                        </div>

                        {/* Descrição */}
                        <div className="mb-8">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Descrição da vaga</h3>
                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">{job.description}</p>
                        </div>

                        {/* Responsabilidades */}
                        <div className="mb-8">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Responsabilidades</h3>
                            <ul className="space-y-2">
                                {job.responsibilities.map((responsibility, index) => (
                                    <li key={index} className="flex items-start">
                                        <svg className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                        <span className="text-gray-700 dark:text-gray-300">{responsibility}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Requisitos */}
                        <div className="mb-8">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Requisitos</h3>
                            <ul className="space-y-2">
                                {job.requirements.map((requirement, index) => (
                                    <li key={index} className="flex items-start">
                                        <svg className="w-5 h-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                        <span className="text-gray-700 dark:text-gray-300">{requirement}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Benefícios */}
                        {job.benefits && job.benefits.length > 0 && (
                            <div className="mb-8">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Benefícios</h3>
                                <ul className="space-y-2">
                                    {job.benefits.map((benefit, index) => (
                                        <li key={index} className="flex items-start">
                                            <svg className="w-5 h-5 text-purple-500 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                            </svg>
                                            <span className="text-gray-700 dark:text-gray-300">{benefit}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Tecnologias */}
                        <div className="mb-8">
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Tecnologias</h3>
                            <div className="flex flex-wrap gap-2">
                                {job.technologies.map((tech, index) => (
                                    <span
                                        key={index}
                                        className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm rounded-full"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Prazo */}
                        {job.deadline && (
                            <div className="mb-8 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                                <div className="flex items-center">
                                    <svg className="w-5 h-5 text-yellow-600 dark:text-yellow-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.864-.833-2.634 0L1.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                                    </svg>
                                    <span className="text-yellow-800 dark:text-yellow-300 font-medium">
                                        Prazo para aplicação: {job.deadline.toLocaleDateString('pt-BR')}
                                    </span>
                                </div>
                            </div>
                        )}

                        {/* Resultados da aplicação */}
                        {applicationResult && (
                            <div className={`mb-6 p-4 rounded-lg ${applicationResult.success
                                ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800'
                                : 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800'
                                }`}>
                                <div className="flex items-center">
                                    <svg className={`w-5 h-5 mr-2 ${applicationResult.success ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`} fill="currentColor" viewBox="0 0 20 20">
                                        {applicationResult.success ? (
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        ) : (
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                        )}
                                    </svg>
                                    <span className={applicationResult.success ? 'text-green-800 dark:text-green-300' : 'text-red-800 dark:text-red-300'}>
                                        {applicationResult.message}
                                    </span>
                                </div>
                            </div>
                        )}

                        {/* Botões de ação */}
                        <div className="flex flex-wrap gap-4 mb-8">
                            {!showApplicationForm ? (
                                <>
                                    <button
                                        onClick={() => setShowApplicationForm(true)}
                                        className="flex-1 sm:flex-none px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
                                    >
                                        Candidatar-se
                                    </button>
                                    <a
                                        href={job.applicationUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex-1 sm:flex-none px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-center font-medium"
                                    >
                                        Ver no site original
                                    </a>
                                </>
                            ) : (
                                <button
                                    onClick={() => setShowApplicationForm(false)}
                                    className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors font-medium"
                                >
                                    ← Voltar
                                </button>
                            )}
                        </div>

                        {/* Formulário de aplicação */}
                        {showApplicationForm && (
                            <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg mb-8">
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                                    Candidatar-se para {job.title}
                                </h3>

                                <form onSubmit={handleApply} className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                Nome completo *
                                            </label>
                                            <input
                                                type="text"
                                                required
                                                value={applicationData.name}
                                                onChange={(e) => setApplicationData({ ...applicationData, name: e.target.value })}
                                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                E-mail *
                                            </label>
                                            <input
                                                type="email"
                                                required
                                                value={applicationData.email}
                                                onChange={(e) => setApplicationData({ ...applicationData, email: e.target.value })}
                                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Currículo/Resume *
                                        </label>
                                        <input
                                            type="text"
                                            required
                                            value={applicationData.resume}
                                            onChange={(e) => setApplicationData({ ...applicationData, resume: e.target.value })}
                                            placeholder="Link para seu currículo (Google Drive, Dropbox, etc.)"
                                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                LinkedIn
                                            </label>
                                            <input
                                                type="url"
                                                value={applicationData.linkedin}
                                                onChange={(e) => setApplicationData({ ...applicationData, linkedin: e.target.value })}
                                                placeholder="https://linkedin.com/in/seuperfil"
                                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                                Portfólio
                                            </label>
                                            <input
                                                type="url"
                                                value={applicationData.portfolio}
                                                onChange={(e) => setApplicationData({ ...applicationData, portfolio: e.target.value })}
                                                placeholder="https://seuportfolio.com"
                                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                            Carta de apresentação *
                                        </label>
                                        <textarea
                                            required
                                            rows={6}
                                            value={applicationData.coverLetter}
                                            onChange={(e) => setApplicationData({ ...applicationData, coverLetter: e.target.value })}
                                            placeholder="Conte-nos por que você é o candidato ideal para esta vaga..."
                                            className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                    </div>

                                    <div className="flex gap-4">
                                        <button
                                            type="submit"
                                            disabled={isApplying}
                                            className={`flex-1 px-6 py-3 rounded-lg font-medium transition-colors ${isApplying
                                                ? 'bg-gray-400 cursor-not-allowed'
                                                : 'bg-blue-600 hover:bg-blue-700'
                                                } text-white`}
                                        >
                                            {isApplying ? 'Enviando...' : 'Enviar candidatura'}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        )}

                        {/* Vagas similares */}
                        {similarJobs.length > 0 && (
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Vagas similares</h3>
                                <div className="space-y-4">
                                    {similarJobs.map(similarJob => (
                                        <div key={similarJob.id} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors cursor-pointer">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <h4 className="font-medium text-gray-900 dark:text-white">{similarJob.title}</h4>
                                                    <p className="text-sm text-gray-600 dark:text-gray-400">{similarJob.company} • {similarJob.location}</p>
                                                </div>
                                                <div className="text-sm text-gray-600 dark:text-gray-400">
                                                    {formatSalary(similarJob)}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JobDetailsModal;
