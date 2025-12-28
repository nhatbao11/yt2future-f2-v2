import axios from 'axios';

// Đảm bảo API_URL trỏ đúng về cổng 5000
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export const reportService = {
  // 1. Lấy danh sách công khai cho trang Sector
  getPublicReports: async (page: number = 1, categoryId?: number, search: string = "") => {
    try {
      const response = await axios.get(`${API_URL}/reports/public`, {
        params: { page, categoryId, search }
      });
      return response.data;
    } catch (error) {
      console.error("Lỗi fetch reports:", error);
      throw error;
    }
  },

  // 2. Lấy danh sách cho ADMIN (Gồm cả bài PENDING)
  // Fix đường dẫn về đúng /reports/admin-list để khớp Backend
  getAllReportsAdmin: async () => {
    const response = await axios.get(`${API_URL}/reports/admin-list`, {
      withCredentials: true
    });
    return response.data;
  },

  // 3. THÊM BÁO CÁO (Hỗ trợ upload file PDF & Ảnh từ máy)
  // Sếp dùng hàm này cho trang CreateReportPage.tsx
  addReport: async (formData: FormData) => {
    const response = await axios.post(`${API_URL}/reports/add`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }, // Bắt buộc cho file
      withCredentials: true
    });
    return response.data;
  },

  // 4. Admin Duyệt/Từ chối bài viết
  // reviewReport: async (id: string, status: 'APPROVED' | 'REJECTED') => {
  //   const response = await axios.post(`${API_URL}/reports/review`, { id, status }, {
  //     withCredentials: true
  //   });
  //   return response.data;
  // },

  // 5. Xử lý danh mục ngành
  getCategories: async () => {
    const response = await axios.get(`${API_URL}/categories`);
    return response.data;
  },

  createCategory: async (data: { name: string, slug: string }) => {
    const response = await axios.post(`${API_URL}/categories/add`, data, {
      withCredentials: true
    });
    return response.data;
  },

  deleteCategory: async (id: number) => {
    const response = await axios.delete(`${API_URL}/categories/${id}`, {
      withCredentials: true
    });
    return response.data;
  },

  // 6. Xóa báo cáo
  deleteReport: async (id: string) => {
    const response = await axios.delete(`${API_URL}/reports/${id}`, {
      withCredentials: true
    });
    return response.data;
  },

  // Phải là /reports/review cho khớp với backend
  reviewReport: async (id: string, status: 'APPROVED' | 'REJECTED') => {
    const response = await axios.post(`${API_URL}/reports/review`, { id, status }, {
      withCredentials: true
    });
    return response.data;
  },
};