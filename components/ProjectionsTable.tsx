'use client';

import { getCrashProjections } from '@/lib/calculations';

interface ProjectionsTableProps {
  annualDecay: number;
  investment: number;
}

export default function ProjectionsTable({ annualDecay, investment }: ProjectionsTableProps) {
  const projections = getCrashProjections(annualDecay, investment);

  return (
    <div className="w-full bg-[#111936] border border-[#1a2847] rounded-xl overflow-hidden">
      <div className="px-8 py-6 border-b border-[#1a2847] bg-gradient-to-r from-cyan-500/5 to-blue-500/5">
        <h3 className="text-2xl font-bold text-white">Crash Scenario Analysis</h3>
        <p className="text-gray-400 text-sm mt-1">Current position: ${investment.toLocaleString()} USDC</p>
      </div>
      <table className="w-full">
        <thead>
          <tr className="bg-[#0d1229] border-b border-[#1a2847]">
            <th className="px-8 py-4 text-left text-xs font-bold text-gray-400 uppercase tracking-wide">Market Decline</th>
            <th className="px-8 py-4 text-right text-xs font-bold text-gray-400 uppercase tracking-wide">Position Value</th>
            <th className="px-8 py-4 text-right text-xs font-bold text-gray-400 uppercase tracking-wide">Return</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-b border-[#1a2847] hover:bg-[#0d1229] transition-colors">
            <td className="px-8 py-5 text-sm text-gray-300">Moderate (20-30%)</td>
            <td className="px-8 py-5 text-right font-semibold text-white text-base">
              ${projections.mildRecession.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </td>
            <td className="px-8 py-5 text-right">
              <span className="px-3 py-1.5 bg-cyan-500/10 text-cyan-400 font-bold text-xs rounded border border-cyan-500/20">
                +{((projections.mildRecession / investment - 1) * 100).toFixed(0)}%
              </span>
            </td>
          </tr>
          <tr className="border-b border-[#1a2847] hover:bg-[#0d1229] transition-colors">
            <td className="px-8 py-5 text-sm text-gray-300">Severe (30-45%)</td>
            <td className="px-8 py-5 text-right font-semibold text-white text-base">
              ${projections.severeCrash.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </td>
            <td className="px-8 py-5 text-right">
              <span className="px-3 py-1.5 bg-cyan-500/10 text-cyan-400 font-bold text-xs rounded border border-cyan-500/20">
                +{((projections.severeCrash / investment - 1) * 100).toFixed(0)}%
              </span>
            </td>
          </tr>
          <tr className="hover:bg-[#0d1229] transition-colors">
            <td className="px-8 py-5 text-sm font-semibold text-white">Extreme (45%+)</td>
            <td className="px-8 py-5 text-right font-bold text-cyan-400 text-lg">
              ${projections.extremeCollapse.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </td>
            <td className="px-8 py-5 text-right">
              <span className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-sm rounded shadow-lg shadow-cyan-500/20">
                +{((projections.extremeCollapse / investment - 1) * 100).toFixed(0)}%
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
