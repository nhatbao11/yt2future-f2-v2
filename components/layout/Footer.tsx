import Image from 'next/image';
import Link from 'next/link';
import { FaFacebookF, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-[#001a41] text-white pt-16 md:pt-20 pb-10 border-t border-white/5">
      <div className="max-w-360 mx-auto px-6 md:px-12">

        {/* ROW 1: Chuyển đổi linh hoạt từ Column (Mobile) sang Row (Desktop) */}
        <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start gap-12 lg:gap-16">

          {/* KHỐI 1: BRANDING - Căn giữa trên mobile, căn trái trên desktop */}
          <div className="w-full lg:w-[25%] flex flex-col items-center lg:items-start text-center lg:text-left space-y-6">
            <div className="relative w-14 h-14">
              <Image
                src="/Logo.jpg"
                alt="Y&T Capital Logo"
                fill
                className="object-cover rounded-full border border-white/10"
              />
            </div>
            <div className="space-y-4">
              <h3 className="text-2xl font-black tracking-tighter uppercase leading-none">
                Y&T <span className="text-orange-500">CAPITAL</span>
              </h3>
              <p className="text-white/50 font-light text-[13px] leading-relaxed max-w-70 lg:max-w-none">
                Shaping Tomorrow Through Agile Innovation.
              </p>
            </div>
          </div>

          {/* KHỐI 2: LINKS - Tách ra 2 cột rõ ràng trên cả mobile */}
          <div className="w-full flex flex-1 justify-around lg:justify-center gap-8 sm:gap-40 lg:gap-50 text-center lg:text-left">
            <div>
              <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-orange-500 mb-6 lg:mb-8 italic">Menu</h4>
              <ul className="space-y-4 lg:space-y-5 text-[12px] font-medium text-white/60 tracking-widest">
                <li><Link href="/" className="hover:text-white transition-colors">TRANG CHỦ</Link></li>
                <li><Link href="/about" className="hover:text-white transition-colors">VỀ CHÚNG TÔI</Link></li>
                <li><Link href="/sectors" className="hover:text-white transition-colors">KHO KIẾN THỨC</Link></li>
                <li><Link href="/contact" className="hover:text-white transition-colors">LIÊN HỆ</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-orange-500 mb-6 lg:mb-8 italic">Legal</h4>
              <ul className="space-y-4 lg:space-y-5 text-[12px] font-medium text-white/60 tracking-widest">
                <li><Link href="/privacy" className="hover:text-white transition-colors">PRIVACY POLICY</Link></li>
                <li><Link href="/terms" className="hover:text-white transition-colors">TERMS OF USE</Link></li>
                <li><Link href="/cookies" className="hover:text-white transition-colors">COOKIE POLICY</Link></li>
              </ul>
            </div>
          </div>

          {/* KHỐI 3: CONTACT - Căn giữa trên mobile, căn phải trên desktop */}
          <div className="w-full lg:w-[25%] flex flex-col items-center lg:items-end text-center lg:text-right space-y-8">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-orange-500 mb-6 lg:mb-8 italic">Connect With Us</h4>
            <div className="space-y-4 text-[13px] font-light text-white/60">
              <p className="hover:text-white transition-colors">Bình Tân, TP. Hồ Chí Minh</p>
              <p className="text-2xl font-black text-white tracking-tighter italic">0909 123 456</p>
              <p className="text-[11px] text-orange-500/50 uppercase tracking-widest font-bold">ytcapital.group@gmail.com</p>
            </div>

            <div className="flex justify-center lg:justify-end gap-4">
              {[
                { icon: <FaFacebookF size={14} />, href: "#" },
                { icon: <FaInstagram size={14} />, href: "#" },
                { icon: <FaLinkedinIn size={14} />, href: "#" }
              ].map((item, idx) => (
                <Link
                  key={idx}
                  href={item.href}
                  className="w-10 h-10 flex items-center justify-center rounded-full border border-white/10 hover:bg-white hover:text-[#001a41] transition-all duration-500"
                >
                  {item.icon}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* ROW 2: BOTTOM BAR */}
        <div className="border-t border-white/5 pt-10 mt-16 lg:mt-20 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[9px] font-medium opacity-20 uppercase tracking-[0.5em] text-center">
            © 2025 Y&T Capital. Agile Innovation Team.
          </p>
          <div className="flex items-center gap-4">
            <div className="hidden md:block w-12 h-[px] bg-white/10"></div>
            <span className="text-[9px] font-bold tracking-[0.3em] opacity-30 uppercase">Sustainable Future</span>
          </div>
        </div>
      </div>
    </footer>
  );
}