/**
 * Hook para gerenciamento do playground interativo
 */

import { useState, useEffect, useMemo, useCallback } from 'react';
import {
    CodeExample,
    PlaygroundFilters,
    PlaygroundState,
    PlaygroundStats,
    Language,
    Difficulty
} from '@/models/CodeExample';
import { codeExamples, codeTemplates, categories, popularTags } from '@/config/codeExamples';

export function usePlayground() {
    const [state, setState] = useState<PlaygroundState>({
        examples: codeExamples,
        activeExample: null,
        activeFileId: null,
        filters: {},
        isLoading: false,
        error: null,
        previewVisible: true,
        consoleOutput: []
    });

    // Exemplos filtrados
    const filteredExamples = useMemo(() => {
        let filtered = state.examples;

        // Filtrar por busca
        if (state.filters.search) {
            const search = state.filters.search.toLowerCase();
            filtered = filtered.filter(example =>
                example.title.toLowerCase().includes(search) ||
                example.description.toLowerCase().includes(search) ||
                example.tags.some(tag => tag.toLowerCase().includes(search))
            );
        }

        // Filtrar por categoria
        if (state.filters.category) {
            filtered = filtered.filter(example =>
                example.category === state.filters.category
            );
        }

        // Filtrar por dificuldade
        if (state.filters.difficulty) {
            filtered = filtered.filter(example =>
                example.difficulty === state.filters.difficulty
            );
        }

        // Filtrar por framework
        if (state.filters.framework) {
            filtered = filtered.filter(example =>
                example.framework === state.filters.framework
            );
        }

        // Filtrar por tags
        if (state.filters.tags && state.filters.tags.length > 0) {
            filtered = filtered.filter(example =>
                state.filters.tags!.some(tag => example.tags.includes(tag))
            );
        }

        // Filtrar por featured
        if (state.filters.featured) {
            filtered = filtered.filter(example => example.featured);
        }

        return filtered;
    }, [state.examples, state.filters]);

    // Estatísticas do playground
    const stats = useMemo((): PlaygroundStats => {
        const examples = state.examples;

        // Contadores por categoria
        const categoryCount = categories.map(category => ({
            name: category,
            count: examples.filter(ex => ex.category === category).length,
            color: getCategoryColor(category)
        })).filter(cat => cat.count > 0);

        // Distribuição por linguagem
        const languageMap = new Map<Language, number>();
        examples.forEach(example => {
            example.files.forEach(file => {
                languageMap.set(file.language, (languageMap.get(file.language) || 0) + 1);
            });
        });

        const totalLanguageCount = Array.from(languageMap.values()).reduce((sum, count) => sum + count, 0);
        const languageDistribution = Array.from(languageMap.entries()).map(([language, count]) => ({
            language,
            count,
            percentage: Math.round((count / totalLanguageCount) * 100)
        }));

        // Distribuição por dificuldade
        const difficultyMap = new Map<Difficulty, number>();
        examples.forEach(example => {
            difficultyMap.set(example.difficulty, (difficultyMap.get(example.difficulty) || 0) + 1);
        });

        const difficultyDistribution = Array.from(difficultyMap.entries()).map(([difficulty, count]) => ({
            difficulty,
            count,
            percentage: Math.round((count / examples.length) * 100)
        }));

        return {
            totalExamples: examples.length,
            totalViews: examples.reduce((sum, ex) => sum + ex.stats.views, 0),
            totalLikes: examples.reduce((sum, ex) => sum + ex.stats.likes, 0),
            popularCategories: categoryCount,
            languageDistribution,
            difficultyDistribution
        };
    }, [state.examples]);

    // Função para obter cor da categoria
    function getCategoryColor(category: string): string {
        const colors = {
            'React Components': '#61DAFB',
            'Full Applications': '#FF6B6B',
            'API Integration': '#4ECDC4',
            'CSS & Styling': '#45B7D1',
            'Forms & Validation': '#96CEB4',
            'Data Visualization': '#FECA57',
            'Animations': '#FF9FF3',
            'Utilities': '#54A0FF',
            'Games': '#5F27CD',
            'Tools': '#00D2D3'
        };
        return colors[category as keyof typeof colors] || '#6C5CE7';
    }

    // Função para definir filtros
    const setFilters = (newFilters: Partial<PlaygroundFilters>) => {
        setState(prev => ({
            ...prev,
            filters: { ...prev.filters, ...newFilters }
        }));
    };

    // Função para limpar filtros
    const clearFilters = () => {
        setState(prev => ({
            ...prev,
            filters: {}
        }));
    };

    // Função para selecionar exemplo
    const selectExample = useCallback((example: CodeExample) => {
        setState(prev => ({
            ...prev,
            activeExample: example,
            activeFileId: example.files[0]?.id || null,
            consoleOutput: []
        }));

        // Incrementar visualizações (simulado)
        updateExampleStats(example.id, { views: example.stats.views + 1 });
    }, []);

    // Função para selecionar arquivo
    const selectFile = (fileId: string) => {
        setState(prev => ({
            ...prev,
            activeFileId: fileId
        }));
    };

    // Função para atualizar código do arquivo
    const updateFileContent = (fileId: string, content: string) => {
        setState(prev => ({
            ...prev,
            activeExample: prev.activeExample ? {
                ...prev.activeExample,
                files: prev.activeExample.files.map(file =>
                    file.id === fileId ? { ...file, content } : file
                )
            } : null
        }));
    };

    // Função para adicionar arquivo
    const addFile = (name: string, language: Language, content = '') => {
        if (!state.activeExample) return;

        const newFile = {
            id: `file-${Date.now()}`,
            name,
            language,
            content
        };

        setState(prev => ({
            ...prev,
            activeExample: prev.activeExample ? {
                ...prev.activeExample,
                files: [...prev.activeExample.files, newFile]
            } : null
        }));
    };

    // Função para remover arquivo
    const removeFile = (fileId: string) => {
        if (!state.activeExample || state.activeExample.files.length <= 1) return;

        setState(prev => ({
            ...prev,
            activeExample: prev.activeExample ? {
                ...prev.activeExample,
                files: prev.activeExample.files.filter(file => file.id !== fileId)
            } : null,
            activeFileId: prev.activeFileId === fileId
                ? prev.activeExample?.files.find(f => f.id !== fileId)?.id || null
                : prev.activeFileId
        }));
    };

    // Função para alternar preview
    const togglePreview = () => {
        setState(prev => ({
            ...prev,
            previewVisible: !prev.previewVisible
        }));
    };

    // Função para executar código (simulado)
    const executeCode = () => {
        if (!state.activeExample) return;

        const logs = [
            `[${new Date().toLocaleTimeString()}] Executando código...`,
            `[${new Date().toLocaleTimeString()}] Código executado com sucesso!`
        ];

        setState(prev => ({
            ...prev,
            consoleOutput: [...prev.consoleOutput, ...logs]
        }));
    };

    // Função para limpar console
    const clearConsole = () => {
        setState(prev => ({
            ...prev,
            consoleOutput: []
        }));
    };

    // Função para curtir exemplo
    const likeExample = (exampleId: string) => {
        const example = state.examples.find(ex => ex.id === exampleId);
        if (example) {
            updateExampleStats(exampleId, { likes: example.stats.likes + 1 });
        }
    };

    // Função para fazer fork do exemplo
    const forkExample = (exampleId: string) => {
        const example = state.examples.find(ex => ex.id === exampleId);
        if (example) {
            const forkedExample = {
                ...example,
                id: `${example.id}-fork-${Date.now()}`,
                title: `${example.title} (Fork)`,
                stats: { views: 0, likes: 0, forks: 0 },
                createdAt: new Date().toISOString().split('T')[0],
                featured: false
            };

            setState(prev => ({
                ...prev,
                examples: [forkedExample, ...prev.examples],
                activeExample: forkedExample
            }));

            updateExampleStats(exampleId, { forks: example.stats.forks + 1 });
            return forkedExample;
        }
    };

    // Função para criar novo exemplo a partir de template
    const createFromTemplate = (templateId: string) => {
        const template = codeTemplates.find(t => t.id === templateId);
        if (!template) return;

        const newExample: CodeExample = {
            id: `custom-${Date.now()}`,
            title: `New ${template.name}`,
            description: 'Criado a partir de template',
            category: 'Custom',
            difficulty: 'beginner',
            framework: template.framework,
            tags: [],
            files: template.files.map((file, index) => ({
                id: `file-${index}`,
                ...file
            })),
            previewConfig: {
                showPreview: true,
                autoRun: false
            },
            author: {
                name: 'Você',
                avatar: '/profile-avatar.png'
            },
            stats: { views: 0, likes: 0, forks: 0 },
            createdAt: new Date().toISOString().split('T')[0],
            featured: false
        };

        setState(prev => ({
            ...prev,
            examples: [newExample, ...prev.examples],
            activeExample: newExample,
            activeFileId: newExample.files[0]?.id || null
        }));

        return newExample;
    };

    // Função para atualizar estatísticas (simulado)
    const updateExampleStats = (exampleId: string, newStats: Partial<{ views: number; likes: number; forks: number }>) => {
        setState(prev => ({
            ...prev,
            examples: prev.examples.map(example =>
                example.id === exampleId
                    ? { ...example, stats: { ...example.stats, ...newStats } }
                    : example
            ),
            activeExample: prev.activeExample?.id === exampleId
                ? { ...prev.activeExample, stats: { ...prev.activeExample.stats, ...newStats } }
                : prev.activeExample
        }));
    };

    // Função para gerar link compartilhável (simulado)
    const generateShareableLink = (exampleId: string) => {
        const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
        return `${baseUrl}/playground/share/${exampleId}`;
    };

    // Inicialização
    useEffect(() => {
        // Selecionar primeiro exemplo featured por padrão
        const featuredExample = codeExamples.find(ex => ex.featured);
        if (featuredExample && !state.activeExample) {
            selectExample(featuredExample);
        }
    }, [selectExample, state.activeExample]);

    return {
        // Estado
        examples: filteredExamples,
        activeExample: state.activeExample,
        activeFileId: state.activeFileId,
        filters: state.filters,
        isLoading: state.isLoading,
        error: state.error,
        previewVisible: state.previewVisible,
        consoleOutput: state.consoleOutput,
        stats,

        // Dados auxiliares
        categories,
        popularTags,
        templates: codeTemplates,

        // Ações
        setFilters,
        clearFilters,
        selectExample,
        selectFile,
        updateFileContent,
        addFile,
        removeFile,
        togglePreview,
        executeCode,
        clearConsole,
        likeExample,
        forkExample,
        createFromTemplate,
        generateShareableLink
    };
}
