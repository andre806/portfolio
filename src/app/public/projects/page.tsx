'use client';

import React, { useState } from 'react';
import { useProjects } from '../../../hooks/useProjects';
import { ProjectCard } from '../../../components/project/ProjectCard';
import { ProjectDetails } from '../../../components/project/ProjectDetails';
import { TechStackIcons } from '../../../components/project/TechStackIcons';
import { PROJECT_CATEGORIES } from '../../../models/Project';
import { Box, Container, Stack, Typography, Button, Paper, TextField, ToggleButton, ToggleButtonGroup, Chip } from '@mui/material';

export default function ProjectsPage() {
    const {
        projects,
        featuredProjects,
        stats,
        topTechnologies,
        filter,
        viewMode,
        selectedProject,
        updateFilter,
        clearFilters,
        setViewMode,
        setSelectedProject,
        getRelatedProjects,
        hasActiveFilters,
        filteredCount
    } = useProjects();

    const [searchTerm, setSearchTerm] = useState('');

    // Filter by search
    const filteredProjects = projects.filter(project =>
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.technologies.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()))
    );




    return (
        <Box minHeight="100vh" sx={{ bgcolor: 'background.default' }}>
            {/* Hero Section */}
            <Box
                sx={{
                    background: 'linear-gradient(135deg, #7c3aed 0%, #2563eb 50%, #6366f1 100%)',
                    color: 'common.white',
                    py: { xs: 8, md: 12 },
                }}
            >
                <Container maxWidth="md">
                    <Stack spacing={4} alignItems="center" textAlign="center">
                        <Typography variant="h2" fontWeight={700} sx={{ fontSize: { xs: 32, md: 48 } }}>
                            My Projects
                        </Typography>
                        <Typography variant="h5" sx={{ color: 'rgba(255,255,255,0.85)' }}>
                            A journey through code, innovation, and creativity
                        </Typography>
                        {/* Stats */}
                        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: 3, justifyItems: 'center', maxWidth: 'sm', mx: 'auto', mt: 2 }}>
                            <Paper elevation={4} sx={{ p: 3, borderRadius: 3, bgcolor: 'rgba(253,230,138,0.15)', boxShadow: 3, textAlign: 'center', width: '100%' }}>
                                <Typography variant="h4" fontWeight={700} sx={{ color: '#fde68a' }}>{stats.total}</Typography>
                                <Typography sx={{ color: 'rgba(255,255,255,0.8)' }}>Projects</Typography>
                            </Paper>
                            <Paper elevation={4} sx={{ p: 3, borderRadius: 3, bgcolor: 'rgba(110,231,183,0.15)', boxShadow: 3, textAlign: 'center', width: '100%' }}>
                                <Typography variant="h4" fontWeight={700} sx={{ color: '#6ee7b7' }}>{stats.completed}</Typography>
                                <Typography sx={{ color: 'rgba(255,255,255,0.8)' }}>Completed</Typography>
                            </Paper>
                            <Paper elevation={4} sx={{ p: 3, borderRadius: 3, bgcolor: 'rgba(147,197,253,0.15)', boxShadow: 3, textAlign: 'center', width: '100%' }}>
                                <Typography variant="h4" fontWeight={700} sx={{ color: '#93c5fd' }}>{stats.technologies}</Typography>
                                <Typography sx={{ color: 'rgba(255,255,255,0.8)' }}>Technologies</Typography>
                            </Paper>
                            <Paper elevation={4} sx={{ p: 3, borderRadius: 3, bgcolor: 'rgba(196,181,253,0.15)', boxShadow: 3, textAlign: 'center', width: '100%' }}>
                                <Typography variant="h4" fontWeight={700} sx={{ color: '#c4b5fd' }}>{stats.completionRate}%</Typography>
                                <Typography sx={{ color: 'rgba(255,255,255,0.8)' }}>Success</Typography>
                            </Paper>
                        </Box>
                    </Stack>
                </Container>
            </Box>


            {/* Featured Projects */}
            {featuredProjects.length > 0 && (
                <Box sx={{ py: { xs: 8, md: 10 }, bgcolor: 'background.paper' }}>
                    <Container>
                        <Typography variant="h4" fontWeight={700} textAlign="center" mb={4}>
                            ⭐ Featured Projects
                        </Typography>
                        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 4, justifyItems: 'center' }}>
                            {featuredProjects.map((project) => (
                                <Box key={project.id} sx={{ width: '100%' }}>
                                    <ProjectCard
                                        project={project}
                                        onClick={setSelectedProject}
                                    />
                                </Box>
                            ))}
                        </Box>
                    </Container>
                </Box>
            )}


            {/* Filters and Search */}
            <Box sx={{ py: 4, bgcolor: 'grey.100', borderY: 1, borderColor: 'divider' }}>
                <Container>
                    <Stack direction={{ xs: 'column', lg: 'row' }} spacing={3} alignItems="center" justifyContent="space-between">
                        {/* Search Bar */}
                        <TextField
                            variant="outlined"
                            placeholder="Search projects..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            InputProps={{ startAdornment: <Box component="span" sx={{ pr: 1 }}>🔍</Box> }}
                            sx={{ flex: 1, maxWidth: 340, bgcolor: 'background.paper', borderRadius: 2 }}
                        />

                        {/* Category Filter */}
                        <Stack direction="row" spacing={1} flexWrap="wrap">
                            {PROJECT_CATEGORIES.map((category) => (
                                <Button
                                    key={category.id}
                                    onClick={() => updateFilter({ category: category.id })}
                                    variant={filter.category === category.id ? 'contained' : 'outlined'}
                                    color={filter.category === category.id ? 'secondary' : 'inherit'}
                                    sx={{ borderRadius: 2, textTransform: 'none', fontWeight: 500, fontSize: 14, py: 1, px: 2 }}
                                    startIcon={category.icon}
                                >
                                    {category.label}
                                </Button>
                            ))}
                        </Stack>

                        {/* View Mode Toggle */}
                        <ToggleButtonGroup
                            value={viewMode}
                            exclusive
                            onChange={(_, val) => val && setViewMode(val)}
                            size="small"
                            sx={{ bgcolor: 'background.paper', borderRadius: 2 }}
                        >
                            <ToggleButton value="grid" sx={{ fontSize: 18 }}>
                                ⊞
                            </ToggleButton>
                            <ToggleButton value="list" sx={{ fontSize: 18 }}>
                                ☰
                            </ToggleButton>
                        </ToggleButtonGroup>
                    </Stack>

                    {/* Active Filters */}
                    {hasActiveFilters && (
                        <Stack direction="row" alignItems="center" spacing={1} mt={2}>
                            <Typography variant="body2" color="text.secondary">Active filters:</Typography>
                            {filter.category && filter.category !== 'all' && (
                                <Chip
                                    label={PROJECT_CATEGORIES.find(c => c.id === filter.category)?.label}
                                    color="secondary"
                                    size="small"
                                />
                            )}
                            <Button onClick={clearFilters} size="small" color="secondary" sx={{ textTransform: 'none', fontWeight: 500 }}>
                                Clear filters
                            </Button>
                        </Stack>
                    )}

                    {/* Results Count */}
                    <Typography variant="body2" color="text.secondary" mt={2}>
                        {searchTerm ? (
                            <>Found {filteredProjects.length} project(s) for “{searchTerm}”</>
                        ) : (
                            <>Showing {filteredCount} of {stats.total} projects</>
                        )}
                    </Typography>
                </Container>
            </Box>


            {/* Technology Stack Overview */}
            <Box sx={{ py: { xs: 8, md: 10 }, bgcolor: 'background.paper' }}>
                <Container>
                    <Paper elevation={3} sx={{ p: { xs: 3, md: 5 }, borderRadius: 4, maxWidth: 800, mx: 'auto', mb: 4, textAlign: 'center', boxShadow: 6 }}>
                        <Typography variant="h4" fontWeight={700} mb={2} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 1 }}>
                            <Box component="span" fontSize={32}>🛠️</Box> Most Used Technologies
                        </Typography>
                        <Typography color="text.secondary" mb={3}>
                            The tools and languages I use most often to build high-quality projects.
                        </Typography>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 2 }}>
                            <TechStackIcons technologies={topTechnologies} />
                        </Box>
                    </Paper>
                </Container>
            </Box>


            {/* Projects Grid/List */}
            <Box sx={{ py: { xs: 8, md: 10 }, bgcolor: 'background.default' }}>
                <Container>
                    {filteredProjects.length > 0 ? (
                        viewMode === 'grid' ? (
                            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 4 }}>
                                {filteredProjects.map((project) => (
                                    <Box key={project.id} sx={{ width: '100%' }}>
                                        <ProjectCard
                                            project={project}
                                            viewMode={viewMode}
                                            onClick={setSelectedProject}
                                        />
                                    </Box>
                                ))}
                            </Box>
                        ) : (
                            <Stack spacing={3}>
                                {filteredProjects.map((project) => (
                                    <Box key={project.id}>
                                        <ProjectCard
                                            project={project}
                                            viewMode={viewMode}
                                            onClick={setSelectedProject}
                                        />
                                    </Box>
                                ))}
                            </Stack>
                        )
                    ) : (
                        <Box textAlign="center" py={10}>
                            <Box fontSize={64} mb={2}>🔍</Box>
                            <Typography variant="h5" fontWeight={700} mb={1}>
                                No projects found
                            </Typography>
                            <Typography color="text.secondary" mb={3}>
                                Try adjusting the filters or search term
                            </Typography>
                            <Button
                                onClick={() => {
                                    clearFilters();
                                    setSearchTerm('');
                                }}
                                variant="contained"
                                color="secondary"
                                sx={{ px: 4, py: 2, fontWeight: 500 }}
                            >
                                Clear filters
                            </Button>
                        </Box>
                    )}
                </Container>
            </Box>


            {/* Call to Action */}
            <Box
                sx={{
                    py: { xs: 8, md: 10 },
                    background: 'linear-gradient(90deg, #7c3aed 0%, #2563eb 100%)',
                    color: 'common.white',
                    textAlign: 'center',
                }}
            >
                <Container>
                    <Typography variant="h4" fontWeight={700} mb={2}>
                        Did you like what you saw?
                    </Typography>
                    <Typography variant="h6" sx={{ color: 'rgba(255,255,255,0.85)' }} mb={4} maxWidth="sm" mx="auto">
                        Get in touch to discuss your next project
                    </Typography>
                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center" alignItems="center">
                        <Button
                            onClick={() => window.location.href = '/public/contact'}
                            variant="contained"
                            sx={{ bgcolor: 'common.white', color: 'secondary.main', fontWeight: 600, px: 4, py: 2, '&:hover': { bgcolor: 'grey.100' } }}
                        >
                            💬 Contact Me
                        </Button>
                        <Button
                            onClick={() => window.location.href = '/public/about'}
                            variant="outlined"
                            sx={{ borderColor: 'common.white', color: 'common.white', fontWeight: 600, px: 4, py: 2, '&:hover': { bgcolor: 'common.white', color: 'secondary.main' } }}
                        >
                            👨‍💻 About Me
                        </Button>
                    </Stack>
                </Container>
            </Box>

            {/* Project Details Modal */}
            <ProjectDetails
                project={selectedProject}
                isOpen={!!selectedProject}
                onClose={() => setSelectedProject(null)}
                relatedProjects={selectedProject ? getRelatedProjects(selectedProject) : []}
            />
        </Box>
    );
}
