"use client";
import React, { useEffect, useState } from 'react';
import { adminService } from '@/services/adminService';
import {
  Check, X, MessageSquare, ListFilter,
  Clock, CheckCircle2, User, Calendar, Trash2
} from 'lucide-react';

export default function AdminFeedback() {
  const [list, setList] = useState<any[]>([]);
  const [filter, setFilter] = useState<'PENDING' | 'ALL'>('PENDING');
  const [loading, setLoading] = useState(true);

  const loadData = async () => {
    setLoading(true);
    try {
      const feedbacks = filter === 'PENDING'
        ? await adminService.getPendingFeedbacks()
        : await adminService.getAllFeedbacks();
      setList(feedbacks || []);
    } catch (err) {
      console.error("Lỗi rồi sếp:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadData(); }, [filter]);

  const handleAction = async (id: string, status: 'APPROVED' | 'REJECTED') => {
    try {
      await adminService.reviewFeedback(id, status);
      // Hiệu ứng xóa dòng mượt mà trước khi load lại
      setList(prev => prev.filter(item => item.id !== id));
      loadData();
    } catch (err) {
      alert("Lỗi thao tác!");
    }
  };

  return (
    <div className="p-4 md:p-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">

      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200 pb-8">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-100 text-orange-600 font-black text-[10px] uppercase tracking-widest">
            Control Panel
          </div>
          <h1 className="text-4xl font-black text-[#001a41] uppercase tracking-tighter flex items-center gap-3">
            <MessageSquare size={36} className="text-orange-500" /> Phản hồi khách hàng
          </h1>
          <p className="text-slate-400 font-bold text-xs uppercase italic tracking-wider">
            Quản lý và phê duyệt cảm nhận từ cộng đồng nhà đầu tư
          </p>
        </div>

        {/* BỘ LỌC TAB - SIÊU ĐẸP */}
        <div className="flex bg-slate-100 p-1.5 rounded-[24px] gap-1 shadow-inner border border-slate-200">
          <button
            onClick={() => setFilter('PENDING')}
            className={`flex items-center gap-2 px-6 py-3 rounded-[20px] font-black text-[11px] uppercase transition-all duration-300 ${filter === 'PENDING'
                ? 'bg-[#001a41] text-white shadow-xl scale-105'
                : 'text-slate-500 hover:bg-white hover:text-[#001a41]'
              }`}
          >
            <Clock size={16} /> Chờ duyệt
          </button>
          <button
            onClick={() => setFilter('ALL')}
            className={`flex items-center gap-2 px-6 py-3 rounded-[20px] font-black text-[11px] uppercase transition-all duration-300 ${filter === 'ALL'
                ? 'bg-[#001a41] text-white shadow-xl scale-105'
                : 'text-slate-500 hover:bg-white hover:text-[#001a41]'
              }`}
          >
            <ListFilter size={16} /> Tất cả log
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-32 space-y-4">
          <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="font-black text-[#001a41] uppercase text-xs tracking-[0.3em] animate-pulse">Đang đồng bộ dữ liệu...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {list.map((fb) => (
            <div
              key={fb.id}
              className="group bg-white rounded-[40px] border border-slate-100 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 overflow-hidden flex flex-col border-b-4 hover:border-b-orange-500"
            >
              {/* PHẦN NỘI DUNG */}
              <div className="p-8 space-y-6 flex-1">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <img
                        src={fb.user?.avatarUrl || '/Logo.jpg'}
                        className="w-14 h-14 rounded-full object-cover border-2 border-slate-100 group-hover:border-orange-400 transition-colors"
                        alt="User"
                      />
                      <div className="absolute -bottom-1 -right-1 bg-green-500 w-4 h-4 rounded-full border-2 border-white"></div>
                    </div>
                    <div>
                      <h4 className="font-black text-[#001a41] text-sm uppercase leading-tight">{fb.user?.fullName}</h4>
                      <div className="flex items-center gap-1 text-slate-400 font-bold text-[9px] uppercase mt-1">
                        <Calendar size={10} /> {new Date(fb.createdAt).toLocaleDateString('vi-VN')}
                      </div>
                    </div>
                  </div>

                  {/* TRẠNG THÁI HIỆN TẠI */}
                  {fb.status !== 'PENDING' && (
                    <span className={`px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-tighter ${fb.status === 'APPROVED' ? 'bg-green-100 text-green-600' : 'bg-rose-100 text-rose-600'
                      }`}>
                      {fb.status === 'APPROVED' ? 'Đã duyệt' : 'Đã loại'}
                    </span>
                  )}
                </div>

                <div className="relative">
                  <span className="absolute -top-4 -left-2 text-6xl text-slate-100 font-serif group-hover:text-orange-50/50 transition-colors">“</span>
                  <p className="text-slate-900 font-bold italic text-base leading-relaxed relative z-10 px-2">
                    {fb.content}
                  </p>
                </div>
              </div>

              {/* THANH THAO TÁC - CHỈ HIỆN KHI CHỜ DUYỆT */}
              {fb.status === 'PENDING' && (
                <div className="bg-slate-50 p-4 grid grid-cols-2 gap-3 border-t border-slate-100">
                  <button
                    onClick={() => handleAction(fb.id, 'APPROVED')}
                    className="flex items-center justify-center gap-2 bg-green-600 text-white py-3 rounded-2xl font-black text-[10px] uppercase hover:bg-green-700 transition-all shadow-lg shadow-green-100 hover:shadow-green-200"
                  >
                    <Check size={16} /> Phê duyệt
                  </button>
                  <button
                    onClick={() => handleAction(fb.id, 'REJECTED')}
                    className="flex items-center justify-center gap-2 bg-white text-rose-600 border-2 border-rose-100 py-3 rounded-2xl font-black text-[10px] uppercase hover:bg-rose-600 hover:text-white transition-all shadow-sm"
                  >
                    <X size={16} /> Từ chối
                  </button>
                </div>
              )}
            </div>
          ))}

          {/* EMPTY STATE */}
          {list.length === 0 && (
            <div className="col-span-full flex flex-col items-center justify-center py-32 border-4 border-dashed border-slate-100 rounded-[60px] bg-slate-50/50">
              <CheckCircle2 size={80} className="text-slate-200 mb-6" />
              <h3 className="font-black text-slate-400 uppercase tracking-[0.4em] text-sm">Hệ thống sạch bóng phản hồi</h3>
              <p className="text-slate-300 font-bold text-[10px] uppercase mt-2 italic">Tất cả dữ liệu đã được xử lý xong sếp nhé!</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}