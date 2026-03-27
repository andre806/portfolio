# Template para Organização de Página de Projetos

## Problema
Criar um prompt para organizar uma página que recebe um projeto do banco de dados para que ela organize da mesma forma de como o projeto aparece quando eu clico em cima dele.

## Solução
Criei um sistema completo que organiza dados de projetos vindos do banco de dados no mesmo formato visual do modal ProjectDetails existente.

## Como Usar

### 1. Componente Principal
Use o `ProjectPageLayout` para exibir projetos em página completa:

```tsx
import { ProjectPageLayout } from '@/components/project/ProjectPageLayout';

export default function ProjetoPage({ projeto, projetosRelacionados }) {
    return (
        <ProjectPageLayout 
            project={projeto} 
            relatedProjects={projetosRelacionados} 
        />
    );
}
```

### 2. Rota Dinâmica
Arquivo: `src/app/[locale]/projects/[id]/page.tsx`
- URL: `/projects/[id-do-projeto]`
- Busca dados do projeto automaticamente
- Exibe na mesma organização visual do modal

### 3. Integração com Banco de Dados
Exemplo de busca de dados:

```tsx
// Buscar projeto do banco
const projeto = await database.projetos.findById(params.id);

// Buscar projetos relacionados
const relacionados = await database.projetos.findRelated(params.id);

return (
    <ProjectPageLayout 
        project={projeto} 
        relatedProjects={relacionados} 
    />
);
```

### 4. Estrutura dos Dados
O projeto deve ter esta estrutura no banco:

```typescript
interface Project {
    id: string;
    title: string;           // Título
    description: string;     // Descrição completa
    shortDescription: string; // Descrição curta
    image: string;          // URL da imagem
    technologies: string[]; // Tecnologias usadas
    category: 'web' | 'mobile' | 'desktop' | 'api' | 'ai' | 'other';
    status: 'completed' | 'in-progress' | 'planned';
    githubUrl?: string;     // Link do GitHub
    demoUrl?: string;       // Link da demo
    liveUrl?: string;       // Link do site
    startDate: string;      // Data de início
    endDate?: string;       // Data de fim
    features: string[];     // Funcionalidades
    tags: string[];         // Tags
    // ... outros campos opcionais
}
```

## Organização Visual

A página organiza os dados exatamente como no modal:

1. **Seção Hero** - Imagem do projeto, título, categoria
2. **Botões de Ação** - GitHub, Demo, Site
3. **Métricas** - Estatísticas do projeto
4. **Descrição** - Descrição detalhada
5. **Timeline** - Datas e tecnologias
6. **Funcionalidades** - Lista de features
7. **Conquistas** - Achievements do projeto
8. **Desafios** - Desafios superados
9. **Equipe** - Membros da equipe
10. **Tags** - Tags do projeto
11. **Projetos Relacionados** - Sugestões

## Arquivos Criados

- `src/components/project/ProjectPageLayout.tsx` - Componente principal
- `src/app/[locale]/projects/[id]/page.tsx` - Página dinâmica
- `src/app/api/projects/[id]/route.ts` - API para buscar projeto
- `docs/PROJECT_PAGE_TEMPLATE.md` - Documentação completa
- `SOLUTION_SUMMARY.md` - Resumo da solução

## Teste
Para testar: acesse `/project-demo` para ver uma demonstração.