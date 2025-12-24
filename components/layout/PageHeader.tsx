"use client";
import Link from 'next/link';

interface PageHeaderProps {
  title: string;
}

export default function PageHeader({ title }: PageHeaderProps) {
  return (
    <div className="w-full bg-[#001a41] py-3 md:py-4">
      <div className="max-w-360 mx-auto px-6 md:px-12">
        <nav className="flex items-center gap-2 text-white/50 text-[10px] md:text-[11px] font-bold uppercase tracking-[0.15em]">
          <Link
            href="/"
            className="hover:text-orange-500 transition-colors duration-200"
          >
            Home
          </Link>

          <span className="text-white/20 select-none font-light">/</span>

          <span className="text-orange-500">
            {title}
          </span>
        </nav>
      </div>
    </div>
  );
}