import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function AdminDashboard() {
  const cookieStore = await cookies();
  const token = cookieStore.get('yt_capital_token')?.value;

  if (!token) redirect('/signin');

  return (
    <div className="space-y-6 md:space-y-10">
      {/* 1. GRID STATS - RESPONSIVE TỪ 1 ĐẾN 4 CỘT */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {[
          { label: 'Người dùng', val: '1,234', color: 'border-blue-500', trend: '+12%' },
          { label: 'Bài viết', val: '856', color: 'border-emerald-500', trend: '+5%' },
          { label: 'Danh mục', val: '12', color: 'border-orange-500', trend: '0%' },
          { label: 'Phản hồi', val: '45', color: 'border-rose-500', trend: 'Mới' },
        ].map((item, i) => (
          <div key={i} className={`bg-white p-5 md:p-6 rounded-2xl border-l-4 ${item.color} shadow-sm hover:shadow-md transition-all`}>
            <p className="text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{item.label}</p>
            <div className="flex items-end justify-between">
              <h3 className="text-2xl md:text-3xl font-black text-slate-900 tracking-tighter">{item.val}</h3>
              <span className="text-[9px] md:text-[10px] font-bold text-emerald-500 bg-emerald-50 px-2 py-1 rounded">{item.trend}</span>
            </div>
          </div>
        ))}
      </div>

      {/* 2. NHẬT KÝ HOẠT ĐỘNG - XỬ LÝ CHỐNG TRÀN BẰNG OVERFLOW-X */}
      <div className="bg-white rounded-2xl md:rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-4 md:p-6 border-b border-slate-100 flex justify-between items-center">
          <h3 className="font-black text-[#001a41] uppercase text-[10px] md:text-xs tracking-widest">Nhật ký hoạt động</h3>
          <button className="text-[9px] md:text-[10px] font-black text-orange-500 uppercase hover:underline">Xem tất cả</button>
        </div>

        {/* CONTAINER CUỘN NGANG CHO TABLE */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-150">
            <thead className="bg-slate-50 text-[9px] md:text-[10px] font-black text-slate-400 uppercase tracking-widest">
              <tr>
                <th className="p-4">Quản trị viên</th>
                <th className="p-4">Hành động</th>
                <th className="p-4">Thời gian</th>
              </tr>
            </thead>
            <tbody className="text-[11px] md:text-xs font-bold text-slate-600">
              <tr className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                <td className="p-4 flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-slate-200" />
                  <span>Trần Minh Nhật</span>
                </td>
                <td className="p-4">
                  <span className="text-emerald-600">Duyệt bài viết:</span> Phân tích kỹ thuật VNIndex
                </td>
                <td className="p-4 text-slate-400 font-medium text-[10px]">2 phút trước</td>
              </tr>
              {/* Thêm data mẫu để sếp test scroll */}
              <tr className="border-b border-slate-50 hover:bg-slate-50/50 transition-colors">
                <td className="p-4 flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-slate-200" />
                  <span>Nguyễn Nhất Bảo</span>
                </td>
                <td className="p-4">
                  <span className="text-blue-600">Cập nhật hệ thống:</span> Tối ưu Database
                </td>
                <td className="p-4 text-slate-400 font-medium text-[10px] whitespace-nowrap">15 phút trước</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}