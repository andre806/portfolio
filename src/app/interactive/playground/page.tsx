/**
 * Página principal do playground interativo
 */

'use client';

import { useState, useCallback } from 'react';
import { usePlayground } from '@/hooks/usePlayground';
import CodeEditor from '@/components/playground/CodeEditor';
import CodePreview from '@/components/playground/CodePreview';
import PlaygroundConsole from '@/components/playground/PlaygroundConsole';
import PlaygroundSidebar from '@/components/playground/PlaygroundSidebar';
import { Language } from '@/models/CodeExample';

export default function PlaygroundPage() {
    const {
        examples,
        activeExample,
        activeFileId,
        filters,
        previewVisible,
        consoleOutput,
        stats,
        categories,
        popularTags,
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
    } = usePlayground();

    const [sidebarVisible, setSidebarVisible] = useState(true);
    const [consoleVisible, setConsoleVisible] = useState(false);
    const [layoutMode, setLayoutMode] = useState<'horizontal' | 'vertical'>('horizontal');

    // Arquivo ativo
    const activeFile = activeExample?.files.find(f => f.id === activeFileId);

    // Ações do arquivo
    const handleAddFile = useCallback(() => {
        const name = prompt('Nome do arquivo (ex: styles.css):');
        if (!name) return;

        const extension = name.split('.').pop()?.toLowerCase();
        let language: Language = 'javascript';

        switch (extension) {
            case 'html': language = 'html'; break;
            case 'css': language = 'css'; break;
            case 'js': language = 'javascript'; break;
            case 'jsx': language = 'react'; break;
            case 'ts': language = 'typescript'; break;
            case 'tsx': language = 'react'; break;
            case 'json': language = 'json'; break;
        }

        addFile(name, language);
    }, [addFile]);

    const handleRemoveFile = useCallback((fileId: string) => {
        if (confirm('Tem certeza que deseja remover este arquivo?')) {
            removeFile(fileId);
        }
    }, [removeFile]);

    const handleShareExample = useCallback(() => {
        if (!activeExample) return;

        const link = generateShareableLink(activeExample.id);
        navigator.clipboard.writeText(link);
        alert('Link copiado para a área de transferência!');
    }, [activeExample, generateShareableLink]);

    const handleForkExample = useCallback(() => {
        if (!activeExample) return;

        const forked = forkExample(activeExample.id);
        if (forked) {
            alert('Fork criado com sucesso!');
        }
    }, [activeExample, forkExample]);

    return (
        <div className="h-screen bg-gray-50 flex flex-col overflow-hidden">
            {/* Header */}
            <header className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <h1 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                        <span className="text-2xl">🛝</span>
                        Playground Interativo
                    </h1>

                    {activeExample && (
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                            <span>/</span>
                            <span className="font-medium">{activeExample.title}</span>
                        </div>
                    )}
                </div>

                <div className="flex items-center gap-2">
                    {/* Layout Controls */}
                    <div className="flex items-center bg-gray-100 rounded-lg p-1">
                        <button
                            onClick={() => setLayoutMode('horizontal')}
                            className={`p-2 rounded text-sm ${layoutMode === 'horizontal'
                                ? 'bg-white text-gray-900 shadow-sm'
                                : 'text-gray-600 hover:text-gray-900'
                                }`}
                            title="Layout horizontal"
                        >
                            ⬌
                        </button>
                        <button
                            onClick={() => setLayoutMode('vertical')}
                            className={`p-2 rounded text-sm ${layoutMode === 'vertical'
                                ? 'bg-white text-gray-900 shadow-sm'
                                : 'text-gray-600 hover:text-gray-900'
                                }`}
                            title="Layout vertical"
                        >
                            ⬍
                        </button>
                    </div>

                    {/* View Controls */}
                    <button
                        onClick={() => setSidebarVisible(!sidebarVisible)}
                        className={`p-2 rounded-lg text-sm transition-colors ${sidebarVisible
                            ? 'bg-blue-100 text-blue-700'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                        title="Toggle sidebar"
                    >
                        📑
                    </button>

                    <button
                        onClick={togglePreview}
                        className={`p-2 rounded-lg text-sm transition-colors ${previewVisible
                            ? 'bg-green-100 text-green-700'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                        title="Toggle preview"
                    >
                        👁️
                    </button>

                    <button
                        onClick={() => setConsoleVisible(!consoleVisible)}
                        className={`p-2 rounded-lg text-sm transition-colors ${consoleVisible
                            ? 'bg-yellow-100 text-yellow-700'
                            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                            }`}
                        title="Toggle console"
                    >
                        💻
                    </button>

                    {/* Example Actions */}
                    {activeExample && (
                        <>
                            <div className="w-px h-6 bg-gray-300" />

                            <button
                                onClick={() => likeExample(activeExample.id)}
                                className="flex items-center gap-1 px-3 py-2 text-sm text-gray-600 hover:text-red-600 transition-colors"
                                title="Curtir exemplo"
                            >
                                ❤️ {activeExample.stats.likes}
                            </button>

                            <button
                                onClick={handleForkExample}
                                className="px-3 py-2 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                                title="Fazer fork do exemplo"
                            >
                                🍴 Fork
                            </button>

                            <button
                                onClick={handleShareExample}
                                className="px-3 py-2 text-sm bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                                title="Compartilhar exemplo"
                            >
                                📤 Compartilhar
                            </button>
                        </>
                    )}
                </div>
            </header>

            {/* Main Content */}
            <div className="flex-1 flex overflow-hidden">
                {/* Sidebar */}
                {sidebarVisible && (
                    <div className="w-80 border-r border-gray-200 bg-white">
                        <PlaygroundSidebar
                            examples={examples}
                            activeExample={activeExample}
                            categories={categories}
                            popularTags={popularTags}
                            filters={filters}
                            onSelectExample={selectExample}
                            onFilterChange={setFilters}
                            onClearFilters={clearFilters}
                            onCreateNew={createFromTemplate}
                            stats={stats}
                        />
                    </div>
                )}

                {/* Editor Area */}
                <div className="flex-1 flex flex-col">
                    {activeExample ? (
                        <>
                            {/* File Tabs */}
                            <div className="bg-gray-100 border-b border-gray-200 px-4 py-2">
                                <div className="flex items-center gap-2 overflow-x-auto">
                                    {activeExample.files.map(file => (
                                        <button
                                            key={file.id}
                                            onClick={() => selectFile(file.id)}
                                            className={`flex items-center gap-2 px-3 py-1.5 text-sm rounded-lg whitespace-nowrap transition-colors ${activeFileId === file.id
                                                ? 'bg-white text-gray-900 shadow-sm'
                                                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-200'
                                                }`}
                                        >
                                            <span className={`w-2 h-2 rounded-full ${file.language === 'javascript' ? 'bg-yellow-400' :
                                                file.language === 'typescript' ? 'bg-blue-400' :
                                                    file.language === 'react' ? 'bg-cyan-400' :
                                                        file.language === 'html' ? 'bg-orange-400' :
                                                            file.language === 'css' ? 'bg-purple-400' :
                                                                file.language === 'json' ? 'bg-green-400' :
                                                                    'bg-gray-400'
                                                }`} />
                                            {file.name}
                                            {activeExample.files.length > 1 && (
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleRemoveFile(file.id);
                                                    }}
                                                    className="ml-1 text-gray-400 hover:text-red-500"
                                                >
                                                    ✕
                                                </button>
                                            )}
                                        </button>
                                    ))}

                                    <button
                                        onClick={handleAddFile}
                                        className="px-3 py-1.5 text-sm text-gray-500 hover:text-gray-700 hover:bg-gray-200 rounded-lg transition-colors"
                                        title="Adicionar arquivo"
                                    >
                                        + Arquivo
                                    </button>
                                </div>
                            </div>

                            {/* Editor and Preview */}
                            <div className={`flex-1 flex ${layoutMode === 'vertical' ? 'flex-col' : 'flex-row'} overflow-hidden`}>
                                {/* Code Editor */}
                                <div className={`${previewVisible ? (layoutMode === 'vertical' ? 'h-1/2' : 'w-1/2') : 'flex-1'} border-r border-gray-200`}>
                                    {activeFile && (
                                        <CodeEditor
                                            value={activeFile.content}
                                            onChange={(content) => updateFileContent(activeFile.id, content)}
                                            language={activeFile.language}
                                            readOnly={activeFile.readonly}
                                            className="h-full"
                                        />
                                    )}
                                </div>

                                {/* Preview */}
                                {previewVisible && (
                                    <div className={`${layoutMode === 'vertical' ? 'h-1/2' : 'w-1/2'}`}>
                                        <CodePreview
                                            example={activeExample}
                                            isVisible={previewVisible}
                                        />
                                    </div>
                                )}
                            </div>

                            {/* Console */}
                            {consoleVisible && (
                                <div className="h-64 border-t border-gray-200">
                                    <PlaygroundConsole
                                        output={consoleOutput}
                                        onClear={clearConsole}
                                        onExecute={executeCode}
                                        isVisible={consoleVisible}
                                    />
                                </div>
                            )}
                        </>
                    ) : (
                        /* Empty State */
                        <div className="flex-1 flex items-center justify-center bg-gray-50">
                            <div className="text-center max-w-md">
                                <div className="text-6xl mb-4">🛝</div>
                                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                                    Bem-vindo ao Playground
                                </h2>
                                <p className="text-gray-600 mb-6">
                                    Selecione um exemplo na sidebar ou crie um novo projeto para começar a codificar!
                                </p>

                                <div className="space-y-3">
                                    <button
                                        onClick={() => createFromTemplate('react-component')}
                                        className="w-full px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                                    >
                                        🚀 Criar Componente React
                                    </button>

                                    <button
                                        onClick={() => createFromTemplate('html-page')}
                                        className="w-full px-4 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                                    >
                                        📄 Criar Página HTML
                                    </button>

                                    <button
                                        onClick={() => createFromTemplate('api-integration')}
                                        className="w-full px-4 py-3 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
                                    >
                                        🔗 Integração com API
                                    </button>
                                </div>

                                <div className="mt-8 text-sm text-gray-500">
                                    <p>💡 Dica: Use o console para executar comandos e depurar seu código</p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* Keyboard Shortcuts Help */}
            <div className="bg-gray-800 text-white px-4 py-1 text-xs">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <span>⌨️ Atalhos:</span>
                        <span>Ctrl+S Salvar</span>
                        <span>Ctrl+Enter Executar</span>
                        <span>Ctrl+` Console</span>
                        <span>F11 Tela cheia</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <span>Status:</span>
                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                        <span>Online</span>
                    </div>
                </div>
            </div>
        </div>
    );
}
