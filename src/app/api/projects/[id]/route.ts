import { NextResponse } from 'next/server';
import { projects } from '@/config/projects';

export async function GET(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        // For demonstration, using static data
        // In production, replace with your database query
        const project = projects.find(p => p.id === params.id);
        
        if (!project) {
            return NextResponse.json({ error: 'Project not found' }, { status: 404 });
        }
        
        return NextResponse.json(project);
    } catch (error) {
        console.error('Error fetching project:', error);
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
        // Database query example
        const project = await db.projects.findUnique({
            where: { id: params.id },
            include: {
                team: true,
                metrics: true,
                technologies: true,
                features: true,
                challenges: true,
                achievements: true,
                gallery: true,
                tags: true
            }
        });
        
        if (!project) {
            return NextResponse.json({ error: 'Project not found' }, { status: 404 });
        }
        
        return NextResponse.json(project);
    } catch (error) {
        console.error('Error fetching project:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
*/