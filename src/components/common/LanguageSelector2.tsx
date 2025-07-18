'use client';

import React, { useState } from 'react';
import { useTranslation } from '../../contexts/TranslationContext';

interface LanguageOption {
    code: 'pt' | 'en';
    name: string;
    flag: string;
}

const languages: LanguageOption[] = [
    { code: 'pt', name: 'Português', flag: '🇧🇷' },
    { code: 'en', name: 'English', flag: '🇺🇸' }
];

const LanguageSelector: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { locale, setLocale, t } = useTranslation();

    const currentLanguage = languages.find(lang => lang.code === locale) || languages[0];

    const handleLanguageChange = (language: LanguageOption) => {
        setLocale(language.code);
        setIsOpen(false);
    };

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center space-x-2 px-3 py-2 rounded-lg bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                aria-label={t('language.toggle')}
                aria-expanded={isOpen}
                aria-haspopup="listbox"
            >
                <span className="text-lg">{currentLanguage.flag}</span>
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300 hidden sm:block">
                    {currentLanguage.code.toUpperCase()}
                </span>
                <svg
                    className={`w-4 h-4 text-gray-500 dark:text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {isOpen && (
                <>
                    {/* Backdrop */}
                    <div
                        className="fixed inset-0 z-10"
                        onClick={() => setIsOpen(false)}
                        aria-hidden="true"
                    />

                    {/* Dropdown */}
                    <div
                        className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-20"
                        role="listbox"
                        aria-label={t('language.toggle')}
                    >
                        {languages.map((language) => (
                            <button
                                key={language.code}
                                onClick={() => handleLanguageChange(language)}
                                className={`w-full flex items-center space-x-3 px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors first:rounded-t-lg last:rounded-b-lg ${language.code === locale
                                        ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                                        : 'text-gray-700 dark:text-gray-300'
                                    }`}
                                role="option"
                                aria-selected={language.code === locale}
                            >
                                <span className="text-lg">{language.flag}</span>
                                <div className="flex-1">
                                    <div className="text-sm font-medium">{language.name}</div>
                                    <div className="text-xs text-gray-500 dark:text-gray-400">
                                        {language.code.toUpperCase()}
                                    </div>
                                </div>
                                {language.code === locale && (
                                    <svg className="w-4 h-4 text-blue-600 dark:text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                )}
                            </button>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};

export default LanguageSelector;
