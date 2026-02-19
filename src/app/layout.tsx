import type { Metadata, Viewport } from 'next'

// Layout principal - redirecionamento agora é feito pelo middleware
export const metadata: Metadata = {
    title: {
        default: 'Luisa -  Full Stack Developer',
        template: '%s | Luisa -  Full Stack Developer'
    },
    description: "Luisa's professional portfolio, Full Stack Developer specialized in React, Next.js, TypeScript, and Node.js.",
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
