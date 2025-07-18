import type { Viewport } from 'next'

// Layout específico para rotas públicas
export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
}

export default function PublicLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return <>{children}</>
}
