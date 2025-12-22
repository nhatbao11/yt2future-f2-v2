import PageHeader from '@/components/layout/PageHeader';
import { TrendingUp, TrendingDown, Activity, Globe } from 'lucide-react';

export default function SectorPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc]">
      <PageHeader title="Dashboard" />

      <main className="grow py-10 max-w-360 mx-auto px-6 md:px-12 w-full">

        {/* ROW 1: QUICK STATS (Chỉ số chính) */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            { label: "VN-INDEX", value: "1,250.32", change: "+0.45%", up: true },
            { label: "VN30", value: "1,262.15", change: "-0.12%", up: false },
            { label: "BTC / USDT", value: "64,231", change: "+2.15%", up: true },
            { label: "DXY (Dollar Index)", value: "104.2", change: "+0.05%", up: true },
          ].map((stat, i) => (
            <div key={i} className="bg-white p-6 border border-gray-100 shadow-sm rounded-sm">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">{stat.label}</p>
              <div className="flex justify-between items-end">
                <h4 className="text-2xl font-black text-[#001a41] tracking-tighter">{stat.value}</h4>
                <span className={`text-xs font-bold ${stat.up ? 'text-green-500' : 'text-red-500'}`}>
                  {stat.up ? '▲' : '▼'} {stat.change}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* ROW 2: MAIN DATA BOARDS */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Top Tăng/Giảm (2 cột) */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white border border-gray-100 p-8 shadow-sm">
              <div className="flex justify-between items-center mb-8">
                <h3 className="text-lg font-black text-[#001a41] uppercase tracking-tighter flex items-center gap-2">
                  <Activity size={20} className="text-orange-500" /> Biến động dòng tiền
                </h3>
                <span className="text-[10px] text-gray-400 italic">Cập nhật: 5 phút trước</span>
              </div>

              {/* Giả lập bảng dữ liệu */}
              <div className="space-y-4">
                <div className="grid grid-cols-4 text-[10px] font-bold text-gray-400 uppercase border-b pb-2">
                  <span>Mã</span>
                  <span className="text-right">Giá</span>
                  <span className="text-right">+/-</span>
                  <span className="text-right">Khối lượng</span>
                </div>
                {/* Item mẫu */}
                {[1, 2, 3, 4, 5].map(item => (
                  <div key={item} className="grid grid-cols-4 text-sm font-medium py-2 border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors">
                    <span className="font-bold text-[#001a41]">FPT</span>
                    <span className="text-right">135.2</span>
                    <span className="text-right text-green-500">+2.4%</span>
                    <span className="text-right text-gray-500">2.4M</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar: Market Sentiment & Calendar */}
          <div className="space-y-8">
            {/* Tâm lý thị trường */}
            <div className="bg-[#001a41] text-white p-8 rounded-sm relative overflow-hidden">
              <Globe className="absolute -right-4 -top-4 size-24 text-white/5" />
              <h3 className="text-sm font-bold uppercase tracking-widest mb-6 text-orange-500">Market Sentiment</h3>
              <div className="text-center">
                <div className="text-5xl font-black mb-2">64</div>
                <p className="text-xs uppercase tracking-widest font-bold text-green-400">Greed (Tham lam)</p>
              </div>
              <div className="mt-8 h-2 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-linear-to-r from-red-500 via-yellow-500 to-green-500 w-[64%]"></div>
              </div>
            </div>

            {/* Mua bán ròng */}
            <div className="bg-white border border-gray-100 p-8 shadow-sm">
              <h3 className="text-sm font-bold uppercase tracking-widest mb-6 text-[#001a41] border-l-4 border-orange-500 pl-4">Khối ngoại ròng</h3>
              <div className="space-y-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Mua ròng:</span>
                  <span className="font-bold text-green-500">+125B</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Bán ròng:</span>
                  <span className="font-bold text-red-500">-42B</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}