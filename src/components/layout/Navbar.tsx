'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTranslations, useLocale } from 'next-intl'
import { motion } from 'framer-motion'
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    IconButton,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Box,
    useTheme,
    alpha,
    Container,
    Chip
} from '@mui/material'
import {
    Menu as MenuIcon,
    Close as CloseIcon,
    Home as HomeIcon,
    Person as PersonIcon,
    Work as WorkIcon,
    Article as ArticleIcon,
    PlayArrow as PlayIcon,
    Business as BusinessIcon,
    Email as EmailIcon,
    Code as CodeIcon
} from '@mui/icons-material'
import DarkModeToggle from '@/components/common/DarkModeToggle'
import LanguageSelector from '@/components/common/LanguageSelector'

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [scrolled, setScrolled] = useState(false)
    const pathname = usePathname()
    const t = useTranslations('navigation')
    const locale = useLocale()
    const theme = useTheme()

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
        }

        return () => {
            document.removeEventListener('keydown', handleEsc)
        }
    }, [isMenuOpen])

    const navItems = [
        { href: '/', label: t('home'), icon: HomeIcon },
        { href: '/about', label: t('about'), icon: PersonIcon },
        { href: '/projects', label: t('projects'), icon: WorkIcon },
        { href: '/blog', label: t('blog'), icon: ArticleIcon },
        { href: '/interactive/playground', label: t('playground'), icon: PlayIcon },
        { href: '/jobs', label: t('jobs'), icon: BusinessIcon },
        { href: '/contact', label: t('contact'), icon: EmailIcon }
    ]

    const isActive = (path: string) => {
        const currentPath = pathname.replace(`/${locale}`, '') || '/'
        return currentPath === path
    }

    const getLocalizedHref = (path: string) => {
        return `/${locale}${path === '/' ? '' : path}`
    }

    const handleDrawerToggle = () => {
        setIsMenuOpen(!isMenuOpen)
    }

    return (
        <AppBar
            position="sticky"
            elevation={scrolled ? 4 : 1}
            className="portfolio-navbar"
            sx={{
                backgroundColor: scrolled
                    ? alpha(theme.palette.background.paper, 0.95)
                    : alpha(theme.palette.background.paper, 0.85),
                backdropFilter: 'blur(20px)',
                borderBottom: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
                transition: 'all 0.3s ease-in-out',
            }}
        >
            <Container maxWidth="xl">
                <Toolbar sx={{ height: 80, justifyContent: 'space-between' }}>
                    {/* Logo */}
                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Link href={getLocalizedHref('/')} passHref>
                            <Box
                                component="div"
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    textDecoration: 'none',
                                    cursor: 'pointer'
                                }}
                            >
                                <motion.div
                                    animate={{ rotate: [0, 10, -10, 0] }}
                                    transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                                >
                                    <CodeIcon
                                        sx={{
                                            fontSize: 32,
                                            color: theme.palette.primary.main,
                                            mr: 1
                                        }}
                                    />
                                </motion.div>
                                <Typography
                                    variant="h5"
                                    component="div"
                                    className="gradient-text"
                                    sx={{
                                        fontWeight: 700,
                                        background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
                                        backgroundClip: 'text',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                    }}
                                >
                                    André
                                </Typography>
                            </Box>
                        </Link>
                    </motion.div>

                    {/* Desktop Navigation */}
                    <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 1 }}>
                        {navItems.map((item) => {
                            const IconComponent = item.icon
                            const active = isActive(item.href)

                            return (
                                <motion.div
                                    key={item.href}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <Link href={getLocalizedHref(item.href)} passHref>
                                        <Button
                                            variant={active ? "contained" : "text"}
                                            startIcon={<IconComponent />}
                                            className={active ? "portfolio-button" : ""}
                                            sx={{
                                                mx: 0.5,
                                                px: 2,
                                                py: 1,
                                                borderRadius: 2,
                                                textTransform: 'none',
                                                fontWeight: active ? 600 : 500,
                                                minWidth: 'auto',
                                                ...(active ? {
                                                    background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.dark} 100%)`,
                                                    boxShadow: `0 4px 20px ${alpha(theme.palette.primary.main, 0.3)}`,
                                                } : {
                                                    color: theme.palette.text.primary,
                                                    '&:hover': {
                                                        backgroundColor: alpha(theme.palette.primary.main, 0.1),
                                                        color: theme.palette.primary.main,
                                                    }
                                                })
                                            }}
                                        >
                                            {item.label}
                                        </Button>
                                    </Link>
                                </motion.div>
                            )
                        })}
                    </Box>

                    {/* Right side controls */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <LanguageSelector />
                        <DarkModeToggle />

                        {/* Mobile menu button */}
                        <IconButton
                            sx={{ display: { xs: 'flex', md: 'none' } }}
                            onClick={handleDrawerToggle}
                            aria-label="menu"
                        >
                            <MenuIcon />
                        </IconButton>
                    </Box>
                </Toolbar>
            </Container>

            {/* Mobile Drawer */}
            <Drawer
                anchor="right"
                open={isMenuOpen}
                onClose={handleDrawerToggle}
                sx={{
                    display: { xs: 'block', md: 'none' },
                    '& .MuiDrawer-paper': {
                        width: 280,
                        boxSizing: 'border-box',
                        background: `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${alpha(theme.palette.primary.main, 0.05)} 100%)`,
                        backdropFilter: 'blur(20px)',
                    },
                }}
            >
                <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h6" sx={{ fontWeight: 600 }}>
                        Menu
                    </Typography>
                    <IconButton onClick={handleDrawerToggle}>
                        <CloseIcon />
                    </IconButton>
                </Box>

                <List>
                    {navItems.map((item) => {
                        const IconComponent = item.icon
                        const active = isActive(item.href)

                        return (
                            <ListItem key={item.href} disablePadding>
                                <Link href={getLocalizedHref(item.href)} passHref style={{ width: '100%' }}>
                                    <ListItemButton
                                        onClick={handleDrawerToggle}
                                        sx={{
                                            borderRadius: 2,
                                            mx: 1,
                                            mb: 0.5,
                                            ...(active && {
                                                backgroundColor: alpha(theme.palette.primary.main, 0.1),
                                                color: theme.palette.primary.main,
                                                fontWeight: 600,
                                            })
                                        }}
                                    >
                                        <ListItemIcon sx={{ color: active ? theme.palette.primary.main : 'inherit' }}>
                                            <IconComponent />
                                        </ListItemIcon>
                                        <ListItemText
                                            primary={item.label}
                                            sx={{
                                                '& .MuiListItemText-primary': {
                                                    fontWeight: active ? 600 : 500
                                                }
                                            }}
                                        />
                                        {active && (
                                            <Chip
                                                size="small"
                                                label="Active"
                                                color="primary"
                                                variant="outlined"
                                            />
                                        )}
                                    </ListItemButton>
                                </Link>
                            </ListItem>
                        )
                    })}
                </List>
            </Drawer>
        </AppBar>
    )
}

export default Navbar
