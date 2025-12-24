"use client";
import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard, Users, FileText, Layers,
  MessageSquare, LogOut, ShieldCheck, ChevronRight, Menu
} from 'lucide-react';
import PageHeader from '@/components/layout/PageHeader';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const menuItems = [
    { icon: <LayoutDashboard size={18} />, label: 'Tổng quan', href: '/admin' },
    { icon: <Users size={18} />, label: 'Người dùng', href: '/admin/users' },
    { icon: <FileText size={18} />, label: 'Bài viết', href: '/admin/posts' },
    { icon: <Layers size={18} />, label: 'Danh mục', href: '/admin/categories' },
    { icon: <MessageSquare size={18} />, label: 'Phản hồi', href: '/admin/feedbacks' },
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col antialiased">
      <PageHeader title="Admin" />

      {/* 2. MAIN GRID SYSTEM - Xử lý responsive bằng Flex/Grid thông minh */}
      <div className="max-w-360 mx-auto w-full px-4 md:px-12 py-6 md:py-10 grow flex flex-col lg:flex-row gap-6 md:gap-8">

        {/* SIDEBAR - Tự động chuyển thành Top-bar trên mobile */}
        <aside className="w-full lg:w-64 shrink-0">
          <div className="sticky top-24 space-y-4">
            {/* Navigation Card */}
            <nav className="bg-white border border-slate-200 rounded-2xl shadow-sm p-2 flex lg:flex-col overflow-x-auto lg:overflow-visible no-scrollbar gap-1">
              {menuItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-3 p-3 md:p-4 rounded-xl transition-all duration-300 whitespace-nowrap lg:whitespace-normal group relative ${isActive
                      ? 'bg-[#001a41] text-white shadow-md'
                      : 'text-slate-500 hover:bg-slate-50 hover:text-[#001a41]'
                      }`}
                  >
                    <span className={`${isActive ? 'text-orange-500' : 'text-slate-400 group-hover:text-orange-500'} transition-colors`}>
                      {item.icon}
                    </span>
                    <span className="text-[10px] md:text-[11px] font-black uppercase tracking-widest">{item.label}</span>
                    {isActive && <ChevronRight size={14} className="ml-auto hidden lg:block text-orange-500 animate-pulse" />}
                  </Link>
                );
              })}

              <div className="hidden lg:block border-t border-slate-100 mt-4 pt-4 px-2">
                <button className="w-full flex items-center gap-3 p-3 rounded-xl text-rose-500 hover:bg-rose-50 transition-all font-black text-[10px] uppercase tracking-widest group">
                  <LogOut size={18} className="group-hover:-translate-x-1 transition-transform" />
                  <span>Đăng xuất</span>
                </button>
              </div>
            </nav>
          </div>
        </aside>

        {/* CONTENT AREA - Trải rộng tối đa diện tích */}
        <main className="flex-1 min-w-0">
          <div className="bg-white border border-slate-200 rounded-2xl md:rounded-4xl p-5 md:p-10 shadow-sm min-h-125 lg:min-h-175 transition-all overflow-x-hidden">
            {children}
          </div>
        </main>
      </div>

      {/* MOBILE LOGOUT - Chỉ hiện trên màn hình nhỏ */}
      <div className="lg:hidden px-4 pb-6">
        <button className="w-full bg-rose-50 text-rose-600 p-4 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] border border-rose-100 active:scale-95 transition-transform">
          Thoát khỏi hệ thống Admin
        </button>
      </div>
    </div>
  );
}