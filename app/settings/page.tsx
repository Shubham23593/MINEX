'use client';

import React from 'react';
import {
  Settings,
  Database,
  Satellite,
  Cpu,
  Code2,
} from 'lucide-react';

export default function SettingsPage() {
  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Page Title */}
      <div className="bg-[#0c1222] border border-slate-800 rounded-2xl p-6 shadow-xl space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 text-slate-300 text-xs font-semibold">
          <Settings className="h-3.5 w-3.5 text-emerald-400" /> System Integration Architecture
        </div>
        <h1 className="text-2xl font-extrabold text-slate-100">
          System Settings & API Integrations
        </h1>
        <p className="text-xs text-slate-400 max-w-3xl">
          Modular architecture configuration for Google Earth Engine, Python XGBoost ML FastAPI backend, and PostgreSQL/PostGIS databases.
        </p>
      </div>

      {/* Integration Status Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Google Earth Engine */}
        <div className="bg-[#0c1222] border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400">
                <Satellite className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-100 text-sm">Google Earth Engine</h3>
                <p className="text-[11px] text-slate-400">Sentinel-2 & SRTM DEM</p>
              </div>
            </div>
            <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
              Mock Service Ready
            </span>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            Placeholder service implemented in <code className="text-emerald-400 font-mono bg-slate-900 px-1 py-0.5 rounded">lib/services/earthEngineService.ts</code>. Ready for GEE Service Account credentials.
          </p>

          <div className="pt-2 border-t border-slate-800 space-y-1.5 text-xs text-slate-400">
            <div className="flex justify-between">
              <span>Sentinel-2 Bands:</span>
              <span className="font-mono text-slate-200">B2, B3, B4, B8, B11, B12</span>
            </div>
            <div className="flex justify-between">
              <span>DEM Elevation:</span>
              <span className="font-mono text-slate-200">SRTM 30m Global</span>
            </div>
          </div>
        </div>

        {/* Python ML Backend */}
        <div className="bg-[#0c1222] border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                <Cpu className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-100 text-sm">Python XGBoost Backend</h3>
                <p className="text-[11px] text-slate-400">FastAPI ML & SHAP</p>
              </div>
            </div>
            <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
              Mock Service Ready
            </span>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            Placeholder service implemented in <code className="text-emerald-400 font-mono bg-slate-900 px-1 py-0.5 rounded">lib/services/mlService.ts</code>. Ready to connect to FastAPI REST endpoint.
          </p>

          <div className="pt-2 border-t border-slate-800 space-y-1.5 text-xs text-slate-400">
            <div className="flex justify-between">
              <span>Classifier:</span>
              <span className="font-mono text-slate-200">XGBoost v2.0</span>
            </div>
            <div className="flex justify-between">
              <span>Explainability:</span>
              <span className="font-mono text-slate-200">SHAP TreeExplainer</span>
            </div>
          </div>
        </div>

        {/* PostGIS Database */}
        <div className="bg-[#0c1222] border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
                <Database className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-bold text-slate-100 text-sm">PostgreSQL / PostGIS</h3>
                <p className="text-[11px] text-slate-400">Spatial Vector Store</p>
              </div>
            </div>
            <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">
              Mock Service Ready
            </span>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed">
            Local database layer implemented in <code className="text-emerald-400 font-mono bg-slate-900 px-1 py-0.5 rounded">lib/mock/mines.ts</code> & <code className="text-emerald-400 font-mono bg-slate-900 px-1 py-0.5 rounded">prospectivity.ts</code>.
          </p>

          <div className="pt-2 border-t border-slate-800 space-y-1.5 text-xs text-slate-400">
            <div className="flex justify-between">
              <span>Spatial DB:</span>
              <span className="font-mono text-slate-200">PostGIS 3.4</span>
            </div>
            <div className="flex justify-between">
              <span>Geometry:</span>
              <span className="font-mono text-slate-200">EPSG:4326 (WGS84)</span>
            </div>
          </div>
        </div>
      </div>

      {/* Code Architecture Mapping Card */}
      <div className="bg-[#0c1222] border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <h2 className="font-bold text-slate-100 text-base flex items-center gap-2">
          <Code2 className="h-5 w-5 text-emerald-400" />
          Production Deployment & Future Integration Roadmap
        </h2>

        <div className="space-y-3 text-xs">
          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
            <h4 className="font-bold text-slate-100 text-sm">1. Connecting Google Earth Engine (GEE)</h4>
            <p className="text-slate-300">
              Replace mock functions in <code className="text-emerald-400 font-mono bg-slate-950 px-1.5 py-0.5 rounded">lib/services/earthEngineService.ts</code> with calls to official Python GEE API (`earthengine-api`) or Node.js serverless wrapper using Google Cloud Service Account JWT.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
            <h4 className="font-bold text-slate-100 text-sm">2. Connecting Real XGBoost ML Backend</h4>
            <p className="text-slate-300">
              Update endpoint URLs in <code className="text-emerald-400 font-mono bg-slate-950 px-1.5 py-0.5 rounded">lib/services/mlService.ts</code> to point to your deployed Python FastAPI service (`https://api.minex.moil.gov.in/v1/predict`).
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
            <h4 className="font-bold text-slate-100 text-sm">3. Connecting PostgreSQL & PostGIS</h4>
            <p className="text-slate-300">
              Replace static JSON mock responses in <code className="text-emerald-400 font-mono bg-slate-950 px-1.5 py-0.5 rounded">app/api/mines/route.ts</code> and <code className="text-emerald-400 font-mono bg-slate-950 px-1.5 py-0.5 rounded">app/api/prospectivity/route.ts</code> with Prisma ORM or `pg-promise` PostGIS spatial queries (`ST_AsGeoJSON`).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
