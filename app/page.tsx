'use client';

import React from 'react';
import { useMine } from '@/context/MineContext';
import DynamicMapWrapper from '@/components/map/DynamicMapWrapper';
import { MOCK_PROSPECTIVITY_ZONES } from '@/lib/mock/prospectivity';
import {
  MOCK_RISK_DRIVERS,
  MOCK_MONTHLY_TREND,
} from '@/lib/mock/production';
import {
  Compass,
  TrendingDown,
  BrainCircuit,
  AlertTriangle,
  ArrowUpRight,
  ShieldCheck,
  Pickaxe,
  Activity,
  ChevronRight,
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip as RechartsTooltip,
  Legend,
  CartesianGrid,
} from 'recharts';

export default function Dashboard() {
  const { selectedMine } = useMine();

  const zones =
    MOCK_PROSPECTIVITY_ZONES[selectedMine.id] || MOCK_PROSPECTIVITY_ZONES['MOIL-BAL'];

  const highPriorityZones = zones.filter(
    (z) => z.potential === 'VERY_HIGH' || z.potential === 'HIGH'
  );

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      {/* Top Banner Header */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-[#0b1329] to-emerald-950/40 border border-slate-800 shadow-2xl relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-semibold mb-2">
              <ShieldCheck className="h-3.5 w-3.5" /> SIH26009 • MOIL Limited Command Center
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-100 tracking-tight">
              MINEX Intelligence Dashboard
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
              Real-time manganese prospectivity mapping & operational shortfall risk analytics for{' '}
              <strong className="text-emerald-400 font-semibold">{selectedMine.name}</strong>.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="bg-slate-950/60 border border-slate-800 p-3 rounded-xl text-right">
              <span className="text-[10px] uppercase text-slate-500 font-bold tracking-wider">
                Current Selected Mine
              </span>
              <p className="text-sm font-bold text-slate-100">{selectedMine.name}</p>
              <p className="text-[11px] text-emerald-400">{selectedMine.district}, {selectedMine.state}</p>
            </div>
          </div>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1 */}
        <div className="bg-[#0c1222] border border-slate-800 rounded-xl p-5 shadow-xl hover:border-emerald-500/40 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Prospectivity Score</span>
            <div className="h-8 w-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
              <Compass className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-3xl font-extrabold text-emerald-400">
              {selectedMine.estimatedProspectivityScore || 82}%
            </span>
            <span className="text-xs font-medium text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
              High Match
            </span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Multi-spectral satellite & DEM alignment</p>
        </div>

        {/* KPI 2 */}
        <div className="bg-[#0c1222] border border-slate-800 rounded-xl p-5 shadow-xl hover:border-emerald-500/40 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">High Potential Zones</span>
            <div className="h-8 w-8 rounded-lg bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400">
              <Pickaxe className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-3xl font-extrabold text-slate-100">
              {selectedMine.highPotentialZonesCount || 14}
            </span>
            <span className="text-xs font-medium text-teal-400 bg-teal-950/60 px-2 py-0.5 rounded border border-teal-500/30">
              Target Areas
            </span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Identified priority drill targets</p>
        </div>

        {/* KPI 3 */}
        <div className="bg-[#0c1222] border border-slate-800 rounded-xl p-5 shadow-xl hover:border-emerald-500/40 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Predicted Production</span>
            <div className="h-8 w-8 rounded-lg bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
              <Activity className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-3xl font-extrabold text-slate-100">1,080 T</span>
            <span className="text-xs font-medium text-slate-400">Planned: 1,250 T</span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Shortfall: ~170 Tonnes</p>
        </div>

        {/* KPI 4 */}
        <div className="bg-[#0c1222] border border-slate-800 rounded-xl p-5 shadow-xl hover:border-red-500/40 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400">Shortfall Risk Level</span>
            <div className="h-8 w-8 rounded-lg bg-red-500/10 border border-red-500/30 flex items-center justify-center text-red-400">
              <TrendingDown className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-3xl font-extrabold text-red-400">74%</span>
            <span className="text-xs font-bold text-red-400 bg-red-950/60 px-2 py-0.5 rounded border border-red-500/40 uppercase">
              HIGH RISK
            </span>
          </div>
          <p className="text-[11px] text-slate-500 mt-1">Downtime & Blast latency primary drivers</p>
        </div>
      </div>

      {/* Main Map + High Priority Zones Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Large GIS Map */}
        <div className="lg:col-span-2 bg-[#0c1222] border border-slate-800 rounded-2xl p-4 shadow-xl flex flex-col space-y-3">
          <div className="flex items-center justify-between px-2">
            <div>
              <h2 className="font-bold text-slate-100 text-sm flex items-center gap-2">
                <Compass className="h-4 w-4 text-emerald-400" />
                Mine GIS Prospectivity Map Overview
              </h2>
              <p className="text-xs text-slate-400">
                Interactive spatial visualization for {selectedMine.name} (AOI: {selectedMine.area} km²)
              </p>
            </div>
            <span className="text-[11px] bg-emerald-950/80 border border-emerald-500/30 text-emerald-400 px-2.5 py-1 rounded font-semibold">
              Live GIS Layer
            </span>
          </div>

          <div className="w-full h-[400px]">
            <DynamicMapWrapper mine={selectedMine} zones={zones} />
          </div>
        </div>

        {/* High Priority Exploration Zones Quick List */}
        <div className="bg-[#0c1222] border border-slate-800 rounded-2xl p-5 shadow-xl flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="font-bold text-slate-100 text-sm">High Priority Target Zones</h3>
              <span className="text-xs text-emerald-400 font-semibold">{highPriorityZones.length} Urgent</span>
            </div>

            <div className="mt-4 space-y-3">
              {zones.slice(0, 4).map((zone) => (
                <div
                  key={zone.id}
                  className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-emerald-500/40 transition-all flex items-center justify-between"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-slate-100">{zone.id}</span>
                      <span
                        className={`text-[9px] uppercase font-bold px-2 py-0.5 rounded text-white ${
                          zone.potential === 'VERY_HIGH'
                            ? 'bg-red-500'
                            : zone.potential === 'HIGH'
                            ? 'bg-orange-500'
                            : zone.potential === 'MODERATE'
                            ? 'bg-yellow-500'
                            : 'bg-emerald-500'
                        }`}
                      >
                        {zone.potential.replace('_', ' ')}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 truncate max-w-[170px] mt-0.5">
                      {zone.name}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-base font-extrabold font-mono text-emerald-400">
                      {zone.score}%
                    </span>
                    <p className="text-[10px] text-slate-500">Match</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <a
            href="/exploration"
            className="w-full py-2.5 px-4 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 hover:text-white font-semibold text-xs transition-colors flex items-center justify-center gap-2"
          >
            Open Full Prospectivity Analysis <ChevronRight className="h-4 w-4 text-emerald-400" />
          </a>
        </div>
      </div>

      {/* Production Forecast & Risk Drivers Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Production Forecast Chart */}
        <div className="lg:col-span-2 bg-[#0c1222] border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-slate-100 text-sm flex items-center gap-2">
                <Activity className="h-4 w-4 text-emerald-400" />
                Production Shortfall Forecast (Planned vs Predicted)
              </h3>
              <p className="text-xs text-slate-400">
                Weekly operational ore extraction trajectory in Tonnes
              </p>
            </div>
          </div>

          <div className="h-[250px] w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={MOCK_MONTHLY_TREND} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="date" stroke="#64748b" tick={{ fontSize: 11 }} />
                <YAxis stroke="#64748b" tick={{ fontSize: 11 }} />
                <RechartsTooltip
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px' }}
                />
                <Legend wrapperStyle={{ fontSize: '12px' }} />
                <Bar dataKey="planned" name="Planned Tonnes" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="predicted" name="Predicted Tonnes" fill="#10b981" radius={[4, 4, 0, 0]} />
                <Bar dataKey="actual" name="Actual Tonnes" fill="#f59e0b" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Risk Drivers Card */}
        <div className="bg-[#0c1222] border border-slate-800 rounded-2xl p-5 shadow-xl space-y-4">
          <div>
            <h3 className="font-bold text-slate-100 text-sm flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-orange-400" />
              AI Risk Drivers (SHAP Analysis)
            </h3>
            <p className="text-xs text-slate-400">Primary operational constraints</p>
          </div>

          <div className="space-y-3 text-xs">
            {MOCK_RISK_DRIVERS.map((driver) => (
              <div key={driver.id} className="space-y-1">
                <div className="flex justify-between font-medium">
                  <span className="text-slate-200">{driver.name}</span>
                  <span className="font-mono font-bold text-orange-400">{driver.percentage}%</span>
                </div>
                <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                  <div
                    className="h-full bg-gradient-to-r from-orange-500 to-red-500 rounded-full"
                    style={{ width: `${driver.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Compact AI Recommendation Card */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-slate-900 to-slate-900 border border-emerald-500/30 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="h-10 w-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 shrink-0">
            <BrainCircuit className="h-5 w-5" />
          </div>
          <div>
            <h4 className="font-bold text-slate-100 text-sm flex items-center gap-2">
              AI Recommendation Priority: Reassign Standby Equipment
            </h4>
            <p className="text-xs text-slate-300 mt-0.5 max-w-3xl">
              Hydraulic excavator downtime at Face F02 reduced daily loading by 35%. Deploy 2 standby CAT excavators from Pit West depot to recover +85 Tonnes/day.
            </p>
          </div>
        </div>
        <a
          href="/production"
          className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-colors shrink-0 shadow-lg shadow-emerald-950/50 flex items-center gap-1.5"
        >
          View Full Mitigation Plan <ArrowUpRight className="h-4 w-4" />
        </a>
      </div>
    </div>
  );
}
