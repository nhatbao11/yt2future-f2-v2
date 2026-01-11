import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "YT2Future | Shaping Tomorrow",
  description: "Investment Solutions and Agile Innovation",
};

import ScrollToTop from "@/components/partials/ScrollToTop";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
      </head>
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        <Toaster position="top-center" />
        {/* Header xuất hiện ở mọi trang */}
        <Navbar />

        {/* Nội dung chính */}
        <main className="grow">
          {children}
        </main>

        {/* Footer xuất hiện ở mọi trang */}
        <Footer />

        {/* Nút cuộn lên đầu trang */}
        <ScrollToTop />
      </body>
    </html>
  );
}