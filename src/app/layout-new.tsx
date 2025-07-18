import type { Metadata } from 'next'
import { redirect } from 'next/navigation'

// Layout principal que redireciona para o locale padrão
export const metadata: Metadata = {
    title: {
        default: 'André - Desenvolvedor Full Stack',
        template: '%s | André - Desenvolvedor Full Stack'
    },
    description: 'Portfólio profissional de André, desenvolvedor Full Stack especializado em React, Next.js, TypeScript e Node.js.',
}

export default function RootLayout() {
    // Redireciona para o locale padrão
    redirect('/pt')
}
