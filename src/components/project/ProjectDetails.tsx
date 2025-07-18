'use client';


import React from 'react';
import { Project } from '../../models/Project';
import Image from 'next/image';
import Link from 'next/link';
import { Box, Paper, Typography, Chip, Stack, Button, Avatar, IconButton, Dialog, DialogContent } from '@mui/material';

interface ProjectDetailsProps {
    project: Project | null;
    isOpen: boolean;
    onClose: () => void;
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

export const ProjectDetails: React.FC<ProjectDetailsProps> = ({
    project,
    isOpen,
    onClose,
    relatedProjects = []
}) => {
    if (!project) return null;

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long'
        });
    };

    return (
        <Dialog open={isOpen} onClose={onClose} maxWidth="lg" fullWidth scroll="body" PaperProps={{ sx: { borderRadius: 4, overflow: 'hidden', bgcolor: 'background.paper' } }}>
            <DialogContent sx={{ p: 0 }}>
                <Paper elevation={24} sx={{ maxWidth: 900, width: '100%', borderRadius: 4, overflow: 'hidden', maxHeight: '95vh', display: 'flex', flexDirection: 'column', position: 'relative', m: 'auto' }}>
                    {/* Header image and overlay */}
                    <Box sx={{ position: 'relative', height: { xs: 220, sm: 320 }, width: '100%' }}>
                        <Image
                            src={project.image}
                            alt={project.title}
                            fill
                            style={{ objectFit: 'cover', borderTopLeftRadius: 16, borderTopRightRadius: 16 }}
                            sizes="(max-width: 768px) 100vw, 896px"
                        />
                        <Box sx={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.7) 60%, transparent 100%)' }} />
                        <IconButton onClick={onClose} sx={{ position: 'absolute', top: 16, right: 16, bgcolor: 'rgba(255,255,255,0.7)', '&:hover': { bgcolor: 'white' }, zIndex: 2 }} aria-label="Close">
                            <Typography fontSize={24}>✕</Typography>
                        </IconButton>
                        <Box sx={{ position: 'absolute', left: 24, bottom: 24, right: 24, color: 'white' }}>
                            <Stack direction="row" spacing={2} alignItems="center" mb={1}>
                                <Typography fontSize={32}>{categoryIcons[project.category]}</Typography>
                                <Chip label={statusLabels[project.status]} color={statusColors[project.status] ?? 'default'} size="small" sx={{ fontWeight: 600 }} />
                                {project.featured && (
                                    <Chip label="⭐ Featured" sx={{ bgcolor: 'linear-gradient(90deg, #a78bfa 0%, #f472b6 100%)', color: 'white', fontWeight: 600 }} />
                                )}
                            </Stack>
                            <Typography variant="h3" fontWeight={700} mb={0.5} sx={{ color: 'white', textShadow: '0 2px 8px rgba(0,0,0,0.4)' }}>{project.title}</Typography>
                            <Typography variant="h6" sx={{ color: 'rgba(255,255,255,0.85)' }}>{project.shortDescription}</Typography>
                        </Box>
                    </Box>

                    {/* Content */}
                    <Box sx={{ p: { xs: 3, md: 5 }, overflowY: 'auto' }}>
                        {/* Action Links */}
                        <Stack direction="row" spacing={2} flexWrap="wrap" mb={4}>
                            {project.liveUrl && (
                                <Button component={Link} href={project.liveUrl} target="_blank" rel="noopener noreferrer" variant="contained" color="secondary" sx={{ fontWeight: 600, px: 3, py: 1.5, gap: 1 }}>
                                    🚀 Live Demo
                                </Button>
                            )}
                            {project.githubUrl && (
                                <Button component={Link} href={project.githubUrl} target="_blank" rel="noopener noreferrer" variant="contained" color="inherit" sx={{ fontWeight: 600, px: 3, py: 1.5, gap: 1 }}>
                                    📁 Source Code
                                </Button>
                            )}
                            {project.demoUrl && (
                                <Button component={Link} href={project.demoUrl} target="_blank" rel="noopener noreferrer" variant="contained" color="info" sx={{ fontWeight: 600, px: 3, py: 1.5, gap: 1 }}>
                                    🎮 Interactive Demo
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
                                    sm: 'repeat(4, 1fr)'
                                },
                                gap: 2,
                                mb: 4
                            }}>
                                {project.metrics.map((metric) => (
                                    <Paper key={metric.label} elevation={1} sx={{ p: 2, textAlign: 'center', borderRadius: 2, bgcolor: 'grey.100' }}>
                                        <Typography variant="h5" fontWeight={700} color="secondary" mb={0.5}>{metric.value}</Typography>
                                        <Typography variant="body2" color="text.secondary">{metric.label}</Typography>
                                    </Paper>
                                ))}
                            </Box>
                        )}

                        {/* Detailed Description */}
                        <Box mb={4}>
                            <Typography variant="h5" fontWeight={700} mb={2}>About the Project</Typography>
                            <Typography color="text.secondary">{project.description}</Typography>
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
                            <Paper elevation={0} sx={{ bgcolor: 'grey.100', p: 3, borderRadius: 3, height: '100%' }}>
                                <Typography variant="h6" fontWeight={700} mb={2}>📅 Project Timeline</Typography>
                                <Stack spacing={1}>
                                    <Stack direction="row" justifyContent="space-between">
                                        <Typography color="text.secondary">Start:</Typography>
                                        <Typography fontWeight={500}>{formatDate(project.startDate)}</Typography>
                                    </Stack>
                                    {project.endDate && (
                                        <Stack direction="row" justifyContent="space-between">
                                            <Typography color="text.secondary">End:</Typography>
                                            <Typography fontWeight={500}>{formatDate(project.endDate)}</Typography>
                                        </Stack>
                                    )}
                                    {project.client && (
                                        <Stack direction="row" justifyContent="space-between">
                                            <Typography color="text.secondary">Client:</Typography>
                                            <Typography fontWeight={500}>{project.client}</Typography>
                                        </Stack>
                                    )}
                                </Stack>
                            </Paper>
                            <Paper elevation={0} sx={{ bgcolor: 'grey.100', p: 3, borderRadius: 3, height: '100%' }}>
                                <Typography variant="h6" fontWeight={700} mb={2}>🛠️ Technologies Used</Typography>
                                <Stack direction="row" flexWrap="wrap" gap={1}>
                                    {project.technologies.map((tech) => (
                                        <Chip key={tech} label={tech} color="secondary" variant="outlined" sx={{ fontWeight: 500 }} />
                                    ))}
                                </Stack>
                            </Paper>
                        </Box>

                        {/* Features */}
                        {project.features && project.features.length > 0 && (
                            <Box mb={4}>
                                <Typography variant="h6" fontWeight={700} mb={2}>✨ Main Features</Typography>
                                <Box sx={{
                                    display: 'grid',
                                    gridTemplateColumns: {
                                        xs: '1fr',
                                        sm: 'repeat(2, 1fr)'
                                    },
                                    gap: 1
                                }}>
                                    {project.features.map((feature, index) => (
                                        <Stack key={index} direction="row" alignItems="flex-start" spacing={1}>
                                            <Typography color="success.main" fontWeight={700}>✓</Typography>
                                            <Typography color="text.secondary">{feature}</Typography>
                                        </Stack>
                                    ))}
                                </Box>
                            </Box>
                        )}

                        {/* Achievements */}
                        {project.achievements && project.achievements.length > 0 && (
                            <Box mb={4}>
                                <Typography variant="h6" fontWeight={700} mb={2}>🏆 Achievements</Typography>
                                <Stack spacing={1}>
                                    {project.achievements.map((achievement, index) => (
                                        <Stack direction="row" alignItems="flex-start" spacing={1} key={index}>
                                            <Typography color="warning.main" fontWeight={700}>🎯</Typography>
                                            <Typography color="text.secondary">{achievement}</Typography>
                                        </Stack>
                                    ))}
                                </Stack>
                            </Box>
                        )}

                        {/* Challenges */}
                        {project.challenges && project.challenges.length > 0 && (
                            <Box mb={4}>
                                <Typography variant="h6" fontWeight={700} mb={2}>💪 Challenges</Typography>
                                <Stack spacing={1}>
                                    {project.challenges.map((challenge, index) => (
                                        <Stack direction="row" alignItems="flex-start" spacing={1} key={index}>
                                            <Typography color="error.main" fontWeight={700}>⚡</Typography>
                                            <Typography color="text.secondary">{challenge}</Typography>
                                        </Stack>
                                    ))}
                                </Stack>
                            </Box>
                        )}

                        {/* Team */}
                        {project.team && project.team.length > 0 && (
                            <Box mb={4}>
                                <Typography variant="h6" fontWeight={700} mb={2}>👥 Project Team</Typography>
                                <Box sx={{
                                    display: 'grid',
                                    gridTemplateColumns: {
                                        xs: '1fr',
                                        sm: 'repeat(2, 1fr)'
                                    },
                                    gap: 2
                                }}>
                                    {project.team.map((member, index) => (
                                        <Paper key={index} elevation={0} sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 2, bgcolor: 'grey.100', borderRadius: 2 }}>
                                            <Avatar sx={{ bgcolor: 'secondary.main', width: 40, height: 40, fontWeight: 700 }}>{member.name[0]}</Avatar>
                                            <Box>
                                                <Typography fontWeight={600}>{member.name}</Typography>
                                                <Typography variant="body2" color="text.secondary">{member.role}</Typography>
                                            </Box>
                                            {member.linkedin && (
                                                <IconButton component={Link} href={member.linkedin} target="_blank" rel="noopener noreferrer" sx={{ ml: 'auto', color: 'primary.main' }}>
                                                    <Typography fontSize={20}>🔗</Typography>
                                                </IconButton>
                                            )}
                                        </Paper>
                                    ))}
                                </Box>
                            </Box>
                        )}

                        {/* Tags */}
                        <Box mb={4}>
                            <Typography variant="subtitle1" fontWeight={600} mb={1}>🏷️ Tags</Typography>
                            <Stack direction="row" flexWrap="wrap" gap={1}>
                                {project.tags.map((tag) => (
                                    <Chip key={tag} label={`#${tag}`} variant="outlined" />
                                ))}
                            </Stack>
                        </Box>

                        {/* Related Projects */}
                        {relatedProjects.length > 0 && (
                            <Box>
                                <Typography variant="h6" fontWeight={700} mb={2}>🔗 Related Projects</Typography>
                                <Box sx={{
                                    display: 'grid',
                                    gridTemplateColumns: {
                                        xs: '1fr',
                                        sm: 'repeat(3, 1fr)'
                                    },
                                    gap: 2
                                }}>
                                    {relatedProjects.map((relatedProject) => (
                                        <Paper key={relatedProject.id} elevation={0} sx={{ p: 2, bgcolor: 'grey.100', borderRadius: 2, cursor: 'pointer', '&:hover': { bgcolor: 'grey.200' } }}>
                                            <Typography fontWeight={600} mb={0.5}>{relatedProject.title}</Typography>
                                            <Typography variant="body2" color="text.secondary" noWrap>{relatedProject.shortDescription}</Typography>
                                        </Paper>
                                    ))}
                                </Box>
                            </Box>
                        )}

                    </Box>
                </Paper>
            </DialogContent>
        </Dialog>
    );
};
