'use client'

import { useTranslations } from 'next-intl'
import Link from 'next/link'

export default function PlaygroundPage() {
    const t = useTranslations('playground')

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                        {t('title')}
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        {t('subtitle')}
                    </p>
                </div>

                <div className="prose prose-lg dark:prose-invert max-w-none text-center">
                    <p>
                        {t('description')}
                    </p>
                    <p className="mt-8 text-gray-500 dark:text-gray-400">
                        O playground interativo está sendo desenvolvido...
                    </p>
                </div>

                <div className="mt-8 text-center">
                    <Link
                        href="/"
                        className="btn-secondary btn-lg"
                    >
                        Voltar ao Início
                    </Link>
                </div>
            </div>
        </div>
    )
}
