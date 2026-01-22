'use server';

import { createClient } from '@/utils/supabase/server';
import { authService } from '@/services/authService';
import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';

export async function handleGoogleSignup() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_APP_URL || process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/api/auth/callback`,
    },
  });

  if (error) {
    return redirect(`/signup?error=${encodeURIComponent(error.message)}`);
  }

  if (data.url) {
    return redirect(data.url);
  }
}

export async function handleSignup(formData: FormData) {
  const fullName = formData.get('fullName') as string;
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;
  const confirmPassword = formData.get('confirmPassword') as string;

  // 1. Kiểm tra mật khẩu khớp nhau
  if (password !== confirmPassword) {
    return redirect(`/signup?error=${encodeURIComponent('Mật khẩu xác nhận không khớp sếp ơi!')}`);
  }

  // 2. Kiểm tra định dạng mật khẩu
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
  if (!passwordRegex.test(password)) {
    const msg = encodeURIComponent('Mật khẩu cần 8 ký tự, có chữ hoa, chữ thường và số.');
    return redirect(`/signup?error=${msg}`);
  }

  let isSuccess = false;
  let errorMessage = '';

  try {
    // 3. Gọi Service xử lý Backend cổng 5000
    await authService.register({ fullName, email, password });
    isSuccess = true;

    // Làm mới dữ liệu toàn hệ thống
    revalidatePath("/", "layout");

  } catch (error: any) {
    // Chỉ lưu thông báo lỗi, không gọi redirect trong catch
    errorMessage = error.message || 'Đăng ký thất bại sếp ơi!';
  }

  // 4. THỰC HIỆN CHUYỂN HƯỚNG BÊN NGOÀI TRY-CATCH
  if (isSuccess) {
    return redirect('/signup?success=' + encodeURIComponent('Đăng ký thành công! Sếp đăng nhập ngay đi.'));
    // redirect('/')
  } else {
    return redirect(`/signup?error=${encodeURIComponent(errorMessage)}`);
  }
}