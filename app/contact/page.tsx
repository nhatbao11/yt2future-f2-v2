import PageHeader from '@/components/layout/PageHeader';
import PrimaryButton from '@/components/common/PrimaryButton';
import { Mail, Phone, MapPin, Clock } from 'lucide-react'; // Sử dụng lucide-react đã cài

export default function ContactPage() {
  const contactInfo = [
    {
      icon: <MapPin className="text-orange-500" size={24} />,
      title: "Địa chỉ",
      content: "92, 19E, Phường An Lạc, Quận Bình Tân, TP. Hồ Chí Minh"
    },
    {
      icon: <Mail className="text-orange-500" size={24} />,
      title: "Email",
      content: "ytcapital.group@gmail.com"
    },
    {
      icon: <Phone className="text-orange-500" size={24} />,
      title: "Hotline",
      content: "0909 123 456"
    },
    {
      icon: <Clock className="text-orange-500" size={24} />,
      title: "Giờ làm việc",
      content: "Thứ 2 - Thứ 6: 08:00 - 17:30"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* 1. Header đồng bộ */}
      <PageHeader title="Contact Us" />

      <main className="grow py-16 md:py-24">
        <div className="max-w-360 mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

            {/* TRÁI: THÔNG TIN LIÊN HỆ */}
            <div className="space-y-12">
              <div>
                <h2 className="text-3xl md:text-4xl font-black text-[#001a41] uppercase tracking-tighter mb-6">
                  Get in Touch
                </h2>
                <p className="text-gray-500 font-light leading-relaxed max-w-md">
                  Chúng tôi luôn sẵn sàng lắng nghe và giải đáp mọi thắc mắc của bạn về các giải pháp đầu tư và hợp tác chiến lược.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-8">
                {contactInfo.map((item, index) => (
                  <div key={index} className="flex gap-4 group">
                    <div className="shrink-0 w-12 h-12 bg-gray-50 flex items-center justify-center rounded-sm group-hover:bg-[#001a41] transition-colors duration-300">
                      <div className="group-hover:text-white transition-colors">
                        {item.icon}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-1">
                        {item.title}
                      </h4>
                      <p className="text-[#001a41] font-medium text-sm md:text-base leading-snug">
                        {item.content}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* PHẢI: FORM LIÊN HỆ */}
            <div className="bg-gray-50 p-8 md:p-12 rounded-sm shadow-sm border border-gray-100">
              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[11px] font-bold text-[#001a41] uppercase">Họ và tên</label>
                    <input
                      type="text"
                      placeholder="Your Name"
                      className="w-full bg-white border border-gray-200 p-3 text-sm outline-none focus:border-orange-500 transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[11px] font-bold text-[#001a41] uppercase">Email</label>
                    <input
                      type="email"
                      placeholder="Your Email"
                      className="w-full bg-white border border-gray-200 p-3 text-sm outline-none focus:border-orange-500 transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[11px] font-bold text-[#001a41] uppercase">Chủ đề</label>
                  <input
                    type="text"
                    placeholder="Subject"
                    className="w-full bg-white border border-gray-200 p-3 text-sm outline-none focus:border-orange-500 transition-all"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[11px] font-bold text-[#001a41] uppercase">Tin nhắn</label>
                  <textarea
                    rows={4}
                    placeholder="Your Message"
                    className="w-full bg-white border border-gray-200 p-3 text-sm outline-none focus:border-orange-500 transition-all resize-none"
                  ></textarea>
                </div>

                <div className="pt-4">
                  <PrimaryButton label="Send Message" type="submit" fullWidth={true} />
                </div>
              </form>
            </div>

          </div>

          {/* BẢN ĐỒ - Đã sửa lỗi Iframe và tích hợp hiệu ứng */}
          <div className="mt-20 w-full h-112.5 bg-gray-200 rounded-sm overflow-hidden border border-gray-100 shadow-xl relative">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.853612574044!2d106.61117567583794!3d10.745753059756185!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752dd666f8510f%3A0x6d9004033b0062a4!2zOTIsIDE5RSwgQW4gTOG6oWMsIELDr25oIFTDom4sIEjhu5MgQ2jDrSBNaW5oLCBWaeG7h3QgTmFt!5e0!3m2!1svi!2s!4v1715600000000!5m2!1svi!2s" // Đây là link nhúng mẫu cho An Lạc, Bình Tân
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Y&T Capital Location"
              className="grayscale hover:grayscale-0 transition-all duration-700 ease-in-out"
            ></iframe>
          </div>
        </div>
      </main>
    </div>
  );
}