import { NAVDataPoint, getCrashMultiplier } from './types';

export function getCurrentNAV(annualDecay: number, daysPassed: number = 90): number {
  // Calculate current NAV based on decay rate and time passed
  const dailyDecay = Math.pow(1 - annualDecay, 1 / 365);
  return Math.pow(dailyDecay, daysPassed);
}

export function calculateCVT(usdcAmount: number, annualDecay: number, daysPassed: number = 90): number {
  const nav = getCurrentNAV(annualDecay, daysPassed);
  return usdcAmount / nav;
}

export function calculateUSDC(cvtAmount: number, annualDecay: number, daysPassed: number = 90): number {
  const nav = getCurrentNAV(annualDecay, daysPassed);
  return cvtAmount * nav;
}

export function generateNAVHistory(annualDecay: number, days: number): NAVDataPoint[] {
  const initialNAV = 1.0;
  const dailyDecay = Math.pow(1 - annualDecay, 1 / 365);

  const data: NAVDataPoint[] = [];

  for (let i = 0; i <= days; i++) {
    const nav = initialNAV * Math.pow(dailyDecay, i);
    data.push({
      day: i,
      nav: parseFloat(nav.toFixed(4)),
    });
  }

  return data;
}

export function generateNAVProjection(annualDecay: number, days: number = 730): NAVDataPoint[] {
  return generateNAVHistory(annualDecay, days);
}

export function generateCrashScenario(annualDecay: number, crashDay: number = 180): NAVDataPoint[] {
  const totalDays = Math.max(365, crashDay + 30);
  const data = generateNAVProjection(annualDecay, totalDays);

  // Higher decay = higher crash multiplier
  const crashMultiplier = getCrashMultiplier(annualDecay, 'extreme');

  const navAtCrash = data[crashDay].nav;
  const spikeValue = navAtCrash * crashMultiplier;

  data[crashDay] = {
    ...data[crashDay],
    nav: parseFloat(spikeValue.toFixed(4)),
    label: 'Crash',
  };

  for (let i = crashDay + 1; i < data.length; i++) {
    data[i].nav = parseFloat(spikeValue.toFixed(4));
  }

  return data;
}

export function getCrashProjections(annualDecay: number, investment: number) {
  const moderateMultiplier = getCrashMultiplier(annualDecay, 'moderate');
  const severeMultiplier = getCrashMultiplier(annualDecay, 'severe');
  const extremeMultiplier = getCrashMultiplier(annualDecay, 'extreme');

  return {
    mildRecession: investment * moderateMultiplier,
    severeCrash: investment * severeMultiplier,
    extremeCollapse: investment * extremeMultiplier,
  };
}
