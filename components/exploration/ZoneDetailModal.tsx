'use client';

import React from 'react';
import { ProspectivityZone } from '@/lib/types';
import { X, ShieldAlert, Compass, Activity, CheckCircle2 } from 'lucide-react';

interface ZoneDetailModalProps {
  zone: ProspectivityZone | null;
  onClose: () => void;
}

export default function ZoneDetailModal({ zone, onClose }: ZoneDetailModalProps) {
  if (!zone) return null;

  const potentialBg: Record<string, string> = {
    LOW: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40',
    MODERATE: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/40',
    HIGH: 'bg-orange-500/20 text-orange-400 border-orange-500/40',
    VERY_HIGH: 'bg-red-500/20 text-red-400 border-red-500/40',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="bg-[#0f172a] border border-slate-700/80 rounded-2xl max-w-xl w-full p-6 shadow-2xl space-y-6 text-slate-200 relative">
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-start gap-4">
          <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-900/40 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0">
            <Compass className="h-6 w-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-slate-100">{zone.id}</h2>
              <span
                className={`text-xs uppercase font-extrabold px-2.5 py-0.5 rounded border ${
                  potentialBg[zone.potential] || 'bg-slate-800 text-slate-300'
                }`}
              >
                {zone.potential.replace('_', ' ')}
              </span>
            </div>
            <p className="text-xs text-slate-400">{zone.name} • Area: {zone.areaHectares} Ha</p>
          </div>
        </div>

        {/* Core Metrics Grid */}
        <div className="grid grid-cols-3 gap-3 bg-slate-900/80 p-4 rounded-xl border border-slate-800">
          <div className="text-center">
            <p className="text-[11px] text-slate-400 font-medium">Prospectivity Score</p>
            <p className="text-2xl font-extrabold text-emerald-400 mt-0.5">{zone.score}%</p>
          </div>
          <div className="text-center border-x border-slate-800">
            <p className="text-[11px] text-slate-400 font-medium">Confidence Rating</p>
            <p className="text-2xl font-extrabold text-slate-100 mt-0.5">{zone.confidence}%</p>
          </div>
          <div className="text-center">
            <p className="text-[11px] text-slate-400 font-medium">Exploration Priority</p>
            <p className="text-2xl font-extrabold text-orange-400 mt-0.5">{zone.priority}</p>
          </div>
        </div>

        {/* Key Indicators Breakdown */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
            <Activity className="h-4 w-4 text-emerald-400" />
            AI Multi-Sensor Indicator Breakdown
          </h3>

          <div className="space-y-2.5 text-xs">
            <div>
              <div className="flex justify-between font-semibold mb-1">
                <span className="text-slate-300">Geological Match (GSI Alignment)</span>
                <span className="text-emerald-400">{zone.indicators.geologicalMatch}%</span>
              </div>
              <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-400 rounded-full"
                  style={{ width: `${zone.indicators.geologicalMatch}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between font-semibold mb-1">
                <span className="text-slate-300">Structural Fault Proximity</span>
                <span className="text-emerald-400">{zone.indicators.structuralProximity}%</span>
              </div>
              <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-teal-400 rounded-full"
                  style={{ width: `${zone.indicators.structuralProximity}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between font-semibold mb-1">
                <span className="text-slate-300">Terrain Slope & DEM Elevation Match</span>
                <span className="text-emerald-400">{zone.indicators.terrainMatch}%</span>
              </div>
              <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-yellow-400 rounded-full"
                  style={{ width: `${zone.indicators.terrainMatch}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between font-semibold mb-1">
                <span className="text-slate-300">Sentinel-2 Spectral Signature (B7/B4 Ratio)</span>
                <span className="text-emerald-400">{zone.indicators.spectralSignature}%</span>
              </div>
              <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-emerald-500 rounded-full"
                  style={{ width: `${zone.indicators.spectralSignature}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Recommended Action */}
        <div className="p-4 rounded-xl bg-emerald-950/30 border border-emerald-500/40 space-y-1.5">
          <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
            Recommended Field Action
          </div>
          <p className="text-xs text-slate-200 leading-relaxed">{zone.recommendedAction}</p>
        </div>

        {/* Mandatory Disclaimer */}
        <div className="p-3 rounded-lg bg-amber-950/20 border border-amber-500/30 flex items-start gap-2.5 text-[11px] text-amber-300">
          <ShieldAlert className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
          <p className="leading-snug">
            <strong>Disclaimer:</strong> Prototype prediction for demonstration purposes. Production deployment requires validated GSI geological survey data and physical exploratory diamond drilling.
          </p>
        </div>
      </div>
    </div>
  );
}
