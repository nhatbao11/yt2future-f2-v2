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
      <div className="relative aspect-3/4 overflow-hidden bg-gray-100 rounded-sm mb-6">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700"
        />
        {/* Lớp phủ mờ nhẹ khi hover để hiện lĩnh vực, không cần nút bấm */}
        <div className="absolute inset-0 bg-[#001a41]/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-8">
          <p className="text-white text-[10px] uppercase tracking-[0.2em] font-bold mb-1 opacity-70">
            description:
          </p>
          <p className="text-white text-sm font-medium leading-tight uppercase tracking-wider">
            {field}
          </p>
        </div>
      </div>
      <h3 className="text-2xl font-black text-[#001a41] uppercase tracking-tighter">{name}</h3>
      <p className="text-orange-500 text-[10px] font-bold uppercase tracking-[0.2em] mt-1">{role}</p>
    </div>
  );
}