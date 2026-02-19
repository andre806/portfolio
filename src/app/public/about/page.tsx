'use client';

import {
    personalInfo
} from '../../../config/timeline';
import {
    Box, Container, Stack, Typography, Avatar, Button
} from '@mui/material';
import Link from 'next/link';
import { QRCV } from '../../../components/about/QRCV';

export default function AboutPage() {
    return (
        <Box minHeight="100vh" sx={{ background: 'linear-gradient(135deg, #000 0%, #6d28d9 100%)' }}>
            {/* Hero Section */}
            <Box sx={{
                background: 'linear-gradient(135deg, #6d28d9 0%, #000 100%)',
                color: 'common.white',
                py: { xs: 8, md: 12 },
                position: 'relative',
                overflow: 'hidden',
            }}>
                <Container maxWidth="md" sx={{ position: 'relative', zIndex: 2 }}>
                    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center', justifyContent: 'center', gap: 6 }}>
                        {/* Photo and Basic Info */}
                        <Box sx={{ flex: { xs: '1', md: '0 0 40%' }, display: 'flex', flexDirection: 'column', alignItems: { xs: 'center', md: 'flex-start' } }}>
                            <Box sx={{ position: 'relative', width: 192, height: 192, mb: 3 }}>
                                <Avatar src={personalInfo.avatar} alt={personalInfo.name} sx={{ width: 192, height: 192, border: '4px solid white', boxShadow: 6, fontSize: 64 }} />
                                <Box sx={{ position: 'absolute', bottom: -10, right: -10, width: 48, height: 48, bgcolor: 'success.main', borderRadius: '50%', border: '4px solid white', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <Typography color="white" fontWeight={700} fontSize={20}>🚀</Typography>
                                </Box>
                            </Box>
                            <Typography variant="h3" fontWeight={700} mb={1} textAlign={{ xs: 'center', md: 'left' }}>{personalInfo.name}</Typography>
                            <Typography variant="h5" sx={{ color: 'rgba(255,255,255,0.85)' }} mb={2} textAlign={{ xs: 'center', md: 'left' }}>{personalInfo.title}</Typography>
                            <Stack direction="row" spacing={3} flexWrap="wrap" justifyContent={{ xs: 'center', md: 'flex-start' }} color="#c7d2fe" mb={2}>
                                <Stack direction="row" spacing={1} alignItems="center">
                                    <span>📍</span>
                                    <Typography variant="body2">{personalInfo.location}</Typography>
                                </Stack>
                            </Stack>
                        </Box>
                        {/* Statistics */}
                        <Box sx={{ flex: { xs: '1', md: '0 0 60%' }, width: '100%' }}>
                            <Typography variant="h6" sx={{ color: 'rgba(255,255,255,0.9)', mb: 3 }}>{personalInfo.bio}</Typography>
                            <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: 3 }}>
                                <Box sx={{ textAlign: 'center' }}>
                                    <Typography variant="h4" fontWeight={700} sx={{ color: '#fde68a' }}>{personalInfo.yearsOfExperience}+</Typography>
                                    <Typography sx={{ color: 'rgba(255,255,255,0.8)' }} variant="body2">Years of Experience</Typography>
                                </Box>
                                <Box sx={{ textAlign: 'center' }}>
                                    <Typography variant="h4" fontWeight={700} sx={{ color: '#6ee7b7' }}>{personalInfo.projectsCompleted}+</Typography>
                                    <Typography sx={{ color: 'rgba(255,255,255,0.8)' }} variant="body2">Projects Completed</Typography>
                                </Box>
                                <Box sx={{ textAlign: 'center' }}>
                                    <Typography variant="h4" fontWeight={700} sx={{ color: '#f9a8d4' }}>{personalInfo.technologiesLearned}+</Typography>
                                    <Typography sx={{ color: 'rgba(255,255,255,0.8)' }} variant="body2">Technologies</Typography>
                                </Box>{/*
                                <Box sx={{ textAlign: 'center' }}>
                                    <Typography variant="h4" fontWeight={700} sx={{ color: '#67e8f9' }}>{personalInfo.certifications}</Typography>
                                    <Typography sx={{ color: 'rgba(255,255,255,0.8)' }} variant="body2">Certifications</Typography>
                                </Box> */}
                            </Box>
                        </Box>
                    </Box>
                </Container>
            </Box>

            {/* Quick Stats 
            <Box sx={{ py: 8, bgcolor: 'rgba(109,40,217,0.15)', mt: -6, position: 'relative', zIndex: 2 }}>
                <Container maxWidth="md">
                    <Paper elevation={6} sx={{ borderRadius: 4, p: { xs: 3, md: 6 }, boxShadow: 6, border: '1px solid', borderColor: 'secondary.light', background: 'linear-gradient(90deg, #ede9fe 0%, #dbeafe 100%)' }}>
                        <Grid container spacing={4} justifyContent="center">
                            <Grid item md={4} xs={12} sx={{ textAlign: 'center' }}>
                                <Avatar sx={{ width: 64, height: 64, bgcolor: 'primary.main', mx: 'auto', mb: 2, fontSize: 32 }}>🎓</Avatar>
                                <Typography variant="h6" fontWeight={700} mb={1}>Academic Background</Typography>
                                <Typography color="text.secondary" fontSize={14}>Bachelor's in Computer Science from USP</Typography>
                            </Grid>
                            <Grid item md={4} xs={12} sx={{ textAlign: 'center' }}>
                                <Avatar sx={{ width: 64, height: 64, bgcolor: 'success.main', mx: 'auto', mb: 2, fontSize: 32 }}>💼</Avatar>
                                <Typography variant="h6" fontWeight={700} mb={1}>Professional Experience</Typography>
                                <Typography color="text.secondary" fontSize={14}>Senior Developer at tech companies</Typography>
                            </Grid>
                            <Grid item md={4} xs={12} sx={{ textAlign: 'center' }}>
                                <Avatar sx={{ width: 64, height: 64, bgcolor: 'secondary.main', mx: 'auto', mb: 2, fontSize: 32 }}>⚡</Avatar>
                                <Typography variant="h6" fontWeight={700} mb={1}>Specialization</Typography>
                                <Typography color="text.secondary" fontSize={14}>Full Stack Development & Systems Architecture</Typography>
                            </Grid>
                        </Grid>
                    </Paper>
                </Container>
            </Box>*/}

            {/* Skills 
            <Box sx={{ py: 10, bgcolor: 'rgba(109,40,217,0.10)' }}>
                <Container>
                    <Skills skills={skills} />
                </Container>
            </Box>
            */}

            {/* Timeline 
            <Box sx={{ py: 10, bgcolor: 'rgba(0,0,0,0.7)' }}>
                <Container>
                    <Timeline events={timelineEvents} />
                </Container>
            </Box>*/}

            {/* Featured Achievements 
            <Box sx={{ py: 10, bgcolor: 'rgba(109,40,217,0.10)' }}>
                <Container maxWidth="md">
                    <Typography variant="h4" fontWeight={700} textAlign="center" mb={2}>
                        🏆 Main Achievements
                    </Typography>
                    <Typography color="text.secondary" textAlign="center" mb={5}>
                        Important milestones in my professional journey
                    </Typography>
                    <Grid container spacing={4} justifyContent="center">
                        {achievements.map((achievement, index) => (
                            <Grid item md={6} xs={12} key={achievement.id}>
                                <Paper elevation={4} sx={{ borderRadius: 3, p: 3, height: '100%', display: 'flex', alignItems: 'flex-start', gap: 2 }}>
                                    <Avatar sx={{ width: 48, height: 48, fontSize: 28, background: 'linear-gradient(90deg, #a78bfa 0%, #60a5fa 100%)' }}>{achievement.icon}</Avatar>
                                    <Box flex={1} textAlign="left">
                                        <Typography variant="h6" fontWeight={700} mb={1}>{achievement.title}</Typography>
                                        <Typography color="text.secondary" fontSize={14} mb={1}>{achievement.description}</Typography>
                                        <Typography variant="caption" color="text.disabled">
                                            {new Date(achievement.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long' })}
                                        </Typography>
                                    </Box>
                                </Paper>
                            </Grid>
                        ))}
                    </Grid>
                </Container>
            </Box>*/}

            {/* QR Code Section */}
            <Box sx={{ py: 10, bgcolor: 'rgba(0,0,0,0.7)' }}>
                <Container>
                    <Typography variant="h4" fontWeight={700} mb={3} textAlign="center" sx={{ color: '#fff' }}>
                        Sobre minha comunicação
                    </Typography>
                    <Typography variant="body1" sx={{ maxWidth: 800, mx: 'auto', color: '#fff', fontSize: 18, lineHeight: 1.8 }}>
                        Em 2022 sofri um traumatismo craniano que afetou a área motora da fala, mas não minha inteligência, memória ou raciocínio lógico. Continuo resolvendo problemas complexos, estruturando sistemas e aprendendo novas tecnologias normalmente.<br /><br />
                        O dano foi neurológico, não psicológico. Minha mente organiza frases e ideias com clareza, mas o cérebro não consegue coordenar os músculos da fala. Os médicos classificaram como apraxia de fala adquirida com disartria leve.<br /><br />
                        <b>Resumindo para o universo tech:</b> O "código da fala" está perfeito, mas o "compilador" que transforma isso em som não executa corretamente.<br /><br />
                        Por isso, hoje uso comunicação escrita estruturada, ferramentas de texto em tempo real e documentação detalhada. Minha cognição, análise lógica e capacidade profissional seguem intactas.<br /><br />
                        Só mudei a interface de comunicação. A lógica continua sólida por baixo.
                    </Typography>
                </Container>
            </Box>

            {/* Call to Action */}
            <Box sx={{ py: 10, background: 'linear-gradient(90deg, #000 0%, #6d28d9 100%)', color: 'white', textAlign: 'center' }}>
                <Container maxWidth="md">
                    <Typography variant="h4" fontWeight={700} mb={2}>
                        Shall we work together? 🤝
                    </Typography>
                    <Typography variant="h6" sx={{ color: 'rgba(255,255,255,0.85)' }} mb={4} maxWidth="sm" mx="auto">
                        I&apos;m always looking for new challenges and interesting projects. Get in touch so we can talk about opportunities.
                    </Typography>
                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center" alignItems="center">

                        <Button
                            component={Link}
                            href="/public/projects"
                            variant="outlined"
                            sx={{ borderColor: 'common.white', color: 'common.white', fontWeight: 600, px: 4, py: 2, '&:hover': { bgcolor: 'common.white', color: 'secondary.main' } }}
                        >
                            🚀 View Projects
                        </Button>

                    </Stack>
                </Container>
            </Box>
        </Box>
    );
}
