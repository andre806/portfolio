'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { TimelineEvent, TIMELINE_TYPES } from '../../models/Timeline';
import AnimatedSection from '../common/AnimatedSection';
import AnimatedCard from '../common/AnimatedCard';
import { fadeInLeft, fadeInRight } from '@/utils/animations';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';

interface TimelineProps {
    events: TimelineEvent[];
    title?: string;
}

export const Timeline: React.FC<TimelineProps> = ({ events }) => {
    const [filter, setFilter] = useState<string>('all');
    const [showOnlyFeatured, setShowOnlyFeatured] = useState(false);

    // Filtrar eventos
    const filteredEvents = events.filter(event => {
        if (filter !== 'all' && event.type !== filter) {
            return false;
        }
        if (showOnlyFeatured && !event.featured) {
            return false;
        }
        return true;
    });

    // Ordenar por data (mais recente primeiro)
    const sortedEvents = [...filteredEvents].sort((a, b) =>
        new Date(b.date).getTime() - new Date(a.date).getTime()
    );

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('pt-BR', {
            year: 'numeric',
            month: 'long'
        });
    };

    const formatDateRange = (startDate: string, endDate?: string, ongoing?: boolean) => {
        const start = formatDate(startDate);
        if (ongoing) {
            return `${start} - Atual`;
        }
        if (endDate) {
            return `${start} - ${formatDate(endDate)}`;
        }
        return start;
    };

    return (
        <Box maxWidth="md" mx="auto">
            {/* Header 
            <AnimatedSection>
                <Box textAlign="center" mb={6}>
                    <Typography variant="h4" fontWeight={700} gutterBottom color="text.primary">
                        {title}
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary">
                        Uma linha do tempo da minha evolução profissional e pessoal
                    </Typography>
                </Box>
            </AnimatedSection>

            {/* Filters */}
            <AnimatedSection delay={0.2}>
                <Box display="flex" flexWrap="wrap" justifyContent="center" gap={2} mb={2}>
                    {TIMELINE_TYPES.map((type) => (
                        <Button
                            key={type.id}
                            onClick={() => setFilter(type.id)}
                            variant={filter === type.id ? 'contained' : 'outlined'}
                            color={filter === type.id ? 'secondary' : 'inherit'}
                            startIcon={type.icon}
                            sx={{ borderRadius: 2, fontWeight: 500, textTransform: 'none' }}
                        >
                            {type.label}
                        </Button>
                    ))}
                </Box>
                <Box display="flex" justifyContent="center">
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={showOnlyFeatured}
                                onChange={(e) => setShowOnlyFeatured(e.target.checked)}
                                color="secondary"
                            />
                        }
                        label={<Typography variant="body2">Mostrar apenas destaques</Typography>}
                    />
                </Box>
            </AnimatedSection>

            {/* Timeline */}
            <Box position="relative" mt={4}>
                {/* Linha vertical animada */}
                <motion.div
                    style={{ position: 'absolute', left: 32, top: 0, bottom: 0, width: 4, background: 'linear-gradient(to bottom, #a855f7, #3b82f6, #6366f1)', borderRadius: 2, zIndex: 1, transformOrigin: 'top' }}
                    initial={{ scaleY: 0 }}
                    animate={{ scaleY: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                />

                {/* Eventos */}
                <AnimatedSection stagger>
                    {sortedEvents.map((event, index) => (
                        <AnimatedCard
                            key={event.id}
                            delay={index * 0.1}
                            className="relative"
                            glowOnHover={event.featured}
                        >
                            {/* Ícone */}
                            <Box
                                sx={{
                                    position: 'absolute',
                                    left: 0,
                                    top: 0,
                                    width: 64,
                                    height: 64,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderRadius: '50%',
                                    background: event.bgColor || 'linear-gradient(135deg, #a855f7 30%, #6366f1 90%)',
                                    border: '4px solid',
                                    borderColor: 'background.paper',
                                    boxShadow: 3,
                                    zIndex: 2,
                                }}
                                component={motion.div}
                                variants={index % 2 === 0 ? fadeInLeft : fadeInRight}
                                whileHover={{ scale: 1.1, rotate: 5 }}
                                transition={{ type: 'spring', stiffness: 300 }}
                            >
                                <Box fontSize={32}>{event.icon}</Box>
                                {event.ongoing && (
                                    <Box sx={{ position: 'absolute', top: 2, right: 2, width: 16, height: 16, bgcolor: 'success.main', borderRadius: '50%', border: '2px solid', borderColor: 'background.paper', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <Box sx={{ width: 1, height: 1, bgcolor: 'success.light', borderRadius: '50%', animation: 'pulse 1.5s infinite' }} />
                                    </Box>
                                )}
                                {event.featured && (
                                    <Box sx={{ position: 'absolute', top: -8, right: -8, width: 24, height: 24, bgcolor: 'warning.main', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <Typography variant="caption" color="white">⭐</Typography>
                                    </Box>
                                )}
                            </Box>

                            {/* Conteúdo */}
                            <Box
                                component={motion.div}
                                whileHover={{ scale: 1.02 }}
                                sx={{
                                    ml: 10,
                                    bgcolor: 'background.paper',
                                    borderRadius: 3,
                                    boxShadow: 3,
                                    border: '1px solid',
                                    borderColor: 'divider',
                                    p: 3,
                                    transition: 'box-shadow 0.3s',
                                    position: 'relative',
                                }}
                            >
                                {/* Header */}
                                <Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} alignItems={{ sm: 'center' }} justifyContent={{ sm: 'space-between' }} mb={2}>
                                    <Box>
                                        <Typography variant="h6" fontWeight={700} color="text.primary" gutterBottom>
                                            {event.title}
                                        </Typography>
                                        <Typography variant="subtitle2" color="secondary" fontWeight={600}>
                                            {event.subtitle}
                                        </Typography>
                                    </Box>
                                    <Box mt={{ xs: 1, sm: 0 }} textAlign="right">
                                        <Typography variant="body2" color="text.secondary" fontWeight={500}>
                                            {formatDateRange(event.date, event.endDate, event.ongoing)}
                                        </Typography>
                                        {event.location && (
                                            <Typography variant="caption" color="text.disabled">
                                                📍 {event.location}
                                            </Typography>
                                        )}
                                    </Box>
                                </Box>

                                {/* Descrição */}
                                <Typography color="text.secondary" mb={2} sx={{ lineHeight: 1.7 }}>
                                    {event.description}
                                </Typography>

                                {/* Tecnologias */}
                                {event.technologies && event.technologies.length > 0 && (
                                    <Box mb={2}>
                                        <Typography variant="body2" fontWeight={600} color="text.secondary" mb={1}>
                                            🛠️ Tecnologias:
                                        </Typography>
                                        <Box display="flex" flexWrap="wrap" gap={1}>
                                            {event.technologies.map((tech) => (
                                                <Chip key={tech} label={tech} size="small" sx={{ bgcolor: 'grey.100', color: 'text.primary' }} />
                                            ))}
                                        </Box>
                                    </Box>
                                )}

                                {/* Conquistas */}
                                {event.achievements && event.achievements.length > 0 && (
                                    <Box mb={2}>
                                        <Typography variant="body2" fontWeight={600} color="text.secondary" mb={1}>
                                            🏆 Principais conquistas:
                                        </Typography>
                                        <Box component="ul" sx={{ pl: 2, m: 0 }}>
                                            {event.achievements.map((achievement, idx) => (
                                                <Box component="li" key={idx} display="flex" alignItems="flex-start" gap={1} color="success.main" fontSize={14}>
                                                    <span style={{ marginTop: 2 }}>✓</span>
                                                    <Typography variant="body2" color="text.secondary">{achievement}</Typography>
                                                </Box>
                                            ))}
                                        </Box>
                                    </Box>
                                )}

                                {/* Habilidades */}
                                {event.skills && event.skills.length > 0 && (
                                    <Box mb={2}>
                                        <Typography variant="body2" fontWeight={600} color="text.secondary" mb={1}>
                                            💪 Habilidades desenvolvidas:
                                        </Typography>
                                        <Box display="flex" flexWrap="wrap" gap={1}>
                                            {event.skills.map((skill) => (
                                                <Chip key={skill} label={skill} size="small" sx={{ bgcolor: 'secondary.light', color: 'secondary.dark' }} />
                                            ))}
                                        </Box>
                                    </Box>
                                )}

                                {/* Link */}
                                {event.link && (
                                    <Box pt={2} borderTop={1} borderColor="divider">
                                        <Button
                                            href={event.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            variant="text"
                                            color="secondary"
                                            startIcon={<span role="img" aria-label="link">🔗</span>}
                                            sx={{ fontWeight: 500, fontSize: 14 }}
                                        >
                                            Ver mais detalhes
                                        </Button>
                                    </Box>
                                )}
                            </Box>
                        </AnimatedCard>
                    ))}
                </AnimatedSection>

                {/* Fim da linha */}
                <motion.div
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 32, position: 'relative', zIndex: 2 }}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1, type: 'spring' }}
                >
                    <Box sx={{ width: 32, height: 32, background: 'linear-gradient(to right, #a855f7, #3b82f6)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Typography color="white" fontSize={18}>🚀</Typography>
                    </Box>
                </motion.div>
            </Box>

            {/* Stats */}
            <AnimatedSection delay={0.8} stagger>
                <Box mt={8} textAlign="center">
                    <Box sx={{
                        display: 'grid',
                        gridTemplateColumns: {
                            xs: 'repeat(2, 1fr)',
                            md: 'repeat(4, 1fr)'
                        },
                        gap: 3,
                        maxWidth: '600px',
                        mx: 'auto'
                    }}>
                        <Box sx={{ textAlign: 'center' }}>
                            <motion.div whileHover={{ scale: 1.05 }}>
                                <Typography variant="h5" fontWeight={700} color="secondary">
                                    {events.filter(e => e.type === 'work').length}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">Experiências</Typography>
                            </motion.div>
                        </Box>
                        <Box sx={{ textAlign: 'center' }}>
                            <motion.div whileHover={{ scale: 1.05 }}>
                                <Typography variant="h5" fontWeight={700} color="info.main">
                                    {events.filter(e => e.type === 'education').length}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">Formações</Typography>
                            </motion.div>
                        </Box>
                        <Box sx={{ textAlign: 'center' }}>
                            <motion.div whileHover={{ scale: 1.05 }}>
                                <Typography variant="h5" fontWeight={700} color="success.main">
                                    {events.filter(e => e.type === 'certification').length}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">Certificações</Typography>
                            </motion.div>
                        </Box>
                        <Box sx={{ textAlign: 'center' }}>
                            <motion.div whileHover={{ scale: 1.05 }}>
                                <Typography variant="h5" fontWeight={700} color="warning.main">
                                    {events.filter(e => e.type === 'achievement').length}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">Conquistas</Typography>
                            </motion.div>
                        </Box>
                    </Box>
                </Box>
            </AnimatedSection>
        </Box>
    );
};
