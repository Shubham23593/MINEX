'use client';

import React, { useState } from 'react';
import { useMine } from '@/context/MineContext';
import DynamicMapWrapper from '@/components/map/DynamicMapWrapper';
import PipelineProgress from '@/components/exploration/PipelineProgress';
import ZoneDetailModal from '@/components/exploration/ZoneDetailModal';
import ExplorationTable from '@/components/exploration/ExplorationTable';
import { getProspectivityZonesForMine } from '@/lib/services/mineSearchService';
import { ProspectivityZone } from '@/lib/types';
import {
  Compass,
  Play,
  CheckCircle2,
  MapPin,
  Globe,
  Flame,
  Pickaxe,
} from 'lucide-react';

export default function ExplorationPage() {
  const { mines, selectedMine, setSelectedMine } = useMine();
  const [analysisYear, setAnalysisYear] = useState('2026');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(true);
  const [selectedZone, setSelectedZone] = useState<ProspectivityZone | null>(null);
  const [showHeatmap, setShowHeatmap] = useState(false);

  const zones = getProspectivityZonesForMine(selectedMine);

  const totalOrePotential = zones.reduce(
    (acc, z) => acc + (z.estimatedOreTonnes || 0),
    0
  );

  const handleRunAnalysis = () => {
    setIsAnalyzing(true);
    setAnalysisComplete(false);
  };

  const handlePipelineComplete = () => {
    setIsAnalyzing(false);
    setAnalysisComplete(true);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Page Title & Controls */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 border border-emerald-200 text-emerald-800 text-xs font-bold mb-2">
              <Compass className="h-3.5 w-3.5 text-emerald-700" /> Module 1 — Manganese Prospectivity & Mining Zones
            </div>
            <h1 className="text-2xl font-extrabold text-slate-900">
              Manganese Prospectivity & Extraction Analysis
            </h1>
            <p className="text-xs text-slate-600 font-medium mt-1">
              Identify potential manganese ore horizons and estimate available extraction tonnage using Sentinel-2 multispectral bands and SRTM DEM elevation features.
            </p>
          </div>

          {/* Control Panel */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 bg-slate-50 border border-slate-300 px-3 py-2 rounded-xl text-xs">
              <MapPin className="h-4 w-4 text-emerald-700" />
              <select
                value={selectedMine.id}
                onChange={(e) => {
                  const found = mines.find((m) => m.id === e.target.value);
                  if (found) setSelectedMine(found);
                }}
                className="bg-transparent text-slate-900 font-bold focus:outline-none cursor-pointer"
              >
                {mines.map((mine) => (
                  <option key={mine.id} value={mine.id} className="bg-white text-slate-900">
                    {mine.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2 bg-slate-50 border border-slate-300 px-3 py-2 rounded-xl text-xs">
              <span className="text-slate-500 font-bold">Period:</span>
              <select
                value={analysisYear}
                onChange={(e) => setAnalysisYear(e.target.value)}
                className="bg-transparent text-slate-900 font-bold focus:outline-none cursor-pointer"
              >
                <option value="2026" className="bg-white">2026 (Latest Sentinel-2)</option>
                <option value="2025" className="bg-white">2025 Archive</option>
                <option value="2024" className="bg-white">2024 Baseline</option>
              </select>
            </div>

            <button
              type="button"
              onClick={handleRunAnalysis}
              disabled={isAnalyzing}
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <Play className="h-4 w-4 fill-white" />
              {isAnalyzing ? 'RUNNING PIPELINE...' : 'RUN PROSPECTIVITY ANALYSIS'}
            </button>
          </div>
        </div>

        {/* Animated Processing Stage */}
        {isAnalyzing && (
          <div className="pt-2">
            <PipelineProgress onComplete={handlePipelineComplete} />
          </div>
        )}

        {/* Status Badge */}
        {analysisComplete && !isAnalyzing && (
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-lg w-fit">
            <CheckCircle2 className="h-4 w-4 text-emerald-700" />
            Analysis Complete • Model Confidence: 87.5% • Sentinel-2 Multi-Spectral Active
          </div>
        )}
      </div>

      {/* Mine Info & Total Ore Potential Summary Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
        <div className="bg-white border border-slate-200 p-3 rounded-xl text-center shadow-2xs">
          <p className="text-[10px] text-slate-400 uppercase font-bold">Mine Name</p>
          <p className="text-xs font-bold text-slate-900 mt-0.5 truncate">{selectedMine.name}</p>
        </div>
        <div className="bg-white border border-slate-200 p-3 rounded-xl text-center shadow-2xs">
          <p className="text-[10px] text-slate-400 uppercase font-bold">District / State</p>
          <p className="text-xs font-bold text-slate-900 mt-0.5 truncate">
            {selectedMine.district}, {selectedMine.state}
          </p>
        </div>
        <div className="bg-white border border-slate-200 p-3 rounded-xl text-center shadow-2xs">
          <p className="text-[10px] text-slate-400 uppercase font-bold">Mine Area</p>
          <p className="text-xs font-bold text-slate-900 mt-0.5">{selectedMine.area} km²</p>
        </div>
        <div className="bg-white border border-slate-200 p-3 rounded-xl text-center shadow-2xs">
          <p className="text-[10px] text-slate-400 uppercase font-bold">Target Zones</p>
          <p className="text-xs font-bold text-emerald-700 mt-0.5">{zones.length} Mining Zones</p>
        </div>
        <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-xl text-center col-span-2 shadow-2xs">
          <p className="text-[10px] text-emerald-800 uppercase font-bold flex items-center justify-center gap-1">
            <Pickaxe className="h-3.5 w-3.5 text-emerald-600" /> Total Est. Manganese Ore Potential
          </p>
          <p className="text-sm font-extrabold text-slate-900 mt-0.5 font-mono">
            {totalOrePotential.toLocaleString('en-US')} Tonnes
          </p>
        </div>
      </div>

      {/* Main Interactive Map */}
      <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-xs space-y-3">
        <div className="flex items-center justify-between px-2">
          <div>
            <h2 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <Globe className="h-4 w-4 text-emerald-600" />
              Spatial Prospectivity & Heatmap Overlay ({selectedMine.name})
            </h2>
            <p className="text-xs text-slate-500 font-medium">
              Click any colored zone polygon to inspect multi-sensor indicators, estimated ore production (Tonnes), and recommended field verification actions
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowHeatmap(!showHeatmap)}
            className={`px-3 py-1.5 rounded-lg border text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
              showHeatmap
                ? 'bg-red-100 text-red-800 border-red-300'
                : 'bg-slate-100 text-slate-700 border-slate-300 hover:text-slate-900'
            }`}
          >
            <Flame className="h-3.5 w-3.5" />
            {showHeatmap ? 'Heatmap Overlay: Active' : 'Enable Dense Heatmap'}
          </button>
        </div>

        <div className="w-full h-[520px]">
          <DynamicMapWrapper
            mine={selectedMine}
            zones={zones}
            selectedZoneId={selectedZone?.id}
            onSelectZone={(z) => setSelectedZone(z)}
            showHeatmapOverlay={showHeatmap}
          />
        </div>
      </div>

      {/* Exploration Zone Table */}
      <ExplorationTable zones={zones} onInspectZone={(z) => setSelectedZone(z)} />

      {/* Zone Details Modal */}
      <ZoneDetailModal zone={selectedZone} onClose={() => setSelectedZone(null)} />
    </div>
  );
}
