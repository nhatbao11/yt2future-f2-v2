"use client";
import React, { useState } from 'react';

interface UserAvatarProps {
  src?: string | null;
  name: string;
}

export const UserAvatar = ({ src, name }: UserAvatarProps) => {
  const [isError, setIsError] = useState(false);

  // Kiểm tra: Nếu có link ảnh và link đó không lỗi thì hiện ảnh User
  const showUserImg = src && src.trim() !== "" && !isError;

  return (
    <div className="w-10 h-10 relative flex-shrink-0 overflow-hidden rounded-full border border-slate-200 shadow-sm bg-white">
      {showUserImg ? (
        <img
          src={src as string}
          alt={name}
          className="w-full h-full object-cover"
          onError={() => setIsError(true)}
        />
      ) : (
        /* Fallback: Hiện file Logo.jpg từ thư mục public */
        <img
          src="/Logo.jpg"
          alt="YT Capital Logo"
          className="w-full h-full object-cover"
        />
      )}
    </div>
  );
};