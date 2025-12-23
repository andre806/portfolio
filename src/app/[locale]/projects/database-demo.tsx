'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FaDatabase, FaFolder, FaCog, FaCheckCircle, FaExclamationTriangle, FaInfoCircle } from 'react-icons/fa'
import { useProjectsEnhanced } from '@/hooks/useProjectsEnhanced'
import { ProjectCard } from '@/components/project/ProjectCard'
import { ProjectDetails } from '@/components/project/ProjectDetails'
import { Project } from '@/models/Project'
import { createOrganizationPromptForDatabaseProject, validateDatabaseProjectData } from '@/utils/projectOrganization'
import { PROJECT_CONFIG } from '@/config/projectsConfig'

type ViewMode = 'static' | 'database' | 'both' | 'demo'

export default function DatabaseProjectsDemo() {
    const [viewMode, setViewMode] = useState<ViewMode>('demo')
    const [selectedProject, setSelectedProject] = useState<Project | null>(null)
    const [demoData, setDemoData] = useState<any>(null)
    const [validationResult, setValidationResult] = useState<any>(null)

    // Different hook configurations based on view mode
    const staticProjects = useProjectsEnhanced({ source: 'static' })
    const databaseProjects = useProjectsEnhanced({ source: 'database' })
    const allProjects = useProjectsEnhanced({ source: 'both' })

    // Get the appropriate data based on view mode
    const getCurrentProjects = () => {
        switch (viewMode) {
            case 'static':
                return staticProjects
            case 'database':
                return databaseProjects
            case 'both':
                return allProjects
            default:
                return staticProjects
        }
    }

    const currentProjects = getCurrentProjects()

    // Demo project data for organization example
    const demoProjectData = {
        "id": "sample-ai-chatbot",
        "title": "AI Customer Support Chatbot",
        "description": "An intelligent chatbot system built with natural language processing capabilities to provide 24/7 customer support. Features include conversation history, sentiment analysis, and integration with existing CRM systems.",
        "short_description": "AI-powered customer support automation",
        "image_url": "/projects/ai-chatbot.jpg",
        "technologies": ["Python", "TensorFlow", "React", "Node.js", "MongoDB"],
        "category": "ai",
        "status": "completed",
        "is_featured": true,
        "github_url": "https://github.com/user/ai-chatbot",
        "live_url": "https://ai-chatbot-demo.com",
        "documentation_url": "https://docs.ai-chatbot.com",
        "start_date": "2024-02-01",
        "end_date": "2024-05-15",
        "features": [
            "Natural language understanding and response",
            "Multi-language support (English, Spanish, French)",
            "Sentiment analysis for customer satisfaction tracking",
            "CRM system integration (Salesforce, HubSpot)",
            "Real-time conversation analytics dashboard",
            "Automated ticket escalation for complex issues"
        ],
        "tags": ["AI", "NLP", "Customer Service", "Automation", "Machine Learning"],
        "priority": 1,
        "is_public": true,
        "metrics": [
            { "label": "Response Time", "value": "< 2s" },
            { "label": "Accuracy Rate", "value": "94%" },
            { "label": "Customer Satisfaction", "value": "4.8/5" },
            { "label": "Daily Interactions", "value": "2,500+" }
        ]
    }

    // Generate organization prompt and validation on mount
    useEffect(() => {
        const prompt = createOrganizationPromptForDatabaseProject(demoProjectData)
        const validation = validateDatabaseProjectData(demoProjectData)
        
        setDemoData({
            projectData: demoProjectData,
            prompt,
            validation
        })
        setValidationResult(validation)
    }, [])

    const getViewModeIcon = (mode: ViewMode) => {
        switch (mode) {
            case 'static': return <FaFolder />
            case 'database': return <FaDatabase />
            case 'both': return <FaCog />
            case 'demo': return <FaInfoCircle />
            default: return <FaFolder />
        }
    }

    const getStatusColor = () => {
        if (currentProjects.error) return 'text-red-500'
        if (currentProjects.isLoading) return 'text-yellow-500'
        return 'text-green-500'
    }

    const getStatusIcon = () => {
        if (currentProjects.error) return <FaExclamationTriangle />
        if (currentProjects.isLoading) return <FaCog className="animate-spin" />
        return <FaCheckCircle />
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <motion.div
                    className="text-center mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent mb-6">
                        Database Project Organization
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-400 max-w-4xl mx-auto">
                        Demonstração de como organizar projetos do banco de dados da mesma forma que os projetos estáticos
                    </p>
                </motion.div>

                {/* View Mode Selector */}
                <motion.div
                    className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
                        <div>
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
                                Modo de Visualização
                            </h3>
                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                Escolha a fonte dos projetos para demonstrar a organização
                            </p>
                        </div>
                        
                        <div className="flex gap-2 flex-wrap">
                            {[
                                { mode: 'static' as ViewMode, label: 'Projetos Estáticos', desc: 'Hardcoded projects' },
                                { mode: 'database' as ViewMode, label: 'Banco de Dados', desc: 'Database projects only' },
                                { mode: 'both' as ViewMode, label: 'Combinados', desc: 'Static + Database' },
                                { mode: 'demo' as ViewMode, label: 'Demonstração', desc: 'Organization example' }
                            ].map(({ mode, label, desc }) => (
                                <button
                                    key={mode}
                                    onClick={() => setViewMode(mode)}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all ${
                                        viewMode === mode
                                            ? 'bg-blue-600 text-white shadow-md'
                                            : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                                    }`}
                                    title={desc}
                                >
                                    {getViewModeIcon(mode)}
                                    <span className="hidden sm:inline">{label}</span>
                                </button>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* Status Information */}
                <motion.div
                    className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                >
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="text-center">
                            <div className={`text-2xl mb-2 ${getStatusColor()}`}>
                                {getStatusIcon()}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">Status</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                                {currentProjects.totalProjects}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">Total Projects</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                                {currentProjects.source}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">Data Source</div>
                        </div>
                        <div className="text-center">
                            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                                {currentProjects.stats.completionRate}%
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">Completion Rate</div>
                        </div>
                    </div>

                    {currentProjects.error && (
                        <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                            <div className="flex items-center gap-2 text-red-700 dark:text-red-400">
                                <FaExclamationTriangle />
                                <span className="font-medium">Error loading projects:</span>
                            </div>
                            <p className="text-red-600 dark:text-red-300 mt-1 text-sm">{currentProjects.error}</p>
                        </div>
                    )}
                </motion.div>

                {/* Demo Mode: Show organization example */}
                {viewMode === 'demo' && demoData && (
                    <motion.div
                        className="space-y-8 mb-8"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        {/* Project Data Example */}
                        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
                            <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
                                📊 Exemplo de Projeto do Banco de Dados
                            </h3>
                            <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 overflow-x-auto">
                                <pre className="text-sm text-gray-700 dark:text-gray-300">
                                    {JSON.stringify(demoData.projectData, null, 2)}
                                </pre>
                            </div>
                        </div>

                        {/* Validation Results */}
                        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
                            <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
                                ✅ Validação do Projeto
                            </h3>
                            
                            <div className={`mb-4 p-4 rounded-lg border ${
                                validationResult?.isValid 
                                    ? 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800'
                                    : 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800'
                            }`}>
                                <div className={`flex items-center gap-2 ${
                                    validationResult?.isValid ? 'text-green-700 dark:text-green-400' : 'text-red-700 dark:text-red-400'
                                }`}>
                                    {validationResult?.isValid ? <FaCheckCircle /> : <FaExclamationTriangle />}
                                    <span className="font-medium">
                                        {validationResult?.isValid ? 'Projeto válido' : 'Projeto com problemas'}
                                    </span>
                                </div>
                            </div>

                            {validationResult?.errors?.length > 0 && (
                                <div className="mb-4">
                                    <h4 className="font-medium text-red-700 dark:text-red-400 mb-2">Erros encontrados:</h4>
                                    <ul className="list-disc list-inside space-y-1">
                                        {validationResult.errors.map((error: string, index: number) => (
                                            <li key={index} className="text-sm text-red-600 dark:text-red-300">{error}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {validationResult?.suggestions?.length > 0 && (
                                <div>
                                    <h4 className="font-medium text-yellow-700 dark:text-yellow-400 mb-2">Sugestões:</h4>
                                    <ul className="list-disc list-inside space-y-1">
                                        {validationResult.suggestions.map((suggestion: string, index: number) => (
                                            <li key={index} className="text-sm text-yellow-600 dark:text-yellow-300">{suggestion}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>

                        {/* Organization Prompt */}
                        <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
                            <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200">
                                📝 Prompt de Organização
                            </h3>
                            <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 max-h-96 overflow-y-auto">
                                <pre className="text-xs text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                                    {demoData.prompt}
                                </pre>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* Projects Display */}
                {viewMode !== 'demo' && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.5 }}
                    >
                        {/* Projects Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {currentProjects.projects.map((project) => (
                                <ProjectCard
                                    key={project.id}
                                    project={project}
                                    viewMode="grid"
                                    onClick={setSelectedProject}
                                />
                            ))}
                        </div>

                        {/* No Projects Message */}
                        {currentProjects.projects.length === 0 && !currentProjects.isLoading && (
                            <div className="text-center py-12">
                                <div className="text-gray-400 dark:text-gray-600 mb-4">
                                    <FaDatabase className="text-4xl mx-auto mb-4" />
                                    <p className="text-xl">Nenhum projeto encontrado</p>
                                    <p className="text-sm">
                                        {viewMode === 'database' 
                                            ? 'Projetos do banco de dados não disponíveis'
                                            : 'Nenhum projeto disponível no modo selecionado'
                                        }
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* Project Details Modal */}
                        {selectedProject && (
                            <ProjectDetails
                                project={selectedProject}
                                isOpen={!!selectedProject}
                                onClose={() => setSelectedProject(null)}
                            />
                        )}
                    </motion.div>
                )}

                {/* Footer Info */}
                <motion.div
                    className="mt-16 text-center text-sm text-gray-500 dark:text-gray-400"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.8 }}
                >
                    <p>
                        Este sistema organiza projetos do banco de dados usando a mesma lógica de filtragem, ordenação e exibição dos projetos estáticos.
                    </p>
                    <p className="mt-2">
                        Configuração atual: {PROJECT_CONFIG.source} | Cache: {PROJECT_CONFIG.database.caching ? 'Ativo' : 'Inativo'}
                    </p>
                </motion.div>
            </div>
        </div>
    )
}