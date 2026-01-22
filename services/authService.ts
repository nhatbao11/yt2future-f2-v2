// src/services/authService.ts (Frontend)

// Tự động bốc URL từ .env, nếu không có thì mặc định cổng 5000 của BE
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

// Helper function to get current locale from URL
const getLocale = () => {
  if (typeof window === 'undefined') return 'vi';
  const path = window.location.pathname;
  if (path.startsWith('/en')) return 'en';
  return 'vi';
};

export const authService = {
  // 1. Đăng nhập truyền thống
  login: async (data: any) => {
    const response = await fetch(`${API_URL}/auth/login`, { // Thêm URL tuyệt đối
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept-Language': getLocale()
      },
      body: JSON.stringify(data),
      credentials: 'include',
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.message || 'Đăng nhập thất bại!');
    return result;
  },

  // 2. Đăng ký truyền thống
  register: async (data: any) => {
    const response = await fetch(`${API_URL}/auth/register`, { // Thêm URL tuyệt đối
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept-Language': getLocale()
      },
      body: JSON.stringify(data),
      credentials: 'include',
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.message || 'Đăng ký thất bại!');
    return result;
  },

  // 3. ĐĂNG NHẬP GOOGLE
  grantGoogleRole: async (profile: { email: string; name: string; picture: string }) => {
    const response = await fetch(`${API_URL}/auth/grant-google-role`, { // Thêm URL tuyệt đối
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept-Language': getLocale()
      },
      body: JSON.stringify(profile),
      credentials: 'include',
    });

    const result = await response.json();
    if (!response.ok) throw new Error(result.message || 'Lỗi xác thực Google!');
    return result;
  },

  // 4. Lấy thông tin cá nhân
  getMe: async () => {
    const response = await fetch(`${API_URL}/auth/me`, { // Thêm URL tuyệt đối
      method: 'GET',
      headers: {
        'Accept-Language': getLocale()
      },
      credentials: 'include',
    });
    const result = await response.json();
    return result;
  }
};