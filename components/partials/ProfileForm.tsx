// ProfileForm.tsx
"use client";

import { useState } from 'react';
import Image from 'next/image';
import PrimaryButton from '@/components/common/PrimaryButton';
import { handleUpdateProfile } from '@/app/[locale]/profile/actions';

export default function ProfileForm({ profile }: { profile: any }) {
  const [loading, setLoading] = useState(false);
  // State để cập nhật ảnh preview khi sếp dán link mới
  const [avatarPreview, setAvatarPreview] = useState(profile?.avatarUrl || '/Logo.jpg');

  return (
    <form action={async (formData) => {
      setLoading(true);
      await handleUpdateProfile(formData);
      setLoading(false);
      // Phát sự kiện để Navbar tự cập nhật lại ảnh ngay lập tức
      window.dispatchEvent(new Event('profileUpdated'));
    }} className="space-y-6">

      <div className="flex flex-col items-center gap-4">
        <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-yellow-100 shadow-md">
          <Image
            src={avatarPreview} // Dùng preview để thay đổi tức thì
            alt="Avatar"
            fill
            className="object-cover"
          />
        </div>
        <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">Avatar Hiện Tại</p>
      </div>

      <div className="space-y-4">
        <div className="group">
          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Họ và Tên</label>
          <input
            name="fullName"
            defaultValue={profile?.fullName}
            className="w-full bg-slate-50 border border-slate-200 p-3.5 mt-1 text-sm text-slate-900 font-bold rounded-md outline-none focus:border-yellow-500 transition-all"
          />
        </div>

        <div className="group">
          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Link ảnh đại diện</label>
          <input
            name="avatarUrl"
            defaultValue={profile?.avatarUrl}
            onChange={(e) => setAvatarPreview(e.target.value)} // Cập nhật preview khi gõ
            placeholder="https://example.com/image.jpg"
            className="w-full bg-slate-50 border border-slate-200 p-3.5 mt-1 text-sm text-slate-900 font-bold rounded-md outline-none focus:border-yellow-500 transition-all"
          />
        </div>
      </div>

      <div className="pt-4">
        <PrimaryButton
          label={loading ? "Đang cập nhật..." : "Lưu thay đổi"}
          type="submit"
          fullWidth={true}
          className="py-4 font-black uppercase tracking-wider"
        />
      </div>
    </form>
  );
}