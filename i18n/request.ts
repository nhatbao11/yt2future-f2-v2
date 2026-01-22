import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';

// Các ngôn ngữ được hỗ trợ
export const locales = ['vi', 'en'] as const;
export type Locale = (typeof locales)[number];

export default getRequestConfig(async ({ locale }) => {
    console.log('[i18n/request] Processing locale:', locale);
    // Validate locale
    if (!locale || !locales.includes(locale as Locale)) {
        console.log('[i18n/request] Invalid/Missing locale:', locale, '- Falling back to vi');
        // notFound();
        return {
            locale: 'vi',
            messages: (await import(`../messages/vi.json`)).default
        };
    }

    console.log('[i18n/request] Loading messages for:', locale);
    return {
        locale: locale as string,
        messages: (await import(`../messages/${locale}.json`)).default
    };
});
