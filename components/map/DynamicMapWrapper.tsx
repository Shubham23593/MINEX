'use client';

import dynamic from 'next/dynamic';
import React from 'react';
import { Mine, ProspectivityZone } from '@/lib/types';

const ProspectivityMap = dynamic(() => import('./ProspectivityMap'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full min-h-[420px] rounded-xl bg-slate-900/60 border border-slate-800 flex flex-col items-center justify-center gap-3 text-slate-400">
      <div className="h-8 w-8 rounded-full border-2 border-emerald-500 border-t-transparent animate-spin" />
      <p className="text-xs font-semibold text-slate-300">Loading GIS Map Layer & Satellite Tiles...</p>
    </div>
  ),
});

interface DynamicMapWrapperProps {
  mine: Mine;
  zones: ProspectivityZone[];
  selectedZoneId?: string | null;
  onSelectZone?: (zone: ProspectivityZone) => void;
  showHeatmapOverlay?: boolean;
}

export default function DynamicMapWrapper(props: DynamicMapWrapperProps) {
  return <ProspectivityMap {...props} />;
}
