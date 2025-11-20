'use client';

import React from 'react';
import { Project } from '../../models/Project';
import { Card, CardContent, CardMedia, Typography, Chip, Stack, Button, Box } from '@mui/material';
import type { ChipProps } from '@mui/material';
import { MediaDisplay } from '../common/MediaDisplay';

interface ProjectCardProps {
    project: Project;
    viewMode?: 'grid' | 'list';
    onClick?: (project: Project) => void;
}

const statusColors: Record<string, ChipProps['color']> = {
    completed: 'success',
    'in-progress': 'info',
    planned: 'warning'
};

const statusLabels = {
    completed: 'Completed',
    'in-progress': 'In Progress',
    planned: 'Planned'
};

export const ProjectCard: React.FC<ProjectCardProps> = ({
    project,
    viewMode = 'grid',
    onClick
}) => {
    const handleCardClick = () => {
        if (onClick) {
            onClick(project);
        }
    };

    if (viewMode === 'list') {
        return (
            <Card sx={{ display: 'flex', mb: 2, borderRadius: 3, boxShadow: 3, cursor: 'pointer', overflow: 'hidden' }} onClick={handleCardClick}>
                <Box sx={{ width: 180, height: 180, overflow: 'hidden', flexShrink: 0 }}>
                    <MediaDisplay
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover"
                        autoPlay={true}
                        loop={true}
                        muted={true}
                        controls={false}
                    />
                </Box>
                <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                    <Box>
                        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={1}>
                            <Typography variant="h6" fontWeight={700}>{project.title}</Typography>
                            <Chip label={statusLabels[project.status]} color={statusColors[project.status]} size="small" />
                        </Stack>
                        <Typography variant="body2" color="text.secondary" mb={2} noWrap>{project.shortDescription}</Typography>
                        <Stack direction="row" spacing={1} mb={2} flexWrap="wrap">
                            {project.technologies.slice(0, 4).map((tech) => (
                                <Chip key={tech} label={tech} size="small" />
                            ))}
                            {project.technologies.length > 4 && (
                                <Chip label={`+${project.technologies.length - 4}`} size="small" />
                            )}
                        </Stack>
                        {project.metrics && project.metrics.length > 0 && (
                            <Stack direction="row" spacing={2} mb={2}>
                                {project.metrics.slice(0, 3).map((metric) => (
                                    <Box key={metric.label} textAlign="center">
                                        <Typography variant="subtitle2" color="primary" fontWeight={700}>{metric.value}</Typography>
                                        <Typography variant="caption" color="text.secondary">{metric.label}</Typography>
                                    </Box>
                                ))}
                            </Stack>
                        )}
                    </Box>
                    <Stack direction="row" spacing={1} mt={2}>
                        {project.demoUrl && (
                            <Button
                                href={project.demoUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                variant="contained"
                                size="small"
                                color="primary"
                                onClick={e => e.stopPropagation()}
                            >
                                Demo
                            </Button>
                        )}
                        {project.githubUrl && (
                            <Button
                                href={project.githubUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                variant="outlined"
                                size="small"
                                color="secondary"
                                onClick={e => e.stopPropagation()}
                            >
                                Code
                            </Button>
                        )}
                    </Stack>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card sx={{ borderRadius: 3, boxShadow: 3, mb: 2, cursor: 'pointer', overflow: 'hidden' }} onClick={handleCardClick}>
            <Box sx={{ height: 200, overflow: 'hidden' }}>
                <MediaDisplay
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                    autoPlay={true}
                    loop={true}
                    muted={true}
                    controls={false}
                />
            </Box>
            <CardContent>
                <Stack direction="row" alignItems="center" justifyContent="space-between" mb={1}>
                    <Typography variant="h6" fontWeight={700}>{project.title}</Typography>
                    <Chip label={statusLabels[project.status]} color={statusColors[project.status]} size="small" />
                </Stack>
                <Typography variant="body2" color="text.secondary" mb={2} noWrap>{project.shortDescription}</Typography>
                <Stack direction="row" spacing={1} mb={2} flexWrap="wrap">
                    {project.technologies.slice(0, 3).map((tech) => (
                        <Chip key={tech} label={tech} size="small" />
                    ))}
                    {project.technologies.length > 3 && (
                        <Chip label={`+${project.technologies.length - 3}`} size="small" />
                    )}
                </Stack>
                {project.metrics && project.metrics.length > 0 && (
                    <Stack direction="row" spacing={2} mb={2}>
                        {project.metrics.slice(0, 2).map((metric) => (
                            <Box key={metric.label} textAlign="center">
                                <Typography variant="subtitle2" color="primary" fontWeight={700}>{metric.value}</Typography>
                                <Typography variant="caption" color="text.secondary">{metric.label}</Typography>
                            </Box>
                        ))}
                    </Stack>
                )}
                <Stack direction="row" spacing={1} mt={2}>
                    {project.demoUrl && (
                        <Button
                            href={project.demoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            variant="contained"
                            size="small"
                            color="primary"
                            onClick={e => e.stopPropagation()}
                        >
                            Demo
                        </Button>
                    )}
                    {project.githubUrl && (
                        <Button
                            href={project.githubUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            variant="outlined"
                            size="small"
                            color="secondary"
                            onClick={e => e.stopPropagation()}
                        >
                            Code
                        </Button>
                    )}
                </Stack>
            </CardContent>
        </Card>
    );
};
