import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Toaster } from "react-hot-toast";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales } from '@/i18n/request';
import ScrollToTop from "@/components/partials/ScrollToTop";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "YT2Future | Shaping Tomorrow",
  description: "Investment Solutions and Agile Innovation",
};

// Generate static params for all locales
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  // Await params in Next.js 15+
  const { locale } = await params;

  // Validate locale
  if (!locales.includes(locale as any)) {
    notFound();
  }

  // Load messages
  const messages = await getMessages({ locale });

  return (
    <html lang={locale}>
      <head>
      </head>
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        <NextIntlClientProvider messages={messages} locale={locale}>
          <Toaster position="top-center" />
          {/* Header xuất hiện ở mọi trang */}
          <Navbar />

          {/* Main content */}
          <main className="flex-grow">
            {children}
          </main>

          {/* Footer xuất hiện ở mọi trang */}
          <Footer />

          {/* Nút cuộn lên đầu trang */}
          <ScrollToTop />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}