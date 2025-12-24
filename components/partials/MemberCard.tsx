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
    <div className="group relative">
      <div className="relative aspect-3/4 overflow-hidden bg-gray-100 rounded-sm mb-6 shadow-md">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover grayscale-0 lg:grayscale lg:group-hover:grayscale-0 transition-all duration-700"
        />

        <div className="absolute inset-0 bg-linear-to-t from-[#001a41]/90 via-[#001a41]/40 to-transparent 
                        opacity-100 lg:opacity-0 lg:group-hover:opacity-100 transition-opacity duration-500 
                        flex flex-col justify-end p-5 md:p-8">
          <p className="text-white text-[9px] uppercase tracking-[0.2em] font-bold mb-1 opacity-70">Expertise:</p>
          <p className="text-white text-[12px] md:text-sm font-medium leading-tight uppercase tracking-wider">{field}</p>
        </div>
      </div>
      <h3 className="text-2xl font-black text-[#001a41] uppercase tracking-tighter">{name}</h3>
      <p className="text-orange-500 text-[10px] font-bold uppercase tracking-[0.2em] mt-1">{role}</p>
    </div>
  );
}