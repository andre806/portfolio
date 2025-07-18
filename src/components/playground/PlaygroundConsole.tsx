/**
 * Componente de console para o playground
 */

'use client';

import { useState, useRef, useEffect } from 'react';

interface ConsoleMessage {
    id: string;
    type: 'log' | 'error' | 'warn' | 'info';
    message: string;
    timestamp: string;
}

interface PlaygroundConsoleProps {
    output: string[];
    onClear: () => void;
    onExecute?: () => void;
    isVisible: boolean;
}

function PlaygroundConsole({ output, onClear, onExecute, isVisible }: PlaygroundConsoleProps) {
    const [messages, setMessages] = useState<ConsoleMessage[]>([]);
    const [command, setCommand] = useState('');
    const [commandHistory, setCommandHistory] = useState<string[]>([]);
    const [historyIndex, setHistoryIndex] = useState(-1);
    const consoleRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // Converter output em mensagens
    useEffect(() => {
        const newMessages = output.map((line, index) => ({
            id: `msg-${Date.now()}-${index}`,
            type: line.toLowerCase().includes('error') ? 'error' as const :
                line.toLowerCase().includes('warn') ? 'warn' as const :
                    line.toLowerCase().includes('info') ? 'info' as const :
                        'log' as const,
            message: line,
            timestamp: new Date().toLocaleTimeString()
        }));

        setMessages(newMessages);
    }, [output]);

    // Auto-scroll para última mensagem
    useEffect(() => {
        if (consoleRef.current) {
            consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
        }
    }, [messages]);

    // Executar comando
    const executeCommand = (cmd: string) => {
        if (!cmd.trim()) return;

        // Adicionar ao histórico
        setCommandHistory(prev => [...prev, cmd]);
        setHistoryIndex(-1);

        // Simular execução de comandos básicos
        const newMessage: ConsoleMessage = {
            id: `cmd-${Date.now()}`,
            type: 'log',
            message: `> ${cmd}`,
            timestamp: new Date().toLocaleTimeString()
        };

        let response: ConsoleMessage | null = null;

        // Comandos especiais
        switch (cmd.toLowerCase().trim()) {
            case 'clear':
                onClear();
                setMessages([]);
                setCommand('');
                return;

            case 'help':
                response = {
                    id: `help-${Date.now()}`,
                    type: 'info',
                    message: 'Comandos disponíveis: clear, help, run, ls, pwd',
                    timestamp: new Date().toLocaleTimeString()
                };
                break;

            case 'run':
                if (onExecute) {
                    onExecute();
                    response = {
                        id: `run-${Date.now()}`,
                        type: 'info',
                        message: 'Executando código...',
                        timestamp: new Date().toLocaleTimeString()
                    };
                }
                break;

            case 'ls':
                response = {
                    id: `ls-${Date.now()}`,
                    type: 'log',
                    message: 'App.jsx  styles.css  index.html',
                    timestamp: new Date().toLocaleTimeString()
                };
                break;

            case 'pwd':
                response = {
                    id: `pwd-${Date.now()}`,
                    type: 'log',
                    message: '/playground/current-project',
                    timestamp: new Date().toLocaleTimeString()
                };
                break;

            default:
                response = {
                    id: `error-${Date.now()}`,
                    type: 'error',
                    message: `Comando não reconhecido: ${cmd}. Digite &lsquo;help&rsquo; para ver comandos disponíveis.`,
                    timestamp: new Date().toLocaleTimeString()
                };
        }

        setMessages(prev => [...prev, newMessage, ...(response ? [response] : [])]);
        setCommand('');
    };

    // Manipular teclas do input
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        switch (e.key) {
            case 'Enter':
                executeCommand(command);
                break;

            case 'ArrowUp':
                e.preventDefault();
                if (commandHistory.length > 0) {
                    const newIndex = historyIndex === -1 ? commandHistory.length - 1 : Math.max(0, historyIndex - 1);
                    setHistoryIndex(newIndex);
                    setCommand(commandHistory[newIndex]);
                }
                break;

            case 'ArrowDown':
                e.preventDefault();
                if (historyIndex !== -1) {
                    const newIndex = historyIndex === commandHistory.length - 1 ? -1 : historyIndex + 1;
                    setHistoryIndex(newIndex);
                    setCommand(newIndex === -1 ? '' : commandHistory[newIndex]);
                }
                break;

            case 'Tab':
                e.preventDefault();
                // Auto-complete básico
                const commands = ['clear', 'help', 'run', 'ls', 'pwd'];
                const matches = commands.filter(cmd => cmd.startsWith(command.toLowerCase()));
                if (matches.length === 1) {
                    setCommand(matches[0]);
                }
                break;
        }
    };

    // Focar input quando console for visível
    useEffect(() => {
        if (isVisible && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isVisible]);

    if (!isVisible) return null;

    const getMessageIcon = (type: ConsoleMessage['type']) => {
        switch (type) {
            case 'error': return '❌';
            case 'warn': return '⚠️';
            case 'info': return 'ℹ️';
            default: return '📝';
        }
    };

    const getMessageClass = (type: ConsoleMessage['type']) => {
        switch (type) {
            case 'error': return 'text-red-400';
            case 'warn': return 'text-yellow-400';
            case 'info': return 'text-blue-400';
            default: return 'text-gray-300';
        }
    };

    return (
        <div className="h-full bg-gray-900 text-gray-100 font-mono text-sm flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between bg-gray-800 px-4 py-2 border-b border-gray-700">
                <div className="flex items-center gap-2">
                    <span className="text-gray-300">Console</span>
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                </div>

                <div className="flex items-center gap-2">
                    {onExecute && (
                        <button
                            onClick={onExecute}
                            className="px-3 py-1 text-xs bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
                            title="Executar código (Ctrl+Enter)"
                        >
                            ▶️ Run
                        </button>
                    )}
                    <button
                        onClick={() => {
                            onClear();
                            setMessages([]);
                        }}
                        className="px-3 py-1 text-xs bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                        title="Limpar console"
                    >
                        🗑️ Clear
                    </button>
                </div>
            </div>

            {/* Messages */}
            <div
                ref={consoleRef}
                className="flex-1 overflow-y-auto p-4 space-y-1"
                style={{ maxHeight: 'calc(100% - 120px)' }}
            >
                {messages.length === 0 ? (
                    <div className="text-gray-500 text-center py-8">
                        <div className="text-4xl mb-2">🚀</div>
                        <p>Console vazio. Execute algum código ou digite um comando.</p>
                        <p className="text-xs mt-2">Digite &lsquo;help&rsquo; para ver comandos disponíveis.</p>
                    </div>
                ) : (
                    messages.map(message => (
                        <div key={message.id} className="flex items-start gap-2 py-1">
                            <span className="text-gray-500 text-xs whitespace-nowrap">
                                {message.timestamp}
                            </span>
                            <span className="text-xs">{getMessageIcon(message.type)}</span>
                            <div className={`flex-1 ${getMessageClass(message.type)} whitespace-pre-wrap break-words`}>
                                {message.message}
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Input */}
            <div className="border-t border-gray-700 bg-gray-800">
                <div className="flex items-center px-4 py-2">
                    <span className="text-green-400 mr-2">$</span>
                    <input
                        ref={inputRef}
                        type="text"
                        value={command}
                        onChange={(e) => setCommand(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Digite um comando... (help para ajuda)"
                        className="flex-1 bg-transparent text-gray-300 outline-none placeholder-gray-500"
                    />
                </div>

                {/* Dicas */}
                <div className="px-4 pb-2 text-xs text-gray-500">
                    <div className="flex flex-wrap gap-4">
                        <span>↑↓ Histórico</span>
                        <span>Tab Auto-complete</span>
                        <span>Enter Executar</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PlaygroundConsole;
