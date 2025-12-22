import PageHeader from '@/components/layout/PageHeader';
import { BookOpen, GraduationCap, Download, Eye, Star, ChevronRight } from 'lucide-react';
import Link from 'next/link';

const books = [
  {
    title: "Nhà Đầu Tư Thông Minh",
    author: "Benjamin Graham",
    description: "Cuốn sách kinh điển về đầu tư giá trị, nền tảng cho mọi nhà đầu tư thành công.",
    rating: 5,
    pages: "600+",
    thumbnail: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=400",
  },
  {
    title: "Làm Giàu Qua Chứng Khoán",
    author: "William O'Neil",
    description: "Hệ thống CANSLIM giúp tìm kiếm những siêu cổ phiếu tăng trưởng mạnh nhất.",
    rating: 4.8,
    pages: "450+",
    thumbnail: "https://images.unsplash.com/photo-1592492159418-39f319320569?q=80&w=400",
  }
];

const knowledge = [
  {
    level: "Cơ bản",
    title: "Đọc hiểu Báo cáo tài chính cho người mới",
    description: "Hướng dẫn cách bóc tách Bảng cân đối kế toán và P&L để tìm ra sức khỏe doanh nghiệp.",
    duration: "15 phút đọc",
    date: "23/12/2025"
  },
  {
    level: "Nâng cao",
    title: "Định giá DCF & So sánh tương đương",
    description: "Các mô hình toán học để xác định giá trị thực của cổ phiếu trong dài hạn.",
    duration: "30 phút đọc",
    date: "20/12/2025"
  }
];

export default function InvestmentSolutions() {
  return (
    <div className="min-h-screen bg-white">
      <PageHeader title="Investment Solutions" />

      <main className="max-w-360 mx-auto px-6 md:px-12 py-20">

        {/* Section 1: Hành trình sách (Layout dạng Grid dọc - Card sách) */}
        <section className="mb-24">
          <div className="flex items-center gap-3 mb-10 border-l-4 border-orange-500 pl-4">
            <BookOpen className="text-[#001a41]" size={24} />
            <h2 className="text-2xl font-black text-[#001a41] uppercase tracking-tighter">Hành trình sách</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {books.map((book, i) => (
              <div key={i} className="group bg-[#fcfcfc] border border-gray-100 p-6 flex gap-6 hover:shadow-xl transition-all">
                <div className="w-1/3 aspect-3/4 overflow-hidden shadow-lg shadow-black/10">
                  <img src={book.thumbnail} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={book.title} />
                </div>
                <div className="w-2/3 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex text-orange-400">
                      {[...Array(5)].map((_, idx) => <Star key={idx} size={10} fill={idx < Math.floor(book.rating) ? "currentColor" : "none"} />)}
                    </div>
                    <h3 className="text-lg font-black text-[#001a41] leading-tight uppercase">{book.title}</h3>
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest italic">{book.author}</p>
                    <p className="text-xs text-gray-500 leading-relaxed line-clamp-2 italic font-light">"{book.description}"</p>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <button className="flex-1 bg-[#001a41] text-white text-[10px] font-bold uppercase tracking-widest py-3 hover:bg-orange-500 transition-colors">Đọc thử PDF</button>
                    <button className="px-3 border border-gray-200 hover:bg-gray-50"><Download size={14} /></button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 2: Kiến thức đầu tư (Layout dạng Timeline/List học thuật) */}
        <section>
          <div className="flex items-center gap-3 mb-10 border-l-4 border-[#001a41] pl-4">
            <GraduationCap className="text-orange-500" size={24} />
            <h2 className="text-2xl font-black text-[#001a41] uppercase tracking-tighter">Kiến thức đầu tư</h2>
          </div>

          <div className="space-y-6">
            {knowledge.map((item, i) => (
              <div key={i} className="group flex flex-col md:flex-row items-center justify-between p-8 border border-gray-100 hover:border-orange-500 transition-all bg-white shadow-sm">
                <div className="flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
                  <div className={`w-20 h-20 rounded-full flex items-center justify-center text-[10px] font-black uppercase tracking-tighter ${item.level === 'Cơ bản' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                    {item.level}
                  </div>
                  <div className="max-w-lg">
                    <h3 className="text-lg font-black text-[#001a41] uppercase mb-2 group-hover:text-orange-500 transition-colors">{item.title}</h3>
                    <p className="text-sm text-gray-400 font-light">{item.description}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-4 mt-6 md:mt-0">
                  <span className="text-[10px] font-bold text-gray-300 uppercase">{item.date} • {item.duration}</span>
                  <Link href="#" className="flex items-center gap-2 text-[11px] font-black uppercase text-[#001a41] hover:text-orange-500 transition-colors tracking-widest">
                    Xem bài học <ChevronRight size={14} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </section>

      </main>
    </div>
  );
}