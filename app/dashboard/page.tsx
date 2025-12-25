"use client";
import React from "react";

/* ---------- components ---------- */

const IndicatorBox = ({ title, value, change, pct, refPrice, high, open, low, liq }: any) => (
  <div className="flex border border-gray-300 h-[160px] shadow-sm">
    {/* Cột trái: Nền vàng nhạt chứa chỉ số */}
    <div className="w-[65%] bg-[#fffbeb] p-3 border-r border-gray-200 flex flex-col justify-between">
      <div className="flex justify-between items-start">
        <span className="font-bold text-[13px] text-gray-800 uppercase">{title}</span>
        <div className="flex flex-col items-end leading-none">
          <span className="text-[10px] text-gray-500 font-bold mb-1">Change</span>
          <span className="text-[12px] font-black text-red-600">{change}</span>
          <span className="text-[11px] font-black text-red-600 mt-0.5">{pct}%</span>
        </div>
      </div>

      <div className="text-4xl font-black text-red-600 tracking-tighter my-1">{value}</div>

      {/* Bảng giá phụ chuẩn mẫu: 2 hàng 2 cột */}
      <div className="grid grid-cols-2 gap-x-4 gap-y-2 pt-2 border-t border-gray-200/50">
        <div className="flex justify-between items-center">
          <span className="text-[10px] text-gray-400 font-bold">Ref</span>
          <span className="text-[11px] font-black text-black">{refPrice}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-[10px] text-gray-400 font-bold">High</span>
          <span className="text-[11px] font-black text-black">{high}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-[10px] text-gray-400 font-bold">Open</span>
          <span className="text-[11px] font-black text-black">{open}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-[10px] text-gray-400 font-bold">Low</span>
          <span className="text-[11px] font-black text-black">{low}</span>
        </div>
      </div>
    </div>

    {/* Cột phải: Thanh khoản */}
    <div className="w-[35%] bg-white p-3 flex flex-col items-center justify-between">
      <span className="font-bold text-[12px] text-gray-800">Thanh khoản</span>
      <span className="text-[11px] font-black text-gray-400">{liq}</span>
      <div className="w-7 h-20 bg-gray-100 relative border border-gray-200">
        <div className="absolute bottom-0 w-full bg-[#1a365d]" style={{ height: '70%' }}></div>
        <div className="absolute top-[40%] left-1/2 -translate-x-1/2 w-2 h-2 bg-yellow-400 rounded-full border border-white z-10 shadow-sm"></div>
      </div>
      <span className="text-[10px] font-bold text-green-700">Nov 07</span>
    </div>
  </div>
);

const RankingBar = ({ label, value, color }: { label: string; value: number; color: string }) => (
  <div className="flex items-center gap-2 py-0.5 group">
    <span className="w-10 text-[11px] font-black text-gray-700 uppercase">{label}</span>
    <div className="flex-1 h-4 bg-gray-50 relative">
      <div
        className="h-full flex items-center justify-end pr-1 text-white text-[10px] font-black transition-all duration-500"
        style={{ width: `${Math.min(100, (Math.abs(value) / 300) * 100)}%`, backgroundColor: color }}
      >
        {Math.abs(value)}
      </div>
    </div>
  </div>
);

export default function DashboardPage() {
  return (
    <div className="bg-[#f0f2f5] min-h-screen p-4 md:p-8 antialiased font-sans">
      <div className="max-w-[1300px] mx-auto bg-white shadow-2xl border border-gray-300 p-6">

        {/* Header chuẩn y hệt hình */}
        <div className="flex justify-between items-end border-b-4 border-[#001a41] pb-3 mb-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-[#001a41] flex items-center justify-center">
              <span className="text-white font-black italic text-xl">YT</span>
            </div>
            <h1 className="text-2xl md:text-3xl font-black text-[#001a41] uppercase tracking-tighter">Báo cáo kết phiên giao dịch ngày 07/11/2025</h1>
          </div>
          <div className="flex gap-4 items-center">
            <div className="text-right">
              <p className="text-[10px] font-black text-gray-400 uppercase">Ngày</p>
              <div className="border border-gray-300 px-3 py-1 text-[11px] font-bold bg-gray-50">11/7/2025</div>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-black text-gray-400 uppercase opacity-0">.</p>
              <div className="border border-gray-300 px-3 py-1 text-[11px] font-bold bg-gray-50">📅 11/7/2025</div>
            </div>
          </div>
        </div>

        {/* Layout Grid chính */}
        <div className="grid grid-cols-12 gap-4">

          {/* Hàng 1: 3 Chỉ số */}
          <div className="col-span-12 md:col-span-4"><IndicatorBox title="VNIndex" value="1,599" change="-43.54" pct="-2.65" refPrice="1,643" high="1,643" open="1,636" low="1,595" liq="847M" /></div>
          <div className="col-span-12 md:col-span-4"><IndicatorBox title="VN30" value="1,825" change="-44.89" pct="-2.40" refPrice="1,870" high="1,870" open="1,862" low="1,818" liq="409M" /></div>
          <div className="col-span-12 md:col-span-4"><IndicatorBox title="VN30F1M" value="1,828" change="-38.70" pct="-2.07" refPrice="1,867" high="1,865" open="1,862" low="1,819" liq="285K" /></div>

          {/* Hàng 2: Đồ thị & Top mua */}
          <div className="col-span-12 md:col-span-2 border border-gray-200 p-4 flex flex-col items-center justify-center">
            <h3 className="text-[11px] font-black uppercase mb-4 text-gray-500">ROM Ngoại</h3>
            <div className="relative w-28 h-28">
              <svg viewBox="0 0 36 36" className="w-full h-full transform -rotate-90">
                <circle cx="18" cy="18" r="15.9" fill="none" stroke="#00c805" strokeWidth="5" strokeDasharray="36.6 100" />
                <circle cx="18" cy="18" r="15.9" fill="none" stroke="#001a41" strokeWidth="5" strokeDasharray="63.4 100" strokeDashoffset="-36.6" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center leading-none">
                <span className="text-[9px] font-bold text-gray-400">Còn lại</span>
                <span className="text-sm font-black text-[#001a41]">63.4%</span>
              </div>
              <div className="absolute -left-4 top-1/2 -translate-y-1/2 text-[10px] font-bold text-gray-500">HT<br />36.6%</div>
            </div>
          </div>

          <div className="col-span-12 md:col-span-2 border border-gray-200 p-4 flex flex-col items-center">
            <h3 className="text-[11px] font-black uppercase mb-4 text-gray-500">NN Mua-Bán ròng</h3>
            <div className="flex-1 w-10 bg-red-600 flex items-center justify-center text-white text-[11px] font-black shadow-inner">-1,358bn</div>
            <span className="text-[10px] font-black text-green-700 mt-2">Nov 07</span>
          </div>

          <div className="col-span-12 md:col-span-4 border border-gray-200 p-4">
            <h3 className="text-[11px] font-black uppercase mb-4 border-l-4 border-green-500 pl-2">Top Khối ngoại mua ròng (Tỷ VNĐ)</h3>
            <div className="space-y-1.5">
              <RankingBar label="HPG" value={299} color="#00c805" />
              <RankingBar label="FPT" value={119} color="#00c805" />
              <RankingBar label="PVS" value={103} color="#00c805" />
              <RankingBar label="PVD" value={82} color="#00c805" />
              <RankingBar label="TCX" value={47} color="#00c805" />
            </div>
          </div>

          <div className="col-span-12 md:col-span-4 border border-gray-200 p-4">
            <h3 className="text-[11px] font-black uppercase mb-4 border-l-4 border-green-500 pl-2">Top cổ phiếu tăng giá (%)</h3>
            <div className="space-y-1.5">
              <RankingBar label="ACM" value={20.0} color="#00c805" />
              <RankingBar label="LCS" value={16.7} color="#00c805" />
              <RankingBar label="POM" value={15.0} color="#00c805" />
              <RankingBar label="TS3" value={14.8} color="#00c805" />
              <RankingBar label="RIC" value={13.9} color="#00c805" />
            </div>
          </div>

          {/* Hàng 3: Giao dịch & Top bán */}
          <div className="col-span-12 md:col-span-4 border border-gray-200 p-4 flex flex-col justify-between">
            <h3 className="text-[11px] font-black uppercase mb-4">Giao dịch khối ngoại</h3>
            <div className="relative h-12 flex items-center px-2">
              <div className="w-[60%] bg-red-600 h-8 flex items-center justify-center text-white text-[10px] font-black shadow-lg">-3,897bn</div>
              <div className="w-[40%] bg-[#00c805] h-8 flex items-center justify-center text-white text-[10px] font-black shadow-lg">+2,539bn</div>
            </div>
            <div className="flex justify-between text-[9px] font-black text-gray-400 mt-2 px-2 border-t border-dashed pt-1">
              <span>-4T</span><span>-2T</span><span>0T</span><span>2T</span>
            </div>
          </div>

          <div className="col-span-12 md:col-span-4 border border-gray-200 p-4">
            <h3 className="text-[11px] font-black uppercase mb-4 border-l-4 border-red-600 pl-2 text-red-600">Top Khối ngoại bán ròng (Tỷ VNĐ)</h3>
            <div className="space-y-1.5">
              <RankingBar label="SSI" value={105} color="#ef4444" />
              <RankingBar label="MCH" value={108} color="#ef4444" />
              <RankingBar label="MBB" value={112} color="#ef4444" />
              <RankingBar label="HDB" value={166} color="#ef4444" />
              <RankingBar label="STB" value={296} color="#ef4444" />
            </div>
          </div>

          <div className="col-span-12 md:col-span-4 border border-gray-200 p-4">
            <h3 className="text-[11px] font-black uppercase mb-4 border-l-4 border-red-600 pl-2 text-red-600">Top cổ phiếu giảm giá</h3>
            <div className="space-y-1.5">
              <RankingBar label="VNH" value={10.0} color="#ef4444" />
              <RankingBar label="DFF" value={14.3} color="#ef4444" />
              <RankingBar label="QBS" value={14.3} color="#ef4444" />
              <RankingBar label="AGM" value={14.7} color="#ef4444" />
              <RankingBar label="ATA" value={16.7} color="#ef4444" />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}