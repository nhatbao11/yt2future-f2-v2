"use client";

import React from 'react';
import SectorCard from './SectorCard';
import { LineChart, Coins, Globe, Lightbulb, Building } from 'lucide-react';
// Import Swiper components và styles
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';

import { useTranslations } from 'next-intl';

export default function SectorGrid() {
  const t = useTranslations('sectors');

  const sectors = [
    {
      title: t('stock.title'),
      desc: t('stock.desc'),
      icon: LineChart
    },
    {
      title: t('realEstate.title'),
      desc: t('realEstate.desc'),
      icon: Building
    },
    {
      title: t('macro.title'),
      desc: t('macro.desc'),
      icon: Globe
    },
    {
      title: t('mindset.title'),
      desc: t('mindset.desc'),
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