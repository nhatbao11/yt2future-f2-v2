"use client";
import Link from 'next/link';

interface PageHeaderProps {
  title: string;
}

export default function PageHeader({ title }: PageHeaderProps) {
  return (
    <section className="relative w-full bg-[#001a41] py-16 md:py-24 overflow-hidden">
      {/* Decor nền */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-blue-500/10 skew-x-15 transform translate-x-10" />

      <div className="relative z-10 max-w-360 mx-auto px-6 md:px-12">
        {/* Breadcrumbs */}
        <nav className="flex items-center gap-2 text-white/50 text-[10px] uppercase tracking-widest mb-4">
          <Link href="/" className="hover:text-orange-500 transition-colors">Home</Link>
          <span className="text-[8px]">/</span>
          <span className="text-orange-500 font-bold">{title}</span>
        </nav>

        {/* Container chính */}
        <div className="flex flex-col md:flex-row md:items-end w-full gap-6">

          {/* Cụm Tiêu đề bên trái - Chiếm không gian tự nhiên */}
          <div className="shrink-0">
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black text-white uppercase tracking-tighter leading-none whitespace-nowrap">
              {title}
            </h1>
            <div className="w-20 h-1.5 bg-orange-500 mt-4 md:mt-8"></div>
          </div>

          {/* Cụm Slogan - Dùng ml-auto để đẩy kịch sang phải trên màn hình lớn */}
          <div className="md:ml-auto md:text-right shrink-0">
            <p className="text-white text-[10px] md:text-[12px] italic font-light uppercase tracking-[0.2em] whitespace-nowrap">
              Shaping Tomorrow Through Agile Innovation
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}