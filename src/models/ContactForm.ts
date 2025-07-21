export interface ContactForm {
    name: string;
    email: string;
    phone?: string;
    company?: string;
    subject: string;
    message: string;
    budget?: string;
    timeline?: string;
    projectType?: string;
    source?: string;
    newsletter?: boolean;
}

export interface ContactFormErrors {
    name?: string;
    email?: string;
    phone?: string;
    company?: string;
    subject?: string;
    message?: string;
    budget?: string;
    timeline?: string;
    projectType?: string;
    source?: string;
    newsletter?: string;
    general?: string;
}

export interface ContactFormSubmission extends ContactForm {
    id: string;
    timestamp: string;
    status: 'pending' | 'sent' | 'error';
    ipAddress?: string;
    userAgent?: string;
}

export const PROJECT_TYPES = [
    { id: 'website', label: 'Website/Landing Page', icon: '🌐' },
    { id: 'webapp', label: 'Web Aplication', icon: '💻' },
    { id: 'mobile', label: 'Mobile App', icon: '📱' },
    { id: 'ecommerce', label: 'E-commerce', icon: '🛒' },
    { id: 'api', label: 'API/Backend', icon: '🔗' },
    { id: 'consulting', label: 'consultancy', icon: '💡' },
    { id: 'maintenance', label: 'maintenance', icon: '🔧' },
    { id: 'other', label: 'Others', icon: '⚡' }
] as const;

export const BUDGET_RANGES = [
    { id: 'small', label: 'R$ 100 - 5.000', value: '100-5000' },
    { id: 'medium', label: 'R$ 5.000 - 15.000', value: '5000-15000' },
    { id: 'large', label: 'R$ 15.000 - 50.000', value: '15000-50000' },
    { id: 'enterprise', label: 'R$ 50.000+', value: '50000+' },
    { id: 'discuss', label: 'lets talk', value: 'discuss' }
] as const;

export const TIMELINE_OPTIONS = [
    { id: 'asap', label: 'as soon as possible', value: 'asap' },
    { id: '1month', label: '1 month', value: '1-month' },
    { id: '3months', label: '2-3 month', value: '3-months' },
    { id: '6months', label: '3-6 month', value: '6-months' },
    { id: 'flexible', label: 'Flexible', value: 'flexible' }
] as const;

export const CONTACT_SOURCES = [
    { id: 'google', label: 'Google/search', icon: '🔍' },
    { id: 'linkedin', label: 'LinkedIn', icon: '💼' },
    { id: 'github', label: 'GitHub', icon: '🐱' },
    { id: 'recommendation', label: 'Indication', icon: '👥' },
    { id: 'social', label: 'Social Media', icon: '📱' },
    { id: 'portfolio', label: 'Portfólio', icon: '🌟' },
    { id: 'other', label: 'Others', icon: '💫' }
] as const;
