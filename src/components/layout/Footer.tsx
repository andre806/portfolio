'use client'

import React from 'react'
import Link from 'next/link'
import { useTranslations, useLocale } from 'next-intl'
import {
    Box,
    Container,
    Typography,
    IconButton,
    Divider,
    useTheme,
    alpha,
    Stack
} from '@mui/material'
import {
    GitHub as GitHubIcon,
    LinkedIn as LinkedInIcon,
    Twitter as TwitterIcon,
    Email as EmailIcon,
    Phone as PhoneIcon,
    LocationOn as LocationIcon,
    Favorite as FavoriteIcon
} from '@mui/icons-material'
import { motion } from 'framer-motion'

const Footer = () => {
    const currentYear = new Date().getFullYear()
    const theme = useTheme()
    const t = useTranslations('footer')
    const locale = useLocale()

    const getLocalizedHref = (path: string) => {
        return `/${locale}${path === '/' ? '' : path}`
    }

    const socialLinks = [
        {
            name: 'GitHub',
            url: 'https://github.com/seu-usuario',
            icon: GitHubIcon,
            color: '#333'
        },
        {
            name: 'LinkedIn',
            url: 'https://linkedin.com/in/seu-perfil',
            icon: LinkedInIcon,
            color: '#0077B5'
        },
        {
            name: 'Twitter',
            url: 'https://twitter.com/seu-usuario',
            icon: TwitterIcon,
            color: '#1DA1F2'
        },
        {
            name: 'Email',
            url: 'mailto:andre@example.com',
            icon: EmailIcon,
            color: '#EA4335'
        }
    ]

    const footerSections = [
        {
            title: t('navigation'),
            links: [
                { label: t('home'), href: '/' },
                { label: t('about'), href: '/about' },
                { label: t('projects'), href: '/projects' },
                { label: t('blog'), href: '/blog' },
                { label: t('contact'), href: '/contact' }
            ]
        },
        {
            title: t('resources'),
            links: [
                { label: t('playground'), href: '/interactive/playground' },
                { label: t('jobs'), href: '/jobs' },
                { label: t('timeline'), href: '/about/timeline' }
            ]
        },
        {
            title: t('legal'),
            links: [
                { label: t('privacy'), href: '/privacy-policy' },
                { label: t('terms'), href: '/terms' }
            ]
        }
    ]

    return (
        <Box
            component="footer"
            className="portfolio-footer"
            sx={{
                background: `linear-gradient(135deg, ${theme.palette.grey[900]} 0%, ${theme.palette.grey[800]} 100%)`,
                color: 'white',
                py: 6,
                mt: 'auto'
            }}
        >
            <Container maxWidth="lg">
                {/* Main Footer Content */}
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', md: 'row' },
                        gap: 4,
                        alignItems: 'flex-start'
                    }}
                >
                    {/* Brand Section */}
                    <Box sx={{ flex: { xs: 1, md: 1 } }}>
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            <Typography
                                variant="h5"
                                component="div"
                                sx={{
                                    fontWeight: 700,
                                    mb: 2,
                                    background: `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.secondary.light} 100%)`,
                                    backgroundClip: 'text',
                                    WebkitBackgroundClip: 'text',
                                    WebkitTextFillColor: 'transparent',
                                }}
                            >
                                André Portfolio
                            </Typography>

                            <Typography variant="body1" sx={{ mb: 3, color: 'grey.300' }}>
                                {locale === 'pt'
                                    ? 'Desenvolvedor Full-Stack apaixonado por criar soluções inovadoras e experiências digitais excepcionais.'
                                    : 'Full-Stack Developer passionate about creating innovative solutions and exceptional digital experiences.'
                                }
                            </Typography>

                            {/* Contact Info */}
                            <Stack spacing={1}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <EmailIcon fontSize="small" sx={{ color: 'grey.400' }} />
                                    <Typography variant="body2" sx={{ color: 'grey.300' }}>
                                        andre@example.com
                                    </Typography>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <PhoneIcon fontSize="small" sx={{ color: 'grey.400' }} />
                                    <Typography variant="body2" sx={{ color: 'grey.300' }}>
                                        +55 (11) 99999-9999
                                    </Typography>
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <LocationIcon fontSize="small" sx={{ color: 'grey.400' }} />
                                    <Typography variant="body2" sx={{ color: 'grey.300' }}>
                                        São Paulo, Brasil
                                    </Typography>
                                </Box>
                            </Stack>
                        </motion.div>
                    </Box>

                    {/* Navigation Sections */}
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: { xs: 'column', sm: 'row' },
                            gap: 4,
                            flex: { xs: 1, md: 2 }
                        }}
                    >
                        {footerSections.map((section, index) => (
                            <Box key={section.title} sx={{ flex: 1 }}>
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                >
                                    <Typography
                                        variant="h6"
                                        component="h3"
                                        sx={{ fontWeight: 600, mb: 2, color: 'white' }}
                                    >
                                        {section.title}
                                    </Typography>

                                    <Stack spacing={1}>
                                        {section.links.map((link) => (
                                            <Link
                                                key={link.href}
                                                href={getLocalizedHref(link.href)}
                                                passHref
                                            >
                                                <Typography
                                                    variant="body2"
                                                    component="div"
                                                    sx={{
                                                        color: 'grey.300',
                                                        textDecoration: 'none',
                                                        cursor: 'pointer',
                                                        transition: 'color 0.3s ease',
                                                        '&:hover': {
                                                            color: theme.palette.primary.light,
                                                        }
                                                    }}
                                                >
                                                    {link.label}
                                                </Typography>
                                            </Link>
                                        ))}
                                    </Stack>
                                </motion.div>
                            </Box>
                        ))}
                    </Box>
                </Box>

                <Divider sx={{ my: 4, borderColor: alpha(theme.palette.common.white, 0.1) }} />

                {/* Bottom Section */}
                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: 'center', gap: 2 }}>
                    {/* Copyright */}
                    <Typography variant="body2" sx={{ color: 'grey.400' }}>
                        © {currentYear} André Portfolio.
                        <Box component="span" sx={{ display: 'inline-flex', alignItems: 'center', mx: 0.5 }}>
                            {locale === 'pt' ? 'Feito com' : 'Made with'}
                            <FavoriteIcon sx={{ fontSize: 16, color: 'red', mx: 0.5 }} />
                            {locale === 'pt' ? 'no Brasil' : 'in Brazil'}
                        </Box>
                    </Typography>

                    {/* Social Links */}
                    <Box sx={{ display: 'flex', gap: 1 }}>
                        {socialLinks.map((social) => {
                            const IconComponent = social.icon
                            return (
                                <motion.div
                                    key={social.name}
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <IconButton
                                        component="a"
                                        href={social.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        aria-label={social.name}
                                        sx={{
                                            color: 'grey.400',
                                            '&:hover': {
                                                color: social.color,
                                                backgroundColor: alpha(social.color, 0.1),
                                            },
                                            transition: 'all 0.3s ease',
                                        }}
                                    >
                                        <IconComponent />
                                    </IconButton>
                                </motion.div>
                            )
                        })}
                    </Box>
                </Box>
            </Container>
        </Box>
    )
}

export default Footer
