'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTranslations, useLocale } from 'next-intl'
import { motion, AnimatePresence } from 'framer-motion'
import DarkModeToggle from '@/components/common/DarkModeToggle'
import LanguageSelector from '@/components/common/LanguageSelector'

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)
    const pathname = usePathname()
    const t = useTranslations('navigation')
    const locale = useLocale()

    // Detecta scroll para adicionar blur e sombra
    useEffect(() => {
        const handleScroll = () => {
            const isScrolled = window.scrollY > 10
            setScrolled(isScrolled)
        }

        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    // Fecha menu mobile ao pressionar ESC
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setIsMenuOpen(false)
            }
        }

        if (isMenuOpen) {
            document.addEventListener('keydown', handleEsc)
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }

        return () => {
            document.removeEventListener('keydown', handleEsc)
            document.body.style.overflow = 'unset'
        }
    }, [isMenuOpen])

    const navItems = [
        { href: '/', label: t('home'), icon: '🏠' },
        { href: '/about', label: t('about'), icon: '👨‍💻' },
        { href: '/projects', label: t('projects'), icon: '🚀' },
        { href: '/blog', label: t('blog'), icon: '📝' },
        { href: '/interactive/playground', label: t('playground'), icon: '🛝' },
        { href: '/jobs', label: t('jobs'), icon: '💼' },
        { href: '/contact', label: t('contact'), icon: '📧' }
    ]

    const isActive = (path: string) => {
        const currentPath = pathname.replace(`/${locale}`, '') || '/'
        return currentPath === path
    }

    const getLocalizedHref = (path: string) => {
        return `/${locale}${path === '/' ? '' : path}`
    }

    return (
        <nav className={`relative transition-all duration-300 ${scrolled
                ? 'bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-lg'
                : 'bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm'
            }`}
        >
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo/Brand */}
                    <motion.div
                        className="flex-shrink-0"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Link
                            href={getLocalizedHref('/')}
                            className="flex items-center space-x-2 text-xl font-bold text-slate-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
                        >
                            <motion.span
                                className="text-2xl"
                                animate={{ rotate: [0, 10, -10, 0] }}
                                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                            >
                                👨‍💻
                            </motion.span>
                            <span>André</span>
                        </Link>
                    </motion.div>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:block">
                        <div className="flex items-center space-x-1">
                            {navItems.map((item) => (
                                <motion.div
                                    key={item.href}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <Link
                                        href={getLocalizedHref(item.href)}
                                        className={`group relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${isActive(item.href)
                                                ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
                                                : 'text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-800'
                                            }`}
                                    >
                                        <span className="flex items-center space-x-2">
                                            <span>{item.icon}</span>
                                            <span>{item.label}</span>
                                        </span>
                                        {isActive(item.href) && (
                                            <motion.div
                                                className="absolute inset-0 bg-blue-100 dark:bg-blue-900/30 rounded-lg -z-10"
                                                layoutId="activeTab"
                                                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                            />
                                        )}
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                    {/* Right side controls */}
                    <div className="flex items-center space-x-4">
                        <LanguageSelector />
                        <DarkModeToggle />

                        {/* Mobile menu button */}
                        <motion.button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="lg:hidden p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors duration-200"
                            whileTap={{ scale: 0.95 }}
                            aria-label="Toggle mobile menu"
                        >
                            <div className="flex flex-col justify-center items-center w-5 h-5 space-y-1">
                                <motion.span
                                    className="block w-5 h-0.5 bg-current rounded-full"
                                    animate={isMenuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                                    transition={{ duration: 0.2 }}
                                />
                                <motion.span
                                    className="block w-5 h-0.5 bg-current rounded-full"
                                    animate={isMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                                    transition={{ duration: 0.2 }}
                                />
                                <motion.span
                                    className="block w-5 h-0.5 bg-current rounded-full"
                                    animate={isMenuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                                    transition={{ duration: 0.2 }}
                                />
                            </div>
                        </motion.button>
                    </div>
                </div>
            </div>

            {/* Mobile menu overlay */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsMenuOpen(false)}
                    >
                        <motion.div
                            className="fixed top-16 inset-x-4 bg-white dark:bg-slate-800 rounded-2xl shadow-2xl max-h-96 overflow-y-auto z-50"
                            initial={{ opacity: 0, y: -20, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -20, scale: 0.95 }}
                            transition={{ duration: 0.2 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="p-6">
                                <nav className="space-y-2">
                                    {navItems.map((item, index) => (
                                        <motion.div
                                            key={item.href}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.05 }}
                                        >
                                            <Link
                                                href={getLocalizedHref(item.href)}
                                                onClick={() => setIsMenuOpen(false)}
                                                className={`group flex items-center space-x-3 px-4 py-3 rounded-xl text-base font-medium transition-all duration-200 ${isActive(item.href)
                                                        ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
                                                        : 'text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-50 dark:hover:bg-slate-700'
                                                    }`}
                                            >
                                                <span className="text-xl">{item.icon}</span>
                                                <span className="flex-1">{item.label}</span>
                                                {isActive(item.href) && (
                                                    <motion.div
                                                        className="w-2 h-2 bg-blue-600 dark:bg-blue-400 rounded-full"
                                                        layoutId="activeMobileTab"
                                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                                    />
                                                )}
                                            </Link>
                                        </motion.div>
                                    ))}
                                </nav>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    )
}

export default Navbar
