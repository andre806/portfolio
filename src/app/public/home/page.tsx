"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import Card from "@mui/material/Card";
import Paper from "@mui/material/Paper";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import TwitterIcon from "@mui/icons-material/Twitter";

const technologies = [
    { name: "React", icon: "⚛️", color: "#1976d2" },
    { name: "Next.js", icon: "▲", color: "#111" },
    { name: "TypeScript", icon: "📘", color: "#3178c6" },
    { name: "Node.js", icon: "🟢", color: "#43a047" },
    { name: "TailwindCSS", icon: "🎨", color: "#06b6d4" },
    { name: "MySQL", icon: "🛢️", color: "#00758F" },
    { name: "PostgreSQL", icon: "🐘", color: "#336791" },
    { name: "Docker", icon: "🐳", color: "#2496ed" },
];

import YouTubeIcon from '@mui/icons-material/YouTube';
import InstagramIcon from '@mui/icons-material/Instagram';
import TikTokIcon from '@mui/icons-material/MusicNote'; // TikTok icon alternative

const socialLinks = [
    {
        icon: <GitHubIcon fontSize="medium" />, url: "https://github.com/andre806", label: "GitHub",
    },
    {
        icon: <LinkedInIcon fontSize="medium" />, url: "https://www.linkedin.com/in/andr%C3%A9-code-9b7646373/", label: "LinkedIn",
    },
    {
        icon: <TwitterIcon fontSize="medium" />, url: "https://x.com/AndreCode71566", label: "Twitter",
    },
    {
        icon: <YouTubeIcon fontSize="medium" />, url: "https://www.youtube.com/@Andr%C3%A9code-w5z", label: "YouTube",
    },
    {
        icon: <InstagramIcon fontSize="medium" />, url: "https://www.instagram.com/andre_code1/", label: "Instagram",
    },
    {
        icon: <TikTokIcon fontSize="medium" />, url: "https://www.tiktok.com/@andre_code0", label: "TikTok",
    },
];

const HomePage = () => {
    return (
        <Box sx={{ minHeight: "100vh", bgcolor: "background.default", color: "text.primary", position: "relative" }}>
            {/* Hero Section */}
            <Box sx={{ pt: { xs: 8, md: 16 }, pb: { xs: 8, md: 16 }, position: "relative", overflow: "hidden" }}>
                {/* Background Gradient Circles */}
                <Box sx={{
                    position: "absolute",
                    inset: 0,
                    zIndex: 0,
                    pointerEvents: "none",
                }}>
                    <Box sx={{
                        position: "absolute",
                        top: -80,
                        left: -80,
                        width: 320,
                        height: 320,
                        bgcolor: "#e1bee7",
                        borderRadius: "50%",
                        filter: "blur(80px)",
                        opacity: 0.18,
                    }} />
                    <Box sx={{
                        position: "absolute",
                        top: -60,
                        right: -60,
                        width: 280,
                        height: 280,
                        bgcolor: "#fff59d",
                        borderRadius: "50%",
                        filter: "blur(80px)",
                        opacity: 0.15,
                    }} />
                    <Box sx={{
                        position: "absolute",
                        bottom: -60,
                        left: 120,
                        width: 280,
                        height: 280,
                        bgcolor: "#f8bbd0",
                        borderRadius: "50%",
                        filter: "blur(80px)",
                        opacity: 0.13,
                    }} />
                </Box>
                <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
                    <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center', gap: 6 }}>
                        <Box sx={{ flex: { xs: '1', md: '0 0 58%' } }}>
                            <Stack spacing={2}>
                                <Typography variant="subtitle1" sx={{ bgcolor: "#e3f2fd", color: "#1976d2", px: 2, py: 1, borderRadius: 5, fontWeight: 500, display: "inline-flex", alignItems: "center", width: "fit-content" }}>
                                    👋 Hi, I&apos;m André
                                </Typography>
                                <Typography variant="h2" sx={{ fontWeight: 700, lineHeight: 1.1 }}>
                                    Full Stack{' '}
                                    <Box component="span" sx={{
                                        background: "linear-gradient(90deg, #1976d2 0%, #7c3aed 60%, #1e293b 100%)",
                                        WebkitBackgroundClip: "text",
                                        WebkitTextFillColor: "transparent",
                                        backgroundClip: "text",
                                        textFillColor: "transparent",
                                    }}>
                                        Developer
                                    </Box>
                                </Typography>
                                <Typography variant="h5" sx={{ color: "text.secondary", maxWidth: 600 }}>
                                    I turn ideas into <Box component="span" sx={{ color: "#1976d2", fontWeight: 600 }}>amazing digital experiences</Box> using the latest web technologies.
                                </Typography>
                                <Typography variant="body1" sx={{ color: "text.secondary", maxWidth: 600 }}>
                                    Specialized in React, Next.js, TypeScript, and Node.js. Passionate about creating innovative solutions and delightful user interfaces.
                                </Typography>
                                <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ mt: 2 }}>
                                    <Button
                                        component={Link}
                                        href="/public/projects"
                                        variant="contained"
                                        size="large"
                                        sx={{
                                            background: "linear-gradient(90deg, #1976d2 0%, #7c3aed 100%)",
                                            color: "#fff",
                                            fontWeight: 600,
                                            px: 4,
                                            boxShadow: 3,
                                            '&:hover': {
                                                background: "linear-gradient(90deg, #1565c0 0%, #6d28d9 100%)",
                                                boxShadow: 6,
                                            },
                                        }}
                                        startIcon={<span>🚀</span>}
                                    >
                                        View My Projects
                                    </Button>
                                    <Button
                                        component={Link}
                                        href="/public/contact"
                                        variant="outlined"
                                        size="large"
                                        sx={{
                                            color: "#1976d2",
                                            borderColor: "#1976d2",
                                            fontWeight: 600,
                                            px: 4,
                                            background: "#fff",
                                            '&:hover': {
                                                background: "#e3f2fd",
                                                borderColor: "#7c3aed",
                                                color: "#7c3aed",
                                            },
                                        }}
                                        startIcon={<span>💬</span>}
                                    >
                                        Let&apos;s Talk
                                    </Button>
                                </Stack>
                                <Stack direction="row" alignItems="center" spacing={2} sx={{ mt: 3 }}>
                                    <Typography variant="body2" color="text.secondary" fontWeight={500}>
                                        Follow me:
                                    </Typography>
                                    <Stack direction="row" spacing={1}>
                                        {socialLinks.map((item) => (
                                            <IconButton
                                                key={item.label}
                                                component="a"
                                                href={item.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                aria-label={item.label}
                                                sx={{
                                                    color: "#1976d2",
                                                    bgcolor: "#f3f6fa",
                                                    borderRadius: 2,
                                                    transition: "all 0.2s",
                                                    boxShadow: 1,
                                                    '&:hover': {
                                                        color: "#9c27b0",
                                                        bgcolor: "#e3e9f7",
                                                        transform: "scale(1.12)",
                                                    },
                                                }}
                                            >
                                                {item.icon}
                                            </IconButton>
                                        ))}
                                    </Stack>
                                </Stack>
                            </Stack>
                        </Box>
                        <Box sx={{ flex: { xs: '1', md: '0 0 42%' }, display: 'flex', justifyContent: 'center' }}>
                            <Box sx={{ position: "relative", width: { xs: 240, md: 320 }, height: { xs: 240, md: 320 } }}>
                                <Box sx={{
                                    position: "absolute",
                                    inset: 0,
                                    borderRadius: "50%",
                                    background: "linear-gradient(135deg, #1976d2 0%, #7c3aed 100%)",
                                    filter: "blur(0.5rem)",
                                    zIndex: 1,
                                    animation: "pulse 2s infinite alternate",
                                }} />
                                <Box sx={{ position: "relative", width: 1, height: 1, p: 1, zIndex: 2 }}>
                                    <Paper elevation={8} sx={{ borderRadius: "50%", overflow: "hidden", width: 1, height: 1, bgcolor: "background.paper" }}>
                                        <Image
                                            src="/profile-photo.png"
                                            alt="André - Full Stack Developer"
                                            width={400}
                                            height={400}
                                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                                            priority
                                        />
                                    </Paper>
                                </Box>
                                <Box sx={{
                                    position: "absolute",
                                    top: -24,
                                    right: -24,
                                    width: 56,
                                    height: 56,
                                    bgcolor: "#fff59d",
                                    borderRadius: "50%",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    fontSize: 32,
                                    boxShadow: 3,
                                    zIndex: 3,
                                    animation: "bounce 2s infinite alternate",
                                }}>
                                    ⚡
                                </Box>
                                <Box sx={{
                                    position: "absolute",
                                    bottom: -24,
                                    left: -24,
                                    width: 56,
                                    height: 56,
                                    bgcolor: "#a5d6a7",
                                    borderRadius: "50%",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    fontSize: 32,
                                    boxShadow: 3,
                                    zIndex: 3,
                                    animation: "bounce 2s infinite alternate",
                                    animationDelay: "1s",
                                }}>
                                    🚀
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Container>
            </Box>

            {/* Technologies */}
            <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: "background.paper" }}>
                <Container maxWidth="lg">
                    <Box textAlign="center" mb={6}>
                        <Typography variant="h4" fontWeight={700} mb={1}>
                            Technologies I Master
                        </Typography>
                        <Typography variant="h6" color="text.secondary" maxWidth={600} mx="auto">
                            I work with the most modern tools in the market to create robust and scalable solutions
                        </Typography>
                    </Box>
                    <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: 3, justifyItems: 'center' }}>
                        {technologies.map((tech) => (
                            <Card
                                key={tech.name}
                                elevation={3}
                                sx={{
                                    p: 2,
                                    borderRadius: 3,
                                    textAlign: "center",
                                    transition: "transform 0.2s, box-shadow 0.2s",
                                    width: '100%',
                                    '&:hover': {
                                        transform: "translateY(-8px) scale(1.05)",
                                        boxShadow: 8,
                                    },
                                }}
                            >
                                <Box sx={{ fontSize: 36, mb: 1, color: tech.color, transition: "color 0.2s" }}>{tech.icon}</Box>
                                <Typography variant="subtitle1" fontWeight={600} sx={{ color: tech.color }}>{tech.name}</Typography>
                            </Card>
                        ))}
                    </Box>
                </Container>
            </Box>

            {/* Statistics */}
            <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: "background.default" }}>
                <Container maxWidth="lg">
                    <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 4, justifyItems: 'center' }}>
                        <Card sx={{ p: 4, borderRadius: 4, textAlign: "center", background: "linear-gradient(135deg, #e3f2fd 0%, #ede7f6 100%)", boxShadow: 3, width: '100%' }}>
                            <Typography variant="h3" fontWeight={700} color="#1976d2" mb={1}>5+</Typography>
                            <Typography variant="h6" fontWeight={600} mb={0.5}>Years of Experience</Typography>
                            <Typography variant="body2" color="text.secondary">Developing web solutions</Typography>
                        </Card>
                        <Card sx={{ p: 4, borderRadius: 4, textAlign: "center", background: "linear-gradient(135deg, #e8f5e9 0%, #e3f2fd 100%)", boxShadow: 3, width: '100%' }}>
                            <Typography variant="h3" fontWeight={700} color="#43a047" mb={1}>5+</Typography>
                            <Typography variant="h6" fontWeight={600} mb={0.5}>Projects Completed</Typography>
                            <Typography variant="body2" color="text.secondary">Websites and applications</Typography>
                        </Card>
                        <Card sx={{ p: 4, borderRadius: 4, textAlign: "center", background: "linear-gradient(135deg, #ede7f6 0%, #fce4ec 100%)", boxShadow: 3, width: '100%' }}>
                            <Typography variant="h3" fontWeight={700} color="#7c3aed" mb={1}>100%</Typography>
                            <Typography variant="h6" fontWeight={600} mb={0.5}>Satisfied Clients</Typography>
                            <Typography variant="body2" color="text.secondary">Guaranteed quality</Typography>
                        </Card>
                    </Box>
                </Container>
            </Box>

            {/* Final Call to Action */}
            <Box sx={{ py: { xs: 8, md: 12 }, background: "linear-gradient(90deg, #1976d2 0%, #7c3aed 100%)" }}>
                <Container maxWidth="md">
                    <Box textAlign="center">
                        <Typography variant="h4" fontWeight={700} color="#fff" mb={2}>
                            Ready to bring your next project to life?
                        </Typography>
                        <Typography variant="h6" color="#e3f2fd" mb={4}>
                            Let&apos;s work together to create something amazing. Get in touch and let&apos;s talk about your ideas!
                        </Typography>
                        <Stack direction={{ xs: "column", sm: "row" }} spacing={2} justifyContent="center">
                            <Button
                                component={Link}
                                href="/public/contact"
                                variant="contained"
                                size="large"
                                sx={{
                                    bgcolor: "#fff",
                                    color: "#1976d2",
                                    fontWeight: 600,
                                    px: 4,
                                    '&:hover': {
                                        bgcolor: "#e3f2fd",
                                        color: "#7c3aed",
                                    },
                                }}
                                startIcon={<span>📧</span>}
                            >
                                Contact Me
                            </Button>
                            <Button
                                component={Link}
                                href="/public/projects"
                                variant="outlined"
                                size="large"
                                sx={{
                                    color: "#fff",
                                    borderColor: "#fff",
                                    fontWeight: 600,
                                    px: 4,
                                    '&:hover': {
                                        bgcolor: "#fff",
                                        color: "#1976d2",
                                    },
                                }}
                                startIcon={<span>👀</span>}
                            >
                                View Portfolio
                            </Button>
                        </Stack>
                    </Box>
                </Container>
            </Box>

            {/* Keyframes for pulse and bounce */}
            <style jsx global>{`
        @keyframes pulse {
          0% { filter: blur(0.5rem); opacity: 1; }
          100% { filter: blur(1.2rem); opacity: 0.8; }
        }
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-16px); }
        }
      `}</style>
        </Box>
    );
};

export default HomePage;
