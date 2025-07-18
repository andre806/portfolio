'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { ThemeProvider as MuiThemeProviderBase, createTheme, CssBaseline } from '@mui/material';
import { ptBR, enUS } from '@mui/material/locale';

interface MuiThemeContextType {
    isDarkMode: boolean;
    toggleDarkMode: () => void;
    locale: 'pt' | 'en';
    setLocale: (locale: 'pt' | 'en') => void;
}

const MuiThemeContext = createContext<MuiThemeContextType | undefined>(undefined);

export const useMuiTheme = () => {
    const context = useContext(MuiThemeContext);
    if (!context) {
        throw new Error('useMuiTheme must be used within MuiThemeProvider');
    }
    return context;
};

interface MuiThemeProviderProps {
    children: React.ReactNode;
    initialLocale?: 'pt' | 'en';
}

export const MuiThemeProvider: React.FC<MuiThemeProviderProps> = ({
    children,
    initialLocale = 'pt'
}) => {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [locale, setLocale] = useState<'pt' | 'en'>(initialLocale);

    // Carrega preferência do localStorage
    useEffect(() => {
        const savedTheme = localStorage.getItem('mui-dark-mode');
        if (savedTheme) {
            setIsDarkMode(JSON.parse(savedTheme));
        }
    }, []);

    const toggleDarkMode = () => {
        const newMode = !isDarkMode;
        setIsDarkMode(newMode);
        localStorage.setItem('mui-dark-mode', JSON.stringify(newMode));
    };

    const theme = createTheme(
        {
            palette: {
                mode: isDarkMode ? 'dark' : 'light',
                primary: {
                    main: '#2563eb', // Blue 600
                    light: '#3b82f6', // Blue 500
                    dark: '#1d4ed8', // Blue 700
                    contrastText: '#ffffff',
                },
                secondary: {
                    main: '#7c3aed', // Violet 600
                    light: '#8b5cf6', // Violet 500
                    dark: '#6d28d9', // Violet 700
                    contrastText: '#ffffff',
                },
                background: {
                    default: isDarkMode ? '#0f172a' : '#f8fafc', // Slate 900 : Slate 50
                    paper: isDarkMode ? '#1e293b' : '#ffffff', // Slate 800 : White
                },
                text: {
                    primary: isDarkMode ? '#f1f5f9' : '#0f172a', // Slate 100 : Slate 900
                    secondary: isDarkMode ? '#94a3b8' : '#64748b', // Slate 400 : Slate 500
                },
                error: {
                    main: '#ef4444', // Red 500
                },
                warning: {
                    main: '#f59e0b', // Amber 500
                },
                info: {
                    main: '#06b6d4', // Cyan 500
                },
                success: {
                    main: '#10b981', // Emerald 500
                },
                divider: isDarkMode ? '#334155' : '#e2e8f0', // Slate 700 : Slate 200
            },
            typography: {
                fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
                h1: {
                    fontSize: '2.5rem',
                    fontWeight: 700,
                    lineHeight: 1.2,
                },
                h2: {
                    fontSize: '2rem',
                    fontWeight: 600,
                    lineHeight: 1.3,
                },
                h3: {
                    fontSize: '1.5rem',
                    fontWeight: 600,
                    lineHeight: 1.4,
                },
                h4: {
                    fontSize: '1.25rem',
                    fontWeight: 600,
                    lineHeight: 1.4,
                },
                h5: {
                    fontSize: '1.125rem',
                    fontWeight: 600,
                    lineHeight: 1.4,
                },
                h6: {
                    fontSize: '1rem',
                    fontWeight: 600,
                    lineHeight: 1.4,
                },
                body1: {
                    fontSize: '1rem',
                    lineHeight: 1.6,
                },
                body2: {
                    fontSize: '0.875rem',
                    lineHeight: 1.5,
                },
            },
            shape: {
                borderRadius: 12,
            },
            shadows: isDarkMode ? [
                'none',
                '0px 2px 1px -1px rgba(0,0,0,0.2),0px 1px 1px 0px rgba(0,0,0,0.14),0px 1px 3px 0px rgba(0,0,0,0.12)',
                '0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12)',
                '0px 3px 3px -2px rgba(0,0,0,0.2),0px 3px 4px 0px rgba(0,0,0,0.14),0px 1px 8px 0px rgba(0,0,0,0.12)',
                '0px 2px 4px -1px rgba(0,0,0,0.2),0px 4px 5px 0px rgba(0,0,0,0.14),0px 1px 10px 0px rgba(0,0,0,0.12)',
                '0px 3px 5px -1px rgba(0,0,0,0.2),0px 5px 8px 0px rgba(0,0,0,0.14),0px 1px 14px 0px rgba(0,0,0,0.12)',
                '0px 3px 5px -1px rgba(0,0,0,0.2),0px 6px 10px 0px rgba(0,0,0,0.14),0px 1px 18px 0px rgba(0,0,0,0.12)',
                '0px 4px 5px -2px rgba(0,0,0,0.2),0px 7px 10px 1px rgba(0,0,0,0.14),0px 2px 16px 1px rgba(0,0,0,0.12)',
                '0px 5px 5px -3px rgba(0,0,0,0.2),0px 8px 10px 1px rgba(0,0,0,0.14),0px 3px 14px 2px rgba(0,0,0,0.12)',
                '0px 5px 6px -3px rgba(0,0,0,0.2),0px 9px 12px 1px rgba(0,0,0,0.14),0px 3px 16px 2px rgba(0,0,0,0.12)',
                '0px 6px 6px -3px rgba(0,0,0,0.2),0px 10px 14px 1px rgba(0,0,0,0.14),0px 4px 18px 3px rgba(0,0,0,0.12)',
                '0px 6px 7px -4px rgba(0,0,0,0.2),0px 11px 15px 1px rgba(0,0,0,0.14),0px 4px 20px 3px rgba(0,0,0,0.12)',
                '0px 7px 8px -4px rgba(0,0,0,0.2),0px 12px 17px 2px rgba(0,0,0,0.14),0px 5px 22px 4px rgba(0,0,0,0.12)',
                '0px 7px 8px -4px rgba(0,0,0,0.2),0px 13px 19px 2px rgba(0,0,0,0.14),0px 5px 24px 4px rgba(0,0,0,0.12)',
                '0px 7px 9px -4px rgba(0,0,0,0.2),0px 14px 21px 2px rgba(0,0,0,0.14),0px 5px 26px 4px rgba(0,0,0,0.12)',
                '0px 8px 9px -5px rgba(0,0,0,0.2),0px 15px 22px 2px rgba(0,0,0,0.14),0px 6px 28px 5px rgba(0,0,0,0.12)',
                '0px 8px 10px -5px rgba(0,0,0,0.2),0px 16px 24px 2px rgba(0,0,0,0.14),0px 6px 30px 5px rgba(0,0,0,0.12)',
                '0px 8px 11px -5px rgba(0,0,0,0.2),0px 17px 26px 2px rgba(0,0,0,0.14),0px 6px 32px 5px rgba(0,0,0,0.12)',
                '0px 9px 11px -5px rgba(0,0,0,0.2),0px 18px 28px 2px rgba(0,0,0,0.14),0px 7px 34px 6px rgba(0,0,0,0.12)',
                '0px 9px 12px -6px rgba(0,0,0,0.2),0px 19px 29px 2px rgba(0,0,0,0.14),0px 7px 36px 6px rgba(0,0,0,0.12)',
                '0px 10px 13px -6px rgba(0,0,0,0.2),0px 20px 31px 3px rgba(0,0,0,0.14),0px 8px 38px 7px rgba(0,0,0,0.12)',
                '0px 10px 13px -6px rgba(0,0,0,0.2),0px 21px 33px 3px rgba(0,0,0,0.14),0px 8px 40px 7px rgba(0,0,0,0.12)',
                '0px 10px 14px -6px rgba(0,0,0,0.2),0px 22px 35px 3px rgba(0,0,0,0.14),0px 8px 42px 7px rgba(0,0,0,0.12)',
                '0px 11px 14px -7px rgba(0,0,0,0.2),0px 23px 36px 3px rgba(0,0,0,0.14),0px 9px 44px 8px rgba(0,0,0,0.12)',
                '0px 11px 15px -7px rgba(0,0,0,0.2),0px 24px 38px 3px rgba(0,0,0,0.14),0px 9px 46px 8px rgba(0,0,0,0.12)',
            ] : undefined,
            components: {
                MuiButton: {
                    styleOverrides: {
                        root: {
                            textTransform: 'none',
                            fontWeight: 600,
                            borderRadius: 8,
                            padding: '8px 16px',
                        },
                        contained: {
                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                            '&:hover': {
                                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                            },
                        },
                    },
                },
                MuiCard: {
                    styleOverrides: {
                        root: {
                            borderRadius: 16,
                            boxShadow: isDarkMode
                                ? '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2)'
                                : '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                        },
                    },
                },
                MuiChip: {
                    styleOverrides: {
                        root: {
                            borderRadius: 8,
                            fontWeight: 500,
                        },
                    },
                },
                MuiAppBar: {
                    styleOverrides: {
                        root: {
                            backgroundColor: isDarkMode ? 'rgba(15, 23, 42, 0.8)' : 'rgba(255, 255, 255, 0.8)',
                            backdropFilter: 'blur(10px)',
                            borderBottom: `1px solid ${isDarkMode ? '#334155' : '#e2e8f0'}`,
                            boxShadow: 'none',
                        },
                    },
                },
            },
        },
        locale === 'pt' ? ptBR : enUS
    );

    return (
        <MuiThemeContext.Provider value={{ isDarkMode, toggleDarkMode, locale, setLocale }}>
            <MuiThemeProviderBase theme={theme}>
                <CssBaseline />
                {children}
            </MuiThemeProviderBase>
        </MuiThemeContext.Provider>
    );
};
