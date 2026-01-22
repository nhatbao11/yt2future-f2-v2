'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { locales } from '@/i18n/request';
import { useEffect } from 'react';

export default function LanguageSwitcher() {
    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();

    // Restore scroll position after language change
    useEffect(() => {
        const savedScroll = sessionStorage.getItem('scrollPosition');
        if (savedScroll) {
            setTimeout(() => {
                window.scrollTo(0, parseInt(savedScroll));
                sessionStorage.removeItem('scrollPosition');
            }, 100);
        }
    }, []);

    const switchLocale = () => {
        // Save current scroll position
        sessionStorage.setItem('scrollPosition', window.scrollY.toString());

        const newLocale = locale === 'vi' ? 'en' : 'vi';

        // Remove existing locale prefix if present to get clean path
        let cleanPath = pathname;
        if (cleanPath.startsWith('/vi')) cleanPath = cleanPath.replace('/vi', '');
        else if (cleanPath.startsWith('/en')) cleanPath = cleanPath.replace('/en', '');

        // Ensure cleanPath starts with / (handle root case where replace might leave empty string if logic varies)
        if (!cleanPath.startsWith('/')) cleanPath = '/' + cleanPath;

        router.push(`/${newLocale}${cleanPath}`);
    };

    return (
        <button
            onClick={switchLocale}
            className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-100 hover:bg-yellow-100 text-[#001a41] border border-gray-200 hover:border-yellow-200 transition-all font-black text-[10px] tracking-widest shadow-sm"
            aria-label="Switch Language"
        >
            {locale === 'vi' ? 'VI' : 'EN'}
        </button>
    );
}
