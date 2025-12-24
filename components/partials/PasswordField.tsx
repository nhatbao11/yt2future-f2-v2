"use client";

import { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

interface PasswordFieldProps {
  name: string;
  label: string;
  placeholder?: string;
}

export default function PasswordField({ name, label, placeholder }: PasswordFieldProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="group text-left relative">
      <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest ml-1">
        {label}
      </label>
      <div className="relative">
        <input
          name={name}
          type={showPassword ? "text" : "password"}
          required
          placeholder={placeholder || "••••••••"}
          className="w-full bg-slate-50 border border-slate-200 p-3.5 mt-1 text-sm text-slate-900 font-bold rounded-md outline-none focus:border-orange-500 focus:bg-white transition-all"
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2 mt-0.5 text-slate-400 hover:text-orange-600 transition-colors p-1"
        >
          {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </div>
    </div>
  );
}