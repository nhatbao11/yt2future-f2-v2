"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import Link from '@/components/common/Link';
import { FaFacebookF, FaInstagram, FaTiktok } from 'react-icons/fa';
import { X, FileText } from 'lucide-react';

import { useTranslations } from 'next-intl';

export default function Footer() {
  const t = useTranslations();
  const [activePdf, setActivePdf] = useState<{ url: string; title: string } | null>(null);

  const POLICY_LINKS = {
    privacy: "https://res.cloudinary.com/da0gdcrzn/raw/upload/v1766786574/yt_reports/pdf/uk7xgkdqggyvfrv2exyw",
    terms: "https://res.cloudinary.com/da0gdcrzn/raw/upload/v1766786531/yt_reports/pdf/qjq8lts28jm0uqbufmnq",
    cookies: "https://res.cloudinary.com/your-cloud-name/raw/upload/v1/policies/cookies.pdf"
  };

  const openPdf = (url: string, title: string) => {
    setActivePdf({ url, title });
  };

  return (
    <footer className="bg-[#001a41] text-white pt-16 md:pt-20 pb-10 border-t border-white/5">
      <div className="max-w-360 mx-auto px-6 md:px-12">
        <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start gap-12 lg:gap-16">

          {/* KHỐI 1: BRANDING */}
          <div className="w-full lg:w-[25%] flex flex-col items-center lg:items-start text-center lg:text-left space-y-6">
            <div className="relative w-14 h-14">
              <Image src="/Logo.jpg" alt="YT2Future Logo" fill sizes="56px" className="object-cover rounded-full border border-white/10" />
            </div>
            <div className="space-y-4">
              <h3 className="text-2xl font-black tracking-tighter uppercase leading-none">
                YT2 <span className="text-yellow-500">FUTURE</span>
              </h3>
              <p className="text-white/50 font-light text-[13px] leading-relaxed max-w-70 lg:max-w-none">
                {t('footer.slogan')}
              </p>
            </div>
          </div>

          {/* KHỐI 2: LINKS - CẬP NHẬT HOVER CHỈ TAY CHO LEGAL */}
          <div className="w-full flex flex-1 justify-around lg:justify-center gap-8 sm:gap-40 lg:gap-50 text-center lg:text-left">
            <div>
              <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-yellow-500 mb-6 lg:mb-8 italic">{t('footer.menu')}</h4>
              <ul className="space-y-4 lg:space-y-5 text-[12px] font-medium text-white/60 tracking-widest">
                <li><Link href="/" className="hover:text-white transition-colors">{t('nav.home').toUpperCase()}</Link></li>
                <li><Link href="/about" className="hover:text-white transition-colors">{t('nav.about').toUpperCase()}</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">{t('nav.contact').toUpperCase()}</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-yellow-500 mb-6 lg:mb-8 italic">{t('footer.legal')}</h4>
              <ul className="space-y-4 lg:space-y-5 text-[12px] font-medium text-white/60 tracking-widest">
                {/* Thêm cursor-pointer và hover:text-white */}
                <li>
                  <button
                    onClick={() => openPdf(POLICY_LINKS.privacy, t('footer.privacy').toUpperCase())}
                    className="hover:text-white transition-colors uppercase cursor-pointer outline-none text-left"
                  >
                    {t('footer.privacy')}
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => openPdf(POLICY_LINKS.terms, t('footer.terms').toUpperCase())}
                    className="hover:text-white transition-colors uppercase cursor-pointer outline-none text-left"
                  >
                    {t('footer.terms')}
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => openPdf(POLICY_LINKS.cookies, t('footer.cookies').toUpperCase())}
                    className="hover:text-white transition-colors uppercase cursor-pointer outline-none text-left"
                  >
                    {t('footer.cookies')}
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {/* KHỐI 3: CONTACT */}
          <div className="w-full lg:w-[25%] flex flex-col items-center lg:items-end text-center lg:text-right space-y-8">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-yellow-500 mb-6 lg:mb-8 italic">{t('footer.connect')}</h4>
            <div className="space-y-4 text-[13px] font-light text-white/60">
              <p className="hover:text-white transition-colors">{t('footer.address')}</p>
              <p className="text-2xl font-black text-white tracking-tighter italic">0822 082 407</p>
              <p className="text-[11px] text-yellow-500/100 uppercase tracking-widest font-bold">ytcapital.group@gmail.com</p>
            </div>
            <div className="flex justify-center lg:justify-end gap-4">
              {[
                { icon: <FaFacebookF size={14} />, href: "https://www.facebook.com/profile.php?id=61582063661874" },
                { icon: <FaInstagram size={14} />, href: "https://www.instagram.com/yt2future/" },
                { icon: <FaTiktok size={14} />, href: "https://www.tiktok.com/@yt2future" }
              ].map((item, idx) => (
                <Link key={idx} href={item.href} target="_blank" className="w-10 h-10 flex items-center justify-center rounded-full border border-white/10 hover:bg-white hover:text-[#001a41] transition-all duration-500">
                  {item.icon}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* ROW 2: BOTTOM BAR */}
        <div className="border-t border-white/5 pt-10 mt-16 lg:mt-20 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[9px] font-medium opacity-20 uppercase tracking-[0.5em] text-center whitespace-nowrap">
            {t('footer.copyright')}
          </p>
          <div className="flex items-center gap-4 text-[9px] font-bold tracking-[0.3em] opacity-30 uppercase whitespace-nowrap">
            <span>{t('footer.tagline')}</span>
          </div>
        </div>
      </div>

      {/* MODAL XEM PDF */}
      {activePdf && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-5xl h-[90vh] flex flex-col shadow-2xl overflow-hidden border-2 border-yellow-500">
            <div className="bg-[#001a41] p-4 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <FileText className="text-yellow-500" size={20} />
                <span className="text-white text-[10px] font-black uppercase tracking-widest">{activePdf.title}</span>
              </div>
              <button onClick={() => setActivePdf(null)} className="bg-yellow-500 text-[#001a41] p-1 hover:rotate-90 transition-all cursor-pointer">
                <X size={24} />
              </button>
            </div>
            <div className="flex-1 bg-gray-100">
              <iframe
                src={`https://docs.google.com/viewer?url=${encodeURIComponent(activePdf.url)}&embedded=true`}
                className="w-full h-full border-0"
                title="Policy Viewer"
              />
            </div>
          </div>
        </div>
      )}
    </footer>
  );
}