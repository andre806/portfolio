import type { Metadata } from 'next'
import { redirect } from 'next/navigation'

// Layout principal que redireciona para o locale padrão
export const metadata: Metadata = {
    title: {
        default: 'Luisa - Full Stack Developer',
        template: '%s | Luisa - Full Stack Developer'
    },
    description: "Luisa's professional portfolio, Full Stack Developer specialized in React, Next.js, TypeScript, and Node.js.",
}

export default function RootLayout() {
    // Redireciona para o locale padrão
    redirect('/pt')
}
