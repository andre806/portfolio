import { notFound } from 'next/navigation';

interface LiveDemoPageProps {
    params: Promise<{
        projectId: string;
    }>;
}

export default async function LiveDemoPage({ params }: LiveDemoPageProps) {
    const { projectId } = await params;

    // Por enquanto, redireciona para 404 pois esta funcionalidade ainda não foi implementada
    console.log('Project ID:', projectId);
    notFound();
}

export function generateStaticParams() {
    // Lista de projectIds válidos quando esta funcionalidade for implementada
    return [];
}