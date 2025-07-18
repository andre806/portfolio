'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type Locale = 'pt' | 'en';

interface TranslationParams {
    [key: string]: string | number;
}

interface TranslationContextType {
    locale: Locale;
    setLocale: (locale: Locale) => void;
    t: (key: string, params?: TranslationParams) => string;
}

const TranslationContext = createContext<TranslationContextType | undefined>(undefined);

// Traduções simplificadas para começar
const translations = {
    pt: {
        'navigation.home': 'Início',
        'navigation.about': 'Sobre',
        'navigation.projects': 'Projetos',
        'navigation.blog': 'Blog',
        'navigation.playground': 'Playground',
        'navigation.jobs': 'Vagas',
        'navigation.contact': 'Contato',
        'navigation.dashboard': 'Dashboard',
        'language.toggle': 'Alterar idioma',
        'theme.toggle': 'Alternar tema'
    },
    en: {
        'navigation.home': 'Home',
        'navigation.about': 'About',
        'navigation.projects': 'Projects',
        'navigation.blog': 'Blog',
        'navigation.playground': 'Playground',
        'navigation.jobs': 'Jobs',
        'navigation.contact': 'Contact',
        'navigation.dashboard': 'Dashboard',
        'language.toggle': 'Change language',
        'theme.toggle': 'Toggle theme'
    }
};

export const TranslationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [locale, setLocaleState] = useState<Locale>('pt');

    useEffect(() => {
        // Carregar idioma do localStorage
        const savedLocale = localStorage.getItem('locale') as Locale;
        if (savedLocale && (savedLocale === 'pt' || savedLocale === 'en')) {
            setLocaleState(savedLocale);
        }
    }, []);

    const setLocale = (newLocale: Locale) => {
        setLocaleState(newLocale);
        localStorage.setItem('locale', newLocale);
    };

    const t = (key: string, params?: TranslationParams): string => {
        let translation = translations[locale][key as keyof typeof translations[typeof locale]] || key;

        // Substituir parâmetros se fornecidos
        if (params) {
            Object.entries(params).forEach(([paramKey, value]) => {
                translation = translation.replace(`{${paramKey}}`, String(value));
            });
        }

        return translation;
    };

    return (
        <TranslationContext.Provider value={{ locale, setLocale, t }}>
            {children}
        </TranslationContext.Provider>
    );
};

export const useTranslation = () => {
    const context = useContext(TranslationContext);
    if (context === undefined) {
        throw new Error('useTranslation must be used within a TranslationProvider');
    }
    return context;
};
