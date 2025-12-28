"use client";
import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { MessageSquarePlus, Send, X, Star, ChevronDown, ChevronUp } from 'lucide-react';
import 'swiper/css';
import 'swiper/css/pagination';

export default function FeedbackHome() {
  const [feedbacks, setFeedbacks] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [content, setContent] = useState('');
  const [rating, setRating] = useState(5);
  const [loading, setLoading] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const BACKEND_URL = 'http://localhost:5000/api';
  const MAX_LENGTH = 250;

  const loadFeedbacks = async () => {
    try {
      const res = await fetch(`${BACKEND_URL}/feedback/home`);
      const data = await res.json();
      if (data.success) setFeedbacks(data.feedbacks || []);
    } catch (err) { console.error("Lỗi API:", err); }
  };

  useEffect(() => { loadFeedbacks(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;
    setLoading(true);
    try {
      const res = await fetch(`${BACKEND_URL}/feedback/send`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content, rating }),
        credentials: 'include'
      });
      const data = await res.json();
      if (data.success) {
        setContent(''); setRating(5); setIsModalOpen(false);
      }
    } catch (err) { alert("Lỗi kết nối!"); } finally { setLoading(false); }
  };

  return (
    <section className="py-12 md:py-24 bg-gray-50 relative overflow-hidden">
      <div className="max-w-360 mx-auto px-4 md:px-12">
        {/* TIÊU ĐỀ - GIẢM SIZE TRÊN MOBILE */}
        <div className="mb-10 md:mb-16 border-l-4 md:border-l-8 border-[#001a41] pl-4 md:pl-6 text-left">
          <h2 className="font-black text-[#001a41] text-2xl md:text-5xl uppercase tracking-tighter leading-tight">
            Cảm nhận <span className="text-orange-500">khách hàng</span>
          </h2>
          <p className="text-[8px] md:text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mt-1">
            Hệ thống đánh giá từ Y&T Capital
          </p>
        </div>

        {feedbacks.length > 0 ? (
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={15}
            slidesPerView={1.1} // Hiện một phần card tiếp theo trên mobile để gợi ý vuốt
            centeredSlides={false}
            autoplay={{ delay: 5000 }}
            pagination={{ clickable: true }}
            breakpoints={{
              640: { slidesPerView: 2, spaceBetween: 24 },
              1024: { slidesPerView: 3, spaceBetween: 30 }
            }}
            className="pb-14"
          >
            {feedbacks.map((fb) => {
              const isExpanded = expandedId === fb.id;
              return (
                <SwiperSlide key={fb.id} className="h-auto">
                  <div className="bg-white p-5 md:p-8 border-2 border-slate-900 shadow-[4px_4px_0px_0px_rgba(0,26,65,1)] md:shadow-[6px_6px_0px_0px_rgba(0,26,65,1)] h-[320px] md:h-[400px] flex flex-col justify-between transition-all rounded-none relative group hover:translate-x-1 hover:translate-y-1 hover:shadow-none">
                    <div className="text-left">
                      <div className="flex gap-0.5 mb-3 md:mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={10} fill={i < fb.rating ? "#f97316" : "none"} className={i < fb.rating ? "text-orange-500" : "text-slate-300"} />
                        ))}
                      </div>

                      <div className="relative">
                        <p className={`text-slate-900 font-bold italic text-xs md:text-base leading-relaxed transition-all duration-300 
                          ${isExpanded ? 'line-clamp-none overflow-y-auto max-h-[140px] md:max-h-[180px]' : 'line-clamp-4 md:line-clamp-5 md:group-hover:line-clamp-none md:group-hover:max-h-[180px] md:group-hover:overflow-y-auto'}`}>
                          "{fb.content}"
                        </p>

                        {fb.content.length > 100 && (
                          <button
                            onClick={() => setExpandedId(isExpanded ? null : fb.id)}
                            className="mt-2 flex items-center gap-1 text-[8px] md:text-[9px] font-black text-orange-500 uppercase tracking-widest md:group-hover:hidden"
                          >
                            {isExpanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                            {isExpanded ? "Thu gọn" : "Xem thêm"}
                          </button>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-3 md:gap-4 border-t-2 pt-4 md:pt-6 border-slate-100 bg-white text-left">
                      <div className="w-8 h-8 md:w-10 md:h-10 border-2 border-slate-900 shrink-0">
                        <img
                          src={fb.user?.avatarUrl || '/Logo.jpg'}
                          className="w-full h-full object-cover"
                          onError={(e: any) => e.target.src = '/Logo.jpg'}
                        />
                      </div>
                      <div className="overflow-hidden">
                        <h4 className="font-black text-[#001a41] text-[9px] md:text-[11px] uppercase tracking-tight truncate">
                          {fb.user?.fullName || 'Nhà đầu tư'}
                        </h4>
                        <p className="text-[7px] md:text-[8px] text-orange-600 font-black uppercase tracking-widest mt-0.5">
                          Hội viên chiến lược
                        </p>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        ) : (
          <div className="text-center py-20 border-2 border-dashed border-slate-200 uppercase text-[10px] font-black text-slate-300 tracking-[0.3em]">Syncing Feedbacks...</div>
        )}

        {/* NÚT GỬI - CĂN GIỮA TUYỆT ĐỐI */}
        <div className="mt-8 md:mt-12 flex justify-center">
          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full md:w-fit inline-flex items-center cursor-pointer justify-center gap-3 bg-[#001a41] text-white px-8 md:px-12 py-4 md:py-6 rounded-none font-black text-[10px] md:text-[11px] uppercase tracking-[0.2em] transition-all shadow-[6px_6px_0px_0px_rgba(249,115,22,1)] active:translate-y-1 active:shadow-none border-2 border-slate-900"
          >
            <MessageSquarePlus size={16} /> GỬI PHẢN HỒI
          </button>
        </div>
      </div>

      {/* MODAL GIAO DIỆN MỜ (GLASSMORPHISM) */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-black/40 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-[400px] border-4 border-slate-900 shadow-[8px_8px_0px_0px_rgba(249,115,22,1)] rounded-none overflow-hidden animate-in zoom-in duration-200">
            <div className="p-4 border-b-4 border-slate-900 flex justify-between items-center bg-orange-500">
              <h3 className="font-black text-white text-[10px] md:text-xs uppercase tracking-widest">Viết đánh giá</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-white hover:rotate-90 transition-transform"><X size={20} /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-5 md:p-8 space-y-5">
              <div className="flex justify-center gap-3">
                {[1, 2, 3, 4, 5].map((num) => (
                  <button key={num} type="button" onClick={() => setRating(num)} className="hover:scale-110 transition-transform">
                    <Star size={28} fill={num <= rating ? "#f97316" : "none"} className={num <= rating ? "text-orange-500" : "text-slate-300"} />
                  </button>
                ))}
              </div>
              <div className="relative">
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  maxLength={MAX_LENGTH}
                  placeholder="Sếp nhập cảm nghĩ tại đây..."
                  className="w-full h-32 p-4 border-2 border-slate-900 text-slate-900 font-bold text-xs md:text-sm outline-none focus:bg-orange-50 rounded-none resize-none leading-relaxed"
                  required
                />
                <div className="absolute bottom-2 right-2 text-[8px] font-black text-slate-400">
                  {content.length}/{MAX_LENGTH}
                </div>
              </div>
              <button type="submit" disabled={loading} className="w-full bg-[#001a41] text-white py-4 font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-orange-600 border-2 border-slate-900 transition-colors">
                {loading ? "ĐANG XỬ LÝ..." : "XÁC NHẬN GỬI"}
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}