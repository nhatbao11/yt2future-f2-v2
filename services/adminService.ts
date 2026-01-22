import axios from 'axios';

// Helper function to get current locale from URL
const getLocale = () => {
  if (typeof window === 'undefined') return 'vi';
  const path = window.location.pathname;
  if (path.startsWith('/en')) return 'en';
  return 'vi';
};

// Cấu hình axios để gửi kèm Cookie (yt2future_token)
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api',
  withCredentials: true,
});

// Add request interceptor to include Accept-Language header
api.interceptors.request.use((config) => {
  config.headers['Accept-Language'] = getLocale();
  return config;
});


export const adminService = {
  // Lấy danh sách user
  getAllUsers: async () => {
    const res = await api.get('/admin/users');
    return res.data.users;
  },

  // Cập nhật Role (ADMIN/MEMBER)
  updateUserRole: async (userId: string, role: string) => {
    const res = await api.put('/admin/users/role', { userId, role });
    return res.data;
  },

  // Xóa user
  deleteUser: async (id: string) => {
    const res = await api.delete(`/admin/users/${id}`);
    return res.data;
  },

  // Hàm mới để lấy nhật ký thật từ DB
  getAuditLogs: async (page: number = 1) => {
    try {
      const response = await api.get(`/admin/logs?page=${page}`);
      return response.data; // Trả về cả logs và totalPages
    } catch (error) {
      return { logs: [], totalPages: 1 };
    }
  },


  // 1. Lấy danh sách Feedback chờ duyệt
  getPendingFeedbacks: async () => {
    const res = await api.get('/admin/feedback/pending');
    return res.data.feedbacks;
  },

  // 2. Lấy TẤT CẢ danh sách Feedback
  getAllFeedbacks: async () => {
    const res = await api.get('/admin/feedback/all');
    return res.data.feedbacks;
  },

  // 3. Duyệt hoặc Từ chối Feedback
  reviewFeedback: async (id: string, status: 'APPROVED' | 'REJECTED') => {
    const res = await api.post('/admin/feedback/review', { id, status });
    return res.data;
  },

  // 4. Lấy Feedback cho trang chủ (Public)
  getHomeFeedbacks: async () => {
    const res = await api.get('/feedback/home');
    return res.data.feedbacks;
  },

  async getDashboardStats() {
    const res = await api.get('/admin/stats');
    return res.data;
  },

  // 5. Xóa Feedback
  deleteFeedback: async (id: string) => {
    const res = await api.delete(`/admin/feedback/${id}`);
    return res.data;
  }
};
