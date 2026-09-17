export type PotentialLevel = 'LOW' | 'MODERATE' | 'HIGH' | 'VERY_HIGH';
export type PriorityLevel = 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
export type RiskLevel = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';

export interface Mine {
  id: string;
  name: string;
  district: string;
  state: string;
  latitude: number;
  longitude: number;
  area: number; // sq km
  depositType?: string;
  estimatedProspectivityScore?: number;
  highPotentialZonesCount?: number;
  totalEstimatedOreTonnes?: number;
}

export interface IndicatorScore {
  geologicalMatch: number; // 0 - 100
  structuralProximity: number; // 0 - 100
  terrainMatch: number; // 0 - 100
  spectralSignature: number; // 0 - 100
}

export interface ProspectivityZone {
  id: string;
  name: string;
  mineId: string;
  score: number; // Percentage (e.g. 91)
  probability: number; // Decimal (e.g. 0.91)
  confidence: number; // Percentage (e.g. 87)
  potential: PotentialLevel;
  priority: PriorityLevel;
  geometry: {
    type: 'Polygon';
    coordinates: [number, number][]; // Lat, Lng points for polygon
  };
  center: [number, number];
  indicators: IndicatorScore;
  recommendedAction: string;
  areaHectares: number;
  estimatedOreTonnes: number; // Estimated ore extraction potential in Tonnes
  estimatedGradeMn: number; // Estimated Manganese Ore Grade (% Mn)
}

export interface ProductionRecord {
  date: string;
  shift: string;
  mineId: string;
  faceId: string;
  plannedTonnes: number;
  actualTonnes: number;
  predictedTonnes?: number;
  oreGrade: number;
  stockpileTonnes: number;
  operatingHours: number;
  downtimeHours: number;
  downtimeReason: string;
  availability: number;
  blastDelayHours: number;
  blastStatus: string;
  rainfallMm: number;
  soilMoisture: number;
  landTemperature: number;
  haulRoadCondition: string;
}

export interface ProductionForecastSummary {
  plannedTotal: number;
  predictedTotal: number;
  actualTotal?: number;
  expectedShortfall: number;
  shortfallPercentage: number;
  shortfallProbability: number;
  riskLevel: RiskLevel;
  periodLabel: string;
}

export interface RiskDriver {
  id: string;
  name: string;
  percentage: number;
  description: string;
  impactScore: number;
  trend: 'UP' | 'DOWN' | 'STABLE';
}

export interface Recommendation {
  id: string;
  title: string;
  priority: PriorityLevel;
  reason: string;
  expectedImpact: string;
  category: 'EQUIPMENT' | 'BLASTING' | 'WEATHER' | 'STOCKPILE' | 'EXPLORATION';
  actionableSteps: string[];
}

export interface EarthEngineFeatureResponse {
  mineId: string;
  ndviAverage: number;
  soilMoistureIndex: number;
  surfaceTemperatureCelsius: number;
  spectralBand7_4Ratio: number;
  elevationSlopeMeanDegrees: number;
  lastSatellitePassDate: string;
}

export interface MLProspectivityResponse {
  mineId: string;
  overallScore: number;
  zones: ProspectivityZone[];
  modelConfidence: number;
  featureImportance: Record<string, number>;
}
