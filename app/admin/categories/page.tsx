"use client";
import React, { useEffect, useState } from 'react';
import { reportService } from '@/services/reportService';
import { Trash2, Plus, Tag, Hash, RefreshCcw } from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');

  const loadCategories = async () => {
    setLoading(true);
    try {
      const res = await reportService.getCategories();
      if (res.success) setCategories(res.categories);
    } catch (err) {
      toast.error("Lỗi tải danh mục sếp ơi!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadCategories(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Sếp dùng hàm sendCategory (cần thêm vào service)
      const res = await reportService.createCategory({ name, slug });
      if (res.success) {
        toast.success("Đã thêm danh mục mới!");
        setName(''); setSlug('');
        loadCategories();
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Lỗi tạo danh mục!");
    }
  };

  const handleDelete = async (id: number, catName: string) => {
    if (window.confirm(`Sếp chắc chắn muốn xóa danh mục "${catName}"? Các báo cáo thuộc ngành này sẽ bị ảnh hưởng!`)) {
      try {
        await reportService.deleteCategory(id);
        toast.success("Đã xóa xong!");
        setCategories(prev => prev.filter(c => c.id !== id));
      } catch (err) {
        toast.error("Không thể xóa danh mục đang có bài viết!");
      }
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-center bg-white border-4 border-slate-900 p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <h2 className="text-2xl font-black text-[#001a41] uppercase tracking-tighter flex items-center gap-3">
          <Tag size={28} className="text-orange-500" /> Quản lý danh mục ngành
        </h2>
        <button onClick={loadCategories} className="p-3 border-2 border-slate-900 hover:bg-slate-100 transition-all">
          <RefreshCcw size={20} className={loading ? 'animate-spin' : ''} />
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* BÊN TRÁI: FORM THÊM */}
        <div className="lg:col-span-1">
          <form onSubmit={handleSubmit} className="bg-white border-4 border-slate-900 p-8 shadow-[10px_10px_0px_0px_rgba(249,115,22,1)] space-y-6">
            <h3 className="font-black text-[#001a41] uppercase text-sm tracking-widest border-b-2 border-slate-100 pb-4">Thêm ngành mới</h3>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Tên danh mục</label>
              <input
                required type="text" value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ví dụ: Ngân Hàng"
                className="w-full border-2 border-slate-900 p-4 font-bold text-sm outline-none focus:bg-orange-50"
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Slug (URL)</label>
              <input
                required type="text" value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="vi-du: ngan-hang"
                className="w-full border-2 border-slate-900 p-4 font-bold text-sm outline-none focus:bg-orange-50"
              />
            </div>
            <button type="submit" className="w-full bg-[#001a41] text-white py-4 font-black uppercase text-[10px] tracking-[0.2em] flex items-center justify-center gap-2 hover:bg-orange-600 transition-all">
              <Plus size={16} /> Xác nhận thêm
            </button>
          </form>
        </div>

        {/* BÊN PHẢI: DANH SÁCH */}
        <div className="lg:col-span-2">
          <div className="bg-white border-4 border-slate-900 shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest">
                <tr>
                  <th className="p-5">ID</th>
                  <th className="p-5">Tên ngành</th>
                  <th className="p-5">Slug</th>
                  <th className="p-5 text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody className="text-xs font-black text-slate-900">
                {categories.map((cat) => (
                  <tr key={cat.id} className="border-b-2 border-slate-100 hover:bg-slate-50 transition-colors">
                    <td className="p-5 text-slate-400">#{cat.id}</td>
                    <td className="p-5 text-[#001a41] uppercase tracking-tighter">{cat.name}</td>
                    <td className="p-5 font-bold italic text-slate-500 flex items-center gap-1">
                      <Hash size={12} /> {cat.slug}
                    </td>
                    <td className="p-5 text-right">
                      <button
                        onClick={() => handleDelete(cat.id, cat.name)}
                        className="p-2 border-2 border-slate-900 text-slate-300 hover:text-white hover:bg-rose-600 transition-all shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:shadow-none"
                      >
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}