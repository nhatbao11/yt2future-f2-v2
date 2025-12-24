"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function SuccessRedirect({ success }: { success: string | undefined }) {
  const router = useRouter();

  useEffect(() => {
    if (success) {
      // Đợi 2 giây rồi đá sang trang signin
      const timer = setTimeout(() => {
        router.push('/signin?success=' + encodeURIComponent(success));
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [success, router]);

  return null; // Component này chạy ngầm, không hiển thị gì cả
}