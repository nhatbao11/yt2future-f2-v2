"use client";
import { useState } from 'react';

export default function BusinessFilter({ sectors }: { sectors: string[] }) {
  const [active, setActive] = useState('All Business');

  return (
    <div className="flex flex-wrap gap-3 mb-16 justify-center">
      {sectors.map((sector) => (
        <button
          key={sector}
          onClick={() => setActive(sector)}
          className={`px-8 py-2.5 rounded-sm text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300 border ${active === sector
              ? 'bg-orange-500 text-white border-orange-500 shadow-lg'
              : 'bg-white text-[#001a41] border-gray-200 hover:border-orange-500'
            }`}
        >
          {sector}
        </button>
      ))}
    </div>
  );
}