"use client";
import { useEffect, useRef } from 'react';
import { Metadata } from 'next';
import PageHeader from '@/components/layout/PageHeader';
import MemberCard from '@/components/partials/MemberCard';
import Image from 'next/image';
import Link from 'next/link';
import { BookOpen, Users, Lightbulb } from 'lucide-react';
import ScrollReveal from '@/components/common/ScrollReveal';

export default function AboutPage() {
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const slider = sliderRef.current;
    if (!slider) return;

    const interval = setInterval(() => {
      const center = slider.scrollLeft + slider.clientWidth / 2;
      let currentIndex = 0;
      let minDistance = Infinity;

      // Find currently centered item
      for (let i = 0; i < slider.children.length; i++) {
        const child = slider.children[i] as HTMLElement;
        const childCenter = child.offsetLeft + child.offsetWidth / 2;
        const dist = Math.abs(center - childCenter);
        if (dist < minDistance) {
          minDistance = dist;
          currentIndex = i;
        }
      }

      // Move to next item
      const nextIndex = (currentIndex + 1) % slider.children.length;
      const nextCard = slider.children[nextIndex] as HTMLElement;

      if (nextCard) {
        // Calculate scroll position to center the next card
        const scrollTarget = nextCard.offsetLeft - (slider.clientWidth - nextCard.offsetWidth) / 2;
        slider.scrollTo({ left: scrollTarget, behavior: 'smooth' });
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const learningPillars = [
    {
      icon: <BookOpen className="text-yellow-500" size={28} />,
      title: "HỆ THỐNG KIẾN THỨC",
      desc: "Chia sẻ kiến thức và kinh nghiệm được đúc kết từ học tập và thực tiễn đầu tư."
    },
    {
      icon: <Lightbulb className="text-yellow-500" size={28} />,
      title: "TƯ DUY PHÂN TÍCH",
      desc: "Rèn luyện khả năng nhìn nhận thị trường đa chiều, từ vĩ mô đến nội tại doanh nghiệp."
    },
    {
      icon: <Users className="text-yellow-500" size={28} />,
      title: "KẾT NỐI CỘNG ĐỒNG",
      desc: "Xây dựng cộng đồng học tập cởi mở, nơi mọi góc nhìn được tôn trọng và phản biện."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <PageHeader title="About Us" />

      <main className="grow">
        {/* SECTION 1: GIỚI THIỆU */}
        <section className="py-10 md:py-16">
          <ScrollReveal className="max-w-360 mx-auto px-6 md:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
              <article className="space-y-8 order-1 lg:order-1">
                <div className="space-y-4">
                  <p className="text-yellow-500 font-bold uppercase tracking-[0.4em] text-[10px]">About Y&TCapital</p>
                  <div className="text-2xl md:text-4xl font-black text-[#001a41] uppercase tracking-tight leading-snug">
                    <h1>"Kiến tạo tương lai bằng tư duy linh hoạt và đổi mới không ngừng."</h1>
                  </div>
                </div>

                <div className="space-y-6 text-gray-500 font-light text-lg leading-relaxed border-l-2 border-gray-100 pl-8">
                  <p>
                    YT2Future được xây dựng với niềm tin rằng tương lai tài chính bền vững bắt đầu từ tư duy linh hoạt và tinh thần đổi mới không ngừng. Chúng tôi cung cấp kiến thức đầu tư, phân tích thị trường và thông tin tài chính được chọn lọc, hướng tới việc giúp người đọc hiểu đúng bản chất của đầu tư và ra quyết định dựa trên tư duy dài hạn. YT2Future mong muốn đồng hành cùng cộng đồng trên hành trình học hỏi, thích nghi và kiến tạo tương lai bằng tri thức.
                  </p>
                </div>

                <div className="pt-4">
                  <blockquote className="text-[#001a41] text-xl md:text-2xl font-semibold italic border-l-4 border-yellow-500 pl-6 py-1 leading-snug">
                    "Shaping tomorrow through agile innovation."
                  </blockquote>
                </div>
              </article>

              <div className="relative group overflow-hidden rounded-sm shadow-xl order-2 lg:order-2 aspect-video lg:aspect-square bg-gray-50">
                <Image
                  src="/group.png"
                  alt="Tầm nhìn và Sứ mệnh YT2Future"
                  fill
                  className="object-cover grayscale-0 transition-all duration-1000 ease-in-out scale-100 lg:scale-105 lg:group-hover:scale-100"
                  priority
                />
              </div>
            </div>
          </ScrollReveal>
        </section>

        {/* SECTION 2: GIÁ TRỊ CỐT LÕI */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-360 mx-auto px-6 md:px-12">
            <div className="mb-12 border-l-4 md:border-l-8 border-[#001a41] pl-4 md:pl-6 text-left">
              <h2 className="font-black text-[#001a41] text-2xl md:text-5xl uppercase tracking-tighter leading-tight">
                Giá trị <span className="text-yellow-500">chúng tôi mang lại</span>
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-0 divide-y md:divide-y-0 md:divide-x divide-gray-200 border border-gray-200 shadow-sm rounded-sm overflow-hidden">
              {learningPillars.map((p, i) => (
                <div key={i} className="p-10 bg-white lg:hover:bg-[#001a41] group transition-all duration-500 cursor-default">
                  <div className="mb-8 lg:group-hover:scale-110 transition-transform origin-left">{p.icon}</div>
                  <h3 className="text-xl font-black text-[#001a41] group-hover:text-white uppercase tracking-tighter mb-4">{p.title}</h3>
                  <p className="text-gray-500 lg:group-hover:text-white/70 text-sm leading-loose tracking-wide">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 3: ĐỘI NGŨ FOUNDERS (FIXED: SLIDE ON MOBILE) */}
        <section className="py-12 md:py-16 max-w-360 mx-auto">
          <ScrollReveal>
            <div className="text-center mb-16 md:mb-24 px-6 md:px-12">
              <h2 className="text-3xl md:text-5xl font-black text-[#001a41] uppercase tracking-tighter">Core Founders</h2>
              <div className="w-16 h-1.5 bg-yellow-500 mx-auto mt-6"></div>
            </div>

            {/* Mobile Slider / Desktop Grid */}
            <div ref={sliderRef} className="flex overflow-x-auto pb-10 px-[10vw] gap-6 md:grid md:grid-cols-3 md:px-12 md:gap-16 no-scrollbar snap-x snap-mandatory">

              <div className="min-w-[80vw] sm:min-w-[45%] md:min-w-full snap-center shrink-0">
                <MemberCard
                  name="Trần Minh Nhật"
                  role="Founder"
                  image="/Nhat.jpg"
                  field="Hoạch định chiến lược & Tầm nhìn tổng thể."
                />
              </div>

              <div className="min-w-[80vw] sm:min-w-[45%] md:min-w-full snap-center shrink-0">
                <MemberCard
                  name="Phạm Phương Nga"
                  role="Co-Founder"
                  image="/Nga.jpg"
                  field="Phát triển kinh doanh & Quan hệ đối tác."
                />
              </div>

              <div className="min-w-[80vw] sm:min-w-[45%] md:min-w-full snap-center shrink-0">
                <MemberCard
                  name="Nguyễn Nhất Bảo"
                  role="Co-Founder"
                  image="/Bao.jpg"
                  field="Phát triển công nghệ & Trải nghiệm người dùng."
                />
              </div>

            </div>

            {/* Gợi ý lướt (chỉ hiện trên mobile) */}
            <div className="md:hidden text-center mt-2">
              <p className="text-[10px] font-black uppercase text-slate-300 tracking-widest italic animate-pulse">
                ← Trượt ngang để xem thêm →
              </p>
            </div>
          </ScrollReveal>
        </section>
      </main>

      {/* Style để ẩn thanh cuộn và căn chỉnh */}
      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div >
  );
}