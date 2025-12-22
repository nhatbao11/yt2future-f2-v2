import PageHeader from '@/components/layout/PageHeader';
import SectorFilter from '@/components/partials/SectorFilter';
import { Download, Eye, Calendar, User, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

const sectorReports = [
  {
    id: 1,
    title: "Chiến lược Ngành Ngân Hàng 2025",
    description: "Phân tích sâu về NIM và nợ xấu của hệ thống ngân hàng thương mại Việt Nam.",
    category: "Banking",
    date: "23/12/2025",
    author: "Minh Nhật",
    role: "Founder & Macro Lead",
    thumbnail: "https://images.unsplash.com/photo-1501167786227-4cba60f6d58f?q=80&w=600",
  },
  {
    id: 2,
    title: "Báo cáo thị trường Crypto Quý 4",
    description: "Đánh giá dòng tiền on-chain và các dự án Layer 2 tiềm năng trong giai đoạn tới.",
    category: "Crypto",
    date: "22/12/2025",
    author: "Phương Nga",
    role: "Co-Founder & Researcher",
    thumbnail: "https://images.unsplash.com/photo-1621761191319-c6fb62004040?q=80&w=600",
  }
];

export default function SectorPage() {
  const categories = ['All Sectors', 'Banking', 'Crypto', 'Real Estate', 'Tech'];

  return (
    <div className="min-h-screen bg-[#fafafa]">
      <PageHeader title="Sector Analysis" />

      <main className="max-w-360 mx-auto px-6 md:px-12 py-20">

        {/* Bộ lọc (Client Component) */}
        <SectorFilter categories={categories} />

        {/* Danh sách bài viết (Server Side Rendering - SEO cực tốt) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {sectorReports.map((report) => (
            <div key={report.id} className="group bg-white border border-gray-100 flex flex-col md:flex-row overflow-hidden hover:shadow-2xl transition-all duration-500">

              {/* Hình ảnh */}
              <div className="md:w-2/5 relative h-64 md:h-auto overflow-hidden">
                <img
                  src={report.thumbnail}
                  alt={report.title}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute top-0 left-0 bg-orange-500 text-white text-[9px] font-black px-4 py-1 uppercase">
                  {report.category}
                </div>
              </div>

              {/* Nội dung */}
              <div className="md:w-3/5 p-8 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                    <Calendar size={12} /> {report.date}
                  </div>
                  <h3 className="text-xl font-black text-[#001a41] uppercase tracking-tighter leading-tight group-hover:text-orange-500 transition-colors">
                    {report.title}
                  </h3>
                  <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">
                    {report.description}
                  </p>

                  {/* Phần Tác Giả xịn sò hơn */}
                  <div className="flex items-center gap-3 pt-6 border-t border-gray-50">
                    <div className="w-9 h-9 rounded-full bg-gray-100 flex items-center justify-center text-[#001a41]">
                      <User size={18} />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-[#001a41] uppercase">{report.author}</p>
                      <div className="flex items-center gap-1 text-[9px] text-orange-500 font-bold uppercase tracking-tighter">
                        <ShieldCheck size={10} /> {report.role}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 mt-8">
                  <Link href="#" className="flex-1 bg-[#001a41] text-white text-[10px] font-black uppercase tracking-widest py-3 text-center hover:bg-orange-500 transition-colors flex items-center justify-center gap-2">
                    <Eye size={14} /> Đọc Báo Cáo
                  </Link>
                  <button className="px-4 border border-gray-100 hover:bg-gray-100 transition-colors">
                    <Download size={16} className="text-[#001a41]" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}