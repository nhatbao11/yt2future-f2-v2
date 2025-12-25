"use client";
import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { MessageSquarePlus, Send, X, Star } from 'lucide-react';
import 'swiper/css';
import 'swiper/css/pagination';

export default function FeedbackHome() {
  const [feedbacks, setFeedbacks] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

  // ĐỊNH NGHĨA CỔNG BACKEND Ở ĐÂY
  const BACKEND_URL = 'http://localhost:5000/api';

  const loadFeedbacks = async () => {
    try {
      // Gọi đúng cổng 5000 để lấy dữ liệu đã APPROVED
      const res = await fetch(`${BACKEND_URL}/feedback/home`);
      const data = await res.json();
      if (data.success) {
        setFeedbacks(data.feedbacks || []);
      }
    } catch (err) {
      console.error("Không lấy được feedback trang chủ:", err);
    }
  };

  useEffect(() => { loadFeedbacks(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return alert("Sếp nhập nội dung đã nhé!");

    setLoading(true);
    try {
      const res = await fetch(`${BACKEND_URL}/feedback/send`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content }),
        credentials: 'include' // Gửi kèm Token để xác thực
      });
      const data = await res.json();
      if (data.success) {
        alert("Gửi thành công! Sếp chờ Admin duyệt để hiện lên web nhé.");
        setContent('');
        setIsModalOpen(false);
      }
    } catch (err) {
      alert("Lỗi rồi sếp ơi, sếp đăng nhập chưa?");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-24 bg-slate-50 relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16 space-y-4">
          <h2 className="font-black text-[#001a41] text-4xl uppercase tracking-tighter">
            Cảm nhận khách hàng
          </h2>
          <div className="w-20 h-1.5 bg-orange-500 mx-auto rounded-full"></div>
        </div>

        {feedbacks.length > 0 ? (
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={30}
            slidesPerView={1}
            autoplay={{ delay: 4000 }}
            pagination={{ clickable: true }}
            breakpoints={{ 768: { slidesPerView: 3 } }}
            className="pb-16"
          >
            {feedbacks.map((fb) => (
              <SwiperSlide key={fb.id}>
                <div className="bg-white p-8 rounded-[40px] border border-slate-200 shadow-xl h-full flex flex-col justify-between min-h-[300px] hover:border-orange-500 transition-all group">
                  <p className="text-slate-900 font-bold italic text-base leading-relaxed mb-8">
                    "{fb.content}"
                  </p>
                  <div className="flex items-center gap-4 border-t pt-6 border-slate-100">
                    <img
                      src={fb.user?.avatarUrl || '/Logo.jpg'}
                      className="w-14 h-14 rounded-full object-cover border-2 border-orange-400 group-hover:scale-110 transition-transform"
                      alt="avatar"
                    />
                    <div>
                      <h4 className="font-black text-[#001a41] text-sm uppercase">{fb.user?.fullName}</h4>
                      <p className="text-[10px] text-orange-500 font-bold uppercase tracking-widest mt-1">Nhà đầu tư</p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div className="text-center py-20 bg-white rounded-[40px] border-2 border-dashed border-slate-200">
            <p className="text-slate-400 font-black uppercase text-xs tracking-widest">Đang cập nhật những phản hồi mới nhất...</p>
          </div>
        )}

        <div className="text-center mt-12">
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-3 bg-[#001a41] text-white px-10 py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-orange-600 transition-all shadow-2xl hover:-translate-y-1"
          >
            <MessageSquarePlus size={20} /> Viết phản hồi của sếp
          </button>
        </div>
      </div>

      {/* MODAL GỬI FEEDBACK CŨ GIỮ NGUYÊN */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
          <div className="bg-white w-full max-w-lg rounded-[40px] overflow-hidden shadow-2xl">
            {/* ... Code Form cũ ... */}
            <div className="p-8 border-b border-slate-100 flex justify-between items-center bg-orange-50">
              <h3 className="font-black text-[#001a41] text-lg uppercase">Gửi phản hồi mới</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-900 hover:text-rose-600 p-2"><X size={28} /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-8 space-y-6">
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Sếp thấy dịch vụ của Y&T Capital thế nào?"
                className="w-full h-40 p-5 rounded-3xl border-2 border-slate-200 focus:border-[#001a41] text-slate-900 font-bold text-base outline-none transition-all"
                required
              />
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#001a41] text-white py-5 rounded-3xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-orange-600 shadow-lg disabled:opacity-50 transition-all"
              >
                {loading ? "ĐANG GỬI..." : "GỬI PHẢN HỒI NGAY"}
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}