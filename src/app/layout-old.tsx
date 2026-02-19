import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ThemeProvider } from '@/contexts/ThemeContext'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import ScrollToTop from '@/components/common/ScrollToTop'
import FeedbackForm from '@/components/contact/FeedbackForm'
import '@/styles/globals.css'

// Configuração da fonte Inter do Google Fonts
const inter = Inter({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-inter'
})

// Site metadata (English, Luisa)
export const metadata: Metadata = {
    title: {
        default: 'Luisa - Full Stack Developer',
        template: '%s | Luisa - Full Stack Developer'
    },
    description: "Luisa's professional portfolio, Full Stack Developer specialized in React, Next.js, TypeScript, and Node.js.",
    keywords: ['developer', 'full stack', 'react', 'nextjs', 'typescript', 'portfolio', 'luisa'],
    authors: [{ name: 'Luisa' }],
    creator: 'Luisa',
    openGraph: {
        type: 'website',
        locale: 'en_US',
        url: 'https://yourdomain.com',
        title: 'Luisa - Full Stack Developer',
        description: "Luisa's professional portfolio, Full Stack Developer",
        siteName: 'Luisa Portfolio',
        images: [
            {
                url: '/profile-photo.png',
                width: 1200,
                height: 630,
                alt: 'Luisa - Full Stack Developer'
            }
        ]
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Luisa - Full Stack Developer',
        description: "Luisa's professional portfolio, Full Stack Developer",
        images: ['/profile-photo.png']
    },
    robots: {
        index: true,
        follow: true
    },
    manifest: '/manifest.json'
}

// Viewport configuration
export const viewport = {
    width: 'device-width',
    initialScale: 1,
    themeColor: [
        { media: '(prefers-color-scheme: light)', color: '#ffffff' },
        { media: '(prefers-color-scheme: dark)', color: '#0f172a' }
    ]
}

interface RootLayoutProps {
    children: React.ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
    return (
        <html
            lang="en"
            className={`${inter.variable} antialiased`}
            suppressHydrationWarning
        >
            <head>
                {/* Preconnect para melhor performance */}
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

                {/* Favicon */}
                <link rel="icon" href="/favicon.ico" sizes="any" />
                <link rel="icon" href="/icon.svg" type="image/svg+xml" />
                <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

                {/* PWA Manifest */}
                <link rel="manifest" href="/manifest.json" />
            </head>
            <body className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 text-slate-900 dark:text-slate-100 transition-colors duration-300">
                {/* Provider de Tema para todo o app */}
                <ThemeProvider>
                    {/* Skip link para acessibilidade */}
                    <a
                        href="#main-content"
                        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded-md z-50 transition-all duration-200"
                    >
                        Skip to main content
                    </a>

                    {/* Container principal com layout flexível */}
                    <div className="flex flex-col min-h-screen">
                        {/* Header com navegação */}
                        <header className="sticky top-0 z-40 backdrop-blur-sm bg-white/80 dark:bg-slate-900/80 border-b border-slate-200 dark:border-slate-700">
                            <Navbar />
                        </header>

                        {/* Conteúdo principal */}
                        <main
                            id="main-content"
                            className="flex-1 relative"
                            role="main"
                        >
                            {/* Container responsivo centralizado */}
                            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                                <div className="py-8 lg:py-12">
                                    {children}
                                </div>
                            </div>
                        </main>

                        {/* Footer fixo */}
                        <footer className="border-t border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm">
                            <Footer />
                        </footer>
                    </div>

                    {/* Botão de scroll para o topo */}
                    <ScrollToTop />

                    {/* Formulário de feedback flutuante */}
                    <FeedbackForm />

                    {/* Overlay para loading states (se necessário) */}
                    <div
                        id="loading-overlay"
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 hidden items-center justify-center"
                        aria-hidden="true"
                    >
                        <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-xl">
                            <div className="flex items-center space-x-3">
                                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                                <span className="text-slate-700 dark:text-slate-300">Loading...</span>
                            </div>
                        </div>
                    </div>
                </ThemeProvider>
            </body>
        </html>
    )
}