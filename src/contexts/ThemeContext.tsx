'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'

type Theme = 'light' | 'dark'

interface ThemeContextType {
    theme: Theme
    setTheme: (theme: Theme) => void
    toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
    const [theme, setTheme] = useState<Theme>('light')
    const [mounted, setMounted] = useState(false)

    // Carrega o tema salvo no localStorage ao montar o componente
    useEffect(() => {
        const savedTheme = localStorage.getItem('theme') as Theme
        const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'

        setTheme(savedTheme || systemTheme)
        setMounted(true)
    }, [])

    // Aplica o tema no documento e salva no localStorage
    useEffect(() => {
        if (!mounted) return

        const root = window.document.documentElement
        root.classList.remove('light', 'dark')
        root.classList.add(theme)

        localStorage.setItem('theme', theme)
    }, [theme, mounted])

    // Função para alternar entre temas
    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light')
    }

    // Previne hidration mismatch
    if (!mounted) {
        return <>{children}</>
    }

    return (
        <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}

// Hook customizado para usar o contexto de tema
export function useTheme() {
    const context = useContext(ThemeContext)
    if (context === undefined) {
        throw new Error('useTheme deve ser usado dentro de um ThemeProvider')
    }
    return context
}

export { ThemeContext }