'use client';

import React, { useState } from 'react';
import CSVUploader from '@/components/production/CSVUploader';
import ProductionPipelineProgress from '@/components/production/ProductionPipelineProgress';
import { ProductionRecord, ProductionForecastSummary } from '@/lib/types';
import {
  MOCK_PRODUCTION_SUMMARY,
  MOCK_RISK_DRIVERS,
  MOCK_RECOMMENDATIONS,
  MOCK_MONTHLY_TREND,
} from '@/lib/mock/production';
import { processProductionData } from '@/lib/services/productionService';
import {
  TrendingDown,
  AlertTriangle,
  BarChart3,
  ShieldCheck,
  Zap,
  ShieldAlert,
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

export default function ProductionPage() {
  const [uploadedRecords, setUploadedRecords] = useState<ProductionRecord[]>([]);
  const [fileName, setFileName] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [modelReady, setModelReady] = useState(true);

  const [summary, setSummary] = useState<ProductionForecastSummary>(MOCK_PRODUCTION_SUMMARY);
  const [riskDrivers, setRiskDrivers] = useState(MOCK_RISK_DRIVERS);
  const [recommendations, setRecommendations] = useState(MOCK_RECOMMENDATIONS);

  const handleDataLoaded = (records: ProductionRecord[], name: string) => {
    setUploadedRecords(records);
    setFileName(name);
  };

  const handleStartProcess = () => {
    setIsProcessing(true);
    setModelReady(false);
  };

  const handlePipelineComplete = async () => {
    setIsProcessing(false);
    setModelReady(true);
    if (uploadedRecords.length > 0) {
      const result = await processProductionData(uploadedRecords);
      setSummary(result.summary);
      setRiskDrivers(result.riskDrivers);
      setRecommendations(result.recommendations);
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-12">
      {/* Title Banner */}
      <div className="bg-[#0c1222] border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/30 text-red-400 text-xs font-semibold mb-2">
            <TrendingDown className="h-3.5 w-3.5" /> Module 2 — Production Shortfall Intelligence
          </div>
          <h1 className="text-2xl font-extrabold text-slate-100">
            Production Shortfall Prediction
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            XGBoost regressor forecasting ore extraction bottlenecks driven by downtime, blasting delays, and weather constraints.
          </p>
        </div>

        {modelReady && (
          <div className="flex items-center gap-2 bg-emerald-950/40 border border-emerald-500/30 text-emerald-400 px-3.5 py-2 rounded-xl text-xs font-bold shadow-md">
            <ShieldCheck className="h-4 w-4" /> MODEL READY • XGBoost Inference Active
          </div>
        )}
      </div>

      {/* CSV File Upload Section */}
      <CSVUploader onDataLoaded={handleDataLoaded} onStartProcess={handleStartProcess} />

      {/* Processing Animation */}
      {isProcessing && (
        <ProductionPipelineProgress onComplete={handlePipelineComplete} />
      )}

      {/* Model Ready Metrics Cards */}
      {modelReady && !isProcessing && (
        <>
          {fileName && (
            <div className="text-xs font-medium text-emerald-400 bg-emerald-950/30 border border-emerald-500/30 px-3 py-1.5 rounded-lg w-fit">
              Active Dataset: {fileName} ({summary.periodLabel})
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {/* Planned */}
            <div className="bg-[#0c1222] border border-slate-800 rounded-xl p-4 shadow-xl">
              <p className="text-[11px] text-slate-400 font-medium uppercase">Planned Production</p>
              <p className="text-2xl font-extrabold text-slate-100 mt-1">
                {summary.plannedTotal.toLocaleString()} T
              </p>
              <p className="text-[10px] text-slate-500 mt-0.5">Quarterly Target</p>
            </div>

            {/* Predicted */}
            <div className="bg-[#0c1222] border border-slate-800 rounded-xl p-4 shadow-xl">
              <p className="text-[11px] text-slate-400 font-medium uppercase">Predicted Production</p>
              <p className="text-2xl font-extrabold text-emerald-400 mt-1">
                {summary.predictedTotal.toLocaleString()} T
              </p>
              <p className="text-[10px] text-slate-500 mt-0.5">XGBoost ML Forecast</p>
            </div>

            {/* Shortfall */}
            <div className="bg-[#0c1222] border border-slate-800 rounded-xl p-4 shadow-xl">
              <p className="text-[11px] text-slate-400 font-medium uppercase">Expected Shortfall</p>
              <p className="text-2xl font-extrabold text-orange-400 mt-1">
                {summary.expectedShortfall.toLocaleString()} T
              </p>
              <p className="text-[10px] text-orange-400/80 mt-0.5">{summary.shortfallPercentage}% Deficit</p>
            </div>

            {/* Probability */}
            <div className="bg-[#0c1222] border border-slate-800 rounded-xl p-4 shadow-xl">
              <p className="text-[11px] text-slate-400 font-medium uppercase">Shortfall Probability</p>
              <p className="text-2xl font-extrabold text-red-400 mt-1">
                {summary.shortfallProbability}%
              </p>
              <p className="text-[10px] text-slate-500 mt-0.5">Confidence: High</p>
            </div>

            {/* Risk Level */}
            <div className="bg-[#0c1222] border border-slate-800 rounded-xl p-4 shadow-xl flex flex-col justify-between">
              <p className="text-[11px] text-slate-400 font-medium uppercase">Risk Level</p>
              <div className="mt-1">
                <span
                  className={`inline-block px-3 py-1 rounded text-xs font-extrabold uppercase border ${
                    summary.riskLevel === 'HIGH' || summary.riskLevel === 'CRITICAL'
                      ? 'bg-red-500/20 text-red-400 border-red-500/40'
                      : summary.riskLevel === 'MEDIUM'
                      ? 'bg-yellow-500/20 text-yellow-400 border-yellow-500/40'
                      : 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                  }`}
                >
                  {summary.riskLevel} RISK
                </span>
              </div>
              <p className="text-[10px] text-slate-500 mt-1">Requires Mitigation</p>
            </div>
          </div>

          {/* Forecast Trend Chart */}
          <div className="bg-[#0c1222] border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-bold text-slate-100 text-sm flex items-center gap-2">
                  <BarChart3 className="h-4 w-4 text-emerald-400" />
                  Production Trajectory Comparison (Historical Actual vs Planned vs Predicted)
                </h3>
                <p className="text-xs text-slate-400">
                  Visualizing extraction deficits across operational shifts
                </p>
              </div>
            </div>

            <div className="h-[280px] w-full pt-2">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={MOCK_MONTHLY_TREND} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="date" stroke="#64748b" tick={{ fontSize: 11 }} />
                  <YAxis stroke="#64748b" tick={{ fontSize: 11 }} />
                  <RechartsTooltip
                    contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px' }}
                  />
                  <Legend wrapperStyle={{ fontSize: '12px' }} />
                  <Bar dataKey="planned" name="Planned Target (Tonnes)" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="predicted" name="Predicted Shortfall (Tonnes)" fill="#f97316" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="actual" name="Historical Actual (Tonnes)" fill="#10b981" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Root Cause Analysis (SHAP Feature Importance) */}
          <div className="bg-[#0c1222] border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
            <div>
              <h3 className="font-bold text-slate-100 text-base flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-orange-400" />
                Root Cause Analysis: Why is production at risk?
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                AI-Identified Risk Drivers calculated using SHAP feature attribution
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              {riskDrivers.map((driver) => (
                <div
                  key={driver.id}
                  className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-2 hover:border-slate-700 transition-colors"
                >
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span className="text-slate-100 text-sm">{driver.name}</span>
                    <span className="font-mono text-orange-400 text-sm">{driver.percentage}% Impact</span>
                  </div>

                  <div className="w-full h-2.5 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
                    <div
                      className="h-full bg-gradient-to-r from-orange-500 to-red-500 rounded-full"
                      style={{ width: `${driver.percentage}%` }}
                    />
                  </div>

                  <p className="text-xs text-slate-400 pt-1 leading-snug">{driver.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* AI Recommendation Engine */}
          <div className="bg-[#0c1222] border border-slate-800 rounded-2xl p-6 shadow-xl space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-extrabold uppercase px-2.5 py-0.5 rounded bg-red-500/20 text-red-400 border border-red-500/40">
                    HIGH SHORTFALL RISK DETECTED
                  </span>
                </div>
                <h3 className="font-extrabold text-slate-100 text-lg mt-1 flex items-center gap-2">
                  <Zap className="h-5 w-5 text-emerald-400" />
                  AI Recommended Corrective Actions
                </h3>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {recommendations.map((rec) => (
                <div
                  key={rec.id}
                  className="p-4 rounded-xl bg-slate-900/90 border border-emerald-500/30 space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-extrabold uppercase text-emerald-400 px-2 py-0.5 rounded bg-emerald-950 border border-emerald-500/40">
                        {rec.priority} PRIORITY
                      </span>
                      <span className="text-[11px] font-semibold text-slate-400">{rec.category}</span>
                    </div>

                    <h4 className="font-bold text-slate-100 text-sm leading-snug">{rec.title}</h4>
                    <p className="text-xs text-slate-300">
                      <strong>Reason:</strong> {rec.reason}
                    </p>
                    <p className="text-xs text-emerald-400 font-semibold">
                      <strong>Expected Impact:</strong> {rec.expectedImpact}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="p-3 rounded-lg bg-slate-950/60 border border-slate-800 flex items-center gap-2 text-[11px] text-slate-400">
              <ShieldAlert className="h-4 w-4 text-emerald-400 shrink-0" />
              <span>
                <strong>Note:</strong> Recommendations are decision-support suggestions and require human operational validation by MOIL mine engineers.
              </span>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
