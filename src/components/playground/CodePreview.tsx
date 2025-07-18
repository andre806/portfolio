/**
 * Componente de preview para o playground
 */

'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { CodeExample } from '@/models/CodeExample';

interface CodePreviewProps {
    example: CodeExample;
    isVisible: boolean;
}

function CodePreview({ example, isVisible }: CodePreviewProps) {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const iframeRef = useRef<HTMLIFrameElement>(null);

    // Gerar HTML para preview
    const generatePreviewHTML = useCallback((): string => {
        const files = example.files;

        // Buscar arquivos específicos
        const htmlFile = files.find(f => f.name.endsWith('.html') || f.language === 'html');
        const cssFiles = files.filter(f => f.name.endsWith('.css') || f.language === 'css');
        const jsFiles = files.filter(f =>
            f.name.endsWith('.js') || f.name.endsWith('.jsx') ||
            f.language === 'javascript' || f.language === 'react'
        );

        // Para React, usar um template especial
        if (example.framework === 'react') {
            const mainFile = files.find(f => f.name === 'App.jsx' || f.name === 'App.tsx') || files[0];

            return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>React Preview</title>
    <script src="https://unpkg.com/react@18/umd/react.development.js"></script>
    <script src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        body { margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
        .error-boundary { color: red; padding: 20px; background: #fee; border: 1px solid #fcc; border-radius: 4px; margin: 10px; }
    </style>
</head>
<body>
    <div id="root"></div>
    <script type="text/babel">
        const { useState, useEffect, useMemo, useCallback, useRef, useContext, useReducer } = React;
        
        try {
            ${mainFile?.content || '// Código não encontrado'}
            
            const container = document.getElementById('root');
            const root = ReactDOM.createRoot(container);
            root.render(React.createElement(App));
        } catch (error) {
            console.error('Erro na execução:', error);
            document.getElementById('root').innerHTML = 
                '<div class="error-boundary"><h3>Erro na execução:</h3><pre>' + error.message + '</pre></div>';
        }
    </script>
</body>
</html>`;
        }

        // Para HTML/CSS/JS vanilla
        if (htmlFile) {
            let html = htmlFile.content;

            // Inserir CSS inline
            if (cssFiles.length > 0) {
                const styles = cssFiles.map(f => f.content).join('\n');
                if (html.includes('</head>')) {
                    html = html.replace('</head>', `<style>${styles}</style>\n</head>`);
                } else {
                    html = `<style>${styles}</style>\n${html}`;
                }
            }

            // Inserir JavaScript
            if (jsFiles.length > 0) {
                const scripts = jsFiles.map(f => f.content).join('\n');
                if (html.includes('</body>')) {
                    html = html.replace('</body>', `<script>${scripts}</script>\n</body>`);
                } else {
                    html = `${html}\n<script>${scripts}</script>`;
                }
            }

            return html;
        }

        // Fallback para apenas CSS
        if (cssFiles.length > 0) {
            const styles = cssFiles.map(f => f.content).join('\n');
            return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CSS Preview</title>
    <style>${styles}</style>
</head>
<body>
    <div style="padding: 20px; text-align: center;">
        <h2>Preview de CSS</h2>
        <p>Este exemplo contém apenas código CSS. As classes podem ser vistas no código.</p>
    </div>
</body>
</html>`;
        }

        return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Preview</title>
</head>
<body>
    <div style="padding: 20px; text-align: center; color: #666;">
        <h2>Preview indisponível</h2>
        <p>Este tipo de código não suporta preview visual.</p>
    </div>
</body>
</html>`;
    }, [example]);

    // Carregar preview
    const loadPreview = useCallback(() => {
        if (!isVisible || !iframeRef.current) return;

        setIsLoading(true);
        setError(null);

        try {
            const html = generatePreviewHTML();
            const iframe = iframeRef.current;

            // Criar blob URL para o HTML
            const blob = new Blob([html], { type: 'text/html' });
            const url = URL.createObjectURL(blob);

            iframe.src = url;

            const handleLoad = () => {
                setIsLoading(false);
                URL.revokeObjectURL(url);
            };

            const handleError = () => {
                setIsLoading(false);
                setError('Erro ao carregar preview');
                URL.revokeObjectURL(url);
            };

            iframe.addEventListener('load', handleLoad);
            iframe.addEventListener('error', handleError);

            return () => {
                iframe.removeEventListener('load', handleLoad);
                iframe.removeEventListener('error', handleError);
                URL.revokeObjectURL(url);
            };
        } catch {
            setIsLoading(false);
            setError('Erro ao gerar preview');
        }
    }, [isVisible, generatePreviewHTML]);

    // Recarregar quando o exemplo mudar
    useEffect(() => {
        if (isVisible && example.previewConfig?.autoRun) {
            const timer = setTimeout(loadPreview, 500); // Debounce
            return () => clearTimeout(timer);
        }
    }, [example, isVisible, loadPreview]);

    // Carregar preview inicial
    useEffect(() => {
        if (isVisible) {
            loadPreview();
        }
    }, [isVisible, loadPreview]);

    if (!isVisible) return null;

    return (
        <div className="h-full bg-white border border-gray-200 rounded-lg overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between bg-gray-50 px-4 py-2 border-b border-gray-200">
                <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                        <div className="w-3 h-3 bg-red-400 rounded-full"></div>
                        <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                        <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                    </div>
                    <span className="text-sm text-gray-600 ml-2">Preview</span>
                </div>

                <div className="flex items-center gap-2">
                    {isLoading && (
                        <div className="animate-spin w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full"></div>
                    )}
                    <button
                        onClick={loadPreview}
                        className="px-3 py-1 text-sm bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                        disabled={isLoading}
                    >
                        🔄 Recarregar
                    </button>
                </div>
            </div>

            {/* Content */}
            <div className="relative h-full">
                {error ? (
                    <div className="flex items-center justify-center h-full bg-red-50">
                        <div className="text-center">
                            <div className="text-red-500 text-4xl mb-4">⚠️</div>
                            <h3 className="text-lg font-semibold text-red-700 mb-2">Erro no Preview</h3>
                            <p className="text-red-600 mb-4">{error}</p>
                            <button
                                onClick={loadPreview}
                                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                            >
                                Tentar Novamente
                            </button>
                        </div>
                    </div>
                ) : (
                    <>
                        {isLoading && (
                            <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-10">
                                <div className="text-center">
                                    <div className="animate-spin w-8 h-8 border-3 border-blue-500 border-t-transparent rounded-full mx-auto mb-2"></div>
                                    <p className="text-gray-600">Carregando preview...</p>
                                </div>
                            </div>
                        )}

                        <iframe
                            ref={iframeRef}
                            className="w-full h-full border-0"
                            sandbox="allow-scripts allow-same-origin allow-forms allow-modals"
                            title="Code Preview"
                        />
                    </>
                )}
            </div>
        </div>
    );
}

export default CodePreview;
