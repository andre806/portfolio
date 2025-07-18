import { Inter } from 'next/font/google'
import { notFound } from 'next/navigation'
import { ThemeProvider } from '@/contexts/ThemeContext'
import { MuiThemeProvider } from '@/contexts/MuiThemeContext'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import ScrollToTop from '@/components/common/ScrollToTop'
import FeedbackForm from '@/components/contact/FeedbackForm'
import PageTransition from '@/components/common/PageTransition'
import '@/styles/globals.css'

const locales = ['pt', 'en']

// Configuração da fonte Inter do Google Fonts
const inter = Inter({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-inter'
})

export default async function LocaleLayout({
    children,
    params
}: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    // Await params para suporte ao Next.js 15
    const { locale } = await params;

    // Valida se o locale é suportado
    if (!locales.includes(locale)) notFound();

    return (
        <html
            lang={locale}
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
            <body>
                <MuiThemeProvider initialLocale={locale as 'pt' | 'en'}>
                    <ThemeProvider>
                        {/* Skip link para acessibilidade */}
                        <a
                            href="#main-content"
                            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-blue-600 text-white px-4 py-2 rounded-md z-50 transition-all duration-200"
                        >
                            {locale === 'pt' ? 'Pular para o conteúdo principal' : 'Skip to main content'}
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
                                <PageTransition>
                                    {children}
                                </PageTransition>
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
                                    <span className="text-slate-700 dark:text-slate-300">
                                        {locale === 'pt' ? 'Carregando...' : 'Loading...'}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </ThemeProvider>
                </MuiThemeProvider>
            </body>
        </html>
    );
}
