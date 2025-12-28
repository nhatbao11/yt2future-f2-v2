"use client";
import React, { useEffect, useState } from 'react';
import { reportService } from '@/services/reportService';
import { Trash2, Check, X, FileText, Plus, RefreshCcw, Eye, FileSearch, AlertCircle } from 'lucide-react';
import { toast } from 'react-hot-toast';
import CreateReportPage from '@/components/common/CreateReportPage';

export default function AdminReportsPage() {
  const [reports, setReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [previewData, setPreviewData] = useState<any | null>(null);

  const loadReports = async () => {
    setLoading(true);
    try {
      const res = await reportService.getAllReportsAdmin();
      if (res.success) setReports(res.reports);
    } catch (err) {
      toast.error("Không thể kết nối kho dữ liệu!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadReports(); }, []);

  const handleReview = async (id: string, status: 'APPROVED' | 'REJECTED') => {
    try {
      const res = await reportService.reviewReport(id, status);
      if (res.success) {
        toast.success(status === 'APPROVED' ? "DUYỆT THÀNH CÔNG!" : "ĐÃ TỪ CHỐI!");
        loadReports();
      }
    } catch (err) {
      toast.error("Thao tác thất bại!");
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Sếp chắc chắn muốn xóa báo cáo này?")) {
      try {
        await reportService.deleteReport(id);
        toast.success("ĐÃ XÓA!");
        setReports(prev => prev.filter(r => r.id !== id));
      } catch (err) {
        toast.error("Lỗi khi xóa bài!");
      }
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700 p-2 md:p-6 bg-slate-50 min-h-screen font-black uppercase">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center bg-white border-4 border-slate-900 p-6 shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] gap-6">
        <div className="space-y-1">
          <h2 className="text-2xl md:text-3xl font-black text-[#001a41] tracking-tighter flex items-center gap-3">
            <FileSearch size={32} className="text-orange-500" /> Trung tâm điều hành
          </h2>
          <p className="text-[10px] text-slate-400 tracking-[0.2em]">DATABASE: {reports.length} OBJECTS</p>
        </div>
        <div className="flex gap-4 w-full md:w-auto">
          <button onClick={() => setIsModalOpen(true)} className="flex-1 md:flex-none flex items-center justify-center gap-3 bg-orange-500 text-white px-8 py-4 text-[11px] border-2 border-slate-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all">
            <Plus size={18} /> PHÁT HÀNH MỚI
          </button>
          <button onClick={loadReports} className="p-4 border-2 border-slate-900 bg-white hover:bg-slate-50 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,0.1)]">
            <RefreshCcw size={20} className={loading ? 'animate-spin' : ''} />
          </button>
        </div>
      </div>

      {/* DANH SÁCH BÁO CÁO */}
      <div className="bg-white border-4 border-slate-900 shadow-[15px_15px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
        {loading ? (
          <div className="py-32 text-center text-xs tracking-widest animate-pulse italic">Connecting...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[1000px]">
              <thead className="bg-[#001a41] text-white border-b-4 border-slate-900 text-[10px] tracking-widest">
                <tr>
                  <th className="p-6">Thông tin tài liệu</th>
                  <th className="p-6">Ngành hàng</th>
                  <th className="p-6 text-center">Trạng thái</th>
                  <th className="p-6 text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody className="text-[12px]">
                {reports.map((report) => (
                  <tr key={report.id} className="border-b-2 border-slate-100 hover:bg-orange-50/40 transition-all group">
                    <td className="p-6">
                      <div className="flex items-center gap-5">
                        <div className="w-20 h-12 border-2 border-slate-900 shrink-0 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden">
                          <img src={report.thumbnail || '/Logo.jpg'} className="w-full h-full object-cover" onError={(e) => (e.currentTarget.src = '/Logo.jpg')} />
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity cursor-pointer" onClick={() => setPreviewData(report)}>
                            <Eye size={20} className="text-white" />
                          </div>
                        </div>
                        <p className="text-[#001a41] text-[13px] leading-tight line-clamp-2 max-w-[300px] font-black">{report.title}</p>
                      </div>
                    </td>
                    <td className="p-6">
                      <span className="px-3 py-1 bg-slate-100 border border-slate-300 text-[9px] text-slate-500 italic">{report.category?.name || '---'}</span>
                    </td>
                    <td className="p-6 text-center">
                      <div className={`inline-block px-4 py-1.5 text-[9px] border-2 tracking-widest ${report.status === 'APPROVED' ? 'bg-emerald-500 text-white border-emerald-700' : report.status === 'PENDING' ? 'bg-orange-400 text-white border-orange-600 animate-pulse' : 'bg-rose-500 text-white border-rose-700'}`}>
                        {report.status}
                      </div>
                    </td>
                    <td className="p-6 text-right space-x-3">
                      {report.status === 'PENDING' && (
                        <>
                          <button onClick={() => handleReview(report.id, 'APPROVED')} className="p-3 bg-white text-emerald-600 border-2 border-emerald-600 hover:bg-emerald-600 hover:text-white transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-none"><Check size={18} /></button>
                          <button onClick={() => handleReview(report.id, 'REJECTED')} className="p-3 bg-white text-rose-600 border-2 border-rose-600 hover:bg-rose-600 hover:text-white transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-none"><X size={18} /></button>
                        </>
                      )}
                      <button onClick={() => handleDelete(report.id)} className="p-3 text-slate-200 hover:text-rose-600 border-2 border-slate-200 hover:border-rose-600 transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:shadow-none"><Trash2 size={18} /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* MODAL PREVIEW PDF - ĐÃ BỎ NÚT X VÀ NÚT TẢI FILE THEO Ý SẾP */}
      {previewData && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 md:p-10 bg-black/80 backdrop-blur-md animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-7xl border-4 border-slate-900 shadow-[20px_20px_0px_0px_rgba(249,115,22,1)] p-6 md:p-10 relative overflow-hidden">

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-[75vh]">
              {/* TRÌNH XEM PDF */}
              <div className="lg:col-span-9 bg-slate-200 border-4 border-slate-900 relative overflow-hidden">
                <iframe
                  src={`https://docs.google.com/viewer?url=${encodeURIComponent(previewData.pdfUrl)}&embedded=true`}
                  className="w-full h-full border-0"
                  title="PDF Viewer"
                ></iframe>
                {!previewData.pdfUrl && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-100 text-rose-500 font-black">
                    <AlertCircle size={48} className="mb-4" /> LỖI: LINK PDF KHÔNG TỒN TẠI
                  </div>
                )}
              </div>

              {/* THÔNG TIN CHI TIẾT */}
              <div className="lg:col-span-3 flex flex-col justify-between py-2">
                <div className="space-y-6 overflow-y-auto max-h-[50vh] pr-2">
                  <div className="space-y-2">
                    <label className="text-[9px] text-orange-500 tracking-[0.3em] underline underline-offset-4">Visual Cover</label>
                    <div className="aspect-video border-2 border-slate-900 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] overflow-hidden bg-white">
                      <img src={previewData.thumbnail || '/Logo.jpg'} className="w-full h-full object-cover" onError={(e) => (e.currentTarget.src = '/Logo.jpg')} />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <label className="text-[9px] text-slate-400 tracking-widest italic">Details</label>
                    <h3 className="text-xl font-black text-[#001a41] leading-tight border-b-2 border-slate-900 pb-2 italic">{previewData.title}</h3>
                    <p className="text-[11px] font-bold text-slate-500 italic leading-relaxed bg-slate-50 p-4 border-l-4 border-slate-900">
                      "{previewData.description || 'Hệ thống chưa ghi nhận mô tả.'}"
                    </p>
                  </div>
                </div>

                {/* NÚT ĐÓNG TO RÕ RÀNG Ở ĐÂY */}
                <div className="mt-8">
                  <button
                    onClick={() => setPreviewData(null)}
                    className="w-full py-6 bg-slate-900 text-white font-black text-[12px] tracking-[0.2em] border-2 border-slate-900 shadow-[6px_6px_0px_0px_rgba(249,115,22,1)] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all"
                  >
                    ĐÓNG BẢN XEM TRƯỚC
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL CREATE REPORT */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-[#001a41]/90 backdrop-blur-md animate-in zoom-in duration-300">
          <div className="bg-white w-full max-w-5xl border-4 border-slate-900 shadow-[15px_15px_0px_0px_rgba(249,115,22,1)] overflow-y-auto max-h-[95vh] relative font-black uppercase">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 z-50 p-2 bg-rose-600 text-white border-2 border-slate-900 hover:rotate-90 transition-all">
              <X size={24} />
            </button>
            <CreateReportPage onClose={() => { setIsModalOpen(false); loadReports(); }} />
          </div>
        </div>
      )}
    </div>
  );
}