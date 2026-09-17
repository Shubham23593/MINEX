'use client';

import React from 'react';
import { ProspectivityZone } from '@/lib/types';
import { X, Compass, Activity, CheckCircle2, Pickaxe } from 'lucide-react';

interface ZoneDetailModalProps {
  zone: ProspectivityZone | null;
  onClose: () => void;
}

export default function ZoneDetailModal({ zone, onClose }: ZoneDetailModalProps) {
  if (!zone) return null;

  const potentialBg: Record<string, string> = {
    LOW: 'bg-emerald-100 text-emerald-800 border-emerald-300',
    MODERATE: 'bg-yellow-100 text-yellow-800 border-yellow-300',
    HIGH: 'bg-orange-100 text-orange-800 border-orange-300',
    VERY_HIGH: 'bg-red-100 text-red-800 border-red-300',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white border border-slate-200 rounded-2xl max-w-xl w-full p-6 shadow-2xl space-y-6 text-slate-800 relative">
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 hover:text-slate-900 transition-colors cursor-pointer"
        >
          <X className="h-5 w-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-start gap-4">
          <div className="h-12 w-12 rounded-xl bg-emerald-100 border border-emerald-200 flex items-center justify-center text-emerald-700 shrink-0">
            <Compass className="h-6 w-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-slate-900">{zone.id}</h2>
              <span
                className={`text-xs uppercase font-extrabold px-2.5 py-0.5 rounded-lg border ${
                  potentialBg[zone.potential] || 'bg-slate-100 text-slate-800'
                }`}
              >
                {zone.potential.replace('_', ' ')}
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium">{zone.name} • Area: {zone.areaHectares} Ha</p>
          </div>
        </div>

        {/* Ore Potential Feature Banner */}
        {zone.estimatedOreTonnes && (
          <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-emerald-600 flex items-center justify-center text-white shrink-0 shadow-xs">
                <Pickaxe className="h-5 w-5" />
              </div>
              <div>
                <p className="text-[11px] text-slate-500 uppercase font-bold">Estimated Ore Extraction Potential</p>
                <p className="text-xl font-extrabold text-slate-900">
                  {zone.estimatedOreTonnes.toLocaleString('en-US')} Tonnes
                </p>
              </div>
            </div>
            <div className="text-right border-l border-emerald-200 pl-4">
              <p className="text-[10px] text-slate-500 uppercase font-bold">Manganese Grade</p>
              <p className="text-lg font-mono font-extrabold text-emerald-700">{zone.estimatedGradeMn}% Mn</p>
            </div>
          </div>
        )}

        {/* Core Metrics Grid */}
        <div className="grid grid-cols-3 gap-3 bg-slate-50 p-4 rounded-xl border border-slate-200">
          <div className="text-center">
            <p className="text-[11px] text-slate-500 font-bold uppercase">Prospectivity</p>
            <p className="text-2xl font-extrabold text-emerald-700 mt-0.5">{zone.score}%</p>
          </div>
          <div className="text-center border-x border-slate-200">
            <p className="text-[11px] text-slate-500 font-bold uppercase">Confidence</p>
            <p className="text-2xl font-extrabold text-slate-900 mt-0.5">{zone.confidence}%</p>
          </div>
          <div className="text-center">
            <p className="text-[11px] text-slate-500 font-bold uppercase">Priority</p>
            <p className="text-2xl font-extrabold text-orange-600 mt-0.5">{zone.priority}</p>
          </div>
        </div>

        {/* Key Indicators Breakdown */}
        <div className="space-y-3">
          <h3 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
            <Activity className="h-4 w-4 text-emerald-600" />
            AI Multi-Sensor Indicator Breakdown
          </h3>

          <div className="space-y-2.5 text-xs">
            <div>
              <div className="flex justify-between font-bold mb-1">
                <span className="text-slate-700">Geological Match (GSI Alignment)</span>
                <span className="text-emerald-700 font-mono">{zone.indicators.geologicalMatch}%</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                <div
                  className="h-full bg-emerald-600 rounded-full"
                  style={{ width: `${zone.indicators.geologicalMatch}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between font-bold mb-1">
                <span className="text-slate-700">Structural Fault Proximity</span>
                <span className="text-teal-700 font-mono">{zone.indicators.structuralProximity}%</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                <div
                  className="h-full bg-teal-600 rounded-full"
                  style={{ width: `${zone.indicators.structuralProximity}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between font-bold mb-1">
                <span className="text-slate-700">Terrain Slope & DEM Elevation Match</span>
                <span className="text-yellow-700 font-mono">{zone.indicators.terrainMatch}%</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                <div
                  className="h-full bg-yellow-500 rounded-full"
                  style={{ width: `${zone.indicators.terrainMatch}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between font-bold mb-1">
                <span className="text-slate-700">Sentinel-2 Spectral Signature (B7/B4 Ratio)</span>
                <span className="text-emerald-700 font-mono">{zone.indicators.spectralSignature}%</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                <div
                  className="h-full bg-emerald-600 rounded-full"
                  style={{ width: `${zone.indicators.spectralSignature}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Recommended Action */}
        <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
          <div className="text-xs font-bold text-emerald-800 uppercase tracking-wider flex items-center gap-1.5">
            <CheckCircle2 className="h-4 w-4 text-emerald-600" />
            Recommended Field Action
          </div>
          <p className="text-xs text-slate-700 leading-relaxed font-medium">{zone.recommendedAction}</p>
        </div>
      </div>
    </div>
  );
}
