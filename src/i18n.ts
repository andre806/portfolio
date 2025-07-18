import { notFound } from 'next/navigation';

// Lista de locales suportados
export const locales = ['pt', 'en'] as const;
export type Locale = typeof locales[number];

// Locale padrão
export const defaultLocale: Locale = 'pt';

export async function getMessages(locale: string) {
    try {
        return (await import(`../messages/${locale}.json`)).default;
    } catch {
        notFound();
    }
}
