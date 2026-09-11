'use client';

import React, { useState } from 'react';
import { useMine } from '@/context/MineContext';
import DynamicMapWrapper from '@/components/map/DynamicMapWrapper';
import PipelineProgress from '@/components/exploration/PipelineProgress';
import ZoneDetailModal from '@/components/exploration/ZoneDetailModal';
import ExplorationTable from '@/components/exploration/ExplorationTable';
import { MOCK_PROSPECTIVITY_ZONES } from '@/lib/mock/prospectivity';
import { ProspectivityZone } from '@/lib/types';
import {
  Compass,
  Play,
  CheckCircle2,
  MapPin,
  Globe,
  ShieldAlert,
  Flame,
} from 'lucide-react';

export default function ExplorationPage() {
  const { mines, selectedMine, setSelectedMine } = useMine();
  const [analysisYear, setAnalysisYear] = useState('2026');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(true);
  const [selectedZone, setSelectedZone] = useState<ProspectivityZone | null>(null);
  const [showHeatmap, setShowHeatmap] = useState(false);

  const zones =
    MOCK_PROSPECTIVITY_ZONES[selectedMine.id] || MOCK_PROSPECTIVITY_ZONES['MOIL-BAL'];

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
      <div className="bg-[#0c1222] border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold mb-2">
              <Compass className="h-3.5 w-3.5" /> Module 1 — Manganese Prospectivity
            </div>
            <h1 className="text-2xl font-extrabold text-slate-100">
              Manganese Prospectivity Analysis
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Identify potential manganese ore horizons using Sentinel-2 multispectral bands and SRTM DEM elevation features.
            </p>
          </div>

          {/* Control Panel */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 bg-slate-900 border border-slate-700 px-3 py-2 rounded-xl text-xs">
              <MapPin className="h-4 w-4 text-emerald-400" />
              <select
                value={selectedMine.id}
                onChange={(e) => {
                  const found = mines.find((m) => m.id === e.target.value);
                  if (found) setSelectedMine(found);
                }}
                className="bg-transparent text-slate-100 font-semibold focus:outline-none cursor-pointer"
              >
                {mines.map((mine) => (
                  <option key={mine.id} value={mine.id} className="bg-slate-900 text-slate-100">
                    {mine.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2 bg-slate-900 border border-slate-700 px-3 py-2 rounded-xl text-xs">
              <span className="text-slate-400 font-medium">Period:</span>
              <select
                value={analysisYear}
                onChange={(e) => setAnalysisYear(e.target.value)}
                className="bg-transparent text-slate-100 font-semibold focus:outline-none cursor-pointer"
              >
                <option value="2026" className="bg-slate-900">2026 (Latest Sentinel-2)</option>
                <option value="2025" className="bg-slate-900">2025 Archive</option>
                <option value="2024" className="bg-slate-900">2024 Baseline</option>
              </select>
            </div>

            <button
              type="button"
              onClick={handleRunAnalysis}
              disabled={isAnalyzing}
              className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs shadow-lg shadow-emerald-950/40 transition-all flex items-center gap-2 disabled:opacity-50"
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
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-400 bg-emerald-950/30 border border-emerald-500/30 px-3 py-1.5 rounded-lg w-fit">
            <CheckCircle2 className="h-4 w-4 text-emerald-400" />
            Analysis Complete • Model Confidence: 87.5% • GEE Sentinel-2 Synced
          </div>
        )}
      </div>

      {/* Mine Info Summary Bar */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
        <div className="bg-[#0c1222] border border-slate-800 p-3 rounded-xl text-center">
          <p className="text-[10px] text-slate-500 uppercase font-semibold">Mine Name</p>
          <p className="text-xs font-bold text-slate-100 mt-0.5 truncate">{selectedMine.name}</p>
        </div>
        <div className="bg-[#0c1222] border border-slate-800 p-3 rounded-xl text-center">
          <p className="text-[10px] text-slate-500 uppercase font-semibold">District / State</p>
          <p className="text-xs font-bold text-slate-100 mt-0.5 truncate">
            {selectedMine.district}, {selectedMine.state}
          </p>
        </div>
        <div className="bg-[#0c1222] border border-slate-800 p-3 rounded-xl text-center">
          <p className="text-[10px] text-slate-500 uppercase font-semibold">Latitude</p>
          <p className="text-xs font-mono font-bold text-emerald-400 mt-0.5">{selectedMine.latitude}°N</p>
        </div>
        <div className="bg-[#0c1222] border border-slate-800 p-3 rounded-xl text-center">
          <p className="text-[10px] text-slate-500 uppercase font-semibold">Longitude</p>
          <p className="text-xs font-mono font-bold text-emerald-400 mt-0.5">{selectedMine.longitude}°E</p>
        </div>
        <div className="bg-[#0c1222] border border-slate-800 p-3 rounded-xl text-center">
          <p className="text-[10px] text-slate-500 uppercase font-semibold">Mine Area</p>
          <p className="text-xs font-bold text-slate-100 mt-0.5">{selectedMine.area} km²</p>
        </div>
        <div className="bg-[#0c1222] border border-slate-800 p-3 rounded-xl text-center">
          <p className="text-[10px] text-slate-500 uppercase font-semibold">Ore Type</p>
          <p className="text-xs font-bold text-teal-400 mt-0.5 truncate">Gondite Metamorphic</p>
        </div>
      </div>

      {/* Main Interactive Map */}
      <div className="bg-[#0c1222] border border-slate-800 rounded-2xl p-4 shadow-2xl space-y-3">
        <div className="flex items-center justify-between px-2">
          <div>
            <h2 className="font-bold text-slate-100 text-sm flex items-center gap-2">
              <Globe className="h-4 w-4 text-emerald-400" />
              Spatial Prospectivity & Heatmap Overlay ({selectedMine.name})
            </h2>
            <p className="text-xs text-slate-400">
              Click any colored zone polygon to inspect multi-sensor indicators and recommended field verification actions
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowHeatmap(!showHeatmap)}
            className={`px-3 py-1.5 rounded-lg border text-xs font-semibold transition-all flex items-center gap-1.5 ${
              showHeatmap
                ? 'bg-red-500/20 text-red-300 border-red-500/40'
                : 'bg-slate-800 text-slate-300 border-slate-700 hover:text-white'
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

      {/* Mandatory Regulatory Disclaimer */}
      <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-500/30 flex items-start gap-3 text-xs text-amber-300">
        <ShieldAlert className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold text-amber-200">Decision Support Disclaimer:</span> Prototype prediction for demonstration. Production deployment requires validated GSI geological survey data, satellite spectral ground-truthing, and exploratory diamond core drilling. Outputs represent &quot;Prospectivity&quot; and &quot;Exploration Priority&quot;, not certified reserves.
        </div>
      </div>
    </div>
  );
}
