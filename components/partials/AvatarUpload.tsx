"use client";
import { useState } from 'react';
import Image from 'next/image';
import { Camera } from 'lucide-react';

export default function AvatarUpload({ initialAvatar }: { initialAvatar: string }) {
  const [preview, setPreview] = useState(initialAvatar || '/Logo.jpg');

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file)); // Chỉ hiện preview tạm thời
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 mb-6">
      <div className="relative group">
        <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-2xl ring-2 ring-orange-500/20">
          <Image src={preview} alt="Avatar" fill className="object-cover group-hover:scale-110 transition-all" />
        </div>
        <label htmlFor="avatar-upload" className="absolute bottom-1 right-1 bg-orange-500 p-2 rounded-full text-white cursor-pointer border-2 border-white">
          <Camera size={18} />
        </label>
      </div>
      {/* Quan trọng: name="avatarFile" để Server Action bốc được file thật */}
      <input id="avatar-upload" name="avatarFile" type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
      <p className="text-[10px] text-slate-400 font-bold uppercase italic">Bấm cam để chọn ảnh (Chế độ Signed)</p>
    </div>
  );
}