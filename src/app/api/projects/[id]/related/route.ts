import { NextResponse } from 'next/server';
import { projects } from '@/config/projects';

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        // For demonstration, using static data
        // In production, replace with your database query
        const currentProject = projects.find(p => p.id === params.id);
        
        if (!currentProject) {
            return NextResponse.json({ error: 'Project not found' }, { status: 404 });
        }
        
        // Find related projects based on category and technologies
        const relatedProjects = projects
            .filter(p => 
                p.id !== currentProject.id && (
                    p.category === currentProject.category ||
                    p.technologies.some(tech => currentProject.technologies.includes(tech))
                )
            )
            .sort((a, b) => {
                // Prioritize projects with same category
                if (a.category === currentProject.category && b.category !== currentProject.category) return -1;
                if (b.category === currentProject.category && a.category !== currentProject.category) return 1;
                
                // Then by technology overlap
                const aOverlap = a.technologies.filter(tech => currentProject.technologies.includes(tech)).length;
                const bOverlap = b.technologies.filter(tech => currentProject.technologies.includes(tech)).length;
                return bOverlap - aOverlap;
            })
            .slice(0, 6); // Limit to 6 related projects
        
        return NextResponse.json(relatedProjects);
    } catch (error) {
        console.error('Error fetching related projects:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}

// Example implementation for database integration:
/*
export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        // Database query example for related projects
        const currentProject = await db.projects.findUnique({
            where: { id: params.id },
            select: { category: true, technologies: { select: { name: true } } }
        });
        
        if (!currentProject) {
            return NextResponse.json({ error: 'Project not found' }, { status: 404 });
        }
        
        const techNames = currentProject.technologies.map(t => t.name);
        
        const relatedProjects = await db.projects.findMany({
            where: {
                id: { not: params.id },
                OR: [
                    { category: currentProject.category },
                    { technologies: { some: { name: { in: techNames } } } }
                ]
            },
            include: {
                technologies: true
            },
            take: 6
        });
        
        return NextResponse.json(relatedProjects);
    } catch (error) {
        console.error('Error fetching related projects:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
*/