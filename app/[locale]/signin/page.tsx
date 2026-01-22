import Link from '@/components/common/Link';
import Image from 'next/image';
import { handleSignIn } from './actions';
import { handleGoogleSignup } from '../signup/actions';
import PrimaryButton from '@/components/common/PrimaryButton';
import { FcGoogle } from 'react-icons/fc';
import PasswordField from '@/components/partials/PasswordField';
import { getTranslations } from 'next-intl/server';

export default async function SigninPage({
  params,
  searchParams
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ error?: string, success?: string, logout?: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'auth.signIn' });
  const tAuth = await getTranslations({ locale, namespace: 'auth' });
  const { error: errorMessage, success: successMessage } = await searchParams;

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 py-12 font-sans">
      <div className="absolute inset-0 z-0">
        <Image src="/bgSign.jpg" alt="Signin background" fill className="object-cover" priority />
        <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-[2px]" />
      </div>

      <div className="relative z-10 bg-white p-6 md:p-10 rounded-lg shadow-2xl w-full max-w-120 border border-slate-100">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-black text-slate-900 uppercase tracking-tighter italic">{t('title')}</h2>
          <div className="w-12 h-1.5 bg-yellow-500 mx-auto mt-2 rounded-full"></div>

          {errorMessage && (
            <div className="mt-6 p-4 bg-red-50 border-l-4 border-red-500 text-red-700 text-[11px] font-bold text-left animate-in fade-in slide-in-from-top-2">
              <span className="flex items-center gap-2">⚠️ {decodeURIComponent(errorMessage)}</span>
            </div>
          )}
        </div>

        {/* SỬA TẠI ĐÂY: Thêm autoComplete="off" để trình duyệt không tự điền rồi submit ngầm */}
        <form action={handleSignIn} className="space-y-5" autoComplete="off">
          <div className="group text-left">
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">{t('email')}</label>
            <input
              name="email"
              type="email"
              required
              autoComplete="new-password" // Trick để chặn autofill triệt để
              placeholder="ytcapital.group@gmail.com"
              className="w-full bg-slate-50 border border-slate-200 p-3.5 mt-1 text-sm text-slate-900 font-bold rounded-md outline-none focus:border-yellow-500 focus:bg-white transition-all"
            />
          </div>

          <PasswordField name="password" label={t('password')} />

          <div className="pt-2">
            <PrimaryButton label={t('submit')} type="submit" fullWidth={true} className="cursor-pointer font-black uppercase tracking-wider py-4" />
          </div>
        </form>

        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-slate-100"></span></div>
          <div className="relative flex justify-center text-[10px] uppercase font-bold tracking-widest text-slate-400"><span className="bg-white px-4">{tAuth('socialLogin')}</span></div>
        </div>

        <form action={handleGoogleSignup}>
          <button type="submit" className="w-full border border-slate-200 py-3.5 rounded-md flex items-center justify-center gap-3 hover:bg-slate-50 text-sm font-bold text-slate-700 cursor-pointer transition-all">
            <FcGoogle size={22} /> {tAuth('googleLogin')}
          </button>
        </form>

        <p className="text-[13px] mt-8 text-slate-500 text-center font-medium">
          {t('noAccount')} <Link href="/signup" className="font-bold text-yellow-600 underline underline-offset-4">{t('signUpLink')}</Link>
        </p>
      </div>
    </div>
  );
}