// components/common/PrimaryButton.tsx
"use client";
import React from 'react';
import { useRouter } from 'next/navigation';

interface PrimaryButtonProps {
  label: string;
  href?: string;
  type?: "button" | "submit";
  fullWidth?: boolean; // Thêm cái này để điều khiển độ rộng
  className?: string;
}

export default function PrimaryButton({
  label,
  href,
  type = "button",
  fullWidth = false, // Mặc định là không full
  className = ""
}: PrimaryButtonProps) {
  const router = useRouter();

  const handleClick = () => {
    if (href) router.push(href);
  };

  return (
    <button
      type={type}
      onClick={href ? handleClick : undefined}
      className={`
        relative overflow-hidden group bg-[#001a41] text-white 
        px-8 py-4 rounded-sm text-sm font-bold uppercase tracking-widest 
        transition-all duration-500 shadow-xl
        ${fullWidth ? 'w-full' : 'w-auto'} 
        ${className}
      `}
    >
      <span className="absolute inset-0 w-0 bg-orange-500 transition-all duration-500 ease-out group-hover:w-full z-0"></span>
      <span className="relative z-10 flex items-center justify-center gap-4">
        {label}
      </span>
    </button>
  );
}