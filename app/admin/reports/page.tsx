"use client";
import React, { useEffect, useState } from 'react';
import { reportService } from '@/services/reportService';
import { Trash2, Check, X, FileText, Plus, RefreshCcw, Eye, FileSearch, AlertCircle, Pencil, ChevronLeft, ChevronRight } from 'lucide-react';
import { toast } from 'react-hot-toast';
import CreateReportPage from '@/components/common/CreateReportPage';

export default function AdminReportsPage() {
  const [reports, setReports] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [previewData, setPreviewData] = useState<any | null>(null);
  const [editingReport, setEditingReport] = useState<any | null>(null);

  // Pagination
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const loadReports = async (pageNo: number = 1) => {
    setLoading(true);
    try {
      const res = await reportService.getAllReportsAdmin(pageNo);
      if (res.success) {
        setReports(res.reports);
        setTotalPages(res.totalPages);
        setPage(pageNo);
      }
    } catch (err) {
      toast.error("Không thể kết nối kho dữ liệu!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadReports(1); }, []);

  const handleReview = async (id: string, status: 'APPROVED' | 'REJECTED') => {
    try {
      const res = await reportService.reviewReport(id, status);
      if (res.success) {
        toast.success(status === 'APPROVED' ? "Đã duyệt thành công!" : "Đã từ chối!");
        loadReports(page);
      }
    } catch (err) {
      toast.error("Thao tác thất bại!");
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm("Bạn chắc chắn muốn xóa báo cáo này?")) {
      try {
        await reportService.deleteReport(id);
        toast.success("Đã xóa!");
        loadReports(page);
      } catch (err) {
        toast.error("Lỗi khi xóa bài!");
      }
    }
  };

  const handleEdit = (report: any) => {
    setEditingReport(report);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center pb-4 border-b border-gray-200 gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-3">
            <FileSearch size={28} className="text-gray-600" /> Trung tâm điều hành
          </h2>
          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mt-1">{reports.length} báo cáo (Trang {page})</p>
        </div>
        <div className="flex gap-3 w-full md:w-auto">
          <button onClick={() => { setEditingReport(null); setIsModalOpen(true); }} className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-orange-500 text-white px-6 py-3 text-xs font-semibold uppercase tracking-wide hover:bg-orange-600 transition-all rounded-md">
            <Plus size={16} /> Phát hành mới
          </button>
          <button onClick={() => loadReports(page)} className="p-3 border border-gray-300 bg-white hover:bg-gray-50 transition-all rounded-md">
            <RefreshCcw size={18} className={loading ? 'animate-spin' : ''} />
          </button>
        </div>
      </div>

      {/* TABLE */}
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
        {loading ? (
          <div className="py-32 text-center text-sm text-gray-500">Đang tải...</div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[1000px]">
                <thead className="bg-gray-50 border-b border-gray-200 text-xs font-semibold uppercase tracking-wide text-gray-700">
                  <tr>
                    <th className="p-4 w-[450px]">Thông tin tài liệu</th>
                    <th className="p-4 w-48">Ngành hàng</th>
                    <th className="p-4 w-32 text-center">Trạng thái</th>
                    <th className="p-4 w-40 text-center">Thao tác</th>
                    <th className="w-auto"></th> {/* Spacer Column */}
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {reports.map((report) => (
                    <tr key={report.id} className="border-b border-gray-100 hover:bg-gray-50 transition-all group">
                      <td className="p-4">
                        <div className="flex items-center gap-4">
                          <div className="w-20 h-12 border border-gray-200 rounded-md shrink-0 relative overflow-hidden">
                            <img src={report.thumbnail || '/Logo.jpg'} className="w-full h-full object-cover" onError={(e) => (e.currentTarget.src = '/Logo.jpg')} />
                            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity cursor-pointer" onClick={() => setPreviewData(report)}>
                              <Eye size={18} className="text-white" />
                            </div>
                          </div>
                          <p className="text-gray-900 font-medium leading-tight line-clamp-2 max-w-[350px]" title={report.title}>
                            {report.title.length > 60 ? report.title.slice(0, 60) + '...' : report.title}
                          </p>
                        </div>
                      </td>
                      <td className="p-4">
                        <span className="px-3 py-1 bg-gray-100 border border-gray-200 rounded-md text-xs text-gray-600 font-medium whitespace-nowrap">{report.category?.name || '---'}</span>
                      </td>
                      <td className="p-4 text-center">
                        <div className={`inline-block px-3 py-1 text-xs font-semibold rounded-md ${report.status === 'APPROVED' ? 'bg-green-100 text-green-700' : report.status === 'PENDING' ? 'bg-orange-100 text-orange-700' : 'bg-red-100 text-red-700'}`}>
                          {report.status}
                        </div>
                      </td>
                      <td className="p-4 text-center space-x-1">
                        {report.status === 'PENDING' && (
                          <>
                            <button onClick={() => handleReview(report.id, 'APPROVED')} className="p-2 bg-green-50 text-green-600 border border-green-200 hover:bg-green-100 transition-all rounded-md"><Check size={16} /></button>
                            <button onClick={() => handleReview(report.id, 'REJECTED')} className="p-2 bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 transition-all rounded-md"><X size={16} /></button>
                          </>
                        )}
                        <button onClick={() => handleEdit(report)} className="p-2 text-gray-400 hover:text-blue-600 border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all rounded-md">
                          <Pencil size={16} />
                        </button>
                        <button onClick={() => handleDelete(report.id)} className="p-2 text-gray-400 hover:text-red-600 border border-gray-200 hover:border-red-300 hover:bg-red-50 transition-all rounded-md"><Trash2 size={16} /></button>
                      </td>
                      <td className="w-auto"></td> {/* Spacer Cell */}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* PAGINATION - Đồng bộ style với Admin Dashboard */}
            {totalPages > 1 && (
              <div className="px-6 py-4 bg-gray-50 flex justify-between items-center border-t border-gray-200">
                <span className="text-xs font-semibold text-gray-600 uppercase tracking-wide">Trang {page} / {totalPages}</span>
                <div className="flex gap-2">
                  <PaginationBtn Icon={ChevronLeft} onClick={() => loadReports(page - 1)} disabled={page === 1} />
                  <PaginationBtn Icon={ChevronRight} onClick={() => loadReports(page + 1)} disabled={page === totalPages} />
                </div>
              </div>
            )}
          </>
        )}
      </div>

      {/* PREVIEW MODAL */}
      {previewData && (
        <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 md:p-10 bg-black/60 backdrop-blur-sm">
          <div className="bg-white w-full max-w-7xl border border-gray-200 rounded-lg shadow-xl p-6 md:p-10 relative overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-[75vh]">
              {/* PDF VIEWER */}
              <div className="lg:col-span-9 bg-gray-100 border border-gray-200 rounded-lg relative overflow-hidden">
                <iframe
                  src={`https://docs.google.com/viewer?url=${encodeURIComponent(previewData.pdfUrl)}&embedded=true`}
                  className="w-full h-full border-0"
                  title="PDF Viewer"
                ></iframe>
                {!previewData.pdfUrl && (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-gray-100 text-red-600 font-semibold">
                    <AlertCircle size={48} className="mb-4" /> Lỗi: Link PDF không tồn tại
                  </div>
                )}
              </div>

              {/* INFO */}
              <div className="lg:col-span-3 flex flex-col justify-between">
                <div className="space-y-6 overflow-y-auto max-h-[50vh] pr-2">
                  <div className="space-y-2">
                    <label className="text-xs text-orange-600 font-semibold uppercase tracking-wide">Visual Cover</label>
                    <div className="aspect-video border border-gray-200 rounded-lg overflow-hidden bg-white">
                      <img src={previewData.thumbnail || '/Logo.jpg'} className="w-full h-full object-cover" onError={(e) => (e.currentTarget.src = '/Logo.jpg')} />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <label className="text-xs text-gray-500 uppercase tracking-wide font-semibold">Details</label>
                    <h3 className="text-xl font-bold text-gray-900 leading-tight pb-2 border-b border-gray-200">{previewData.title}</h3>
                    <p className="text-sm text-gray-700 leading-relaxed bg-gray-50 p-4 rounded-lg border-l-4 border-gray-300">
                      "{previewData.description || 'Hệ thống chưa ghi nhận mô tả.'}"
                    </p>
                  </div>
                </div>

                {/* CLOSE BUTTON */}
                <div className="mt-8">
                  <button
                    onClick={() => setPreviewData(null)}
                    className="w-full py-4 bg-gray-900 text-white font-semibold text-sm uppercase tracking-wide hover:bg-gray-800 transition-all rounded-md"
                  >
                    Đóng bản xem trước
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CREATE/EDIT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-all duration-300">
          <div className="bg-white w-full max-w-5xl border border-gray-200 rounded-lg shadow-xl overflow-y-auto max-h-[95vh] relative animate-in zoom-in-95 duration-200">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 z-50 p-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-all">
              <X size={24} />
            </button>
            <CreateReportPage
              onClose={() => { setIsModalOpen(false); loadReports(page); }}
              initialData={editingReport}
            />
          </div>
        </div>
      )}
    </div>
  );
}

// Pagination Helper
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