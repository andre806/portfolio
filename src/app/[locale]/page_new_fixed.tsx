'use client'

import { useTranslations } from 'next-intl'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import {
    Box,
    Container,
    Typography,
    Button,
    Card,
    CardContent,
    Avatar,
    IconButton,
    useTheme,
    alpha,
    Stack,
    Paper,
    LinearProgress
} from '@mui/material'
import {
    GitHub as GitHubIcon,
    LinkedIn as LinkedInIcon,
    WhatsApp as WhatsAppIcon,
    Email as EmailIcon,
    Download as DownloadIcon,
    Code as CodeIcon,
    Storage as DatabaseIcon,
    PhoneAndroid as MobileIcon,
    Launch as LaunchIcon
} from '@mui/icons-material'

const HomePage = () => {
    const t = useTranslations()
    const muiTheme = useTheme()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return (
            <Box
                sx={{
                    minHeight: '100vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}
            >
                <LinearProgress
                    sx={{
                        width: '200px',
                        height: '4px',
                        borderRadius: '2px'
                    }}
                />
            </Box>
        )
    }

    const technologies = [
        { name: 'React', color: '#61DAFB', progress: 90 },
        { name: 'Next.js', color: muiTheme.palette.mode === 'dark' ? '#FFFFFF' : '#000000', progress: 85 },
        { name: 'TypeScript', color: '#3178C6', progress: 80 },
        { name: 'Node.js', color: '#339933', progress: 75 },
        { name: 'Python', color: '#3776AB', progress: 70 },
        { name: 'Material-UI', color: '#007FFF', progress: 85 },
        { name: 'Tailwind', color: '#06B6D4', progress: 90 },
        { name: 'Git', color: '#F05032', progress: 85 }
    ]

    const stats = [
        { number: '5+', label: t('home.stats.projectsCompleted') || 'Projects Completed' },
        { number: '5+', label: t('home.stats.yearsExperience') || 'Years Experience' },
        { number: '15+', label: t('home.stats.technologies') || 'Technologies' },
        { number: '100%', label: t('home.stats.satisfaction') || 'Client Satisfaction' }
    ]

    const services = [
        {
            title: t('home.services.frontend.title') || 'Frontend Development',
            description: t('home.services.frontend.description') || 'Modern and responsive user interfaces',
            icon: CodeIcon,
            color: muiTheme.palette.primary.main
        },
        {
            title: t('home.services.backend.title') || 'Backend Development',
            description: t('home.services.backend.description') || 'Robust APIs and server solutions',
            icon: DatabaseIcon,
            color: muiTheme.palette.secondary.main
        },
        {
            title: t('home.services.mobile.title') || 'Mobile Development',
            description: t('home.services.mobile.description') || 'Cross-platform mobile applications',
            icon: MobileIcon,
            color: muiTheme.palette.success.main
        }
    ]

    const socialLinks = [
        { icon: GitHubIcon, url: 'https://github.com', label: 'GitHub', color: '#333' },
        { icon: LinkedInIcon, url: 'https://linkedin.com', label: 'LinkedIn', color: '#0077B5' },
        { icon: WhatsAppIcon, url: 'https://wa.me/5511999999999', label: 'WhatsApp', color: '#25D366' },
        { icon: EmailIcon, url: 'mailto:andre@example.com', label: 'Email', color: '#EA4335' }
    ]

    return (
        <Box sx={{ minHeight: '100vh' }}>
            {/* Hero Section */}
            <Box
                className="portfolio-hero"
                sx={{
                    background: `linear-gradient(135deg, ${muiTheme.palette.primary.main} 0%, ${muiTheme.palette.secondary.main} 100%)`,
                    minHeight: '100vh',
                    display: 'flex',
                    alignItems: 'center',
                    position: 'relative',
                    overflow: 'hidden',
                    color: 'white'
                }}
            >
                <Container maxWidth="xl">
                    <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 4 }}>
                        {/* Hero Text */}
                        <Box sx={{ flex: 1, minWidth: '300px' }}>
                            <motion.div
                                initial={{ opacity: 0, x: -50 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8 }}
                            >
                                <Typography
                                    variant="h6"
                                    sx={{
                                        mb: 2,
                                        fontWeight: 500,
                                        opacity: 0.9
                                    }}
                                >
                                    {t('home.greeting') || 'Hi there! I\'m'}
                                </Typography>

                                <Typography
                                    variant="h1"
                                    sx={{
                                        mb: 3,
                                        fontWeight: 800,
                                        fontSize: { xs: '3rem', md: '4rem', lg: '5rem' },
                                        lineHeight: 0.9,
                                        textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
                                    }}
                                >
                                    André
                                </Typography>

                                <Typography
                                    variant="h4"
                                    sx={{
                                        mb: 4,
                                        fontWeight: 300,
                                        opacity: 0.95,
                                        fontSize: { xs: '1.5rem', md: '2rem' }
                                    }}
                                >
                                    {t('home.title') || 'Full-Stack Developer'}
                                </Typography>

                                <Typography
                                    variant="h6"
                                    sx={{
                                        mb: 4,
                                        maxWidth: '500px',
                                        lineHeight: 1.6,
                                        opacity: 0.9
                                    }}
                                >
                                    {t('home.description') || 'Passionate about creating innovative solutions and exceptional digital experiences with modern technologies.'}
                                </Typography>

                                {/* CTA Buttons */}
                                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} sx={{ mb: 4 }}>
                                    <Button
                                        variant="contained"
                                        size="large"
                                        className="portfolio-button"
                                        endIcon={<LaunchIcon />}
                                        component={Link}
                                        href="/projects"
                                        sx={{
                                            background: 'rgba(255,255,255,0.2)',
                                            backdropFilter: 'blur(10px)',
                                            border: '1px solid rgba(255,255,255,0.3)',
                                            color: 'white',
                                            '&:hover': {
                                                background: 'rgba(255,255,255,0.3)',
                                            }
                                        }}
                                    >
                                        {t('home.cta.viewProjects') || 'View Projects'}
                                    </Button>

                                    <Button
                                        variant="outlined"
                                        size="large"
                                        endIcon={<EmailIcon />}
                                        component={Link}
                                        href="/contact"
                                        sx={{
                                            borderColor: 'rgba(255,255,255,0.5)',
                                            color: 'white',
                                            '&:hover': {
                                                borderColor: 'white',
                                                background: 'rgba(255,255,255,0.1)'
                                            }
                                        }}
                                    >
                                        {t('home.cta.contact') || 'Get In Touch'}
                                    </Button>
                                </Stack>

                                {/* Social Links */}
                                <Stack direction="row" spacing={1}>
                                    {socialLinks.map((social) => {
                                        const IconComponent = social.icon
                                        return (
                                            <motion.div
                                                key={social.label}
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.95 }}
                                            >
                                                <IconButton
                                                    component="a"
                                                    href={social.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    aria-label={social.label}
                                                    sx={{
                                                        color: 'rgba(255,255,255,0.8)',
                                                        backgroundColor: 'rgba(255,255,255,0.1)',
                                                        backdropFilter: 'blur(10px)',
                                                        border: '1px solid rgba(255,255,255,0.2)',
                                                        '&:hover': {
                                                            color: 'white',
                                                            backgroundColor: 'rgba(255,255,255,0.2)',
                                                        }
                                                    }}
                                                >
                                                    <IconComponent />
                                                </IconButton>
                                            </motion.div>
                                        )
                                    })}
                                </Stack>
                            </motion.div>
                        </Box>

                        {/* Hero Animation/Image */}
                        <Box sx={{ flex: 1, minWidth: '300px', display: 'flex', justifyContent: 'center' }}>
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 1, delay: 0.2 }}
                                className="animate-float"
                            >
                                <Box
                                    sx={{
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        height: '400px',
                                        position: 'relative'
                                    }}
                                >
                                    <Paper
                                        elevation={20}
                                        sx={{
                                            width: '300px',
                                            height: '300px',
                                            borderRadius: '50%',
                                            background: `linear-gradient(45deg, ${alpha(muiTheme.palette.common.white, 0.1)} 0%, ${alpha(muiTheme.palette.common.white, 0.05)} 100%)`,
                                            backdropFilter: 'blur(20px)',
                                            border: `2px solid ${alpha(muiTheme.palette.common.white, 0.2)}`,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}
                                    >
                                        <CodeIcon sx={{ fontSize: '120px', color: 'rgba(255,255,255,0.8)' }} />
                                    </Paper>
                                </Box>
                            </motion.div>
                        </Box>
                    </Box>
                </Container>
            </Box>

            {/* Stats Section */}
            <Box className="portfolio-section" sx={{ py: 8, backgroundColor: muiTheme.palette.background.default }}>
                <Container maxWidth="lg">
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
                        {stats.map((stat, index) => (
                            <Box key={index} sx={{ flex: { xs: '1 1 45%', md: '1 1 22%' } }}>
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                >
                                    <Paper
                                        elevation={3}
                                        className="portfolio-card"
                                        sx={{
                                            p: 3,
                                            textAlign: 'center',
                                            height: '100%'
                                        }}
                                    >
                                        <Typography
                                            variant="h3"
                                            sx={{
                                                fontWeight: 700,
                                                color: muiTheme.palette.primary.main,
                                                mb: 1
                                            }}
                                        >
                                            {stat.number}
                                        </Typography>
                                        <Typography variant="body1" color="text.secondary">
                                            {stat.label}
                                        </Typography>
                                    </Paper>
                                </motion.div>
                            </Box>
                        ))}
                    </Box>
                </Container>
            </Box>

            {/* Technologies Section */}
            <Box className="portfolio-section" sx={{ py: 8 }}>
                <Container maxWidth="lg">
                    <Typography
                        variant="h3"
                        component="h2"
                        sx={{
                            textAlign: 'center',
                            fontWeight: 700,
                            mb: 2
                        }}
                    >
                        {t('home.technologies.title') || 'Technologies & Skills'}
                    </Typography>
                    <Typography
                        variant="h6"
                        sx={{
                            textAlign: 'center',
                            color: 'text.secondary',
                            mb: 6,
                            maxWidth: '600px',
                            mx: 'auto'
                        }}
                    >
                        {t('home.technologies.subtitle') || 'Technologies I work with daily'}
                    </Typography>

                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
                        {technologies.map((tech, index) => (
                            <Box key={index} sx={{ flex: { xs: '1 1 45%', sm: '1 1 30%', md: '1 1 22%' } }}>
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: index * 0.1 }}
                                    whileHover={{ scale: 1.05 }}
                                >
                                    <Paper
                                        elevation={2}
                                        className="portfolio-card"
                                        sx={{
                                            p: 3,
                                            textAlign: 'center',
                                            height: '100%',
                                            display: 'flex',
                                            flexDirection: 'column',
                                            gap: 2
                                        }}
                                    >
                                        <Typography
                                            variant="h6"
                                            sx={{
                                                fontWeight: 600,
                                                color: tech.color
                                            }}
                                        >
                                            {tech.name}
                                        </Typography>
                                        <LinearProgress
                                            variant="determinate"
                                            value={tech.progress}
                                            sx={{
                                                height: '8px',
                                                borderRadius: '4px',
                                                backgroundColor: alpha(tech.color, 0.1),
                                                '& .MuiLinearProgress-bar': {
                                                    backgroundColor: tech.color,
                                                }
                                            }}
                                        />
                                        <Typography variant="caption" color="text.secondary">
                                            {tech.progress}%
                                        </Typography>
                                    </Paper>
                                </motion.div>
                            </Box>
                        ))}
                    </Box>
                </Container>
            </Box>

            {/* Services Section */}
            <Box className="portfolio-section" sx={{ py: 8, backgroundColor: muiTheme.palette.background.default }}>
                <Container maxWidth="lg">
                    <Typography
                        variant="h3"
                        component="h2"
                        sx={{
                            textAlign: 'center',
                            fontWeight: 700,
                            mb: 2
                        }}
                    >
                        {t('home.services.title') || 'What I Do'}
                    </Typography>
                    <Typography
                        variant="h6"
                        sx={{
                            textAlign: 'center',
                            color: 'text.secondary',
                            mb: 6,
                            maxWidth: '600px',
                            mx: 'auto'
                        }}
                    >
                        {t('home.services.subtitle') || 'Services I provide to help your business grow'}
                    </Typography>

                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 4 }}>
                        {services.map((service, index) => {
                            const IconComponent = service.icon
                            return (
                                <Box key={index} sx={{ flex: { xs: '1 1 100%', md: '1 1 30%' } }}>
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.6, delay: index * 0.2 }}
                                        whileHover={{ y: -10 }}
                                    >
                                        <Card
                                            elevation={4}
                                            className="portfolio-card"
                                            sx={{
                                                height: '100%',
                                                display: 'flex',
                                                flexDirection: 'column',
                                                p: 3
                                            }}
                                        >
                                            <CardContent sx={{ flexGrow: 1 }}>
                                                <Box
                                                    sx={{
                                                        display: 'flex',
                                                        justifyContent: 'center',
                                                        mb: 3
                                                    }}
                                                >
                                                    <Avatar
                                                        sx={{
                                                            width: 80,
                                                            height: 80,
                                                            backgroundColor: service.color,
                                                            fontSize: '2rem'
                                                        }}
                                                    >
                                                        <IconComponent fontSize="large" />
                                                    </Avatar>
                                                </Box>

                                                <Typography
                                                    variant="h5"
                                                    component="h3"
                                                    sx={{
                                                        fontWeight: 600,
                                                        mb: 2,
                                                        textAlign: 'center'
                                                    }}
                                                >
                                                    {service.title}
                                                </Typography>

                                                <Typography
                                                    variant="body1"
                                                    color="text.secondary"
                                                    sx={{
                                                        textAlign: 'center',
                                                        lineHeight: 1.6
                                                    }}
                                                >
                                                    {service.description}
                                                </Typography>
                                            </CardContent>
                                        </Card>
                                    </motion.div>
                                </Box>
                            )
                        })}
                    </Box>
                </Container>
            </Box>

            {/* CTA Section */}
            <Box
                className="portfolio-section"
                sx={{
                    py: 10,
                    background: `linear-gradient(135deg, ${muiTheme.palette.primary.main} 0%, ${muiTheme.palette.secondary.main} 100%)`,
                    color: 'white',
                    textAlign: 'center'
                }}
            >
                <Container maxWidth="md">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <Typography
                            variant="h3"
                            component="h2"
                            sx={{
                                fontWeight: 700,
                                mb: 2
                            }}
                        >
                            {t('home.cta.title') || 'Ready to Start Your Project?'}
                        </Typography>

                        <Typography
                            variant="h6"
                            sx={{
                                mb: 4,
                                opacity: 0.9
                            }}
                        >
                            {t('home.cta.subtitle') || 'Let\'s work together to bring your ideas to life'}
                        </Typography>

                        <Stack
                            direction={{ xs: 'column', sm: 'row' }}
                            spacing={2}
                            justifyContent="center"
                        >
                            <Button
                                variant="contained"
                                size="large"
                                className="portfolio-button"
                                endIcon={<EmailIcon />}
                                component={Link}
                                href="/contact"
                                sx={{
                                    background: 'rgba(255,255,255,0.2)',
                                    backdropFilter: 'blur(10px)',
                                    border: '1px solid rgba(255,255,255,0.3)',
                                    color: 'white',
                                    '&:hover': {
                                        background: 'rgba(255,255,255,0.3)',
                                    }
                                }}
                            >
                                {t('home.cta.contact') || 'Contact Me'}
                            </Button>

                            <Button
                                variant="outlined"
                                size="large"
                                endIcon={<DownloadIcon />}
                                sx={{
                                    borderColor: 'rgba(255,255,255,0.5)',
                                    color: 'white',
                                    '&:hover': {
                                        borderColor: 'white',
                                        background: 'rgba(255,255,255,0.1)'
                                    }
                                }}
                            >
                                {t('home.cta.resume') || 'Download Resume'}
                            </Button>
                        </Stack>
                    </motion.div>
                </Container>
            </Box>
        </Box>
    )
}

export default HomePage
