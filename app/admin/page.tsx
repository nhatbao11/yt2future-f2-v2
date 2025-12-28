"use client";
import React, { useEffect, useState, useCallback } from 'react';
import { adminService } from '@/services/adminService';
import { reportService } from '@/services/reportService';
import { Clock, Users, FileText, ChevronLeft, ChevronRight, ShieldCheck, Layers, RefreshCcw } from 'lucide-react';

export default function AdminDashboard() {
  const [logs, setLogs] = useState<any[]>([]);
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalReports: 0,
    pendingReports: 0,
    totalCategories: 0
  });
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // 1. Tách hàm loadData để tái sử dụng khi cần Refresh
  const loadData = useCallback(async (isSilent = false) => {
    if (!isSilent) setLoading(true);
    else setRefreshing(true);

    try {
      const [users, allReports, cats, logData] = await Promise.all([
        adminService.getAllUsers().catch(() => []),
        reportService.getAllReportsAdmin().catch(() => ({ reports: [] })),
        reportService.getCategories().catch(() => ({ categories: [] })),
        adminService.getAuditLogs(page).catch(() => ({ logs: [], totalPages: 1 }))
      ]);

      const reportsList = allReports.reports || [];

      setStats({
        totalUsers: users.length,
        totalReports: reportsList.filter((r: any) => r.status === 'APPROVED').length,
        pendingReports: reportsList.filter((r: any) => r.status === 'PENDING').length,
        totalCategories: cats.categories?.length || 0
      });

      setLogs(logData.logs || []);
      setTotalPages(logData.totalPages || 1);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [page]);

  // 2. Lắng nghe sự kiện hệ thống để tự động cập nhật Log mà không cần F5
  useEffect(() => {
    loadData();

    window.addEventListener('refreshLogs', () => loadData(true));
    return () => window.removeEventListener('refreshLogs', () => loadData(true));
  }, [loadData]);

  if (loading) return (
    <div className="flex flex-col h-[60vh] items-center justify-center space-y-6 animate-in fade-in duration-700">
      <div className="w-16 h-16 border-8 border-slate-200 border-t-orange-500 animate-spin rounded-none shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"></div>
      <p className="font-black text-[#001a41] uppercase text-sm tracking-[0.5em] animate-pulse">Đồng bộ dữ liệu chiến lược</p>
    </div>
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-500 p-2 md:p-0">
      {/* 4 KHỐI THỐNG KÊ CHIẾN LƯỢC */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-slate-900">
        <StatCard title="Nhân sự" value={stats.totalUsers} Icon={Users} color="border-slate-900" bgIcon="bg-blue-50 text-blue-600" />
        <StatCard title="Báo cáo đã đăng" value={stats.totalReports} Icon={ShieldCheck} color="border-emerald-500" bgIcon="bg-emerald-50 text-emerald-600" />
        <StatCard title="Chờ duyệt bài" value={stats.pendingReports} Icon={FileText} color="border-orange-500" bgIcon="bg-orange-50 text-orange-600" pulse />
        <StatCard title="Danh mục ngành" value={stats.totalCategories} Icon={Layers} color="border-purple-500" bgIcon="bg-purple-50 text-purple-600" />
      </div>

      {/* NHẬT KÝ HỆ THỐNG */}
      <div className="bg-white border-4 border-slate-900 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] rounded-none overflow-hidden">
        <div className="p-5 border-b-4 border-slate-900 bg-[#001a41] flex items-center justify-between">
          <h3 className="font-black text-white uppercase text-[10px] tracking-[0.2em] flex items-center gap-3">
            <Clock size={16} className="text-orange-500" /> Nhật ký thao tác hệ thống
          </h3>
          <button onClick={() => loadData(true)} className="text-white hover:text-orange-500 transition-colors">
            <RefreshCcw size={14} className={refreshing ? 'animate-spin' : ''} />
          </button>
        </div>

        <div className="overflow-x-auto min-h-[300px]">
          <table className="w-full text-left border-collapse">
            <tbody className="text-[11px] font-bold text-slate-600">
              {logs.length > 0 ? logs.map((log) => (
                <tr key={log.id} className="border-b-2 border-slate-100 hover:bg-orange-50/30 transition-colors group">
                  <td className="p-4 flex items-center gap-3">
                    <div className="w-10 h-10 border-2 border-slate-900 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] overflow-hidden rounded-none bg-slate-200">
                      <img
                        src={log.adminAvatarUrl || '/Logo.jpg'}
                        className="w-full h-full object-cover"
                        onError={(e: any) => e.target.src = '/Logo.jpg'}
                      />
                    </div>
                    <div className="flex flex-col">
                      <span className="uppercase text-[#001a41] font-black text-[10px] group-hover:text-orange-600">{log.adminName || 'Admin'}</span>
                      <span className="text-[8px] text-slate-400 uppercase">{new Date(log.createdAt).toLocaleString('vi-VN')}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex flex-col md:flex-row md:items-center gap-3">
                      <span className={`inline-block px-3 py-1 text-[8px] font-black uppercase text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] rounded-none ${getActionColor(log.action)}`}>
                        {log.action}
                      </span>
                      <span className="text-slate-900 italic font-black text-[9px] uppercase tracking-tighter max-w-md truncate">
                        &gt; {log.target}
                      </span>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr><td colSpan={2} className="p-20 text-center uppercase text-[10px] font-black text-slate-300 tracking-[0.5em]">Hệ thống chưa ghi nhận thao tác</td></tr>
              )}
            </tbody>
          </table>
        </div>

        {/* PHÂN TRANG */}
        <div className="p-4 bg-slate-100 flex justify-between items-center text-slate-900 border-t-4 border-slate-900">
          <span className="text-[9px] font-black uppercase tracking-widest">Dữ liệu trang {page} / {totalPages}</span>
          <div className="flex gap-2">
            <PaginationBtn Icon={ChevronLeft} onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} />
            <PaginationBtn Icon={ChevronRight} onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages} />
          </div>
        </div>
      </div>
    </div>
  );
}

// Helper Components
function StatCard({ title, value, Icon, color, bgIcon, pulse = false }: any) {
  return (
    <div className={`bg-white p-6 border-4 border-slate-900 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex items-center justify-between group rounded-none border-t-[12px] ${color}`}>
      <div>
        <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{title}</p>
        <h3 className={`text-3xl font-black ${pulse ? 'animate-pulse' : ''}`}>{value}</h3>
      </div>
      <div className={`p-3 border-2 border-slate-900 rounded-none group-hover:bg-[#001a41] group-hover:text-white transition-all ${bgIcon}`}>
        <Icon size={20} />
      </div>
    </div>
  );
}

function PaginationBtn({ Icon, onClick, disabled }: any) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className="p-2 border-2 border-slate-900 bg-white hover:bg-orange-500 hover:text-white transition-all rounded-none disabled:opacity-20 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
    >
      <Icon size={16} />
    </button>
  );
}

function getActionColor(action: string) {
  if (action.includes('XÓA')) return 'bg-rose-600';
  if (action.includes('CẬP NHẬT') || action.includes('DUYỆT')) return 'bg-emerald-600';
  if (action.includes('TỪ CHỐI')) return 'bg-purple-600';
  return 'bg-blue-600';
}
