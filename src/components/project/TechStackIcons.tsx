'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface Technology {
    name: string;
    count: number;
}

interface TechStackIconsProps {
    technologies: Technology[];
}

// Mapeamento de tecnologias para ícones/cores
const techConfig: Record<string, { icon: string; color: string; bgColor: string }> = {
    'React': { icon: '⚛️', color: 'text-blue-600', bgColor: 'bg-blue-100 dark:bg-blue-900/30' },
    'Next.js': { icon: '🏗️', color: 'text-gray-800', bgColor: 'bg-gray-100 dark:bg-gray-900/30' },
    'TypeScript': { icon: '🔷', color: 'text-blue-700', bgColor: 'bg-blue-100 dark:bg-blue-900/30' },
    'JavaScript': { icon: '🟨', color: 'text-yellow-600', bgColor: 'bg-yellow-100 dark:bg-yellow-900/30' },
    'Node.js': { icon: '🟢', color: 'text-green-600', bgColor: 'bg-green-100 dark:bg-green-900/30' },
    'Python': { icon: '🐍', color: 'text-blue-500', bgColor: 'bg-blue-100 dark:bg-blue-900/30' },
    'Java': { icon: '☕', color: 'text-orange-600', bgColor: 'bg-orange-100 dark:bg-orange-900/30' },
    'C#': { icon: '#️⃣', color: 'text-purple-600', bgColor: 'bg-purple-100 dark:bg-purple-900/30' },
    'PHP': { icon: '🔵', color: 'text-indigo-600', bgColor: 'bg-indigo-100 dark:bg-indigo-900/30' },
    'Vue.js': { icon: '💚', color: 'text-green-500', bgColor: 'bg-green-100 dark:bg-green-900/30' },
    'Angular': { icon: '🅰️', color: 'text-red-600', bgColor: 'bg-red-100 dark:bg-red-900/30' },
    'Svelte': { icon: '🧡', color: 'text-orange-500', bgColor: 'bg-orange-100 dark:bg-orange-900/30' },
    'Flutter': { icon: '🦋', color: 'text-blue-400', bgColor: 'bg-blue-100 dark:bg-blue-900/30' },
    'React Native': { icon: '📱', color: 'text-blue-600', bgColor: 'bg-blue-100 dark:bg-blue-900/30' },
    'Swift': { icon: '🍎', color: 'text-orange-600', bgColor: 'bg-orange-100 dark:bg-orange-900/30' },
    'Kotlin': { icon: '🤖', color: 'text-purple-600', bgColor: 'bg-purple-100 dark:bg-purple-900/30' },
    // 'MongoDB': { icon: '🍃', color: 'text-green-600', bgColor: 'bg-green-100 dark:bg-green-900/30' },
    'MySQL': { icon: '�', color: 'text-blue-600', bgColor: 'bg-blue-100 dark:bg-blue-900/30' },
    'PostgreSQL': { icon: '🐘', color: 'text-blue-700', bgColor: 'bg-blue-100 dark:bg-blue-900/30' },
    'Firebase': { icon: '🔥', color: 'text-orange-500', bgColor: 'bg-orange-100 dark:bg-orange-900/30' },
    'AWS': { icon: '☁️', color: 'text-orange-400', bgColor: 'bg-orange-100 dark:bg-orange-900/30' },
    'Docker': { icon: '🐳', color: 'text-blue-500', bgColor: 'bg-blue-100 dark:bg-blue-900/30' },
    'Kubernetes': { icon: '⎈', color: 'text-blue-600', bgColor: 'bg-blue-100 dark:bg-blue-900/30' },
    'GraphQL': { icon: '📊', color: 'text-pink-600', bgColor: 'bg-pink-100 dark:bg-pink-900/30' },
    'REST API': { icon: '🔗', color: 'text-green-600', bgColor: 'bg-green-100 dark:bg-green-900/30' },
    'TailwindCSS': { icon: '💨', color: 'text-cyan-500', bgColor: 'bg-cyan-100 dark:bg-cyan-900/30' },
    'SASS': { icon: '💗', color: 'text-pink-500', bgColor: 'bg-pink-100 dark:bg-pink-900/30' },
    'CSS3': { icon: '🎨', color: 'text-blue-500', bgColor: 'bg-blue-100 dark:bg-blue-900/30' },
    'HTML5': { icon: '📄', color: 'text-orange-600', bgColor: 'bg-orange-100 dark:bg-orange-900/30' },
    'Figma': { icon: '🎯', color: 'text-purple-500', bgColor: 'bg-purple-100 dark:bg-purple-900/30' },
    'Adobe XD': { icon: '🎨', color: 'text-pink-600', bgColor: 'bg-pink-100 dark:bg-pink-900/30' },
    'Redis': { icon: '🔴', color: 'text-red-600', bgColor: 'bg-red-100 dark:bg-red-900/30' },
    'Stripe': { icon: '💳', color: 'text-indigo-600', bgColor: 'bg-indigo-100 dark:bg-indigo-900/30' },
    'TensorFlow': { icon: '🧠', color: 'text-orange-500', bgColor: 'bg-orange-100 dark:bg-orange-900/30' },
    'OpenAI API': { icon: '🤖', color: 'text-green-500', bgColor: 'bg-green-100 dark:bg-green-900/30' },
    'FastAPI': { icon: '⚡', color: 'text-green-600', bgColor: 'bg-green-100 dark:bg-green-900/30' },
    'D3.js': { icon: '📈', color: 'text-orange-600', bgColor: 'bg-orange-100 dark:bg-orange-900/30' },
    'InfluxDB': { icon: '📊', color: 'text-blue-600', bgColor: 'bg-blue-100 dark:bg-blue-900/30' },
    'Framer Motion': { icon: '🎭', color: 'text-purple-600', bgColor: 'bg-purple-100 dark:bg-purple-900/30' },
    'Redux': { icon: '🔄', color: 'text-purple-700', bgColor: 'bg-purple-100 dark:bg-purple-900/30' }
};

// Configuração padrão para tecnologias não mapeadas
const defaultConfig = { icon: '⚙️', color: 'text-gray-600', bgColor: 'bg-gray-100 dark:bg-gray-900/30' };

export const TechStackIcons: React.FC<TechStackIconsProps> = ({ technologies }) => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, scale: 0.8, y: 20 },
        visible: {
            opacity: 1,
            scale: 1,
            y: 0
        }
    };

    const hoverAnimation = {
        scale: 1.1,
        y: -5,
        transition: {
            duration: 0.2
        }
    };

    // Calcular o máximo para normalizar os tamanhos
    const maxCount = Math.max(...technologies.map(tech => tech.count));

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-wrap justify-center gap-4"
        >
            {technologies.map((tech) => {
                const config = techConfig[tech.name] || defaultConfig;
                const sizeMultiplier = 0.6 + (tech.count / maxCount) * 0.4; // Entre 0.6 e 1.0

                return (
                    <motion.div
                        key={tech.name}
                        variants={itemVariants}
                        whileHover={hoverAnimation}
                        className={`relative group cursor-pointer`}
                        style={{
                            transform: `scale(${sizeMultiplier})`
                        }}
                    >
                        {/* Ícone da tecnologia */}
                        <div className={`
              w-16 h-16 rounded-xl ${config.bgColor} 
              flex items-center justify-center text-2xl
              shadow-md hover:shadow-lg transition-all duration-300
              border border-gray-200 dark:border-gray-600
              group-hover:border-purple-400 dark:group-hover:border-purple-400
            `}>
                            <span className="text-2xl">{config.icon}</span>
                        </div>

                        {/* Badge com contador */}
                        <div className="absolute -top-2 -right-2 w-6 h-6 bg-purple-600 text-white text-xs font-bold rounded-full flex items-center justify-center shadow-md">
                            {tech.count}
                        </div>

                        {/* Tooltip */}
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-gray-900 dark:bg-gray-700 text-white text-sm rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap pointer-events-none z-10">
                            <div className="font-medium">{tech.name}</div>
                            <div className="text-xs text-gray-300">
                                {tech.count} projeto{tech.count !== 1 ? 's' : ''}
                            </div>
                            {/* Seta do tooltip */}
                            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900 dark:border-t-gray-700"></div>
                        </div>
                    </motion.div>
                );
            })}
        </motion.div>
    );
};

// Componente para mostrar uma tecnologia específica (usado em cards de projeto)
interface TechIconProps {
    technology: string;
    size?: 'sm' | 'md' | 'lg';
    showLabel?: boolean;
}

export const TechIcon: React.FC<TechIconProps> = ({
    technology,
    size = 'md',
    showLabel = false
}) => {
    const config = techConfig[technology] || defaultConfig;

    const sizeClasses = {
        sm: 'w-8 h-8 text-lg',
        md: 'w-10 h-10 text-xl',
        lg: 'w-12 h-12 text-2xl'
    };

    return (
        <div className="flex flex-col items-center gap-1">
            <div className={`
        ${sizeClasses[size]} ${config.bgColor} 
        flex items-center justify-center rounded-lg
        border border-gray-200 dark:border-gray-600
        transition-all duration-200 hover:scale-110
      `}>
                <span>{config.icon}</span>
            </div>
            {showLabel && (
                <span className="text-xs text-gray-600 dark:text-gray-300 font-medium">
                    {technology}
                </span>
            )}
        </div>
    );
};
