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
    Stack,
    Paper,
    LinearProgress
} from '@mui/material'
import {
    Email as EmailIcon,
    Download as DownloadIcon,
    Code as CodeIcon,
    Storage as DatabaseIcon,
    PhoneAndroid as MobileIcon,
    Launch as LaunchIcon
} from '@mui/icons-material'

const HomePage = () => {
    const t = useTranslations()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    // Valores fixos para evitar problemas de hidratação
    const technologies = [
        { name: 'React', color: '#61DAFB', progress: 90 },
        { name: 'Next.js', color: '#000000', progress: 85 },
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
            color: '#1976d2' // Cor fixa
        },
        {
            title: t('home.services.backend.title') || 'Backend Development',
            description: t('home.services.backend.description') || 'Robust APIs and server solutions',
            icon: DatabaseIcon,
            color: '#dc004e' // Cor fixa
        },
        {
            title: t('home.services.mobile.title') || 'Mobile Development',
            description: t('home.services.mobile.description') || 'Cross-platform mobile applications',
            icon: MobileIcon,
            color: '#2e7d32' // Cor fixa
        }
    ]

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

    return (
        <Box sx={{ minHeight: '100vh' }}>
            {/* Hero Section */}
            <Box
                className="portfolio-hero"
                sx={{
                    background: `linear-gradient(135deg, #1976d2 0%, #dc004e 100%)`,
                    minHeight: '100vh',
                    display: 'flex',
                    alignItems: 'center',
                    position: 'relative',
                    overflow: 'hidden',
                    color: 'white'
                }}
            >
                <Container maxWidth="xl">
                    <Box
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: { xs: 4, lg: 6 },
                            minHeight: '80vh',
                            flexDirection: { xs: 'column', lg: 'row' }
                        }}
                    >
                        {/* Hero Text */}
                        <Box sx={{ flex: 1, textAlign: { xs: 'center', lg: 'left' } }}>
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
                                        opacity: 0.9,
                                        fontSize: '1.1rem'
                                    }}
                                >
                                    {t('home.greeting') || 'Hi there! I\'m'}
                                </Typography>

                                <Typography
                                    variant="h1"
                                    sx={{
                                        mb: 3,
                                        fontWeight: 800,
                                        fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4rem' },
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
                                        fontSize: { xs: '1.25rem', sm: '1.5rem', md: '1.8rem' }
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
                                        opacity: 0.9,
                                        fontSize: { xs: '0.95rem', sm: '1.1rem' }
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
                                        endIcon={<LaunchIcon sx={{ fontSize: '1rem' }} />}
                                        component={Link}
                                        href="/projects"
                                        sx={{
                                            background: 'rgba(255,255,255,0.2)',
                                            backdropFilter: 'blur(10px)',
                                            border: '1px solid rgba(255,255,255,0.3)',
                                            color: 'white',
                                            padding: '12px 24px',
                                            fontSize: '0.9rem',
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
                                        endIcon={<EmailIcon sx={{ fontSize: '1rem' }} />}
                                        component={Link}
                                        href="/contact"
                                        sx={{
                                            borderColor: 'rgba(255,255,255,0.5)',
                                            color: 'white',
                                            padding: '12px 24px',
                                            fontSize: '0.9rem',
                                            '&:hover': {
                                                borderColor: 'white',
                                                background: 'rgba(255,255,255,0.1)'
                                            }
                                        }}
                                    >
                                        {t('home.cta.contact') || 'Get In Touch'}
                                    </Button>
                                </Stack>
                            </motion.div>
                        </Box>

                        {/* Hero Animation/Image */}
                        <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
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
                                        height: { xs: '250px', sm: '280px', md: '300px' },
                                        position: 'relative'
                                    }}
                                >
                                    <Paper
                                        elevation={20}
                                        sx={{
                                            width: { xs: '200px', sm: '250px', md: '280px' },
                                            height: { xs: '200px', sm: '250px', md: '280px' },
                                            borderRadius: '50%',
                                            background: `linear-gradient(45deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)`,
                                            backdropFilter: 'blur(20px)',
                                            border: `2px solid rgba(255,255,255,0.2)`,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center'
                                        }}
                                    >
                                        <CodeIcon sx={{
                                            fontSize: { xs: '40px', sm: '50px', md: '60px' },
                                            color: 'rgba(255,255,255,0.8)'
                                        }} />
                                    </Paper>
                                </Box>
                            </motion.div>
                        </Box>
                    </Box>
                </Container>
            </Box>

            {/* Stats Section */}
            <Box className="portfolio-section" sx={{ py: 8, backgroundColor: 'rgba(0,0,0,0.02)' }}>
                <Container maxWidth="lg">
                    <Box
                        sx={{
                            display: 'grid',
                            gridTemplateColumns: {
                                xs: 'repeat(auto-fit, minmax(200px, 1fr))',
                                sm: 'repeat(2, 1fr)',
                                md: 'repeat(4, 1fr)'
                            },
                            gap: { xs: 2, sm: 3, md: 4 },
                            alignItems: 'stretch'
                        }}
                    >
                        {stats.map((stat, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                            >
                                <Paper
                                    elevation={3}
                                    className="portfolio-card"
                                    sx={{
                                        p: { xs: 2, sm: 3 },
                                        textAlign: 'center',
                                        height: '100%',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'center',
                                        minHeight: '120px'
                                    }}
                                >
                                    <Typography
                                        variant="h3"
                                        sx={{
                                            fontWeight: 700,
                                            color: '#1976d2',
                                            mb: 1,
                                            fontSize: { xs: '1.5rem', sm: '2rem', md: '2.5rem' }
                                        }}
                                    >
                                        {stat.number}
                                    </Typography>
                                    <Typography
                                        variant="body1"
                                        color="text.secondary"
                                        sx={{ fontSize: { xs: '0.8rem', sm: '0.9rem' } }}
                                    >
                                        {stat.label}
                                    </Typography>
                                </Paper>
                            </motion.div>
                        ))}
                    </Box>
                </Container>
            </Box>

            {/* Technologies Section */}
            <Box sx={{ py: 8 }}>
                <Container maxWidth="lg">
                    <Typography
                        variant="h3"
                        component="h2"
                        sx={{
                            textAlign: 'center',
                            fontWeight: 700,
                            mb: 2,
                            fontSize: { xs: '1.8rem', sm: '2.2rem', md: '2.5rem' }
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
                            mx: 'auto',
                            fontSize: { xs: '0.9rem', sm: '1rem' }
                        }}
                    >
                        {t('home.technologies.subtitle') || 'Technologies I work with daily'}
                    </Typography>

                    <Box sx={{ maxWidth: 900, mx: 'auto' }}>
                        {technologies.map((tech, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                whileHover={{ scale: 1.02 }}
                            >
                                <Box
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: 2,
                                        mb: 2,
                                        px: { xs: 1, sm: 2 },
                                        py: 1.5,
                                        borderRadius: 2,
                                        bgcolor: 'background.paper',
                                        boxShadow: 1,
                                    }}
                                >
                                    <Typography
                                        variant="subtitle1"
                                        sx={{
                                            minWidth: 100,
                                            fontWeight: 600,
                                            color: tech.color,
                                            fontSize: { xs: '0.95rem', sm: '1.05rem' },
                                            flex: { xs: '0 0 100px', sm: '0 0 120px' }
                                        }}
                                    >
                                        {tech.name}
                                    </Typography>
                                    <Box sx={{ flex: 1, mr: 2 }}>
                                        <LinearProgress
                                            variant="determinate"
                                            value={tech.progress}
                                            sx={{
                                                height: 8,
                                                borderRadius: 4,
                                                backgroundColor: `${tech.color}20`,
                                                '& .MuiLinearProgress-bar': {
                                                    backgroundColor: tech.color,
                                                }
                                            }}
                                        />
                                    </Box>
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                        sx={{ minWidth: 40, textAlign: 'right', fontWeight: 500 }}
                                    >
                                        {tech.progress}%
                                    </Typography>
                                </Box>
                            </motion.div>
                        ))}
                    </Box>
                </Container>
            </Box>

            {/* Services Section */}
            <Box className="portfolio-section" sx={{ py: 8, backgroundColor: 'rgba(0,0,0,0.02)' }}>
                <Container maxWidth="lg">
                    <Typography
                        variant="h3"
                        component="h2"
                        sx={{
                            textAlign: 'center',
                            fontWeight: 700,
                            mb: 2,
                            fontSize: { xs: '1.8rem', sm: '2.2rem', md: '2.5rem' }
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
                            mx: 'auto',
                            fontSize: { xs: '0.9rem', sm: '1rem' }
                        }}
                    >
                        {t('home.services.subtitle') || 'Services I provide to help your business grow'}
                    </Typography>

                    <Box
                        sx={{
                            display: 'grid',
                            gridTemplateColumns: {
                                xs: '1fr',
                                md: 'repeat(3, 1fr)'
                            },
                            gap: { xs: 3, sm: 4, md: 5 },
                            alignItems: 'stretch'
                        }}
                    >
                        {services.map((service, index) => {
                            const IconComponent = service.icon
                            return (
                                <motion.div
                                    key={index}
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
                                            p: { xs: 2, sm: 3 },
                                            minHeight: '200px'
                                        }}
                                    >
                                        <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                                            <Box
                                                sx={{
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    mb: 3
                                                }}
                                            >
                                                <Avatar
                                                    sx={{
                                                        width: { xs: 45, sm: 50 },
                                                        height: { xs: 45, sm: 50 },
                                                        backgroundColor: service.color,
                                                    }}
                                                >
                                                    <IconComponent sx={{ fontSize: { xs: '1.3rem', sm: '1.5rem' } }} />
                                                </Avatar>
                                            </Box>

                                            <Typography
                                                variant="h5"
                                                component="h3"
                                                sx={{
                                                    fontWeight: 600,
                                                    mb: 2,
                                                    textAlign: 'center',
                                                    fontSize: { xs: '1.1rem', sm: '1.25rem' }
                                                }}
                                            >
                                                {service.title}
                                            </Typography>

                                            <Typography
                                                variant="body1"
                                                color="text.secondary"
                                                sx={{
                                                    textAlign: 'center',
                                                    lineHeight: 1.6,
                                                    fontSize: { xs: '0.85rem', sm: '0.9rem' },
                                                    flex: 1
                                                }}
                                            >
                                                {service.description}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </motion.div>
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
                    background: `linear-gradient(135deg, #1976d2 0%, #dc004e 100%)`,
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
                                mb: 2,
                                fontSize: { xs: '1.8rem', sm: '2.2rem', md: '2.5rem' }
                            }}
                        >
                            {t('home.cta.title') || 'Ready to Start Your Project?'}
                        </Typography>

                        <Typography
                            variant="h6"
                            sx={{
                                mb: 4,
                                opacity: 0.9,
                                fontSize: { xs: '0.9rem', sm: '1rem' }
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
                                endIcon={<EmailIcon sx={{ fontSize: '1rem' }} />}
                                component={Link}
                                href="/contact"
                                sx={{
                                    background: 'rgba(255,255,255,0.2)',
                                    backdropFilter: 'blur(10px)',
                                    border: '1px solid rgba(255,255,255,0.3)',
                                    color: 'white',
                                    padding: '12px 24px',
                                    fontSize: '0.9rem',
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
                                endIcon={<DownloadIcon sx={{ fontSize: '1rem' }} />}
                                sx={{
                                    borderColor: 'rgba(255,255,255,0.5)',
                                    color: 'white',
                                    padding: '12px 24px',
                                    fontSize: '0.9rem',
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