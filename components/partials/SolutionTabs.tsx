"use client";
import { useState } from 'react';

export default function SolutionTabs({ onTabChange }: { onTabChange: (tab: string) => void }) {
  const [active, setActive] = useState('books');

  const handleTab = (tab: string) => {
    setActive(tab);
    onTabChange(tab);
  };

  return (
    <div className="flex justify-center gap-8 mb-16 border-b border-gray-100">
      {[
        { id: 'books', label: 'Hành trình sách' },
        { id: 'knowledge', label: 'Kiến thức đầu tư' },
      ].map((tab) => (
        <button
          key={tab.id}
          onClick={() => handleTab(tab.id)}
          className={`pb-4 text-[11px] font-black uppercase tracking-[0.2em] transition-all relative ${active === tab.id ? 'text-yellow-500' : 'text-gray-400 hover:text-[#001a41]'
            }`}
        >
          {tab.label}
          {active === tab.id && (
            <div className="absolute bottom-0 left-0 w-full h-0.5 bg-yellow-500 animate-in fade-in slide-in-from-bottom-1" />
          )}
        </button>
      ))}
    </div>
  );
}