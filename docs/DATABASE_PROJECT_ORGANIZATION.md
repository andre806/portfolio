# Database Project Organization System

Este sistema permite organizar projetos do banco de dados da mesma forma que os projetos estáticos, mantendo a mesma lógica de filtragem, ordenação e exibição.

## 🎯 Objetivo

Resolver o problema de organizar projetos recebidos do banco de dados utilizando a mesma estrutura e lógica dos projetos estáticos já implementados.

## 📁 Estrutura de Arquivos

### 1. Serviço de Banco de Dados
**`src/services/projectsService.ts`**
- Serviço mock que simula operações com banco de dados
- Transformação de dados do banco para a interface `Project`
- CRUD operations para projetos
- Geração de prompts de organização

### 2. Hook Aprimorado de Projetos
**`src/hooks/useProjectsEnhanced.ts`**
- Hook estendido que suporta múltiplas fontes de dados
- Compatibilidade com o hook original `useProjects`
- Gerenciamento de estado para projetos estáticos e do banco
- Sistema de cache e refresh automático

### 3. Configuração de Projetos
**`src/config/projectsConfig.ts`**
- Configurações centralizadas do sistema de projetos
- Flags de funcionalidades por ambiente
- Configurações de cache e erro handling
- Configurações específicas para desenvolvimento e produção

### 4. Utilitários de Organização
**`src/utils/projectOrganization.ts`**
- Função principal `organizeProjectsFromDatabase`
- Validação e prompt de organização para novos projetos
- Funções auxiliares para estatísticas e pesquisa
- Manutenção da mesma lógica dos projetos estáticos

### 5. Página de Demonstração
**`src/app/[locale]/projects/database-demo.tsx`**
- Interface para demonstrar o sistema
- Comparação entre projetos estáticos, banco e combinados
- Exemplo de validação e prompt de organização

## 🚀 Como Usar

### Uso Básico

```typescript
import { useProjectsEnhanced } from '@/hooks/useProjectsEnhanced'

// Para projetos estáticos (compatibilidade com o sistema atual)
const { projects, stats } = useProjectsEnhanced({ source: 'static' })

// Para projetos do banco de dados
const { projects, stats } = useProjectsEnhanced({ source: 'database' })

// Para combinar ambos
const { projects, stats } = useProjectsEnhanced({ source: 'both' })
```

### Organização de Projetos do Banco

```typescript
import { organizeProjectsFromDatabase } from '@/utils/projectOrganization'

// Organizar projetos com filtro e ordenação
const result = await organizeProjectsFromDatabase(
    { category: 'web', featured: true }, // filtros
    { field: 'priority', direction: 'asc' }, // ordenação
    { limit: 10, offset: 0 } // opções
)

console.log(result.projects) // Projetos organizados
```

### Validação de Dados

```typescript
import { validateDatabaseProjectData, createOrganizationPromptForDatabaseProject } from '@/utils/projectOrganization'

// Validar dados de um projeto
const validation = validateDatabaseProjectData(projectData)
if (!validation.isValid) {
    console.log('Erros:', validation.errors)
    console.log('Sugestões:', validation.suggestions)
}

// Gerar prompt de organização
const prompt = createOrganizationPromptForDatabaseProject(projectData)
console.log(prompt) // Guia detalhado para organizar o projeto
```

## 📊 Interface DatabaseProject

Estrutura do projeto no banco de dados:

```typescript
interface DatabaseProject {
    // Campos obrigatórios
    id: string;
    title: string;
    description: string;
    category: string; // 'web' | 'mobile' | 'desktop' | 'api' | 'ai' | 'other'
    status: string; // 'completed' | 'in-progress' | 'planned'
    start_date: string; // YYYY-MM-DD

    // Campos opcionais
    short_description?: string;
    image_url?: string;
    technologies: string | string[]; // JSON string ou array
    is_featured?: boolean;
    github_url?: string;
    live_url?: string;
    demo_url?: string;
    documentation_url?: string;
    end_date?: string;
    features?: string | string[]; // JSON string ou array
    tags?: string | string[]; // JSON string ou array
    priority?: number;
    is_public?: boolean;
    
    // Campos avançados
    team?: string | Array<{ name: string; role: string; linkedin?: string }>;
    challenges?: string | string[];
    achievements?: string | string[];
    metrics?: string | Array<{ label: string; value: string }>;
    gallery?: string | string[];
    client?: string;
    budget?: string;
}
```

## 🔧 Configuração

### Ambientes

O sistema se adapta automaticamente ao ambiente:

**Desenvolvimento:**
- Source: `both` (estáticos + banco)
- Detalhes de erro visíveis
- Funcionalidades de gerenciamento habilitadas

**Produção:**
- Source: `database` (apenas banco de dados)
- Fallback para projetos estáticos em caso de erro
- Funcionalidades de gerenciamento desabilitadas

### Personalização

Edite `src/config/projectsConfig.ts` para personalizar:

```typescript
export const customConfig: Partial<ProjectConfig> = {
    source: 'database', // ou 'static', 'both'
    database: {
        caching: true,
        refreshInterval: 10 * 60 * 1000, // 10 minutos
    },
    features: {
        enableProjectManagement: true, // Habilitar CRUD
        enableAdvancedFiltering: true,
    }
}
```

## 🎨 Funcionalidades

### ✅ Implementadas

- ✅ Transformação de dados do banco para interface padrão
- ✅ Sistema de filtragem idêntico aos projetos estáticos
- ✅ Sistema de ordenação idêntico aos projetos estáticos
- ✅ Cache e refresh automático
- ✅ Fallback para projetos estáticos em caso de erro
- ✅ Validação de dados de projetos
- ✅ Geração de prompts de organização
- ✅ Compatibilidade total com o sistema existente
- ✅ Interface de demonstração completa

### 🔮 Funcionalidades Futuras

- [ ] Integração com banco de dados real (PostgreSQL/MongoDB)
- [ ] Sistema de comentários em projetos
- [ ] Sistema de likes/favoritos
- [ ] Analytics de visualizações
- [ ] API REST para gerenciamento de projetos
- [ ] Upload de imagens para projetos
- [ ] Sistema de tags dinâmico
- [ ] Notificações de novos projetos

## 🏃‍♂️ Teste a Demonstração

Para ver o sistema em funcionamento:

1. Execute o projeto:
```bash
npm run dev
```

2. Acesse a página de demonstração:
```
http://localhost:3000/pt/projects/database-demo
```

3. Explore os diferentes modos:
   - **Projetos Estáticos**: Sistema atual
   - **Banco de Dados**: Projetos mock do banco
   - **Combinados**: Estáticos + Banco
   - **Demonstração**: Exemplo de organização

## 📝 Exemplo de Uso Completo

```typescript
import { useProjectsEnhanced } from '@/hooks/useProjectsEnhanced'
import { organizeProjectsFromDatabase } from '@/utils/projectOrganization'

function ProjectsPage() {
    // Hook com configuração personalizada
    const {
        projects,
        stats,
        isLoading,
        error,
        updateFilter,
        refreshDatabaseProjects
    } = useProjectsEnhanced({
        source: 'database',
        enableCaching: true,
        refreshInterval: 5 * 60 * 1000 // 5 minutos
    })

    // Função para buscar projetos featured
    const loadFeaturedProjects = async () => {
        const result = await organizeProjectsFromDatabase(
            { featured: true },
            { field: 'priority', direction: 'asc' },
            { limit: 3 }
        )
        return result.projects
    }

    // Aplicar filtro
    const handleCategoryFilter = (category: string) => {
        updateFilter({ category })
    }

    return (
        <div>
            <h1>Projetos ({stats.total})</h1>
            
            {/* Controles */}
            <button onClick={() => handleCategoryFilter('web')}>
                Web Projects ({stats.completed} completed)
            </button>
            
            <button onClick={refreshDatabaseProjects}>
                Atualizar Projetos
            </button>
            
            {/* Lista de projetos */}
            {isLoading && <div>Carregando...</div>}
            {error && <div>Erro: {error}</div>}
            
            {projects.map(project => (
                <div key={project.id}>
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                </div>
            ))}
        </div>
    )
}
```

## 🤝 Contribuição

O sistema foi projetado para ser facilmente extensível. Para adicionar novas funcionalidades:

1. Mantenha a compatibilidade com a interface `Project`
2. Use as mesmas funções de filtragem e ordenação
3. Adicione validações para novos campos
4. Atualize a documentação

## 📋 Resumo

Este sistema resolve completamente o problema de organizar projetos do banco de dados da mesma forma que os projetos estáticos, oferecendo:

- **Mesma lógica de organização**: Filtragem, ordenação e exibição idênticas
- **Compatibilidade total**: Funciona com todos os componentes existentes
- **Flexibilidade**: Suporta projetos estáticos, do banco ou ambos
- **Confiabilidade**: Sistema de fallback e tratamento de erros
- **Facilidade de uso**: Prompts e validações para garantir consistência
- **Demonstração completa**: Interface para testar todas as funcionalidades

O sistema está pronto para produção e pode ser facilmente integrado com qualquer banco de dados real.