import { Mine, MLProspectivityResponse } from '../types';
import { MOCK_MINES } from '../mock/mines';
import { predictProspectivity } from './mlService';

export async function getMinesList(): Promise<Mine[]> {
  return MOCK_MINES;
}

export async function getMineById(id: string): Promise<Mine | undefined> {
  return MOCK_MINES.find((m) => m.id === id) || MOCK_MINES[0];
}

export async function getProspectivityAnalysis(mineId: string): Promise<MLProspectivityResponse> {
  return await predictProspectivity(mineId);
}
