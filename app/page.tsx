'use client';

import React, { useState } from 'react';
import { useMine } from '@/context/MineContext';
import DynamicMapWrapper from '@/components/map/DynamicMapWrapper';
import ZoneDetailModal from '@/components/exploration/ZoneDetailModal';
import { getProspectivityZonesForMine } from '@/lib/services/mineSearchService';
import { ProspectivityZone } from '@/lib/types';
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
  ResponsiveContainer as RechartsResponsiveContainer,
  BarChart as RechartsBarChart,
  Bar as RechartsBar,
  XAxis as RechartsXAxis,
  YAxis as RechartsYAxis,
  Tooltip as RechartsTooltipComp,
  Legend as RechartsLegend,
  CartesianGrid as RechartsCartesianGrid,
} from 'recharts';

export default function Dashboard() {
  const { selectedMine } = useMine();
  const [selectedZone, setSelectedZone] = useState<ProspectivityZone | null>(null);
  const zones = getProspectivityZonesForMine(selectedMine);

  const highPriorityZones = zones.filter(
    (z) => z.potential === 'VERY_HIGH' || z.potential === 'HIGH'
  );

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      {/* Top Banner Header */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 border border-emerald-200 text-emerald-800 text-xs font-bold mb-2">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-700" /> SIH26009 • MOIL Limited Command Center
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              MINEX Intelligence Dashboard
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 font-medium mt-1 max-w-2xl">
              Real-time manganese prospectivity mapping & operational shortfall risk analytics for{' '}
              <strong className="text-emerald-700 font-bold">{selectedMine.name}</strong>.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="bg-slate-50 border border-slate-200 p-3 rounded-xl text-right shadow-2xs">
              <span className="text-[10px] uppercase text-slate-400 font-bold tracking-wider">
                Active Selected Mine
              </span>
              <p className="text-sm font-extrabold text-slate-900">{selectedMine.name}</p>
              <p className="text-[11px] text-emerald-700 font-bold">{selectedMine.district}, {selectedMine.state}</p>
            </div>
          </div>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1 */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs hover:border-emerald-300 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase">Prospectivity Score</span>
            <div className="h-8 w-8 rounded-lg bg-emerald-100 border border-emerald-200 flex items-center justify-center text-emerald-700">
              <Compass className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-3xl font-extrabold text-emerald-700">
              {selectedMine.estimatedProspectivityScore || 82}%
            </span>
            <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-lg border border-emerald-200">
              High Match
            </span>
          </div>
          <p className="text-[11px] text-slate-500 font-medium mt-1">Multi-spectral satellite & DEM alignment</p>
        </div>

        {/* KPI 2 */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs hover:border-emerald-300 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase">Predicted Ore Reserves</span>
            <div className="h-8 w-8 rounded-lg bg-teal-100 border border-teal-200 flex items-center justify-center text-teal-700">
              <Pickaxe className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-2xl font-extrabold text-slate-900 font-mono">
              {(selectedMine.totalEstimatedOreTonnes || 548000).toLocaleString('en-US')} T
            </span>
            <span className="text-xs font-bold text-teal-800 bg-teal-100 px-2 py-0.5 rounded-lg border border-teal-200">
              {zones.length} Target Zones
            </span>
          </div>
          <p className="text-[11px] text-slate-500 font-medium mt-1">Estimated manganese extraction potential</p>
        </div>

        {/* KPI 3 */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs hover:border-blue-300 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase">Predicted Production</span>
            <div className="h-8 w-8 rounded-lg bg-blue-100 border border-blue-200 flex items-center justify-center text-blue-700">
              <Activity className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-3xl font-extrabold text-slate-900">1,080 T</span>
            <span className="text-xs font-semibold text-slate-500">Planned: 1,250 T</span>
          </div>
          <p className="text-[11px] text-slate-500 font-medium mt-1">Shortfall: ~170 Tonnes</p>
        </div>

        {/* KPI 4 */}
        <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-xs hover:border-red-300 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-500 uppercase">Shortfall Risk Level</span>
            <div className="h-8 w-8 rounded-lg bg-red-100 border border-red-200 flex items-center justify-center text-red-700">
              <TrendingDown className="h-4 w-4" />
            </div>
          </div>
          <div className="mt-3 flex items-baseline justify-between">
            <span className="text-3xl font-extrabold text-red-700">74%</span>
            <span className="text-xs font-extrabold text-red-800 bg-red-100 px-2.5 py-0.5 rounded-lg border border-red-200 uppercase">
              HIGH RISK
            </span>
          </div>
          <p className="text-[11px] text-slate-500 font-medium mt-1">Downtime & Blast latency primary drivers</p>
        </div>
      </div>

      {/* Main Map + High Priority Zones Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Large GIS Map */}
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl p-4 shadow-xs flex flex-col space-y-3">
          <div className="flex items-center justify-between px-2">
            <div>
              <h2 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <Compass className="h-4 w-4 text-emerald-600" />
                Mine GIS Prospectivity Map Overview
              </h2>
              <p className="text-xs text-slate-500 font-medium">
                Interactive spatial visualization for {selectedMine.name} (AOI: {selectedMine.area} km²)
              </p>
            </div>
            <span className="text-[11px] bg-emerald-50 border border-emerald-200 text-emerald-800 px-2.5 py-1 rounded-lg font-bold">
              Live GIS Layer
            </span>
          </div>

          <div className="w-full h-[400px]">
            <DynamicMapWrapper
              mine={selectedMine}
              zones={zones}
              selectedZoneId={selectedZone?.id}
              onSelectZone={(z) => setSelectedZone(z)}
            />
          </div>
        </div>

        {/* High Priority Exploration Zones Quick List */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-bold text-slate-900 text-sm">High Priority Target Zones</h3>
              <span className="text-xs text-emerald-700 font-extrabold">{highPriorityZones.length} Urgent</span>
            </div>

            <div className="mt-4 space-y-3">
              {zones.slice(0, 4).map((zone) => (
                <div
                  key={zone.id}
                  className="p-3 rounded-xl bg-slate-50 border border-slate-200 hover:border-emerald-300 transition-all flex items-center justify-between"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-slate-900">{zone.id}</span>
                      <span
                        className={`text-[9px] uppercase font-bold px-2 py-0.5 rounded text-white ${
                          zone.potential === 'VERY_HIGH'
                            ? 'bg-red-600'
                            : zone.potential === 'HIGH'
                            ? 'bg-orange-500'
                            : zone.potential === 'MODERATE'
                            ? 'bg-yellow-500'
                            : 'bg-emerald-600'
                        }`}
                      >
                        {zone.potential.replace('_', ' ')}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 truncate max-w-[170px] mt-0.5 font-medium">
                      {zone.name}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-base font-extrabold font-mono text-emerald-700">
                      {zone.score}%
                    </span>
                    <p className="text-[10px] text-slate-400 font-medium">Match</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <a
            href="/exploration"
            className="w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 border border-slate-200 text-slate-800 font-bold text-xs transition-colors flex items-center justify-center gap-2"
          >
            Open Full Prospectivity Analysis <ChevronRight className="h-4 w-4 text-emerald-600" />
          </a>
        </div>
      </div>

      {/* Production Forecast & Risk Drivers Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Production Forecast Chart */}
        <div className="lg:col-span-2 bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <Activity className="h-4 w-4 text-emerald-600" />
                Production Shortfall Forecast (Planned vs Predicted)
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                Weekly operational ore extraction trajectory in Tonnes
              </p>
            </div>
          </div>

          <div className="h-[250px] w-full pt-2">
            <RechartsResponsiveContainer width="100%" height="100%">
              <RechartsBarChart data={MOCK_MONTHLY_TREND} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <RechartsCartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <RechartsXAxis dataKey="date" stroke="#64748b" tick={{ fontSize: 11 }} />
                <RechartsYAxis stroke="#64748b" tick={{ fontSize: 11 }} />
                <RechartsTooltipComp
                  contentStyle={{ backgroundColor: '#ffffff', borderColor: '#cbd5e1', borderRadius: '8px', color: '#0f172a' }}
                />
                <RechartsLegend wrapperStyle={{ fontSize: '12px' }} />
                <RechartsBar dataKey="planned" name="Planned Tonnes" fill="#2563eb" radius={[4, 4, 0, 0]} />
                <RechartsBar dataKey="predicted" name="Predicted Tonnes" fill="#059669" radius={[4, 4, 0, 0]} />
                <RechartsBar dataKey="actual" name="Actual Tonnes" fill="#d97706" radius={[4, 4, 0, 0]} />
              </RechartsBarChart>
            </RechartsResponsiveContainer>
          </div>
        </div>

        {/* Risk Drivers Card */}
        <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-xs space-y-4">
          <div>
            <h3 className="font-bold text-slate-900 text-sm flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-orange-600" />
              AI Risk Drivers (SHAP Analysis)
            </h3>
            <p className="text-xs text-slate-500 font-medium">Primary operational constraints</p>
          </div>

          <div className="space-y-3 text-xs">
            {MOCK_RISK_DRIVERS.map((driver) => (
              <div key={driver.id} className="space-y-1">
                <div className="flex justify-between font-bold">
                  <span className="text-slate-800">{driver.name}</span>
                  <span className="font-mono font-extrabold text-orange-600">{driver.percentage}%</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                  <div
                    className="h-full bg-orange-500 rounded-full"
                    style={{ width: `${driver.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Compact AI Recommendation Card */}
      <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="h-10 w-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-xs">
            <BrainCircuit className="h-5 w-5" />
          </div>
          <div>
            <h4 className="font-extrabold text-slate-900 text-sm flex items-center gap-2">
              AI Recommendation Priority: Reassign Standby Equipment
            </h4>
            <p className="text-xs text-slate-700 font-medium mt-0.5 max-w-3xl leading-relaxed">
              Hydraulic excavator downtime at Face F02 reduced daily loading by 35%. Deploy 2 standby CAT excavators from Pit West depot to recover +85 Tonnes/day.
            </p>
          </div>
        </div>
        <a
          href="/production"
          className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-colors shrink-0 shadow-xs flex items-center gap-1.5"
        >
          View Full Mitigation Plan <ArrowUpRight className="h-4 w-4" />
        </a>
      </div>

      {/* Zone Detail Modal */}
      <ZoneDetailModal zone={selectedZone} onClose={() => setSelectedZone(null)} />
    </div>
  );
}
