'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Loader2, Upload, FileCheck, Cpu, BarChart3, ShieldCheck } from 'lucide-react';

const PRODUCTION_STAGES = [
  { id: 1, name: 'Uploading Historical Data', icon: Upload, duration: 400 },
  { id: 2, name: 'Validating Records & Schema', icon: FileCheck, duration: 500 },
  { id: 3, name: 'Preprocessing & Cleaning Outliers', icon: Cpu, duration: 600 },
  { id: 4, name: 'Feature Engineering (Downtime, Blast, Weather)', icon: BarChart3, duration: 700 },
  { id: 5, name: 'Training XGBoost Regressor', icon: Cpu, duration: 800 },
  { id: 6, name: 'Generating Shortfall Forecast & SHAP Values', icon: ShieldCheck, duration: 500 },
];

interface ProductionPipelineProgressProps {
  onComplete: () => void;
}

export default function ProductionPipelineProgress({ onComplete }: ProductionPipelineProgressProps) {
  const [currentStage, setCurrentStage] = useState(0);

  useEffect(() => {
    if (currentStage < PRODUCTION_STAGES.length) {
      const timer = setTimeout(() => {
        setCurrentStage((prev) => prev + 1);
      }, PRODUCTION_STAGES[currentStage].duration);
      return () => clearTimeout(timer);
    } else {
      onComplete();
    }
  }, [currentStage, onComplete]);

  const progressPercent = Math.min(
    100,
    Math.round((currentStage / PRODUCTION_STAGES.length) * 100)
  );

  return (
    <div className="bg-white border border-emerald-300 rounded-xl p-6 shadow-md space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
            <Cpu className="h-5 w-5 text-emerald-600 animate-spin" />
            Training ML Shortfall Prediction Model...
          </h3>
          <p className="text-xs text-slate-500 font-medium">
            Analyzing shift downtime logs, blasting latencies, monsoonal rainfall, and ROM stockpile levels
          </p>
        </div>
        <span className="text-lg font-mono font-extrabold text-emerald-700">
          {progressPercent}%
        </span>
      </div>

      <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200">
        <motion.div
          className="h-full bg-emerald-600 rounded-full"
          initial={{ width: '0%' }}
          animate={{ width: `${progressPercent}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2">
        {PRODUCTION_STAGES.map((stage, idx) => {
          const isDone = idx < currentStage;
          const isCurrent = idx === currentStage;
          const Icon = stage.icon;

          return (
            <div
              key={stage.id}
              className={`p-3 rounded-xl border flex items-center gap-3 transition-all ${
                isDone
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-900 font-semibold'
                  : isCurrent
                  ? 'bg-slate-50 border-emerald-500 text-slate-900 font-bold ring-2 ring-emerald-500/20'
                  : 'bg-slate-50 border-slate-200 text-slate-400 font-medium'
              }`}
            >
              {isDone ? (
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
              ) : isCurrent ? (
                <Loader2 className="h-4 w-4 text-emerald-600 animate-spin shrink-0" />
              ) : (
                <Icon className="h-4 w-4 text-slate-400 shrink-0" />
              )}
              <span className="text-xs">{stage.name}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
