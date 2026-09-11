'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import { useMine } from '@/context/MineContext';
import { MapPin, Bell, User, ChevronDown } from 'lucide-react';

const PAGE_TITLES: Record<string, string> = {
  '/': 'Command Center Dashboard',
  '/exploration': 'Manganese Prospectivity Analysis',
  '/production': 'Production Shortfall Prediction',
  '/insights': 'AI Recommendations & Intelligence',
  '/settings': 'System Settings & Integration API',
};

export default function Header() {
  const pathname = usePathname();
  const { mines, selectedMine, setSelectedMine } = useMine();

  const title = PAGE_TITLES[pathname] || 'MINEX Intelligence Platform';

  return (
    <header className="h-16 bg-[#0a0f1d]/90 backdrop-blur-md border-b border-slate-800/80 px-6 flex items-center justify-between sticky top-0 z-30 text-slate-200">
      {/* Title */}
      <div className="flex items-center gap-3">
        <div className="h-2 w-2 rounded-full bg-emerald-400" />
        <h1 className="text-lg font-bold text-slate-100 tracking-wide">{title}</h1>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-4">
        {/* Mine Selector Dropdown */}
        <div className="relative flex items-center">
          <div className="flex items-center gap-2 bg-slate-900/80 hover:bg-slate-800/80 border border-slate-700/80 px-3 py-1.5 rounded-lg text-sm text-slate-200 transition-colors shadow-inner">
            <MapPin className="h-4 w-4 text-emerald-400 shrink-0" />
            <select
              value={selectedMine.id}
              onChange={(e) => {
                const found = mines.find((m) => m.id === e.target.value);
                if (found) setSelectedMine(found);
              }}
              className="bg-transparent text-slate-100 font-semibold focus:outline-none cursor-pointer pr-1"
            >
              {mines.map((mine) => (
                <option key={mine.id} value={mine.id} className="bg-slate-900 text-slate-100">
                  {mine.name} ({mine.district})
                </option>
              ))}
            </select>
            <ChevronDown className="h-3.5 w-3.5 text-slate-400 pointer-events-none" />
          </div>
        </div>

        {/* Notifications Icon */}
        <button
          type="button"
          aria-label="Notifications"
          className="relative p-2 rounded-lg bg-slate-900/80 hover:bg-slate-800 border border-slate-800 text-slate-300 transition-colors"
        >
          <Bell className="h-4 w-4 text-slate-300" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
        </button>

        {/* User Profile Area */}
        <div className="flex items-center gap-3 border-l border-slate-800/80 pl-4">
          <div className="text-right hidden sm:block">
            <p className="text-xs font-semibold text-slate-200">MOIL Exploration Team</p>
            <p className="text-[10px] text-emerald-400 font-medium">Chief Geologist</p>
          </div>
          <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-slate-800 to-emerald-950 border border-emerald-500/40 flex items-center justify-center text-emerald-300 font-bold text-xs shadow-md">
            <User className="h-4 w-4 text-emerald-400" />
          </div>
        </div>
      </div>
    </header>
  );
}
