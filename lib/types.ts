export interface NAVDataPoint {
  day: number;
  nav: number;
  label?: string;
}

// Decay rate is annual percentage
// To reach ~1% NAV (essentially zero): need (1-rate)^years = 0.01
// For 5 years: (1-rate)^5 = 0.01 → rate = 60%
// For 1 month: rate needs to be ~95%
export const MIN_ANNUAL_DECAY = 0.60; // Minimum: lose everything in 5 years
export const MAX_ANNUAL_DECAY = 0.95; // Maximum: lose everything in ~2 months
export const DEFAULT_ANNUAL_DECAY = 0.75; // Default: ~75% annual (lose everything in ~2 years)

export function getTimeToZero(annualDecay: number): string {
  // Calculate days until NAV reaches ~0.01 (essentially zero)
  const dailyDecay = 1 - Math.pow(1 - annualDecay, 1/365);
  const daysToNearZero = Math.log(0.01) / Math.log(1 - dailyDecay);

  if (daysToNearZero < 60) {
    return `${Math.round(daysToNearZero)} days`;
  } else if (daysToNearZero < 365) {
    return `${Math.round(daysToNearZero / 30)} months`;
  } else {
    return `${(daysToNearZero / 365).toFixed(1)} years`;
  }
}

export function getCrashMultiplier(annualDecay: number, severity: 'moderate' | 'severe' | 'extreme'): number {
  // Higher decay = higher potential multipliers
  const multiplierMap = {
    moderate: 2 + (annualDecay * 3),    // 2.5x to 4.9x
    severe: 4 + (annualDecay * 5),      // 4.9x to 8.8x
    extreme: 8 + (annualDecay * 12),    // 9.2x to 19.4x
  };
  return multiplierMap[severity];
}
