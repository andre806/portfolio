'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Skill } from '../../models/Timeline';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import LinearProgress from '@mui/material/LinearProgress';

interface SkillsProps {
    skills: Skill[];
    title?: string;
}

const categoryLabels = {
    frontend: 'Frontend',
    backend: 'Backend',
    mobile: 'Mobile',
    database: 'Database',
    devops: 'DevOps',
    design: 'Design',
    soft: 'Soft Skills'
};

const categoryIcons = {
    frontend: '🎨',
    backend: '⚙️',
    mobile: '📱',
    database: '🗄️',
    devops: '🚀',
    design: '✨',
    soft: '👥'
};

export const Skills: React.FC<SkillsProps> = ({ skills, title = "Habilidades Técnicas" }) => {
    const [selectedCategory, setSelectedCategory] = useState<string>('all');

    // Agrupar skills por categoria
    const skillsByCategory = skills.reduce((acc, skill) => {
        if (!acc[skill.category]) {
            acc[skill.category] = [];
        }
        acc[skill.category].push(skill);
        return acc;
    }, {} as Record<string, Skill[]>);

    // Filtrar skills
    const filteredSkills = selectedCategory === 'all'
        ? skills
        : skills.filter(skill => skill.category === selectedCategory);

    // Ordenar por nível (maior primeiro)
    const sortedSkills = [...filteredSkills].sort((a, b) => b.level - a.level);

    const getLevelLabel = (level: number) => {
        switch (level) {
            case 1: return 'Iniciante';
            case 2: return 'Básico';
            case 3: return 'Intermediário';
            case 4: return 'Avançado';
            case 5: return 'Expert';
            default: return 'N/A';
        }
    };

    const getLevelColor = (level: number) => {
        switch (level) {
            case 1: return '#ef4444'; // red
            case 2: return '#f59e42'; // orange
            case 3: return '#eab308'; // yellow
            case 4: return '#2563eb'; // blue
            case 5: return '#22c55e'; // green
            default: return '#64748b'; // gray
        }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5
            }
        }
    };

    const categories = Object.keys(skillsByCategory) as Array<keyof typeof categoryLabels>;

    return (
        <Box maxWidth="lg" mx="auto">
            {/* Header */}
            <Box textAlign="center" mb={6}>
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
                    <Typography variant="h4" fontWeight={700} mb={1}>{title}</Typography>
                </motion.div>
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
                    <Typography color="text.secondary" fontSize={18}>
                        Competências técnicas e interpessoais desenvolvidas ao longo da carreira
                    </Typography>
                </motion.div>
            </Box>

            {/* Filtros por Categoria */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
                <Box display="flex" flexWrap="wrap" justifyContent="center" gap={2} mb={4}>
                    <Button
                        onClick={() => setSelectedCategory('all')}
                        variant={selectedCategory === 'all' ? 'contained' : 'outlined'}
                        color="secondary"
                        sx={{ borderRadius: 2, textTransform: 'none', fontWeight: 600 }}
                        startIcon={<span>🎯</span>}
                    >
                        Todas
                    </Button>
                    {categories.map((category) => (
                        <Button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            variant={selectedCategory === category ? 'contained' : 'outlined'}
                            color="secondary"
                            sx={{ borderRadius: 2, textTransform: 'none', fontWeight: 600 }}
                            startIcon={<span>{categoryIcons[category]}</span>}
                        >
                            {categoryLabels[category]}
                        </Button>
                    ))}
                </Box>
            </motion.div>

            {/* Skills Grid */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <Box sx={{
                    display: 'grid',
                    gridTemplateColumns: {
                        xs: '1fr',
                        md: 'repeat(2, 1fr)',
                        lg: 'repeat(3, 1fr)'
                    },
                    gap: 3
                }}>
                    {sortedSkills.map((skill) => (
                        <motion.div key={skill.id} variants={itemVariants} whileHover={{ scale: 1.04 }}>
                            <Paper elevation={4} sx={{ borderRadius: 3, p: 3, height: '100%', transition: 'box-shadow 0.3s', display: 'flex', flexDirection: 'column', gap: 2 }}>
                                {/* Header */}
                                <Box display="flex" alignItems="center" gap={2} mb={1}>
                                    <Box sx={{ width: 48, height: 48, borderRadius: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28, bgcolor: 'grey.100' }}>
                                        {skill.icon}
                                    </Box>
                                    <Box flex={1}>
                                        <Typography variant="h6" fontWeight={700}>{skill.name}</Typography>
                                        <Typography variant="body2" color="text.secondary">{categoryLabels[skill.category]}</Typography>
                                    </Box>
                                </Box>
                                {/* Nível de Habilidade */}
                                <Box mb={1}>
                                    <Box display="flex" alignItems="center" justifyContent="space-between" mb={0.5}>
                                        <Typography variant="body2" color="text.secondary">Nível</Typography>
                                        <Typography variant="body2" fontWeight={700} color="secondary.main">{getLevelLabel(skill.level)}</Typography>
                                    </Box>
                                    <LinearProgress
                                        variant="determinate"
                                        value={skill.level * 20}
                                        sx={{
                                            height: 8,
                                            borderRadius: 4,
                                            backgroundColor: '#e5e7eb',
                                            '& .MuiLinearProgress-bar': {
                                                backgroundColor: getLevelColor(skill.level),
                                            }
                                        }}
                                    />
                                </Box>
                                {/* Experiência */}
                                <Box mb={1} display="flex" alignItems="center" justifyContent="space-between">
                                    <Typography variant="body2" color="text.secondary">Experiência:</Typography>
                                    <Typography variant="body2" fontWeight={600}>{skill.yearsOfExperience} ano{skill.yearsOfExperience !== 1 ? 's' : ''}</Typography>
                                </Box>
                                {/* Descrição */}
                                {skill.description && (
                                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                                        {skill.description}
                                    </Typography>
                                )}
                                {/* Badges */}
                                <Box display="flex" gap={1} mt={1}>
                                    <Box sx={{ px: 1.5, py: 0.5, borderRadius: 2, fontSize: 12, fontWeight: 600, bgcolor: getLevelColor(skill.level), color: 'white' }}>
                                        Level {skill.level}
                                    </Box>
                                    <Box sx={{ px: 1.5, py: 0.5, borderRadius: 2, fontSize: 12, fontWeight: 600, bgcolor: 'grey.100', color: 'text.primary' }}>
                                        {skill.yearsOfExperience}+ anos
                                    </Box>
                                </Box>
                            </Paper>
                        </motion.div>
                    ))}
                </Box>
            </motion.div>

            {/* Resumo por Categoria */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
                <Typography variant="h5" fontWeight={700} mb={3} textAlign="center">Resumo por Categoria</Typography>
                <Box sx={{
                    display: 'grid',
                    gridTemplateColumns: {
                        xs: 'repeat(2, 1fr)',
                        md: 'repeat(4, 1fr)'
                    },
                    gap: 2,
                    justifyContent: 'center'
                }}>
                    {categories.map((category) => {
                        const categorySkills = skillsByCategory[category];
                        const avgLevel = categorySkills.reduce((sum, skill) => sum + skill.level, 0) / categorySkills.length;
                        const totalYears = Math.max(...categorySkills.map(skill => skill.yearsOfExperience));
                        return (
                            <motion.div key={category} whileHover={{ scale: 1.05 }}>
                                <Paper elevation={2} sx={{ borderRadius: 2, p: 2, textAlign: 'center', bgcolor: 'background.paper', border: '1px solid', borderColor: 'secondary.light' }}>
                                    <Typography fontSize={28} mb={1}>{categoryIcons[category]}</Typography>
                                    <Typography fontWeight={600} color="text.primary" fontSize={14} mb={0.5}>{categoryLabels[category]}</Typography>
                                    <Typography fontSize={12} color="text.secondary">Média: {avgLevel.toFixed(1)}/5</Typography>
                                    <Typography fontSize={12} color="text.secondary">{categorySkills.length} skill{categorySkills.length !== 1 ? 's' : ''}</Typography>
                                    <Typography fontSize={12} color="text.secondary">{totalYears} anos</Typography>
                                </Paper>
                            </motion.div>
                        );
                    })}
                </Box>
            </motion.div>

            {/* Call to Action */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
                <Box mt={8} textAlign="center" sx={{ background: 'linear-gradient(90deg, #7c3aed 0%, #2563eb 100%)', borderRadius: 4, p: { xs: 3, md: 5 }, color: 'white' }}>
                    <Typography variant="h5" fontWeight={700} mb={2}>Sempre Aprendendo 📚</Typography>
                    <Typography color="#ede9fe" mb={4} maxWidth="sm" mx="auto">
                        A tecnologia evolui constantemente, e eu também. Sempre em busca de novas habilidades e aperfeiçoamento das existentes para entregar as melhores soluções.
                    </Typography>
                    <Box display="flex" flexWrap="wrap" justifyContent="center" gap={3}>
                        <Box sx={{ bgcolor: 'white', opacity: 0.15, borderRadius: 2, px: 3, py: 1.5, minWidth: 90 }}>
                            <Typography variant="h6" fontWeight={700}>{skills.length}</Typography>
                            <Typography fontSize={13} color="#ede9fe">Habilidades</Typography>
                        </Box>
                        <Box sx={{ bgcolor: 'white', opacity: 0.15, borderRadius: 2, px: 3, py: 1.5, minWidth: 90 }}>
                            <Typography variant="h6" fontWeight={700}>{Math.max(...skills.map(s => s.yearsOfExperience))}+</Typography>
                            <Typography fontSize={13} color="#ede9fe">Anos Experiência</Typography>
                        </Box>
                        <Box sx={{ bgcolor: 'white', opacity: 0.15, borderRadius: 2, px: 3, py: 1.5, minWidth: 90 }}>
                            <Typography variant="h6" fontWeight={700}>{skills.filter(s => s.level >= 4).length}</Typography>
                            <Typography fontSize={13} color="#ede9fe">Nível Avançado</Typography>
                        </Box>
                    </Box>
                </Box>
            </motion.div>
        </Box>
    );
};
