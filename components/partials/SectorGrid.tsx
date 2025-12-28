"use client";

import React from 'react';
import SectorCard from './SectorCard';
import { LineChart, Coins, Globe, Lightbulb } from 'lucide-react';
// Import Swiper components và styles
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';

export default function SectorGrid() {
  const sectors = [
    {
      title: "Chứng khoán",
      desc: "Phân tích doanh nghiệp, hiểu báo cáo tài chính và tìm kiếm lợi thế cạnh tranh.",
      icon: LineChart
    },
    {
      title: "Thị trường Crypto",
      desc: "Khám phá Blockchain, tài chính phi tập trung (DeFi) và tương lai của tài sản số.",
      icon: Coins
    },
    {
      title: "Kinh tế vĩ mô",
      desc: "Nắm bắt nhịp đập kinh tế toàn cầu, từ lãi suất FED đến dòng chảy dòng tiền...",
      icon: Globe
    },
    {
      title: "Tư duy tài chính",
      desc: "Xây dựng tâm lý đầu tư vững vàng và kỹ năng quản lý vốn cá nhân hiệu quả....",
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
            {/* Thêm h-full và flex-1 vào div bọc SectorCard */}
            <div className="w-full h-full bg-white flex flex-col flex-1">
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
          background: #f97316 !important; 
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