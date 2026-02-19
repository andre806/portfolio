'use client';

import React from 'react';
import ContactForm from '../../../components/contact/ContactForm';
import { Box, Container, Stack, Typography, Paper, Button } from '@mui/material';

const ContactPage = () => {
    return (
        <Box minHeight="100vh" sx={{ background: 'linear-gradient(135deg, #f8fafc 0%, #e0e7ff 100%)' }}>
            {/* Hero Section */}
            <Box sx={{ py: { xs: 8, md: 12 } }}>
                <Container maxWidth="md">
                    <Box textAlign="center" mb={6}>
                        <Typography variant="overline" sx={{ bgcolor: 'primary.light', color: 'primary.dark', px: 2, py: 0.5, borderRadius: 2, fontWeight: 700, mb: 2, display: 'inline-block' }}>💬 Let&apos;s talk</Typography>
                        <Typography variant="h2" fontWeight={700} mb={2}>
                            Get in <Box component="span" sx={{ background: 'linear-gradient(90deg, #2563eb 0%, #7c3aed 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Touch</Box>
                        </Typography>
                        <Typography variant="h6" color="text.secondary" maxWidth="sm" mx="auto" mb={4}>
                            Have a project in mind? Let&apos;s turn your ideas into reality. I&apos;ll reply within 24 hours!
                        </Typography>
                    </Box>
                    {/* Quick stats */}
                    <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 3, mb: 8, justifyItems: 'center' }}>
                        <Paper elevation={2} sx={{ p: 3, borderRadius: 3, bgcolor: 'white', boxShadow: 2, textAlign: 'center', width: '100%' }}>
                            <Typography fontSize={36} mb={1}>⚡</Typography>
                            <Typography variant="h5" fontWeight={700}>24h</Typography>
                            <Typography color="text.secondary" fontSize={14}>Response time</Typography>
                        </Paper>
                        <Paper elevation={2} sx={{ p: 3, borderRadius: 3, bgcolor: 'white', boxShadow: 2, textAlign: 'center', width: '100%' }}>
                            <Typography fontSize={36} mb={1}>🎯</Typography>
                            <Typography variant="h5" fontWeight={700}>100%</Typography>
                            <Typography color="text.secondary" fontSize={14}>Projects delivered</Typography>
                        </Paper>
                        <Paper elevation={2} sx={{ p: 3, borderRadius: 3, bgcolor: 'white', boxShadow: 2, textAlign: 'center', width: '100%' }}>
                            <Typography fontSize={36} mb={1}>🌟</Typography>
                            <Typography variant="h5" fontWeight={700}>5.0</Typography>
                            <Typography color="text.secondary" fontSize={14}>Average rating</Typography>
                        </Paper>
                    </Box>
                </Container>
            </Box>

            {/* Main form */}
            <Box sx={{ py: 6, mb: 8 }}>
                <Container maxWidth="md">
                    <ContactForm />
                </Container>
            </Box>
            {/* Alternative contact information */}
            <Box sx={{ py: 8 }}>
                <Container maxWidth="md">
                    <Box textAlign="center" mb={5}>
                        <Typography variant="h4" fontWeight={700} mb={1}>Other ways to contact</Typography>
                        <Typography color="text.secondary">Prefer another channel? I&apos;m available on several platforms</Typography>
                    </Box>
                    <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 3, justifyItems: 'center' }}>
                        <Paper elevation={2} sx={{ p: 3, borderRadius: 3, textAlign: 'center', transition: 'transform 0.2s', '&:hover': { boxShadow: 6, transform: 'scale(1.05)' }, width: '100%' }}>
                            <Typography fontSize={32} mb={1}>📧</Typography>
                            <Typography variant="h6" fontWeight={700} mb={1}>Email</Typography>
                            <Typography color="text.secondary" fontSize={14} mb={1}>acode775@gmail.com</Typography>
                            <Button href="mailto:acode775@gmail.com" variant="outlined" size="small">Send Email</Button>
                        </Paper>
                        <Paper elevation={2} sx={{ p: 3, borderRadius: 3, textAlign: 'center', transition: 'transform 0.2s', '&:hover': { boxShadow: 6, transform: 'scale(1.05)' }, width: '100%' }}>
                            <Typography fontSize={32} mb={1}>💬</Typography>
                            <Typography variant="h6" fontWeight={700} mb={1}>WhatsApp</Typography>
                            <Typography color="text.secondary" fontSize={14} mb={1}>(83) 991779519</Typography>
                            <Button href="https://wa.me/5583991779519" target="_blank" variant="outlined" size="small">Open WhatsApp</Button>
                        </Paper>
                        <Paper elevation={2} sx={{ p: 3, borderRadius: 3, textAlign: 'center', transition: 'transform 0.2s', '&:hover': { boxShadow: 6, transform: 'scale(1.05)' }, width: '100%' }}>
                            <Typography fontSize={32} mb={1}>💼</Typography>
                            <Typography variant="h6" fontWeight={700} mb={1}>LinkedIn</Typography>
                            <Typography color="text.secondary" fontSize={14} mb={1}>@Andre_code</Typography>
                            <Button href="https://www.linkedin.com/in/andr%C3%A9-code-9b7646373/" target="_blank" variant="outlined" size="small">View Profile</Button>
                        </Paper>
                        <Paper elevation={2} sx={{ p: 3, borderRadius: 3, textAlign: 'center', transition: 'transform 0.2s', '&:hover': { boxShadow: 6, transform: 'scale(1.05)' }, width: '100%' }}>
                            <Typography fontSize={32} mb={1}>⚡</Typography>
                            <Typography variant="h6" fontWeight={700} mb={1}>Nostr</Typography>
                            <Typography color="text.secondary" fontSize={14} mb={1}>@andre (Nostr)</Typography>
                            <Button href="https://nostr.band/npub1s6ucc8l3su6xfy5dnkpyjt4seghglv42gnhwm08juejetzcxdldqysavsr" target="_blank" variant="outlined" size="small">View Nostr Profile</Button>
                        </Paper>
                    </Box>
                </Container>
            </Box>


            {/* Quick FAQ */}
            <Box sx={{ py: 8, bgcolor: 'background.paper' }}>
                <Container maxWidth="md">
                    <Box textAlign="center" mb={5}>
                        <Typography variant="h4" fontWeight={700} mb={1}>Frequently Asked Questions</Typography>
                        <Typography color="text.secondary">Quick answers to the most common questions</Typography>
                    </Box>
                    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(2, 1fr)' }, gap: 4 }}>
                        <Stack spacing={3}>
                            <Paper elevation={1} sx={{ p: 3, borderRadius: 3 }}>
                                <Typography variant="h6" fontWeight={700} mb={1}>⏱️ What is the response time?</Typography>
                                <Typography color="text.secondary" fontSize={14}>I reply to all emails within 24 hours, usually much faster!</Typography>
                            </Paper>
                            <Paper elevation={1} sx={{ p: 3, borderRadius: 3 }}>
                                <Typography variant="h6" fontWeight={700} mb={1}>💰 How does the quote work?</Typography>
                                <Typography color="text.secondary" fontSize={14}>I provide a detailed and free quote based on your project scope.</Typography>
                            </Paper>
                        </Stack>
                        <Stack spacing={3}>
                            <Paper elevation={1} sx={{ p: 3, borderRadius: 3 }}>
                                <Typography variant="h6" fontWeight={700} mb={1}>🚀 Do you build MVPs/prototypes?</Typography>
                                <Typography color="text.secondary" fontSize={14}>Yes! I can create MVPs, prototypes, and proof of concepts to validate your ideas.</Typography>
                            </Paper>
                            <Paper elevation={1} sx={{ p: 3, borderRadius: 3 }}>
                                <Typography variant="h6" fontWeight={700} mb={1}>🔧 Do you offer support?</Typography>
                                <Typography color="text.secondary" fontSize={14}>All projects include post-delivery support and full documentation.</Typography>
                            </Paper>
                        </Stack>
                    </Box>
                </Container>
            </Box>

            {/* Final CTA */}
            <Box sx={{ py: 8 }}>
                <Container maxWidth="md">
                    <Box textAlign="center">
                        <Paper elevation={6} sx={{ p: { xs: 4, md: 6 }, borderRadius: 4, background: 'linear-gradient(90deg, #2563eb 0%, #7c3aed 100%)', color: 'white', maxWidth: 600, mx: 'auto' }}>
                            <Typography variant="h4" fontWeight={700} mb={2}>Ready to start your project?</Typography>
                            <Typography color="#c7d2fe" mb={4} maxWidth="sm" mx="auto">Don&apos;t leave your idea for later. Let&apos;s talk and turn your dreams into digital reality!</Typography>
                            <Button
                                onClick={() => document.getElementById('name')?.focus()}
                                variant="contained"
                                sx={{ bgcolor: 'common.white', color: 'primary.main', fontWeight: 600, px: 4, py: 2, '&:hover': { bgcolor: 'grey.100' } }}
                            >
                                Fill the Form ⬆️
                            </Button>
                        </Paper>
                    </Box>
                </Container>
            </Box>
        </Box>
    );
};

export default ContactPage;
