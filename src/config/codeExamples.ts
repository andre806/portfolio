/**
 * Dados de exemplo para o playground interativo
 */

import { CodeExample, CodeTemplate } from '@/models/CodeExample';

export const codeExamples: CodeExample[] = [
  {
    id: 'react-counter',
    title: 'React Counter Component',
    description: 'Um componente contador simples com React e hooks',
    category: 'React Components',
    difficulty: 'beginner',
    framework: 'react',
    tags: ['react', 'hooks', 'useState', 'counter'],
    files: [
      {
        id: 'app-js',
        name: 'App.jsx',
        language: 'react',
        content: `import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  const increment = () => setCount(count + 1);
  const decrement = () => setCount(count - 1);
  const reset = () => setCount(0);

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold text-center mb-4">
        Counter: {count}
      </h2>
      <div className="flex gap-3 justify-center">
        <button 
          onClick={decrement}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          -
        </button>
        <button 
          onClick={reset}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
        >
          Reset
        </button>
        <button 
          onClick={increment}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          +
        </button>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <Counter />
    </div>
  );
}`
      }
    ],
    previewConfig: {
      showPreview: true,
      autoRun: true,
      dependencies: ['react', 'tailwindcss']
    },
    author: {
      name: 'André',
      avatar: '/profile-avatar.png'
    },
    stats: {
      views: 245,
      likes: 18,
      forks: 7
    },
    createdAt: '2024-01-15',
    featured: true
  },
  {
    id: 'todo-app',
    title: 'Todo App with LocalStorage',
    description: 'Uma aplicação de tarefas completa com persistência local',
    category: 'Full Applications',
    difficulty: 'intermediate',
    framework: 'react',
    tags: ['react', 'localStorage', 'crud', 'hooks'],
    files: [
      {
        id: 'app-jsx',
        name: 'App.jsx',
        language: 'react',
        content: `import { useState, useEffect } from 'react';

function TodoApp() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');

  // Carregar todos do localStorage
  useEffect(() => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
  }, []);

  // Salvar todos no localStorage
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (inputValue.trim()) {
      setTodos([...todos, {
        id: Date.now(),
        text: inputValue,
        completed: false
      }]);
      setInputValue('');
    }
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-2xl font-bold text-center mb-6">Todo App</h1>
      
      <div className="flex mb-4">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addTodo()}
          placeholder="Add a new todo..."
          className="flex-1 px-3 py-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={addTodo}
          className="px-4 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600"
        >
          Add
        </button>
      </div>

      <div className="space-y-2">
        {todos.map(todo => (
          <div key={todo.id} className="flex items-center gap-2 p-2 border rounded">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
              className="rounded"
            />
            <span className={\`flex-1 \${todo.completed ? 'line-through text-gray-500' : ''}\`}>
              {todo.text}
            </span>
            <button
              onClick={() => deleteTodo(todo.id)}
              className="px-2 py-1 bg-red-500 text-white rounded text-sm hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        ))}
      </div>

      {todos.length === 0 && (
        <p className="text-center text-gray-500 mt-4">No todos yet. Add one above!</p>
      )}
    </div>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <TodoApp />
    </div>
  );
}`
      }
    ],
    previewConfig: {
      showPreview: true,
      autoRun: true,
      dependencies: ['react', 'tailwindcss']
    },
    author: {
      name: 'André',
      avatar: '/profile-avatar.svg'
    },
    stats: {
      views: 387,
      likes: 42,
      forks: 15
    },
    createdAt: '2024-01-10',
    featured: true
  },
  {
    id: 'api-fetch',
    title: 'API Data Fetching',
    description: 'Exemplo de como fazer fetch de dados de APIs com loading e error handling',
    category: 'API Integration',
    difficulty: 'intermediate',
    framework: 'react',
    tags: ['api', 'fetch', 'async', 'loading', 'error-handling'],
    files: [
      {
        id: 'app-jsx',
        name: 'App.jsx',
        language: 'react',
        content: `import { useState, useEffect } from 'react';

function UserCard({ user }) {
  return (
    <div className="bg-white p-4 rounded-lg shadow border">
      <div className="flex items-center gap-3">
        <img 
          src={\`https://ui-avatars.com/api/?name=\${user.name}&background=random\`}
          alt={user.name}
          className="w-12 h-12 rounded-full"
        />
        <div>
          <h3 className="font-semibold">{user.name}</h3>
          <p className="text-gray-600 text-sm">{user.email}</p>
          <p className="text-gray-500 text-xs">{user.company.name}</p>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      
      if (!response.ok) {
        throw new Error('Failed to fetch users');
      }
      
      const data = await response.json();
      setUsers(data.slice(0, 6)); // Limite para exemplo
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading users...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            Error: {error}
          </div>
          <button 
            onClick={fetchUsers}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Users Directory</h1>
          <p className="text-gray-600">Fetched from JSONPlaceholder API</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {users.map(user => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>

        <div className="text-center mt-8">
          <button 
            onClick={fetchUsers}
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Refresh Users
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;`
      }
    ],
    previewConfig: {
      showPreview: true,
      autoRun: true,
      dependencies: ['react']
    },
    author: {
      name: 'André',
      avatar: '/profile-avatar.svg'
    },
    stats: {
      views: 189,
      likes: 23,
      forks: 8
    },
    createdAt: '2024-01-08',
    featured: false
  },
  {
    id: 'css-animations',
    title: 'CSS Animations Showcase',
    description: 'Demonstração de animações CSS modernas e efeitos visuais',
    category: 'CSS & Styling',
    difficulty: 'intermediate',
    framework: 'vanilla',
    tags: ['css', 'animations', 'keyframes', 'transforms'],
    files: [
      {
        id: 'index-html',
        name: 'index.html',
        language: 'html',
        content: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CSS Animations</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="container">
        <h1 class="title">CSS Animations Showcase</h1>
        
        <div class="animations-grid">
            <div class="animation-card">
                <h3>Bounce</h3>
                <div class="demo-box bounce"></div>
            </div>
            
            <div class="animation-card">
                <h3>Rotate</h3>
                <div class="demo-box rotate"></div>
            </div>
            
            <div class="animation-card">
                <h3>Pulse</h3>
                <div class="demo-box pulse"></div>
            </div>
            
            <div class="animation-card">
                <h3>Slide</h3>
                <div class="demo-box slide"></div>
            </div>
            
            <div class="animation-card">
                <h3>Scale</h3>
                <div class="demo-box scale"></div>
            </div>
            
            <div class="animation-card">
                <h3>Glow</h3>
                <div class="demo-box glow"></div>
            </div>
        </div>
    </div>
</body>
</html>`
      },
      {
        id: 'styles-css',
        name: 'styles.css',
        language: 'css',
        content: `* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Arial', sans-serif;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    min-height: 100vh;
    padding: 20px;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
}

.title {
    text-align: center;
    color: white;
    font-size: 2.5rem;
    margin-bottom: 2rem;
    text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
}

.animations-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 2rem;
}

.animation-card {
    background: white;
    padding: 2rem;
    border-radius: 15px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.2);
    text-align: center;
    transition: transform 0.3s ease;
}

.animation-card:hover {
    transform: translateY(-5px);
}

.animation-card h3 {
    margin-bottom: 1rem;
    color: #333;
    font-size: 1.2rem;
}

.demo-box {
    width: 60px;
    height: 60px;
    margin: 0 auto;
    border-radius: 10px;
    background: linear-gradient(45deg, #ff6b6b, #4ecdc4);
}

/* Animações */
.bounce {
    animation: bounce 2s infinite;
}

@keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-20px); }
}

.rotate {
    animation: rotate 3s linear infinite;
}

@keyframes rotate {
    from { transform: rotate(0deg); }
    to { transform: rotate(360deg); }
}

.pulse {
    animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.2); }
}

.slide {
    animation: slide 3s ease-in-out infinite;
}

@keyframes slide {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(20px); }
    75% { transform: translateX(-20px); }
}

.scale {
    animation: scale 2s ease-in-out infinite;
}

@keyframes scale {
    0%, 100% { transform: scale(1) rotate(0deg); }
    50% { transform: scale(1.3) rotate(180deg); }
}

.glow {
    animation: glow 2s ease-in-out infinite;
}

@keyframes glow {
    0%, 100% { 
        box-shadow: 0 0 5px rgba(255, 107, 107, 0.5);
        filter: brightness(1);
    }
    50% { 
        box-shadow: 0 0 25px rgba(255, 107, 107, 0.8);
        filter: brightness(1.2);
    }
}

/* Responsividade */
@media (max-width: 768px) {
    .title {
        font-size: 2rem;
    }
    
    .animations-grid {
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 1rem;
    }
    
    .animation-card {
        padding: 1.5rem;
    }
}`
      }
    ],
    previewConfig: {
      showPreview: true,
      autoRun: true
    },
    author: {
      name: 'André',
      avatar: '/profile-avatar.svg'
    },
    stats: {
      views: 156,
      likes: 31,
      forks: 12
    },
    createdAt: '2024-01-05',
    featured: false
  },
  {
    id: 'form-validation',
    title: 'Advanced Form Validation',
    description: 'Formulário com validação avançada, máscaras e feedback visual',
    category: 'Forms & Validation',
    difficulty: 'advanced',
    framework: 'react',
    tags: ['react', 'forms', 'validation', 'regex', 'hooks'],
    files: [
      {
        id: 'app-jsx',
        name: 'App.jsx',
        language: 'react',
        content: `import { useState } from 'react';

// Validadores
const validators = {
  required: (value) => value.trim() !== '' || 'Este campo é obrigatório',
  email: (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value) || 'Email inválido';
  },
  minLength: (min) => (value) => 
    value.length >= min || \`Mínimo de \${min} caracteres\`,
  phone: (value) => {
    const phoneRegex = /^\(\d{2}\) \d{4,5}-\d{4}$/;
    return phoneRegex.test(value) || 'Telefone inválido';
  }
};

// Hook personalizado para formulários
function useForm(initialValues, validationRules) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const setValue = (name, value) => {
    setValues(prev => ({ ...prev, [name]: value }));
    
    // Validar campo em tempo real se já foi tocado
    if (touched[name]) {
      validateField(name, value);
    }
  };

  const setTouched = (name) => {
    setTouched(prev => ({ ...prev, [name]: true }));
    validateField(name, values[name]);
  };

  const validateField = (name, value) => {
    const rules = validationRules[name];
    if (!rules) return;

    for (const rule of rules) {
      const result = rule(value);
      if (result !== true) {
        setErrors(prev => ({ ...prev, [name]: result }));
        return false;
      }
    }
    
    setErrors(prev => ({ ...prev, [name]: null }));
    return true;
  };

  const validateAll = () => {
    let isValid = true;
    const newErrors = {};

    Object.keys(validationRules).forEach(name => {
      const rules = validationRules[name];
      const value = values[name] || '';
      
      for (const rule of rules) {
        const result = rule(value);
        if (result !== true) {
          newErrors[name] = result;
          isValid = false;
          break;
        }
      }
    });

    setErrors(newErrors);
    setTouched(Object.keys(validationRules).reduce((acc, key) => ({ ...acc, [key]: true }), {}));
    return isValid;
  };

  return {
    values,
    errors,
    touched,
    setValue,
    setTouched,
    validateAll,
    isValid: Object.keys(errors).every(key => !errors[key])
  };
}

// Máscara para telefone
function phoneMask(value) {
  return value
    .replace(/\D/g, '')
    .replace(/(\d{2})(\d)/, '($1) $2')
    .replace(/(\d{4})(\d)/, '$1-$2')
    .replace(/(\d{4})-(\d)(\d{4})/, '$1$2-$3')
    .replace(/(-\d{4})\d+?$/, '$1');
}

function ContactForm() {
  const form = useForm(
    {
      name: '',
      email: '',
      phone: '',
      message: ''
    },
    {
      name: [validators.required, validators.minLength(2)],
      email: [validators.required, validators.email],
      phone: [validators.required, validators.phone],
      message: [validators.required, validators.minLength(10)]
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (form.validateAll()) {
      alert('Formulário válido! Dados: ' + JSON.stringify(form.values, null, 2));
    }
  };

  const handlePhoneChange = (value) => {
    const masked = phoneMask(value);
    form.setValue('phone', masked);
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-6">Contato</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Nome */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Nome *
          </label>
          <input
            type="text"
            value={form.values.name}
            onChange={(e) => form.setValue('name', e.target.value)}
            onBlur={() => form.setTouched('name')}
            className={\`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 \${
              form.errors.name && form.touched.name
                ? 'border-red-500 focus:ring-red-500'
                : 'border-gray-300 focus:ring-blue-500'
            }\`}
            placeholder="Seu nome completo"
          />
          {form.errors.name && form.touched.name && (
            <p className="mt-1 text-sm text-red-600">{form.errors.name}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email *
          </label>
          <input
            type="email"
            value={form.values.email}
            onChange={(e) => form.setValue('email', e.target.value)}
            onBlur={() => form.setTouched('email')}
            className={\`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 \${
              form.errors.email && form.touched.email
                ? 'border-red-500 focus:ring-red-500'
                : 'border-gray-300 focus:ring-blue-500'
            }\`}
            placeholder="seu@email.com"
          />
          {form.errors.email && form.touched.email && (
            <p className="mt-1 text-sm text-red-600">{form.errors.email}</p>
          )}
        </div>

        {/* Telefone */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Telefone *
          </label>
          <input
            type="tel"
            value={form.values.phone}
            onChange={(e) => handlePhoneChange(e.target.value)}
            onBlur={() => form.setTouched('phone')}
            className={\`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 \${
              form.errors.phone && form.touched.phone
                ? 'border-red-500 focus:ring-red-500'
                : 'border-gray-300 focus:ring-blue-500'
            }\`}
            placeholder="(11) 99999-9999"
            maxLength={15}
          />
          {form.errors.phone && form.touched.phone && (
            <p className="mt-1 text-sm text-red-600">{form.errors.phone}</p>
          )}
        </div>

        {/* Mensagem */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Mensagem *
          </label>
          <textarea
            rows={4}
            value={form.values.message}
            onChange={(e) => form.setValue('message', e.target.value)}
            onBlur={() => form.setTouched('message')}
            className={\`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 \${
              form.errors.message && form.touched.message
                ? 'border-red-500 focus:ring-red-500'
                : 'border-gray-300 focus:ring-blue-500'
            }\`}
            placeholder="Sua mensagem..."
          />
          {form.errors.message && form.touched.message && (
            <p className="mt-1 text-sm text-red-600">{form.errors.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
        >
          Enviar Mensagem
        </button>
      </form>
    </div>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <ContactForm />
    </div>
  );
}`
      }
    ],
    previewConfig: {
      showPreview: true,
      autoRun: true,
      dependencies: ['react', 'tailwindcss']
    },
    author: {
      name: 'André',
      avatar: '/profile-avatar.svg'
    },
    stats: {
      views: 298,
      likes: 45,
      forks: 18
    },
    createdAt: '2024-01-03',
    featured: true
  },
  {
    id: 'chart-visualization',
    title: 'Data Visualization with Charts',
    description: 'Criação de gráficos e visualizações de dados interativas',
    category: 'Data Visualization',
    difficulty: 'advanced',
    framework: 'react',
    tags: ['react', 'charts', 'data', 'svg', 'visualization'],
    files: [
      {
        id: 'app-jsx',
        name: 'App.jsx',
        language: 'react',
        content: `import { useState, useMemo } from 'react';

// Dados de exemplo
const salesData = [
  { month: 'Jan', sales: 12000, target: 15000 },
  { month: 'Feb', sales: 19000, target: 18000 },
  { month: 'Mar', sales: 15000, target: 16000 },
  { month: 'Apr', sales: 22000, target: 20000 },
  { month: 'May', sales: 18000, target: 19000 },
  { month: 'Jun', sales: 25000, target: 23000 }
];

const categoryData = [
  { name: 'Electronics', value: 35, color: '#3B82F6' },
  { name: 'Clothing', value: 25, color: '#EF4444' },
  { name: 'Food', value: 20, color: '#10B981' },
  { name: 'Books', value: 12, color: '#F59E0B' },
  { name: 'Others', value: 8, color: '#8B5CF6' }
];

// Componente de Gráfico de Barras
function BarChart({ data, width = 400, height = 300 }) {
  const maxValue = Math.max(...data.map(d => Math.max(d.sales, d.target)));
  const barWidth = (width - 80) / data.length;
  
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">Sales vs Target</h3>
      <svg width={width} height={height} className="border">
        {/* Eixo Y - linhas de grade */}
        {[0, 0.25, 0.5, 0.75, 1].map(ratio => (
          <g key={ratio}>
            <line
              x1={40}
              y1={height - 40 - (height - 80) * ratio}
              x2={width - 20}
              y2={height - 40 - (height - 80) * ratio}
              stroke="#e5e7eb"
              strokeDasharray="2,2"
            />
            <text
              x={35}
              y={height - 40 - (height - 80) * ratio + 4}
              textAnchor="end"
              fontSize="12"
              fill="#6b7280"
            >
              {Math.round(maxValue * ratio / 1000)}K
            </text>
          </g>
        ))}
        
        {/* Barras */}
        {data.map((item, index) => {
          const x = 50 + index * barWidth;
          const salesHeight = (item.sales / maxValue) * (height - 80);
          const targetHeight = (item.target / maxValue) * (height - 80);
          
          return (
            <g key={item.month}>
              {/* Barra de vendas */}
              <rect
                x={x}
                y={height - 40 - salesHeight}
                width={barWidth * 0.35}
                height={salesHeight}
                fill="#3B82F6"
                className="hover:opacity-80 transition-opacity"
              />
              {/* Barra de meta */}
              <rect
                x={x + barWidth * 0.4}
                y={height - 40 - targetHeight}
                width={barWidth * 0.35}
                height={targetHeight}
                fill="#EF4444"
                className="hover:opacity-80 transition-opacity"
              />
              {/* Label do mês */}
              <text
                x={x + barWidth * 0.375}
                y={height - 20}
                textAnchor="middle"
                fontSize="12"
                fill="#374151"
              >
                {item.month}
              </text>
            </g>
          );
        })}
        
        {/* Legenda */}
        <g transform="translate(60, 20)">
          <rect x="0" y="0" width="12" height="12" fill="#3B82F6" />
          <text x="20" y="10" fontSize="12" fill="#374151">Sales</text>
          <rect x="80" y="0" width="12" height="12" fill="#EF4444" />
          <text x="100" y="10" fontSize="12" fill="#374151">Target</text>
        </g>
      </svg>
    </div>
  );
}

// Componente de Gráfico de Pizza
function PieChart({ data, width = 300, height = 300 }) {
  const centerX = width / 2;
  const centerY = height / 2;
  const radius = Math.min(centerX, centerY) - 40;
  
  const total = data.reduce((sum, item) => sum + item.value, 0);
  let currentAngle = -90;
  
  const paths = data.map(item => {
    const percentage = item.value / total;
    const angle = percentage * 360;
    
    const startAngle = (currentAngle * Math.PI) / 180;
    const endAngle = ((currentAngle + angle) * Math.PI) / 180;
    
    const x1 = centerX + radius * Math.cos(startAngle);
    const y1 = centerY + radius * Math.sin(startAngle);
    const x2 = centerX + radius * Math.cos(endAngle);
    const y2 = centerY + radius * Math.sin(endAngle);
    
    const largeArcFlag = angle > 180 ? 1 : 0;
    
    const pathData = [
      \`M \${centerX} \${centerY}\`,
      \`L \${x1} \${y1}\`,
      \`A \${radius} \${radius} 0 \${largeArcFlag} 1 \${x2} \${y2}\`,
      'Z'
    ].join(' ');
    
    currentAngle += angle;
    
    return {
      ...item,
      path: pathData,
      percentage: Math.round(percentage * 100)
    };
  });
  
  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">Sales by Category</h3>
      <div className="flex items-center gap-6">
        <svg width={width} height={height}>
          {paths.map((item, index) => (
            <path
              key={index}
              d={item.path}
              fill={item.color}
              stroke="white"
              strokeWidth="2"
              className="hover:opacity-80 transition-opacity cursor-pointer"
              title={\`\${item.name}: \${item.percentage}%\`}
            />
          ))}
        </svg>
        
        <div className="space-y-2">
          {data.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <div
                className="w-4 h-4 rounded"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-sm text-gray-700">
                {item.name} ({item.value}%)
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Componente de Métricas
function MetricsCard({ title, value, change, isPositive }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">
        {title}
      </h3>
      <div className="mt-2">
        <p className="text-3xl font-bold text-gray-900">{value}</p>
        <p className={\`text-sm \${isPositive ? 'text-green-600' : 'text-red-600'}\`}>
          {isPositive ? '↗' : '↘'} {change}
        </p>
      </div>
    </div>
  );
}

function Dashboard() {
  const totalSales = useMemo(() => 
    salesData.reduce((sum, item) => sum + item.sales, 0), []);
  
  const totalTarget = useMemo(() => 
    salesData.reduce((sum, item) => sum + item.target, 0), []);
  
  const achievement = useMemo(() => 
    Math.round((totalSales / totalTarget) * 100), [totalSales, totalTarget]);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">
          Sales Dashboard
        </h1>
        
        {/* Métricas */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <MetricsCard
            title="Total Sales"
            value={\`$\${(totalSales / 1000).toFixed(0)}K\`}
            change="12.5% vs last month"
            isPositive={true}
          />
          <MetricsCard
            title="Target"
            value={\`$\${(totalTarget / 1000).toFixed(0)}K\`}
            change="Target for period"
            isPositive={true}
          />
          <MetricsCard
            title="Achievement"
            value={\`\${achievement}%\`}
            change={\`\${achievement >= 100 ? 'Above' : 'Below'} target\`}
            isPositive={achievement >= 100}
          />
          <MetricsCard
            title="Growth"
            value="18.2%"
            change="vs previous period"
            isPositive={true}
          />
        </div>
        
        {/* Gráficos */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <BarChart data={salesData} width={500} height={350} />
          <PieChart data={categoryData} width={300} height={300} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;`
      }
    ],
    previewConfig: {
      showPreview: true,
      autoRun: true,
      dependencies: ['react', 'tailwindcss']
    },
    author: {
      name: 'André',
      avatar: '/profile-avatar.svg'
    },
    stats: {
      views: 167,
      likes: 28,
      forks: 9
    },
    createdAt: '2024-01-01',
    featured: false
  }
];

export const codeTemplates: CodeTemplate[] = [
  {
    id: 'react-component',
    name: 'React Component',
    framework: 'react',
    description: 'Template básico para componente React',
    files: [
      {
        name: 'Component.jsx',
        language: 'react',
        content: `import { useState } from 'react';

function MyComponent() {
  const [state, setState] = useState('');

  return (
    <div>
      <h1>My Component</h1>
      {/* Adicione seu código aqui */}
    </div>
  );
}

export default MyComponent;`
      }
    ]
  },
  {
    id: 'html-page',
    name: 'HTML Page',
    framework: 'vanilla',
    description: 'Template básico para página HTML',
    files: [
      {
        name: 'index.html',
        language: 'html',
        content: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Page</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <h1>Hello World!</h1>
    <script src="script.js"></script>
</body>
</html>`
      },
      {
        name: 'styles.css',
        language: 'css',
        content: `body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 20px;
    background-color: #f5f5f5;
}

h1 {
    color: #333;
    text-align: center;
}`
      },
      {
        name: 'script.js',
        language: 'javascript',
        content: `// Adicione seu código JavaScript aqui
console.log('Hello World!');`
      }
    ]
  },
  {
    id: 'api-integration',
    name: 'API Integration',
    framework: 'react',
    description: 'Template para integração com APIs',
    files: [
      {
        name: 'ApiComponent.jsx',
        language: 'react',
        content: `import { useState, useEffect } from 'react';

function ApiComponent() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('YOUR_API_URL_HERE');
      
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <h1>API Data</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}

export default ApiComponent;`
      }
    ]
  }
];

// Categorias disponíveis
export const categories = [
  'React Components',
  'Full Applications',
  'API Integration',
  'CSS & Styling',
  'Forms & Validation',
  'Data Visualization',
  'Animations',
  'Utilities',
  'Games',
  'Tools'
];

// Tags populares
export const popularTags = [
  'react', 'javascript', 'typescript', 'css', 'html',
  'hooks', 'api', 'forms', 'animations', 'responsive',
  'tailwind', 'bootstrap', 'scss', 'fetch', 'async'
];
