"use client";

import SectorCard from './SectorCard';
import { LineChart, Coins, Globe, Lightbulb } from 'lucide-react';

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
      desc: "Nắm bắt nhịp đập kinh tế toàn cầu, từ lãi suất FED đến dòng chảy dòng tiền.",
      icon: Globe
    },
    {
      title: "Tư duy tài chính",
      desc: "Xây dựng tâm lý đầu tư vững vàng và kỹ năng quản lý vốn cá nhân hiệu quả.",
      icon: Lightbulb
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 border border-gray-100 divide-x divide-y md:divide-y-0">
      {sectors.map((s, i) => (
        <SectorCard key={i} title={s.title} desc={s.desc} icon={s.icon} />
      ))}
    </div>
  );
}