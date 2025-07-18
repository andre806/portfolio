# Sistema Playground Interativo

## Visão Geral

O playground é uma funcionalidade avançada que permite aos visitantes experimentar, editar e executar código diretamente no navegador. É uma ferramenta educacional e demonstrativa que mostra habilidades técnicas através de exemplos práticos.

## Arquitetura

### Componentes Principais

1. **PlaygroundPage** (`/src/app/interactive/playground/page.tsx`)
   - Componente principal que coordena toda a interface
   - Gerencia layout, visibilidade de painéis e ações globais

2. **CodeEditor** (`/src/components/playground/CodeEditor.tsx`)
   - Editor de código com syntax highlighting
   - Suporte a múltiplas linguagens
   - Auto-complete, indentação automática e atalhos

3. **CodePreview** (`/src/components/playground/CodePreview.tsx`)
   - Preview em tempo real do código
   - Suporte a React, HTML/CSS/JS e outros frameworks
   - Execução segura em iframe isolado

4. **PlaygroundConsole** (`/src/components/playground/PlaygroundConsole.tsx`)
   - Console interativo para logs e comandos
   - Histórico de comandos e auto-complete
   - Simulação de terminal básico

5. **PlaygroundSidebar** (`/src/components/playground/PlaygroundSidebar.tsx`)
   - Navegação entre exemplos
   - Filtros e busca avançada
   - Estatísticas e métricas

### Modelos de Dados

#### CodeExample
```typescript
interface CodeExample {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  framework: 'react' | 'vanilla' | 'next' | 'node';
  tags: string[];
  files: CodeFile[];
  previewConfig?: {
    showPreview: boolean;
    autoRun: boolean;
    dependencies?: string[];
  };
  author: {
    name: string;
    avatar: string;
  };
  stats: {
    views: number;
    likes: number;
    forks: number;
  };
  createdAt: string;
  featured: boolean;
}
```

#### CodeFile
```typescript
interface CodeFile {
  id: string;
  name: string;
  language: Language;
  content: string;
  readonly?: boolean;
}
```

### Hook usePlayground

O hook `usePlayground` centraliza toda a lógica de estado e operações:

#### Estados Gerenciados
- Lista de exemplos e filtros aplicados
- Exemplo e arquivo atualmente selecionados
- Visibilidade de painéis (preview, console, sidebar)
- Output do console e logs
- Estatísticas e métricas

#### Funcionalidades Principais
- **Filtros e Busca**: Filtrar por categoria, dificuldade, framework, tags
- **Navegação**: Seleção de exemplos e arquivos
- **Edição**: Atualização de conteúdo, adição/remoção de arquivos
- **Execução**: Simulação de execução e logs
- **Interação Social**: Curtidas, forks, compartilhamento
- **Templates**: Criação de novos projetos a partir de templates

## Funcionalidades

### 1. Editor de Código
- **Syntax Highlighting**: Destaque de sintaxe para JS, TS, React, HTML, CSS, JSON
- **Auto-indentação**: Mantém indentação ao pressionar Enter
- **Auto-complete**: Parênteses, colchetes e chaves automáticos
- **Navegação**: Tabs para múltiplos arquivos
- **Estatísticas**: Contadores de linhas, caracteres e posição do cursor

### 2. Preview em Tempo Real
- **React Components**: Renderização usando Babel e React CDN
- **HTML/CSS/JS**: Execução direta no iframe
- **Isolamento**: Execução segura em sandbox
- **Auto-reload**: Atualização automática quando habilitada
- **Error Handling**: Captura e exibição de erros

### 3. Console Interativo
- **Comandos Básicos**: clear, help, run, ls, pwd
- **Histórico**: Navegação com setas up/down
- **Auto-complete**: Tab para completar comandos
- **Logs**: Exibição de outputs e erros

### 4. Sistema de Filtros
- **Busca Textual**: Por título, descrição e tags
- **Categorias**: React Components, API Integration, etc.
- **Dificuldade**: Beginner, Intermediate, Advanced
- **Framework**: React, Vanilla, Next.js, Node.js
- **Tags**: Filtros múltiplos por tecnologias
- **Featured**: Apenas exemplos destacados

### 5. Interações Sociais
- **Curtidas**: Sistema de likes para exemplos
- **Forks**: Criar cópias editáveis de exemplos
- **Compartilhamento**: Gerar links únicos para exemplos
- **Visualizações**: Contador de acessos

### 6. Templates
- Projetos pré-configurados para início rápido
- React Component, HTML Page, API Integration
- Estrutura básica com arquivos iniciais

## Exemplos Incluídos

### 1. React Counter Component
- **Categoria**: React Components
- **Dificuldade**: Beginner
- **Conceitos**: useState, event handlers, Tailwind CSS
- **Arquivos**: App.jsx

### 2. Todo App with LocalStorage
- **Categoria**: Full Applications
- **Dificuldade**: Intermediate
- **Conceitos**: CRUD operations, localStorage, hooks
- **Arquivos**: App.jsx

### 3. API Data Fetching
- **Categoria**: API Integration
- **Dificuldade**: Intermediate
- **Conceitos**: fetch, async/await, error handling, loading states
- **Arquivos**: App.jsx

### 4. CSS Animations Showcase
- **Categoria**: CSS & Styling
- **Dificuldade**: Intermediate
- **Conceitos**: CSS animations, keyframes, transforms
- **Arquivos**: index.html, styles.css

### 5. Advanced Form Validation
- **Categoria**: Forms & Validation
- **Dificuldade**: Advanced
- **Conceitos**: Custom hooks, validation, regex, masking
- **Arquivos**: App.jsx

### 6. Data Visualization with Charts
- **Categoria**: Data Visualization
- **Dificuldade**: Advanced
- **Conceitos**: SVG, data processing, interactive charts
- **Arquivos**: App.jsx

## Configuração e Customização

### Adicionando Novos Exemplos

1. **Criar o exemplo** em `src/config/codeExamples.ts`:
```typescript
const newExample: CodeExample = {
  id: 'unique-id',
  title: 'Example Title',
  description: 'Example description',
  // ... outras propriedades
  files: [
    {
      id: 'file-1',
      name: 'App.jsx',
      language: 'react',
      content: 'exemplo de código...'
    }
  ]
};
```

2. **Adicionar à lista** de exemplos exportados

### Criando Novos Templates

1. **Definir template** em `src/config/codeExamples.ts`:
```typescript
const newTemplate: CodeTemplate = {
  id: 'template-id',
  name: 'Template Name',
  framework: 'react',
  description: 'Template description',
  files: [
    {
      name: 'Component.jsx',
      language: 'react',
      content: 'template content...'
    }
  ]
};
```

### Personalizando Syntax Highlighting

Editar regras em `CodeEditor.tsx`:
```typescript
const syntaxRules: Record<Language, HighlightRule[]> = {
  newLanguage: [
    { 
      regex: /\b(keyword1|keyword2)\b/g, 
      className: 'text-purple-600 font-semibold' 
    }
  ]
};
```

## Integração

### Navegação
- Adicionado ao menu principal da navbar
- Rota: `/interactive/playground`
- Ícone: 🛝 (playground emoji)

### Estilo e Design
- Seguindo o design system do portfólio
- Tema escuro para o editor (VS Code style)
- Layout responsivo e adaptável
- Transições e animações suaves

### Performance
- Lazy loading de componentes pesados
- Debounce em atualizações do preview
- Virtualização para listas grandes
- Code splitting por rota

## Segurança

### Isolamento de Código
- Execução em iframe com sandbox
- Restrições de same-origin policy
- Limpeza de URLs blob após uso

### Validação de Input
- Sanitização de código antes da execução
- Limites de tamanho de arquivo
- Prevenção de código malicioso

## Melhorias Futuras

### Funcionalidades Avançadas
1. **Colaboração em Tempo Real**: Edição simultânea por múltiplos usuários
2. **Versionamento**: Histórico de mudanças e rollback
3. **Temas do Editor**: Múltiplos temas (VS Code, Sublime, etc.)
4. **Intellisense**: Auto-complete inteligente baseado em contexto
5. **Debugging**: Breakpoints e step-by-step debugging
6. **Package Manager**: Instalação de dependências NPM
7. **Export/Import**: Salvar projetos localmente
8. **Embeds**: Incorporar exemplos em outros sites

### Integrações
1. **GitHub**: Importar repositórios e gists
2. **CodePen/JSFiddle**: Importar projetos externos
3. **StackBlitz**: Integração com editor online
4. **Vercel**: Deploy direto de exemplos

### Melhorias UX
1. **Atalhos de Teclado**: Shortcuts avançados
2. **Split View**: Múltiplos editores lado a lado
3. **Minimap**: Visão geral do código
4. **Search & Replace**: Busca e substituição avançada
5. **Code Formatting**: Prettier integration
6. **Live Share**: Compartilhamento de sessão

## Conclusão

O playground interativo é uma funcionalidade completa que demonstra habilidades técnicas avançadas e proporciona uma experiência rica para visitantes. Combina educação, demonstração e interatividade de forma elegante e funcional, sendo um diferencial significativo no portfólio.
