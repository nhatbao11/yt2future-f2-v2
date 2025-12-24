export const authService = {
  login: async (data: any) => {
    // Dùng đường dẫn tương đối để Next.js Rewrites (Proxy) xử lý
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
      // BẮT BUỘC: Cho phép trình duyệt nhận và lưu Cookie HttpOnly từ BE
      credentials: 'include',
    });

    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message || 'Đăng nhập thất bại!');
    }
    return result;
  },

  register: async (data: any) => {
    const response = await fetch('/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
      credentials: 'include',
    });

    const result = await response.json();
    if (!response.ok) {
      throw new Error(result.message || 'Đăng ký thất bại!');
    }
    return result;
  }
};