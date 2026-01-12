"use client";
import { Metadata } from 'next';
import PageHeader from '@/components/layout/PageHeader';
import MemberCard from '@/components/partials/MemberCard';
import Image from 'next/image';
import { BookOpen, Users, Lightbulb } from 'lucide-react';

export default function AboutPage() {
  const learningPillars = [
    {
      icon: <BookOpen className="text-yellow-500" size={28} />,
      title: "Hệ thống kiến thức",
      desc: "Chia sẻ kiến thức cũng như kinh nghiệm đúc kết trong quá trình học tập và thực nghiệm."
    },
    {
      icon: <Lightbulb className="text-yellow-500" size={28} />,
      title: "Tư duy phân tích",
      desc: "Rèn luyện cách nhìn nhận thị trường đa chiều, từ kinh tế vĩ mô đến sức khỏe nội tại doanh nghiệp."
    },
    {
      icon: <Users className="text-yellow-500" size={28} />,
      title: "Kết nối cộng đồng",
      desc: "Xây dựng cộng đồng học tập, nơi mọi góc nhìn đều được tôn trọng và phản biện."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <PageHeader title="About Us" />

      <main className="grow">
        {/* SECTION 1: GIỚI THIỆU */}
        <section className="py-10 md:py-15 max-w-360 mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <article className="space-y-8 order-1 lg:order-1">
              <div className="space-y-4">
                <p className="text-yellow-500 font-bold uppercase tracking-[0.4em] text-[10px]">About Y&TCapital</p>
                <div className="text-4xl md:text-6xl font-black text-[#001a41] uppercase tracking-tighter leading-[0.9]">
                  <h1 className="mb-4">Học tập. Chia sẻ.</h1>
                  <h2>Cùng phát triển.</h2>
                </div>
              </div>

              <div className="space-y-6 text-gray-500 font-light text-lg leading-relaxed border-l-2 border-gray-100 pl-8">
                <p><strong>YT2Future</strong> không phải là một tổ chức tài chính truyền thống. Chúng mình là đội ngũ những người trẻ đang trong hành trình khám phá thế giới đầu tư.</p>
                <p>Mục tiêu của website là nơi <mark className="bg-yellow-500 text-white px-1 rounded">học tập và chia sẻ</mark> kiến thức minh bạch nhất.</p>
              </div>

              <div className="pt-4">
                <blockquote className="text-[#001a41] text-xl md:text-2xl font-semibold italic border-l-4 border-yellow-500 pl-6 py-1 leading-snug">
                  "Kiến thức là nền tảng duy nhất của mọi khoản đầu tư thông minh."
                </blockquote>
                <p className="text-gray-400 text-[10px] uppercase tracking-[0.2em] font-bold mt-4 pl-7">
                  — Our Philosophy
                </p>
              </div>
            </article>

            <div className="relative group overflow-hidden rounded-sm shadow-xl order-2 lg:order-2 aspect-video lg:aspect-square bg-gray-50">
              <Image
                src="/group.png"
                alt="Tầm nhìn và Sứ mệnh YT2Future"
                fill
                className="object-cover grayscale-0 lg:grayscale lg:group-hover:grayscale-0 transition-all duration-1000 ease-in-out scale-100 lg:scale-105 lg:group-hover:scale-100"
                priority
              />
            </div>
          </div>
        </section>

        {/* SECTION 2: GIÁ TRỊ CỐT LÕI */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-360 mx-auto px-6 md:px-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-0 divide-y md:divide-y-0 md:divide-x divide-gray-200 border border-gray-200 shadow-sm rounded-sm overflow-hidden">
              {learningPillars.map((p, i) => (
                <div key={i} className="p-10 bg-white lg:hover:bg-[#001a41] group transition-all duration-500 cursor-default">
                  <div className="mb-8 lg:group-hover:scale-110 transition-transform origin-left">{p.icon}</div>
                  <h3 className="text-xl font-black text-[#001a41] group-hover:text-white uppercase tracking-tighter mb-4">{p.title}</h3>
                  <p className="text-gray-500 lg:group-hover:text-white/70 text-sm leading-relaxed">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 3: ĐỘI NGŨ FOUNDERS (FIXED: SLIDE ON MOBILE) */}
        <section className="py-24 max-w-360 mx-auto">
          <div className="text-center mb-16 md:mb-24 px-6 md:px-12">
            <h2 className="text-3xl md:text-5xl font-black text-[#001a41] uppercase tracking-tighter">Core Founders</h2>
            <div className="w-16 h-1.5 bg-yellow-500 mx-auto mt-6"></div>
          </div>

          {/* Container cho phép cuộn ngang trên điện thoại */}
          <div className="flex overflow-x-auto pb-10 px-6 gap-6 md:grid md:grid-cols-3 md:px-12 md:gap-16 no-scrollbar snap-x snap-mandatory">

            <div className="min-w-[85%] sm:min-w-[45%] md:min-w-full snap-center">
              <MemberCard
                name="Trần Minh Nhật"
                role="Founder"
                image="/Nhat.jpg"
                field="Anh Nhật định hướng tầm nhìn và chiến lược tổng thể."
              />
            </div>

            <div className="min-w-[85%] sm:min-w-[45%] md:min-w-full snap-center">
              <MemberCard
                name="Phạm Phương Nga"
                role="Co-Founder"
                image="/Nga.jpg"
                field="Chị Nga phụ trách phát triển kinh doanh và đối tác."
              />
            </div>

            <div className="min-w-[85%] sm:min-w-[45%] md:min-w-full snap-center">
              <MemberCard
                name="Nguyễn Nhất Bảo"
                role="Co-Founder"
                image="/Bao.jpg"
                field="Anh Bảo phụ trách công nghệ và tối ưu trải nghiệm người dùng."
              />
            </div>

          </div>

          {/* Gợi ý lướt (chỉ hiện trên mobile) */}
          <div className="md:hidden text-center mt-2">
            <p className="text-[10px] font-black uppercase text-slate-300 tracking-widest italic animate-pulse">
              ← Trượt ngang để xem thêm →
            </p>
          </div>
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
    </div>
  );
}