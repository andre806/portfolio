import { BlogPost, Category, Tag, Author } from '../models/BlogPost';

interface BlogStats {
  totalPosts: number;
  totalViews: number;
  totalLikes: number;
  popularPosts: BlogPost[];
  recentPosts: BlogPost[];
  topCategories: Category[];
  topTags: Tag[];
}

// Autor principal
export const mainAuthor: Author = {
  id: 'andre',
  name: 'André',
  avatar: '/profile-photo.png',
  bio: 'Desenvolvedor Full Stack apaixonado por tecnologia, sempre em busca de soluções inovadoras e compartilhamento de conhecimento.',
  social: {
    twitter: '@andre_dev',
    linkedin: 'andre-dev',
    github: 'andre-dev',
    website: 'https://andre.dev'
  }
};

// Categorias do blog
export const blogCategories: Category[] = [
  {
    id: 'react',
    name: 'React',
    slug: 'react',
    description: 'Artigos sobre React, hooks, performance e melhores práticas',
    color: '#61DAFB',
    icon: '⚛️',
    postCount: 8
  },
  {
    id: 'nextjs',
    name: 'Next.js',
    slug: 'nextjs',
    description: 'Framework React para produção: SSR, SSG, API Routes e mais',
    color: '#000000',
    icon: '▲',
    postCount: 6
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    slug: 'typescript',
    description: 'JavaScript com tipagem estática para aplicações robustas',
    color: '#3178C6',
    icon: '📘',
    postCount: 5
  },
  {
    id: 'nodejs',
    name: 'Node.js',
    slug: 'nodejs',
    description: 'Backend JavaScript: APIs, performance, segurança e escalabilidade',
    color: '#339933',
    icon: '🚀',
    postCount: 7
  },
  {
    id: 'frontend',
    name: 'Frontend',
    slug: 'frontend',
    description: 'HTML, CSS, JavaScript e tecnologias de interface',
    color: '#FF6B6B',
    icon: '🎨',
    postCount: 4
  },
  {
    id: 'devops',
    name: 'DevOps',
    slug: 'devops',
    description: 'Deploy, CI/CD, Docker, monitoramento e infraestrutura',
    color: '#4ECDC4',
    icon: '🔧',
    postCount: 3
  }
];

// Tags populares
export const blogTags: Tag[] = [
  { id: 'javascript', name: 'JavaScript', slug: 'javascript', color: '#F7DF1E', postCount: 15 },
  { id: 'react-hooks', name: 'React Hooks', slug: 'react-hooks', color: '#61DAFB', postCount: 8 },
  { id: 'performance', name: 'Performance', slug: 'performance', color: '#FF9500', postCount: 6 },
  { id: 'ssr', name: 'SSR', slug: 'ssr', color: '#000000', postCount: 4 },
  { id: 'api', name: 'API', slug: 'api', color: '#4CAF50', postCount: 7 },
  { id: 'css', name: 'CSS', slug: 'css', color: '#1572B6', postCount: 5 },
  { id: 'tailwindcss', name: 'Tailwind CSS', slug: 'tailwindcss', color: '#06B6D4', postCount: 6 },
  { id: 'prisma', name: 'Prisma', slug: 'prisma', color: '#2D3748', postCount: 3 },
  { id: 'deployment', name: 'Deployment', slug: 'deployment', color: '#FF4785', postCount: 4 },
  { id: 'tutorial', name: 'Tutorial', slug: 'tutorial', color: '#8B5CF6', postCount: 12 }
];

// Posts do blog
export const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'Como otimizar performance em aplicações React com React.memo e useMemo',
    slug: 'otimizar-performance-react-memo-usememo',
    excerpt: 'Aprenda técnicas avançadas para melhorar significativamente a performance de suas aplicações React usando React.memo, useMemo e useCallback.',
    content: `# Como otimizar performance em aplicações React

Performance é crucial em aplicações React modernas. Neste artigo, vamos explorar técnicas avançadas para otimização.

## React.memo

O React.memo é um Higher-Order Component que previne re-renderizações desnecessárias:

\`\`\`jsx
const ExpensiveComponent = React.memo(({ data, onUpdate }) => {
  return (
    <div>
      {data.map(item => (
        <div key={item.id}>{item.name}</div>
      ))}
    </div>
  );
});
\`\`\`

## useMemo para cálculos custosos

\`\`\`jsx
const ExpensiveCalculation = ({ items }) => {
  const total = useMemo(() => {
    return items.reduce((sum, item) => sum + item.price, 0);
  }, [items]);

  return <div>Total: R$ {total}</div>;
};
\`\`\`

## useCallback para funções estáveis

\`\`\`jsx
const Parent = ({ data }) => {
  const handleUpdate = useCallback((id, newValue) => {
    setData(prev => prev.map(item => 
      item.id === id ? { ...item, value: newValue } : item
    ));
  }, []);

  return (
    <div>
      {data.map(item => (
        <Child 
          key={item.id} 
          item={item} 
          onUpdate={handleUpdate} 
        />
      ))}
    </div>
  );
};
\`\`\`

## Dicas importantes

1. **Não use useMemo/useCallback prematuramente** - Profile primeiro
2. **React.memo funciona apenas para props primitivas** por padrão
3. **Use React DevTools Profiler** para identificar gargalos
4. **Considere code splitting** para componentes pesados

## Conclusão

A otimização de performance em React é uma arte que requer medição e experimentação. Use essas técnicas com sabedoria!`,
    author: mainAuthor,
    publishedAt: '2024-12-20T10:00:00Z',
    status: 'published',
    featured: true,
    coverImage: '/blog/react-performance.svg',
    readingTime: 8,
    views: 1250,
    likes: 89,
    categories: [blogCategories[0]], // React
    tags: [blogTags[0], blogTags[1], blogTags[2]], // JavaScript, React Hooks, Performance
    seo: {
      metaTitle: 'Como otimizar performance em aplicações React - Guia Completo',
      metaDescription: 'Aprenda técnicas avançadas de otimização React: React.memo, useMemo, useCallback e mais.',
      keywords: ['react', 'performance', 'otimização', 'memo', 'usememo', 'usecallback'],
      ogImage: '/blog/react-performance-og.jpg'
    },
    relatedPosts: ['2', '3']
  },
  {
    id: '2',
    title: 'Next.js 14: Novidades e como migrar seu projeto',
    slug: 'nextjs-14-novidades-migracao',
    excerpt: 'Descubra as principais novidades do Next.js 14 e um guia passo-a-passo para migrar seus projetos existentes.',
    content: `# Next.js 14: Novidades e Migração

O Next.js 14 trouxe mudanças importantes. Vamos explorar as novidades e como migrar.

## Principais novidades

### 1. App Router estável
O App Router agora é a recomendação oficial:

\`\`\`jsx
// app/page.tsx
export default function HomePage() {
  return <h1>Bem-vindo ao Next.js 14!</h1>;
}
\`\`\`

### 2. Server Actions
Ações do servidor simplificadas:

\`\`\`jsx
// app/actions.ts
'use server'

export async function createPost(formData: FormData) {
  const title = formData.get('title') as string;
  // Lógica do servidor
}
\`\`\`

### 3. Turbopack (experimental)
Bundler mais rápido para desenvolvimento:

\`\`\`bash
npm run dev -- --turbo
\`\`\`

## Guia de migração

### Passo 1: Atualizar dependências
\`\`\`bash
npm install next@14 react@18 react-dom@18
\`\`\`

### Passo 2: Migrar para App Router
1. Crie o diretório \`app/\`
2. Mova suas páginas
3. Atualize o layout

### Passo 3: Atualizar configurações
\`\`\`js
// next.config.js
const nextConfig = {
  experimental: {
    appDir: true
  }
}
\`\`\`

## Conclusão

Next.js 14 representa um marco importante. A migração vale a pena pelos benefícios de performance e DX.`,
    author: mainAuthor,
    publishedAt: '2024-12-15T14:30:00Z',
    status: 'published',
    featured: true,
    coverImage: '/blog/nextjs-14.svg',
    readingTime: 6,
    views: 980,
    likes: 67,
    categories: [blogCategories[1]], // Next.js
    tags: [blogTags[0], blogTags[3], blogTags[9]], // JavaScript, SSR, Tutorial
    seo: {
      metaTitle: 'Next.js 14: Guia completo das novidades e migração',
      metaDescription: 'Descubra as novidades do Next.js 14: App Router, Server Actions, Turbopack e guia de migração.',
      keywords: ['nextjs', 'next.js 14', 'app router', 'server actions', 'migração'],
      ogImage: '/blog/nextjs-14-og.jpg'
    },
    relatedPosts: ['1', '4']
  },
  {
    id: '3',
    title: 'TypeScript: Tipos avançados que todo desenvolvedor deveria conhecer',
    slug: 'typescript-tipos-avancados',
    excerpt: 'Explore tipos avançados do TypeScript como Conditional Types, Mapped Types e Template Literal Types com exemplos práticos.',
    content: `# TypeScript: Tipos Avançados

TypeScript oferece tipos avançados poderosos. Vamos explorar os mais úteis.

## Conditional Types

\`\`\`typescript
type IsArray<T> = T extends Array<any> ? true : false;

type Test1 = IsArray<string[]>; // true
type Test2 = IsArray<number>;   // false
\`\`\`

## Mapped Types

\`\`\`typescript
type Optional<T> = {
  [P in keyof T]?: T[P];
};

interface User {
  name: string;
  email: string;
}

type PartialUser = Optional<User>;
// { name?: string; email?: string; }
\`\`\`

## Template Literal Types

\`\`\`typescript
type EventName<T extends string> = \`on\${Capitalize<T>}\`;

type ClickEvent = EventName<'click'>; // 'onClick'
type ChangeEvent = EventName<'change'>; // 'onChange'
\`\`\`

## Utility Types práticos

\`\`\`typescript
// Pick específico
type UserBasic = Pick<User, 'name' | 'email'>;

// Omit específico
type UserWithoutId = Omit<User, 'id'>;

// Record para mapeamentos
type StatusMessages = Record<'loading' | 'error' | 'success', string>;
\`\`\`

## Exemplo prático: API Client

\`\`\`typescript
interface APIResponse<T> {
  data: T;
  status: number;
  message: string;
}

type APIEndpoints = {
  '/users': User[];
  '/posts': Post[];
  '/comments': Comment[];
};

type APIClient = {
  [K in keyof APIEndpoints]: () => Promise<APIResponse<APIEndpoints[K]>>;
};
\`\`\`

Esses tipos avançados tornam seu código mais seguro e expressivo!`,
    author: mainAuthor,
    publishedAt: '2024-12-10T16:00:00Z',
    status: 'published',
    featured: false,
    coverImage: '/blog/typescript-advanced.svg',
    readingTime: 10,
    views: 756,
    likes: 45,
    categories: [blogCategories[2]], // TypeScript
    tags: [blogTags[0], blogTags[9]], // JavaScript, Tutorial
    seo: {
      metaTitle: 'TypeScript Tipos Avançados: Guia Completo com Exemplos',
      metaDescription: 'Aprenda tipos avançados do TypeScript: Conditional Types, Mapped Types, Template Literals e mais.',
      keywords: ['typescript', 'tipos avançados', 'conditional types', 'mapped types'],
      ogImage: '/blog/typescript-advanced-og.jpg'
    },
    relatedPosts: ['4', '5']
  },
  {
    id: '4',
    title: 'Construindo APIs REST eficientes com Node.js e Express',
    slug: 'apis-rest-nodejs-express',
    excerpt: 'Aprenda a criar APIs REST robustas e eficientes usando Node.js, Express, validação, autenticação e melhores práticas.',
    content: `# APIs REST eficientes com Node.js

Vamos construir APIs REST robustas e escaláveis com Node.js e Express.

## Estrutura base

\`\`\`javascript
const express = require('express');
const app = express();

// Middlewares essenciais
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());

// Rate limiting
const rateLimit = require('express-rate-limit');
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 100 // máximo 100 requests por IP
});
app.use(limiter);
\`\`\`

## Validação com Joi

\`\`\`javascript
const Joi = require('joi');

const userSchema = Joi.object({
  name: Joi.string().min(2).max(50).required(),
  email: Joi.string().email().required(),
  age: Joi.number().min(18).max(120)
});

const validateUser = (req, res, next) => {
  const { error } = userSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ 
      error: error.details[0].message 
    });
  }
  next();
};
\`\`\`

## Autenticação JWT

\`\`\`javascript
const jwt = require('jsonwebtoken');

const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: '24h' }
  );
};

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Token requerido' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Token inválido' });
    req.user = user;
    next();
  });
};
\`\`\`

## Error Handling centralizado

\`\`\`javascript
class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;
  }
}

const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  // Log do erro
  console.error(err);

  // Mongoose bad ObjectId
  if (err.name === 'CastError') {
    const message = 'Recurso não encontrado';
    error = new AppError(message, 404);
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    const message = 'Recurso já existe';
    error = new AppError(message, 400);
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || 'Erro interno do servidor'
  });
};
\`\`\`

## Rotas organizadas

\`\`\`javascript
// routes/users.js
const express = require('express');
const router = express.Router();

// GET /api/users
router.get('/', async (req, res, next) => {
  try {
    const users = await User.find()
      .select('-password')
      .limit(20)
      .sort({ createdAt: -1 });
    
    res.json({
      success: true,
      count: users.length,
      data: users
    });
  } catch (error) {
    next(error);
  }
});

// POST /api/users
router.post('/', validateUser, async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    const token = generateToken(user);
    
    res.status(201).json({
      success: true,
      token,
      data: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
\`\`\`

## Documentação com Swagger

\`\`\`javascript
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Documentation',
      version: '1.0.0',
    },
  },
  apis: ['./routes/*.js'],
};

const specs = swaggerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
\`\`\`

## Performance e Monitoramento

\`\`\`javascript
const compression = require('compression');
const morgan = require('morgan');

// Compressão gzip
app.use(compression());

// Logging
app.use(morgan('combined'));

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});
\`\`\`

Essas práticas garantem APIs robustas, seguras e escaláveis!`,
    author: mainAuthor,
    publishedAt: '2024-12-05T11:15:00Z',
    status: 'published',
    featured: false,
    coverImage: '/blog/nodejs-api.svg',
    readingTime: 12,
    views: 634,
    likes: 38,
    categories: [blogCategories[3]], // Node.js
    tags: [blogTags[0], blogTags[4], blogTags[9]], // JavaScript, API, Tutorial
    seo: {
      metaTitle: 'APIs REST com Node.js: Guia Completo e Melhores Práticas',
      metaDescription: 'Aprenda a criar APIs REST robustas com Node.js, Express, autenticação JWT e melhores práticas.',
      keywords: ['nodejs', 'express', 'api rest', 'jwt', 'autenticação'],
      ogImage: '/blog/nodejs-api-og.jpg'
    },
    relatedPosts: ['5', '6']
  },
  {
    id: '5',
    title: 'CSS Grid vs Flexbox: Quando usar cada um',
    slug: 'css-grid-vs-flexbox',
    excerpt: 'Entenda as diferenças entre CSS Grid e Flexbox e saiba quando usar cada tecnologia de layout para criar interfaces modernas.',
    content: `# CSS Grid vs Flexbox: Guia Definitivo

Duas tecnologias poderosas para layout. Vamos entender quando usar cada uma.

## Flexbox: Para layouts unidimensionais

### Cenários ideais:
- Navegação horizontal
- Cards em linha
- Centralização de elementos
- Distribuição de espaço

\`\`\`css
.navigation {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}

.card-container {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.card {
  flex: 1 1 300px; /* grow shrink basis */
}
\`\`\`

## CSS Grid: Para layouts bidimensionais

### Cenários ideais:
- Layouts complexos de página
- Grids de produtos
- Dashboard com áreas definidas
- Sobreposição de elementos

\`\`\`css
.page-layout {
  display: grid;
  grid-template-areas:
    "header header header"
    "sidebar main aside"
    "footer footer footer";
  grid-template-columns: 250px 1fr 200px;
  grid-template-rows: auto 1fr auto;
  min-height: 100vh;
}

.header { grid-area: header; }
.sidebar { grid-area: sidebar; }
.main { grid-area: main; }
.aside { grid-area: aside; }
.footer { grid-area: footer; }
\`\`\`

## Combinando ambos

\`\`\`css
/* Grid para layout geral */
.products {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

/* Flexbox para conteúdo do card */
.product-card {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.product-content {
  flex: 1; /* Cresce para preencher espaço */
}

.product-actions {
  margin-top: auto; /* Fica sempre no final */
}
\`\`\`

## Exemplos práticos

### Navbar responsiva (Flexbox)
\`\`\`css
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
}

.nav-links {
  display: flex;
  gap: 2rem;
  list-style: none;
}

@media (max-width: 768px) {
  .navbar {
    flex-direction: column;
    gap: 1rem;
  }
}
\`\`\`

### Dashboard (Grid)
\`\`\`css
.dashboard {
  display: grid;
  grid-template-columns: 250px 1fr;
  grid-template-rows: 60px 1fr;
  height: 100vh;
}

.widgets {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  padding: 1rem;
}
\`\`\`

## Dicas importantes

1. **Flexbox para componentes**, Grid para layouts
2. **Use Flexbox** quando precisar de apenas uma dimensão
3. **Use Grid** para layouts complexos bidimensionais
4. **Combine ambos** para máxima flexibilidade
5. **Considere o suporte** do navegador (ambos têm ótimo suporte)

## Browser DevTools

Use as ferramentas do navegador:
- Firefox Grid Inspector
- Chrome Flexbox Inspector
- Visualização de gaps e áreas

## Conclusão

Não é Grid OU Flexbox - é Grid E Flexbox! Cada um tem seu lugar e brilha em cenários específicos.`,
    author: mainAuthor,
    publishedAt: '2024-11-28T09:45:00Z',
    status: 'published',
    featured: false,
    coverImage: '/blog/css-grid-flexbox.svg',
    readingTime: 7,
    views: 892,
    likes: 56,
    categories: [blogCategories[4]], // Frontend
    tags: [blogTags[5], blogTags[9]], // CSS, Tutorial
    seo: {
      metaTitle: 'CSS Grid vs Flexbox: Guia Completo para Layouts Modernos',
      metaDescription: 'Aprenda quando usar CSS Grid e Flexbox com exemplos práticos e melhores práticas para layouts.',
      keywords: ['css grid', 'flexbox', 'layout', 'css', 'frontend'],
      ogImage: '/blog/css-grid-flexbox-og.jpg'
    },
    relatedPosts: ['6', '1']
  },
  {
    id: '6',
    title: 'Deploy automatizado com GitHub Actions e Vercel',
    slug: 'deploy-automatizado-github-actions-vercel',
    excerpt: 'Configure um pipeline completo de CI/CD usando GitHub Actions para deploy automático na Vercel com testes e otimizações.',
    content: `# Deploy Automatizado: GitHub Actions + Vercel

Vamos configurar um pipeline completo de CI/CD para deploy automatizado.

## Estrutura do workflow

\`\`\`.yml
# .github/workflows/deploy.yml
name: Deploy to Vercel

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

env:
  VERCEL_ORG_ID: \${{ secrets.VERCEL_ORG_ID }}
  VERCEL_PROJECT_ID: \${{ secrets.VERCEL_PROJECT_ID }}

jobs:
  test:
    runs-on: ubuntu-latest
    
    steps:
      - uses: actions/checkout@v4
      
      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run tests
        run: npm run test:ci
      
      - name: Run linting
        run: npm run lint
      
      - name: Type checking
        run: npm run type-check
      
      - name: Build
        run: npm run build

  deploy-preview:
    needs: test
    runs-on: ubuntu-latest
    if: github.event_name == 'pull_request'
    
    steps:
      - uses: actions/checkout@v4
      
      - name: Install Vercel CLI
        run: npm install --global vercel@latest
      
      - name: Pull Vercel Environment
        run: vercel pull --yes --environment=preview --token=\${{ secrets.VERCEL_TOKEN }}
      
      - name: Build Project
        run: vercel build --token=\${{ secrets.VERCEL_TOKEN }}
      
      - name: Deploy to Vercel
        id: deploy
        run: |
          url=\$(vercel deploy --prebuilt --token=\${{ secrets.VERCEL_TOKEN }})
          echo "preview_url=\$url" >> \$GITHUB_OUTPUT
      
      - name: Comment PR
        uses: actions/github-script@v7
        with:
          script: |
            github.rest.issues.createComment({
              issue_number: context.issue.number,
              owner: context.repo.owner,
              repo: context.repo.repo,
              body: '🚀 Preview deploy: \${{ steps.deploy.outputs.preview_url }}'
            })

  deploy-production:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    
    steps:
      - uses: actions/checkout@v4
      
      - name: Install Vercel CLI
        run: npm install --global vercel@latest
      
      - name: Pull Vercel Environment
        run: vercel pull --yes --environment=production --token=\${{ secrets.VERCEL_TOKEN }}
      
      - name: Build Project
        run: vercel build --prod --token=\${{ secrets.VERCEL_TOKEN }}
      
      - name: Deploy to Vercel
        run: vercel deploy --prebuilt --prod --token=\${{ secrets.VERCEL_TOKEN }}
      
      - name: Notify Slack
        uses: 8398a7/action-slack@v3
        with:
          status: success
          text: '✅ Deploy realizado com sucesso!'
        env:
          SLACK_WEBHOOK_URL: \${{ secrets.SLACK_WEBHOOK }}
\`\`\`

## Scripts no package.json

\`\`\`json
{
  "scripts": {
    "test": "jest",
    "test:ci": "jest --ci --coverage --watchAll=false",
    "test:watch": "jest --watch",
    "lint": "eslint . --ext .js,.jsx,.ts,.tsx",
    "lint:fix": "eslint . --ext .js,.jsx,.ts,.tsx --fix",
    "type-check": "tsc --noEmit",
    "build": "next build",
    "analyze": "cross-env ANALYZE=true next build"
  }
}
\`\`\`

## Configuração de testes

\`\`\`javascript
// jest.config.js
const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './',
})

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jest-environment-jsdom',
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/*.stories.{js,jsx,ts,tsx}',
  ],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },
  },
}

module.exports = createJestConfig(customJestConfig)
\`\`\`

## ESLint configuração

\`\`\`javascript
// .eslintrc.js
module.exports = {
  extends: [
    'next/core-web-vitals',
    '@typescript-eslint/recommended',
    'prettier'
  ],
  rules: {
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/no-explicit-any': 'warn',
    'prefer-const': 'error',
    'no-console': 'warn'
  },
  overrides: [
    {
      files: ['**/*.test.{js,jsx,ts,tsx}'],
      rules: {
        'no-console': 'off'
      }
    }
  ]
}
\`\`\`

## Secrets necessários

Configure no GitHub Repository Settings > Secrets:

\`\`\`
VERCEL_TOKEN=xxx
VERCEL_ORG_ID=xxx
VERCEL_PROJECT_ID=xxx
SLACK_WEBHOOK=xxx (opcional)
\`\`\`

## Vercel configuração

\`\`\`json
// vercel.json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "framework": "nextjs",
  "installCommand": "npm ci",
  "env": {
    "CUSTOM_KEY": "value"
  },
  "build": {
    "env": {
      "NEXT_PUBLIC_API_URL": "@api-url"
    }
  },
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        }
      ]
    }
  ]
}
\`\`\`

## Otimizações avançadas

### Bundle analyzer
\`\`\`javascript
// next.config.js
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

module.exports = withBundleAnalyzer({
  // configurações do Next.js
})
\`\`\`

### Performance budgets
\`\`\`.yml
- name: Lighthouse CI
  uses: treosh/lighthouse-ci-action@v9
  with:
    configPath: './lighthouserc.json'
\`\`\`

## Monitoramento pós-deploy

\`\`\`javascript
// Webhook para notificações
const notifyDeploy = async (status, url) => {
  await fetch(process.env.WEBHOOK_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      text: \`Deploy \${status}: \${url}\`,
      timestamp: new Date().toISOString()
    })
  });
};
\`\`\`

Com esse setup, você tem um pipeline completo: testes → build → deploy → notificação!`,
    author: mainAuthor,
    publishedAt: '2024-11-20T13:20:00Z',
    status: 'published',
    featured: false,
    coverImage: '/blog/github-actions-vercel.svg',
    readingTime: 9,
    views: 445,
    likes: 32,
    categories: [blogCategories[5]], // DevOps
    tags: [blogTags[8], blogTags[9]], // Deployment, Tutorial
    seo: {
      metaTitle: 'Deploy Automatizado: GitHub Actions + Vercel - Guia Completo',
      metaDescription: 'Configure CI/CD completo com GitHub Actions e Vercel: testes, deploy automático e monitoramento.',
      keywords: ['github actions', 'vercel', 'ci/cd', 'deploy', 'devops'],
      ogImage: '/blog/github-actions-vercel-og.jpg'
    },
    relatedPosts: ['4', '5']
  }
];

// Função para obter posts por categoria
export const getPostsByCategory = (categorySlug: string): BlogPost[] => {
  return blogPosts.filter(post =>
    post.categories.some(cat => cat.slug === categorySlug)
  );
};

// Função para obter posts por tag
export const getPostsByTag = (tagSlug: string): BlogPost[] => {
  return blogPosts.filter(post =>
    post.tags.some(tag => tag.slug === tagSlug)
  );
};

// Função para obter posts relacionados
export const getRelatedPosts = (postId: string, limit: number = 3): BlogPost[] => {
  const currentPost = blogPosts.find(post => post.id === postId);
  if (!currentPost) return [];

  const related = blogPosts
    .filter(post => post.id !== postId && post.status === 'published')
    .filter(post => {
      // Posts da mesma categoria
      const sameCategory = post.categories.some(cat =>
        currentPost.categories.some(currentCat => currentCat.id === cat.id)
      );

      // Posts com tags similares
      const similarTags = post.tags.some(tag =>
        currentPost.tags.some(currentTag => currentTag.id === tag.id)
      );

      return sameCategory || similarTags;
    })
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, limit);

  return related;
};

// Função para buscar posts
export const searchPosts = (query: string): BlogPost[] => {
  const searchTerm = query.toLowerCase();

  return blogPosts.filter(post =>
    post.status === 'published' && (
      post.title.toLowerCase().includes(searchTerm) ||
      post.excerpt.toLowerCase().includes(searchTerm) ||
      post.content.toLowerCase().includes(searchTerm) ||
      post.categories.some(cat => cat.name.toLowerCase().includes(searchTerm)) ||
      post.tags.some(tag => tag.name.toLowerCase().includes(searchTerm))
    )
  );
};

// Função para obter estatísticas do blog
export const getBlogStats = (): BlogStats => {
  const publishedPosts = blogPosts.filter(post => post.status === 'published');

  return {
    totalPosts: publishedPosts.length,
    totalViews: publishedPosts.reduce((sum, post) => sum + (post.views || 0), 0),
    totalLikes: publishedPosts.reduce((sum, post) => sum + (post.likes || 0), 0),
    popularPosts: publishedPosts
      .sort((a, b) => (b.views || 0) - (a.views || 0))
      .slice(0, 5),
    recentPosts: publishedPosts
      .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
      .slice(0, 5),
    topCategories: blogCategories
      .sort((a, b) => (b.postCount || 0) - (a.postCount || 0))
      .slice(0, 5),
    topTags: blogTags
      .sort((a, b) => (b.postCount || 0) - (a.postCount || 0))
      .slice(0, 10)
  };
};

export default blogPosts;