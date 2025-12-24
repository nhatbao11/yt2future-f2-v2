import Image from 'next/image';
import Link from 'next/link'; // Sửa lỗi thiếu Link
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import { handleUpdateProfile } from './actions';
import PrimaryButton from '@/components/common/PrimaryButton';
import AvatarUpload from '@/components/partials/AvatarUpload';

export default async function ProfilePage({
  searchParams
}: {
  searchParams: Promise<{ error?: string, success?: string }>
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/signin');

  const { data: profile } = await supabase
    .from('User')
    .select('fullName, avatarUrl')
    .eq('id', user.id)
    .single();

  const { error, success } = await searchParams;

  return (
    <div className="relative min-h-screen flex items-center justify-center py-12 px-4 font-sans text-slate-900">
      <div className="absolute inset-0 z-0">
        <Image src="/bgSign.jpg" alt="bg" fill className="object-cover opacity-50" priority />
        <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-[4px]" />
      </div>

      <div className="relative z-10 bg-white p-8 rounded-lg shadow-2xl w-full max-w-[480px]">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-black uppercase italic italic tracking-tighter">Hồ sơ</h2>
          <div className="w-12 h-1.5 bg-orange-500 mx-auto mt-2 rounded-full"></div>

          {success && <div className="mt-4 p-3 bg-green-50 border-l-4 border-green-500 text-green-700 text-[11px] font-bold uppercase">{decodeURIComponent(success)}</div>}
          {error && <div className="mt-4 p-3 bg-red-50 border-l-4 border-red-500 text-red-700 text-[11px] font-bold uppercase">{decodeURIComponent(error)}</div>}
        </div>

        <form action={handleUpdateProfile} className="space-y-6">
          <AvatarUpload initialAvatar={profile?.avatarUrl || '/Logo.jpg'} />
          <input type="hidden" name="currentAvatarUrl" defaultValue={profile?.avatarUrl || ''} />

          <div className="group text-left">
            <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">Họ và Tên</label>
            <input
              name="fullName"
              defaultValue={profile?.fullName || ''}
              required
              className="w-full bg-slate-50 border border-slate-200 p-3.5 mt-1 text-sm font-bold rounded-md outline-none focus:border-orange-500 transition-all"
            />
          </div>

          <PrimaryButton label="Lưu thay đổi" type="submit" fullWidth={true} />
        </form>

        <div className="mt-6 text-center">
          <Link href="/" className="text-[11px] text-slate-400 font-bold uppercase hover:text-orange-600 transition-all">
            ← Quay lại trang chủ
          </Link>
        </div>
      </div>
    </div>
  );
}