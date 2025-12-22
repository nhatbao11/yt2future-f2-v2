import Link from 'next/link';
import Image from 'next/image';
import PrimaryButton from '@/components/common/PrimaryButton';
import { FcGoogle } from 'react-icons/fc'; // Đảm bảo đã cài react-icons

export default function SignupPage() {
  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 py-12">

      {/* BACKGROUND LAYER */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/bgSign.jpg"
          alt="Signup background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]" />
      </div>

      {/* SIGNUP CARD */}
      <div className="relative z-10 bg-white p-6 md:p-10 rounded-sm shadow-2xl w-full max-w-120 transition-all">

        {/* HEADER FORM */}
        <div className="text-center mb-6">
          <h2 className="text-3xl font-black text-[#001a41] uppercase tracking-tighter">Sign Up</h2>
          <div className="w-10 h-1 bg-orange-500 mx-auto mt-2"></div>
        </div>

        {/* INPUT FORM */}
        <form className="space-y-4 text-left">
          <div className="group">
            <label className="text-[11px] font-bold text-[#001a41] uppercase tracking-wider">Full Name</label>
            <input
              type="text"
              placeholder="Enter your full name"
              className="w-full bg-gray-50 border border-gray-100 p-2.5 mt-1 text-sm outline-none focus:border-blue-500 transition-all"
            />
          </div>

          <div className="group">
            <label className="text-[11px] font-bold text-[#001a41] uppercase tracking-wider">Email Address</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full bg-gray-50 border border-gray-100 p-2.5 mt-1 text-sm outline-none focus:border-blue-500 transition-all"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="group">
              <label className="text-[11px] font-bold text-[#001a41] uppercase tracking-wider">Password</label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full bg-gray-100 border border-gray-100 p-2.5 mt-1 text-sm outline-none focus:border-blue-500 transition-all"
              />
            </div>
            <div className="group">
              <label className="text-[11px] font-bold text-[#001a41] uppercase tracking-wider">Confirm</label>
              <input
                type="password"
                placeholder="••••••••"
                className="w-full bg-gray-100 border border-gray-100 p-2.5 mt-1 text-sm outline-none focus:border-blue-500 transition-all"
              />
            </div>
          </div>

          <div className="flex items-start gap-2 mt-4">
            <input type="checkbox" id="terms" className="w-4 h-4 mt-0.5 cursor-pointer accent-[#001a41]" />
            <label htmlFor="terms" className="text-[10px] text-gray-500 leading-tight">
              Tôi đồng ý với <Link href="#" className="underline text-[#001a41]">Điều khoản dịch vụ</Link> và <Link href="#" className="underline text-[#001a41]">Chính sách bảo mật</Link>
            </label>
          </div>

          {/* NÚT SIGNUP CHÍNH */}
          <div className="pt-2">
            <PrimaryButton label="Create Account" type="submit" fullWidth={true} />
          </div>
        </form>

        {/* CHUYỂN SANG ĐĂNG NHẬP */}
        <p className="text-[12px] mt-6 text-gray-600 text-center">
          Đã có tài khoản?{' '}
          <Link href="/signin" className="font-bold text-[#001a41] hover:text-orange-500 transition-colors underline">
            Đăng nhập ngay
          </Link>
        </p>

        {/* PHẦN CHIA CÁCH */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-gray-100"></span></div>
          <div className="relative flex justify-center text-[10px] uppercase"><span className="bg-white px-2 text-gray-400 font-medium">Hoặc đăng ký bằng</span></div>
        </div>

        {/* NÚT GOOGLE */}
        <button className="w-full border border-gray-200 py-3 rounded-sm flex items-center justify-center gap-3 hover:bg-gray-50 transition-all text-sm font-bold text-gray-700 shadow-sm">
          <FcGoogle size={20} />
          Sign up with Google
        </button>
      </div>
    </div>
  );
}