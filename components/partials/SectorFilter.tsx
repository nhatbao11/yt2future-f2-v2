"use client";

import { useState } from 'react';

export default function SectorFilter({ categories }: { categories: string[] }) {
  const [active, setActive] = useState('All Sectors');

  return (
    <div className="flex flex-wrap gap-3 mb-16 justify-center">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => setActive(cat)}
          className={`px-8 py-2.5 rounded-full text-[10px] font-black uppercase tracking-[0.2em] transition-all duration-300 border ${active === cat
            ? 'bg-[#001a41] text-white border-[#001a41] shadow-lg shadow-blue-900/20'
            : 'bg-white text-[#001a41] border-gray-200 hover:border-orange-500 hover:text-orange-500'
            }`}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}