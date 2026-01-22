import axios from 'axios';

// Đảm bảo API_URL trỏ đúng về cổng 5000
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// Helper function to get current locale from URL
const getLocale = () => {
  if (typeof window === 'undefined') return 'vi';
  const path = window.location.pathname;
  if (path.startsWith('/en')) return 'en';
  return 'vi';
};

// Create axios instance with interceptor
const apiClient = axios.create();
apiClient.interceptors.request.use((config) => {
  config.headers['Accept-Language'] = getLocale();
  return config;
});


export const reportService = {
  // 1. Lấy danh sách công khai cho trang Sector
  getPublicReports: async (page: number = 1, categoryId?: number, search: string = "") => {
    try {
      const response = await apiClient.get(`${API_URL}/reports/public`, {
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
  getAllReportsAdmin: async (page: number = 1) => {
    const response = await apiClient.get(`${API_URL}/reports/admin-list`, {
      params: { page },
      withCredentials: true
    });
    return response.data;
  },

  // 3. THÊM BÁO CÁO (Hỗ trợ upload file PDF & Ảnh từ máy)
  // Sếp dùng hàm này cho trang CreateReportPage.tsx
  addReport: async (formData: FormData) => {
    const response = await apiClient.post(`${API_URL}/reports/add`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }, // Bắt buộc cho file
      withCredentials: true
    });
    return response.data;
  },

  // 4. Admin Duyệt/Từ chối bài viết
  // reviewReport: async (id: string, status: 'APPROVED' | 'REJECTED') => {
  //   const response = await apiClient.post(`${API_URL}/reports/review`, { id, status }, {
  //     withCredentials: true
  //   });
  //   return response.data;
  // },

  // 5. Xử lý danh mục ngành
  getCategories: async () => {
    const response = await apiClient.get(`${API_URL}/categories`);
    return response.data;
  },

  createCategory: async (data: { name: string, slug: string }) => {
    const response = await apiClient.post(`${API_URL}/categories/add`, data, {
      withCredentials: true
    });
    return response.data;
  },

  deleteCategory: async (id: number) => {
    const response = await apiClient.delete(`${API_URL}/categories/${id}`, {
      withCredentials: true
    });
    return response.data;
  },

  // 6. Xóa báo cáo
  deleteReport: async (id: string) => {
    const response = await apiClient.delete(`${API_URL}/reports/${id}`, {
      withCredentials: true
    });
    return response.data;
  },

  // Phải là /reports/review cho khớp với backend
  reviewReport: async (id: string, status: 'APPROVED' | 'REJECTED') => {
    const response = await apiClient.post(`${API_URL}/reports/review`, { id, status }, {
      withCredentials: true
    });
    return response.data;
  },


  // 7. Cập nhật báo cáo
  updateReport: async (id: string, formData: FormData) => {
    const response = await apiClient.put(`${API_URL}/reports/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      withCredentials: true
    });
    return response.data;
  },
};