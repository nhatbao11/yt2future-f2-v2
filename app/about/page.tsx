import PageHeader from '@/components/layout/PageHeader';
import MemberCard from '@/components/partials/MemberCard';
import Image from 'next/image';
import { BookOpen, Users, Lightbulb, ArrowUpRight } from 'lucide-react';

export default function AboutPage() {
  const learningPillars = [
    {
      icon: <BookOpen className="text-orange-500" size={28} />,
      title: "Hệ thống kiến thức",
      desc: "Chia sẻ kiến thức cũng như kinh nghiệm đúc kết trong quá trình học tập và thực nghiệm."
    },
    {
      icon: <Lightbulb className="text-orange-500" size={28} />,
      title: "Tư duy phân tích",
      desc: "Rèn luyện cách nhìn nhận thị trường đa chiều, từ kinh tế vĩ mô đến sức khỏe nội tại doanh nghiệp."
    },
    {
      icon: <Users className="text-orange-500" size={28} />,
      title: "Kết nối cộng đồng",
      desc: "Xây dựng cộng đồng học tập, nơi mọi góc nhìn đều được tôn trọng và phản biện."
    }
  ];

  const teamMembers = [
    { name: "Trần Minh Nhật", role: "Founder", image: "/Nhat.jpg" },
    { name: "Phạm Phương Nga", role: "Co-Founder", image: "/Nga.jpg" },
    { name: "Nguyễn Nhất Bảo", role: "Co-Founder", image: "/Bao.jpg" }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <PageHeader title="About Us" />

      <main className="grow">
        {/* SECTION 1: GIỚI THIỆU - PHONG CÁCH CHUYÊN NGHIỆP */}
        <section className="py-16 md:py-28 max-w-360 mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h4 className="text-orange-500 font-bold uppercase tracking-[0.4em] text-[10px]">About Y&TCapital</h4>
                <div className="text-4xl md:text-6xl font-black text-[#001a41] uppercase tracking-tighter">
                  <h2 className="leading-[0.9]">Học tập. Chia sẻ.</h2>
                  <h2 className="mt-6 leading-[0.9]">Cùng phát triển.</h2>
                </div>
              </div>

              <div className="space-y-6 text-gray-500 font-light text-lg leading-relaxed border-l-2 border-gray-100 pl-8">
                <p>
                  Y&T Capital không phải là một tổ chức tài chính truyền thống. Chúng mình là đội ngũ những người trẻ đang trong hành trình khám phá thế giới đầu tư đầy thú vị.
                </p>
                <p>
                  Mục tiêu của website này là nơi <mark className="bg-orange-500 text-white px-1 rounded">*học tập và chia sẻ*</mark>, nơi kiến thức được lan tỏa một cách minh bạch và khách quan nhất.
                </p>
              </div>
            </div>

            {/* Decor mảng khối từ version trước */}
            <div className="relative group overflow-hidden rounded-sm">
              <div className="absolute inset-0 bg-[#001a41]/20 group-hover:bg-transparent transition-all duration-700 z-10" />
              <Image
                src="/Logo.jpg"
                alt="Vision"
                width={800} height={600}
                className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
              />
              <div className="absolute bottom-6 left-6 z-20 bg-white p-6 shadow-2xl max-w-62.5">
                <p className="text-[#001a41] text-xs font-bold uppercase tracking-widest mb-2">Our Philosophy</p>
                <p className="text-gray-500 text-[11px] italic">"Kiến thức là nền tảng duy nhất của mọi khoản đầu tư thông minh."</p>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION 2: GIÁ TRỊ CỐT LÕI (Kết hợp Grid hiện đại) */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-360 mx-auto px-6 md:px-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-0 divide-y md:divide-y-0 md:divide-x divide-gray-200 border border-gray-200 shadow-sm">
              {learningPillars.map((p, i) => (
                <div key={i} className="p-10 bg-white hover:bg-[#001a41] group transition-all duration-500">
                  <div className="mb-8 group-hover:scale-110 transition-transform">{p.icon}</div>
                  <h3 className="text-xl font-black text-[#001a41] group-hover:text-white uppercase tracking-tighter mb-4">{p.title}</h3>
                  <p className="text-gray-500 group-hover:text-white/60 text-sm leading-relaxed">{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 3: ĐỘI NGŨ FOUNDERS - Đã fix vùng chứa */}
        <section className="py-24 max-w-360 mx-auto px-6 md:px-12">
          <div className="text-center mb-16 md:mb-20">
            <h2 className="text-3xl md:text-5xl font-black text-[#001a41] uppercase tracking-tighter">
              Core Founders
            </h2>
            <div className="w-16 h-1.5 bg-orange-500 mx-auto mt-6"></div>
          </div>

          {/* Lưới hiển thị 3 người với khoảng cách chuẩn */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 md:gap-16">
            <MemberCard
              name="Trần Minh Nhật"
              role="Founder"
              image="/Nhat.jpg"
              field="Anh Nhật là người sáng lập công ty, định hướng tầm nhìn và chiến lược tổng thể. Tập trung vào giải pháp đầu tư bền vững."
            />

            <MemberCard
              name="Phạm Phương Nga"
              role="Co-Founder"
              image="/Nga.jpg"
              field="Chị Nga phụ trách phát triển kinh doanh và đối tác. Kinh nghiệm trong vận hành và mở rộng quy mô."
            />

            <MemberCard
              name="Nguyễn Nhất Bảo"
              role="Co-Founder"
              image="/Bao.jpg"
              field="Anh Bảo phụ trách công nghệ và sản phẩm. Tập trung tối ưu trải nghiệm và hiệu quả hệ thống."
            />
          </div>
        </section>
      </main>

    </div>
  );
}