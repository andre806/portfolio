'use client';

import React from 'react';
import { ProjectPageLayout } from '@/components/project/ProjectPageLayout';
import { projects } from '@/config/projects';

export default function ProjectTestPage() {
    // Use the first project for demo
    const project = projects[0];
    const relatedProjects = projects.slice(1, 4);

    return (
        <ProjectPageLayout 
            project={project} 
            relatedProjects={relatedProjects} 
        />
    );
}