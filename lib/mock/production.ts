import {
  ProductionForecastSummary,
  RiskDriver,
  Recommendation,
} from '../types';

export const MOCK_PRODUCTION_SUMMARY: ProductionForecastSummary = {
  plannedTotal: 1250,
  predictedTotal: 1075,
  actualTotal: 1040,
  expectedShortfall: 175,
  shortfallPercentage: 14.0,
  shortfallProbability: 78,
  riskLevel: 'HIGH',
  periodLabel: 'Current Operational Quarter (Q3 2026)',
};

export const MOCK_RISK_DRIVERS: RiskDriver[] = [
  {
    id: 'RD-01',
    name: 'Equipment Downtime',
    percentage: 42,
    impactScore: 8.8,
    trend: 'UP',
    description:
      'Excavator hydraulic pump failures and heavy dump truck transmission outages at Face F02 and F04.',
  },
  {
    id: 'RD-02',
    name: 'Blast Delay',
    percentage: 27,
    impactScore: 7.4,
    trend: 'STABLE',
    description:
      'Explosive permit clearing latencies and safety perimeter clearance bottlenecks during Shift B.',
  },
  {
    id: 'RD-03',
    name: 'Rainfall & Haul Road Wetness',
    percentage: 19,
    impactScore: 6.9,
    trend: 'UP',
    description:
      'Heavy monsoonal precipitation reducing haul truck transit velocity on unpaved open-cast inclines.',
  },
  {
    id: 'RD-04',
    name: 'Low Stockpile Buffer',
    percentage: 12,
    impactScore: 5.2,
    trend: 'DOWN',
    description:
      'Run-of-Mine (ROM) buffer storage depleted below 1,000 Tonnes threshold for continuous washing plant feed.',
  },
];

export const MOCK_RECOMMENDATIONS: Recommendation[] = [
  {
    id: 'REC-01',
    title: 'Reassign Standby Fleet to Affected Face F02',
    priority: 'URGENT',
    category: 'EQUIPMENT',
    reason:
      'Hydraulic excavator downtime at Face F02 reduced daily loading capacity by 35%.',
    expectedImpact: '+85 Tonnes/day production recovery',
    actionableSteps: [
      'Deploy 2 unit standby CAT 349 excavators from Pit West depot.',
      'Transition maintenance crew to 24/7 rapid response rotation on hydraulic line seals.',
    ],
  },
  {
    id: 'REC-02',
    title: 'Review & Optimize Delayed Blasting Sequence',
    priority: 'HIGH',
    category: 'BLASTING',
    reason:
      'Shift B blasting delays average 4.2 hours due to clearance checks.',
    expectedImpact: 'Reduce haul truck waiting time by 60 mins/shift',
    actionableSteps: [
      'Pre-clear blast safety perimeter 2 hours before scheduled detonation.',
      'Implement electronic detonators to speed up firing pattern setup.',
    ],
  },
  {
    id: 'REC-03',
    title: 'Maintain Additional Stockpile Buffer Before Monsoons',
    priority: 'HIGH',
    category: 'STOCKPILE',
    reason:
      'Forecasted heavy rainfall (15mm+) will degrade haul road friction for 48 hours.',
    expectedImpact: 'Prevent processing plant shutdown during monsoon spikes',
    actionableSteps: [
      'Build primary ROM stockpile to >2,000 Tonnes at crushing platform.',
      'Apply crushed basalt gravel layer on high-incline haul road ramps.',
    ],
  },
  {
    id: 'REC-04',
    title: 'Prioritize Accessible High-Potential Zone A-01',
    priority: 'MEDIUM',
    category: 'EXPLORATION',
    reason:
      'Zone A-01 has 91% manganese prospectivity score and is adjacent to existing pit haulage.',
    expectedImpact: 'Accelerate high-grade ore reserves addition',
    actionableSteps: [
      'Direct exploratory drilling rig #3 to Zone A-01 eastern flank.',
      'Cross-validate overburden thickness with SRTM DEM satellite elevation profile.',
    ],
  },
];

export const MOCK_MONTHLY_TREND = [
  { date: 'Week 1', planned: 300, predicted: 295, actual: 290 },
  { date: 'Week 2', planned: 310, predicted: 280, actual: 275 },
  { date: 'Week 3', planned: 320, predicted: 265, actual: 260 },
  { date: 'Week 4', planned: 320, predicted: 235, actual: 215 },
];
