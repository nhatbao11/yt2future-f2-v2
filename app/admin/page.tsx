"use client";
import React, { useEffect, useState } from 'react';
import { adminService } from '@/services/adminService';
import { Clock, Activity, Users, ShieldCheck, ChevronLeft, ChevronRight } from 'lucide-react';

export default function AdminDashboard() {
  const [logs, setLogs] = useState<any[]>([]);
  const [stats, setStats] = useState({ total: 0, members: 0 });
  const [loading, setLoading] = useState(true);

  // LOGIC PHÂN TRANG
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        // Lấy thống kê và nhật ký theo trang
        const [users, logData] = await Promise.all([
          adminService.getAllUsers().catch(() => []),
          adminService.getAuditLogs(page).catch(() => ({ logs: [], totalPages: 1 }))
        ]);

        setStats({
          total: users.length,
          members: users.filter((u: any) => u.role === 'MEMBER').length
        });

        setLogs(logData.logs);
        setTotalPages(logData.totalPages);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [page]); // Chạy lại khi sếp đổi trang

  if (loading) return (
    <div className="flex h-64 items-center justify-center font-black text-[#001a41] animate-pulse uppercase tracking-widest text-sm">
      Đang đồng bộ dữ liệu...
    </div>
  );

  return (
    <div className="space-y-6 md:space-y-8 animate-in fade-in duration-500 p-2 md:p-0">
      {/* 1. KHỐI THỐNG KÊ (Giữ nguyên màu sắc cũ) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
        <div className="bg-white p-5 md:p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center justify-between group hover:border-[#001a41] transition-all">
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Tổng User</p>
            <h3 className="text-3xl md:text-4xl font-black text-[#001a41]">{stats.total}</h3>
          </div>
          <div className="p-3 md:p-4 bg-blue-50 text-blue-600 rounded-2xl group-hover:bg-[#001a41] group-hover:text-white transition-all">
            <Users size={24} />
          </div>
        </div>

        <div className="bg-white p-5 md:p-6 rounded-3xl border border-slate-100 shadow-sm flex items-center justify-between group hover:border-orange-500 transition-all">
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Thành viên VIP</p>
            <h3 className="text-3xl md:text-4xl font-black text-orange-500">{stats.members}</h3>
          </div>
          <div className="p-3 md:p-4 bg-orange-50 text-orange-600 rounded-2xl group-hover:bg-orange-500 group-hover:text-white transition-all">
            <Activity size={24} />
          </div>
        </div>
      </div>

      {/* 2. KHỐI NHẬT KÝ (5 dòng + Phân trang) */}
      <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 md:p-6 border-b border-slate-100 bg-[#fffbeb] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Clock size={18} className="text-orange-500" />
            <h3 className="font-black text-[#001a41] uppercase text-[10px] md:text-xs tracking-widest">
              Nhật ký hệ thống mới nhất (Trang {page})
            </h3>
          </div>
          <ShieldCheck size={16} className="text-slate-300 hidden md:block" />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <tbody className="text-[10px] md:text-[11px] font-bold text-slate-600">
              {logs.length > 0 ? logs.map((log) => (
                <tr key={log.id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                  <td className="p-3 md:p-4 min-w-[140px]">
                    <div className="flex items-center gap-2 md:gap-3">
                      <div className="relative flex-shrink-0">
                        <img
                          src={log.adminAvatarUrl || '/Logo.jpg'}
                          alt="Admin"
                          className="w-7 h-7 md:w-8 md:h-8 rounded-full object-cover border border-slate-200 shadow-sm"
                          onError={(e) => { (e.target as HTMLImageElement).src = '/Logo.jpg'; }}
                        />
                      </div>
                      <span className="uppercase text-[#001a41] truncate max-w-[80px] md:max-w-none">
                        {log.adminName}
                      </span>
                    </div>
                  </td>

                  <td className="p-3 md:p-4">
                    <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-2">
                      <span className={`inline-block w-fit px-2 py-0.5 rounded-[4px] text-[7px] md:text-[8px] font-black uppercase text-white shadow-sm ${log.action.includes('XÓA') ? 'bg-rose-500' : 'bg-blue-600'
                        }`}>
                        {log.action}
                      </span>
                      <span className="text-slate-400 italic font-medium truncate max-w-[120px] md:max-w-xs">
                        {log.target}
                      </span>
                    </div>
                  </td>

                  <td className="p-3 md:p-4 text-right text-slate-400 font-medium whitespace-nowrap">
                    <span>{new Date(log.createdAt).toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })}</span>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={3} className="p-10 text-center text-slate-400 italic font-bold">
                    Hệ thống chưa ghi nhận hoạt động nào.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* PHẦN ĐIỀU HƯỚNG PHÂN TRANG (Màu sắc đồng bộ) */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-between items-center">
          <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">
            Trang {page} / {totalPages}
          </span>
          <div className="flex gap-2">
            <button
              disabled={page === 1}
              onClick={() => setPage(p => Math.max(1, p - 1))}
              className="p-2 bg-white rounded-xl border border-slate-200 text-[#001a41] disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-100 transition-all shadow-sm"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              disabled={page === totalPages}
              onClick={() => setPage(p => Math.min(totalPages, p + 1))}
              className="p-2 bg-white rounded-xl border border-slate-200 text-[#001a41] disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-100 transition-all shadow-sm"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}