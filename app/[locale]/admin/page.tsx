"use client";
import React, { useEffect, useState, useCallback } from 'react';
import { adminService } from '@/services/adminService';
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

  const loadData = useCallback(async (isSilent = false) => {
    if (!isSilent) setLoading(true);
    else setRefreshing(true);

    try {
      const [statsData, logData] = await Promise.all([
        adminService.getDashboardStats().catch(() => ({ stats: {} })),
        adminService.getAuditLogs(page).catch(() => ({ logs: [], totalPages: 1 }))
      ]);

      if (statsData.success) {
        setStats(statsData.stats);
      }

      setLogs(logData.logs || []);
      setTotalPages(logData.totalPages || 1);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, [page]);

  useEffect(() => {
    loadData();
    window.addEventListener('refreshLogs', () => loadData(true));
    return () => window.removeEventListener('refreshLogs', () => loadData(true));
  }, [loadData]);

  if (loading) return (
    <div className="flex flex-col h-[60vh] items-center justify-center space-y-6">
      <div className="w-12 h-12 border-3 border-gray-200 border-t-gray-900 animate-spin rounded-full"></div>
      <p className="font-semibold text-gray-600 uppercase text-xs tracking-wide">Đang tải dữ liệu...</p>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* STAT CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard title="Nhân sự" value={stats.totalUsers} Icon={Users} color="bg-blue-50" iconColor="text-blue-600" />
        <StatCard title="Báo cáo đã đăng" value={stats.totalReports} Icon={ShieldCheck} color="bg-green-50" iconColor="text-green-600" />
        <StatCard title="Chờ duyệt bài" value={stats.pendingReports} Icon={FileText} color="bg-yellow-50" iconColor="text-yellow-600" pulse />
        <StatCard title="Danh mục ngành" value={stats.totalCategories} Icon={Layers} color="bg-purple-50" iconColor="text-purple-600" />
      </div>

      {/* AUDIT LOG */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 bg-gray-50 flex items-center justify-between">
          <h3 className="font-semibold text-gray-900 text-sm uppercase tracking-wide flex items-center gap-2">
            <Clock size={16} className="text-gray-600" /> Nhật ký thao tác hệ thống
          </h3>
          <button onClick={() => loadData(true)} className="text-gray-600 hover:text-gray-900 transition-colors">
            <RefreshCcw size={14} className={refreshing ? 'animate-spin' : ''} />
          </button>
        </div>

        <div className="overflow-x-auto min-h-[300px]">
          <table className="w-full text-left border-collapse">
            <tbody className="text-xs text-gray-600">
              {logs.length > 0 ? logs.map((log) => (
                <tr key={log.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                  <td className="p-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-200 bg-gray-100">
                      <img
                        src={log.adminAvatarUrl || '/Logo.jpg'}
                        className="w-full h-full object-cover"
                        onError={(e: any) => e.target.src = '/Logo.jpg'}
                      />
                    </div>
                    <div className="flex flex-col">
                      <span className="font-semibold text-gray-900 text-xs">{log.adminName || 'Admin'}</span>
                      <span className="text-xs text-gray-500">{new Date(log.createdAt).toLocaleString('vi-VN')}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex flex-col md:flex-row md:items-center gap-2">
                      <span className={`inline-block px-2.5 py-1 text-xs font-semibold rounded-md ${getActionColor(log.action)}`}>
                        {log.action}
                      </span>
                      <span className="text-gray-700 text-xs max-w-md truncate">
                        {log.target}
                      </span>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr><td colSpan={2} className="p-20 text-center text-xs font-semibold text-gray-400 uppercase tracking-wide">Hệ thống chưa ghi nhận thao tác</td></tr>
              )}
            </tbody>
          </table>
        </div>

        {/* PAGINATION */}
        <div className="px-6 py-4 bg-gray-50 flex justify-between items-center border-t border-gray-200">
          <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Trang {page} / {totalPages}</span>
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
function StatCard({ title, value, Icon, color, iconColor, pulse = false }: any) {
  return (
    <div className={`${color} p-5 rounded-lg border border-gray-200 flex items-center justify-between group hover:shadow-md transition-all`}>
      <div>
        <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-1">{title}</p>
        <h3 className={`text-3xl font-bold text-gray-900 ${pulse ? 'animate-pulse' : ''}`}>{value}</h3>
      </div>
      <div className={`p-3 rounded-lg ${iconColor} bg-white/50`}>
        <Icon size={24} />
      </div>
    </div>
  );
}

function PaginationBtn({ Icon, onClick, disabled }: any) {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className="p-2 border border-gray-300 bg-white hover:bg-gray-50 transition-all rounded-md disabled:opacity-30 disabled:cursor-not-allowed"
    >
      <Icon size={16} />
    </button>
  );
}

function getActionColor(action: string) {
  if (action.includes('XÓA')) return 'bg-red-100 text-red-700';
  if (action.includes('CẬP NHẬT') || action.includes('DUYỆT')) return 'bg-green-100 text-green-700';
  if (action.includes('TỪ CHỐI')) return 'bg-purple-100 text-purple-700';
  return 'bg-blue-100 text-blue-700';
}
