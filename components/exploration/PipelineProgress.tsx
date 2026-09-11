'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Loader2, Satellite, Database, Cpu, Map, Layers } from 'lucide-react';

const PIPELINE_STAGES = [
  { id: 1, name: 'Loading Mine Data', icon: Database, duration: 400 },
  { id: 2, name: 'Preparing AOI Boundary', icon: Layers, duration: 500 },
  { id: 3, name: 'Processing Satellite Features (Sentinel-2)', icon: Satellite, duration: 700 },
  { id: 4, name: 'Extracting DEM Terrain Features', icon: Map, duration: 600 },
  { id: 5, name: 'Running XGBoost Prospectivity Model', icon: Cpu, duration: 800 },
  { id: 6, name: 'Generating Prospectivity GIS Overlay', icon: CheckCircle2, duration: 400 },
];

interface PipelineProgressProps {
  onComplete: () => void;
}

export default function PipelineProgress({ onComplete }: PipelineProgressProps) {
  const [currentStage, setCurrentStage] = useState(0);

  useEffect(() => {
    if (currentStage < PIPELINE_STAGES.length) {
      const timer = setTimeout(() => {
        setCurrentStage((prev) => prev + 1);
      }, PIPELINE_STAGES[currentStage].duration);
      return () => clearTimeout(timer);
    } else {
      onComplete();
    }
  }, [currentStage, onComplete]);

  const progressPercent = Math.min(
    100,
    Math.round((currentStage / PIPELINE_STAGES.length) * 100)
  );

  return (
    <div className="bg-slate-900/90 border border-emerald-500/30 rounded-xl p-6 shadow-2xl backdrop-blur-md space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-slate-100 flex items-center gap-2">
            <Cpu className="h-5 w-5 text-emerald-400 animate-spin" />
            Executing Satellite & ML Prospectivity Pipeline...
          </h3>
          <p className="text-xs text-slate-400">
            Synthesizing multispectral bands, structural geology, and SRTM DEM terrain features
          </p>
        </div>
        <span className="text-lg font-mono font-extrabold text-emerald-400">
          {progressPercent}%
        </span>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden p-0.5 border border-slate-700">
        <motion.div
          className="h-full bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-300 rounded-full"
          initial={{ width: '0%' }}
          animate={{ width: `${progressPercent}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      {/* Stages Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
        {PIPELINE_STAGES.map((stage, idx) => {
          const isDone = idx < currentStage;
          const isCurrent = idx === currentStage;
          const Icon = stage.icon;

          return (
            <div
              key={stage.id}
              className={`p-3 rounded-lg border flex items-center gap-3 transition-all ${
                isDone
                  ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-300'
                  : isCurrent
                  ? 'bg-slate-800/80 border-emerald-400 text-slate-100 ring-1 ring-emerald-400/50'
                  : 'bg-slate-950/50 border-slate-800/80 text-slate-500'
              }`}
            >
              {isDone ? (
                <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
              ) : isCurrent ? (
                <Loader2 className="h-4 w-4 text-emerald-400 animate-spin shrink-0" />
              ) : (
                <Icon className="h-4 w-4 text-slate-600 shrink-0" />
              )}
              <span className="text-xs font-semibold">{stage.name}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
