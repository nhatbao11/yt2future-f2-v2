import Image from 'next/image';
import SuccessRedirect from '@/components/partials/SuccessRedirect';
import SignupPageClient from './SignupPageClient';

export default async function SignupPage({
  searchParams
}: {
  searchParams: Promise<{ error?: string, success?: string }>
}) {
  const { error: errorMessage, success: successMessage } = await searchParams;

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 py-12 font-sans">
      {/* Component chạy ngầm: Đợi 2s rồi chuyển hướng nếu có success */}
      <SuccessRedirect success={successMessage} />

      {/* BACKGROUND LAYER */}
      <div className="absolute inset-0 z-0">
        <Image src="/bgSign.jpg" alt="Signup background" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-[2px]" />
      </div>

      {/* SIGNUP CARD */}
      <SignupPageClient errorMessage={errorMessage} successMessage={successMessage} />
    </div>
  );
}