"use client";
import React from 'react';
import Link from '@/components/common/Link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard, Users, FileText, Layers,
  MessageSquare, LogOut, ChevronRight
} from 'lucide-react';
import PageHeader from '@/components/layout/PageHeader';
import Cookies from 'js-cookie';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const menuItems = [
    { icon: <LayoutDashboard size={18} />, label: 'Tổng quan', href: '/admin' },
    { icon: <Users size={18} />, label: 'Người dùng', href: '/admin/users' },
    { icon: <FileText size={18} />, label: 'Báo cáo', href: '/admin/reports' },
    { icon: <Layers size={18} />, label: 'Danh mục', href: '/admin/categories' },
    { icon: <MessageSquare size={18} />, label: 'Phản hồi', href: '/admin/feedbacks' },
  ];

  const handleLogout = () => {
    Cookies.remove('yt2future_token');
    router.push('/');
    router.refresh();
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col antialiased">
      <PageHeader title="Admin Panel" />
      <div className="max-w-360 mx-auto w-full px-6 md:px-12 py-8 md:py-12 grow flex flex-col lg:flex-row gap-6 md:gap-10">
        <aside className="w-full lg:w-64 shrink-0">
          <div className="sticky top-24">
            <nav className="bg-white border border-gray-200 rounded-lg shadow-sm p-2 flex lg:flex-col overflow-x-auto lg:overflow-visible no-scrollbar gap-1">
              {menuItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-3 px-4 py-3 rounded-md transition-all duration-200 ${isActive
                      ? 'bg-gray-900 text-white shadow-sm'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      }`}
                  >
                    <span className={isActive ? 'text-yellow-500' : 'text-gray-400'}>{item.icon}</span>
                    <span className="text-xs font-semibold uppercase tracking-wide whitespace-nowrap">{item.label}</span>
                    {isActive && <ChevronRight size={14} className="ml-auto hidden lg:block text-yellow-500" />}
                  </Link>
                );
              })}
              <div className="hidden lg:block border-t border-gray-200 mt-4 pt-4 px-2 pb-2">
                <button onClick={handleLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-md text-red-600 hover:bg-red-50 transition-all font-semibold text-xs uppercase tracking-wide">
                  <LogOut size={18} />
                  <span>Thoát hệ thống</span>
                </button>
              </div>
            </nav>
          </div>
        </aside>

        <main className="flex-1 min-w-0">
          <div className="bg-white border border-gray-200 rounded-lg p-6 md:p-10 lg:p-12 shadow-sm min-h-[600px] transition-all overflow-x-hidden overflow-y-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}