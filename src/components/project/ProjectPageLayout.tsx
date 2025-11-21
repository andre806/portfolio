'use client';

import React from 'react';
import { Project } from '../../models/Project';
import Image from 'next/image';
import Link from 'next/link';
import { Box, Paper, Typography, Chip, Stack, Button, Avatar, Container } from '@mui/material';

interface ProjectPageLayoutProps {
    project: Project;
    relatedProjects?: Project[];
}

import type { ChipProps } from '@mui/material';
const statusColors: Record<string, ChipProps['color']> = {
    completed: 'success',
    'in-progress': 'info',
    planned: 'warning',
};

const statusLabels = {
    completed: 'Completed',
    'in-progress': 'In Progress',
    planned: 'Planned'
};

const categoryIcons = {
    web: '🌐',
    mobile: '📱',
    desktop: '💻',
    api: '🔗',
    ai: '🤖',
    other: '⚡'
};

export const ProjectPageLayout: React.FC<ProjectPageLayoutProps> = ({
    project,
    relatedProjects = []
}) => {
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long'
        });
    };

    return (
        <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', py: 4 }}>
            <Container maxWidth="lg">
                <Paper elevation={4} sx={{ borderRadius: 4, overflow: 'hidden', bgcolor: 'background.paper' }}>
                    {/* Header image and overlay */}
                    <Box sx={{ position: 'relative', height: { xs: 300, sm: 400, md: 500 }, width: '100%' }}>
                        <Image
                            src={project.image}
                            alt={project.title}
                            fill
                            style={{ objectFit: 'cover' }}
                            sizes="(max-width: 768px) 100vw, 1200px"
                        />
                        <Box sx={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.7) 60%, transparent 100%)' }} />
                        <Box sx={{ position: 'absolute', left: { xs: 16, md: 32 }, bottom: { xs: 16, md: 32 }, right: { xs: 16, md: 32 }, color: 'white' }}>
                            <Stack direction="row" spacing={2} alignItems="center" mb={2}>
                                <Typography fontSize={{ xs: 28, sm: 32, md: 40 }}>{categoryIcons[project.category]}</Typography>
                                <Chip label={statusLabels[project.status]} color={statusColors[project.status]} sx={{ fontWeight: 600 }} />
                                {project.featured && (
                                    <Chip label="Featured" color="warning" variant="filled" sx={{ fontWeight: 600 }} />
                                )}
                            </Stack>
                            <Typography variant="h3" fontWeight={700} mb={1} sx={{ fontSize: { xs: '1.75rem', sm: '2.125rem', md: '3rem' } }}>
                                {project.title}
                            </Typography>
                            <Typography variant="h6" sx={{ opacity: 0.9, fontSize: { xs: '1rem', sm: '1.125rem', md: '1.25rem' } }}>
                                {project.shortDescription}
                            </Typography>
                        </Box>
                    </Box>

                    {/* Content */}
                    <Box sx={{ p: { xs: 3, sm: 4, md: 6 } }}>
                        {/* Action Buttons */}
                        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} mb={4}>
                            {project.githubUrl && (
                                <Button component={Link} href={project.githubUrl} target="_blank" rel="noopener noreferrer" variant="contained" color="secondary" sx={{ fontWeight: 600, px: 3, py: 1.5, gap: 1 }}>
                                    💻 View Code
                                </Button>
                            )}
                            {project.demoUrl && (
                                <Button component={Link} href={project.demoUrl} target="_blank" rel="noopener noreferrer" variant="contained" color="info" sx={{ fontWeight: 600, px: 3, py: 1.5, gap: 1 }}>
                                    🎮 Interactive Demo
                                </Button>
                            )}
                            {project.liveUrl && (
                                <Button component={Link} href={project.liveUrl} target="_blank" rel="noopener noreferrer" variant="contained" color="primary" sx={{ fontWeight: 600, px: 3, py: 1.5, gap: 1 }}>
                                    🌐 Live Site
                                </Button>
                            )}
                            {project.documentation && (
                                <Button component={Link} href={project.documentation} target="_blank" rel="noopener noreferrer" variant="contained" color="success" sx={{ fontWeight: 600, px: 3, py: 1.5, gap: 1 }}>
                                    📚 Documentation
                                </Button>
                            )}
                        </Stack>

                        {/* Main Metrics */}
                        {project.metrics && project.metrics.length > 0 && (
                            <Box sx={{
                                display: 'grid',
                                gridTemplateColumns: {
                                    xs: 'repeat(2, 1fr)',
                                    sm: 'repeat(auto-fit, minmax(150px, 1fr))'
                                },
                                gap: 2,
                                mb: 4
                            }}>
                                {project.metrics.map((metric) => (
                                    <Paper key={metric.label} elevation={1} sx={{ p: 3, textAlign: 'center', borderRadius: 2, bgcolor: 'grey.50' }}>
                                        <Typography variant="h4" fontWeight={700} color="secondary" mb={0.5}>{metric.value}</Typography>
                                        <Typography variant="body2" color="text.secondary">{metric.label}</Typography>
                                    </Paper>
                                ))}
                            </Box>
                        )}

                        {/* Detailed Description */}
                        <Box mb={4}>
                            <Typography variant="h4" fontWeight={700} mb={3}>About the Project</Typography>
                            <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1.1rem', lineHeight: 1.7 }}>
                                {project.description}
                            </Typography>
                        </Box>

                        {/* Timeline & Technologies */}
                        <Box sx={{
                            display: 'grid',
                            gridTemplateColumns: {
                                xs: '1fr',
                                md: 'repeat(2, 1fr)'
                            },
                            gap: 3,
                            mb: 4
                        }}>
                            <Paper elevation={0} sx={{ bgcolor: 'grey.50', p: 3, borderRadius: 3, height: '100%' }}>
                                <Typography variant="h5" fontWeight={700} mb={2}>📅 Project Timeline</Typography>
                                <Stack spacing={2}>
                                    <Stack direction="row" justifyContent="space-between">
                                        <Typography color="text.secondary" fontWeight={500}>Start:</Typography>
                                        <Typography fontWeight={600}>{formatDate(project.startDate)}</Typography>
                                    </Stack>
                                    {project.endDate && (
                                        <Stack direction="row" justifyContent="space-between">
                                            <Typography color="text.secondary" fontWeight={500}>End:</Typography>
                                            <Typography fontWeight={600}>{formatDate(project.endDate)}</Typography>
                                        </Stack>
                                    )}
                                    {project.client && (
                                        <Stack direction="row" justifyContent="space-between">
                                            <Typography color="text.secondary" fontWeight={500}>Client:</Typography>
                                            <Typography fontWeight={600}>{project.client}</Typography>
                                        </Stack>
                                    )}
                                    {project.budget && (
                                        <Stack direction="row" justifyContent="space-between">
                                            <Typography color="text.secondary" fontWeight={500}>Budget:</Typography>
                                            <Typography fontWeight={600}>{project.budget}</Typography>
                                        </Stack>
                                    )}
                                </Stack>
                            </Paper>
                            <Paper elevation={0} sx={{ bgcolor: 'grey.50', p: 3, borderRadius: 3, height: '100%' }}>
                                <Typography variant="h5" fontWeight={700} mb={2}>🛠️ Technologies Used</Typography>
                                <Stack direction="row" flexWrap="wrap" gap={1.5}>
                                    {project.technologies.map((tech) => (
                                        <Chip key={tech} label={tech} color="secondary" variant="outlined" sx={{ fontWeight: 500, fontSize: '0.9rem' }} />
                                    ))}
                                </Stack>
                            </Paper>
                        </Box>

                        {/* Features */}
                        {project.features && project.features.length > 0 && (
                            <Box mb={4}>
                                <Typography variant="h5" fontWeight={700} mb={3}>✨ Main Features</Typography>
                                <Box sx={{
                                    display: 'grid',
                                    gridTemplateColumns: {
                                        xs: '1fr',
                                        sm: 'repeat(2, 1fr)'
                                    },
                                    gap: 2
                                }}>
                                    {project.features.map((feature, index) => (
                                        <Stack key={index} direction="row" alignItems="flex-start" spacing={1.5}>
                                            <Typography color="success.main" fontWeight={700} sx={{ fontSize: '1.2rem' }}>✓</Typography>
                                            <Typography color="text.secondary" sx={{ fontSize: '1rem' }}>{feature}</Typography>
                                        </Stack>
                                    ))}
                                </Box>
                            </Box>
                        )}

                        {/* Achievements */}
                        {project.achievements && project.achievements.length > 0 && (
                            <Box mb={4}>
                                <Typography variant="h5" fontWeight={700} mb={3}>🏆 Achievements</Typography>
                                <Stack spacing={2}>
                                    {project.achievements.map((achievement, index) => (
                                        <Stack direction="row" alignItems="flex-start" spacing={1.5} key={index}>
                                            <Typography color="warning.main" fontWeight={700} sx={{ fontSize: '1.2rem' }}>🎯</Typography>
                                            <Typography color="text.secondary" sx={{ fontSize: '1rem' }}>{achievement}</Typography>
                                        </Stack>
                                    ))}
                                </Stack>
                            </Box>
                        )}

                        {/* Challenges */}
                        {project.challenges && project.challenges.length > 0 && (
                            <Box mb={4}>
                                <Typography variant="h5" fontWeight={700} mb={3}>💪 Challenges</Typography>
                                <Stack spacing={2}>
                                    {project.challenges.map((challenge, index) => (
                                        <Stack direction="row" alignItems="flex-start" spacing={1.5} key={index}>
                                            <Typography color="error.main" fontWeight={700} sx={{ fontSize: '1.2rem' }}>⚡</Typography>
                                            <Typography color="text.secondary" sx={{ fontSize: '1rem' }}>{challenge}</Typography>
                                        </Stack>
                                    ))}
                                </Stack>
                            </Box>
                        )}

                        {/* Team */}
                        {project.team && project.team.length > 0 && (
                            <Box mb={4}>
                                <Typography variant="h5" fontWeight={700} mb={3}>👥 Project Team</Typography>
                                <Box sx={{
                                    display: 'grid',
                                    gridTemplateColumns: {
                                        xs: '1fr',
                                        sm: 'repeat(2, 1fr)',
                                        md: 'repeat(3, 1fr)'
                                    },
                                    gap: 2
                                }}>
                                    {project.team.map((member, index) => (
                                        <Paper key={index} elevation={0} sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 2, bgcolor: 'grey.50', borderRadius: 2 }}>
                                            <Avatar sx={{ bgcolor: 'secondary.main', width: 48, height: 48, fontWeight: 700, fontSize: '1.2rem' }}>
                                                {member.name[0]}
                                            </Avatar>
                                            <Box sx={{ flex: 1 }}>
                                                <Typography fontWeight={600} sx={{ fontSize: '1rem' }}>{member.name}</Typography>
                                                <Typography variant="body2" color="text.secondary">{member.role}</Typography>
                                            </Box>
                                            {member.linkedin && (
                                                <Button component={Link} href={member.linkedin} target="_blank" rel="noopener noreferrer" size="small" color="primary">
                                                    LinkedIn
                                                </Button>
                                            )}
                                        </Paper>
                                    ))}
                                </Box>
                            </Box>
                        )}

                        {/* Tags */}
                        <Box mb={4}>
                            <Typography variant="h6" fontWeight={600} mb={2}>🏷️ Tags</Typography>
                            <Stack direction="row" flexWrap="wrap" gap={1}>
                                {project.tags.map((tag) => (
                                    <Chip key={tag} label={`#${tag}`} variant="outlined" sx={{ fontSize: '0.9rem' }} />
                                ))}
                            </Stack>
                        </Box>

                        {/* Related Projects */}
                        {relatedProjects.length > 0 && (
                            <Box>
                                <Typography variant="h5" fontWeight={700} mb={3}>🔗 Related Projects</Typography>
                                <Box sx={{
                                    display: 'grid',
                                    gridTemplateColumns: {
                                        xs: '1fr',
                                        sm: 'repeat(2, 1fr)',
                                        md: 'repeat(3, 1fr)'
                                    },
                                    gap: 2
                                }}>
                                    {relatedProjects.map((relatedProject) => (
                                        <Paper key={relatedProject.id} elevation={0} sx={{ 
                                            p: 3, 
                                            bgcolor: 'grey.50', 
                                            borderRadius: 2, 
                                            cursor: 'pointer', 
                                            transition: 'all 0.2s',
                                            '&:hover': { 
                                                bgcolor: 'grey.100',
                                                transform: 'translateY(-2px)',
                                                boxShadow: 2
                                            } 
                                        }}>
                                            <Typography fontWeight={600} mb={1}>{relatedProject.title}</Typography>
                                            <Typography variant="body2" color="text.secondary" sx={{ 
                                                display: '-webkit-box',
                                                WebkitLineClamp: 2,
                                                WebkitBoxOrient: 'vertical',
                                                overflow: 'hidden'
                                            }}>
                                                {relatedProject.shortDescription}
                                            </Typography>
                                            <Stack direction="row" flexWrap="wrap" gap={0.5} mt={1}>
                                                {relatedProject.technologies.slice(0, 3).map((tech) => (
                                                    <Chip key={tech} label={tech} size="small" variant="outlined" />
                                                ))}
                                            </Stack>
                                        </Paper>
                                    ))}
                                </Box>
                            </Box>
                        )}

                    </Box>
                </Paper>
            </Container>
        </Box>
    );
};