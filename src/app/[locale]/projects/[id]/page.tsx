'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { ProjectPageLayout } from '@/components/project/ProjectPageLayout';
import { Project } from '@/models/Project';
import { projects } from '@/config/projects';
import { CircularProgress, Box, Alert, Button } from '@mui/material';
import Link from 'next/link';

export default function ProjectDetailPage() {
    const params = useParams();
    const [project, setProject] = useState<Project | null>(null);
    const [relatedProjects, setRelatedProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchProject() {
            try {
                setLoading(true);
                
                // For demo purposes, using static data from config
                // In production, replace with database fetch
                const projectData = projects.find(p => p.id === params.id);
                
                if (!projectData) {
                    setError('Project not found');
                    return;
                }
                
                setProject(projectData);
                
                // Find related projects by category and technologies
                const related = projects
                    .filter(p => 
                        p.id !== projectData.id && (
                            p.category === projectData.category ||
                            p.technologies.some(tech => projectData.technologies.includes(tech))
                        )
                    )
                    .slice(0, 3);
                    
                setRelatedProjects(related);
            } catch (err) {
                console.error('Error fetching project:', err);
                setError('Error loading project data');
            } finally {
                setLoading(false);
            }
        }

        if (params.id) {
            fetchProject();
        }
    }, [params.id]);

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
                <CircularProgress size={60} />
            </Box>
        );
    }

    if (error || !project) {
        return (
            <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" minHeight="100vh" p={3}>
                <Alert severity="error" sx={{ mb: 2 }}>
                    {error || 'Project not found'}
                </Alert>
                <Button component={Link} href="/projects" variant="contained" color="primary">
                    Back to Projects
                </Button>
            </Box>
        );
    }

    return (
        <ProjectPageLayout 
            project={project} 
            relatedProjects={relatedProjects} 
        />
    );
}