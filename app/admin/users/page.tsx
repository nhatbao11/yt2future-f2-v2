"use client";
import React, { useEffect, useState, useMemo } from 'react';
import { adminService } from '@/services/adminService';
import { UserAvatar } from '@/components/common/UserAvatar';
import { Trash2, ShieldCheck, RefreshCcw, ChevronLeft, ChevronRight } from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function AdminUsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // LOGIC PHÂN TRANG
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // 1. Hàm lấy dữ liệu từ Backend
  const fetchUsers = async () => {
    setLoading(true);
    try {
      const data = await adminService.getAllUsers();
      setUsers(data || []);
    } catch (err) {
      toast.error("Không thể kết nối với máy chủ!");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchUsers(); }, []);

  // 2. Tính toán phân trang
  const totalPages = Math.ceil(users.length / itemsPerPage);

  const paginatedUsers = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return users.slice(startIndex, startIndex + itemsPerPage);
  }, [users, currentPage]);

  // 3. Hàm cập nhật Vai trò (Role)
  const handleUpdateRole = async (userId: string, newRole: string) => {
    try {
      await adminService.updateUserRole(userId, newRole);
      setUsers(prev => prev.map(u => u.id === userId ? { ...u, role: newRole } : u));
      toast.success(`Đã nâng cấp quyền lên ${newRole}!`);
    } catch (err) {
      toast.error("Lỗi cập nhật quyền hạn!");
    }
  };

  // 4. Hàm xóa người dùng (Fix lỗi "đơ")
  const handleDelete = async (userId: string, userName: string) => {
    if (window.confirm(`Sếp chắc chắn muốn xóa vĩnh viễn user "${userName}" không?`)) {
      try {
        await adminService.deleteUser(userId);
        toast.success(`Đã xóa ${userName} thành công!`);

        // Cập nhật lại danh sách và logic chuyển trang nếu xóa hết trang cuối
        const newList = users.filter(u => u.id !== userId);
        setUsers(newList);

        const newTotalPages = Math.ceil(newList.length / itemsPerPage);
        if (currentPage > newTotalPages && newTotalPages > 0) {
          setCurrentPage(newTotalPages);
        }
      } catch (err) {
        toast.error("Không thể xóa người dùng này!");
      }
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">

      {/* HEADER BẢNG */}
      <div className="flex justify-between items-center border-l-8 border-[#001a41] pl-4">
        <div>
          <h2 className="text-xl md:text-2xl font-black text-[#001a41] uppercase tracking-tighter">Quản lý thành viên</h2>
          <p className="text-[9px] md:text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            Hiển thị {paginatedUsers.length} trên tổng số {users.length} người dùng
          </p>
        </div>
        <button
          onClick={fetchUsers}
          className="p-2 hover:bg-slate-100 rounded-full transition-all group"
          title="Làm mới dữ liệu"
        >
          <RefreshCcw size={20} className={`${loading ? 'animate-spin' : ''} text-slate-400 group-hover:text-[#001a41]`} />
        </button>
      </div>

      {/* THÂN BẢNG - RESPONSIVE */}
      <div className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[600px]">
            <thead className="bg-[#fffbeb] border-b border-slate-200">
              <tr className="text-[10px] font-black text-[#001a41] uppercase tracking-widest">
                <th className="p-5">Thành viên</th>
                <th className="p-5">Email</th>
                <th className="p-5 text-center">Vai trò</th>
                <th className="p-5 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="text-[12px] font-bold text-slate-600">
              {loading ? (
                <tr><td colSpan={4} className="p-10 text-center text-slate-400 font-black animate-pulse">ĐANG TẢI DỮ LIỆU...</td></tr>
              ) : paginatedUsers.map((user) => (
                <tr key={user.id} className="border-b border-slate-50 hover:bg-slate-50 transition-colors">
                  <td className="p-5 flex items-center gap-3">
                    <UserAvatar src={user.avatarUrl} name={user.fullName} />
                    <div className="truncate max-w-[150px] md:max-w-none">
                      <div className="font-black text-[#001a41] leading-tight">{user.fullName}</div>
                      <div className="text-[9px] text-slate-400 uppercase tracking-tighter">ID: {user.id.toString().slice(-6)}</div>
                    </div>
                  </td>
                  <td className="p-5 text-slate-500 font-medium truncate max-w-[150px] md:max-w-none">{user.email}</td>
                  <td className="p-5 text-center">
                    <select
                      value={user.role}
                      onChange={(e) => handleUpdateRole(user.id, e.target.value)}
                      className={`px-2 py-1 rounded-md text-[9px] font-black border shadow-sm outline-none cursor-pointer transition-all ${user.role === 'ADMIN' ? 'bg-rose-100 text-rose-600 border-rose-200' :
                          user.role === 'MEMBER' ? 'bg-blue-100 text-blue-600 border-blue-200' :
                            'bg-slate-100 text-slate-500 border-slate-200'
                        }`}
                    >
                      <option value="ADMIN">ADMIN</option>
                      <option value="MEMBER">MEMBER</option>
                      <option value="USER">USER</option>
                    </select>
                  </td>
                  <td className="p-5 text-right">
                    <button
                      onClick={() => handleDelete(user.id, user.fullName)}
                      className="p-2 text-slate-300 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all"
                      title="Xóa người dùng"
                    >
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ĐIỀU KHIỂN PHÂN TRANG */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
            Trang {currentPage} / {totalPages || 1}
          </span>
          <div className="flex gap-2">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(prev => prev - 1)}
              className="p-2 rounded-lg border border-slate-200 bg-white disabled:opacity-30 hover:bg-[#001a41] hover:text-white transition-all shadow-sm"
            >
              <ChevronLeft size={16} />
            </button>
            <button
              disabled={currentPage === totalPages || totalPages === 0}
              onClick={() => setCurrentPage(prev => prev + 1)}
              className="p-2 rounded-lg border border-slate-200 bg-white disabled:opacity-30 hover:bg-[#001a41] hover:text-white transition-all shadow-sm"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}