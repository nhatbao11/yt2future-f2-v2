"use server";

import { v2 as cloudinary } from 'cloudinary';
import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function handleUpdateProfile(formData: FormData) {
  // 1. Cấu hình Cloudinary bằng API Secret (Signed)
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
  });

  const cookieStore = await cookies();
  const token = cookieStore.get('yt2future_token')?.value;
  if (!token) redirect('/signin');

  const fullName = formData.get('fullName') as string;
  const file = formData.get('avatarFile') as File;
  let avatarUrl = formData.get('currentAvatarUrl') as string;

  let isSuccess = false;

  // 2. Xử lý Upload Cloudinary
  if (file && file.size > 0) {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      const uploadResult: any = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: 'avatars',
            // Vì dùng API Key/Secret nên không cần upload_preset nếu không muốn
            // Nếu dùng, hãy chắc chắn preset đó là Signed
            upload_preset: 'yt2future',
          },
          (error, result) => error ? reject(error) : resolve(result)
        );
        stream.end(buffer);
      });
      avatarUrl = uploadResult.secure_url; // Đây là URL link text để lưu DB
    } catch (error) {
      console.error("Lỗi Signed Upload Cloudinary:", error);
    }
  }

  // 3. Gửi Link về Backend Prisma (Cổng 5000)
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/auth/update-user`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Cookie': `yt2future_token=${token}`
      },
      body: JSON.stringify({ fullName, avatarUrl }), // Chỉ gửi Text URL
    });

    if (response.ok) {
      isSuccess = true;
      revalidatePath('/', 'layout'); // Làm mới Navbar
    }
  } catch (err) {
    console.error("Lỗi Backend:", err);
  }

  // 4. Chuyển hướng (Luôn để ngoài try/catch)
  if (isSuccess) {
    redirect('/profile?success=' + encodeURIComponent('Đã lưu vào DB thành công!'));
  } else {
    redirect('/profile?error=' + encodeURIComponent('Lưu thất bại, sếp check Terminal BE xem!'));
  }
}