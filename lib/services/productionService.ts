import {
  ProductionRecord,
  ProductionForecastSummary,
  RiskDriver,
  Recommendation,
} from '../types';
import { predictProduction, getRiskDrivers, getRecommendations } from './mlService';

export async function processProductionData(records: ProductionRecord[]): Promise<{
  summary: ProductionForecastSummary;
  riskDrivers: RiskDriver[];
  recommendations: Recommendation[];
}> {
  const summary = await predictProduction(records);
  const riskDrivers = await getRiskDrivers(records);
  const recommendations = await getRecommendations(records);

  return {
    summary,
    riskDrivers,
    recommendations,
  };
}
