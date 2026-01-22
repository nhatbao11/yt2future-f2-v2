"use client";
import Image from 'next/image';

interface MemberProps {
  name: string;
  role: string;
  image: string;
  field: string;
}

export default function MemberCard({ name, role, image, field }: MemberProps) {
  return (
    <div className="group flex flex-col items-center text-center bg-white p-6 md:p-8 border border-slate-200 hover:border-slate-300 shadow-sm hover:shadow-md transition-all duration-300">
      {/* Avatar - Higher Quality */}
      <div className="relative w-40 h-40 md:w-48 md:h-48 rounded-full overflow-hidden mb-6 bg-slate-100 ring-4 ring-slate-100 group-hover:ring-yellow-500 transition-all duration-300">
        <Image
          src={image}
          alt={name}
          fill
          quality={95}
          priority
          className="object-cover"
        />
      </div>

      {/* Info */}
      <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-2">{name}</h3>
      <p className="text-sm font-semibold text-yellow-600 uppercase tracking-wider mb-3">{role}</p>
      <p className="text-sm text-slate-600 leading-relaxed max-w-xs">{field}</p>
    </div>
  );
}