"use client";
import React from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard, Users, FileText, Layers,
  MessageSquare, LogOut, ChevronRight
} from 'lucide-react';
import PageHeader from '@/components/layout/PageHeader';
import Cookies from 'js-cookie'; // Thêm để xóa cookie khi thoát

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const menuItems = [
    { icon: <LayoutDashboard size={18} />, label: 'Tổng quan', href: '/admin' },
    { icon: <Users size={18} />, label: 'Người dùng', href: '/admin/users' },
    // SỬA TẠI ĐÂY: Trỏ đúng vào trang quản lý báo cáo
    { icon: <FileText size={18} />, label: 'Báo cáo', href: '/admin/reports' },
    { icon: <Layers size={18} />, label: 'Danh mục', href: '/admin/categories' },
    { icon: <MessageSquare size={18} />, label: 'Phản hồi', href: '/admin/feedbacks' },
  ];

  const handleLogout = () => {
    // Xóa Token để thoát hệ thống
    Cookies.remove('yt_capital_token');
    router.push('/');
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col antialiased">
      <PageHeader title="Admin Panel" />
      <div className="max-w-360 mx-auto w-full px-6 md:px-12 py-8 md:py-12 grow flex flex-col lg:flex-row gap-6 md:gap-10">
        <aside className="w-full lg:w-64 shrink-0">
          <div className="sticky top-24">
            <nav className="bg-white border-4 border-[#001a41] rounded-none shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-2 flex lg:flex-col overflow-x-auto lg:overflow-visible no-scrollbar gap-1">
              {menuItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-3 p-4 rounded-none transition-all duration-200 border-2 ${isActive
                      ? 'bg-[#001a41] text-white border-[#001a41] shadow-[4px_4px_0px_0px_rgba(249,115,22,1)] translate-x-1 translate-y-1'
                      : 'text-slate-500 border-transparent hover:bg-slate-50 hover:border-[#001a41]'
                      }`}
                  >
                    <span className={isActive ? 'text-orange-500' : 'text-slate-400'}>{item.icon}</span>
                    <span className="text-[10px] md:text-[11px] font-black uppercase tracking-[0.2em]">{item.label}</span>
                    {isActive && <ChevronRight size={14} className="ml-auto hidden lg:block text-orange-500" />}
                  </Link>
                );
              })}
              <div className="hidden lg:block border-t-4 border-[#001a41] mt-4 pt-4 px-2 pb-2">
                <button onClick={handleLogout} className="w-full flex items-center gap-3 p-4 rounded-none text-rose-600 hover:bg-rose-600 hover:text-white transition-all font-black text-[10px] uppercase tracking-widest border-2 border-transparent hover:border-[#001a41]">
                  <LogOut size={18} />
                  <span>THOÁT HỆ THỐNG</span>
                </button>
              </div>
            </nav>
          </div>
        </aside>

        <main className="flex-1 min-w-0">
          <div className="bg-white border-4 border-[#001a41] rounded-none p-6 md:p-10 lg:p-12 shadow-[12px_12px_0px_0px_rgba(0,26,65,1)] min-h-[600px] transition-all overflow-x-hidden overflow-y-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}