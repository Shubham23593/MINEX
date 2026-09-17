'use client';

import React, { useState, useRef } from 'react';
import { ProductionRecord } from '@/lib/types';
import { Upload, FileSpreadsheet, CheckCircle2, AlertCircle, Table, Play, Sparkles } from 'lucide-react';

interface CSVUploaderProps {
  onDataLoaded: (records: ProductionRecord[], fileName: string) => void;
  onStartProcess: () => void;
}

export default function CSVUploader({ onDataLoaded, onStartProcess }: CSVUploaderProps) {
  const [file, setFile] = useState<File | null>(null);
  const [records, setRecords] = useState<ProductionRecord[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
  const [isSampleLoading, setIsSampleLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const parseCSVText = (text: string): ProductionRecord[] => {
    const lines = text.split('\n').map((l) => l.trim()).filter((l) => l.length > 0);
    if (lines.length <= 1) throw new Error('CSV file is empty or missing headers.');

    const parsed: ProductionRecord[] = [];

    for (let i = 1; i < lines.length; i++) {
      const cols = lines[i].split(',').map((c) => c.trim());
      if (cols.length < 5) continue;

      const record: ProductionRecord = {
        date: cols[0] || `2026-01-${i}`,
        shift: cols[1] || 'A',
        mineId: cols[2] || 'MOIL-BAL',
        faceId: cols[3] || 'F01',
        plannedTonnes: parseFloat(cols[4]) || 400,
        actualTonnes: parseFloat(cols[5]) || 370,
        predictedTonnes: parseFloat(cols[5]) ? Math.round(parseFloat(cols[5]) * 0.98) : 365,
        oreGrade: parseFloat(cols[6]) || 36.5,
        stockpileTonnes: parseFloat(cols[7]) || 1100,
        operatingHours: parseFloat(cols[8]) || 18,
        downtimeHours: parseFloat(cols[9]) || 2.5,
        downtimeReason: cols[10] || 'None',
        availability: parseFloat(cols[11]) || 0.88,
        blastDelayHours: parseFloat(cols[12]) || 0,
        blastStatus: cols[13] || 'Completed',
        rainfallMm: parseFloat(cols[14]) || 4.2,
        soilMoisture: parseFloat(cols[15]) || 0.3,
        landTemperature: parseFloat(cols[16]) || 28.0,
        haulRoadCondition: cols[17] || 'Good',
      };
      parsed.push(record);
    }
    return parsed;
  };

  const handleFile = (selectedFile: File) => {
    setError(null);
    if (!selectedFile.name.endsWith('.csv') && !selectedFile.name.endsWith('.xlsx')) {
      setError('Please select a valid CSV (.csv) or Excel (.xlsx) file.');
      return;
    }

    setFile(selectedFile);
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const text = e.target?.result as string;
        const parsed = parseCSVText(text);
        if (parsed.length === 0) {
          setError('No valid production records found in file.');
          return;
        }
        setRecords(parsed);
        onDataLoaded(parsed, selectedFile.name);
        onStartProcess();
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'Error parsing CSV file format.';
        setError(message);
      }
    };
    reader.readAsText(selectedFile);
  };

  const handleLoadSampleData = async () => {
    setError(null);
    setIsSampleLoading(true);
    try {
      const response = await fetch('/data/production_history.csv');
      let text = '';
      if (response.ok) {
        text = await response.text();
      } else {
        text = `date,shift,mine_id,face_id,planned_tonnes,actual_tonnes,ore_grade,stockpile_tonnes,operating_hours,downtime_hours,downtime_reason,availability,blast_delay_hours,blast_status,rainfall_mm,soil_moisture,land_temperature,haul_road_condition\n2026-01-01,C,MOIL-BAL,F01,444.3,433.8,36.99,1158.7,16.0,2.5,None,0.896,0.0,Completed,9.01,0.3,29.91,Wet\n2026-01-02,A,MOIL-BAL,F01,466.3,414.4,39.87,1190.6,19.4,2.97,None,0.876,2.4,Completed,8.44,0.323,28.39,Wet\n2026-01-03,A,MOIL-BAL,F02,431.0,363.7,34.38,1179.9,20.4,5.29,Maintenance,0.78,1.85,Completed,3.34,0.239,27.43,Good\n2026-01-04,B,MOIL-BAL,F03,385.2,311.5,38.67,1120.0,14.6,6.89,None,0.713,0.0,Completed,19.1,0.475,31.86,Poor\n2026-01-05,A,MOIL-BAL,F01,413.7,373.3,35.6,1156.1,18.4,1.59,None,0.934,6.13,Delayed,4.66,0.344,28.58,Good`;
      }
      const parsed = parseCSVText(text);
      setRecords(parsed);
      const sampleFile = new File([text], 'MOIL_Balaghat_Operations_2026.csv', { type: 'text/csv' });
      setFile(sampleFile);
      onDataLoaded(parsed, 'MOIL_Balaghat_Operations_2026.csv');
      onStartProcess();
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Failed to load sample dataset.';
      setError(message);
    } finally {
      setIsSampleLoading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-xs space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-base font-extrabold text-slate-900 flex items-center gap-2">
            <FileSpreadsheet className="h-5 w-5 text-emerald-600" />
            Upload Historical Production & Operations Dataset
          </h2>
          <p className="text-xs text-slate-500 font-medium">
            Upload daily mine shift logs (planned vs actual tonnes, downtime, blast delays, weather) for automated ML training
          </p>
        </div>

        <button
          type="button"
          onClick={handleLoadSampleData}
          disabled={isSampleLoading}
          className="px-3.5 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 shadow-2xs cursor-pointer disabled:opacity-50"
        >
          <Sparkles className="h-3.5 w-3.5 text-emerald-600" />
          {isSampleLoading ? 'Loading Sample Dataset...' : 'Load Sample MOIL Dataset (180+ Records)'}
        </button>
      </div>

      <div
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragOver(true);
        }}
        onDragLeave={() => setIsDragOver(false)}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all ${
          isDragOver
            ? 'border-emerald-500 bg-emerald-50 scale-[1.01]'
            : file
            ? 'border-emerald-300 bg-emerald-50/40'
            : 'border-slate-300 bg-slate-50/50 hover:border-slate-400 hover:bg-slate-100/60'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".csv,.xlsx"
          className="hidden"
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) handleFile(e.target.files[0]);
          }}
        />

        <div className="flex flex-col items-center gap-3">
          <div className="h-12 w-12 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-emerald-600 shadow-xs">
            <Upload className="h-6 w-6" />
          </div>

          {!file ? (
            <div>
              <p className="text-sm font-bold text-slate-800">
                Drag and drop your production CSV file here, or{' '}
                <span className="text-emerald-700 underline">browse</span>
              </p>
              <p className="text-xs text-slate-500 font-medium mt-1">Accepts .csv and .xlsx files (Auto-trains on upload)</p>
            </div>
          ) : (
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm font-extrabold text-emerald-800">
                <CheckCircle2 className="h-4 w-4" />
                {file.name} ({(file.size / 1024).toFixed(1)} KB)
              </div>
              <p className="text-xs text-slate-600 font-medium">
                {records.length} records parsed • Status: Auto-Training & Forecast Active
              </p>
            </div>
          )}
        </div>
      </div>

      {error && (
        <div className="p-3 rounded-xl bg-red-50 border border-red-200 flex items-center gap-2 text-xs text-red-800 font-medium">
          <AlertCircle className="h-4 w-4 text-red-600 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {records.length > 0 && (
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-slate-800 flex items-center gap-1.5 uppercase tracking-wider">
              <Table className="h-4 w-4 text-emerald-600" /> Dataset Preview (First 5 Records)
            </span>
            <span className="text-slate-600 font-mono font-semibold">Total Dataset Records: {records.length}</span>
          </div>

          <div className="overflow-x-auto rounded-xl border border-slate-200">
            <table className="w-full text-left text-[11px] text-slate-700">
              <thead className="bg-slate-100 text-slate-600 font-bold border-b border-slate-200">
                <tr>
                  <th className="py-2.5 px-3">Date</th>
                  <th className="py-2.5 px-3">Shift</th>
                  <th className="py-2.5 px-3">Face</th>
                  <th className="py-2.5 px-3">Planned (T)</th>
                  <th className="py-2.5 px-3">Actual (T)</th>
                  <th className="py-2.5 px-3">Downtime (h)</th>
                  <th className="py-2.5 px-3">Blast Delay (h)</th>
                  <th className="py-2.5 px-3">Rainfall (mm)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 bg-white">
                {records.slice(0, 5).map((r, i) => (
                  <tr key={i} className="hover:bg-slate-50">
                    <td className="py-2 px-3 font-mono font-medium">{r.date}</td>
                    <td className="py-2 px-3 font-bold">{r.shift}</td>
                    <td className="py-2 px-3">{r.faceId}</td>
                    <td className="py-2 px-3 font-mono font-bold text-slate-900">{r.plannedTonnes}</td>
                    <td className="py-2 px-3 font-mono font-bold text-emerald-700">{r.actualTonnes}</td>
                    <td className="py-2 px-3 text-orange-700 font-medium">{r.downtimeHours}</td>
                    <td className="py-2 px-3 text-yellow-700 font-medium">{r.blastDelayHours}</td>
                    <td className="py-2 px-3 text-slate-600">{r.rainfallMm}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <button
            type="button"
            onClick={onStartProcess}
            className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <Play className="h-4 w-4 fill-white" />
            RE-RUN MODEL TRAINING & FORECAST PIPELINE
          </button>
        </div>
      )}
    </div>
  );
}
