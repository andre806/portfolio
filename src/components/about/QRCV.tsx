'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';

interface QRCVProps {
    cvUrl?: string;
    portfolioUrl?: string;
}

export const QRCV: React.FC<QRCVProps> = ({
    cvUrl = 'https://drive.google.com/file/d/1GpuVXGYWRIhAhg8hUqznmz3-6NxYN7Pw/view?usp=sharing',
    portfolioUrl = 'https://andre-portfolio.vercel.app'
}) => {
    const [activeQR, setActiveQR] = useState<'cv' | 'portfolio'>('cv');

    // Your actual QR Code for CV
    const cvQRCode = (
        <Image
            src="/Meu_QR_code_2-1024.jpeg"
            alt="QR Code for CV"
            width={220}
            height={220}
            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
            priority
        />
    );

    // Your actual QR Code for Portfolio
    const portfolioQRCode = (
        <Image
            src="/Meu_QR_code_2-1024.jpeg"
            alt="QR Code for Portfolio"
            width={220}
            height={220}
            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
            priority
        />
    );

    const handleDownloadCV = () => {
        // Open Google Drive CV link in new tab
        window.open(cvUrl, '_blank');
    };

    const handleOpenPortfolio = () => {
        window.open(portfolioUrl, '_blank');
    };

    return (
        <Box maxWidth="md" mx="auto">
            {/* Header */}
            <Box textAlign="center" mb={4}>
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                    <Typography variant="h4" fontWeight={700} mb={1} color="text.primary">
                        📱 Quick Access
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary">
                        Scan the QR Code to access my CV or portfolio
                    </Typography>
                </motion.div>
            </Box>

            {/* Toggle Buttons */}
            <Box display="flex" justifyContent="center" mb={4}>
                <ButtonGroup variant="contained" sx={{ borderRadius: 2, boxShadow: 2, bgcolor: 'grey.100' }}>
                    <Button
                        onClick={() => setActiveQR('cv')}
                        color={activeQR === 'cv' ? 'secondary' : 'inherit'}
                        sx={{ fontWeight: 600, px: 4, bgcolor: activeQR === 'cv' ? 'secondary.main' : 'grey.100', color: activeQR === 'cv' ? 'white' : 'text.secondary' }}
                    >
                        📄 CV (PDF)
                    </Button>
                    <Button
                        onClick={() => setActiveQR('portfolio')}
                        color={activeQR === 'portfolio' ? 'secondary' : 'inherit'}
                        sx={{ fontWeight: 600, px: 4, bgcolor: activeQR === 'portfolio' ? 'secondary.main' : 'grey.100', color: activeQR === 'portfolio' ? 'white' : 'text.secondary' }}
                    >
                        🌐 Online Portfolio
                    </Button>
                </ButtonGroup>
            </Box>

            {/* QR Code Card */}
            <Box component={motion.div} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 }}>
                <Paper elevation={4} sx={{ borderRadius: 4, p: 5, textAlign: 'center', mb: 4, position: 'relative', bgcolor: 'background.paper' }}>
                    {/* QR Code */}
                    <Box position="relative" mb={3}>
                        <Box
                            component={motion.div}
                            key={activeQR}
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.3 }}
                            sx={{ width: 220, height: 220, mx: 'auto', bgcolor: 'white', borderRadius: 3, p: 2, boxShadow: 2, border: '4px solid', borderColor: 'grey.100' }}
                        >
                            {activeQR === 'cv' ? cvQRCode : portfolioQRCode}
                        </Box>
                        {/* Canto decorativo */}
                        <Box sx={{ position: 'absolute', top: 8, right: 8, width: 32, height: 32, background: 'linear-gradient(135deg, #a855f7, #3b82f6)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <Typography color="white" fontSize={18}>{activeQR === 'cv' ? '📄' : '🌐'}</Typography>
                        </Box>
                    </Box>
                    {/* Informações */}
                    <Box mb={3}>
                        <Typography variant="h6" fontWeight={700} color="text.primary" mb={1}>
                            {activeQR === 'cv' ? 'Detailed CV' : 'Interactive Portfolio'}
                        </Typography>
                        <Typography color="text.secondary">
                            {activeQR === 'cv'
                                ? 'Open my complete CV with all professional information'
                                : 'Access my online portfolio with interactive projects and demonstrations'}
                        </Typography>
                    </Box>
                    {/* Botões de Ação */}
                    <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center" alignItems="center">
                        {activeQR === 'cv' ? (
                            <>
                                <Button onClick={handleDownloadCV} variant="contained" color="secondary" sx={{ fontWeight: 600, px: 4 }}>
                                    � Open CV
                                </Button>
                                <Button onClick={() => window.open(cvUrl, '_blank')} variant="contained" color="inherit" sx={{ fontWeight: 600, px: 4, bgcolor: 'grey.700', color: 'white', '&:hover': { bgcolor: 'grey.800' } }}>
                                    👁️ View Online
                                </Button>
                            </>
                        ) : (
                            <>
                                <Button onClick={handleOpenPortfolio} variant="contained" color="secondary" sx={{ fontWeight: 600, px: 4 }}>
                                    🚀 Open Portfolio
                                </Button>
                                <Button onClick={() => navigator.clipboard.writeText(portfolioUrl)} variant="contained" color="inherit" sx={{ fontWeight: 600, px: 4, bgcolor: 'grey.700', color: 'white', '&:hover': { bgcolor: 'grey.800' } }}>
                                    📋 Copy Link
                                </Button>
                            </>
                        )}
                    </Stack>
                    {/* URL Display */}
                    <Box mt={4} p={2} sx={{ bgcolor: 'grey.50', borderRadius: 2 }}>
                        <Typography variant="body2" color="text.secondary" fontFamily="monospace" sx={{ wordBreak: 'break-all' }}>
                            {activeQR === 'cv' ? cvUrl : portfolioUrl}
                        </Typography>
                    </Box>
                </Paper>
            </Box>

            {/* Instructions */}
            <Box component={motion.div} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} mt={6}>
                <Paper elevation={0} sx={{ p: 3, borderRadius: 3, bgcolor: 'linear-gradient(90deg, #e0e7ff 0%, #f3e8ff 100%)', border: '1px solid', borderColor: 'primary.light' }}>
                    <Typography variant="subtitle1" fontWeight={600} color="text.primary" mb={2} display="flex" alignItems="center" gap={1}>
                        📱 How to use QR Code
                    </Typography>
                    <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 2 }}>
                        <Stack direction="row" alignItems="flex-start" gap={1}>
                            <Typography color="primary" fontWeight={700}>1.</Typography>
                            <Typography color="text.secondary">Open your smartphone camera app</Typography>
                        </Stack>
                        <Stack direction="row" alignItems="flex-start" gap={1}>
                            <Typography color="primary" fontWeight={700}>2.</Typography>
                            <Typography color="text.secondary">Point the camera at the QR Code above</Typography>
                        </Stack>
                        <Stack direction="row" alignItems="flex-start" gap={1}>
                            <Typography color="primary" fontWeight={700}>3.</Typography>
                            <Typography color="text.secondary">Tap the notification that appears on screen</Typography>
                        </Stack>
                    </Box>
                </Paper>
            </Box>

            {/* Stats */}
            <Box component={motion.div} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} mt={6} textAlign="center">
                <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 3, justifyItems: 'center' }}>
                    <Box>
                        <Typography variant="h5" fontWeight={700} color="secondary">PDF</Typography>
                        <Typography variant="body2" color="text.secondary">Format</Typography>
                    </Box>
                    <Box>
                        <Typography variant="h5" fontWeight={700} color="info.main">2MB</Typography>
                        <Typography variant="body2" color="text.secondary">Size</Typography>
                    </Box>
                    <Box>
                        <Typography variant="h5" fontWeight={700} color="success.main">2024</Typography>
                        <Typography variant="body2" color="text.secondary">Updated</Typography>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};
