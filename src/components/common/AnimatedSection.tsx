// components/common/AnimatedSection.tsx - Seção com animações na viewport

'use client'

import { motion, useInView, Variants } from 'framer-motion'
import { ReactNode, useRef } from 'react'
import { fadeInUp, staggerContainer, staggerItem } from '@/utils/animations'

interface AnimatedSectionProps {
    children: ReactNode
    className?: string
    delay?: number
    variants?: Variants
    stagger?: boolean
    once?: boolean
    threshold?: number
}

export default function AnimatedSection({
    children,
    className = '',
    delay = 0,
    variants = fadeInUp,
    stagger = false,
    once = true,
    threshold = 0.1
}: AnimatedSectionProps) {
    const ref = useRef(null)
    const isInView = useInView(ref, {
        once,
        margin: '-10% 0px -10% 0px',
        amount: threshold
    })

    if (stagger) {
        return (
            <motion.div
                ref={ref}
                initial="initial"
                animate={isInView ? "animate" : "initial"}
                variants={staggerContainer}
                className={className}
            >
                {Array.isArray(children)
                    ? children.map((child, index) => (
                        <motion.div
                            key={index}
                            variants={staggerItem}
                            transition={{ delay: delay + index * 0.1 }}
                        >
                            {child}
                        </motion.div>
                    ))
                    : (
                        <motion.div variants={staggerItem} transition={{ delay }}>
                            {children}
                        </motion.div>
                    )
                }
            </motion.div>
        )
    }

    return (
        <motion.div
            ref={ref}
            initial="initial"
            animate={isInView ? "animate" : "initial"}
            variants={variants}
            transition={{
                duration: 0.6,
                ease: 'easeOut',
                delay
            }}
            className={className}
        >
            {children}
        </motion.div>
    )
}