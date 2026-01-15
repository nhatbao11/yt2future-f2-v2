"use client";

import React from 'react';
import SectorCard from './SectorCard';
import { LineChart, Coins, Globe, Lightbulb, Building } from 'lucide-react';
// Import Swiper components và styles
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';

export default function SectorGrid() {
  const sectors = [
    {
      title: "Chứng khoán",
      desc: "Cập nhật kiến thức nền tảng dành cho người mới bắt đầu, với cách tiếp cận phân tích đơn giản, dễ hiểu và từng bước làm quen với thị trường.",
      icon: LineChart
    },
    {
      title: "Bất động sản",
      desc: "Tổng hợp các dự án đã và đang triển khai trên cả nước, cập nhật mặt bằng giá theo khu vực và phân tích doanh nghiệp bất động sản thông qua danh mục dự án thực tế.",
      icon: Building
    },
    {
      title: "Kinh tế vĩ mô",
      desc: "Phân tích tác động của các chính sách kinh tế tại Việt Nam lên từng nhóm ngành, cập nhật lãi suất điều hành và chính sách tiền tệ, ngoại hối từ đó đề xuất những nhóm ngành tiềm năng theo từng giai đoạn.",
      icon: Globe
    },
    {
      title: "Tư duy tài chính",
      desc: "Thiết kế lộ trình hoàn chỉnh dành cho nhà đầu tư mới bắt đầu, đặc biệt là nhân viên văn phòng, giúp tiếp cận kiến thức tài chính một cách dễ hiểu và ứng dụng hiệu quả trong thực tiễn.",
      icon: Lightbulb
    },
  ];

  return (
    <div className="w-full sector-swiper-container">
      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={0}
        slidesPerView={1.2}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        // DÒNG QUAN TRỌNG: Ép các slide có chiều cao bằng nhau
        autoHeight={false}
        breakpoints={{
          640: { slidesPerView: 2 },
          1024: {
            slidesPerView: 4,
            allowTouchMove: false,
          },
        }}
        className="border border-gray-100 flex" // Thêm flex ở đây
      >
        {sectors.map((s, i) => (
          <SwiperSlide key={i} className="border-r border-gray-100 !h-auto flex">
            {/* Bỏ bg-white để SectorCard tự quản lý background */}
            <div className="w-full h-full flex flex-col flex-1">
              <SectorCard title={s.title} desc={s.desc} icon={s.icon} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <style jsx global>{`
        /* Ép Swiper wrapper phải lấp đầy chiều cao */
        .sector-swiper-container .swiper-wrapper {
          display: flex !important;
        }
        
        .sector-swiper-container .swiper-pagination-bullet-active {
          background: #eab308 !important; 
        }

        /* Đảm bảo slide luôn có chiều cao 100% của slide cao nhất */
        .sector-swiper-container .swiper-slide {
          height: auto !important;
          display: flex !important;
        }

        /* Nếu SectorCard có thẻ div cha bên trong, sếp cũng nên ép nó h-full */
        .sector-swiper-container .swiper-slide > div {
          width: 100%;
          display: flex;
          flex-direction: column;
        }
      `}</style>
    </div>
  );
}