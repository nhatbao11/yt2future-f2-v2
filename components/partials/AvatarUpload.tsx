"use client";

import { useState } from 'react';
import Image from 'next/image';
import { Camera } from 'lucide-react';

export default function AvatarUpload({ initialAvatar }: { initialAvatar: string }) {
  const [preview, setPreview] = useState(initialAvatar || '/Logo.jpg');

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Tạo đường dẫn tạm thời để hiển thị lên màn hình
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 mb-6">
      <div className="relative group">
        <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-2xl ring-2 ring-orange-500/20">
          <Image
            src={preview}
            alt="Avatar Preview"
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-500"
          />
        </div>
        <label htmlFor="avatar-upload" className="absolute bottom-1 right-1 bg-orange-500 p-2 rounded-full text-white cursor-pointer hover:bg-orange-600 shadow-lg transition-colors border-2 border-white">
          <Camera size={18} />
        </label>
      </div>
      <input
        id="avatar-upload"
        name="avatarFile"
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleImageChange}
      />
      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest italic">Bấm vào cam để chọn ảnh từ máy</p>
    </div>
  );
}