import Link from 'next/link';
import Image from 'next/image';
import { handleSignup, handleGoogleSignup } from './actions';
import PrimaryButton from '@/components/common/PrimaryButton';
import { FcGoogle } from 'react-icons/fc';
import PasswordField from '@/components/partials/PasswordField';
import SuccessRedirect from '@/components/partials/SuccessRedirect'; // Import máy đếm thời gian

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
      <div className="relative z-10 bg-white p-6 md:p-10 rounded-lg shadow-2xl w-full max-w-120 border border-slate-100 transition-all text-left">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tighter italic">Sign Up</h2>
          <div className="w-12 h-1.5 bg-orange-500 mx-auto mt-2 rounded-full"></div>

          {/* THÔNG BÁO LỖI (MÀU ĐỎ) */}
          {errorMessage && (
            <div className="mt-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 text-[11px] font-bold text-left animate-in fade-in slide-in-from-top-2">
              <span className="flex items-center gap-2">
                <span className="text-base">⚠️</span> {decodeURIComponent(errorMessage)}
              </span>
            </div>
          )}

          {/* THÔNG BÁO THÀNH CÔNG (MÀU XANH) */}
          {successMessage && (
            <div className="mt-6 p-4 bg-green-50 border-l-4 border-green-500 text-green-700 text-[11px] font-bold text-left animate-in fade-in slide-in-from-top-2">
              <span className="flex items-center gap-2">
                <span className="text-base">✅</span> {decodeURIComponent(successMessage)}
                <span className="ml-auto animate-pulse italic font-medium opacity-70">(Chuyển hướng sau 2s...)</span>
              </span>
            </div>
          )}
        </div>

        <form action={handleSignup} className="space-y-5">
          <div className="group">
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Full Name</label>
            <input
              name="fullName"
              type="text"
              required
              placeholder="Nhất Bảo Admin"
              className="w-full bg-slate-50 border border-slate-200 p-3.5 mt-1 text-sm text-slate-900 font-bold rounded-md outline-none focus:border-orange-500 focus:bg-white transition-all placeholder:text-slate-300"
            />
          </div>

          <div className="group">
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Email Address</label>
            <input
              name="email"
              type="email"
              required
              placeholder="nhatbao@ytcapital.vn"
              className="w-full bg-slate-50 border border-slate-200 p-3.5 mt-1 text-sm text-slate-900 font-bold rounded-md outline-none focus:border-orange-500 focus:bg-white transition-all placeholder:text-slate-300"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <PasswordField name="password" label="Password" />
            <PasswordField name="confirmPassword" label="Confirm" />
          </div>

          <div className="flex items-start gap-2 py-1">
            <input type="checkbox" required id="terms" className="w-4 h-4 mt-0.5 cursor-pointer accent-orange-600" />
            <label htmlFor="terms" className="text-[11px] text-slate-500 leading-tight cursor-pointer select-none">
              Tôi đồng ý với{' '}
              <Link href="#" className="font-bold text-slate-900 hover:text-orange-600 transition-colors cursor-pointer">
                Điều khoản sử dụng
              </Link>{' '}
              và{' '}
              <Link href="#" className="font-bold text-slate-900 hover:text-orange-600 transition-colors cursor-pointer">
                Chính sách bảo mật
              </Link>
            </label>
          </div>

          <div className="pt-2">
            <PrimaryButton
              label="Tạo tài khoản"
              type="submit"
              fullWidth={true}
              className="cursor-pointer hover:shadow-xl hover:shadow-orange-100 active:scale-[0.97] transition-all py-4 font-black uppercase tracking-wider"
            />
          </div>
        </form>

        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-slate-100"></span></div>
          <div className="relative flex justify-center text-[10px] uppercase font-bold tracking-widest text-slate-400">
            <span className="bg-white px-4">Social Login</span>
          </div>
        </div>

        {/* NÚT GOOGLE ĐỒNG BỘ 100% VỚI BÊN SIGNIN */}
        {/* <form action={handleGoogleSignup}>
          <button
            type="submit"
            className="w-full border border-slate-200 py-3.5 rounded-md flex items-center justify-center gap-3 hover:bg-slate-50 cursor-pointer transition-all text-sm font-bold text-slate-700 shadow-sm active:bg-slate-100"
          >
            <FcGoogle size={22} />
            Đăng ký bằng Google
          </button>
        </form> */}

        <p className="text-[13px] mt-8 text-slate-500 text-center font-medium">
          Đã có tài khoản?{' '}
          <Link href="/signin" className="font-bold text-orange-600 hover:text-orange-700 underline underline-offset-4 cursor-pointer transition-colors">
            Đăng nhập ngay
          </Link>
        </p>
      </div>
    </div>
  );
}