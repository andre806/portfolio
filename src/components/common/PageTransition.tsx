// components/common/PageTransition.tsx - Wrapper para transições de página

'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'
import { pageVariants, pageTransition } from '@/utils/animations'

interface PageTransitionProps {
    children: ReactNode
    className?: string
}

export default function PageTransition({ children, className = '' }: PageTransitionProps) {
    const pathname = usePathname()

    return (
        <AnimatePresence mode="wait" initial={false}>
            <motion.div
                key={pathname}
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
                className={`min-h-screen ${className}`}
            >
                {children}
            </motion.div>
        </AnimatePresence>
    )
}
