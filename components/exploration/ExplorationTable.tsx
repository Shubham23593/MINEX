'use client';

import React, { useState } from 'react';
import { ProspectivityZone } from '@/lib/types';
import { Eye, ArrowUpDown } from 'lucide-react';

interface ExplorationTableProps {
  zones: ProspectivityZone[];
  onInspectZone: (zone: ProspectivityZone) => void;
}

export default function ExplorationTable({ zones, onInspectZone }: ExplorationTableProps) {
  const [sortField, setSortField] = useState<'score' | 'confidence' | 'priority' | 'ore'>('score');
  const [sortAsc, setSortAsc] = useState(false);

  const sortedZones = [...zones].sort((a, b) => {
    let result = 0;
    if (sortField === 'score') {
      result = a.score - b.score;
    } else if (sortField === 'confidence') {
      result = a.confidence - b.confidence;
    } else if (sortField === 'ore') {
      result = (a.estimatedOreTonnes || 0) - (b.estimatedOreTonnes || 0);
    } else if (sortField === 'priority') {
      const pMap: Record<string, number> = { URGENT: 4, HIGH: 3, MEDIUM: 2, LOW: 1 };
      result = (pMap[a.priority] || 0) - (pMap[b.priority] || 0);
    }
    return sortAsc ? result : -result;
  });

  const toggleSort = (field: 'score' | 'confidence' | 'priority' | 'ore') => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(false);
    }
  };

  const potentialBadge: Record<string, string> = {
    LOW: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    MODERATE: 'bg-yellow-100 text-yellow-800 border-yellow-300',
    HIGH: 'bg-orange-100 text-orange-800 border-orange-300',
    VERY_HIGH: 'bg-red-100 text-red-800 border-red-300',
  };

  const priorityBadge: Record<string, string> = {
    URGENT: 'bg-red-100 text-red-800 border-red-300',
    HIGH: 'bg-orange-100 text-orange-800 border-orange-300',
    MEDIUM: 'bg-yellow-100 text-yellow-800 border-yellow-300',
    LOW: 'bg-slate-100 text-slate-700 border-slate-300',
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
      <div className="p-4 border-b border-slate-100 flex items-center justify-between">
        <div>
          <h3 className="font-bold text-slate-900 text-sm">Exploration Potential & Reserves Table</h3>
          <p className="text-xs text-slate-500 font-medium">Ranked by manganese prospectivity and estimated ore extraction tonnage</p>
        </div>
        <span className="text-xs bg-slate-100 px-3 py-1 rounded-lg text-slate-700 font-bold border border-slate-200">
          {zones.length} Zones Target
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs text-slate-700">
          <thead className="bg-slate-50 text-slate-500 uppercase font-bold text-[11px] border-b border-slate-200">
            <tr>
              <th className="py-3 px-4">Zone Target</th>
              <th className="py-3 px-4">Potential Level</th>
              <th className="py-3 px-4 cursor-pointer hover:text-slate-900" onClick={() => toggleSort('score')}>
                <div className="flex items-center gap-1">
                  Prospectivity
                  <ArrowUpDown className="h-3 w-3" />
                </div>
              </th>
              <th className="py-3 px-4 cursor-pointer hover:text-slate-900" onClick={() => toggleSort('ore')}>
                <div className="flex items-center gap-1">
                  Est. Ore Potential
                  <ArrowUpDown className="h-3 w-3" />
                </div>
              </th>
              <th className="py-3 px-4 cursor-pointer hover:text-slate-900" onClick={() => toggleSort('confidence')}>
                <div className="flex items-center gap-1">
                  Confidence
                  <ArrowUpDown className="h-3 w-3" />
                </div>
              </th>
              <th className="py-3 px-4 cursor-pointer hover:text-slate-900" onClick={() => toggleSort('priority')}>
                <div className="flex items-center gap-1">
                  Priority
                  <ArrowUpDown className="h-3 w-3" />
                </div>
              </th>
              <th className="py-3 px-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {sortedZones.map((zone) => (
              <tr key={zone.id} className="hover:bg-slate-50 transition-colors">
                <td className="py-3 px-4">
                  <div className="font-bold text-slate-900">{zone.id}</div>
                  <div className="text-[11px] text-slate-500 font-medium">{zone.name}</div>
                </td>
                <td className="py-3 px-4">
                  <span
                    className={`inline-block px-2.5 py-0.5 rounded-md text-[10px] font-extrabold uppercase border ${
                      potentialBadge[zone.potential]
                    }`}
                  >
                    {zone.potential.replace('_', ' ')}
                  </span>
                </td>
                <td className="py-3 px-4 font-mono font-extrabold text-emerald-700 text-sm">
                  {zone.score}%
                </td>
                <td className="py-3 px-4 font-mono font-bold text-slate-900">
                  {zone.estimatedOreTonnes ? `${zone.estimatedOreTonnes.toLocaleString('en-US')} T` : 'N/A'}
                  <span className="text-[10px] text-slate-500 font-normal block">@{zone.estimatedGradeMn}% Mn</span>
                </td>
                <td className="py-3 px-4 font-mono text-slate-700 font-semibold">{zone.confidence}%</td>
                <td className="py-3 px-4">
                  <span
                    className={`inline-block px-2 py-0.5 rounded-md text-[10px] font-bold border ${
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
                    className="px-3 py-1 rounded-lg bg-slate-100 hover:bg-emerald-600 text-slate-700 hover:text-white transition-colors border border-slate-200 hover:border-emerald-600 font-bold text-xs inline-flex items-center gap-1 shadow-2xs cursor-pointer"
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
