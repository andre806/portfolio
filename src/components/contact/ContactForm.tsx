'use client';

import React, { ChangeEvent } from 'react';
import { motion } from 'framer-motion';
import { useForm, validateContactForm } from '../../hooks/useForm';
import { ContactForm as ContactFormType, PROJECT_TYPES, BUDGET_RANGES, TIMELINE_OPTIONS, CONTACT_SOURCES } from '../../models/ContactForm';
import { sendContactEmail } from '../../services/emailService';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';

interface ContactFormProps {
    onSuccess?: () => void;
    className?: string;
}

const ContactForm: React.FC<ContactFormProps> = ({ onSuccess, className = '' }) => {


    const initialValues: Partial<ContactFormType> = {
        name: '',
        email: '',
        phone: '',
        company: '',
        subject: '',
        message: '',
        budget: '',
        timeline: '',
        projectType: '',
        source: '',
        newsletter: false
    };

    const {
        values,
        errors,
        isSubmitting,
        isSubmitted,
        submitError,
        handleChange,
        handleSubmit,
        reset
    } = useForm({
        initialValues,
        validate: validateContactForm,
        onSubmit: async (formData) => {
            try {
                await sendContactEmail(formData);
                onSuccess?.();
            } catch (error) {
                throw new Error(
                    error instanceof Error
                        ? error.message
                        : 'Failed to send message. Please try again.'
                );
            }
        }
    });

    const handleReset = () => {
        reset();
    };

    // Handle change for MUI Select components
    const handleSelectChange = (event: { target: { name: string; value: string } }) => {
        const { name, value } = event.target;
        // Create a synthetic event that matches the expected signature
        const syntheticEvent = {
            target: {
                name,
                value,
                type: 'select' as const
            }
        } as unknown as ChangeEvent<HTMLSelectElement>;
        handleChange(syntheticEvent);
    };

    if (isSubmitted) {
        return (
            <Card sx={{ bgcolor: 'success.lighter', border: 1, borderColor: 'success.light', borderRadius: 3, p: 4, textAlign: 'center', boxShadow: 3, maxWidth: 500, mx: 'auto' }} className={className}>
                <CardContent>
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", duration: 0.6 }}
                        style={{ color: '#22c55e', fontSize: 48, marginBottom: 16 }}
                    >
                        ✓
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        <Typography variant="h5" fontWeight={600} color="success.dark" gutterBottom>
                            Message Sent Successfully!
                        </Typography>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <Typography color="success.main" sx={{ mb: 3 }}>
                            Thank you for your contact! I will get back to you soon.
                        </Typography>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Button variant="contained" color="success" onClick={handleReset} sx={{ px: 4, py: 1.5, borderRadius: 2 }}>
                            Send Another Message
                        </Button>
                    </motion.div>
                </CardContent>
            </Card>
        );
    }

    return (
        <Card sx={{ bgcolor: 'background.paper', borderRadius: 3, boxShadow: 3, border: 1, borderColor: 'divider', maxWidth: 700, mx: 'auto' }} className={className}>
            <CardContent>
                <Box component="form" onSubmit={handleSubmit} sx={{ p: { xs: 0, sm: 2 }, display: 'flex', flexDirection: 'column', gap: 3 }}>
                    {/* Header */}
                    <Box sx={{ textAlign: 'center', mb: 2 }}>
                        <Typography variant="h5" fontWeight={700} color="text.primary" gutterBottom>
                            Let&apos;s talk?
                        </Typography>
                        <Typography color="text.secondary">
                            Tell me about your project. I will reply within 24 hours!
                        </Typography>
                    </Box>
                    {/* General error */}
                    {submitError && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                        >
                            <Box sx={{ bgcolor: 'error.lighter', border: 1, borderColor: 'error.light', borderRadius: 2, p: 2, mb: 1 }}>
                                <Typography color="error.main" variant="body2">{submitError}</Typography>
                            </Box>
                        </motion.div>
                    )}
                    {/* Personal information */}
                    <Box sx={{
                        display: 'grid',
                        gridTemplateColumns: {
                            xs: '1fr',
                            md: 'repeat(2, 1fr)'
                        },
                        gap: 2
                    }}>
                        <TextField
                            label="Full name *"
                            id="name"
                            name="name"
                            value={values.name || ''}
                            onChange={handleChange}
                            fullWidth
                            disabled={isSubmitting}
                            error={!!errors.name}
                            helperText={errors.name}
                            placeholder="Your full name"
                            autoComplete="name"
                        />
                        <TextField
                            label="Email *"
                            id="email"
                            name="email"
                            value={values.email || ''}
                            onChange={handleChange}
                            fullWidth
                            disabled={isSubmitting}
                            error={!!errors.email}
                            helperText={errors.email}
                            placeholder="your@email.com"
                            autoComplete="email"
                            type="email"
                        />
                    </Box>

                    <Box sx={{
                        display: 'grid',
                        gridTemplateColumns: {
                            xs: '1fr',
                            md: 'repeat(2, 1fr)'
                        },
                        gap: 2
                    }}>
                        <TextField
                            label="Phone"
                            id="phone"
                            name="phone"
                            value={values.phone || ''}
                            onChange={handleChange}
                            fullWidth
                            disabled={isSubmitting}
                            error={!!errors.phone}
                            helperText={errors.phone}
                            placeholder="(11) 99999-9999"
                            type="tel"
                            autoComplete="tel"
                        />
                        <TextField
                            label="Company"
                            id="company"
                            name="company"
                            value={values.company || ''}
                            onChange={handleChange}
                            fullWidth
                            disabled={isSubmitting}
                            placeholder="Your company name"
                            autoComplete="organization"
                        />
                    </Box>

                    <FormControl fullWidth sx={{ mt: 1 }}>
                        <FormLabel id="projectType-label">Project type</FormLabel>
                        <Select
                            labelId="projectType-label"
                            id="projectType"
                            name="projectType"
                            value={values.projectType || ''}
                            onChange={handleSelectChange}
                            disabled={isSubmitting}
                            displayEmpty
                        >
                            <MenuItem value=""><em>Select project type</em></MenuItem>
                            {PROJECT_TYPES.map(type => (
                                <MenuItem key={type.id} value={type.id}>
                                    {type.icon} {type.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <Box sx={{
                        display: 'grid',
                        gridTemplateColumns: {
                            xs: '1fr',
                            md: 'repeat(2, 1fr)'
                        },
                        gap: 2,
                        mt: 1
                    }}>
                        <FormControl fullWidth>
                            <FormLabel id="budget-label">Estimated budget</FormLabel>
                            <Select
                                labelId="budget-label"
                                id="budget"
                                name="budget"
                                value={values.budget || ''}
                                onChange={handleSelectChange}
                                disabled={isSubmitting}
                                displayEmpty
                            >
                                <MenuItem value=""><em>Select a range</em></MenuItem>
                                {BUDGET_RANGES.map(range => (
                                    <MenuItem key={range.id} value={range.value}>{range.label}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        <FormControl fullWidth>
                            <FormLabel id="timeline-label">Desired timeline</FormLabel>
                            <Select
                                labelId="timeline-label"
                                id="timeline"
                                name="timeline"
                                value={values.timeline || ''}
                                onChange={handleSelectChange}
                                disabled={isSubmitting}
                                displayEmpty
                            >
                                <MenuItem value=""><em>Select a timeline</em></MenuItem>
                                {TIMELINE_OPTIONS.map(option => (
                                    <MenuItem key={option.id} value={option.value}>{option.label}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Box>

                    <TextField
                        label="Subject *"
                        id="subject"
                        name="subject"
                        value={values.subject || ''}
                        onChange={handleChange}
                        fullWidth
                        disabled={isSubmitting}
                        error={!!errors.subject}
                        helperText={errors.subject}
                        placeholder="Subject of your message"
                        sx={{ mt: 1 }}
                    />

                    <TextField
                        label="Message *"
                        id="message"
                        name="message"
                        value={values.message || ''}
                        onChange={handleChange}
                        fullWidth
                        disabled={isSubmitting}
                        error={!!errors.message}
                        helperText={errors.message}
                        placeholder="Tell me about your project, your needs and goals..."
                        multiline
                        minRows={6}
                        sx={{ mt: 1 }}
                        inputProps={{ maxLength: 1000 }}
                    />
                    <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5, display: 'block' }}>
                        {values.message?.length || 0}/1000 characters
                    </Typography>

                    <FormControl fullWidth sx={{ mt: 1 }}>
                        <FormLabel id="source-label">How did you find me?</FormLabel>
                        <Select
                            labelId="source-label"
                            id="source"
                            name="source"
                            value={values.source || ''}
                            onChange={handleSelectChange}
                            disabled={isSubmitting}
                            displayEmpty
                        >
                            <MenuItem value=""><em>Select an option</em></MenuItem>
                            {CONTACT_SOURCES.map(source => (
                                <MenuItem key={source.id} value={source.id}>
                                    {source.icon} {source.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                        <Checkbox
                            id="newsletter"
                            name="newsletter"
                            checked={values.newsletter || false}
                            onChange={handleChange}
                            disabled={isSubmitting}
                            color="primary"
                        />
                        <FormLabel htmlFor="newsletter" sx={{ fontSize: 14, color: 'text.secondary' }}>
                            I want to receive updates about projects and technical articles (max 1 email per month)
                        </FormLabel>
                    </Box>

                    <Box sx={{
                        display: 'grid',
                        gridTemplateColumns: {
                            xs: '1fr',
                            sm: 'repeat(2, 1fr)'
                        },
                        gap: 2,
                        pt: 2
                    }}>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            disabled={isSubmitting || Object.keys(errors).length > 0}
                            sx={{ py: 1.5, fontWeight: 600, borderRadius: 2, boxShadow: 1, textTransform: 'none' }}
                            startIcon={isSubmitting ? <span className="MuiCircularProgress-root MuiCircularProgress-indeterminate" style={{ width: 20, height: 20, borderWidth: 2, borderStyle: 'solid', borderColor: 'white transparent transparent transparent', borderRadius: '50%', display: 'inline-block', animation: 'spin 1s linear infinite' }} /> : null}
                        >
                            {isSubmitting ? 'Sending...' : 'Send Message 📧'}
                        </Button>
                        <Button
                            type="button"
                            variant="outlined"
                            color="secondary"
                            fullWidth
                            onClick={handleReset}
                            disabled={isSubmitting}
                            sx={{ py: 1.5, borderRadius: 2, textTransform: 'none' }}
                        >
                            Clear
                        </Button>
                    </Box>

                    <Divider sx={{ mt: 4, mb: 1 }} />
                    <Box sx={{ textAlign: 'center', pt: 1 }}>
                        <Typography variant="body2" color="text.secondary">
                            I reply to all emails within 24 hours • Your data is protected
                        </Typography>
                    </Box>
                </Box>
            </CardContent>
        </Card>
    );
};

export default ContactForm;
