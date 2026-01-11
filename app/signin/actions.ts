"use server";

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

/**
 * Hàm xử lý đăng nhập phía Server
 * @param formData Dữ liệu từ form đăng nhập
 */
export async function handleSignIn(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  // 1. Kiểm tra đầu vào cơ bản
  if (!email || !password) {
    return redirect(`/signin?error=${encodeURIComponent('Sếp vui lòng nhập đủ Email và Mật khẩu!')}`);
  }

  let redirectPath = '/'; // Mặc định về Home

  try {
    // 2. Gọi API sang Backend cổng 5000
    const response = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const result = await response.json();

    // 3. Nếu Backend báo lỗi (400, 401, 404,...)
    if (!response.ok) {
      redirectPath = `/signin?error=${encodeURIComponent(result.message || 'Thông tin không chính xác sếp ơi!')}`;
    } else {
      // 4. Xử lý ghi Cookie vào trình duyệt
      const cookieStore = await cookies();
      const token = result.token; // Lấy Token mà sếp vừa thêm vào res.json ở BE

      if (token) {
        // Dán nhãn "yt2future_token" (đã đổi tên cho chuẩn mới) cho túi hồ sơ của người dùng
        cookieStore.set('yt2future_token', token, {
          httpOnly: true, // Bảo mật: JavaScript phía client không đọc được
          secure: process.env.NODE_ENV === 'production', // Chỉ dùng HTTPS khi lên server thật
          sameSite: 'lax', // Hỗ trợ gửi cookie an toàn giữa các cổng
          path: '/',       // Cookie có hiệu lực trên toàn bộ trang web
          maxAge: 7 * 24 * 60 * 60, // Sống trong 7 ngày (khớp với JWT)
        });

        console.log("✅ Đã cấp thẻ bài yt2future_token cho sếp thành công!");
      } else {
        console.error("❌ Lỗi: Backend đăng nhập OK nhưng không trả về Token!");
        redirectPath = `/signin?error=${encodeURIComponent('Hệ thống lỗi không cấp được thẻ bài!')}`;
      }

      // 5. Làm mới dữ liệu toàn trang để Navbar cập nhật Avatar ngay
      revalidatePath('/', 'layout');
    }

  } catch (err: any) {
    console.error("💥 Lỗi kết nối Server:", err.message);
    redirectPath = `/signin?error=${encodeURIComponent('Không kết nối được với Server BE 5000 sếp ơi!')}`;
  }

  // 6. Đăng nhập xong, chuyển hướng an toàn ngoài try/catch
  redirect(redirectPath);
}