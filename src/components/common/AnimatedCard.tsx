// components/common/AnimatedCard.tsx - Card com animações avançadas

'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'
import { scaleOnHover } from '@/utils/animations'

interface AnimatedCardProps {
    children: ReactNode
    className?: string
    delay?: number
    hoverScale?: number
    tapScale?: number
    glowOnHover?: boolean
    onClick?: () => void
}

export default function AnimatedCard({
    children,
    className = '',
    delay = 0,
    hoverScale = 1.03,
    tapScale = 0.98,
    glowOnHover = false,
    onClick
}: AnimatedCardProps) {
    return (
        <motion.div
            className={`relative ${glowOnHover ? 'hover:drop-shadow-lg hover:shadow-blue-500/25' : ''} ${className}`}
            variants={scaleOnHover}
            whileHover={{
                scale: hoverScale,
                transition: { duration: 0.2 }
            }}
            whileTap={{
                scale: tapScale,
                transition: { duration: 0.1 }
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
                duration: 0.5,
                delay,
                ease: 'easeOut'
            }}
            onClick={onClick}
            style={{ cursor: onClick ? 'pointer' : 'default' }}
        >
            {glowOnHover && (
                <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-blue-600/0 via-purple-600/0 to-blue-600/0 rounded-lg blur-xl"
                    whileHover={{
                        background: 'linear-gradient(90deg, rgba(59,130,246,0.3) 0%, rgba(147,51,234,0.3) 50%, rgba(59,130,246,0.3) 100%)',
                        transition: { duration: 0.3 }
                    }}
                />
            )}
            <div className="relative z-10">
                {children}
            </div>
        </motion.div>
    )
}
