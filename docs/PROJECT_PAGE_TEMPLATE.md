# Project Page Organization Template

This template provides a standardized way to organize and display project data from a database in the same format as the ProjectDetails modal popup.

## Component: ProjectPageLayout

The `ProjectPageLayout` component renders a full-page project display that maintains the same visual structure and organization as the existing ProjectDetails modal.

### Usage

```tsx
import { ProjectPageLayout } from '@/components/project/ProjectPageLayout';
import { Project } from '@/models/Project';

// Example: Create a dynamic project page
export default async function ProjectPage({ params }: { params: { id: string } }) {
    // Fetch project data from database
    const project = await fetchProjectFromDatabase(params.id);
    const relatedProjects = await fetchRelatedProjects(project.id);
    
    return (
        <ProjectPageLayout 
            project={project} 
            relatedProjects={relatedProjects} 
        />
    );
}
```

## Database Data Structure

Ensure your database project records match the `Project` interface:

```typescript
interface Project {
    id: string;
    title: string;
    description: string;
    shortDescription: string;
    image: string;
    technologies: string[];
    category: 'web' | 'mobile' | 'desktop' | 'api' | 'ai' | 'other';
    status: 'completed' | 'in-progress' | 'planned';
    featured: boolean;
    githubUrl?: string;
    liveUrl?: string;
    demoUrl?: string;
    documentation?: string;
    startDate: string;
    endDate?: string;
    team?: {
        name: string;
        role: string;
        linkedin?: string;
    }[];
    features: string[];
    challenges?: string[];
    achievements?: string[];
    metrics?: {
        label: string;
        value: string;
    }[];
    gallery?: string[];
    tags: string[];
    priority: number;
    isPublic: boolean;
    client?: string;
    budget?: string;
}
```

## Layout Organization

The component organizes project data in the following sections:

### 1. Hero Section
- Project image with overlay
- Category icon and status chips
- Project title and short description
- Featured badge (if applicable)

### 2. Action Buttons
- GitHub repository link
- Live demo link
- Live site link
- Documentation link

### 3. Metrics Display
- Grid layout of key project metrics
- Responsive design (2 columns on mobile, auto-fit on desktop)

### 4. Project Description
- Detailed description section with typography optimized for readability

### 5. Timeline & Technologies
- Two-column layout (single column on mobile)
- Project timeline with start/end dates, client, budget
- Technology stack with chips

### 6. Features Section
- Grid layout of main features
- Check mark icons for visual appeal

### 7. Achievements Section
- List of project achievements with trophy icons

### 8. Challenges Section
- Technical and business challenges overcome

### 9. Team Section
- Team member cards with avatars
- LinkedIn links for networking

### 10. Tags Section
- Hashtag-style project tags

### 11. Related Projects
- Grid of related project cards
- Hover effects for interactivity

## Styling Features

- Consistent with Material-UI design system
- Responsive breakpoints for mobile/tablet/desktop
- Dark/light theme support through Material-UI theme provider
- Smooth hover animations and transitions
- Optimal typography scale and spacing

## Implementation Example

Create a dynamic route file at `src/app/[locale]/projects/[id]/page.tsx`:

```tsx
'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { ProjectPageLayout } from '@/components/project/ProjectPageLayout';
import { Project } from '@/models/Project';
import { CircularProgress, Box } from '@mui/material';

export default function ProjectDetailPage() {
    const params = useParams();
    const [project, setProject] = useState<Project | null>(null);
    const [relatedProjects, setRelatedProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchProject() {
            try {
                // Replace with your database fetch logic
                const response = await fetch(`/api/projects/${params.id}`);
                const projectData = await response.json();
                
                setProject(projectData);
                
                // Fetch related projects
                const relatedResponse = await fetch(`/api/projects/${params.id}/related`);
                const relatedData = await relatedResponse.json();
                setRelatedProjects(relatedData);
            } catch (error) {
                console.error('Error fetching project:', error);
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
                <CircularProgress />
            </Box>
        );
    }

    if (!project) {
        return <div>Project not found</div>;
    }

    return (
        <ProjectPageLayout 
            project={project} 
            relatedProjects={relatedProjects} 
        />
    );
}
```

## API Endpoints

Create corresponding API routes:

### `src/app/api/projects/[id]/route.ts`
```typescript
import { NextResponse } from 'next/server';

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        // Replace with your database query
        const project = await database.projects.findById(params.id);
        
        if (!project) {
            return NextResponse.json({ error: 'Project not found' }, { status: 404 });
        }
        
        return NextResponse.json(project);
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
```

### `src/app/api/projects/[id]/related/route.ts`
```typescript
import { NextResponse } from 'next/server';

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        // Replace with your database query for related projects
        const relatedProjects = await database.projects.findRelated(params.id);
        
        return NextResponse.json(relatedProjects);
    } catch (error) {
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
```

This template ensures that projects from your database are displayed with the same visual organization and user experience as the existing ProjectDetails modal.