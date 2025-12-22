import Link from 'next/link';
import Image from 'next/image';
import PrimaryButton from '@/components/common/PrimaryButton';
import { FcGoogle } from 'react-icons/fc'; // Cài đặt: npm install react-icons

export default function LoginPage() {
  return (
    <div className="relative min-h-[90vh] flex items-center justify-center overflow-hidden px-4 py-10">

      {/* BACKGROUND LAYER */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/bgSign.jpg"
          alt="Login background"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]" />
      </div>

      {/* LOGIN CARD - Responsive width */}
      <div className="relative z-10 bg-white p-6 md:p-10 rounded-sm shadow-2xl w-full max-w-112.5 transition-all">

        {/* HEADER FORM */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-black text-[#001a41] uppercase tracking-tighter">Signin</h2>
          <div className="w-10 h-1 bg-orange-500 mx-auto mt-2"></div>
          <p className="text-[10px] text-gray-400 mt-4 italic uppercase tracking-wider">
            By logging in, you agree to the Terms of Use
          </p>
        </div>

        {/* INPUT FORM */}
        <form className="space-y-5 text-left">
          <div className="group">
            <label className="text-[11px] font-bold text-[#001a41] uppercase tracking-wider">Email Address</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full bg-gray-50 border border-gray-100 p-3 mt-1 text-sm outline-none focus:border-blue-500 transition-all"
            />
          </div>

          <div className="group">
            <label className="text-[11px] font-bold text-[#001a41] uppercase tracking-wider">Password</label>
            <input
              type="password"
              placeholder="••••••••"
              className="w-full bg-gray-50 border border-gray-100 p-3 mt-1 text-sm outline-none focus:border-blue-500 transition-all"
            />
          </div>

          <div className="text-right">
            <Link href="#" className="text-[10px] text-blue-600 hover:underline font-medium">
              Forgot password?
            </Link>
          </div>

          {/* NÚT SIGNIN CHÍNH */}
          <PrimaryButton label="Sign In" type="submit" fullWidth={true} />
        </form>

        {/* CHUYỂN SANG ĐĂNG KÝ */}
        <p className="text-[12px] mt-8 text-gray-600 text-center">
          Chưa có tài khoản?{' '}
          <Link href="/signup" className="font-bold text-[#001a41] hover:text-orange-500 transition-colors underline">
            Đăng ký ngay
          </Link>
        </p>

        {/* PHẦN CHIA CÁCH */}
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-gray-100"></span></div>
          <div className="relative flex justify-center text-[10px] uppercase"><span className="bg-white px-2 text-gray-400">Or continue with</span></div>
        </div>

        {/* NÚT LOGIN GOOGLE - Tùy biến PrimaryButton cho Google */}
        <button className="w-full border border-gray-200 py-3 rounded-sm flex items-center justify-center gap-3 hover:bg-gray-50 transition-all text-sm font-bold text-gray-700 shadow-sm">
          <FcGoogle size={22} />
          Login with Google
        </button>
      </div>
    </div>
  );
}