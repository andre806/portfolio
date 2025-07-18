/**
 * Componente do editor de código para o playground
 */

'use client';

import { useState, useRef } from 'react';
import { Language } from '@/models/CodeExample';

interface CodeEditorProps {
    value: string;
    onChange: (value: string) => void;
    language: Language;
    readOnly?: boolean;
    placeholder?: string;
    className?: string;
}

interface HighlightRule {
    regex: RegExp;
    className: string;
}

const syntaxRules: Record<Language, HighlightRule[]> = {
    javascript: [
        { regex: /\b(const|let|var|function|return|if|else|for|while|class|import|export|default|async|await|try|catch|finally)\b/g, className: 'text-purple-600 font-semibold' },
        { regex: /"([^"\\]|\\.)*"/g, className: 'text-green-600' },
        { regex: /'([^'\\]|\\.)*'/g, className: 'text-green-600' },
        { regex: /`([^`\\]|\\.)*`/g, className: 'text-green-600' },
        { regex: /\/\/.*$/gm, className: 'text-gray-500 italic' },
        { regex: /\/\*[\s\S]*?\*\//g, className: 'text-gray-500 italic' },
        { regex: /\b(\d+\.?\d*)\b/g, className: 'text-blue-600' },
        { regex: /\b(true|false|null|undefined|NaN|Infinity)\b/g, className: 'text-orange-600' }
    ],
    typescript: [
        { regex: /\b(const|let|var|function|return|if|else|for|while|class|import|export|default|async|await|try|catch|finally|interface|type|enum|namespace|declare)\b/g, className: 'text-purple-600 font-semibold' },
        { regex: /\b(string|number|boolean|object|any|void|never|unknown)\b/g, className: 'text-blue-500 font-semibold' },
        { regex: /"([^"\\]|\\.)*"/g, className: 'text-green-600' },
        { regex: /'([^'\\]|\\.)*'/g, className: 'text-green-600' },
        { regex: /`([^`\\]|\\.)*`/g, className: 'text-green-600' },
        { regex: /\/\/.*$/gm, className: 'text-gray-500 italic' },
        { regex: /\/\*[\s\S]*?\*\//g, className: 'text-gray-500 italic' },
        { regex: /\b(\d+\.?\d*)\b/g, className: 'text-blue-600' },
        { regex: /\b(true|false|null|undefined|NaN|Infinity)\b/g, className: 'text-orange-600' }
    ],
    react: [
        { regex: /\b(const|let|var|function|return|if|else|for|while|class|import|export|default|async|await|try|catch|finally)\b/g, className: 'text-purple-600 font-semibold' },
        { regex: /\b(useState|useEffect|useContext|useReducer|useMemo|useCallback|useRef|useImperativeHandle|useLayoutEffect|useDebugValue)\b/g, className: 'text-pink-600 font-semibold' },
        { regex: /<\/?[a-zA-Z][a-zA-Z0-9]*\b[^>]*>/g, className: 'text-blue-600' },
        { regex: /\b[A-Z][a-zA-Z0-9]*\b(?=\s*[<({])/g, className: 'text-yellow-600 font-semibold' },
        { regex: /"([^"\\]|\\.)*"/g, className: 'text-green-600' },
        { regex: /'([^'\\]|\\.)*'/g, className: 'text-green-600' },
        { regex: /`([^`\\]|\\.)*`/g, className: 'text-green-600' },
        { regex: /\/\/.*$/gm, className: 'text-gray-500 italic' },
        { regex: /\/\*[\s\S]*?\*\//g, className: 'text-gray-500 italic' },
        { regex: /\b(\d+\.?\d*)\b/g, className: 'text-blue-600' },
        { regex: /\b(true|false|null|undefined|NaN|Infinity)\b/g, className: 'text-orange-600' }
    ],
    html: [
        { regex: /<\/?[a-zA-Z][a-zA-Z0-9]*\b[^>]*>/g, className: 'text-blue-600' },
        { regex: /\b(class|id|src|href|alt|title|style)\s*=/g, className: 'text-purple-600' },
        { regex: /"([^"\\]|\\.)*"/g, className: 'text-green-600' },
        { regex: /'([^'\\]|\\.)*'/g, className: 'text-green-600' },
        { regex: /<!--[\s\S]*?-->/g, className: 'text-gray-500 italic' }
    ],
    css: [
        { regex: /\b(background|color|font|margin|padding|border|width|height|display|position|top|left|right|bottom|z-index|opacity|transform|transition|animation)\b/g, className: 'text-purple-600' },
        { regex: /\b(flex|grid|block|inline|absolute|relative|fixed|sticky)\b/g, className: 'text-blue-600' },
        { regex: /#[a-fA-F0-9]{3,6}\b/g, className: 'text-pink-600' },
        { regex: /\b\d+(\.\d+)?(px|em|rem|%|vh|vw|pt|pc|in|cm|mm|ex|ch|vmin|vmax)\b/g, className: 'text-orange-600' },
        { regex: /"([^"\\]|\\.)*"/g, className: 'text-green-600' },
        { regex: /'([^'\\]|\\.)*'/g, className: 'text-green-600' },
        { regex: /\/\*[\s\S]*?\*\//g, className: 'text-gray-500 italic' }
    ],
    json: [
        { regex: /"([^"\\]|\\.)*"\s*:/g, className: 'text-blue-600 font-semibold' },
        { regex: /"([^"\\]|\\.)*"(?!\s*:)/g, className: 'text-green-600' },
        { regex: /\b(\d+\.?\d*)\b/g, className: 'text-orange-600' },
        { regex: /\b(true|false|null)\b/g, className: 'text-purple-600' }
    ]
};

function CodeEditor({
    value,
    onChange,
    language,
    readOnly = false,
    placeholder = 'Digite seu código aqui...',
    className = ''
}: CodeEditorProps) {
    const [isFocused, setIsFocused] = useState(false);
    const [cursorPosition, setCursorPosition] = useState(0);
    const textareaRef = useRef<HTMLTextAreaElement>(null);
    const highlightRef = useRef<HTMLDivElement>(null);

    // Aplicar syntax highlighting
    const highlightCode = (code: string): string => {
        let highlighted = code;
        const rules = syntaxRules[language] || [];

        // Escapar HTML
        highlighted = highlighted
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;');

        // Aplicar regras de sintaxe
        rules.forEach(rule => {
            highlighted = highlighted.replace(rule.regex, (match) =>
                `<span class="${rule.className}">${match}</span>`
            );
        });

        // Quebras de linha
        highlighted = highlighted.replace(/\n/g, '<br>');

        return highlighted;
    };

    // Sincronizar scroll entre textarea e highlight
    const handleScroll = () => {
        if (textareaRef.current && highlightRef.current) {
            highlightRef.current.scrollTop = textareaRef.current.scrollTop;
            highlightRef.current.scrollLeft = textareaRef.current.scrollLeft;
        }
    };

    // Manipular teclas especiais
    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (readOnly) return;

        const textarea = textareaRef.current;
        if (!textarea) return;

        const { selectionStart, selectionEnd, value: currentValue } = textarea;

        // Tab - inserir indentação
        if (e.key === 'Tab') {
            e.preventDefault();
            const indent = '  ';
            const newValue =
                currentValue.substring(0, selectionStart) +
                indent +
                currentValue.substring(selectionEnd);

            onChange(newValue);

            // Mover cursor após o indent
            setTimeout(() => {
                textarea.setSelectionRange(
                    selectionStart + indent.length,
                    selectionStart + indent.length
                );
            }, 0);
        }

        // Enter - manter indentação da linha anterior
        if (e.key === 'Enter') {
            e.preventDefault();
            const lines = currentValue.substring(0, selectionStart).split('\n');
            const currentLine = lines[lines.length - 1];
            const indent = currentLine.match(/^\s*/)?.[0] || '';

            const newValue =
                currentValue.substring(0, selectionStart) +
                '\n' + indent +
                currentValue.substring(selectionEnd);

            onChange(newValue);

            setTimeout(() => {
                textarea.setSelectionRange(
                    selectionStart + 1 + indent.length,
                    selectionStart + 1 + indent.length
                );
            }, 0);
        }

        // Parênteses, colchetes e chaves automáticos
        const pairs: Record<string, string> = {
            '(': ')',
            '[': ']',
            '{': '}',
            '"': '"',
            "'": "'",
            '`': '`'
        };

        if (pairs[e.key] && selectionStart === selectionEnd) {
            e.preventDefault();
            const pair = pairs[e.key];
            const newValue =
                currentValue.substring(0, selectionStart) +
                e.key + pair +
                currentValue.substring(selectionEnd);

            onChange(newValue);

            setTimeout(() => {
                textarea.setSelectionRange(
                    selectionStart + 1,
                    selectionStart + 1
                );
            }, 0);
        }
    };

    // Atualizar posição do cursor
    const handleSelectionChange = () => {
        if (textareaRef.current) {
            setCursorPosition(textareaRef.current.selectionStart);
        }
    };

    // Obter número da linha atual
    const getCurrentLine = (): number => {
        const lines = value.substring(0, cursorPosition).split('\n');
        return lines.length;
    };

    // Obter número da coluna atual
    const getCurrentColumn = (): number => {
        const lines = value.substring(0, cursorPosition).split('\n');
        const currentLine = lines[lines.length - 1];
        return currentLine.length + 1;
    };

    // Contar linhas
    const lineCount = value.split('\n').length;

    return (
        <div className={`relative bg-gray-900 rounded-lg overflow-hidden ${className}`}>
            {/* Header com info do arquivo */}
            <div className="flex items-center justify-between bg-gray-800 px-4 py-2 text-sm">
                <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${language === 'javascript' ? 'bg-yellow-400' :
                        language === 'typescript' ? 'bg-blue-400' :
                            language === 'react' ? 'bg-cyan-400' :
                                language === 'html' ? 'bg-orange-400' :
                                    language === 'css' ? 'bg-purple-400' :
                                        language === 'json' ? 'bg-green-400' :
                                            'bg-gray-400'
                        }`} />
                    <span className="text-gray-300 capitalize">{language}</span>
                </div>
                <div className="text-gray-500">
                    Linha {getCurrentLine()}, Coluna {getCurrentColumn()}
                </div>
            </div>

            {/* Editor Container */}
            <div className="relative">
                {/* Números das linhas */}
                <div className="absolute left-0 top-0 bg-gray-800 text-gray-500 text-sm font-mono py-4 px-2 border-r border-gray-700 z-10 select-none">
                    {Array.from({ length: lineCount }, (_, i) => (
                        <div key={i + 1} className="leading-6 text-right min-w-[2rem]">
                            {i + 1}
                        </div>
                    ))}
                </div>

                {/* Syntax Highlighting */}
                <div
                    ref={highlightRef}
                    className="absolute left-0 top-0 w-full h-full font-mono text-sm text-gray-300 whitespace-pre py-4 pl-16 pr-4 pointer-events-none overflow-hidden"
                    style={{ lineHeight: '1.5rem' }}
                    dangerouslySetInnerHTML={{ __html: highlightCode(value) }}
                />

                {/* Textarea */}
                <textarea
                    ref={textareaRef}
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    onKeyDown={handleKeyDown}
                    onScroll={handleScroll}
                    onSelect={handleSelectionChange}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    readOnly={readOnly}
                    placeholder={placeholder}
                    spellCheck={false}
                    className={`
            w-full h-full bg-transparent text-transparent caret-white font-mono text-sm resize-none border-none outline-none
            py-4 pl-16 pr-4 overflow-auto
            placeholder-gray-500
            ${readOnly ? 'cursor-default' : 'cursor-text'}
          `}
                    style={{
                        lineHeight: '1.5rem',
                        minHeight: '400px',
                        caretColor: isFocused ? '#60A5FA' : 'transparent'
                    }}
                />

                {/* Overlay para readonly */}
                {readOnly && (
                    <div className="absolute inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center">
                        <div className="bg-gray-800 px-4 py-2 rounded-lg text-gray-300 text-sm">
                            📖 Modo somente leitura
                        </div>
                    </div>
                )}
            </div>

            {/* Footer com estatísticas */}
            <div className="bg-gray-800 px-4 py-2 text-xs text-gray-400 border-t border-gray-700">
                <div className="flex justify-between">
                    <span>{value.length} caracteres</span>
                    <span>{lineCount} linhas</span>
                </div>
            </div>
        </div>
    );
}

export default CodeEditor;
