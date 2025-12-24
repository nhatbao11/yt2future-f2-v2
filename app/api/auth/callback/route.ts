import { createClient } from '@/utils/supabase/server';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);

  // 1. Lấy cái mã "code" từ thanh địa chỉ mà sếp vừa thấy
  const code = searchParams.get('code');

  if (code) {
    const supabase = await createClient();

    // 2. Dùng mã code này để đổi lấy phiên đăng nhập chính thức
    // Supabase sẽ tự động lưu Cookie vào trình duyệt cho sếp ở bước này
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      // 3. Đăng nhập thành công! Chuyển sếp vào Dashboard ngay
      // Sếp có thể đổi '/dashboard' thành trang bất kỳ sếp muốn
      return NextResponse.redirect(`${origin}/`);
    }
  }

  // Nếu có lỗi (hết hạn code hoặc lỗi mạng), quay về trang signup và báo lỗi
  return NextResponse.redirect(`${origin}/signup?error=Xác thực Google thất bại, vui lòng thử lại.`);
}