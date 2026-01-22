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
      toast.error("Lỗi tải danh mục!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadCategories(); }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
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
    if (window.confirm(`Bạn chắc chắn muốn xóa danh mục "${catName}"?`)) {
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
    <div className="space-y-6">
      <div className="flex justify-between items-center pb-4 border-b border-gray-200">
        <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
          <Tag size={28} className="text-gray-600" /> Quản lý danh mục ngành
        </h2>
        <button onClick={loadCategories} className="p-3 border border-gray-300 hover:bg-gray-50 transition-all rounded-md">
          <RefreshCcw size={20} className={loading ? 'animate-spin' : ''} />
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* FORM THÊM */}
        <div className="lg:col-span-1">
          <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm space-y-5">
            <h3 className="font-semibold text-gray-900 uppercase text-sm tracking-wide pb-3 border-b border-gray-200">Thêm ngành mới</h3>
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wide text-gray-600">Tên danh mục</label>
              <input
                required type="text" value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ví dụ: Ngân Hàng"
                className="w-full border border-gray-300 rounded-md p-3 font-medium text-sm text-gray-900 outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-semibold uppercase tracking-wide text-gray-600">Slug (URL)</label>
              <input
                required type="text" value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="vi-du: ngan-hang"
                className="w-full border border-gray-300 rounded-md p-3 font-medium text-sm text-gray-900 outline-none focus:border-gray-400 focus:ring-1 focus:ring-gray-400"
              />
            </div>
            <button type="submit" className="w-full bg-gray-900 text-white py-3 font-semibold uppercase text-xs tracking-wide flex items-center justify-center gap-2 hover:bg-gray-800 transition-all rounded-md">
              <Plus size={16} /> Xác nhận thêm
            </button>
          </form>
        </div>

        {/* DANH SÁCH */}
        <div className="lg:col-span-2">
          <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
            <table className="w-full text-left">
              <thead className="bg-gray-50 border-b border-gray-200 text-xs font-semibold uppercase tracking-wide text-gray-700">
                <tr>
                  <th className="p-4">ID</th>
                  <th className="p-4">Tên ngành</th>
                  <th className="p-4">Slug</th>
                  <th className="p-4 text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody className="text-sm text-gray-900">
                {categories.map((cat) => (
                  <tr key={cat.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="p-4 text-gray-500">#{cat.id}</td>
                    <td className="p-4 font-semibold uppercase">{cat.name}</td>
                    <td className="p-4 font-medium text-gray-600 flex items-center gap-1">
                      <Hash size={12} /> {cat.slug}
                    </td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => handleDelete(cat.id, cat.name)}
                        className="p-2 border border-gray-300 text-gray-400 hover:text-red-600 hover:bg-red-50 hover:border-red-300 transition-all rounded-md"
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