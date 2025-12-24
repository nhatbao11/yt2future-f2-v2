"use client";
import React, { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from 'next/link';

/* ---------- types ---------- */
type IndicatorData = {
  id: string;
  title: string;
  value: string;
  change: string;
  changePercent: string;
  mini: { ref?: string; high?: string; open?: string; low?: string };
  liquidityLabel: string;
  liquidityNumber: number;
};

/* ---------- components ---------- */

// 1. PageHeader Breadcrumb chuẩn của sếp
const PageHeader = ({ title }: { title: string }) => (
  <div className="w-full bg-[#001a41] py-3 md:py-4">
    <div className="max-w-360 mx-auto px-6 md:px-12">
      <nav className="flex items-center gap-2 text-white/50 text-[10px] md:text-[11px] font-bold uppercase tracking-[0.15em]">
        <Link href="/" className="hover:text-orange-500 transition-colors duration-200">Home</Link>
        <span className="text-white/20 select-none font-light">/</span>
        <span className="text-orange-500">{title}</span>
      </nav>
    </div>
  </div>
);

// 2. IndicatorCard với thiết kế Pill và Thanh khoản Nov 07
const IndicatorCard = ({ data, maxLiquidity }: { data: IndicatorData; maxLiquidity: number }) => {
  const isPositive = data.change.trim().startsWith("+");
  const liqPct = maxLiquidity > 0 ? Math.max(10, Math.round((data.liquidityNumber / maxLiquidity) * 100)) : 10;

  return (
    <div className="bg-white border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full group">
      <div className="bg-slate-50/80 p-3 border-b border-slate-100 flex justify-between items-center group-hover:bg-blue-50/30 transition-colors">
        <span className="font-extrabold text-[#1a365d] text-[13px] uppercase tracking-wider">{data.title}</span>
        <div className="text-right flex flex-col leading-tight">
          <span className={`text-sm font-black ${isPositive ? 'text-emerald-600' : 'text-rose-600'}`}>{data.change}</span>
          <span className={`text-[10px] font-bold ${isPositive ? 'text-emerald-500' : 'text-rose-500'}`}>{data.changePercent}</span>
        </div>
      </div>
      <div className="p-4 flex flex-row items-end justify-between gap-4 flex-1">
        <div className="space-y-4 flex-1">
          <div className={`text-5xl font-black tracking-tighter leading-none transition-transform group-hover:scale-105 ${isPositive ? 'text-emerald-600' : 'text-rose-600'}`}>{data.value}</div>
          <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 border-t border-slate-100 pt-3">
            {Object.entries(data.mini).map(([label, val]) => (
              <div key={label} className="flex justify-between items-center group/item">
                <span className="text-[10px] text-slate-400 font-bold uppercase group-hover/item:text-blue-500">{label}</span>
                <span className="text-[11px] font-black text-slate-700">{val}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col items-center gap-1.5 min-w-18.75 bg-slate-50/50 p-2.5 rounded-lg border border-slate-100 group-hover:bg-white transition-colors">
          <span className="text-[10px] font-black text-slate-400 uppercase">Thanh khoản</span>
          <span className="text-sm font-black text-slate-700">{data.liquidityLabel}</span>
          <div className="w-9 h-24 bg-slate-200 rounded-sm flex items-end relative overflow-hidden border border-slate-200/50">
            <div className="w-full bg-[#1a365d] transition-all duration-1000 ease-out group-hover:brightness-125" style={{ height: `${liqPct}%` }} />
          </div>
          <span className="text-[10px] font-black text-emerald-600 mt-1">Nov 07</span>
        </div>
      </div>
    </div>
  );
};

const HBarItem = ({ label, value, color = "#10b981" }: { label: string; value: number; color?: string }) => {
  const absVal = Math.abs(value);
  const pct = Math.min(100, (absVal / 300) * 100);
  return (
    <div className="flex items-center gap-3 py-1.5 group/bar">
      <span className="w-10 font-black text-slate-600 text-[11px] uppercase group-hover/bar:text-blue-600 transition-colors shrink-0">{label}</span>
      <div className="flex-1 h-3.5 bg-slate-100 relative rounded-sm overflow-hidden border border-slate-100">
        <div className="h-full transition-all duration-1000 ease-out group-hover/bar:brightness-110" style={{ width: `${pct}%`, backgroundColor: color }} />
      </div>
      <span className="w-12 text-right font-black text-slate-800 text-[11px] shrink-0">{value}</span>
    </div>
  );
};

/* ---------- main page ---------- */
export default function DashboardPage() {
  const [indicators, setIndicators] = useState<IndicatorData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIndicators([
        { id: "VNINDEX", title: "VNIndex", value: "1,599", change: "-43.54", changePercent: "-2.65%", mini: { ref: "1,643", high: "1,643", open: "1,636", low: "1,595" }, liquidityLabel: "847M", liquidityNumber: 847000000 },
        { id: "VN30", title: "VN30", value: "1,825", change: "-44.89", changePercent: "-2.40%", mini: { ref: "1,870", high: "1,870", open: "1,862", low: "1,818" }, liquidityLabel: "409M", liquidityNumber: 409000000 },
        { id: "VN30F1M", title: "VN30F1M", value: "1,828", change: "-38.70", changePercent: "-2.07%", mini: { ref: "1,867", high: "1,865", open: "1,862", low: "1,819" }, liquidityLabel: "285K", liquidityNumber: 285000 },
      ]);
      setLoading(false);
    }, 400);
    return () => clearTimeout(timer);
  }, []);

  const maxLiquidity = useMemo(() => Math.max(...indicators.map(i => i.liquidityNumber), 1), [indicators]);

  return (
    <div className="min-h-screen bg-[#f8fafc] pb-20 antialiased font-sans">
      <PageHeader title="Dashboard" />

      <div className="max-w-360 mx-auto px-6 md:px-12 mt-10 space-y-8">

        {/* Tiêu đề báo cáo cực lớn ngay dưới PageHeader */}
        <div className="border-l-8 border-orange-500 pl-6 flex flex-col md:flex-row justify-between items-end gap-4">
          <div>
            <h1 className="text-3xl md:text-5xl font-black text-[#1a365d] uppercase tracking-tighter leading-none">Báo cáo kết phiên giao dịch</h1>
            <p className="text-slate-400 font-bold uppercase text-xs mt-3 tracking-widest">Dữ liệu thị trường ngày <span className="text-rose-600">07/11/2025</span></p>
          </div>
          <div className="bg-slate-100 px-4 py-2 rounded-lg text-[10px] font-black text-slate-400 uppercase tracking-widest">EOD Report Sync</div>
        </div>

        {/* 12-COL GRID CHUẨN */}
        <main className="grid grid-cols-12 gap-6">
          {/* Row 1: Indicators */}
          {indicators.map(ind => (
            <div key={ind.id} className="col-span-12 lg:col-span-4 h-full"><IndicatorCard data={ind} maxLiquidity={maxLiquidity} /></div>
          ))}

          {/* Row 2: Charts & Top Gainers */}
          <div className="col-span-12 lg:col-span-4 grid grid-cols-2 gap-6">
            <div className="bg-white border border-slate-200 p-5 flex flex-col items-center justify-between hover:shadow-lg transition-all">
              <h3 className="w-full font-black text-slate-400 text-[10px] uppercase mb-4 text-center border-b pb-2">ROM Ngoại</h3>
              <div className="relative w-28 h-28 flex items-center justify-center">
                <svg viewBox="0 0 100 100" className="w-full h-full transform -rotate-90">
                  <circle cx="50" cy="50" r="42" stroke="#f1f5f9" strokeWidth="10" fill="transparent" />
                  <circle cx="50" cy="50" r="42" stroke="#1a365d" strokeWidth="10" fill="transparent" strokeDasharray="263.8" strokeDashoffset="168" strokeLinecap="round" />
                  <circle cx="50" cy="50" r="42" stroke="#10b981" strokeWidth="10" fill="transparent" strokeDasharray="263.8" strokeDashoffset="240" strokeLinecap="round" />
                </svg>
                <span className="absolute font-black text-lg text-[#1a365d]">36%</span>
              </div>
            </div>
            <div className="bg-white border border-slate-200 p-5 flex flex-col hover:shadow-lg transition-all">
              <h3 className="font-black text-slate-400 text-[10px] uppercase mb-4 text-center border-b pb-2">NN Mua-Bán ròng</h3>
              <div className="flex-1 bg-rose-600 text-white flex flex-col items-center justify-center p-3 rounded-sm relative group overflow-hidden shadow-md">
                <div className="absolute inset-0 bg-black/10 -translate-x-full group-hover:translate-x-0 transition-transform" />
                <span className="text-xl font-black relative z-10">-1,358bn</span>
                <span className="text-[9px] font-bold opacity-70 mt-2 relative z-10">Nov 07</span>
              </div>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-4 bg-white border border-slate-200 p-5 hover:shadow-lg transition-all">
            <h3 className="font-black text-emerald-600 text-[10px] uppercase mb-5 tracking-widest border-l-4 border-emerald-500 pl-3">Top Ngoại mua ròng</h3>
            <div className="space-y-2"><HBarItem label="HPG" value={299} color="#10b981" /><HBarItem label="FPT" value={119} color="#10b981" /><HBarItem label="PVS" value={103} color="#10b981" /><HBarItem label="PVD" value={82} color="#10b981" /><HBarItem label="TCX" value={47} color="#10b981" /></div>
          </div>

          <div className="col-span-12 lg:col-span-4 bg-white border border-slate-200 p-5 hover:shadow-lg transition-all">
            <h3 className="font-black text-[#1a365d] text-[10px] uppercase mb-5 tracking-widest border-l-4 border-blue-600 pl-3">Top tăng giá (%)</h3>
            <div className="space-y-2"><HBarItem label="ACM" value={20.0} color="#3b82f6" /><HBarItem label="LCS" value={16.7} color="#3b82f6" /><HBarItem label="POM" value={15.0} color="#3b82f6" /><HBarItem label="TS3" value={14.8} color="#3b82f6" /><HBarItem label="RIC" value={13.9} color="#3b82f6" /></div>
          </div>

          {/* Row 3: Trade bar & Negatives */}
          <div className="col-span-12 lg:col-span-4 bg-white border border-slate-200 p-5 hover:shadow-lg transition-all flex flex-col justify-between">
            <h3 className="font-black text-[#1a365d] text-[10px] uppercase mb-6 tracking-widest">Giao dịch khối ngoại</h3>
            <div className="flex items-center h-14 relative bg-slate-50 px-8 rounded-sm overflow-hidden border border-slate-100">
              <div className="absolute left-1/2 -translate-x-full w-[45%] bg-rose-600 h-10 flex items-center justify-center text-[10px] font-black text-white shadow-lg shadow-rose-200">-3,897bn</div>
              <div className="absolute left-1/2 w-[35%] bg-emerald-500 h-10 flex items-center justify-center text-[10px] font-black text-white shadow-lg shadow-emerald-200 ml-px">+2,539bn</div>
              <div className="absolute left-1/2 h-full w-px bg-white/20 z-10" />
            </div>
          </div>

          <div className="col-span-12 lg:col-span-4 bg-white border border-slate-200 p-5 hover:shadow-lg transition-all border-t-4 border-t-rose-600">
            <h3 className="font-black text-rose-600 text-[10px] uppercase mb-5 tracking-widest">Top Ngoại bán ròng</h3>
            <div className="space-y-2"><HBarItem label="STB" value={-296} color="#e11d48" /><HBarItem label="HDB" value={-166} color="#e11d48" /><HBarItem label="MBB" value={-112} color="#e11d48" /><HBarItem label="MCH" value={-108} color="#e11d48" /><HBarItem label="SSI" value={-105} color="#e11d48" /></div>
          </div>

          <div className="col-span-12 lg:col-span-4 bg-white border border-slate-200 p-5 hover:shadow-lg transition-all border-t-4 border-t-rose-600">
            <h3 className="font-black text-rose-600 text-[10px] uppercase mb-5 tracking-widest">Top giảm giá (%)</h3>
            <div className="space-y-2"><HBarItem label="ATA" value={-16.7} color="#e11d48" /><HBarItem label="AGM" value={-14.7} color="#e11d48" /><HBarItem label="QBS" value={-14.3} color="#e11d48" /><HBarItem label="DFF" value={-14.3} color="#e11d48" /><HBarItem label="VNH" value={-10.0} color="#e11d48" /></div>
          </div>
        </main>
      </div>
    </div>
  );
}