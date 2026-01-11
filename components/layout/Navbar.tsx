"use client";

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useCallback } from 'react';
import { Menu, X, User, LogOut, ShieldCheck, LayoutDashboard, Settings } from 'lucide-react';
import { createBrowserClient } from '@supabase/ssr';

export default function Navbar() {
  const pathname = usePathname();
  const [lang, setLang] = useState<'EN' | 'VN'>('EN');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [userData, setUserData] = useState<{ fullName: string, avatarUrl: string | null, role?: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [isInitialRender, setIsInitialRender] = useState(true);
  // Thêm state để theo dõi scroll hiện shadow
  const [isScrolled, setIsScrolled] = useState(false);

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const navLinks = [
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'About Us', href: '/about' },
    { name: 'Sector Analysis', href: '/sector' },
    { name: 'Investment Solutions', href: '/investment' },
    { name: 'Contact', href: '/contact' },
  ];

  const getAvatarSrc = (url: string | null) => {
    // Nếu không có url hoặc url là ảnh mặc định local, trả về path sạch
    if (!url || url === '/Logo.jpg' || url.startsWith('/')) {
      return '/Logo.jpg';
    }
    // Chỉ thêm timestamp cho ảnh từ bên ngoài (Cloudinary, Google) để tránh cache
    return `${url}${url.includes('?') ? '&' : '?'}t=${Date.now()}`;
  };

  const fetchUser = useCallback(async (isSilent = false) => {
    if (!isSilent) setLoading(true);

    try {
      const res = await fetch(`/api/auth/me?v=${Date.now()}`, {
        credentials: 'include'
      });

      if (res.status === 401 || res.status === 403) {
        setUserData(null);
        document.cookie = "yt2future_token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;";
        if (pathname.startsWith('/admin')) {
          window.location.replace('/signin?err=expired');
        }
        return;
      }

      if (res.ok) {
        const data = await res.json();
        setUserData(data.user);
      }
    } catch (err) {
      console.error("Lỗi fetch user:", err);
    } finally {
      setLoading(false);
      setIsInitialRender(false);
    }
  }, [pathname]);

  useEffect(() => {
    if (isInitialRender) {
      fetchUser();
    } else {
      fetchUser(true);
    }

    // Lắng nghe sự kiện scroll
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [pathname, fetchUser, isInitialRender]);

  // src/components/Navbar.tsx

  useEffect(() => {
    const handleSync = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      const hasMyToken = document.cookie.includes('yt2future_token');

      // Kiểm tra nếu có session từ Supabase nhưng chưa có Token của Backend mình
      if (session?.user && !hasMyToken) {
        try {
          // Gửi đầy đủ thông tin sang Backend cổng 5000
          await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/auth/grant-google-role`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email: session.user.email,
              // Bốc dữ liệu từ metadata của Google trả về
              name: session.user.user_metadata?.full_name || session.user.user_metadata?.name,
              picture: session.user.user_metadata?.avatar_url || session.user.user_metadata?.picture
            }),
            credentials: 'include'
          });

          // Sau khi Backend lưu xong và trả về Cookie, gọi lại hàm lấy thông tin để hiện Navbar
          await fetchUser(true);
        } catch (err) {
          console.error("Sync error:", err);
        }
      }
    };

    handleSync();

    window.addEventListener('profileUpdated', () => fetchUser(true));
    return () => window.removeEventListener('profileUpdated', () => fetchUser(true));
  }, [supabase, fetchUser]);

  const handleLogout = async () => {
    setLoading(true);
    try {
      await supabase.auth.signOut({ scope: 'global' });
      await fetch('/api/auth/logout', { method: 'POST' });
      document.cookie = "yt2future_token=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/;";
      window.location.replace(`/signin?status=logout&t=${Date.now()}`);
    } catch (error) {
      window.location.replace('/signin');
    }
  };

  const getLinkStyle = (path: string, isMobile = false) => {
    const isActive = pathname === path;
    const baseStyle = `text-[12px] font-bold uppercase tracking-wider transition-all duration-200 rounded-sm cursor-pointer whitespace-nowrap`;
    if (isMobile) return `${baseStyle} w-full px-6 py-4 border-b border-gray-50 ${isActive ? 'bg-[#1a365d] text-white' : 'text-[#1a365d]'}`;
    // Hover màu đậm như cũ sếp yêu cầu
    return `${baseStyle} px-4 py-2 ${isActive ? 'bg-[#1a365d] text-white shadow-md' : 'text-[#1a365d] hover:bg-[#1a365d] hover:text-white'}`;
  };

  return (
    <header className={`w-full bg-white border-b border-gray-100 sticky top-0 z-100 h-18 md:h-18.75 flex items-center transition-shadow duration-300 ${isScrolled ? 'shadow-md border-transparent' : ''}`}>
      <nav className="max-w-360 mx-auto w-full px-4 md:px-12 flex justify-between items-center relative">

        <Link href="/" className="flex items-center gap-2 md:gap-3 z-110 min-w-40 md:min-w-55">
          <div className="relative w-10 h-10 md:w-14 md:h-14 overflow-hidden rounded-full border border-gray-100 shrink-0 shadow-sm">
            <Image src="/Logo.jpg" alt="Logo" fill sizes="56px" className="object-cover" priority />
          </div>
          <div className="flex flex-col justify-center">
            <h1 className="text-[#1a365d] font-extrabold text-base md:text-xl tracking-tighter uppercase leading-none whitespace-nowrap">YT2FUTURE</h1>
            {/* Slogan quay trở lại đây sếp */}
            {/* <span className="text-[8px] md:text-[10px] text-gray-400 font-bold uppercase tracking-[0.3em] mt-1 italic"></span> */}
          </div>
        </Link>

        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className={getLinkStyle(link.href)}>{link.name}</Link>
          ))}
        </div>

        <div className="flex items-center justify-end gap-2 z-110 min-w-30 md:min-w-45">
          <div className="hidden lg:flex items-center border-r border-gray-200 pr-2 h-10">
            {loading && !userData ? (
              <div className="w-9 h-9 rounded-full bg-gray-100 animate-pulse ml-2" />
            ) : userData ? (
              <div className="flex items-center gap-3">
                {userData.role === 'ADMIN' && (
                  <Link href="/admin" className="flex items-center gap-2 px-3 py-2 bg-orange-50 text-orange-600 rounded-md text-[11px] font-black uppercase tracking-wider hover:bg-orange-100 border border-orange-100 shadow-sm whitespace-nowrap">
                    <ShieldCheck size={16} /> Quản trị
                  </Link>
                )}
                <div className="relative group ml-2">
                  <div className="relative w-9 h-9 overflow-hidden rounded-full border-2 border-[#1a365d]/20 cursor-pointer">
                    <Image src={getAvatarSrc(userData.avatarUrl)} alt="Avatar" fill sizes="36px" className="object-cover" />
                  </div>
                  <div className="absolute top-full right-0 mt-2 w-56 bg-white border border-gray-100 rounded-lg shadow-xl opacity-0 translate-y-2 invisible group-hover:opacity-100 group-hover:translate-y-0 group-hover:visible transition-all duration-200">
                    <div className="p-4 border-b border-gray-50">
                      <p className="text-[#1a365d] font-bold text-sm truncate">{userData.fullName}</p>
                      <p className="text-[9px] text-gray-400 uppercase font-bold tracking-widest">{userData.role}</p>
                    </div>
                    <div className="p-2">
                      <Link href="/profile" className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:bg-gray-50 rounded-md text-xs font-medium"><User size={16} /> Hồ sơ</Link>
                      <button onClick={handleLogout} className="w-full flex items-center gap-3 px-3 py-2 text-red-500 hover:bg-red-50 rounded-md text-xs font-medium mt-1 border-t pt-2"><LogOut size={16} /> Đăng xuất</button>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <Link href="/signin" className={getLinkStyle('/signin')}>Sign In</Link>
            )}
          </div>

          <button className="flex items-center justify-center w-10 h-8 bg-gray-50 rounded-md border border-gray-100 shrink-0" onClick={() => setLang(lang === 'EN' ? 'VN' : 'EN')}>
            <span className="text-[#1a365d] text-[11px] font-bold">{lang}</span>
          </button>

          <button className="lg:hidden p-2 text-[#1a365d] shrink-0" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        <div className={`lg:hidden fixed inset-0 bg-white z-105 transition-transform duration-500 transform ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="flex flex-col pt-24 h-full px-6 overflow-y-auto bg-white">
            {userData ? (
              <div className="flex flex-col gap-4 mb-8">
                <div className="p-6 bg-slate-50 rounded-2xl flex items-center gap-4 border border-slate-100">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-[#1a365d]">
                    <Image src={getAvatarSrc(userData.avatarUrl)} alt="Avatar" fill sizes="64px" className="object-cover" />
                  </div>
                  <div className="flex-1">
                    <p className="font-black text-[#1a365d] text-lg leading-tight">{userData.fullName}</p>
                    <p className="text-[10px] uppercase text-orange-500 font-bold tracking-widest mt-1">{userData.role}</p>
                    <Link href="/profile" onClick={() => setIsMenuOpen(false)} className="inline-flex items-center gap-1 mt-2 text-blue-600 text-[11px] font-bold uppercase underline">
                      <Settings size={12} /> Sửa hồ sơ
                    </Link>
                  </div>
                </div>
                {userData.role === 'ADMIN' && (
                  <Link href="/admin" onClick={() => setIsMenuOpen(false)} className="flex items-center justify-center gap-3 w-full py-4 bg-orange-500 text-white rounded-xl font-black uppercase text-xs shadow-lg">
                    <LayoutDashboard size={18} /> Vào trang quản trị
                  </Link>
                )}
              </div>
            ) : (
              <Link href="/signin" className="mb-8 w-full py-4 bg-[#1a365d] text-white text-center rounded-xl font-bold uppercase text-xs" onClick={() => setIsMenuOpen(false)}>Đăng nhập</Link>
            )}

            <div className="flex flex-col">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href} className={getLinkStyle(link.href, true)} onClick={() => setIsMenuOpen(false)}>{link.name}</Link>
              ))}
            </div>

            {userData && (
              <div className="mt-auto pb-12">
                <button onClick={handleLogout} className="w-full flex items-center justify-center gap-3 py-5 bg-red-50 text-red-600 rounded-2xl font-bold uppercase text-[12px] tracking-widest border border-red-100">
                  <LogOut size={20} /> Đăng xuất ngay
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}