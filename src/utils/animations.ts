// utils/animations.ts - Configurações de animações com Framer Motion

import { Variants } from 'framer-motion'

// Animações de entrada para páginas
export const pageVariants: Variants = {
    initial: {
        opacity: 0,
        y: 20,
        scale: 0.98
    },
    in: {
        opacity: 1,
        y: 0,
        scale: 1
    },
    out: {
        opacity: 0,
        y: -20,
        scale: 0.98
    }
}

export const pageTransition = {
    type: 'tween' as const,
    ease: 'anticipate' as const,
    duration: 0.5
}

// Animações para elementos individuais
export const fadeInUp: Variants = {
    initial: {
        opacity: 0,
        y: 30
    },
    animate: {
        opacity: 1,
        y: 0
    }
}

export const fadeInDown: Variants = {
    initial: {
        opacity: 0,
        y: -30
    },
    animate: {
        opacity: 1,
        y: 0
    }
}

export const fadeInLeft: Variants = {
    initial: {
        opacity: 0,
        x: -30
    },
    animate: {
        opacity: 1,
        x: 0
    }
}

export const fadeInRight: Variants = {
    initial: {
        opacity: 0,
        x: 30
    },
    animate: {
        opacity: 1,
        x: 0
    }
}

// Animação de escala para cards e botões
export const scaleOnHover: Variants = {
    initial: {
        scale: 1
    },
    hover: {
        scale: 1.05,
        transition: {
            duration: 0.2,
            ease: 'easeInOut'
        }
    },
    tap: {
        scale: 0.95
    }
}

// Animação para elementos do container stagger
export const staggerContainer: Variants = {
    initial: {},
    animate: {
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.1
        }
    }
}

export const staggerItem: Variants = {
    initial: {
        opacity: 0,
        y: 20
    },
    animate: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5,
            ease: 'easeOut'
        }
    }
}

// Animação de loading
export const loadingSpinner: Variants = {
    animate: {
        rotate: 360,
        transition: {
            duration: 1,
            repeat: Infinity,
            ease: 'linear'
        }
    }
}

// Animação de pulso
export const pulse: Variants = {
    animate: {
        scale: [1, 1.1, 1],
        transition: {
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut'
        }
    }
}

// Animação para navbar
export const navbarVariants: Variants = {
    initial: {
        y: -100,
        opacity: 0
    },
    animate: {
        y: 0,
        opacity: 1,
        transition: {
            duration: 0.6,
            ease: 'easeOut'
        }
    }
}

// Animação para modal
export const modalVariants: Variants = {
    initial: {
        opacity: 0,
        scale: 0.8,
        y: 50
    },
    animate: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: {
            duration: 0.3,
            ease: 'easeOut'
        }
    },
    exit: {
        opacity: 0,
        scale: 0.8,
        y: 50,
        transition: {
            duration: 0.2,
            ease: 'easeIn'
        }
    }
}

// Animação de backdrop para modal
export const backdropVariants: Variants = {
    initial: {
        opacity: 0
    },
    animate: {
        opacity: 1,
        transition: {
            duration: 0.3
        }
    },
    exit: {
        opacity: 0,
        transition: {
            duration: 0.2
        }
    }
}

// Animação para timeline
export const timelineVariants: Variants = {
    initial: {
        opacity: 0,
        x: -50
    },
    animate: {
        opacity: 1,
        x: 0,
        transition: {
            duration: 0.6,
            ease: 'easeOut'
        }
    }
}

// Animação para texto digitando
export const typewriterVariants: Variants = {
    initial: {
        width: 0
    },
    animate: {
        width: 'auto',
        transition: {
            duration: 2,
            ease: 'linear'
        }
    }
}

// Animação para progressbar
export const progressBarVariants: Variants = {
    initial: {
        width: 0
    },
    animate: (progress: number) => ({
        width: `${progress}%`,
        transition: {
            duration: 1.5,
            ease: 'easeOut'
        }
    })
}

// Animação para floating elements
export const floatingVariants: Variants = {
    animate: {
        y: [-10, 10, -10],
        transition: {
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut'
        }
    }
}

// Transições personalizadas
export const customTransitions = {
    spring: {
        type: 'spring',
        stiffness: 100,
        damping: 10
    },
    smooth: {
        duration: 0.6,
        ease: [0.43, 0.13, 0.23, 0.96]
    },
    bounce: {
        type: 'spring',
        stiffness: 300,
        damping: 20
    }
}

// Easing customizado
export const easing = {
    easeInOut: [0.43, 0.13, 0.23, 0.96],
    easeOut: [0, 0, 0.2, 1],
    easeIn: [0.4, 0, 1, 1]
}
