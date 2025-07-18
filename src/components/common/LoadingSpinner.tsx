// components/common/LoadingSpinner.tsx - Spinner de loading animado

'use client'

import { motion } from 'framer-motion'
import { loadingSpinner, pulse } from '@/utils/animations'

interface LoadingSpinnerProps {
    size?: 'sm' | 'md' | 'lg' | 'xl'
    variant?: 'spin' | 'pulse' | 'dots' | 'bars'
    color?: string
    className?: string
}

export default function LoadingSpinner({
    size = 'md',
    variant = 'spin',
    color = '#3B82F6',
    className = ''
}: LoadingSpinnerProps) {
    const sizeClasses = {
        sm: 'w-4 h-4',
        md: 'w-8 h-8',
        lg: 'w-12 h-12',
        xl: 'w-16 h-16'
    }

    const dotSize = {
        sm: 'w-1 h-1',
        md: 'w-2 h-2',
        lg: 'w-3 h-3',
        xl: 'w-4 h-4'
    }

    const barHeight = {
        sm: 'h-3',
        md: 'h-4',
        lg: 'h-6',
        xl: 'h-8'
    }

    if (variant === 'spin') {
        return (
            <motion.div
                className={`${sizeClasses[size]} border-2 border-gray-200 border-t-2 rounded-full ${className}`}
                style={{ borderTopColor: color }}
                variants={loadingSpinner}
                animate="animate"
            />
        )
    }

    if (variant === 'pulse') {
        return (
            <motion.div
                className={`${sizeClasses[size]} rounded-full ${className}`}
                style={{ backgroundColor: color }}
                variants={pulse}
                animate="animate"
            />
        )
    }

    if (variant === 'dots') {
        return (
            <div className={`flex space-x-1 ${className}`}>
                {[0, 1, 2].map((index) => (
                    <motion.div
                        key={index}
                        className={`${dotSize[size]} rounded-full`}
                        style={{ backgroundColor: color }}
                        animate={{
                            scale: [1, 1.5, 1],
                            opacity: [0.7, 1, 0.7]
                        }}
                        transition={{
                            duration: 1,
                            repeat: Infinity,
                            delay: index * 0.2
                        }}
                    />
                ))}
            </div>
        )
    }

    if (variant === 'bars') {
        return (
            <div className={`flex space-x-1 items-end ${className}`}>
                {[0, 1, 2, 3].map((index) => (
                    <motion.div
                        key={index}
                        className={`w-1 ${barHeight[size]} rounded-sm`}
                        style={{ backgroundColor: color }}
                        animate={{
                            scaleY: [1, 2, 1]
                        }}
                        transition={{
                            duration: 0.8,
                            repeat: Infinity,
                            delay: index * 0.1
                        }}
                    />
                ))}
            </div>
        )
    }

    return null
}
