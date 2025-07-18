// components/common/AnimatedButton.tsx - Botão com animações avançadas

'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'
import { scaleOnHover } from '@/utils/animations'

interface AnimatedButtonProps {
    children: ReactNode
    onClick?: () => void
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost'
    size?: 'sm' | 'md' | 'lg'
    disabled?: boolean
    loading?: boolean
    className?: string
    href?: string
    target?: string
    type?: 'button' | 'submit' | 'reset'
    glowEffect?: boolean
    rippleEffect?: boolean
}

export default function AnimatedButton({
    children,
    onClick,
    variant = 'primary',
    size = 'md',
    disabled = false,
    loading = false,
    className = '',
    href,
    target,
    type = 'button',
    glowEffect = false,
    rippleEffect = false
}: AnimatedButtonProps) {
    const baseClasses = 'relative inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 overflow-hidden focus:outline-none focus:ring-2 focus:ring-offset-2'

    const variantClasses = {
        primary: 'bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500',
        secondary: 'bg-gray-600 hover:bg-gray-700 text-white focus:ring-gray-500',
        outline: 'border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white focus:ring-blue-500',
        ghost: 'text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 focus:ring-blue-500'
    }

    const sizeClasses = {
        sm: 'px-3 py-1.5 text-sm',
        md: 'px-4 py-2 text-base',
        lg: 'px-6 py-3 text-lg'
    }

    const disabledClasses = 'opacity-50 cursor-not-allowed'

    const classes = `
    ${baseClasses}
    ${variantClasses[variant]}
    ${sizeClasses[size]}
    ${disabled ? disabledClasses : ''}
    ${className}
  `.trim()

    const motionProps = {
        variants: scaleOnHover,
        whileHover: disabled ? {} : 'hover',
        whileTap: disabled ? {} : 'tap',
        className: classes,
        disabled: disabled || loading,
        onClick: disabled || loading ? undefined : onClick,
        type: href ? undefined : type
    }

    const buttonContent = (
        <>
            {/* Glow effect */}
            {glowEffect && !disabled && (
                <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-blue-600/0 via-blue-600/50 to-blue-600/0 blur-xl opacity-0"
                    whileHover={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                />
            )}

            {/* Ripple effect */}
            {rippleEffect && (
                <motion.div
                    className="absolute inset-0 bg-white/20 rounded-full scale-0"
                    whileTap={{ scale: 4, opacity: 0 }}
                    transition={{ duration: 0.4 }}
                />
            )}

            {/* Loading spinner */}
            {loading && (
                <motion.div
                    className="absolute inset-0 flex items-center justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2 }}
                >
                    <motion.div
                        className="w-4 h-4 border-2 border-current border-t-transparent rounded-full"
                        animate={{ rotate: 360 }}
                        transition={{
                            duration: 1,
                            repeat: Infinity,
                            ease: 'linear'
                        }}
                    />
                </motion.div>
            )}

            {/* Content */}
            <motion.span
                className={`relative z-10 flex items-center gap-2 ${loading ? 'opacity-0' : 'opacity-100'}`}
                transition={{ duration: 0.2 }}
            >
                {children}
            </motion.span>
        </>
    )

    if (href) {
        return (
            <motion.a
                href={href}
                target={target}
                {...motionProps}
            >
                {buttonContent}
            </motion.a>
        )
    }

    return (
        <motion.button {...motionProps}>
            {buttonContent}
        </motion.button>
    )
}
