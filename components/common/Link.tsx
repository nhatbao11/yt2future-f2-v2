'use client';

import { useLocale } from 'next-intl';
import NextLink from 'next/link';
import { ComponentProps } from 'react';

type LinkProps = Omit<ComponentProps<typeof NextLink>, 'href'> & {
    href: string;
};

export default function Link({ href, ...props }: LinkProps) {
    const locale = useLocale();

    // If href already starts with locale or is external, use as-is
    const isExternal = href.startsWith('http') || href.startsWith('//');
    const hasLocale = href.startsWith(`/${locale}/`) || href.startsWith('/vi/') || href.startsWith('/en/');

    const localizedHref = isExternal || hasLocale ? href : `/${locale}${href}`;

    return <NextLink href={localizedHref} {...props} />;
}
