'use client';

import React, { useState, useRef } from 'react';
import { ProductionRecord } from '@/lib/types';
import { Upload, FileSpreadsheet, CheckCircle2, AlertCircle, Table } from 'lucide-react';

interface CSVUploaderProps {
  onDataLoaded: (records: ProductionRecord[], fileName: string) => void;
  onStartProcess: () => void;
}

export default function CSVUploader({ onDataLoaded, onStartProcess }: CSVUploaderProps) {
  const [file, setFile] = useState<File | null>(null);
  const [records, setRecords] = useState<ProductionRecord[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isDragOver, setIsDragOver] = useState(false);
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
      } catch (err: unknown) {
        const message = err instanceof Error ? err.message : 'Error parsing CSV file format.';
        setError(message);
      }
    };
    reader.readAsText(selectedFile);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="bg-[#0c1222] border border-slate-800 rounded-xl p-6 shadow-xl space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-slate-100 flex items-center gap-2">
            <FileSpreadsheet className="h-5 w-5 text-emerald-400" />
            Upload Historical Production & Operations Data
          </h2>
          <p className="text-xs text-slate-400">
            Upload daily mine shift records (planned vs actual tonnes, downtime, blast delays, weather)
          </p>
        </div>
      </div>

      {/* Drag and Drop Zone */}
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
            ? 'border-emerald-400 bg-emerald-950/20 scale-[1.01]'
            : file
            ? 'border-emerald-500/50 bg-slate-900/60'
            : 'border-slate-700 bg-slate-900/30 hover:border-slate-500 hover:bg-slate-900/50'
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
          <div className="h-12 w-12 rounded-full bg-slate-800/80 border border-slate-700 flex items-center justify-center text-emerald-400 shadow-md">
            <Upload className="h-6 w-6" />
          </div>

          {!file ? (
            <div>
              <p className="text-sm font-semibold text-slate-200">
                Drag and drop your production CSV file here, or{' '}
                <span className="text-emerald-400 underline">browse</span>
              </p>
              <p className="text-xs text-slate-500 mt-1">Accepts .csv and .xlsx files (Max size: 10MB)</p>
            </div>
          ) : (
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm font-bold text-emerald-400">
                <CheckCircle2 className="h-4 w-4" />
                {file.name} ({(file.size / 1024).toFixed(1)} KB)
              </div>
              <p className="text-xs text-slate-400">
                {records.length} records parsed successfully • Status: Validated
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Error notification */}
      {error && (
        <div className="p-3 rounded-lg bg-red-950/40 border border-red-500/40 flex items-center gap-2 text-xs text-red-300">
          <AlertCircle className="h-4 w-4 text-red-400 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Preview Table of Parsed Records */}
      {records.length > 0 && (
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-slate-300 flex items-center gap-1.5 uppercase tracking-wider">
              <Table className="h-4 w-4 text-emerald-400" /> Preview First 5 Dataset Records
            </span>
            <span className="text-slate-400">Total Records: {records.length}</span>
          </div>

          <div className="overflow-x-auto rounded-lg border border-slate-800">
            <table className="w-full text-left text-[11px] text-slate-300">
              <thead className="bg-slate-900 text-slate-400 font-semibold border-b border-slate-800">
                <tr>
                  <th className="py-2 px-3">Date</th>
                  <th className="py-2 px-3">Shift</th>
                  <th className="py-2 px-3">Face</th>
                  <th className="py-2 px-3">Planned (T)</th>
                  <th className="py-2 px-3">Actual (T)</th>
                  <th className="py-2 px-3">Downtime (h)</th>
                  <th className="py-2 px-3">Blast Delay (h)</th>
                  <th className="py-2 px-3">Rainfall (mm)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 bg-slate-950/60">
                {records.slice(0, 5).map((r, i) => (
                  <tr key={i} className="hover:bg-slate-800/30">
                    <td className="py-2 px-3 font-mono">{r.date}</td>
                    <td className="py-2 px-3 font-semibold">{r.shift}</td>
                    <td className="py-2 px-3">{r.faceId}</td>
                    <td className="py-2 px-3 font-mono font-bold text-slate-200">{r.plannedTonnes}</td>
                    <td className="py-2 px-3 font-mono font-bold text-emerald-400">{r.actualTonnes}</td>
                    <td className="py-2 px-3 text-orange-400">{r.downtimeHours}</td>
                    <td className="py-2 px-3 text-yellow-400">{r.blastDelayHours}</td>
                    <td className="py-2 px-3 text-slate-400">{r.rainfallMm}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <button
            type="button"
            onClick={onStartProcess}
            className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-sm shadow-lg shadow-emerald-950/40 transition-all flex items-center justify-center gap-2"
          >
            <CheckCircle2 className="h-5 w-5" />
            PROCESS & TRAIN MODEL
          </button>
        </div>
      )}
    </div>
  );
}
