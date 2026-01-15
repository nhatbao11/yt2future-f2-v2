"use client"; // Giữ tương tác ở đây
import Image from 'next/image';

interface MemberProps {
  name: string;
  role: string;
  image: string;
  field: string;
}

export default function MemberCard({ name, role, image, field }: MemberProps) {
  return (
    <div className="group flex flex-col items-center text-center">
      <div className="relative w-32 h-32 md:w-48 md:h-48 rounded-full overflow-hidden border-4 border-gray-100 shadow-md mb-6 group-hover:border-[#001a41] transition-all duration-500">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover grayscale-0 transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      <h3 className="text-xl md:text-2xl font-black text-[#001a41] uppercase tracking-tighter leading-tight">{name}</h3>
      <p className="text-yellow-500 text-[10px] font-bold uppercase tracking-[0.2em] mt-1 mb-3">{role}</p>
      <p className="text-gray-500 text-xs md:text-sm font-medium leading-relaxed max-w-[240px] opacity-80">{field}</p>
    </div>
  );
}