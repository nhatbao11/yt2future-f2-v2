"use client";

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import { Quote } from 'lucide-react';

// Import CSS của Swiper
import 'swiper/css';
import 'swiper/css/pagination';

export default function FeedbackSection() {
  const feedbacks = [
    {
      name: "Nguyễn Văn A",
      role: "Sinh viên Kinh tế",
      content: "Những bài phân tích vĩ mô của Y&T Capital rất dễ hiểu, giúp mình hệ thống lại kiến thức một cách thực tế hơn.",
    },
    {
      name: "Lê Thị B",
      role: "Nhà đầu tư cá nhân",
      content: "Mình thích cách các bạn trẻ này chia sẻ về Crypto, không lôi kéo mà tập trung vào tư duy quản lý rủi ro.",
    },
    {
      name: "Hoàng Minh C",
      role: "Thành viên cộng đồng",
      content: "Giao diện web sạch sẽ, kiến thức chất lượng. Đây là nơi mình ghé thăm mỗi sáng để cập nhật góc nhìn.",
    },
    {
      name: "Trần Thế D",
      role: "Trader tự do",
      content: "Rất ấn tượng với cách nhóm tiếp cận thị trường chứng khoán, bài viết có chiều sâu và số liệu rõ ràng.",
    }
  ];

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-360 mx-auto px-6 md:px-12">
        <div className="text-center mb-16">
          <h4 className="text-orange-500 font-bold uppercase tracking-[0.3em] text-[10px] mb-4">Testimonials</h4>
          <h2 className="text-3xl md:text-5xl font-black text-[#001a41] uppercase tracking-tighter">
            Cảm nhận cộng đồng
          </h2>
          <div className="w-12 h-1 bg-orange-500 mx-auto mt-6"></div>
        </div>

        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          breakpoints={{
            // Khi màn hình >= 640px (tablet)
            640: { slidesPerView: 2 },
            // Khi màn hình >= 1024px (desktop)
            1024: { slidesPerView: 3 },
          }}
          className="pb-16" // Tạo khoảng trống cho các dấu chấm pagination
        >
          {feedbacks.map((f, i) => (
            <SwiperSlide key={i} className="h-full">
              <div className="bg-white p-10 relative shadow-sm border border-gray-100 h-full flex flex-col justify-between group">
                <Quote className="absolute top-6 right-8 text-gray-100 group-hover:text-orange-500/20 transition-colors duration-500" size={48} />

                <div className="relative z-10">
                  <p className="text-gray-600 font-light italic leading-relaxed mb-8">
                    "{f.content}"
                  </p>
                  <div className="border-t border-gray-100 pt-6 mt-auto">
                    <h4 className="font-black text-[#001a41] uppercase tracking-tight">{f.name}</h4>
                    <p className="text-orange-500 text-[10px] font-bold uppercase tracking-widest mt-1">{f.role}</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* CSS custom để đổi màu các dấu chấm Slider cho hợp màu Y&T */}
      <style jsx global>{`
        .swiper-pagination-bullet-active {
          background: #f97316 !important; /* Màu cam orange-500 */
        }
      `}</style>
    </section>
  );
}