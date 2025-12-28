"use client";
import React, { useEffect, useState } from 'react';
import { adminService } from '@/services/adminService';
import {
  Check, X, MessageSquare, ListFilter,
  Clock, CheckCircle2, User, Calendar, Star // Thêm icon Star
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
      setList(prev => prev.filter(item => item.id !== id));
      loadData();
    } catch (err) {
      alert("Lỗi thao tác!");
    }
  };

  return (
    <div className="p-4 md:p-8 space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">

      {/* HEADER SECTION - VUÔNG VỨC */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b-4 border-slate-900 pb-8">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-orange-500 text-white font-black text-[10px] uppercase tracking-widest rounded-none">
            Admin Console
          </div>
          <h1 className="text-4xl font-black text-[#001a41] uppercase tracking-tighter flex items-center gap-3">
            <MessageSquare size={36} className="text-orange-500" /> Quản lý đánh giá
          </h1>
        </div>

        {/* TAB FILTER VUÔNG */}
        <div className="flex bg-slate-200 p-1 rounded-none border-2 border-slate-900">
          <button
            onClick={() => setFilter('PENDING')}
            className={`flex items-center gap-2 px-6 py-3 font-black text-[11px] uppercase transition-all ${filter === 'PENDING'
              ? 'bg-[#001a41] text-white'
              : 'text-slate-600 hover:bg-white'
              } rounded-none`}
          >
            <Clock size={16} /> Chờ duyệt
          </button>
          <button
            onClick={() => setFilter('ALL')}
            className={`flex items-center gap-2 px-6 py-3 font-black text-[11px] uppercase transition-all ${filter === 'ALL'
              ? 'bg-[#001a41] text-white'
              : 'text-slate-600 hover:bg-white'
              } rounded-none`}
          >
            <ListFilter size={16} /> Tất cả
          </button>
        </div>
      </div>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-32 space-y-4">
          <div className="w-12 h-12 border-4 border-[#001a41] border-t-orange-500 animate-spin rounded-none"></div>
          <p className="font-black text-[#001a41] uppercase text-xs tracking-widest">Đang quét dữ liệu...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {list.map((fb) => (
            <div
              key={fb.id}
              className="group bg-white rounded-none border-4 border-slate-900 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all duration-300 flex flex-col"
            >
              <div className="p-6 space-y-4 flex-1">
                <div className="flex justify-between items-start">
                  <div className="flex items-center gap-3">
                    <img
                      src={fb.user?.avatarUrl || '/Logo.jpg'}
                      className="w-12 h-12 rounded-none object-cover border-2 border-slate-900"
                      alt="User"
                    />
                    <div>
                      <h4 className="font-black text-[#001a41] text-[10px] uppercase leading-tight">{fb.user?.fullName}</h4>
                      <div className="flex items-center gap-1 text-slate-400 font-bold text-[8px] uppercase mt-1">
                        <Calendar size={10} /> {new Date(fb.createdAt).toLocaleDateString('vi-VN')}
                      </div>
                    </div>
                  </div>

                  {fb.status !== 'PENDING' ? (
                    <span className={`px-2 py-1 text-[8px] font-black uppercase border-2 ${fb.status === 'APPROVED' ? 'border-green-600 text-green-600' : 'border-rose-600 text-rose-600'
                      }`}>
                      {fb.status === 'APPROVED' ? 'Đã duyệt' : 'Đã loại'}
                    </span>
                  ) : (
                    <div className="bg-orange-500 text-white p-1">
                      <Clock size={12} />
                    </div>
                  )}
                </div>

                {/* PHẦN HIỂN THỊ RATING (SỐ SAO) */}
                <div className="flex gap-1 py-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      fill={i < fb.rating ? "#f97316" : "none"}
                      className={i < fb.rating ? "text-orange-500" : "text-slate-300"}
                    />
                  ))}
                  <span className="ml-2 text-[10px] font-black text-slate-900 italic">({fb.rating}/5)</span>
                </div>

                <div className="bg-slate-50 p-4 border-2 border-slate-100 italic">
                  <p className="text-slate-900 font-bold text-sm leading-relaxed">
                    "{fb.content}"
                  </p>
                </div>
              </div>

              {/* THANH THAO TÁC VUÔNG */}
              {fb.status === 'PENDING' && (
                <div className="grid grid-cols-2 border-t-4 border-slate-900">
                  <button
                    onClick={() => handleAction(fb.id, 'APPROVED')}
                    className="flex items-center justify-center gap-2 bg-green-500 text-white py-4 font-black text-[10px] uppercase hover:bg-[#001a41] transition-all"
                  >
                    <Check size={16} /> Duyệt ngay
                  </button>
                  <button
                    onClick={() => handleAction(fb.id, 'REJECTED')}
                    className="flex items-center justify-center gap-2 bg-white text-rose-600 py-4 font-black text-[10px] uppercase hover:bg-rose-600 hover:text-white transition-all border-l-4 border-slate-900"
                  >
                    <X size={16} /> Loại bỏ
                  </button>
                </div>
              )}
            </div>
          ))}

          {list.length === 0 && (
            <div className="col-span-full py-32 border-4 border-dashed border-slate-300 flex flex-col items-center">
              <CheckCircle2 size={64} className="text-slate-200 mb-4" />
              <p className="text-slate-400 font-black uppercase text-xs tracking-widest">Không có dữ liệu đánh giá</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}