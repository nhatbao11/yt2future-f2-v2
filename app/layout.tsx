import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Y&T Capital | Shaping Tomorrow",
  description: "Investment Solutions and Agile Innovation",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex flex-col min-h-screen`}>
        {/* Header xuất hiện ở mọi trang */}
        <Navbar />

        {/* Nội dung thay đổi theo từng trang nằm ở đây */}
        <main className="grow">
          {children}
        </main>

        {/* Footer xuất hiện ở mọi trang */}
        <Footer />
      </body>
    </html>
  );
}