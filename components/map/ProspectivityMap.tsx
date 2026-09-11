'use client';

import React, { useEffect, useState } from 'react';
import {
  MapContainer,
  TileLayer,
  Polygon,
  Popup,
  Tooltip,
  useMap,
} from 'react-leaflet';
import { Mine, ProspectivityZone, PotentialLevel } from '@/lib/types';
import { Layers, Eye, MapPin } from 'lucide-react';

const POTENTIAL_COLORS: Record<PotentialLevel, { fill: string; stroke: string; text: string }> = {
  LOW: { fill: '#10b981', stroke: '#059669', text: 'Low Potential' },
  MODERATE: { fill: '#eab308', stroke: '#ca8a04', text: 'Moderate Potential' },
  HIGH: { fill: '#f97316', stroke: '#ea580c', text: 'High Potential' },
  VERY_HIGH: { fill: '#ef4444', stroke: '#dc2626', text: 'Very High Potential' },
};

function MapRecenter({ center, zoom }: { center: [number, number]; zoom: number }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, zoom);
  }, [center, zoom, map]);
  return null;
}

interface ProspectivityMapProps {
  mine: Mine;
  zones: ProspectivityZone[];
  selectedZoneId?: string | null;
  onSelectZone?: (zone: ProspectivityZone) => void;
  showHeatmapOverlay?: boolean;
}

export default function ProspectivityMap({
  mine,
  zones,
  selectedZoneId,
  onSelectZone,
  showHeatmapOverlay = false,
}: ProspectivityMapProps) {
  const [mapTileStyle, setMapTileStyle] = useState<'dark' | 'satellite'>('dark');
  const mineCenter: [number, number] = [mine.latitude, mine.longitude];

  const mineBoundary: [number, number][] = [
    [mine.latitude + 0.012, mine.longitude - 0.02],
    [mine.latitude + 0.015, mine.longitude + 0.022],
    [mine.latitude - 0.014, mine.longitude + 0.024],
    [mine.latitude - 0.015, mine.longitude - 0.018],
  ];

  return (
    <div className="relative w-full h-full min-h-[420px] rounded-xl overflow-hidden border border-slate-800 shadow-2xl bg-slate-950 flex flex-col">
      <MapContainer
        center={mineCenter}
        zoom={13}
        scrollWheelZoom={true}
        className="w-full h-full z-10"
      >
        <MapRecenter center={mineCenter} zoom={13} />

        {mapTileStyle === 'dark' ? (
          <TileLayer
            attribution='&copy; <a href="https://carto.com/">CARTO</a>'
            url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          />
        ) : (
          <TileLayer
            attribution='&copy; <a href="https://www.esri.com/">Esri</a>'
            url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
          />
        )}

        <Polygon
          positions={mineBoundary}
          pathOptions={{
            color: '#10b981',
            weight: 2,
            dashArray: '6, 6',
            fillColor: '#10b981',
            fillOpacity: 0.04,
          }}
        >
          <Tooltip sticky>
            <div className="text-xs font-semibold text-emerald-400">
              {mine.name} AOI Boundary ({mine.area} km²)
            </div>
          </Tooltip>
        </Polygon>

        {zones.map((zone) => {
          const style = POTENTIAL_COLORS[zone.potential];
          const isSelected = selectedZoneId === zone.id;

          return (
            <Polygon
              key={zone.id}
              positions={zone.geometry.coordinates}
              pathOptions={{
                color: isSelected ? '#ffffff' : style.stroke,
                weight: isSelected ? 3 : 2,
                fillColor: style.fill,
                fillOpacity: showHeatmapOverlay ? 0.65 : 0.4,
              }}
              eventHandlers={{
                click: () => {
                  if (onSelectZone) onSelectZone(zone);
                },
              }}
            >
              <Popup>
                <div className="p-1 min-w-[200px]">
                  <div className="flex items-center justify-between gap-2 border-b border-slate-800 pb-1.5 mb-2">
                    <span className="font-bold text-sm text-slate-100">{zone.name}</span>
                    <span
                      className="text-[10px] uppercase font-bold px-2 py-0.5 rounded text-white"
                      style={{ backgroundColor: style.fill }}
                    >
                      {zone.potential.replace('_', ' ')}
                    </span>
                  </div>
                  <div className="space-y-1 text-xs text-slate-300">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Prospectivity Score:</span>
                      <span className="font-semibold text-emerald-400">{zone.score}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Confidence:</span>
                      <span className="font-semibold text-slate-200">{zone.confidence}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Priority:</span>
                      <span className="font-semibold text-orange-400">{zone.priority}</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => onSelectZone && onSelectZone(zone)}
                    className="mt-3 w-full py-1 px-2 text-xs font-semibold rounded bg-emerald-600 hover:bg-emerald-500 text-white transition-colors flex items-center justify-center gap-1"
                  >
                    <Eye className="h-3 w-3" /> Inspect Zone Indicators
                  </button>
                </div>
              </Popup>
            </Polygon>
          );
        })}
      </MapContainer>

      <div className="absolute top-4 right-4 z-20 flex items-center gap-2 bg-slate-900/90 backdrop-blur-md p-1.5 rounded-lg border border-slate-800 shadow-lg text-xs">
        <button
          type="button"
          onClick={() => setMapTileStyle(mapTileStyle === 'dark' ? 'satellite' : 'dark')}
          className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md font-medium transition-all ${
            mapTileStyle === 'dark'
              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
              : 'bg-slate-800 text-slate-300 hover:text-white'
          }`}
        >
          <Layers className="h-3.5 w-3.5" />
          {mapTileStyle === 'dark' ? 'GIS Dark' : 'Satellite Imagery'}
        </button>
      </div>

      <div className="absolute bottom-4 left-4 z-20 bg-slate-900/90 backdrop-blur-md px-3 py-2.5 rounded-lg border border-slate-800/90 shadow-xl text-xs space-y-2">
        <div className="font-semibold text-slate-300 flex items-center gap-1.5 text-[11px] uppercase tracking-wider">
          <MapPin className="h-3.5 w-3.5 text-emerald-400" /> Prospectivity Legend
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px]">
          <div className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-sm bg-[#10b981] border border-emerald-400" />
            <span className="text-slate-300 font-medium">LOW (&lt;50%)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-sm bg-[#eab308] border border-yellow-400" />
            <span className="text-slate-300 font-medium">MODERATE (50-70%)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-sm bg-[#f97316] border border-orange-400" />
            <span className="text-slate-300 font-medium">HIGH (70-85%)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-3 w-3 rounded-sm bg-[#ef4444] border border-red-400" />
            <span className="text-slate-300 font-medium">VERY HIGH (&gt;85%)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
