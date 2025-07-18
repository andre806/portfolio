'use client'

import { useTranslations } from 'next-intl'
import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { FaFilter, FaList, FaThLarge, FaSearch } from 'react-icons/fa'
import { useProjects } from '@/hooks/useProjects'
import { ProjectCard } from '@/components/project/ProjectCard'
import { ProjectDetails } from '@/components/project/ProjectDetails'
import AnimatedSection from '@/components/common/AnimatedSection'
import AnimatedButton from '@/components/common/AnimatedButton'
import { Project } from '@/models/Project'
import { fadeInUp } from '@/utils/animations'

export default function ProjectsPage() {
    const t = useTranslations('projects')
    const { projects } = useProjects()
    const [selectedProject, setSelectedProject] = useState<Project | null>(null)
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
    const [selectedCategory, setSelectedCategory] = useState<string>('all')
    const [searchTerm, setSearchTerm] = useState('')

    // Categories for filtering
    const categories = [
        { key: 'all', label: t('categories.all') },
        { key: 'web', label: t('categories.web') },
        { key: 'mobile', label: t('categories.mobile') },
        { key: 'desktop', label: t('categories.desktop') },
        { key: 'api', label: t('categories.api') },
        { key: 'ai', label: t('categories.ai') },
        { key: 'other', label: t('categories.other') }
    ]

    // Filter and search projects
    const filteredProjects = useMemo(() => {
        return projects.filter(project => {
            const matchesCategory = selectedCategory === 'all' || project.category === selectedCategory
            const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                project.shortDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
                project.technologies.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()))
            return matchesCategory && matchesSearch
        })
    }, [projects, selectedCategory, searchTerm])

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800">
            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <AnimatedSection className="text-center mb-12">
                    <motion.h1
                        className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 bg-clip-text text-transparent mb-6"
                        variants={fadeInUp}
                    >
                        {t('title')}
                    </motion.h1>
                    <motion.p
                        className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto"
                        variants={fadeInUp}
                    >
                        {t('subtitle')}
                    </motion.p>
                </AnimatedSection>

                {/* Filters and Controls */}
                <AnimatedSection className="mb-8">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
                        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
                            {/* Search */}
                            <div className="relative flex-1 max-w-md">
                                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                                <input
                                    type="text"
                                    placeholder={t('search.placeholder')}
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
                                />
                            </div>

                            {/* Category Filter */}
                            <div className="flex flex-wrap gap-2">
                                {categories.map((category) => (
                                    <AnimatedButton
                                        key={category.key}
                                        onClick={() => setSelectedCategory(category.key)}
                                        variant={selectedCategory === category.key ? 'primary' : 'ghost'}
                                        size="sm"
                                        className="min-w-0"
                                    >
                                        {category.label}
                                    </AnimatedButton>
                                ))}
                            </div>

                            {/* View Mode Toggle */}
                            <div className="flex gap-2">
                                <AnimatedButton
                                    onClick={() => setViewMode('grid')}
                                    variant={viewMode === 'grid' ? 'primary' : 'ghost'}
                                    size="sm"
                                >
                                    <FaThLarge />
                                </AnimatedButton>
                                <AnimatedButton
                                    onClick={() => setViewMode('list')}
                                    variant={viewMode === 'list' ? 'primary' : 'ghost'}
                                    size="sm"
                                >
                                    <FaList />
                                </AnimatedButton>
                            </div>
                        </div>
                    </div>
                </AnimatedSection>

                {/* Project Stats */}
                <AnimatedSection className="mb-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 text-center">
                            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                                {projects.length}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                                {t('stats.total')}
                            </div>
                        </div>
                        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 text-center">
                            <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                                {projects.filter(p => p.status === 'completed').length}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                                {t('stats.completed')}
                            </div>
                        </div>
                        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 text-center">
                            <div className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                                {projects.filter(p => p.status === 'in-progress').length}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                                {t('stats.inProgress')}
                            </div>
                        </div>
                        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 text-center">
                            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                                {projects.filter(p => p.featured).length}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                                {t('stats.featured')}
                            </div>
                        </div>
                    </div>
                </AnimatedSection>

                {/* Results Count */}
                {searchTerm && (
                    <AnimatedSection className="mb-6">
                        <p className="text-gray-600 dark:text-gray-400">
                            {t('search.results', { count: filteredProjects.length, term: searchTerm })}
                        </p>
                    </AnimatedSection>
                )}

                {/* Projects Grid/List */}
                <AnimatedSection
                    stagger
                    className={
                        viewMode === 'grid'
                            ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
                            : 'space-y-6'
                    }
                >
                    {filteredProjects.map((project) => (
                        <ProjectCard
                            key={project.id}
                            project={project}
                            viewMode={viewMode}
                            onClick={setSelectedProject}
                        />
                    ))}
                </AnimatedSection>

                {/* No Results */}
                {filteredProjects.length === 0 && (
                    <AnimatedSection className="text-center py-12">
                        <div className="text-gray-400 dark:text-gray-600 mb-4">
                            <FaFilter className="text-4xl mx-auto mb-4" />
                            <p className="text-xl">{t('noResults.title')}</p>
                            <p className="text-sm">{t('noResults.description')}</p>
                        </div>
                        <AnimatedButton
                            onClick={() => {
                                setSelectedCategory('all')
                                setSearchTerm('')
                            }}
                            variant="primary"
                        >
                            {t('noResults.clearFilters')}
                        </AnimatedButton>
                    </AnimatedSection>
                )}

                {/* Project Details Modal */}
                {selectedProject && (
                    <ProjectDetails
                        project={selectedProject}
                        isOpen={!!selectedProject}
                        onClose={() => setSelectedProject(null)}
                    />
                )}
            </div>
        </div>
    )
}
