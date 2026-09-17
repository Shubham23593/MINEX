'use client';

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import { useMine } from '@/context/MineContext';
import { searchMine, MineSearchResult } from '@/lib/services/mineSearchService';
import { Search, MapPin, Bell, User, Sparkles } from 'lucide-react';

const PAGE_TITLES: Record<string, string> = {
  '/': 'Command Center Dashboard',
  '/exploration': 'Manganese Prospectivity Analysis',
  '/production': 'Production Shortfall Prediction',
  '/insights': 'AI Recommendations & Intelligence',
  '/settings': 'System Integration Architecture',
};

export default function Header() {
  const pathname = usePathname();
  const { selectedMine, setSelectedMine } = useMine();
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<MineSearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const title = PAGE_TITLES[pathname] || 'MINEX Intelligence Platform';

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    if (value.trim().length > 0) {
      const results = searchMine(value);
      setSearchResults(results);
      setIsSearching(true);
    } else {
      setSearchResults([]);
      setIsSearching(false);
    }
  };

  const handleSelectMineResult = (result: MineSearchResult) => {
    setSelectedMine(result.mine);
    setSearchQuery('');
    setIsSearching(false);
  };

  return (
    <header className="h-16 bg-white/90 backdrop-blur-md border-b border-slate-200 px-6 flex items-center justify-between sticky top-0 z-30 text-slate-800 shadow-xs">
      {/* Page Title */}
      <div className="flex items-center gap-3">
        <div className="h-2.5 w-2.5 rounded-full bg-emerald-600" />
        <h1 className="text-base font-extrabold text-slate-900 tracking-tight hidden md:block">
          {title}
        </h1>
      </div>

      {/* Center: Smart NLP Mine Search Bar */}
      <div className="relative flex-1 max-w-md mx-4">
        <div className="relative flex items-center">
          <Search className="h-4 w-4 text-slate-400 absolute left-3 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            onFocus={() => {
              if (searchQuery.trim().length > 0) setIsSearching(true);
            }}
            onBlur={() => setTimeout(() => setIsSearching(false), 200)}
            placeholder="Type Mine Name or Area (e.g. balagat, chikla, tirodi)..."
            className="w-full bg-slate-100 border border-slate-300 hover:border-slate-400 focus:border-emerald-600 rounded-xl pl-9 pr-4 py-1.5 text-xs text-slate-900 placeholder-slate-400 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all shadow-inner"
          />
          {searchQuery && (
            <span className="absolute right-3 text-[10px] uppercase font-bold text-emerald-700 bg-emerald-100 px-1.5 py-0.5 rounded">
              NLP Match
            </span>
          )}
        </div>

        {/* NLP Fuzzy Search Suggestion Dropdown */}
        {isSearching && searchResults.length > 0 && (
          <div className="absolute top-11 left-0 right-0 bg-white border border-slate-200 rounded-xl shadow-xl overflow-hidden z-50 text-xs divide-y divide-slate-100 animate-fadeIn">
            <div className="p-2 bg-slate-50 text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center justify-between">
              <span>Smart Fuzzy NLP Matches</span>
              <Sparkles className="h-3 w-3 text-emerald-600" />
            </div>

            {searchResults.map((res) => (
              <button
                key={res.mine.id}
                type="button"
                onClick={() => handleSelectMineResult(res)}
                className="w-full p-2.5 text-left hover:bg-emerald-50 flex items-center justify-between transition-colors cursor-pointer"
              >
                <div>
                  <div className="font-bold text-slate-900 flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5 text-emerald-600" />
                    {res.mine.name}
                  </div>
                  <div className="text-[11px] text-slate-500 ml-5">
                    {res.mine.district}, {res.mine.state} • Area: {res.mine.area} km²
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-extrabold font-mono text-emerald-700 text-xs">
                    {Math.round(res.confidenceScore * 100)}% Match
                  </span>
                  <span className="text-[9px] block text-slate-400 font-medium">
                    {res.matchReason}
                  </span>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-3">
        {/* Selected Mine Pill */}
        <div className="hidden sm:flex items-center gap-1.5 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-xl text-xs font-bold text-emerald-800">
          <MapPin className="h-3.5 w-3.5 text-emerald-600" />
          <span>{selectedMine.name}</span>
        </div>

        {/* Notifications Icon */}
        <button
          type="button"
          aria-label="Notifications"
          className="relative p-2 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-700 transition-colors"
        >
          <Bell className="h-4 w-4" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-emerald-600" />
        </button>

        {/* User Profile Area */}
        <div className="flex items-center gap-3 border-l border-slate-200 pl-3">
          <div className="text-right hidden xl:block">
            <p className="text-xs font-bold text-slate-900">MOIL Exploration Team</p>
            <p className="text-[10px] text-emerald-700 font-semibold">Chief Mining Geologist</p>
          </div>
          <div className="h-8 w-8 rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-800 font-extrabold text-xs shadow-xs">
            <User className="h-4 w-4 text-emerald-700" />
          </div>
        </div>
      </div>
    </header>
  );
}
