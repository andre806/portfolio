import type { Metadata, Viewport } from 'next'

// Layout principal - redirecionamento agora é feito pelo middleware
export const metadata: Metadata = {
    title: {
        default: 'André - Desenvolvedor Full Stack',
        template: '%s | André - Desenvolvedor Full Stack'
    },
    description: 'Portfólio profissional de André, desenvolvedor Full Stack especializado em React, Next.js, TypeScript e Node.js.',
    icons: {
        icon: [
            { url: '/favicon.ico', sizes: '32x32', type: 'image/x-icon' },
            { url: '/favicon.svg', type: 'image/svg+xml' },
        ],
        shortcut: '/favicon.ico',
        apple: '/favicon.ico',
    },
    robots: 'index, follow',
}

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body suppressHydrationWarning>
                {children}
            </body>
        </html>
    )
}
