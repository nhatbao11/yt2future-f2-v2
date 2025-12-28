"use client";
import React, { useState, useEffect } from 'react';
import { reportService } from '@/services/reportService';
import { Send, ChevronLeft, FileText, Image as ImageIcon, CheckCircle2 } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import slugify from 'slugify';

interface CreateReportProps {
  onClose?: () => void;
}

export default function CreateReportPage({ onClose }: CreateReportProps) {
  const router = useRouter();
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [pdfFile, setPdfFile] = useState<File | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    categoryId: '',
    description: '',
  });

  const MAX_DESC_LENGTH = 160;

  useEffect(() => {
    reportService.getCategories().then(res => setCategories(res.categories || []));
  }, []);

  const handleTitleChange = (val: string) => {
    setFormData({
      ...formData,
      title: val,
      slug: slugify(val, { lower: true, locale: 'vi', strict: true })
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.categoryId) return toast.error("Vui lòng chọn ngành nghề!");
    if (!pdfFile) return toast.error("Vui lòng chọn file PDF!");

    const data = new FormData();
    data.append('title', formData.title);
    data.append('slug', formData.slug);
    data.append('categoryId', formData.categoryId);
    data.append('description', formData.description);
    if (thumbnailFile) data.append('thumbnail', thumbnailFile);
    if (pdfFile) data.append('pdfFile', pdfFile);

    setLoading(true);
    try {
      const res = await reportService.addReport(data);
      if (res.success) {
        toast.success("Đã phát hành báo cáo!");
        if (onClose) onClose();
        else router.push('/sector');
      }
    } catch (err) {
      toast.error("Lỗi hệ thống, vui lòng thử lại!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`${onClose ? 'w-full' : 'max-w-4xl mx-auto py-12'} animate-in fade-in duration-500 px-4`}>

      {!onClose && (
        <button onClick={() => router.back()} className="flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-[#001a41] transition-colors mb-6">
          <ChevronLeft size={18} /> Quay lại danh sách
        </button>
      )}

      <div className="bg-white border border-slate-200 rounded-xl shadow-sm overflow-hidden">
        {/* Header nhẹ nhàng, chuyên nghiệp */}
        <div className="bg-slate-50 border-b border-slate-200 p-6 md:p-8">
          <h1 className="text-xl md:text-2xl font-bold text-[#001a41] tracking-tight">
            Thiết lập báo cáo chiến lược
          </h1>
          <p className="text-slate-500 text-sm mt-1 uppercase tracking-wider font-medium opacity-70">
            Intelligence Configuration
          </p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 md:p-10 space-y-8 text-sm text-slate-700">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">

            {/* CỘT TRÁI: THÔNG TIN DỮ LIỆU */}
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="font-semibold text-[#001a41] uppercase text-[11px] tracking-widest">Tiêu đề báo cáo</label>
                <input required type="text" placeholder="Nhập tiêu đề..."
                  className="w-full border border-slate-300 rounded-lg p-3.5 focus:ring-2 focus:ring-[#001a41]/5 focus:border-[#001a41] outline-none transition-all placeholder:opacity-50"
                  value={formData.title} onChange={e => handleTitleChange(e.target.value)} />
              </div>

              <div className="space-y-2">
                <label className="font-semibold text-[#001a41] uppercase text-[11px] tracking-widest">Danh mục đầu tư</label>
                <select required className="w-full border border-slate-300 rounded-lg p-3.5 focus:border-[#001a41] outline-none bg-white cursor-pointer"
                  onChange={e => setFormData({ ...formData, categoryId: e.target.value })}>
                  <option value="">-- Chọn danh mục --</option>
                  {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
                </select>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-center mb-1">
                  <label className="font-semibold text-[#001a41] uppercase text-[11px] tracking-widest">Tóm tắt nội dung</label>
                  <span className={`text-[10px] font-bold ${formData.description.length >= MAX_DESC_LENGTH ? 'text-rose-500' : 'text-slate-400'}`}>
                    {formData.description.length}/{MAX_DESC_LENGTH}
                  </span>
                </div>
                <textarea required maxLength={MAX_DESC_LENGTH}
                  className="w-full border border-slate-300 rounded-lg p-4 h-32 focus:border-[#001a41] outline-none resize-none leading-relaxed italic"
                  placeholder="Mô tả súc tích báo cáo (Tối đa 2 hàng)..."
                  onChange={e => setFormData({ ...formData, description: e.target.value })}
                  value={formData.description}
                />
              </div>
            </div>

            {/* CỘT PHẢI: QUẢN LÝ TỆP TIN */}
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="font-semibold text-[#001a41] uppercase text-[11px] tracking-widest">File báo cáo (PDF)</label>
                <label className={`flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-10 cursor-pointer transition-all ${pdfFile ? 'bg-emerald-50 border-emerald-500' : 'bg-slate-50 border-slate-300 hover:border-[#001a41]'}`}>
                  <input type="file" required accept=".pdf" className="hidden"
                    onChange={e => {
                      const file = e.target.files?.[0];
                      if (file && file.size > 10 * 1024 * 1024) return toast.error("File quá 10MB sếp ơi!");
                      setPdfFile(file || null);
                    }}
                  />
                  {pdfFile ? <CheckCircle2 className="text-emerald-600 mb-3" size={28} /> : <FileText className="text-slate-300 mb-3" size={28} />}
                  <span className="text-[11px] font-bold text-center truncate w-full px-2 italic text-slate-500">
                    {pdfFile ? pdfFile.name : "TẢI LÊN FILE PDF CHIẾN LƯỢC"}
                  </span>
                </label>
              </div>

              <div className="space-y-2">
                <label className="font-semibold text-[#001a41] uppercase text-[11px] tracking-widest">Ảnh bìa (Thumbnail)</label>
                <label className={`flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-10 cursor-pointer transition-all ${thumbnailFile ? 'bg-emerald-50 border-emerald-500' : 'bg-slate-50 border-slate-300 hover:border-[#001a41]'}`}>
                  <input type="file" required accept="image/*" className="hidden"
                    onChange={e => {
                      const file = e.target.files?.[0];
                      if (file && file.size > 2 * 1024 * 1024) return toast.error("Ảnh quá 2MB sếp ơi!");
                      setThumbnailFile(file || null);
                    }}
                  />
                  {thumbnailFile ? <CheckCircle2 className="text-emerald-600 mb-3" size={28} /> : <ImageIcon className="text-slate-300 mb-3" size={28} />}
                  <span className="text-[11px] font-bold text-center truncate w-full px-2 italic text-slate-500">
                    {thumbnailFile ? thumbnailFile.name : "CHỌN ẢNH ĐẠI DIỆN BÁO CÁO"}
                  </span>
                </label>
              </div>
            </div>
          </div>

          {/* Nút Submit tối giản, không còn viền cam */}
          <div className="pt-8 border-t border-slate-100 flex justify-end">
            <button type="submit" disabled={loading}
              className="w-full md:w-auto min-w-[240px] bg-[#001a41] text-white px-10 py-4 rounded-lg font-black uppercase tracking-widest hover:bg-slate-800 disabled:bg-slate-300 transition-all flex items-center justify-center gap-3 text-[11px]">
              {loading ? "PROCESSING..." : <><Send size={16} /> Phát hành báo cáo</>}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}