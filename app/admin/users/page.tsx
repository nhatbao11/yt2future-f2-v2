"use client";
import React, { useEffect, useState, useMemo } from 'react';
import { adminService } from '@/services/adminService';
import { Trash2, RefreshCcw, ChevronLeft, ChevronRight, UserCog, ShieldCheck } from 'lucide-react';
import { toast } from 'react-hot-toast';

export default function AdminUsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const fetchUsers = async () => {
    setLoading(true);
    try {
      // Gọi service lấy danh sách user từ bảng User mới
      const data = await adminService.getAllUsers();
      setUsers(data || []);
    } catch (err) {
      toast.error("Máy chủ đang bận, sếp đợi chút!");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchUsers(); }, []);

  const totalPages = Math.ceil(users.length / itemsPerPage);
  const paginatedUsers = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return users.slice(startIndex, startIndex + itemsPerPage);
  }, [users, currentPage]);

  // src/app/admin/users/page.tsx

  // src/app/admin/users/page.tsx

  // src/app/admin/users/page.tsx

  const handleUpdateRole = async (userId: string, newRole: string) => {
    // 1. Định nghĩa bảng tra cứu Chức danh tương ứng với Role
    const roleTitleMap: Record<string, string> = {
      ADMIN: 'Quản trị viên',
      CTV: 'Cộng tác viên',
      MEMBER: 'Hội viên chính thức',
      USER: 'Thành viên mới'
    };

    try {
      // 2. CẬP NHẬT STATE NGAY LẬP TỨC (Optimistic UI)
      // Sếp cập nhật cả 'role' VÀ 'roleTitle' để giao diện nhảy luôn chữ bên dưới tên
      setUsers(prev => prev.map(u =>
        u.id === userId
          ? { ...u, role: newRole, roleTitle: roleTitleMap[newRole] }
          : u
      ));

      // 3. Gọi API "bắn" thông tin đi để lưu vào DB ở Backend
      const res = await adminService.updateUserRole(userId, newRole);

      if (res.success) {
        toast.success(`Đã nâng cấp quyền cho sếp xong!`);
        // 4. Phát tín hiệu để cái Log bên cạnh (nếu có) cũng tự cập nhật
        window.dispatchEvent(new Event('refreshLogs'));
      }
    } catch (err) {
      // Nếu lỗi thì sếp gọi fetchUsers() để trả lại dữ liệu cũ cho chắc
      fetchUsers();
      toast.error("Lỗi cập nhật quyền hạn rồi sếp ơi!");
    }
  };

  const handleDelete = async (userId: string, userName: string) => {
    if (window.confirm(`Sếp chắc chắn muốn sa thải vĩnh viễn user "${userName}"?`)) {
      try {
        await adminService.deleteUser(userId);
        toast.success(`Đã xóa ${userName} khỏi hệ thống!`);
        const newList = users.filter(u => u.id !== userId);
        setUsers(newList);
        const newTotalPages = Math.ceil(newList.length / itemsPerPage);
        if (currentPage > newTotalPages && newTotalPages > 0) setCurrentPage(newTotalPages);
      } catch (err) {
        toast.error("Không thể xóa Admin khác!");
      }
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700 p-2 md:p-0">

      {/* HEADER BẢNG - VUÔNG & ĐẬM */}
      <div className="flex justify-between items-center border-l-[12px] border-[#001a41] bg-white p-6 border-2 border-slate-900 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-none">
        <div>
          <h2 className="text-2xl font-black text-[#001a41] uppercase tracking-tighter flex items-center gap-3">
            <UserCog size={28} className="text-orange-500" /> Quản trị nhân sự
          </h2>
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mt-1 italic">
            DATABASE: {users.length} OBJECTS | PAGE: {currentPage}
          </p>
        </div>
        <button
          onClick={fetchUsers}
          className="p-3 border-2 border-slate-900 hover:bg-orange-500 hover:text-white transition-all rounded-none bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none active:translate-x-1 active:translate-y-1"
        >
          <RefreshCcw size={20} className={loading ? 'animate-spin' : ''} />
        </button>
      </div>

      {/* HIỆU ỨNG LOADING XOAY XOAY */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-32 space-y-6">
          <div className="w-16 h-16 border-8 border-slate-200 border-t-orange-500 animate-spin rounded-none shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"></div>
          <p className="font-black text-[#001a41] uppercase text-xs tracking-[0.3em] animate-pulse">
            Đang quét danh sách nhân sự...
          </p>
        </div>
      ) : (
        /* THÂN BẢNG - BOX STYLE */
        <div className="bg-white border-4 border-slate-900 rounded-none overflow-hidden shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
          <div className="overflow-x-auto">
            <table className="w-full text-left min-w-[800px] border-collapse">
              <thead className="bg-[#001a41] border-b-4 border-slate-900 text-white">
                <tr className="text-[11px] font-black uppercase tracking-widest">
                  <th className="p-6">Thành viên & Chức danh</th>
                  <th className="p-6">Liên hệ (Email)</th>
                  <th className="p-6 text-center border-l-2 border-white/10">Phân quyền (Role)</th>
                  <th className="p-6 text-right border-l-2 border-white/10">Kiểm soát</th>
                </tr>
              </thead>
              <tbody className="text-[12px] font-black text-slate-900">
                {paginatedUsers.map((user) => (
                  <tr key={user.id} className="border-b-2 border-slate-100 hover:bg-orange-50 transition-colors">
                    <td className="p-6 flex items-center gap-4">
                      {/* Avatar vuông */}
                      <div className="w-12 h-12 border-2 border-slate-900 rounded-none overflow-hidden shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] bg-slate-100">
                        <img src={user.avatarUrl || '/Logo.jpg'} className="w-full h-full object-cover" alt="avatar" />
                      </div>
                      <div>
                        <div className="font-black text-[#001a41] uppercase tracking-tight text-sm">{user.fullName}</div>
                        {/* Hiển thị RoleTitle động từ DB */}
                        <div className="text-[9px] text-orange-500 font-bold uppercase mt-0.5 flex items-center gap-1">
                          <ShieldCheck size={10} /> {user.roleTitle || 'Thành viên mới'}
                        </div>
                      </div>
                    </td>
                    <td className="p-6 font-bold text-slate-500 italic">{user.email}</td>
                    <td className="p-6 text-center">
                      <select
                        value={user.role}
                        onChange={(e) => handleUpdateRole(user.id, e.target.value)}
                        className={`px-4 py-2 rounded-none text-[10px] font-black border-2 border-slate-900 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] outline-none cursor-pointer transition-all ${user.role === 'ADMIN' ? 'bg-rose-500 text-white' :
                          user.role === 'CTV' ? 'bg-orange-500 text-white' : // Style cho CTV
                            user.role === 'MEMBER' ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-900'
                          }`}
                      >
                        <option value="ADMIN">ADMIN</option>
                        <option value="CTV">CTV</option>
                        <option value="MEMBER">MEMBER</option>
                        <option value="USER">USER</option>
                      </select>
                    </td>
                    <td className="p-6 text-right">
                      <button
                        onClick={() => handleDelete(user.id, user.fullName)}
                        className="p-3 bg-white border-2 border-slate-900 text-slate-300 hover:bg-rose-600 hover:text-white transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:shadow-none rounded-none"
                      >
                        <Trash2 size={20} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* PHÂN TRANG BOX STYLE */}
          <div className="p-6 bg-slate-100 border-t-4 border-slate-900 flex items-center justify-between">
            <span className="text-[11px] font-black text-[#001a41] uppercase tracking-widest">
              Trang {currentPage} / {totalPages || 1}
            </span>
            <div className="flex gap-4">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(prev => prev - 1)}
                className="p-3 border-2 border-slate-900 bg-white text-black font-black disabled:opacity-20 hover:bg-orange-500 hover:text-white transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rounded-none"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                disabled={currentPage === totalPages || totalPages === 0}
                onClick={() => setCurrentPage(prev => prev + 1)}
                className="p-3 border-2 border-slate-900 bg-white text-black font-black disabled:opacity-20 hover:bg-orange-500 hover:text-white transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rounded-none"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}