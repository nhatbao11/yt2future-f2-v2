import PrimaryButton from '@/components/common/PrimaryButton';
import SectorGrid from '@/components/partials/SectorGrid';
import ProcessSection from '@/components/partials/ProcessSection';
import FeedbackSection from '@/components/partials/FeedbackHome';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import FeedbackHome from '@/components/partials/FeedbackHome';

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col font-sans bg-white">
      <main className="grow">

        {/* 1. HERO SECTION */}
        <section className="relative h-[80vh] md:h-[91vh] min-h-125 w-full flex items-center overflow-hidden bg-slate-900">
          <div className="absolute inset-0 z-0">
            <video autoPlay muted loop playsInline className="w-full h-full object-cover opacity-80">
              <source src="/Videohome.webm" type="video/webm" />
              <source src="/Videohome.mp4" type="video/mp4" />
            </video>
            <div className="absolute inset-0 bg-linear-to-r from-black/80 via-black/40 to-transparent z-10" />
          </div>
          <div className="relative z-20 max-w-360 mx-auto w-full px-6 md:px-12 text-white text-center md:text-left">
            <h2 className="text-5xl md:text-8xl font-black mb-4 tracking-tighter leading-tight">
              YT2 <span className="text-yellow-500">FUTURE</span>
            </h2>
            <p className="text-lg md:text-2xl font-light mb-10 tracking-wide opacity-95 leading-relaxed max-w-2xl mx-auto md:mx-0 uppercase">
              Shaping Tomorrow Through Agile Innovation
            </p>
            <div className="flex justify-center md:justify-start">
              <PrimaryButton label="Bắt đầu hành trình" href="/investment" />
            </div>
          </div>
        </section>

        {/* 2. SECTOR ANALYSIS - Gọi cái Grid đã xử lý "use client" */}
        <section className="py-7 md:py-24 max-w-360 mx-auto px-6 md:px-12 text-left">
          <div className="flex flex-col md:flex-row justify-between items-start mb-16 gap-8">
            <div className="max-w-2xl">
              <h4 className="text-yellow-500 font-black uppercase tracking-[0.4em] text-[10px] mb-4 italic">
                What we explore
              </h4>
              <h2 className="text-2xl md:text-6xl font-black text-[#001a41] uppercase tracking-tighter leading-none italic">
                Lĩnh vực kiến thức
              </h2>
            </div>
            <div className="md:text-right">
              <p className="text-gray-400 text-sm md:text-base font-bold max-w-sm md:ml-auto border-r-4 border-yellow-500 pr-6 uppercase tracking-wider italic">
                Chúng tôi tập trung vào những mảng thị trường cốt lõi, nơi sự đổi mới đang diễn ra mạnh mẽ nhất.
              </p>
            </div>
          </div>

          {/* ÉP CHIỀU CAO CỐ ĐỊNH TẠI ĐÂY */}
          <div className="relative w-full border-t border-slate-100">
            <SectorGrid />
          </div>
        </section>

        {/* 3. ABOUT MINI SECTION */}
        <section className="py-20 bg-gray-50 overflow-hidden text-left">
          <div className="max-w-360 mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative z-10 border-l-8 border-[#001a41] pl-8 space-y-6">
              <h3 className="text-2xl md:text-5xl font-black text-[#001a41] uppercase tracking-tighter">
                Không chỉ là đầu tư, đó là sự học tập.
              </h3>
              <p className="text-gray-600 text-lg font-light leading-relaxed">
                YT2Future ra đời từ khát khao của những người trẻ muốn tạo ra một cộng đồng chia sẻ kiến thức đầu tư khách quan và minh bạch.
              </p>
              <Link href="/about" className="inline-flex items-center gap-2 text-yellow-500 font-bold uppercase tracking-widest text-xs hover:gap-4 transition-all">
                Tìm hiểu về đội ngũ <ArrowRight size={16} />
              </Link>
            </div>
            <div className="bg-[#001a41] p-12 text-white relative">
              <p className="text-2xl font-light italic opacity-80 mb-8 leading-snug">
                "Khoản đầu tư vào kiến thức luôn mang lại lãi suất cao nhất."
              </p>
              <p className="font-bold uppercase tracking-widest text-sm text-yellow-500">— Benjamin Franklin</p>
            </div>
          </div>
        </section>

        {/* 4. PROCESS SECTION */}
        <ProcessSection />

        {/* 5. FEEDBACK SECTION */}
        <FeedbackHome />

      </main>
    </div>
  );
}