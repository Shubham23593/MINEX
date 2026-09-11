'use client';

import React from 'react';
import { useMine } from '@/context/MineContext';
import {
  BrainCircuit,
  Compass,
  TrendingDown,
  Sparkles,
  CheckCircle2,
  Layers,
} from 'lucide-react';

export default function InsightsPage() {
  const { selectedMine } = useMine();

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Title Header */}
      <div className="bg-[#0c1222] border border-slate-800 rounded-2xl p-6 shadow-xl space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold">
          <BrainCircuit className="h-3.5 w-3.5" /> Unified Exploration & Production Intelligence
        </div>
        <h1 className="text-2xl font-extrabold text-slate-100">
          AI Recommendations & Combined Insights
        </h1>
        <p className="text-xs text-slate-400 max-w-3xl">
          Cross-referencing satellite prospectivity maps with mine operations data to synthesize operational decisions for {selectedMine.name}.
        </p>
      </div>

      {/* AI Summary Card */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-[#0a1528] to-emerald-950/40 border border-emerald-500/40 shadow-2xl space-y-4">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-100">Executive AI Synthesis Summary</h2>
            <p className="text-xs text-slate-400">Automated multi-factor correlation for current operating period</p>
          </div>
        </div>

        <p className="text-sm text-slate-200 leading-relaxed bg-slate-950/60 p-4 rounded-xl border border-slate-800">
          &quot;For <strong className="text-emerald-400">{selectedMine.name}</strong>, satellite multispectral analysis highlights <strong>Zone A-01 (91% prospectivity)</strong> as the highest priority target. Concurrently, production modeling forecasts a <strong>175 Tonnes shortfall (74% risk probability)</strong> due to 42% equipment downtime at Face F02. Re-deploying standby excavators to Face F02 while prioritizing exploratory drilling at Zone A-01 yields maximum long-term ore availability.&quot;
        </p>
      </div>

      {/* Grid of Module Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Module 1 — Exploration Insights */}
        <div className="bg-[#0c1222] border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
            <div className="h-9 w-9 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Compass className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-100 text-base">Exploration Intelligence Insights</h3>
              <p className="text-xs text-slate-400">Satellite & Geophysical Indicators</p>
            </div>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
              <div className="flex items-center justify-between font-bold text-slate-200">
                <span>North Gondite Horizon (Zone A-01)</span>
                <span className="text-emerald-400 font-mono">91% Match</span>
              </div>
              <p className="text-slate-400 leading-relaxed">
                Sentinel-2 Band 7/4 spectral ratio indicates high manganese oxide surface outcrop. Structural lineament fault match is 94%.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
              <div className="flex items-center justify-between font-bold text-slate-200">
                <span>Central Strike Ridge (Zone B-04)</span>
                <span className="text-teal-400 font-mono">84% Match</span>
              </div>
              <p className="text-slate-400 leading-relaxed">
                SRTM DEM slope analysis confirms synclinal fold structure typical of MOIL gondite deposits. Ground resistivity recommended.
              </p>
            </div>
          </div>
        </div>

        {/* Module 2 — Production Insights */}
        <div className="bg-[#0c1222] border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
            <div className="h-9 w-9 rounded-lg bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400">
              <TrendingDown className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-100 text-base">Production Shortfall Insights</h3>
              <p className="text-xs text-slate-400">Operations & Weather Bottlenecks</p>
            </div>
          </div>

          <div className="space-y-3 text-xs">
            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
              <div className="flex items-center justify-between font-bold text-slate-200">
                <span>Equipment Downtime Impact</span>
                <span className="text-red-400 font-mono">42% SHAP Weight</span>
              </div>
              <p className="text-slate-400 leading-relaxed">
                Hydraulic excavator line failure at Face F02 accounts for 65 Tonnes of daily extraction deficit.
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
              <div className="flex items-center justify-between font-bold text-slate-200">
                <span>Blasting Delay Bottleneck</span>
                <span className="text-orange-400 font-mono">27% SHAP Weight</span>
              </div>
              <p className="text-slate-400 leading-relaxed">
                Shift B blast clearance delays average 4.2 hours. Switching to electronic detonators will recover truck cycle time.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Cross-Module Intelligence Section */}
      <div className="bg-[#0c1222] border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
          <div className="h-9 w-9 rounded-lg bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400">
            <Layers className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-bold text-slate-100 text-base">Cross-Module Correlation Intelligence</h3>
            <p className="text-xs text-slate-400">Synergizing space tech prospectivity with mine operational scheduling</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-900/90 border border-emerald-500/30 space-y-2">
            <h4 className="font-bold text-emerald-400 flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4" /> Correlation 1: Immediate Field Action
            </h4>
            <p className="text-slate-200 leading-relaxed">
              &quot;Zone A-01 has high manganese prospectivity (91%) and is currently accessible via Pit North haul road. Prioritizing core drilling here mitigates projected 2027 reserve depletion.&quot;
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/90 border border-teal-500/30 space-y-2">
            <h4 className="font-bold text-teal-400 flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4" /> Correlation 2: Weather-Resilient Ore Feed
            </h4>
            <p className="text-slate-200 leading-relaxed">
              &quot;Forecasted rainfall (19% shortfall contribution) will reduce haulage. Building ROM stockpile buffer to &gt;2,000 Tonnes ensures continuous washing plant feed during monsoon spikes.&quot;
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
