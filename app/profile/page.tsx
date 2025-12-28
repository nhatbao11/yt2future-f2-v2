import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { handleUpdateProfile } from './actions';
import PrimaryButton from '@/components/common/PrimaryButton';
import AvatarUpload from '@/components/partials/AvatarUpload';

export default async function ProfilePage() {
  const cookieStore = await cookies();
  const token = cookieStore.get('yt_capital_token')?.value;

  if (!token) redirect('/signin');

  // Gọi Backend để lấy profile hiện tại
  const res = await fetch('http://localhost:5000/api/auth/me', {
    headers: { 'Cookie': `yt_capital_token=${token}` },
    cache: 'no-store'
  });

  if (!res.ok) redirect('/signin');
  const { user: profile } = await res.json();

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 bg-slate-50">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-lg border border-slate-100">
        <h2 className="text-2xl font-black text-[#1a365d] uppercase italic mb-8 text-center tracking-tight">
          Hồ sơ của sếp
        </h2>

        <form action={handleUpdateProfile} className="space-y-6">
          {/* AvatarUpload sẽ lo việc đẩy ảnh lên Cloudinary và trả về URL */}
          <AvatarUpload initialAvatar={profile?.avatarUrl || '/Logo.jpg'} />

          <div className="space-y-4">
            <div className="group text-left">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Họ và Tên</label>
              <input
                name="fullName"
                defaultValue={profile?.fullName || ''}
                placeholder="Nhập họ tên sếp..."
                className="w-full bg-slate-50 border border-slate-200 p-4 mt-1 text-sm font-bold text-[#1a365d] rounded-xl outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all"
              />
            </div>

            <div className="group text-left">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest ml-1">Email hệ thống</label>
              <input
                value={profile?.email || ''}
                disabled
                className="w-full bg-slate-100 border border-slate-200 p-4 mt-1 text-sm font-medium text-slate-400 rounded-xl cursor-not-allowed"
              />
            </div>
          </div>

          <div className="pt-4">
            <PrimaryButton label="Lưu thay đổi ngay" type="submit" fullWidth={true} className="py-4 shadow-lg shadow-orange-200" />
          </div>
        </form>
      </div>
    </div>
  );
}