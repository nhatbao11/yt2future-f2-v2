"use client";
import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { MessageSquarePlus, Send, X, Star, ChevronDown, ChevronUp } from 'lucide-react';
import toast from 'react-hot-toast';
import 'swiper/css';
import 'swiper/css/pagination';

import { useTranslations } from 'next-intl';

export default function FeedbackHome() {
  const t = useTranslations('feedback');
  const tCommon = useTranslations('common');
  const [feedbacks, setFeedbacks] = useState<any[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [content, setContent] = useState('');
  const [rating, setRating] = useState(5);
  const [loading, setLoading] = useState(false);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
  const MAX_LENGTH = 250;

  const getLocale = () => {
    if (typeof window === 'undefined') return 'vi';
    const path = window.location.pathname;
    if (path.startsWith('/en')) return 'en';
    return 'vi';
  };

  const loadFeedbacks = async () => {
    try {
      const res = await fetch(`${BACKEND_URL}/feedback/home`, {
        headers: { 'Accept-Language': getLocale() }
      });
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
        headers: {
          'Content-Type': 'application/json',
          'Accept-Language': getLocale()
        },
        body: JSON.stringify({ content, rating }),
        credentials: 'include'
      });

      const data = await res.json();

      if (res.status === 401 || res.status === 403) {
        toast.error(t('loginRequired'), {
          duration: 2000,
        });
        setTimeout(() => {
          window.location.href = '/signin';
        }, 2000);
        return;
      }

      if (data.success) {
        toast.success(t('success'));
        setContent(''); setRating(5); setIsModalOpen(false);
      } else {
        toast.error(data.message || t('failure'));
      }
    } catch (err) {
      toast.error(t('error'));
    } finally { setLoading(false); }
  };

  return (
    <section className="py-12 md:py-16 bg-white relative overflow-hidden">
      <div className="max-w-360 mx-auto px-4 md:px-12">
        {/* TIÊU ĐỀ */}
        <div className="mb-10 md:mb-16 border-l-4 md:border-l-8 border-[#001a41] pl-4 md:pl-6 text-left">
          <h2 className="font-black text-[#001a41] text-2xl md:text-5xl uppercase tracking-tighter leading-tight">
            {t('title')} <span className="text-yellow-500">{t('titleHighlight')}</span>
          </h2>
          <p className="text-[8px] md:text-xs font-bold text-slate-400 uppercase tracking-[0.2em] mt-1">
            {t('tagline')}
          </p>
        </div>

        {feedbacks.length > 0 ? (
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={20}
            slidesPerView={1}
            centeredSlides={false}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            breakpoints={{
              640: { slidesPerView: 2, spaceBetween: 24 },
              1024: { slidesPerView: 3, spaceBetween: 30 }
            }}
            className="pb-14"
          >
            {feedbacks.map((fb) => {
              const isExpanded = expandedId === fb.id;
              const needsExpand = fb.content.length > 150;

              return (
                <SwiperSlide key={fb.id} className="h-auto">
                  <div className="bg-white p-6 md:p-8 border border-slate-200 hover:border-slate-300 shadow-sm hover:shadow-md transition-all duration-300 h-full flex flex-col justify-between">
                    {/* Rating Stars */}
                    <div>
                      <div className="flex gap-1 mb-4">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={14}
                            fill={i < fb.rating ? "#eab308" : "none"}
                            className={i < fb.rating ? "text-yellow-500" : "text-slate-200"}
                          />
                        ))}
                      </div>

                      {/* Content */}
                      <div className="relative">
                        <p className={`text-slate-700 text-sm leading-relaxed ${!isExpanded && needsExpand ? 'line-clamp-4' : ''}`}>
                          "{fb.content}"
                        </p>

                        {needsExpand && (
                          <button
                            onClick={() => setExpandedId(isExpanded ? null : fb.id)}
                            className="mt-2 text-xs font-semibold text-yellow-600 hover:text-yellow-700 transition-colors flex items-center gap-1"
                          >
                            {isExpanded ? (
                              <>Show less <ChevronUp size={14} /></>
                            ) : (
                              <>Read more <ChevronDown size={14} /></>
                            )}
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Author Info */}
                    <div className="flex items-center gap-3 mt-6 pt-4 border-t border-slate-100">
                      <div className="w-10 h-10 rounded-full bg-slate-100 overflow-hidden flex-shrink-0">
                        <img
                          src={fb.user?.avatarUrl || '/Logo.jpg'}
                          className="w-full h-full object-cover"
                          onError={(e: any) => e.target.src = '/Logo.jpg'}
                          alt={fb.user?.fullName}
                        />
                      </div>
                      <div className="overflow-hidden">
                        <h4 className="font-bold text-sm text-slate-900 truncate">
                          {fb.user?.fullName || 'Anonymous'}
                        </h4>
                        <p className="text-xs text-slate-500">
                          {t('role')}
                        </p>
                      </div>
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        ) : (
          <div className="text-center py-20 border border-dashed border-slate-200 text-sm text-slate-400">
            {tCommon('loading')}
          </div>
        )}

        {/* SEND FEEDBACK BUTTON */}
        <div className="mt-8 md:mt-12 flex justify-center">
          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center justify-center gap-2 bg-[#001a41] text-white px-8 py-4 text-sm font-bold uppercase tracking-wider hover:bg-yellow-600 transition-all duration-300 shadow-sm hover:shadow-md"
          >
            <MessageSquarePlus size={18} /> {t('send')}
          </button>
        </div>
      </div>

      {/* MODAL - MINIMALIST DESIGN */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="bg-white w-full max-w-lg shadow-2xl animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="px-6 py-4 border-b border-slate-200 flex justify-between items-center">
              <h3 className="text-lg font-bold text-slate-900">{t('modalTitle')}</h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 transition-colors p-1"
              >
                <X size={20} />
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              {/* Rating */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-3">Rating</label>
                <div className="flex justify-center gap-2">
                  {[1, 2, 3, 4, 5].map((num) => (
                    <button
                      key={num}
                      type="button"
                      onClick={() => setRating(num)}
                      className="hover:scale-110 transition-transform focus:outline-none"
                    >
                      <Star
                        size={32}
                        fill={num <= rating ? "#eab308" : "none"}
                        className={num <= rating ? "text-yellow-500" : "text-slate-300"}
                      />
                    </button>
                  ))}
                </div>
              </div>

              {/* Textarea */}
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Your feedback</label>
                <div className="relative">
                  <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    maxLength={MAX_LENGTH}
                    placeholder={t('placeholder')}
                    className="w-full h-32 p-4 border border-slate-300 text-slate-900 text-sm outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 resize-none leading-relaxed transition-all"
                    required
                  />
                  <div className="absolute bottom-3 right-3 text-xs text-slate-400">
                    {content.length}/{MAX_LENGTH}
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading || !content.trim()}
                className="w-full bg-[#001a41] text-white py-3.5 text-sm font-bold uppercase tracking-wider hover:bg-yellow-600 disabled:bg-slate-300 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    {t('sending')}
                  </>
                ) : (
                  <>
                    <Send size={16} />
                    {t('submit')}
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}