'use client';

import React, { useState } from 'react';
import { ProspectivityZone } from '@/lib/types';
import { Eye, ArrowUpDown } from 'lucide-react';

interface ExplorationTableProps {
  zones: ProspectivityZone[];
  onInspectZone: (zone: ProspectivityZone) => void;
}

export default function ExplorationTable({ zones, onInspectZone }: ExplorationTableProps) {
  const [sortField, setSortField] = useState<'score' | 'confidence' | 'priority'>('score');
  const [sortAsc, setSortAsc] = useState(false);

  const sortedZones = [...zones].sort((a, b) => {
    let result = 0;
    if (sortField === 'score') {
      result = a.score - b.score;
    } else if (sortField === 'confidence') {
      result = a.confidence - b.confidence;
    } else if (sortField === 'priority') {
      const pMap: Record<string, number> = { URGENT: 4, HIGH: 3, MEDIUM: 2, LOW: 1 };
      result = (pMap[a.priority] || 0) - (pMap[b.priority] || 0);
    }
    return sortAsc ? result : -result;
  });

  const toggleSort = (field: 'score' | 'confidence' | 'priority') => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(false);
    }
  };

  const potentialBadge: Record<string, string> = {
    LOW: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    MODERATE: 'bg-yellow-500/10 text-yellow-400 border-yellow-500/30',
    HIGH: 'bg-orange-500/10 text-orange-400 border-orange-500/30',
    VERY_HIGH: 'bg-red-500/10 text-red-400 border-red-500/30',
  };

  const priorityBadge: Record<string, string> = {
    URGENT: 'bg-red-950/60 text-red-300 border-red-500/40',
    HIGH: 'bg-orange-950/60 text-orange-300 border-orange-500/40',
    MEDIUM: 'bg-yellow-950/60 text-yellow-300 border-yellow-500/40',
    LOW: 'bg-slate-800 text-slate-400 border-slate-700',
  };

  return (
    <div className="bg-[#0c1222] rounded-xl border border-slate-800 overflow-hidden shadow-xl">
      <div className="p-4 border-b border-slate-800 flex items-center justify-between">
        <div>
          <h3 className="font-bold text-slate-100 text-sm">Exploration Potential Zones Table</h3>
          <p className="text-xs text-slate-400">Ranked by manganese prospectivity AI confidence metrics</p>
        </div>
        <span className="text-xs bg-slate-800 px-2.5 py-1 rounded text-slate-300 font-medium border border-slate-700">
          {zones.length} Zones Target
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs text-slate-300">
          <thead className="bg-slate-900/90 text-slate-400 uppercase font-semibold text-[11px] border-b border-slate-800">
            <tr>
              <th className="py-3 px-4">Zone Target</th>
              <th className="py-3 px-4">Potential Level</th>
              <th className="py-3 px-4 cursor-pointer hover:text-white" onClick={() => toggleSort('score')}>
                <div className="flex items-center gap-1">
                  Prospectivity
                  <ArrowUpDown className="h-3 w-3" />
                </div>
              </th>
              <th className="py-3 px-4 cursor-pointer hover:text-white" onClick={() => toggleSort('confidence')}>
                <div className="flex items-center gap-1">
                  Confidence
                  <ArrowUpDown className="h-3 w-3" />
                </div>
              </th>
              <th className="py-3 px-4 cursor-pointer hover:text-white" onClick={() => toggleSort('priority')}>
                <div className="flex items-center gap-1">
                  Priority
                  <ArrowUpDown className="h-3 w-3" />
                </div>
              </th>
              <th className="py-3 px-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {sortedZones.map((zone) => (
              <tr key={zone.id} className="hover:bg-slate-800/40 transition-colors">
                <td className="py-3 px-4">
                  <div className="font-bold text-slate-100">{zone.id}</div>
                  <div className="text-[11px] text-slate-400">{zone.name}</div>
                </td>
                <td className="py-3 px-4">
                  <span
                    className={`inline-block px-2.5 py-0.5 rounded text-[10px] font-extrabold uppercase border ${
                      potentialBadge[zone.potential]
                    }`}
                  >
                    {zone.potential.replace('_', ' ')}
                  </span>
                </td>
                <td className="py-3 px-4 font-mono font-extrabold text-emerald-400 text-sm">
                  {zone.score}%
                </td>
                <td className="py-3 px-4 font-mono text-slate-200">{zone.confidence}%</td>
                <td className="py-3 px-4">
                  <span
                    className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold border ${
                      priorityBadge[zone.priority]
                    }`}
                  >
                    {zone.priority}
                  </span>
                </td>
                <td className="py-3 px-4 text-right">
                  <button
                    type="button"
                    onClick={() => onInspectZone(zone)}
                    className="px-2.5 py-1 rounded bg-slate-800 hover:bg-emerald-600 text-slate-200 hover:text-white transition-colors border border-slate-700 hover:border-emerald-500 font-medium text-xs inline-flex items-center gap-1"
                  >
                    <Eye className="h-3.5 w-3.5" /> Inspect
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
