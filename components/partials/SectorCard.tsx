import { LucideIcon } from 'lucide-react';

interface SectorProps {
  title: string;
  desc: string;
  icon: LucideIcon;
}

export default function SectorCard({ title, desc, icon: Icon }: SectorProps) {
  return (
    <div className="group relative p-10 bg-white border border-gray-100 hover:bg-[#001a41] transition-all duration-500 flex flex-col items-start overflow-hidden">
      {/* Icon lớn mờ nằm ẩn ở góc */}
      <Icon className="absolute -right-6 -bottom-6 size-32 text-gray-50 group-hover:text-white/5 transition-all duration-700" />

      <div className="relative z-10">
        <div className="mb-8 p-4 bg-orange-50 group-hover:bg-orange-500 transition-colors duration-500 rounded-sm">
          <Icon className="text-orange-500 group-hover:text-white transition-colors duration-500" size={32} />
        </div>
        <h3 className="text-xl font-black text-[#001a41] group-hover:text-white uppercase tracking-tighter mb-4 transition-colors">
          {title}
        </h3>
        <p className="text-gray-500 group-hover:text-white/70 text-sm leading-relaxed font-light transition-colors">
          {desc}
        </p>
        <div className="mt-8 w-8 h-1 bg-orange-500 group-hover:w-full transition-all duration-500"></div>
      </div>
    </div>
  );
}