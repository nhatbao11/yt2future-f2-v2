"use server";

import { v2 as cloudinary } from 'cloudinary';
import { createClient } from '@/utils/supabase/server';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function handleUpdateProfile(formData: FormData) {
  // 1. ÉP CẤU HÌNH NGAY TRONG HÀM để tránh lỗi "Must supply cloud_name"
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
  });

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/signin');

  const fullName = formData.get('fullName') as string;
  const file = formData.get('avatarFile') as File;
  let avatarUrl = formData.get('currentAvatarUrl') as string;

  // 2. Xử lý upload nếu có file mới
  if (file && file.size > 0) {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const uploadResult: any = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            // CHỈ ĐỂ DUY NHẤT upload_preset, KHÔNG THÊM GÌ KHÁC
            upload_preset: 'yt2future',
            // resource_type: 'auto',
          },
          (error: any, result: any) => { // Thêm :any để hết gạch đỏ
            if (error) reject(error);
            else resolve(result);
          }
        );
        stream.end(buffer);
      });

      avatarUrl = uploadResult.secure_url; // Lấy link ảnh từ Cloudinary
    } catch (error: any) {
      console.error("Cloudinary upload error:", error);
      return redirect('/profile?error=' + encodeURIComponent('Upload avatar thất bại: ' + error.message));
    }
  }

  // 3. Cập nhật Text/Link vào Database
  const { error: dbError } = await supabase
    .from('User')
    .update({ fullName, avatarUrl })
    .eq('id', user.id);

  if (dbError) {
    return redirect('/profile?error=' + encodeURIComponent('Lỗi lưu DB: ' + dbError.message));
  }

  revalidatePath('/', 'layout');
  return redirect('/profile?success=' + encodeURIComponent('Cập nhật thành công'));
}