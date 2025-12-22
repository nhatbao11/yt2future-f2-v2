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
    <section className="py-24 max-w-360 mx-auto px-6 md:px-12 bg-white border-t border-gray-100">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {steps.map((step, i) => (
          <div key={i} className="relative group p-8 hover:bg-gray-50 transition-colors duration-500">
            {/* Số thứ tự lớn mờ phía sau */}
            <span className="absolute top-4 right-8 text-8xl font-black text-gray-100 group-hover:text-orange-500/10 transition-colors duration-500">
              0{i + 1}
            </span>

            <div className="relative z-10">
              <div className="text-orange-500 mb-6 group-hover:scale-110 transition-transform duration-500 origin-left">
                {step.icon}
              </div>
              <h3 className="text-2xl font-black text-[#001a41] uppercase tracking-tighter mb-4">
                {step.title}
              </h3>
              <p className="text-gray-500 font-light leading-relaxed text-sm">
                {step.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}