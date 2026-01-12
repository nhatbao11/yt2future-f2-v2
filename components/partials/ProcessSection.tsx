"use client";
import { Search, PenTool, Share2 } from 'lucide-react';

export default function ProcessSection() {
  const steps = [
    {
      icon: <Search size={32} />,
      title: "Nghiên cứu",
      desc: "Chúng mình chủ động tìm kiếm và phân tích các nguồn kiến thức uy tín, báo cáo tài chính mới nhất."
    },
    {
      icon: <PenTool size={32} />,
      title: "Hệ thống hóa",
      desc: "Đơn giản hóa những khái niệm phức tạp, lọc bỏ 'tạp âm' để giữ lại những giá trị cốt lõi dễ tiếp cận nhất."
    },
    {
      icon: <Share2 size={32} />,
      title: "Chia sẻ",
      desc: "Lan tỏa tri thức đến cộng đồng thông qua website và các nền tảng xã hội, cùng nhau tiến bộ mỗi ngày."
    }
  ];

  return (
    <section className="py-24 md:py-40 max-w-360 mx-auto px-6 md:px-12 bg-white border-t border-gray-100 overflow-hidden font-black italic">
      <div className="flex flex-col lg:flex-row gap-16 lg:gap-12 justify-between relative">

        {/* Đường line nối mờ trên máy tính */}
        <div className="hidden lg:block absolute top-[48px] left-0 w-full h-[1px] bg-slate-100 z-0" />

        {steps.map((step, i) => (
          <div key={i} className="relative group flex flex-row lg:flex-col items-start lg:items-center gap-6 lg:gap-10 flex-1">

            {/* 1. KHỐI SỐ NỀN (NỔI HƠN TRÊN PC) */}
            <span className="hidden lg:block absolute -top-20 left-1/2 -translate-x-1/2 text-[140px] font-black text-slate-900/[0.05] group-hover:text-yellow-500/[0.1] group-hover:-translate-y-6 transition-all duration-700 -z-10 select-none tracking-tighter not-italic">
              0{i + 1}
            </span>

            {/* 2. KHỐI ICON: NỔI KHỐI 3D KHI HOVER */}
            <div className="relative z-10 shrink-0">
              <div className="w-14 h-14 lg:w-24 lg:h-24 bg-[#001a41] text-yellow-500 flex items-center justify-center 
                            shadow-[4px_4px_0px_0px_rgba(234,179,8,1)] 
                            lg:group-hover:-translate-y-6 lg:group-hover:-translate-x-2 
                            lg:group-hover:shadow-[20px_20px_0px_0px_rgba(234,179,8,1)] 
                            transition-all duration-500 ease-out">
                {step.icon}
              </div>

              {/* Đường kẻ dọc nối cho Mobile (Giữ nguyên cái sếp ưng) */}
              {i !== steps.length - 1 && (
                <div className="w-[1px] h-24 bg-slate-100 mx-auto mt-4 lg:hidden" />
              )}
            </div>

            {/* 3. KHỐI NỘI DUNG */}
            <div className="relative z-10 lg:text-center space-y-4 pt-2 lg:pt-0">
              <div className="flex items-center lg:justify-center gap-2">
                <span className="text-yellow-500 text-xl lg:text-lg tracking-[0.3em] font-black">0{i + 1}.</span>
                <h3 className="text-xl lg:text-3xl font-black text-[#001a41] uppercase tracking-tighter italic leading-none">
                  {step.title}
                </h3>
              </div>

              <div className="h-1 w-12 bg-yellow-500 lg:mx-auto hidden lg:block opacity-0 group-hover:opacity-100 transition-all duration-500"></div>

              <p className="text-gray-400 font-bold leading-relaxed text-[11px] lg:text-[13px] uppercase tracking-widest max-w-[280px] lg:mx-auto not-italic">
                {step.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}