"use client";

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const [lang, setLang] = useState<'EN' | 'VN'>('EN');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: 'Dashboard', href: '/dashboard' },
    { name: 'About Us', href: '/about' },
    { name: 'Sector Analysis', href: '/sector' },
    { name: 'Business Analysis', href: '/business' },
    { name: 'Investment Solutions', href: '/investment' },
    { name: 'Contact', href: '/contact' },
  ];

  const getLinkStyle = (path: string, isMobile = false) => {
    const isActive = pathname === path;
    const baseStyle = `text-[12px] font-bold uppercase tracking-wider transition-all duration-300 rounded-sm`;

    if (isMobile) {
      return `${baseStyle} w-full px-6 py-4 border-b border-gray-50 ${isActive ? 'bg-[#1a365d] text-white' : 'text-[#1a365d] active:bg-gray-100'
        }`;
    }

    return `${baseStyle} px-4 py-2 ${isActive ? 'bg-[#1a365d] text-white shadow-md' : 'text-[#1a365d] hover:bg-[#1a365d] hover:text-white'
      }`;
  };

  return (
    <header className="w-full bg-white border-b border-gray-100 sticky top-0 z-100">
      <nav className="max-w-360 mx-auto px-4 md:px-12 py-3 flex justify-between items-center">

        {/* LOGO & SLOGAN */}
        <Link href="/" className="flex items-center gap-2 md:gap-3 group z-110">
          <div className="relative w-10 h-10 md:w-12 md:h-12 overflow-hidden rounded-full border border-gray-100 shadow-sm">
            <Image src="/Logo.jpg" alt="Logo" fill className="object-cover group-hover:scale-110 transition-transform" />
          </div>
          <div className="flex flex-col">
            <h1 className="text-[#1a365d] font-extrabold text-base md:text-1xl tracking-tighter leading-none">Y&T CAPITAL</h1>
            <p className="hidden md:block text-[9px] md:text-[11px] text-gray-500 font-medium italic mt-1 tracking-tight">Shaping Tomorrow Through Agile Innovation</p>
          </div>
        </Link>

        {/* MENU DESKTOP */}
        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link key={link.href} href={link.href} className={getLinkStyle(link.href)}>
              {link.name}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center border-r border-gray-200 pr-2">
            <Link href="/signin" className={getLinkStyle('/signin')}>Sign In</Link>
          </div>

          {/* CHUYỂN NGỮ */}
          <div className="relative group ml-1 md:ml-2">
            <button
              className="flex items-center gap-1.5 px-2 py-1.5 bg-gray-50 rounded-md border border-gray-100"
              onClick={() => setLang(lang === 'EN' ? 'VN' : 'EN')}
            >
              <span className="text-[#1a365d] text-[11px] md:text-[13px] font-bold">{lang}</span>
              <span className="text-[10px] text-gray-400 group-hover:rotate-180 transition-transform">▼</span>
            </button>

            <div className="absolute top-full right-0 mt-3 bg-[#1a365d] text-white text-[10px] py-2 px-3 rounded-sm shadow-2xl opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap z-50 transform translate-y-2 group-hover:translate-y-0">
              {lang === 'EN' ? 'Click để đổi sang Tiếng Việt' : 'Click to switch to English'}
              <div className="absolute -top-1 right-4 w-2 h-2 bg-[#1a365d] rotate-45"></div>
            </div>
          </div>

          <button className="lg:hidden p-2 text-[#1a365d] z-110" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* MOBILE DRAWER */}
        <div className={`lg:hidden fixed inset-0 bg-white z-105 transition-transform duration-500 ease-in-out transform ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="flex flex-col pt-24 h-full overflow-y-auto">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href} className={getLinkStyle(link.href, true)} onClick={() => setIsMenuOpen(false)}>
                {link.name}
              </Link>
            ))}
            <div className="p-6 mt-auto border-t border-gray-100 bg-gray-50">
              <Link href="/signin" className="block w-full bg-[#1a365d] text-white py-4 rounded-md text-center font-bold uppercase tracking-widest">
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}